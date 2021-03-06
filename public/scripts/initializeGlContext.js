/**
 * Created by damiendg on 2016-12-25.
 */
let gl; // A global variable for the WebGL context
let canvas;

function initializeGLContext() {
    canvas = document.getElementById("glCanvas");
    canvas.width = window.innerWidth; //document.width is obsolete
    canvas.height = window.innerHeight;
    // Initialize the GL context
    gl = initWebGL(canvas);

    // Only continue if WebGL is available and working
    if (!gl) {
        return;
    }

    gl.clearColor(0.5, 0.5, 0.5, 0.9);
    // Enable depth testing
    gl.enable(gl.DEPTH_TEST);
    // Near things obscure far things
    gl.depthFunc(gl.LEQUAL);
    // Clear the color as well as the depth buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    //set WebGL viewPort
    gl.viewport(0,0, canvas.width, canvas.height);

}

function initWebGL(canvas) {
    // Try to grab the standard context. If it fails, fallback to experimental.
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    // If we don't have a GL context, give up now
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
    }

    return gl;
}


export {gl, canvas, initializeGLContext};
