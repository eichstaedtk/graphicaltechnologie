
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
//var vertices = new Float32Array([1, 1, -1, 1, 0.25, -0.25, -0.25, -0.25]);

/**
 * Hause vom Nicolaus with Points
 * @type {Float32Array}
 */

function reduceSizeData(data,reduce) {
    return data.map((value,index) => {
        return value*reduce;
    })
}

function shiftData(data,shiftRight, shiftTop) {
    return data.map((value,index) => {
        return index%2===0 ? value + shiftRight : value+shiftTop;
    })
}

function addData(data,newData) {
    return data.concat(newData)
}

var brick = [-0.25, -0.25, 0.5, -0.25, 0.5, -0.25, 0.5, 0.25, 0.5, 0.25,-0.25,0.25,-0.25,0.25,-0.25,-0.25,
    -0.25, 0.25, 0, 0.5, 0, 0.5,0.75,0.5,0.75,0.5,0.5, 0.25,
    0.5,-0.25, 0.75,0,0.75,0,0.75, 0.5];

var smallBrick = reduceSizeData(brick,0.5)

var data = smallBrick

data = addData(data,shiftData(smallBrick,0.25,-0.3))

data = addData(data,shiftData(smallBrick,0.5,-0.6))

data = addData(data,shiftData(smallBrick,0,-0.6))

data = addData(data,shiftData(smallBrick,-0.5,-0.6))

data = addData(data,shiftData(smallBrick,-0.25,-0.3))

var vertices = new Float32Array(data);

var prog = linkProgramm(gl,vertexSource,fragmentSource)

loadVertexData(gl,vertices)

bindVertex(gl,prog)

clearContextAndDraw(gl,vertices.length / 2)
