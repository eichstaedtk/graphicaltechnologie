	precision mediump float;

	          uniform sampler2D uTexture;
			      varying vec2 vTextureCoord;
            varying vec4 vPos;
            varying vec3 vNormal;
            varying vec4 vColor;
            varying vec3 vLightPos;

            vec4 generateColor()
            			{
            				if (vTextureCoord.s > 0.05+(0.5*cos(vTextureCoord.s * 8.0)) &&
            				    vTextureCoord.s < 0.50+ (0.5*cos(vTextureCoord.s* 3.4)))
            				{
            						return vec4(mix(vec3(0.8, 0.5, 0.2), vec3(0.2, 0.8, 0.5), 0.5*cos(vTextureCoord.s * 8.0) * cos(vTextureCoord.t * 6.0)), 1.0);
            				}
            				else
            				{
            					return texture2D(uTexture, vTextureCoord);
            				}
            			}

            void main()
            {
	              vec4 color = vColor;
                vec3 lightDirection;
                vec3 vertexToLightSource = vec3(vLightPos - vPos.xyz);
                lightDirection = normalize(vertexToLightSource);
	              gl_FragColor = generateColor();
            }