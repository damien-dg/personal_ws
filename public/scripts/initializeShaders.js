/**
 * Created by damiendg on 2016-12-27.
 */
import {gl, initializeGLContext} from "scripts/initializeGlContext.js";
import {createFragmentShader} from "scripts/shaders/fragment.js"
import {createVertexShader} from "scripts/shaders/vertex.js"


function initShaders(){

    let shaderProgram = gl.createProgram();

    let vertexShader = createVertexShader();
    let fragmentShader = createFragmentShader();
// Attach a vertex shader
    gl.attachShader(shaderProgram,  vertexShader);

// Attach a fragment shader
    gl.attachShader(shaderProgram, fragmentShader );

// Link both the programs
    gl.linkProgram(shaderProgram);

// Use the combined shader program object
    gl.useProgram(shaderProgram);
}

export {initShaders};