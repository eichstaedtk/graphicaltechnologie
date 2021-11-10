
function createWebGLContext(id) {
    const canvasContainer = document.getElementById(id);
    context =  canvasContainer.getContext('experimental-webgl');
    context.clearColor(0.95, 0.95, 0.95, 0.95);
    context.frontFace(context.CCW);
    context.enable(context.CULL_FACE);
    context.cullFace(context.BACK); // or gl.FRONT
    return context;
}

function compileShadder(context,type, source) {
    var vs = context.createShader(type);
    context.shaderSource(vs, source);
    context.compileShader(vs);
    return vs;
}

function linkProgramm(context,vertextSource,fragmentSource) {
    var prog = context.createProgram();
    context.attachShader(prog, compileShadder(context,context.VERTEX_SHADER,vertextSource));
    context.attachShader(prog, compileShadder(context,context.FRAGMENT_SHADER,fragmentSource));
    context.bindAttribLocation(prog, 0, "pos");
    context.linkProgram(prog);
    context.useProgram(prog);

    return prog;
}

function loadVertexColor(context,program, x, y, z, w) {
    var colAttrib = context.getAttribLocation(program, 'col');
    context.vertexAttrib4f(colAttrib, x,y,z,w);
}

function loadVertexData(context,data, program) {
    var vbo = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, vbo);
    context.bufferData(context.ARRAY_BUFFER, data, context.STATIC_DRAW);
    var posAttrib = context.getAttribLocation(program, 'pos');
    context.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0);
    context.enableVertexAttribArray(posAttrib);
}

function setupIndex(context, indices) {
    var ibo = context.createBuffer();
    context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, ibo);
    context.bufferData(context.ELEMENT_ARRAY_BUFFER, indices,
        context.STATIC_DRAW);
    ibo.numerOfEmements = indices.length;
    context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, null);
    return ibo;
}

function clearContextAndDraw(context,buffer, form) {
    context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, buffer);
    context.drawElements(form, buffer.numerOfEmements, gl.UNSIGNED_SHORT, 0);
}

const vertexSource = 'attribute vec3 pos;attribute vec4 col;varying vec4 color;void main(){color = col;gl_Position = vec4(pos, 1);}'
const fragmentSource = 'precision mediump float;varying vec4 color;void main() { gl_FragColor = color; }';

const gl = createWebGLContext('c')

var vertices, indicesLines, indicesTris;
var colors = new Float32Array();

function createVertexData(){
    var n = 32;
    var m = 5;
    // Positions.
    vertices = new Float32Array(3 * (n+1) * (m+1));
    // Index data.
    indicesLines = new Uint16Array(2 * 2 * n * m);
    indicesTris  = new Uint16Array(3 * 2 * n * m);

    var dt = 2*Math.PI/n;
    var dr = 1/m;
    // Counter for entries in index array.
    var iLines = 0;
    var iTris = 0;

    // Loop angle t.
    for(var i=0, t=0; i <= n; i++, t += dt) {
        // Loop radius r.
        for(var j=0, r=0; j <= m; j++, r += dr){

            var iVertex = i*(m+1) + j;

            var x = r * Math.cos(t);
            var y = r * Math.sin(t);
            var z = 0;

            // Set vertex positions.
            vertices[iVertex * 3] = x;
            vertices[iVertex * 3 + 1] = y;
            vertices[iVertex * 3 + 2] = z;

            // Set index.
            // Line on beam.
            if(j>0 && i>0){
                indicesLines[iLines++] = iVertex - 1;
                indicesLines[iLines++] = iVertex;
            }
            // Line on ring.
            if(j>0 && i>0){
                indicesLines[iLines++] = iVertex - (m+1);
                indicesLines[iLines++] = iVertex;
            }

            // Set index.
            // Two Triangles.
            if(j>0 && i>0){
                indicesTris[iTris++] = iVertex;
                indicesTris[iTris++] = iVertex - 1;
                indicesTris[iTris++] = iVertex - (m+1);
                //
                indicesTris[iTris++] = iVertex - 1;
                indicesTris[iTris++] = iVertex - (m+1) - 1;
                indicesTris[iTris++] = iVertex - (m+1);
            }
        }
    }
}

var prog = linkProgramm(gl,vertexSource,fragmentSource)

createVertexData();

loadVertexData(gl,vertices,prog)

var elementsLines = setupIndex(gl,indicesLines)
var elementsTris = setupIndex(gl,indicesTris)

gl.clear(context.COLOR_BUFFER_BIT);

loadVertexColor(gl,prog,0,1,1,1)

clearContextAndDraw(gl,elementsTris,gl.TRIANGLES)

loadVertexColor(gl,prog,0,0,1,1)

clearContextAndDraw(gl,elementsLines,gl.LINES)
