/**
 * Created by damiendg on 2016-12-25.
 */
import {gl, initializeGLContext} from "scripts/initializeGlContext.js";
import {initShaders, shaderProgram} from 'scripts/initializeShaders.js';
import {$M, $V} from 'sylvester';
import SceneObject from 'scripts/SceneObject.js';
import {mainGame, initGame} from "scripts/initializeGame.js"
//TEMP FIX FOR DEPENDENCY ERROR
import 'reflect-metadata';
import 'zone.js'
import 'scripts/MainApp/main.js';

window.onload = function(){
    initializeGLContext();
    initShaders();
    console.log(physics);

    let vertices = [
        -0.5,0.5,0.0,
        0.0,0.5,0.0,
        -0.25,0.25,0.0,
    ];

    let vertices2 = [
        0.99,0.99,0.0,
        0.1,0.7,0.0,
        -0.99,-0.99,0.0
    ];


    initGame();
    mainGame.renderer.addSceneObjectToRenderArray(new SceneObject(vertices));
    mainGame.renderer.addSceneObjectToRenderArray(new SceneObject(vertices2));
    mainGame.renderer.createVertexBuffer();
    mainGame.runGame();

    window.createRandomTriangle = function(){
        let vertices2 = [
            0.5,-0.5,0.0,
            0.0,-0.5,0.0,
            0.25,-0.25,0.0,
        ];
        mainGame.renderer.addSceneObjectToRenderArray(new SceneObject(vertices2));
    };

};

export default mainGame
