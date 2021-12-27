precision mediump float;

            varying vec4 vPos;
            varying vec3 vNormal;
            varying vec4 vColor;
            varying vec3 vLightPos;

            void main()
            {
	            vec4 color = vColor;
                vec3 lightDirection;
                vec3 vertexToLightSource = vec3(vLightPos - vPos.xyz);
                lightDirection = normalize(vertexToLightSource);

	            if(dot(vNormal, lightDirection) > 0.0) {
                    color = vColor * 0.8;
	            }

	            if(dot(vNormal, lightDirection) > 0.2) {
                    color = vColor * 0.6;
	            }

	            if(dot(vNormal, lightDirection) > 0.4) {
                    color = vColor * 0.4;
	            }

	            gl_FragColor = color;
            }