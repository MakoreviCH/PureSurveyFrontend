export interface IBaseResponse<T> {
    data: T;
    error: Error | null;
}

export interface Error {
    message: string;
}