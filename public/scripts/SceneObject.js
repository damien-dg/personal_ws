/**
 * Created by damiendg on 2016-12-25.
 */
import RigidBody from "scripts/RigidBody.js"
function SceneObject(modelMatrix, position){
    this.postion = position || [0,0,0];
    this.modelMatrix = modelMatrix;
    this.rigidBody = new RigidBody();
}

SceneObject.prototype = {
    constructor: SceneObject
};

export default SceneObject;