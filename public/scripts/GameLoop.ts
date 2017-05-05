/**
 * Created by damiendg on 2017-01-02.
 */
import Renderer from "scripts/Renderer.js";

function GameLoop(){
    this.renderer = new Renderer();
    this.timeAtLastFrame = new Date().getTime();
    this.idealTimePerFrame = 1000 / 30;
    this.leftover = 0.0;
    this.frames = 0;
}

GameLoop.prototype = {
    constructor: GameLoop,
    runGame: function(){
        setInterval(() => this.tick(), 1000/30);
    },
    tick: function(){
        let timeAtThisFrame = new Date().getTime();
        let timeSinceLastDoLogic = (timeAtThisFrame - this.timeAtLastFrame) + this.leftover;
        let catchUpFrameCount = Math.floor(timeSinceLastDoLogic / this.idealTimePerFrame);

        for(let i = 0 ; i < catchUpFrameCount; i++){
            //controller.doLogic();
            this.frames++;
        }

        this.renderer.renderScene();

        this.leftover = timeSinceLastDoLogic - (catchUpFrameCount * this.idealTimePerFrame);
        this.timeAtLastFrame = timeAtThisFrame;
    }
};

export default GameLoop;