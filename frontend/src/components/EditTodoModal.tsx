import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Input, Modal, Select } from 'antd';
import { updateTodo } from '../api/todoApi';
import { TodoInput } from '../types/todo';
import { toast } from 'react-toastify';

interface EditTodoModalProps {
  todoId: string;
  todoData: TodoInput;
  setTodoData: React.Dispatch<React.SetStateAction<TodoInput>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTodoModal = ({
  todoId,
  todoData,
  isModalOpen,
  setIsModalOpen,
  setTodoData,
}: EditTodoModalProps) => {
  const queryClient = useQueryClient();

  // update mutation
  const { mutate: updateMutation } = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      toast.info('updated successfully');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('Failed to delete todo:', error);
    },
  });

  const handleOk = () => {
    updateMutation({ id: todoId, todoData });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (name: string, value: string) => {
    setTodoData({ ...todoData, [name]: value });
  };

  return (
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
  );
};

export default EditTodoModal;
