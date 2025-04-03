import { Button, Input, Select } from 'antd';
import { useState } from 'react';

const AddTodo = () => {
  const [todoData, setTodoData] = useState({
    description: '',
    status: 'pending',
    tags: '',
  });

  const handleChange = (name: string, value: string) => {
    setTodoData({ ...todoData, [name]: value });
  };

  const handleClickAdd = () => {
    console.log(todoData);
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
      <Input
        name="description"
        placeholder="description"
        style={{ flex: 2 }}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <Select
        defaultValue="pending"
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
