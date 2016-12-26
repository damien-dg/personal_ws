/**
 * Created by damiendg on 2016-12-25.
 */
import gl from "scripts/initialize.gl.context.js";


function createFragmentShader() {
//fragment shader source code
    var fragCode = `
        void main(void) { 
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);
        };
        `;
// Create fragment shader object
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

// Attach fragment shader source code
    gl.shaderSource(fragmentShader, fragCode);

// Compile the fragmentt shader
    gl.compileShader(fragmentShader);
    return fragmentShader;
}
export {createFragmentShader};