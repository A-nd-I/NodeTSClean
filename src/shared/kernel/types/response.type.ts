export interface ResponseType<T> {
   data: T;
   message?: string;
   success: boolean;
}
