/**
 * Created by damiendg on 2016-12-25.
 */
import {gl, initializeGLContext} from "scripts/initializeGlContext.js";
import {initShaders} from 'scripts/initializeShaders.js'

window.onload = function(){
    initializeGLContext();
    initShaders();
};
