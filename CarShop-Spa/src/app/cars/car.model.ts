export interface Car {
    id: Number,
    model: string,
    vin: Number,
    url: string,

    make: NameAndID,
    parts: NameAndID[],
}

interface NameAndID {
    name: string;
    id: number;
}