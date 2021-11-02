
function createWebGLContext(id) {
    const canvasContainer = document.getElementById(id);
    context =  canvasContainer.getContext('experimental-webgl');
    context.clearColor(1, 1, 1, 1);
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
    context.linkProgram(prog);
    context.useProgram(prog);

    return prog;
}

function loadVertexColor(context,colors,program) {
    var vboCol = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, vboCol);
    context.bufferData(context.ARRAY_BUFFER, colors, context.STATIC_DRAW);
    var colAttrib = context.getAttribLocation(program, 'col');
    context.vertexAttribPointer(colAttrib, 4, context.FLOAT, false, 0, 0);
    context.enableVertexAttribArray(colAttrib);
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
    return ibo.numerOfEmements;
}

function clearContextAndDraw(context,elements) {
    context.clear(context.COLOR_BUFFER_BIT);
    context.drawElements(context.TRIANGLES , elements, gl.UNSIGNED_SHORT, 0);
}

const vertexSource = 'attribute vec3 pos;attribute vec4 col;varying vec4 color;void main(){color = col;gl_Position = vec4(pos-0.5, 1);}'
const fragmentSource = 'precision mediump float;varying vec4 color;void main() { gl_FragColor = color; }';

const gl = createWebGLContext('c')

function shiftData(data,shiftRight, shiftTop) {
    return data.map((value,index) => {
        return (index)%3===0 ? value + shiftRight : value+shiftTop;
    })
}

function addData(data,newData) {
    return data.concat(newData)
}

var smallQuader = [ 0,0,0, 0.25,0,0, 0.25,0.25,0, 0,0.25,0];
var smallTriangle = [ 0,0,0, 0.25,0,0, 0.25,0.25,0,];
var smallTriangleBackwards = [ 0,0.25,0, 0,0,0, 0,0.25,0,];

var blue3Points = [0,0,1,1, 0,0,1,1, 0,0,1,1]
var yellow3Points = [1,1,0,1, 1,1,0,1, 1,1,0,1]
var blue4Points = [0,0,1,1, 0,0,1,1, 0,0,1,1, 0,0,1,1]
var yellow4Points = [1,1,0,1, 1,1,0,1, 1,1,0,1, 1,1,0,1]
var red4Points = [1,0,0,1, 1,0,0,1, 1,0,0,1, 1,0,0,1]

var data = smallQuader
var colorData = blue4Points

data = addData(data,shiftData(smallQuader,0.25,0))
data = addData(data,shiftData(smallQuader,0.5,0))
data = addData(data,shiftData(smallQuader,0,0.25))
data = addData(data,shiftData(smallQuader,0.25,0.25))
data = addData(data,shiftData(smallQuader,0.5,0.25))
data = addData(data,shiftData(smallTriangle,0,0.5))

colorData = addData(colorData,yellow4Points)
colorData = addData(colorData,red4Points)
colorData = addData(colorData,red4Points)
colorData = addData(colorData,blue4Points)
colorData = addData(colorData,yellow4Points)

colorData = addData(colorData,blue3Points)

console.log(data)

var vertices = new Float32Array(data);
var colors = new Float32Array(colorData);
var indices = new Uint16Array([ 0,1,2, 0,2,3, 4,5,6, 4,6,7, 8,9,10, 8,10,11 ,12,13,14, 12,14,15, 16,17,18, 16,18,19, 20,21,22, 20,22,23, 24,25,26, 26,25,18 ]);
var prog = linkProgramm(gl,vertexSource,fragmentSource)

loadVertexData(gl,vertices,prog)

loadVertexColor(gl,colors,prog)

elements = setupIndex(gl,indices)

clearContextAndDraw(gl,elements)
