export interface ApiReturn<T> {
    ok: boolean;
    data?: T;
    error?: unknown;
    pageNumber?: number;
    pageSize?: number;
    totalRecords?: number;
    totalPages?: number;
  }

  export interface ApiResponse<T> {
    isSuccess: boolean;
    data?: T;
    errorMessage?: string;
    pageNumber?: number;
    pageSize?: number;
    totalRecords?: number;
    totalPages?: number;
  }
  