import * as PIXI from 'pixi.js';

export default class ComponentBase {

    render: PIXI.Container;
    uuid: string;
    isActive: boolean;

    constructor() {

        this.render = new PIXI.Container();
        this.uuid = Utility.GenerateUUID();
        this.isActive = true;
    }

    init() {

    }
}