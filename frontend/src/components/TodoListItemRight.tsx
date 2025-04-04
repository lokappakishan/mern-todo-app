import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, Input, Select } from 'antd';
import { deleteTodo, updateTodo } from '../api/todoApi';
import { useState } from 'react';

interface TodoInput {
  description: string;
  status: string;
  tags: string | string[];
}

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
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('Failed to delete todo:', error);
    },
  });

  // update mutation
  const { mutate: updateMutation } = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('Failed to delete todo:', error);
    },
  });

  const handleClickDelete = (id: string): void => {
    deleteTodoMutation(id);
  };

  const handleChange = (name: string, value: string) => {
    setTodoData({ ...todoData, [name]: value });
  };

  const showModal = () => {
    setTodoData({
      description: todo.description,
      status: todo.status,
      tags: Array.isArray(todo.tags) ? todo.tags.join(', ') : todo.tags,
    });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    updateMutation({ id: todoId, todoData });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', gap: '0.5em', justifyContent: 'flex-end' }}>
      <Button size="small" onClick={showModal}>
        Edit
      </Button>

      <Modal
        title="Edit Todo"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
          <Input
            name="description"
            value={todoData.description}
            placeholder="Description"
            onChange={(e) => handleChange('description', e.target.value)}
          />

          <Select
            value={todoData.status}
            onChange={(value) => handleChange('status', value)}
            options={[
              { value: 'pending', label: 'Pending' },
              { value: 'in progress', label: 'In Progress' },
              { value: 'completed', label: 'Completed' },
            ]}
          />

          <Input
            name="tags"
            value={todoData.tags}
            placeholder="Tags"
            onChange={(e) => handleChange('tags', e.target.value)}
          />
        </div>
      </Modal>

      <Button size="small" danger onClick={() => handleClickDelete(todoId)}>
        Delete
      </Button>
    </div>
  );
}
