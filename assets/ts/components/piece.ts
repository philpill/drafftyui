import ComponentBase from './base';
import { Colour } from '../enum';
import { IBoardPosition } from '../iBoardPosition';

export default class Piece extends ComponentBase {

    private readonly colour: Colour;
    private isKing: boolean;
    private position: IBoardPosition;

    constructor(colour) {
        super();

        this.colour = colour;
        this.isKing = false;
    }

    init() {


    }

    setPosition(newPosition: IBoardPosition) {

        this.position = newPosition;
    }

    getPosition(): IBoardPosition {

        return this.position;
    }
}