import { GenerateUUID } from './utility';

export default class Player {

    uuid: string;
    name: string;
    isActive: boolean;

    constructor(name: string) {

        this.uuid = GenerateUUID();
        this.name = name;
        this.isActive = false;
    }

    init() {

    }

    activate() {
        this.isActive = true;
    }

    deactivate() {
        this.isActive = false;
    }
}