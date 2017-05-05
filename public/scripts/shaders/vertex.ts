/**
 * Created by damiendg on 2016-12-25.
 */
import {gl} from "scripts/initializeGlContext.js";
import vertexShaderCode from "scripts/shaders/chunks/basicVertex.glsl"


function createVertexShader(){
    let vertexCode = vertexShaderCode;
// Create a vertex shader object
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);

// Attach vertex shader source code
    gl.shaderSource(vertexShader, vertexCode);

// Compile the vertex shader
    gl.compileShader(vertexShader);

    return vertexShader;
}


export {createVertexShader};