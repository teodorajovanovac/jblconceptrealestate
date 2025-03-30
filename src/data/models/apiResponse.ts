  export interface ApiResponse<T> {
    isSuccess: boolean;
    data?: T;
    errorMessage?: string;
    pageNumber?: number;
    pageSize?: number;
    totalRecords?: number;
    totalPages?: number;
  }

  export interface ApiRequest<T> {
    data?: T;
    queryString?: string;
    pageNumber?: number;
    pageSize?: number;
  }


  