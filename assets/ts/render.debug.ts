import 'normalize.css';
import '../sass/debug.scss';

import Piece from 'piece';

export default class RenderDebug {

    docBody: HTMLElement;

    stage: HTMLTableElement;

    pieces: Piece[];

    sortedPieces: { [player: string] : Piece[]; };

    constructor() {

        this.docBody = document.body;

        this.sortedPieces = {};

        this.pieces = [];
    }

    init(pieces: Piece[]) {

        console.log('Render.init()');

        this.pieces = pieces;

        this.sortPieces(pieces);

        this.renderPieces(pieces);

        this.createBoard();

        this.placePieces(pieces);
    }

    placePieces(pieces: Piece[]) {

        pieces.map((piece: Piece) => {

            if (piece) {

                document.getElementById(`Grid${ piece.position }`).appendChild(piece.renderObject);
            }
        });
    }

    sortPieces(pieces: Piece[]) {

        pieces.forEach((piece: Piece) => {

            if (piece) {

                this.sortedPieces[piece.owner] = this.sortedPieces[piece.owner] || [];

                this.sortedPieces[piece.owner].push(piece);
            }
        });
    }

    renderPieces(pieces: Piece[]) {

        pieces.forEach((piece: Piece) => {

            if (piece) {

                let playerIds = Object.keys(this.sortedPieces);

                let playerIndex = playerIds.indexOf(piece.owner);

                piece.renderObject = this.getPieceEl(piece.uuid, playerIndex);

                piece.renderObject.onclick = this.selectPiece.bind(this, piece);
            }
        });
    }

    selectPiece(piece: Piece) {

        console.log(this);

        this.pieces.forEach((piece: Piece) => {

            if (piece) {
                piece.deselect();
            }
        });

        piece.select();
    }

    getPieceEl(id: string, playerIndex: number) {

        let el = document.createElement('a');

        el.id = id;

        el.classList.add(`player${playerIndex}`);

        return el;
    }

    createBoard() {

        this.stage = document.createElement('table');

        this.stage.id = 'Stage';

        let rows = '';

        for (let i = 0; i < 8; i++) {

            rows += this.createRow(i);
        }

        this.stage.innerHTML = rows;

        this.docBody.appendChild(this.stage);
    }

    createRow(rowIndex) {

        let row = '<tr>';

        for (let i = 0; i < 8; i++) {

            row += '<td id="Grid' + (i + (rowIndex*8)) + '"></td>';
        }

        row += '</tr>';

        return row;
    }

    update(dt) {

    }
}