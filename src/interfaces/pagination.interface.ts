export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}

export interface ListResponse<T> {
  items: T[];
  pagination: PaginationParams;
}

export interface ListParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  [key: string]: any;
}
