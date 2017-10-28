import Game from './game';
import Service from './service';

export default class Main {

    game: Game;
    service: Service;

    constructor() {

        this.service = new Service();
    }

    init() {

        console.log('init()');

        this.service.createGame().then((game) => {

            this.game = game;

        }).then(() => {

            this.service.joinGame(this.game.uuid);
            this.service.startGame(this.game.uuid);
        });


    }
}

let drafftyui = new Main();

drafftyui.init();