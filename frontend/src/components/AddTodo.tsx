import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Select } from 'antd';
import { useState } from 'react';
import { addTodo } from '../api/todoApi';

interface todoDataType {
  description: string;
  status: string;
  tags: string;
}

const AddTodo = () => {
  const [todoData, setTodoData] = useState<todoDataType>({
    description: '',
    status: 'pending',
    tags: '',
  });
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      // Reset form or show success message
      setTodoData({
        description: '',
        status: 'pending',
        tags: '',
      });
    },
    onError: (error) => {
      console.error('Failed to add todo:', error);
    },
  });

  const handleChange = (name: string, value: string) => {
    setTodoData({ ...todoData, [name]: value });
  };

  const handleClickAdd = () => {
    if (todoData.description.trim() === '') {
      setDescriptionError(' Description cannot be empty');
      return;
    }
    setDescriptionError(null);
    addTodoMutation(todoData);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        margin: '0 auto',
        padding: '1em 0',
      }}
    >
      <div style={{ flex: 2 }}>
        <Input
          name="description"
          value={todoData.description}
          placeholder="description"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          required
        />
        <div style={{ color: 'red', fontSize: '0.8em' }}>
          {descriptionError}
        </div>
      </div>

      <Select
        value={todoData.status}
        style={{ width: 150 }}
        onChange={(value) => handleChange('status', value)}
        options={[
          { value: 'pending', label: 'pending' },
          { value: 'in progress', label: 'in progress' },
          { value: 'completed', label: 'completed' },
        ]}
      />
      <Input
        name="tags"
        value={todoData.tags}
        placeholder="tags"
        style={{ flex: 1 }}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <Button type="primary" onClick={handleClickAdd}>
        Add
      </Button>
    </div>
  );
};

export default AddTodo;
