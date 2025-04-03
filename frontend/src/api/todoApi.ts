import axiosInstance from '../utils/axios';

type TodoFilters = {
  status?: string;
  page?: number;
  limit?: number;
};

export async function fetchTodos({
  queryKey,
}: {
  queryKey: [string, TodoFilters?];
}) {
  const [, filters = {} as TodoFilters] = queryKey;
  const { status, page, limit } = filters;
  const { data } = await axiosInstance.get('/api/todo', {
    params: { status, page, limit },
  });
  return data;
}
