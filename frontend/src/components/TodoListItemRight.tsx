import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from 'antd';
import { deleteTodo } from '../api/todoApi';

export function TodoListItemRight({ todoId }: { todoId: string }) {
  const queryClient = useQueryClient();

  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('Failed to delete todo:', error);
    },
  });

  function handleClickDelete(id: string): void {
    deleteTodoMutation(id);
  }

  return (
    <div style={{ display: 'flex', gap: '0.5em', justifyContent: 'flex-end' }}>
      <Button size="small">Edit</Button>
      <Button size="small" danger onClick={() => handleClickDelete(todoId)}>
        Delete
      </Button>
    </div>
  );
}
