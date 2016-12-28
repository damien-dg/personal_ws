/**
 * Created by damiendg on 2016-12-25.
 */
import {gl, initializeGLContext} from "scripts/initializeGlContext.js";
import {initShaders, shaderProgram} from 'scripts/initializeShaders.js';
import {$M, $V} from 'sylvester';
import SceneObject from 'scripts/SceneObject.js';
import Renderer from 'scripts/Renderer.js';

window.onload = function(){
    initializeGLContext();
    initShaders();

    let vertices = [
        -0.5,0.5,0.0,
        0.0,0.5,0.0,
        -0.25,0.25,0.0,
    ];


    let mainGame = new Renderer();
    mainGame.addSceneObjectToRenderArray(new SceneObject(vertices));
    mainGame.createVertexBuffer();
    gl.drawArrays(gl.TRIANGLES, 0, 3);

};
