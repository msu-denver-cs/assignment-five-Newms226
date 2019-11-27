export interface Query {
    table: string;
    params: QueryParams;
}

export interface QueryParams {
    page?: number;
    order?: string;
    desc?: boolean;
}
