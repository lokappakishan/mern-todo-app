import { TodoListItemLeft } from './TodoListItemLeft';
import { TodoListItemMiddle } from './TodoListItemMiddle';
import { TodoListItemRight } from './TodoListItemRight';

export function TodoListItem({
  _id,
  description,
  tags,
  status,
  showDivider,
}: {
  _id: string;
  description: string;
  tags: string[];
  status: string;
  showDivider: boolean;
}) {
  return (
    <>
      <div
        key={_id}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75em 0',
          gap: '1em',
        }}
      >
        <TodoListItemLeft description={description} tags={tags} />
        <TodoListItemMiddle status={status} />
        <TodoListItemRight todoId={_id} todo={{ description, status, tags }} />
      </div>

      {showDivider && (
        <div
          style={{
            height: '1px',
            backgroundColor: '#eee',
            width: '100%',
          }}
        />
      )}
    </>
  );
}
