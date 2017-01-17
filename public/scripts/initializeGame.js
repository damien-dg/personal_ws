/**
 * Created by damiendg on 2017-01-16.
 */
import GameLoop from "scripts/GameLoop"

let mainGame;
function initGame(){
    mainGame = new GameLoop();
}

export {mainGame, initGame};