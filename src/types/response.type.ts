export type ApiResponse<T> = {
  data: T;
  error: string | null;
  meta?: any;
};
