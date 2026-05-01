export interface InnerResponseType<T> {
   data: T;
   message: string;
   success: boolean;
}

export interface OuterResponseType {
   response: string;
   success: boolean;
}
