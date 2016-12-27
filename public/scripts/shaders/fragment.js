/**
 * Created by damiendg on 2016-12-25.
 */
import {gl} from "scripts/initializeGlContext.js";
import fragmentShaderCode from "scripts/shaders/chunks/basicFragment.glsl"

function createFragmentShader() {
    //fragment shader source code
    let fragCode = fragmentShaderCode;
    // Create fragment shader object
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragmentShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragmentShader);

    return fragmentShader;
}
export {createFragmentShader};