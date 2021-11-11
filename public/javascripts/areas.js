
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

function loadVertexColorVector(context,colors,program) {
    var vboCol = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, vboCol);
    context.bufferData(context.ARRAY_BUFFER, colors, context.STATIC_DRAW);
    var colAttrib = context.getAttribLocation(program, 'col');
    context.vertexAttribPointer(colAttrib, 4, context.FLOAT, false, 0, 0);
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
var colors;

function createVertexData(){
    var n = 64;
    var m = 18;
    // Positions.
    vertices = new Float32Array(3*(n+1)*(m+1));
    // Index data for Linestrip.
    indicesLines = new Uint16Array(2 * 2 * n * m);
    indicesTris = new Uint16Array(3 * 3 * n * m);
    colors =  new Float32Array(4 * 4 * n * m);

    var dt = 2*Math.PI/n;
    var dr = 1/32;
    // Counter for entries in index array.
    var iIndex = 0;
    var iTris = 0;

    // Loop angle t.
    for(var i=0, t=0; i <= n; i++, t += dt) {
        // Loop radius r.
        for(var j=0, r=0; j <= m; j++, r += dr) {

            var iVertex = i*(m+1) + j;

            var x = Math.cos(t);
            var z = Math.cos(j);
            var y = r * Math.sin(t) * Math.sin(j)

            // Set vertex positions.
            vertices[iVertex * 3] = x;
            vertices[iVertex * 3 + 1] = y;
            vertices[iVertex * 3 + 2] = z;

            colors[iVertex * 3 + 3] = t / (2*Math.PI);
            colors[iVertex * 3 + 4] = 0.5 * Math.cos(j);
            colors[iVertex * 3 + 5] = 1;
            colors[iVertex * 3 + 6] = 1;

            if(j>0 && i>0){
                indicesLines[iIndex++] = iVertex - 1;
                indicesLines[iIndex++] = iVertex;
            }
            // Line on ring.
            if(j>0 && i>0){
                indicesLines[iIndex++] = iVertex - (m+1);
                indicesLines[iIndex++] = iVertex;
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

//loadVertexColor(gl,prog,1,0,0,0.5)
loadVertexColorVector(gl,colors,prog)

clearContextAndDraw(gl,elementsTris,gl.TRIANGLES)

//gl.clear(context.COLOR_BUFFER_BIT);

loadVertexColor(gl,prog,0,0,0,1)

clearContextAndDraw(gl,elementsLines,gl.LINES)

//loadVertexColor(gl,prog,0,0,1,1)

//clearContextAndDraw(gl,elementsLines,gl.LINES)
