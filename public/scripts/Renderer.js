/**
 * Created by damiendg on 2016-12-28.
 */
import {gl} from "scripts/initializeGlContext.js";
import {shaderProgram} from "scripts/initializeShaders.js";

const MAIN_BUFFER_SIZE= 1024;

function Renderer() {
    this.renderArray = [];
    this.vertexArray = [];
    this.vertexArraySize = 0;

}

Renderer.prototype = {
    constructor: Renderer,
    renderScene: function () {
        gl.drawArrays(gl.TRIANGLES, 0, this.vertexArraySize);
    },
    addSceneObjectToRenderArray: function (sceneObjectToAdd) {
        this.renderArray.push(sceneObjectToAdd);
        Array.prototype.push.apply(this.vertexArray, sceneObjectToAdd.modelMatrix);
        if(this.mainVertexBuffer){
            //each vertex is "4" in size: 32 bits -> 4 bytes (Float32)
            gl.bufferSubData(gl.ARRAY_BUFFER, this.vertexArraySize * 3 * 4, new Float32Array(sceneObjectToAdd.modelMatrix));
        }
        this.vertexArraySize += sceneObjectToAdd.modelMatrix.length / 3;
    },

    createVertexBuffer: function () {
        // Create an empty buffer object to store the vertex buffer
        this.mainVertexBuffer = gl.createBuffer();
        console.log(this.mainVertexBuffer);
        //Bind appropriate array buffer to it
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mainVertexBuffer);
        //set buffer size
        gl.bufferData(gl.ARRAY_BUFFER, MAIN_BUFFER_SIZE, gl.DYNAMIC_DRAW);
        // Pass the vertex data to the buffer
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(this.vertexArray));

        // rebind the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mainVertexBuffer);

        // Get the attribute location
        let coord = gl.getAttribLocation(shaderProgram, "coordinates");

        // Point an attribute to the currently bound VBO
        gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

        // Enable the attribute
        gl.enableVertexAttribArray(coord);
    }

};

export default Renderer;