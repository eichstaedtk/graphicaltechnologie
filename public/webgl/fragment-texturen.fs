precision mediump float;

	          uniform sampler2D uTexture;
			      varying vec2 vTextureCoord;
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
	              gl_FragColor = texture2D(uTexture, vTextureCoord);
            }