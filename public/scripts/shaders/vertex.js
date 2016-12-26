/**
 * Created by damiendg on 2016-12-25.
 */
import gl from "scripts/initialize.gl.context.js";

function createVertexShader(){
    var vertexCode = `
    attribute vec3 coordinates;

    void main(void) {
        gl_Position = vec4(coordinates, 1.0);
    }
    
    `;
// Create a vertex shader object
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);

// Attach vertex shader source code
    gl.shaderSource(vertexShader, vertexCode);

// Compile the vertex shader
    gl.compileShader(vertexShader);

    return vertexShader;
}


export {createVertexShader}