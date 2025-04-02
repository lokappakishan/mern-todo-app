import { useEffect } from 'react';
import axiosInstance from '../utils/axios';

const TodoHome = () => {
  const createTodo = async () => {
    try {
      const response = await axiosInstance.patch(
        'api/todo/67ebb7fe1daeda5582f83c57',
        {
          status: 'completed',
          description: 'Updated description',
          tags: ['updated', 'tag'],
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    createTodo();
  }, []);

  return <div>TodoHome</div>;
};

export default TodoHome;
