import 'normalize.css';
import '../sass/debug.scss';

import Piece from 'piece';

export default class RenderDebug {

    docBody: HTMLElement;

    stage: HTMLTableElement;

    pieces: Piece[];

    sortedPieces: { [player: string] : Piece[]; };

    private readonly selectedClass = 'piece-selected';
    private readonly availableClass = 'grid-available';

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

                let el = document.getElementById(`Grid${ piece.position }`);

                el.appendChild(piece.renderObject);
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
                (piece.renderObject as HTMLAnchorElement).classList.remove(this.selectedClass);
                piece.deselect();
                this.removeAllHighlights();
            }
        });

        (piece.renderObject as HTMLAnchorElement).classList.add(this.selectedClass);
        piece.select();
        this.highlightGridMoves(piece);
    }

    removeAllHighlights() {

        let els = Array.from(document.getElementsByClassName(this.availableClass));

        for (var el of els) {

            el.classList.remove(this.availableClass);
        }
    }

    highlightGridMoves(piece: Piece) {

        let currentPosition = piece.position;
        let isKing = piece.isKing;
        let isAscending = piece.direction === 1;

        let pos1 = isKing || isAscending ? currentPosition + 8 + 1 : -1;
        let pos2 = isKing || isAscending ? currentPosition + 8 - 1 : -1;
        let pos3 = isKing || !isAscending ? currentPosition - 8 + 1 : -1;
        let pos4 = isKing || !isAscending ? currentPosition - 8 - 1 : -1;

        if (pos1 !== -1 && Math.floor(pos1/8)-1 === Math.floor(currentPosition/8) ) {
            document.getElementById(`Grid${ pos1 }`).classList.add(this.availableClass);
        }

        if (pos2 !== -1 && Math.floor(pos2/8)-1 === Math.floor(currentPosition/8) ) {
            document.getElementById(`Grid${ pos2 }`).classList.add(this.availableClass);
        }

        if (pos3 !== -1 && Math.floor(pos3/8)+1 === Math.floor(currentPosition/8) ) {
            document.getElementById(`Grid${ pos3 }`).classList.add(this.availableClass);
        }

        if (pos4 !== -1 && Math.floor(pos4/8)+1 === Math.floor(currentPosition/8) ) {
            document.getElementById(`Grid${ pos4 }`).classList.add(this.availableClass);
        }
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

            let id = `Grid${i + (rowIndex*8)}`;

            row += `<td id="${ id }"></td>`;
        }

        row += '</tr>';

        return row;
    }

    update(dt) {

    }
}