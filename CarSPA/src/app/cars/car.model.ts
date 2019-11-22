export class Car {
    constructor(
        public id: Number,
        public model: string,
        public vin: Number,
        public make: string,
        public parts: string[],
        
        url: string,
        makeId: Number,
        createdAt: string,
        updatedAt: string
    ) {}
}