import { Button } from 'antd';
import axios from 'axios';
import { FC } from 'react';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';

type TodoHomeProps = {
  fetchAuthStatus: () => void;
};

const TodoHome: FC<TodoHomeProps> = ({ fetchAuthStatus }) => {
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5001/api/auth/logout', {
        withCredentials: true,
      });
      fetchAuthStatus();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };
  return (
    <>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1em',
          backgroundColor: '#f7f8fa',
          borderBottom: '1px solid #eaeaea',
          marginBottom: '1em',
        }}
      >
        <h2 style={{ margin: 0 }}>TodoApp</h2>
        <Button type="primary" danger onClick={handleLogout}>
          Logout
        </Button>
      </header>

      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <AddTodo />
        <TodoList />
      </div>
    </>
  );
};

export default TodoHome;
