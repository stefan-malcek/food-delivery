export interface QueryResult<T> {
  totalItems: number;
  page: number;
  pageSize: number;
  items: Array<T>;
}
