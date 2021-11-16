var ballMesh = ( function() {

    function createVertexData() {

        console.log('Create Data for Ball with Mesh')

        var verticesIndex = 0;
        var normalIndex = 0;
        var trisIndex = 0;
        var linesIndex = 0;
        var recursionLevel = 1;
        var pointMap = new Map();

        this.vertices = new Float32Array(recursionLevel * 20 * 3 * 12);
        var vertices = this.vertices;
        // Normals.
        this.normals = new Float32Array(recursionLevel * 20 * 3 *12);
        var normals = this.normals;
        // Index data.
        this.indicesLines = new Uint16Array(recursionLevel * 2 * 16 * 3);
        var indicesLines = this.indicesLines;
        this.indicesTris = new Uint16Array(recursionLevel * 12 * 3 * 5);
        var indicesTris = this.indicesTris;


        function addVertex(x,y,z, pointNumber) {
            vertices[verticesIndex++] = x*0.2;
            vertices[verticesIndex++] = y*0.2;
            vertices[verticesIndex++] = z*0.2;
            pointMap.set(pointNumber,[x*0.2,y*0.2,z*0.2])
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

            var pointNumber = pointMap.size+1

            addVertex(((p1[0]+p2[0])/2),((p1[1]+p2[1])/2),((p1[2]+p2[2])/2),pointNumber)
            addNormal(((p1[0]+p2[0])/2),((p1[1]+p2[1])/2),((p1[2]+p2[2])/2))

            console.log('Get Middle Point '+pointNumber)

            return pointNumber;
        }


        var t = (1.0 + Math.sqrt(5.0)) / 2.0;

        addVertex(-1,  t,  0,0);
        addVertex( 1,  t,  0,1);
        addVertex(-1, -t,  0,2);
        addVertex(1, -t,  0,3);

        addVertex( 0, -1,  t,4);
        addVertex(0,  1,  t,5);
        addVertex(0, -1, -t,6);
        addVertex(0,  1, -t,7);

        addVertex( t,  0, -1,8);
        addVertex( t,  0,  1,9);
        addVertex(-t,  0, -1,10);
        addVertex(-t,  0,  1,11);

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
            var indicesTris2 = this.indicesTris;

            indicesTris.forEach(function (element, index) {

                if(index % 3 === 0 && indicesTris[index+2]) {

                    var a = getMiddlePoint(pointMap.get(indicesTris[index]),
                        pointMap.get(indicesTris[index + 1]));
                    var b = getMiddlePoint(pointMap.get(indicesTris[index + 1]),
                        pointMap.get(indicesTris[index + 2]));
                    var c = getMiddlePoint(pointMap.get(indicesTris[index + 2]),
                        pointMap.get(indicesTris[index]));

                    indicesTris2[indicesTris2.length] = pointMap.get(
                        indicesTris[index])
                    indicesTris2[indicesTris2.length + 1] = a
                    indicesTris2[indicesTris2.length + 2] = c

                    indicesTris2[indicesTris2.length + 3] = pointMap.get(
                        indicesTris[index + 1])
                    indicesTris2[indicesTris2.length + 4] = b
                    indicesTris2[indicesTris2.length + 5] = a

                    indicesTris2[indicesTris2.length + 6] = pointMap.get(
                        indicesTris[index + 2])
                    indicesTris2[indicesTris2.length + 7] = c
                    indicesTris2[indicesTris2.length + 8] = b

                    indicesTris2[indicesTris2.length + 9] = a
                    indicesTris2[indicesTris2.length + 10] = b
                    indicesTris2[indicesTris2.length + 11] = c
                }
            });

            this.indicesTris = indicesTris2
        }
    }

    return {
        createVertexData : createVertexData
    }

}());