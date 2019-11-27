export interface APIMeta {
    total: number;
    paginated?: boolean;
    cur_page?: number;
    per_page?: number;
    count?: number;
}

export interface APIResponse<T> {
    meta: APIMeta;
    data: T[];
}