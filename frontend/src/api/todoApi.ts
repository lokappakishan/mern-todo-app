import { TodoFilters, TodoInput } from '../types/todo';
import axiosInstance from '../utils/axios';

function returnTagsArray(todoData: TodoInput) {
  return typeof todoData.tags === 'string'
    ? todoData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '')
    : todoData.tags;
}

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
  const tagsArray = returnTagsArray(todoData);

  const payload = {
    ...todoData,
    tags: tagsArray,
  };

  const { data } = await axiosInstance.post('/api/todo', payload);
  return data;
}

export async function deleteTodo(id: string) {
  const { data } = await axiosInstance.delete(`/api/todo/${id}`);
  return data;
}

export async function updateTodo({
  id,
  todoData,
}: {
  id: string;
  todoData: TodoInput;
}) {
  const tagsArray = returnTagsArray(todoData);

  const payload = {
    ...todoData,
    tags: tagsArray,
  };
  const { data } = await axiosInstance.patch(`/api/todo/${id}`, payload);
  return data;
}
