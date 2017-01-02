/**
 * Created by damiendg on 2016-12-28.
 */
import {gl} from "scripts/initializeGlContext.js";
import {shaderProgram} from "scripts/initializeShaders.js";

function Renderer(){
    this.renderArray = [];
    this.vertexArray = [];
    this.vertexArraySize =0;
}

Renderer.prototype = {
    constructor: Renderer,
    renderScene: function(){
        gl.drawArrays(gl.TRIANGLES, 0, this.vertexArraySize );
    },
    addSceneObjectToRenderArray: function(sceneObjectToAdd){
        this.renderArray.push(sceneObjectToAdd);
        this.vertexArray.push(sceneObjectToAdd.modelMatrix);
        this.vertexArraySize += sceneObjectToAdd.modelMatrix.length/3;
        console.log(this.vertexArraySize);
    },

    createVertexBuffer: function(){
        // Create an empty buffer object to store the vertex buffer
         this.main_vertex_buffer = gl.createBuffer();

        //Bind appropriate array buffer to it
        gl.bindBuffer(gl.ARRAY_BUFFER, this.main_vertex_buffer);
        console.log(this.vertexArray);
        // Pass the vertex data to the buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexArray.join().split(",")), gl.STATIC_DRAW);

        // rebind the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.main_vertex_buffer);

        // Get the attribute location
        let coord = gl.getAttribLocation(shaderProgram, "coordinates");

        // Point an attribute to the currently bound VBO
        gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

        // Enable the attribute
        gl.enableVertexAttribArray(coord);
    }

};

export default Renderer;