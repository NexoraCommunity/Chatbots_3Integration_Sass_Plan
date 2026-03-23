export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface WebResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status?: string;
  pagination?: Pagination;
}
