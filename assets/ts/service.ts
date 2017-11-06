import Game from './game';
import Piece from './piece';
import Player from './player';
import MockService from './service.mock';

export default class Service {

    private mockService: MockService;

    constructor() {

        this.mockService = new MockService();
    }

    login(username: string, password: string) {

        return this.mockService.login(username, password);
    }

    createGame(): Promise<Game> {
        // get playerId from cookie
        return this.mockService.createGame();
    }

    startGame(id: string): Game {

        return this.mockService.startGame(id);
    }

    getPlayer(id: string): Promise<Player> {

        return this.mockService.getPlayer(id);
    }

    getGames(): Promise<Game[]> {

        return this.mockService.getGames();
    }

    joinGame(gameId: string) {

        return this.mockService.joinGame(gameId);
    }

    exitGame() {

    }

    terminateGame() {

        this.mockService.terminateGame();
    }

    movePiece(pieceId: string, position: number): Piece[] {

        // this._sendData('/move', { id: pieceId, position: position });

        return this.mockService.movePiece(pieceId, position);
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    private _sendData<T>(url: string, body?: any): Promise<T> {

        return new Promise<T>((resolve, reject) => {

            return fetch(url, {

                method: body ? 'post' : 'get',
                body: JSON.stringify(body)

            }).then((response) => {

                return resolve(response.json());

            }).catch(function(err) {

                return reject(err);
            });
        });
    }
}








