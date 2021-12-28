var apple = ( function() {

  function createVertexData() {
    var n = 64;
    var m = 16;

    // Positions.
    this.vertices = new Float32Array(3 * (n + 1) * (m + 1));
    var vertices = this.vertices;
    // Normals.
    this.normals = new Float32Array(3 * (n + 1) * (m + 1));
    var normals = this.normals;

    this.textureCoord = new Float32Array(2 * (n + 1) * (m + 1));
    var textureCoord = this.textureCoord;

    // Index data.
    this.indicesLines = new Uint16Array(2 * 2 * n * m);
    var indicesLines = this.indicesLines;
    this.indicesTris = new Uint16Array(3 * 2 * n * m);
    var indicesTris = this.indicesTris;

    var du = 2*Math.PI / n;
    var dv = 2* Math.PI / m;
    // Counter for entries in index array.
    var iLines = 0;
    var iTris = 0;

    // Loop angle u.
    for(var i = 0, u = -Math.PI; i <= n; i++, u += du) {
      // Loop angle v.
      for(var j = 0, v = -Math.PI; j <= m; j++, v += dv) {

        var iVertex = i * (m + 1) + j;

        var x = Math.cos(v)*(4+3.8*Math.cos(u));
        var y = Math.sin(v)*(4+3.8*Math.cos(u));
        var z = (Math.cos(u)+ Math.sin(u)-1)*(1+Math.sin(u))*Math.log(1-Math.PI*u/10)+7.8* Math.sin(u);

        // Set vertex positions.
        vertices[iVertex * 3] = x;
        vertices[iVertex * 3 + 1] = y;
        vertices[iVertex * 3 + 2] = z;

        // Calc and set normals.
        var nx = Math.cos(u) * Math.cos(v);
        var ny = Math.cos(u) * Math.sin(v);
        var nz = Math.sin(u);
        normals[iVertex * 3] = nx;
        normals[iVertex * 3 + 1] = ny;
        normals[iVertex * 3 + 2] = nz;

        // Set texture coordinate.
        textureCoord[iVertex * 2] = (u+ Math.PI)/(2*Math.PI);
        textureCoord[iVertex * 2 + 1] = (v+Math.PI)/(2*Math.PI);

        if(j > 0 && i > 0) {
          indicesLines[iLines++] = iVertex - 1;
          indicesLines[iLines++] = iVertex;
        }
        // Line on ring.
        if(j > 0 && i > 0) {
          indicesLines[iLines++] = iVertex - (m + 1);
          indicesLines[iLines++] = iVertex;
        }

        // Set index.
        // Two Triangles.
        if(j > 0 && i > 0) {
          indicesTris[iTris++] = iVertex;
          indicesTris[iTris++] = iVertex - 1;
          indicesTris[iTris++] = iVertex - (m + 1);
          //
          indicesTris[iTris++] = iVertex - 1;
          indicesTris[iTris++] = iVertex - (m + 1) - 1;
          indicesTris[iTris++] = iVertex - (m + 1);
        }
      }
    }
  }

  return {
    createVertexData : createVertexData
  }

}());
