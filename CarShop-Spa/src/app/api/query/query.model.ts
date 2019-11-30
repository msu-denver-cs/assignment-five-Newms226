export interface Query {
    table: string;
    params: QueryParams;
}

export interface QueryParams {
    page?: number;
    perpage?: number;
    order?: string;
    desc?: boolean;
}
