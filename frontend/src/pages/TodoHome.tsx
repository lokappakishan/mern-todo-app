import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import { Button } from 'antd';

const TodoHome = () => {
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
        <Button type="primary" danger>
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
