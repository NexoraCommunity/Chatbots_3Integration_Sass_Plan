import { Pagination } from './web.model';

export interface Category {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryApi {
  name: string;
}

export interface ChangeCategory {
  id: string;
  name: string;
}

export interface GetModelCategory {
  page: string;
  limit: string;
}

export interface PaginationResponseCategory {
  data: Category[];
  pagination: Pagination;
}

export interface SingleCategoryResponse {
  data: Category;
  status: string;
}
