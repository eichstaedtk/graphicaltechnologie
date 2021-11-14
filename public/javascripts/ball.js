var ball = ( function() {

    function createVertexData() {

        console.log('Create Data for Ball')
        // Positions.
        var n = 32;
        var m = 16;

        this.vertices = new Float32Array(3 * (n + 1) * (m + 1));
        var vertices = this.vertices;
        // Normals.
        this.normals = new Float32Array(3 * (n + 1) * (m + 1));
        var normals = this.normals;
        // Index data.
        this.indicesLines = new Uint16Array(2 * 2 * n * m);
        var indicesLines = this.indicesLines;
        this.indicesTris = new Uint16Array(3 * 2 * n * m);
        var indicesTris = this.indicesTris;

        var dr = Math.PI/m;
        var dt = 2*Math.PI/n;
        // Counter for entries in index array.
        var iIndex = 0;
        var iTris = 0;

        for (var i = 0, t = -Math.PI; i <= n; i++, t += dt) {
            // Loop radius r.
            for (var j = 0, r = 0; j <= m; j++, r += dr) {

                var iVertex = i * (m + 1) + j;

                var x = 0.4 * Math.sin(r)* Math.cos(t);
                var z = 0.4 * Math.sin(r)* Math.sin(t);
                var y = 0.4 * Math.cos(r)+0.6;

                // Set vertex positions.
                vertices[iVertex * 3] = x;
                vertices[iVertex * 3 + 1] = y;
                vertices[iVertex * 3 + 2] = z;

                var nx = Math.sin(r)* Math.cos(t);
                var ny = Math.sin(r)* Math.cos(t);
                var nz = Math.cos(r);

                var vertexLength = Math.sqrt(x*x+y*y+z*z);
                normals[iVertex * 3] = x/vertexLength;
                normals[iVertex * 3 + 1] = y/vertexLength;
                normals[iVertex * 3 + 2] = z/vertexLength;

                if (j > 0 && i > 0) {
                    indicesLines[iIndex++] = iVertex - 1;
                    indicesLines[iIndex++] = iVertex;
                }
                // Line on ring.
                if (j > 0 && i > 0) {
                    indicesLines[iIndex++] = iVertex - (m + 1);
                    indicesLines[iIndex++] = iVertex;
                }

                // Set index.
                // Two Triangles.
                if (j > 0 && i > 0) {
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