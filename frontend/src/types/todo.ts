export interface TodoInput {
  description: string;
  status: string;
  tags: string | string[];
}

export type TodoFilters = {
  status?: string;
  page?: number;
  limit?: number;
};
