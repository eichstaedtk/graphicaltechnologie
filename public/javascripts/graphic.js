
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

const vertexSource = 'attribute vec2 pos;void main(){gl_Position = vec4(pos * 0.5, 0, 1); }'
const fragmentSource = 'void main() { gl_FragColor = vec4(1); }';
const gl = createWebGLContext('c')
gl.clearColor(0, 0, 0, 1);

            // Link together into a program
            var prog = gl.createProgram();
            gl.attachShader(prog, compileShadder(gl,gl.VERTEX_SHADER,vertexSource));
            gl.attachShader(prog, compileShadder(gl,gl.FRAGMENT_SHADER,fragmentSource));
            gl.linkProgram(prog);
            gl.useProgram(prog);

            // Load vertex data into a buffer
            var vertices = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]);
            var vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            // Bind vertex buffer to attribute variable
            var posAttrib = gl.getAttribLocation(prog, 'pos');
            gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(posAttrib);

            // Clear framebuffer and render primitives
            var vsSource = 'attribute vec2 pos;'+
                'void main(){gl_Position = vec4(pos * 0.5, 0, 1); }';
            var vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vs, vsSource);
            gl.compileShader(vs);

            // Compile a fragment shader
            fsSouce =  'void main() { gl_FragColor = vec4(1); }';
            var fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fs, fsSouce);
            gl.compileShader(fs);

            // Link together into a program
            var prog = gl.createProgram();
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            gl.useProgram(prog);

            // Load vertex data into a buffer
            var vertices = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]);
            var vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            // Bind vertex buffer to attribute variable
            var posAttrib = gl.getAttribLocation(prog, 'pos');
            gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(posAttrib);

            // Clear framebuffer and render primitives
            var vsSource = 'attribute vec2 pos;'+
                'void main(){gl_Position = vec4(pos * 0.5, 0, 1); }';
            var vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vs, vsSource);
            gl.compileShader(vs);

            // Compile a fragment shader
            fsSouce =  'void main() { gl_FragColor = vec4(1); }';
            var fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fs, fsSouce);
            gl.compileShader(fs);

            // Link together into a program
            var prog = gl.createProgram();
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            gl.useProgram(prog);

            // Load vertex data into a buffer
            var vertices = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]);
            var vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            // Bind vertex buffer to attribute variable
            var posAttrib = gl.getAttribLocation(prog, 'pos');
            gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(posAttrib);

            // Clear framebuffer and render primitives
            var vsSource = 'attribute vec2 pos;'+
                'void main(){gl_Position = vec4(pos * 0.5, 0, 1); }';
            var vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vs, vsSource);
            gl.compileShader(vs);

            // Compile a fragment shader
            fsSouce =  'void main() { gl_FragColor = vec4(1); }';
            var fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fs, fsSouce);
            gl.compileShader(fs);

            // Link together into a program
            var prog = gl.createProgram();
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            gl.useProgram(prog);

            // Load vertex data into a buffer
            var vertices = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]);
            var vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            // Bind vertex buffer to attribute variable
            var posAttrib = gl.getAttribLocation(prog, 'pos');
            gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(posAttrib);

            // Clear framebuffer and render primitives
            var vsSource = 'attribute vec2 pos;'+
                'void main(){gl_Position = vec4(pos * 0.5, 0, 1); }';
            var vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vs, vsSource);
            gl.compileShader(vs);

            // Compile a fragment shader
            fsSouce =  'void main() { gl_FragColor = vec4(1); }';
            var fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fs, fsSouce);
            gl.compileShader(fs);

            // Link together into a program
            var prog = gl.createProgram();
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            gl.useProgram(prog);

            // Load vertex data into a buffer
            var vertices = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]);
            var vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            // Bind vertex buffer to attribute variable
            var posAttrib = gl.getAttribLocation(prog, 'pos');
            gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(posAttrib);

            // Clear framebuffer and render primitives
            var vsSource = 'attribute vec2 pos;'+
                'void main(){gl_Position = vec4(pos * 0.5, 0, 1); }';
            var vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vs, vsSource);
            gl.compileShader(vs);

            // Compile a fragment shader
            fsSouce =  'void main() { gl_FragColor = vec4(1); }';
            var fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fs, fsSouce);
            gl.compileShader(fs);

            // Link together into a program
            var prog = gl.createProgram();
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            gl.useProgram(prog);

            // Load vertex data into a buffer
            var vertices = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]);
            var vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            // Bind vertex buffer to attribute variable
            var posAttrib = gl.getAttribLocation(prog, 'pos');
            gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(posAttrib);

            // Clear framebuffer and render primitives
            var vsSource = 'attribute vec2 pos;'+
                'void main(){gl_Position = vec4(pos * 0.5, 0, 1); }';
            var vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vs, vsSource);
            gl.compileShader(vs);

            // Compile a fragment shader
            fsSouce =  'void main() { gl_FragColor = vec4(1); }';
            var fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fs, fsSouce);
            gl.compileShader(fs);

            // Link together into a program
            var prog = gl.createProgram();
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            gl.useProgram(prog);

            // Load vertex data into a buffer
            var vertices = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]);
            var vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            // Bind vertex buffer to attribute variable
            var posAttrib = gl.getAttribLocation(prog, 'pos');
            gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(posAttrib);

            // Clear framebuffer and render primitives
            var vsSource = 'attribute vec2 pos;'+
                'void main(){gl_Position = vec4(pos * 0.5, 0, 1); }';
            var vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vs, vsSource);
            gl.compileShader(vs);

            // Compile a fragment shader
            fsSouce =  'void main() { gl_FragColor = vec4(1); }';
            var fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fs, fsSouce);
            gl.compileShader(fs);

            // Link together into a program
            var prog = gl.createProgram();
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            gl.useProgram(prog);

            // Load vertex data into a buffer
            var vertices = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]);
            var vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            // Bind vertex buffer to attribute variable
            var posAttrib = gl.getAttribLocation(prog, 'pos');
            gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(posAttrib);

            // Clear framebuffer and render primitives
            var vsSource = 'attribute vec2 pos;'+
                'void main(){gl_Position = vec4(pos * 0.5, 0, 1); }';
            var vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vs, vsSource);
            gl.compileShader(vs);

            // Compile a fragment shader
            fsSouce =  'void main() { gl_FragColor = vec4(1); }';
            var fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fs, fsSouce);
            gl.compileShader(fs);

            // Link together into a program
            var prog = gl.createProgram();
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            gl.useProgram(prog);

            // Load vertex data into a buffer
            var vertices = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]);
            var vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            // Bind vertex buffer to attribute variable
            var posAttrib = gl.getAttribLocation(prog, 'pos');
            gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(posAttrib);

            // Clear framebuffer and render primitives
            var vsSource = 'attribute vec2 pos;'+
                'void main(){gl_Position = vec4(pos * 0.5, 0, 1); }';
            var vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vs, vsSource);
            gl.compileShader(vs);

            // Compile a fragment shader
            fsSouce =  'void main() { gl_FragColor = vec4(1); }';
            var fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fs, fsSouce);
            gl.compileShader(fs);

            // Link together into a program
            var prog = gl.createProgram();
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            gl.useProgram(prog);

            // Load vertex data into a buffer
            var vertices = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]);
            var vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            // Bind vertex buffer to attribute variable
            var posAttrib = gl.getAttribLocation(prog, 'pos');
            gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(posAttrib);

            // Clear framebuffer and render primitives
            var vsSource = 'attribute vec2 pos;'+
                'void main(){gl_Position = vec4(pos * 0.5, 0, 1); }';
            var vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vs, vsSource);
            gl.compileShader(vs);

            // Compile a fragment shader
            fsSouce =  'void main() { gl_FragColor = vec4(1); }';
            var fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fs, fsSouce);
            gl.compileShader(fs);

            // Link together into a program
            var prog = gl.createProgram();
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            gl.useProgram(prog);

            // Load vertex data into a buffer
            var vertices = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]);
            var vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            // Bind vertex buffer to attribute variable
            var posAttrib = gl.getAttribLocation(prog, 'pos');
            gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(posAttrib);

            // Clear framebuffer and render primitives
            var vsSource = 'attribute vec2 pos;'+
                'void main(){gl_Position = vec4(pos * 0.5, 0, 1); }';
            var vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vs, vsSource);
            gl.compileShader(vs);

            // Compile a fragment shader
            fsSouce =  'void main() { gl_FragColor = vec4(1); }';
            var fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fs, fsSouce);
            gl.compileShader(fs);

            // Link together into a program
            var prog = gl.createProgram();
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            gl.useProgram(prog);

            // Load vertex data into a buffer
            var vertices = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]);
            var vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            // Bind vertex buffer to attribute variable
            var posAttrib = gl.getAttribLocation(prog, 'pos');
            gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(posAttrib);

            // Clear framebuffer and render primitives
            var vsSource = 'attribute vec2 pos;'+
                'void main(){gl_Position = vec4(pos * 0.5, 0, 1); }';
            var vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vs, vsSource);
            gl.compileShader(vs);

            // Compile a fragment shader
            fsSouce =  'void main() { gl_FragColor = vec4(1); }';
            var fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fs, fsSouce);
            gl.compileShader(fs);

            // Link together into a program
            var prog = gl.createProgram();
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            gl.useProgram(prog);

            // Load vertex data into a buffer
            var vertices = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]);
            var vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            // Bind vertex buffer to attribute variable
            var posAttrib = gl.getAttribLocation(prog, 'pos');
            gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(posAttrib);

            // Clear framebuffer and render primitives
            var vsSource = 'attribute vec2 pos;'+
                'void main(){gl_Position = vec4(pos * 0.5, 0, 1); }';
            var vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vs, vsSource);
            gl.compileShader(vs);

            // Compile a fragment shader
            fsSouce =  'void main() { gl_FragColor = vec4(1); }';
            var fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fs, fsSouce);
            gl.compileShader(fs);

            // Link together into a program
            var prog = gl.createProgram();
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            gl.useProgram(prog);

            // Load vertex data into a buffer
            var vertices = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]);
            var vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            // Bind vertex buffer to attribute variable
            var posAttrib = gl.getAttribLocation(prog, 'pos');
            gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(posAttrib);

            // Clear framebuffer and render primitives
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);