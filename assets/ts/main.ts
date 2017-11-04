import Game from './game';
import Service from './service';
import Events from './events';

export default class Main {

    game: Game;
    service: Service;
    events: Events;

    constructor() {

        this.service = new Service();
        this.events = Events.getInstance();

        this.bindEvents();
    }

    bindEvents() {

        this.events.on('render:piece:move', (uuid, position) => {

            console.log('render:piece:move', uuid, position);

            this.game.state = this.service.movePiece(uuid, position);
        });
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