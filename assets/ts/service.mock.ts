import Game from './game';
import Piece from './piece';
import Player from './player';

export default class ServiceMock {

    //temp mock game session
    tempGames: Game[];
    tempPlayers: Player[];

    constructor() {

        this.tempGames = [];
        this.tempPlayers = [];
    }

    login(username: string, password: string) {


    }

    createGame(): Promise<Game> {
        // get playerId from cookie

        let game = new Game();

        let player = new Player('bob');

        this.tempPlayers.push(player);

        game.player1 = player;

        this.tempGames.push(game);

        return new Promise((resolve, reject) => {

            resolve(game);
        });
    }

    startGame(id: string): Game {

        let game = this.tempGames[0];

        if (game.player1 && game.player2) {
            game.start();
        }

        return game;
    }

    getPlayer(id: string): Promise<Player> {

        let players = this.tempPlayers.filter((player: Player) => {

            return player.uuid === id;
        });

        return new Promise((resolve, reject) => {

            resolve(players[0]);
        });
    }

    getGames(): Promise<Game[]> {

        return new Promise((resolve, reject) => {

            resolve(this.tempGames);
        });
    }

    joinGame(gameId: string) {

        let player = new Player('sue');
        this.tempPlayers.push(player);

        this.tempGames[0].player2 = player;
    }

    exitGame() {

    }

    terminateGame() {

        this.tempGames[0].finish();
    }

    movePiece(pieceId: string, position: number): Piece[] {

        // get piece position
        let currentPosition = this.tempGames[0].state.findIndex((piece: Piece) => {
            return piece && piece.uuid === pieceId;
        });

        // check position is empty
        this.tempGames[0].state[position];

        // check move is legal

        // update piece position
        let piece = this.tempGames[0].state.find((piece: Piece) => {
            return piece && piece.uuid === pieceId;
        });

        piece.position = position;

        return this.tempGames[0].state;
    }
}








