import { GenerateUUID } from './utility';

export default class Piece {

    isKing: boolean;
    position: number;
    owner: string;
    uuid: string;
    isActive: boolean;
    renderObject: any;
    direction: -1 | 1;

    constructor(owner: string) {

        this.uuid = GenerateUUID();
        this.isActive = true;

        this.isKing = false;
        this.owner = owner;
        this.position = 0;
        this.direction = 1;
    }

    init() {

    }

    select() {

        console.log('Piece.select()');
        console.log(this.uuid);
    }

    deselect() {

        console.log('Piece.deselect()');
        console.log(this.uuid);
    }
}