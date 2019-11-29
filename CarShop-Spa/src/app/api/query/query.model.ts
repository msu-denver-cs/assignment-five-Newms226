export interface Query {
    table: string;
    params: QueryParams;
}

export interface QueryParams {
    page?: number;
    per_page?: number;
    order?: string;
    desc?: boolean;
}
