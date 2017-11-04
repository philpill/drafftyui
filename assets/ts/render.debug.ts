import 'normalize.css';
import '../sass/debug.scss';

import Piece from './piece';
import Service from './service';

import Events from './events';

export default class RenderDebug {

    docBody: HTMLElement;

    stage: HTMLTableElement;

    pieces: Piece[];

    sortedPieces: { [player: string] : Piece[]; };

    private readonly selectedClass = 'piece-selected';
    private readonly availableClass = 'grid-available';

    service: Service;

    events: Events;

    constructor() {

        this.service = new Service();

        this.docBody = document.body;

        this.sortedPieces = {};

        this.pieces = [];

        this.events = Events.getInstance();
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

    deselectAllPieces() {

        this.pieces.forEach((piece: Piece) => {

            if (piece) {
                (piece.renderObject as HTMLAnchorElement).classList.remove(this.selectedClass);
                piece.deselect();
            }
        });
    }

    selectPiece(piece: Piece) {

        console.log(this);

        this.deselectAllPieces();
        this.removeAllHighlights();

        (piece.renderObject as HTMLAnchorElement).classList.add(this.selectedClass);
        piece.select();
        this.highlightGridMoves(piece);
    }

    selectAvailableGrid(e: MouseEvent) {

        e.stopPropagation();

        let cell = e.target as HTMLTableDataCellElement;

        if (cell.classList.contains(this.availableClass)) {

            // move piece to this grid
            let selectedPieces = this.pieces.filter((piece: Piece) => {
                return piece && piece.isSelected;
            });

            if (selectedPieces.length) {

                let piece = selectedPieces[0];

                piece.position = parseInt(cell.getAttribute('data-id'), 10);

                this.events.emit('render:piece:move', piece.uuid, piece.position);

                document.getElementById(`Grid${piece.position}`).appendChild(piece.renderObject);

                // deselect piece
                this.deselectAllPieces();

                // reset grids
                this.removeAllHighlights();

            }
        }
    }

    removeAllHighlights() {

        Array.from(document.getElementsByClassName(this.availableClass)).map((el: HTMLTableDataCellElement) => {

            el.classList.remove(this.availableClass);
        });
    }

    highlightGridMoves(piece: Piece) {

        let currentPosition = piece.position;
        let isKing = piece.isKing;
        let isAscending = piece.direction === 1;

        let pos1 = isKing || isAscending ? currentPosition + 8 + 1 : -1;
        let pos2 = isKing || isAscending ? currentPosition + 8 - 1 : -1;
        let pos3 = isKing || !isAscending ? currentPosition - 8 + 1 : -1;
        let pos4 = isKing || !isAscending ? currentPosition - 8 - 1 : -1;


        // check for occupied squares


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

        let grids = Array.from(this.stage.getElementsByTagName('td'));

        grids.map((grid: HTMLTableDataCellElement) => {

            grid.onclick = this.selectAvailableGrid.bind(this);
        });

        this.docBody.appendChild(this.stage);
    }

    createRow(rowIndex) {

        let row = '<tr>';

        for (let i = 0; i < 8; i++) {

            let id = i + (rowIndex * 8);

            row += `<td id="Grid${ id }" data-id="${ id }"></td>`;
        }

        row += '</tr>';

        return row;
    }

    update(dt) {

    }
}