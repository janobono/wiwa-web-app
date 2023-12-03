export interface Pageable {
    page: number,
    size: number,
    sort?: {
        field: string,
        asc: boolean
    }
}

export interface Page<T> {
    totalPages: number,
    totalElements: number,
    size: number,
    content: T[],
    number: number,
    last: boolean,
    first: boolean,
    numberOfElements: number,
    empty: boolean
}
