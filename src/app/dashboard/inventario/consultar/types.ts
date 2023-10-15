export type Inventory = Items[];

export interface Items {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  product: string;
  brand: string;
  description: string;
  qty: number;
  price: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  line: string;
  dimensions: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export type Data = Omit<Attributes, 'createdAt' | 'updatedAt' | 'publishedAt'>;

export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
