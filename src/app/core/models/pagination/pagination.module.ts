export interface PaginatedResponse<T> {
  page: number;
  result: T[];
  total_pages: number;
  total_results: number
 }
