import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from 'antd';
import { useState } from 'react';
import { deleteTodo } from '../api/todoApi';
import EditTodoModal from './EditTodoModal';
import { TodoInput } from '../types/todo';
import { toast } from 'react-toastify';

export function TodoListItemRight({
  todoId,
  todo,
}: {
  todoId: string;
  todo: TodoInput;
}) {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [todoData, setTodoData] = useState<TodoInput>({
    description: '',
    status: 'pending',
    tags: '',
  });

  // Delete mutation
  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      toast.success('delete successfully');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('Failed to delete todo:', error);
    },
  });

  const handleClickDelete = (id: string): void => {
    deleteTodoMutation(id);
  };

  const showModal = () => {
    setTodoData({
      description: todo.description,
      status: todo.status,
      tags: Array.isArray(todo.tags) ? todo.tags.join(', ') : todo.tags,
    });
    setIsModalOpen(true);
  };

  return (
    <div style={{ display: 'flex', gap: '0.5em', justifyContent: 'flex-end' }}>
      <Button size="small" onClick={showModal}>
        Edit
      </Button>

      <EditTodoModal
        todoData={todoData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        todoId={todoId}
        setTodoData={setTodoData}
      />

      <Button size="small" danger onClick={() => handleClickDelete(todoId)}>
        Delete
      </Button>
    </div>
  );
}
