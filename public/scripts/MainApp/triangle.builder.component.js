/**
 * Created by damiendg on 2017-01-03.
 */

import {Component, HostListener} from '@angular/core';
import {canvas} from 'scripts/initializeGlContext.js'
import {mainGame} from "scripts/initializeGame.js";
import SceneObject from "scripts/SceneObject.js";

let AppComponent =
    Component({
        selector: 'triangle-builder',
        template: '<div ' +
                    '[style.width.px]="width" ' +
                    '[style.height.px]="height"' +
                    '(click)="placeVertex($event)">' + '</div>'
    })
    .Class({
        constructor() {
            this.mouseDown = false;
            this.width = document.body.clientWidth;
            this.height = document.body.clientHeight -1;
            this.currentXPos;
            this.currentYPos;
        },
        onMouseUp: function(){
            console.log("MOUSING DOWN");
            this.mouseDown = false;
        },
        placeVertex : function(event){
                this.currentXPos = event.clientX;
                this.currentYPos = event.clientY;
                let actualX = event.clientX/canvas.width;
                let actualY = event.clientY/canvas.height;
                let actualZ = 0.0;
                mainGame.renderer.addSceneObjectToRenderArray(new SceneObject([actualX, actualY, actualZ]));

        }
    });


export {AppComponent};