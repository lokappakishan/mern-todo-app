import axiosInstance from '../utils/axios';

type TodoFilters = {
  status?: string;
  page?: number;
  limit?: number;
};

type TodoInput = {
  description: string;
  status: string;
  tags: string | string[];
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

export async function addTodo(todoData: TodoInput) {
  const tagsArray =
    typeof todoData.tags === 'string'
      ? todoData.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag !== '')
      : todoData.tags;

  const payload = {
    ...todoData,
    tags: tagsArray,
  };

  const { data } = await axiosInstance.post('/api/todo', payload);
  return data;
}
