import { TodoListItemLeftTag } from './TodoListItemLeftTag';
export function TodoListItemLeft({
  description,
  tags,
}: {
  description: string;
  tags: string[];
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1em',
        flex: 1,
      }}
    >
      <div className="todo-description">{description}</div>
      <TodoListItemLeftTag tags={tags} />
    </div>
  );
}
