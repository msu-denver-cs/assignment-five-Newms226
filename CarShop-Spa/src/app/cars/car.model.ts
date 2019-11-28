export class Car {
    constructor(
        public id: Number,
        public model: string,
        public vin: Number,
        public url: string,

        public _make: NameAndID,
        public _parts: NameAndID[],
    ) {}

    get makeName(): string { return this._make.name }
    get makeId(): number { return this._make.id}

    get partsNames(): string[] {
        return this._parts.map(part => part.name)
    }
    
    get partsIds(): number[] {
        return this._parts.map(part => part.id)
    }
}

interface NameAndID {
    name: string;
    id: number;
}