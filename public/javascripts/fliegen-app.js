var app = (function(){
  //WebGL Context Variable
  var gl;
  var prog;
  var models = [];
  var toggleWireframeOn = true;
  var sphereAngle = 0;
  var deltaRotate = Math.PI / 36;

  //Global Camera Object
  var camera = {
    // Initial position of the camera.
    eye : [0, 1, 4],
    // Point to look at.
    center : [0, 0, 0],
    // Roll and pitch of the camera.
    up : [0, 1, 0],
    // Opening angle given in radian.
    // radian = degree*2*PI/360.
    fovy : 60.0 * Math.PI / 180,
    // Camera near grid dimensions:
    // value for left right top bottom in projection.
    lrtb : 2.0,
    // View matrix.
    vMatrix : mat4.create(),
    // Projection matrix.
    pMatrix : mat4.create(),
    // Projection types: ortho, perspective, frustum.
    projectionType : "ortho",
    // Angle to Z-Axis for camera when orbiting the center
    // given in radian.
    zAngle : 0,
    // Distance in XZ-Plane from center when orbiting.
    distance : 4,
  };

  function start() {
    console.log('Starting the Engine ... ')
    init();
    render();
  }

  function init() {
    console.log('Initialize the Engine ....')
    models = []
    initWebGL();
    initShaderProgram();
    initUniforms()
    initModels();
    initEventHandler();
    initPipline();
  }

  function initWebGL() {
    console.log('Initialize the WebGL Context from Canvas ....')
    canvas = document.getElementById('c');
    gl = canvas.getContext('experimental-webgl');
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
  }

  function initPipline() {
    console.log('Initialize the Pipeline and Camera ....')
    gl.clearColor(.95, .95, .95, 1);

    gl.frontFace(gl.CCW);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    // Depth(Z)-Buffer.
    gl.enable(gl.DEPTH_TEST);

    // Polygon offset of rastered Fragments.
    gl.enable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(0.5, 0);

    // Set viewport.
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    camera.aspect = gl.viewportWidth / gl.viewportHeight;
  }

  function initShaderProgram() {
    // Init vertex shader.
    var vs = initShader(gl.VERTEX_SHADER, "vertexshader");
    // Init fragment shader.
    var fs = initShader(gl.FRAGMENT_SHADER, "fragmentshader");
    // Link shader into a shader program.
    prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.bindAttribLocation(prog, 0, "aPosition");
    gl.linkProgram(prog);
    gl.useProgram(prog);
  }

  function initShader(shaderType, SourceTagId) {
    var shader = gl.createShader(shaderType);
    var shaderSource = document.getElementById(SourceTagId).text;
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log(SourceTagId+": "+gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }

  function initUniforms() {
// Projection Matrix.
    prog.pMatrixUniform = gl.getUniformLocation(prog, "uPMatrix");

    // Model-View-Matrix.
    prog.mvMatrixUniform = gl.getUniformLocation(prog, "uMVMatrix");

    prog.colorUniform = gl.getUniformLocation(prog, "uColor");

    // die Uniform-Variable uNMatrix wird durch prog.nMatrixUniform referenziert
    prog.nMatrixUniform = gl.getUniformLocation(prog, "uNMatrix");
  }

  function initModels() {
    var fs = "fillwireframe";
    createModel("torus", fs, [ 1, 0.4, 0, 0.8 ],[0, 0, 0], [0, 0, 0], [1, 1, 1]);
    createModel("plane", "wireframe", [ 1, 1, 1, 1 ], [0, 0, 0], [0, 0, 0], [1, 1, 1]);

    createModel("sphere", fs, [ 0, 1, 1, 1 ],[-1, 0.2, 0], [0, 0, 0],
        [.2, .2, .2]);
    createModel("sphere", fs, [ 1, 0, 1, 1 ],[-1, -.3, -1], [0, 0, 0],
        [.2, .2, .2]);
    createModel("sphere", fs, [ 1, 1, 0, 1 ],[1, -.3, 1], [0, 0, 0],
        [.3, .3, .3]);
    createModel("sphere", fs, [ 0, 1, 0, 1 ],[-1.2, -.3, 1], [0, 0, 0],
        [.3, .3, .3]);

    [torusM,planeM,sphere1,sphere2,sphere3,sphere3] = models


    sphereAngle = (sphereAngle + deltaRotate) % (2 * Math.PI);
    torusM.rotate[1] += deltaRotate;
    // 0 - 2
    const cosOffset = 1 + (Math.cos(sphereAngle));
    // -1 bis 1
    const sinOffset = Math.sin(sphereAngle);
    //console.log ("cos" + cosOffset);
    //console.log (sinOffset);
    sphere1.translate[0] = 2 * cosOffset -2;

    sphere2.translate[0] = 1.3 * (cosOffset  -1);
    sphere2.translate[2] = -1.4 *(sinOffset -1);

  }

  function createModel(geometryname, fillstyle,color, translate, rotate, scale) {
    var model = {};
    model.fillstyle = fillstyle;
    model.color = color;
    initDataAndBuffers(model, geometryname);
    initTransformations(model, translate, rotate, scale);

    models.push(model);
  }

  function initTransformations(model, translate, rotate, scale) {
    // Store transformation vectors.
    model.translate = translate;
    model.rotate = rotate;
    model.scale = scale;

    model.nMatrix = mat3.create();

    // Create and initialize Model-Matrix.
    model.mMatrix = mat4.create();

    // Create and initialize Model-View-Matrix.
    model.mvMatrix = mat4.create();
  }

  function initDataAndBuffers(model, geometryname) {
    console.log('Init Data Buffer '+geometryname)
    // Provide model object with vertex data arrays.
    // Fill data arrays for Vertex-Positions, Normals, Index data:
    // vertices, normals, indicesLines, indicesTris;
    // Pointer this refers to the window.
    this[geometryname]['createVertexData'].apply(model);
    console.log(model)
    // Setup position vertex buffer object.
    model.vboPos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, model.vboPos);
    gl.bufferData(gl.ARRAY_BUFFER, model.vertices, gl.STATIC_DRAW);
    // Bind vertex buffer to attribute variable.
    prog.positionAttrib = gl.getAttribLocation(prog, 'aPosition');
    gl.enableVertexAttribArray(prog.positionAttrib);

    // Setup normal vertex buffer object.
    model.vboNormal = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, model.vboNormal);
    gl.bufferData(gl.ARRAY_BUFFER, model.normals, gl.STATIC_DRAW);
    // Bind buffer to attribute variable.
    prog.normalAttrib = gl.getAttribLocation(prog, 'aNormal');
    gl.enableVertexAttribArray(prog.normalAttrib);

    // Setup lines index buffer object.
    model.iboLines = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.iboLines);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, model.indicesLines,
        gl.STATIC_DRAW);
    model.iboLines.numberOfElements = model.indicesLines.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    // Setup triangle index buffer object.
    model.iboTris = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.iboTris);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, model.indicesTris,
        gl.STATIC_DRAW);
    model.iboTris.numberOfElements = model.indicesTris.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  function initEventHandler() {
    var deltaRotate = Math.PI / 36;
    var deltaTranslate = 0.05;

    window.onkeydown = function(evt) {
      // Use shift key to change sign.
      var sign = evt.shiftKey ? -1 : 1;
      var key = evt.which ? evt.which : evt.keyCode;
      var c = String.fromCharCode(key);
      console.log('Getting Key Event')
      console.log(evt);

      // Change projection of scene.
      switch(c) {
        case('O'):
          camera.projectionType = "ortho"; // Turn on the othoganl view mode on, with keytrokes W, S, A, B and D
          camera.lrtb = 2;
          break;
        case('F'):
          camera.projectionType = "frustum"; // Turn on the frustum view mode on, where keytroke B and Shift+B can be used
          break;
        case('P'):
          camera.projectionType = "perspective"; //Turn the perspektiv view mode on, with additional keytroke V and Shift+V, but keystroke B is not working
          break;
        case('W'):
          camera.eye[1] += deltaTranslate; //Move the camera to the top
          break;
        case('S'):
          camera.eye[1] -= deltaTranslate; //Move the camera to the bottom
          break;
        case('A'):
          camera.zAngle += deltaRotate; //Move the camera to the left
          break;
        case('D'):
          camera.zAngle -= deltaRotate; //Move the camera to the right
          break;
        case('C'):
          // Orbit camera.
          camera.zAngle += sign * deltaRotate; //Keystroke C has the same movement of the camera as keystroke A and Shift+C has the same movement of the camera as keystroke D
          break;
        case('Q'):
          camera.distance -= sign * deltaTranslate; //Keystroke Q changes the distance of the camera to the point it looks at
          break;
        case('E'):
          camera.distance += sign * deltaTranslate; //Keystroke E changes the distance of the camera to the point it looks at in the opposite direction to Q
          break;
        case('V'):
          camera.fovy += sign * 5 * Math.PI / 180; //Keystroke V and Shift+V changes the perspective view only in perspective mode (turn on perspective mode with keystroke P)
          break;
        case('B'):
          camera.lrtb += sign * 0.1; //Keystroke B and Shift+B changes the left right top bottom
          break;
        case('L'):
          toggleWireframeOn = !toggleWireframeOn;
          break;
        case('K'):
          //torusM.rotate[0] += sign * deltaRotate;
          torusM.rotate[1] += sign * deltaRotate;
          //torusM.rotate[2] += sign * deltaRotate;
          sphere1.translate
          sphereAngle = (sphereAngle + deltaRotate) % (2 * Math.PI);
          const cosOffset = 1 + (Math.cos(sphereAngle));
          const sinOffset = Math.sin(sphereAngle);
          sphere1.translate[0] = 2 * cosOffset -2 ;

          sphere2.translate[0] = 1.3*(cosOffset  -1);
          sphere2.translate[2] = -1.4*(sinOffset -1);
          break;
      }
      render();
    };
  }

  function calculateCameraOrbit() {
    // Calculate x,z position/eye of camera orbiting the center.
    var x = 0, z = 2;
    camera.eye[x] = camera.center[x];
    camera.eye[z] = camera.center[z];
    camera.eye[x] += camera.distance * Math.sin(camera.zAngle);
    camera.eye[z] += camera.distance * Math.cos(camera.zAngle);
  }

  function updateTransformations(model) {

    // Use shortcut variables.
    var mMatrix = model.mMatrix;
    var mvMatrix = model.mvMatrix;

    mat4.identity(mMatrix);
    mat4.identity(mvMatrix);

    mat4.translate(mMatrix, mMatrix, model.translate);

    mat4.rotateX(mMatrix, mMatrix, model.rotate[0]);
    mat4.rotateY(mMatrix, mMatrix, model.rotate[1]);
    mat4.rotateZ(mMatrix, mMatrix, model.rotate[2]);

    mat4.scale(mMatrix, mMatrix, model.scale);

    mat4.multiply(mvMatrix, camera.vMatrix, mMatrix);

    // Calculate normal matrix from model-view matrix.
    mat3.normalFromMat4(model.nMatrix, mvMatrix);
  }

  function render() {
    console.log('Rendering ....')
    // Clear framebuffer and depth-/z-buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    setProjection();

    calculateCameraOrbit();

    // Set view matrix depending on camera.
    mat4.lookAt(camera.vMatrix, camera.eye, camera.center, camera.up);

    // Loop over models.
    for(var i = 0; i < models.length; i++) {
      // Update modelview for model.
      updateTransformations(models[i]);

      gl.uniform4fv(prog.colorUniform, models[i].color);

      gl.uniformMatrix3fv(prog.nMatrixUniform, false,
          models[i].nMatrix);

      // Set uniforms for model.
      gl.uniformMatrix4fv(prog.mvMatrixUniform, false,
          models[i].mvMatrix);

      draw(models[i]);
    }
  }

  function setProjection() {
    // Set projection Matrix.
    switch(camera.projectionType) {
      case("ortho"): //here the orthogonal view mode ist set up, where the projection matrix is calculated
        var v = camera.lrtb;
        mat4.ortho(camera.pMatrix, -v, v, -v, v, -10, 10);
        break;
      case("frustum"): //here the furstum view mode ist set up, where the projection matrix is calculated
        var v = camera.lrtb;
        mat4.frustum(camera.pMatrix, -v/2, v/2, -v/2, v/2, 1, 10);
        break;
      case("perspective"): //here the perspective view mode ist set up, where the projection matrix is calculated
        mat4.perspective(camera.pMatrix, camera.fovy,
            camera.aspect, 1, 10);
        break;
    }
    // Set projection uniform.
    gl.uniformMatrix4fv(prog.pMatrixUniform, false, camera.pMatrix);
  }

  function draw(model) {
    // Setup position VBO.
    console.log('Draw Model')
    console.log(model)

    // Setup color vertex buffer object.
    var vboCol = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vboCol);
    gl.bufferData(gl.ARRAY_BUFFER, model.color, gl.STATIC_DRAW);
    // Bind vertex buffer to attribute variable.
    var colAttrib = gl.getAttribLocation(prog, 'col');
    gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colAttrib);

    gl.bindBuffer(gl.ARRAY_BUFFER, model.vboPos);
    gl.vertexAttribPointer(prog.positionAttrib,3,gl.FLOAT,false,0,0);

    // Setup normal VBO.
    gl.bindBuffer(gl.ARRAY_BUFFER, model.vboNormal);
    gl.vertexAttribPointer(prog.normalAttrib,3,gl.FLOAT,false,0,0);

    // Setup rendering tris.
    var fill = (model.fillstyle.search(/fill/) != -1);
    if(fill) {
      gl.enableVertexAttribArray(prog.normalAttrib);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.iboTris);
      gl.drawElements(gl.TRIANGLES, model.iboTris.numberOfElements,
          gl.UNSIGNED_SHORT, 0);
    }

    // Setup rendering lines.
    var wireframe = (model.fillstyle.search(/wireframe/) != -1);
    if(wireframe && toggleWireframeOn) {
      gl.disableVertexAttribArray(prog.normalAttrib);
      gl.vertexAttrib3f(prog.normalAttrib, 0, 0, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.iboLines);
      gl.drawElements(gl.LINES, model.iboLines.numberOfElements,
          gl.UNSIGNED_SHORT, 0);
    }
  }

  // App interface.
  return {
    start : start,
    render: render
  }

}());