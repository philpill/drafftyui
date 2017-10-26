import Render from './render';

export default class Engine {

    render: Render;

    constructor() {

        this.render = new Render();
    }

    init() {

        console.log('Engine.init()');

        this.render.init();

        this.update();
    }

    update(before = 0) {

        let now = performance.now();

        let delta = (now - before)/1000;

        requestAnimationFrame(() => {

            this.render.update(delta);

            this.update(now);
        });
    }
}