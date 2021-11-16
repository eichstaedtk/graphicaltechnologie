var ballMesh = ( function() {

    function createVertexData() {

        console.log('Create Data for Ball with Mesh')

        var verticesIndex = 0;
        var normalIndex = 0;
        var trisIndex = 0;
        var linesIndex = 0;
        var recursionLevel = 10;

        this.vertices = new Float32Array(recursionLevel * 3 * 12);
        var vertices = this.vertices;
        // Normals.
        this.normals = new Float32Array(recursionLevel * 3 *12);
        var normals = this.normals;
        // Index data.
        this.indicesLines = new Uint16Array(recursionLevel * 2 * 16 * 3);
        var indicesLines = this.indicesLines;
        this.indicesTris = new Uint16Array(recursionLevel * 3 * 20);
        var indicesTris = this.indicesTris;


        function addVertex(x,y,z) {
            vertices[verticesIndex++] = x*0.2;
            vertices[verticesIndex++] = y*0.2;
            vertices[verticesIndex++] = z*0.2;

        }

        function addNormal(x,y,z) {
            normals[normalIndex++] = x;
            normals[normalIndex++] = y;
            normals[normalIndex++] = z;

        }

        function addTrisIndices(p1, p2, p3) {
            indicesTris[trisIndex++] = p1;
            indicesTris[trisIndex++] = p2;
            indicesTris[trisIndex++] = p3;
        }

        function addLinesIndices(p1, p2) {
            indicesLines[linesIndex++] = p1;
            indicesLines[linesIndex++] = p2;
        }

        function getMiddlePoint(p1, p2){
            return (p1 + p2) / 2
        }


        var t = (1.0 + Math.sqrt(5.0)) / 2.0;

        addVertex(-1,  t,  0);
        addVertex( 1,  t,  0);
        addVertex(-1, -t,  0);
        addVertex(1, -t,  0);

        addVertex( 0, -1,  t);
        addVertex(0,  1,  t);
        addVertex(0, -1, -t);
        addVertex(0,  1, -t);

        addVertex( t,  0, -1);
        addVertex( t,  0,  1);
        addVertex(-t,  0, -1);
        addVertex(-t,  0,  1);

        //Normal

        addNormal(-1,  t,  0);
        addNormal( 1,  t,  0);
        addNormal(-1, -t,  0);
        addNormal(1, -t,  0);

        addNormal( 0, -1,  t);
        addNormal(0,  1,  t);
        addNormal(0, -1, -t);
        addNormal(0,  1, -t);

        addNormal( t,  0, -1);
        addNormal( t,  0,  1);
        addNormal(-t,  0, -1);
        addNormal(-t,  0,  1);

        addTrisIndices(0, 11, 5);
        addTrisIndices(0, 5, 1);
        addTrisIndices(0, 1, 7);
        addTrisIndices(0, 7, 10);
        addTrisIndices(0, 10, 11);

        addLinesIndices(0,5)
        addLinesIndices(0,11)
        addLinesIndices(11,5)

        addLinesIndices(0,5)
        addLinesIndices(5,1)
        addLinesIndices(1,0)

        addLinesIndices(0,7)
        addLinesIndices(0,1)
        addLinesIndices(1,7)

        addLinesIndices(7,1)
        addLinesIndices(1,0)
        addLinesIndices(0,7)

        addLinesIndices(0,7)
        addLinesIndices(0,10)
        addLinesIndices(10,7)

        addLinesIndices(0,10)
        addLinesIndices(10,11)
        addLinesIndices(11,0)

        addLinesIndices(10,11)
        addLinesIndices(11,2)
        addLinesIndices(2,10)

        addLinesIndices(11,2)
        addLinesIndices(2,4)
        addLinesIndices(4,11)

        addLinesIndices(11,5)
        addLinesIndices(5,4)
        addLinesIndices(4,11)

        addLinesIndices(4,9)
        addLinesIndices(9,5)
        addLinesIndices(5,4)

        addLinesIndices(5,9)
        addLinesIndices(9,1)
        addLinesIndices(1,5)

        addLinesIndices(11,6)
        addLinesIndices(6,3)
        addLinesIndices(3,11)

        addLinesIndices(6,3)
        addLinesIndices(3,8)
        addLinesIndices(8,6)

        addLinesIndices(3,8 )
        addLinesIndices(8,9)
        addLinesIndices(9,3)

        addLinesIndices(6,8 )
        addLinesIndices(8,7)
        addLinesIndices(7,6)

        addLinesIndices(8,1)
        addLinesIndices(1,7)
        addLinesIndices(7,8)


// 5 adjacent faces
        addTrisIndices(1, 5, 9);
        addTrisIndices(5, 11, 4);
        addTrisIndices(11, 10, 2);
        addTrisIndices(10, 7, 6);
        addTrisIndices(7, 1, 8);

// 5 faces around point 3
        addTrisIndices(3, 9, 4);
        addTrisIndices(3, 4, 2);
        addTrisIndices(3, 2, 6);
        addTrisIndices(3, 6, 8);
        addTrisIndices(3, 8, 9);

// 5 adjacent faces
        addTrisIndices(4, 9, 5);
        addTrisIndices(2, 4, 11);
        addTrisIndices(6, 2, 10);
        addTrisIndices(8, 6, 7);
        addTrisIndices(9, 8, 1);

        for (var i = 0; i < recursionLevel; i++)
        {

            console.log('Building mesh with recursion '+i)
            var vertexCount = 0 ;

            vertices.forEach(function (element, index) {
                // replace triangle by 4 triangles

                if(index % 3 === 0 && vertices[index+5]) {

                    console.log('Add new Vertex')

                    var a = getMiddlePoint(vertices[index],
                        vertices[index + 3]);
                    var b = getMiddlePoint(vertices[index + 1],
                        vertices[index + 4]);
                    var c = getMiddlePoint(vertices[index + 2],
                        vertices[index + 5]);

                    console.log('Add new Vertex')
                    console.log([a,b,c])
                    addVertex(a, b, c)
                    addNormal(a,b,c)
                    vertexCount++

                    if(vertexCount === 3) {
                        addTrisIndices(vertices.length / 3 - 4, vertices.length / 3 - 3, vertices.length / 3 - 2);
                        addLinesIndices(vertices.length / 3 - 4,vertices.length / 3 - 3)
                        addLinesIndices(vertices.length / 3 - 4,vertices.length / 3 - 2)
                        addLinesIndices(vertices.length / 3 - 2,vertices.length / 3 - 4)
                        vertexCount = 0;
                    }
                }
            });

        }
    }

    return {
        createVertexData : createVertexData
    }

}());