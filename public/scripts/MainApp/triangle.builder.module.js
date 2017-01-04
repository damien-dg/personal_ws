/**
 * Created by damiendg on 2017-01-03.
 */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from 'scripts/MainApp/triangle.builder.component.js';

let AppModule =
    NgModule({
        imports: [ BrowserModule ],
        declarations: [ AppComponent ],
        bootstrap: [ AppComponent ]
    })
    .Class({
        constructor: function() {}
    });

export {AppModule}

