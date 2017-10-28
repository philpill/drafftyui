import { GenerateUUID } from './utility';

export default class Piece {

    isKing: boolean;
    position: number;
    owner: string;
    uuid: string;
    isActive: boolean;
    renderObject: any;

    constructor(owner: string) {

        this.uuid = GenerateUUID();
        this.isActive = true;

        this.isKing = false;
        this.owner = owner;
        this.position = 0;
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