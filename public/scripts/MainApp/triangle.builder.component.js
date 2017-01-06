/**
 * Created by damiendg on 2017-01-03.
 */

import {Component, HostListener} from '@angular/core';

let AppComponent =
    Component({
        selector: 'triangle-builder',
        template: '<div>DLSKJADHSJKALHDSJKALD</div>'
    })
    .Class({
        constructor() {
            this.mouseDown = false;
            this.currentXPos;
            this.currentYPos;
        },
        onMouseUp: function(){
            this.mouseDown = false;
        },
        onMousedown : function(){
            let temp = HostListener('document: mouseDown', function(event) {
                console.log("MOUSING DOWN");
                this.mouseDown = true;
                this.currentXPos = event.clientX;
                this.currentYPos = event.clientY;
            });
            console.log(temp);
            return temp;
        }
    });


export {AppComponent};