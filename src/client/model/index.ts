export * from './auth';
export * from './authority';
export * from './captcha';
export * from './ui';
export * from './user';

export interface HealthStatus {
    status: string
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

export interface SingleValueBody<T> {
    value: T
}
