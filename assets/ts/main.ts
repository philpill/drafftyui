import Engine from './engine';

export default class Main {

    engine: Engine;

    constructor() {

        this.engine = new Engine();
    }

    init() {

        console.log('init()');

        this.engine.init();
    }
}

let drafftyui = new Main();

drafftyui.init();