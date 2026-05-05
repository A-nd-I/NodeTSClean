export interface InnerResponseType<T> {
   data: T;
   message: string;
   success: boolean;
}

export interface OuterResponseType {
   code?: string;
   response: string;
   statusCode?: number;
   success: boolean;
}
