import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../api/todoApi';
import { TodoListItem } from './TodoListItem';

const TodoList = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  const { todos } = data;
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #eee',
        borderRadius: '10px',
        padding: '1em',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      {todos.map(
        (
          item: {
            _id: string;
            description: string;
            tags: string[];
            status: string;
          },
          index: number
        ) => (
          <TodoListItem
            key={item._id}
            _id={item._id}
            description={item.description}
            tags={item.tags}
            status={item.status}
            showDivider={index !== todos.length - 1}
          />
        )
      )}
    </div>
  );
};

export default TodoList;
