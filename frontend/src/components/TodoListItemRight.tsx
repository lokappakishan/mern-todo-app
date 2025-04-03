import { Button } from 'antd';

export function TodoListItemRight() {
  return (
    <div style={{ display: 'flex', gap: '0.5em', justifyContent: 'flex-end' }}>
      <Button size="small">Edit</Button>
      <Button size="small" danger>
        Delete
      </Button>
    </div>
  );
}
