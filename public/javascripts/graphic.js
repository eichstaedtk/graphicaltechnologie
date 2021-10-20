
function createWebGLContext(id) {
    const canvasContainer = document.getElementById(id);
    return canvasContainer.getContext('experimental-webgl');
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
    context.linkProgram(prog);
    context.useProgram(prog);

    return prog;
}

function bindVertex(context,program){
    var posAttrib = context.getAttribLocation(program, 'pos');
    context.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
    context.enableVertexAttribArray(posAttrib);
}

function loadVertexData(context,data) {
    var vbo = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, vbo);
    context.bufferData(context.ARRAY_BUFFER, data, context.STATIC_DRAW);
}

function clearContextAndDraw(context,count) {
    context.clearColor(1, 1, 1, 1);
    context.clear(context.COLOR_BUFFER_BIT);
    context.lineWidth(10.0);
    context.drawArrays(context.LINES , 0, count);
}

const vertexSource = 'attribute vec2 pos;void main(){gl_Position = vec4(pos, 0, 1);}'
const fragmentSource = 'void main() { gl_FragColor = vec4(0, 0, 0, 1); }';

const gl = createWebGLContext('c')

var prog = linkProgramm(gl,vertexSource,fragmentSource)

/**
 * Quadrat Vertex
 * @type {Float32Array}
 */
//var vertices = new Float32Array([1, 1, -1, 1, 0.5, -0.5, -0.5, -0.5]);

/**
 * Hause vom Nicolaus with Points
 * @type {Float32Array}
 */

function shiftData(data,shiftRight, shiftTop) {
    return data.map((value,index) => {
        return index%2===0 ? value + shiftRight : value+shiftTop;
    })
}

var data = [-0.5, -0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5,-0.5,0.5,-0.5,0.5,-0.5,-0.5];

for(i=1;i>0;i=i-0.2) {

    data = data.concat(shiftData(data,0.05,0.05)).concat(shiftData(data,-0.05,-0.05))
    console.log('Drawing the new vertices ')
    console.log(i)
    console.log(data)
}

var vertices = new Float32Array(data.concat(shiftData(data,0.05,0.05)));

var prog = linkProgramm(gl,vertexSource,fragmentSource)

loadVertexData(gl,vertices)

bindVertex(gl,prog)

clearContextAndDraw(gl,vertices.length / 2)
