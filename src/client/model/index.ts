export * from './auth';
export * from './captcha';
export * from './ui';

export interface HealthStatus {
    status: string
}

export interface LocaleData<T> {
    items: LocaleDataItem<T>[]
}

export interface LocaleDataItem<T> {
    language: string,
    data: T
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
