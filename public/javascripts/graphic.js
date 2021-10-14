
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

function clearContextAndDraw(context) {
    context.clearColor(1, 1, 1, 1);
    context.clear(context.COLOR_BUFFER_BIT);
    context.drawArrays(context.TRIANGLE_FAN , 0, 9);
}

const vertexSource = 'attribute vec2 pos;void main(){gl_Position = vec4(pos * 0.4, 0, 1); gl_PointSize = 10.0;}'
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

var vertices = new Float32Array([-1, -1, 1, -1, 1,1,  -1, 1, 0,2,1,1 ,-1, -1,-1,-1,1, 1,1]);

loadVertexData(gl,vertices)

bindVertex(gl,prog)

clearContextAndDraw(gl)