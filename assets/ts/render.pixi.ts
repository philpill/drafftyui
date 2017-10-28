import * as PIXI from 'pixi.js';

export default class RenderPixi {

    pixiApp: PIXI.Application;

    constructor() {

    }

    init() {

        console.log('Render.init()');

        this.createCanvas();
    }

    createCanvas() {

        this.pixiApp = new PIXI.Application(800, 600, {

            backgroundColor : 0xefefef
        });

        document.body.appendChild(this.pixiApp.view);
    }

    update(dt) {

    }
}