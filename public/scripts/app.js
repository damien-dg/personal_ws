/**
 * Created by damiendg on 2016-12-25.
 */
import {gl, start} from "scripts/initialize.gl.context.js";
import {createFragmentShader} from "scripts/shaders/fragment.js"
import {createVertexShader} from "scripts/shaders/vertex.js"


function initShaders(){

    var shaderProgram = gl.createProgram();

    var vertexShader = createVertexShader();
    var fragmentShader = createFragmentShader();
// Attach a vertex shader
    gl.attachShader(shaderProgram,  vertexShader);

// Attach a fragment shader
    gl.attachShader(shaderProgram, fragmentShader );

// Link both the programs
    gl.linkProgram(shaderProgram);

// Use the combined shader program object
    gl.useProgram(shaderProgram);
}

window.onload = function(){
    start();
    initShaders();
};
