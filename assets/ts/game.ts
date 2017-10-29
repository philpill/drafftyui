import Player from './player';
import Piece from './piece';
import Engine from './engine';
import { GenerateUUID } from './utility';

export default class Game {

    uuid: string;

    created: number;
    started: number;
    finished: number;
    player1: Player;
    player2: Player;

    state: Piece[];

    readonly GRID = 64;
    readonly ROW = 8;
    readonly PIECES = 12;

    engine: Engine;

    constructor() {

        this.uuid = GenerateUUID();
        this.engine = new Engine();
        this.created = Date.now();
        this.state = [];
    }

    initialiseGameState() {

        // 12 pieces per player
        // pieces on odd squares only
        // 64 squares

        for (let i = 0; i < this.GRID; i++) {
            this.state[i] = null;
        }

        for (let i = 0; i < this.PIECES; i++) {

            let piece = new Piece(this.player1.uuid);

            piece.position = i * 2;
            piece.direction = 1;

            let isOddRow = (Math.floor(piece.position/this.ROW))%2 === 1;

            piece.position = isOddRow ? piece.position : piece.position + 1;

            this.state[piece.position] = piece;
        }

        for (let i = 0; i < this.PIECES; i++) {

            let piece = new Piece(this.player2.uuid);

            piece.position = 63 - (i * 2);
            piece.direction = -1;

            let isOddRow = (Math.floor(piece.position/this.ROW))%2 === 1;

            piece.position = isOddRow ? piece.position - 1 : piece.position;

            this.state[piece.position] = piece;
        }
    }

    start() {

        this.started = Date.now();
        this.initialiseGameState();
        this.player1.activate();
        this.player2.activate();
        this.engine.init(this.state);

    }

    finish() {

        this.finished = Date.now();

        this.player1.deactivate();
        this.player2.deactivate();
    }
}