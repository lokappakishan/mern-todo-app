export function TodoListItemLeftTag({ tags }: { tags: string[] }) {
  return (
    <div style={{ display: 'flex', gap: '0.5em', flexWrap: 'wrap' }}>
      {tags.map((tag, index) => (
        <span
          key={index}
          style={{
            background: '#eee',
            borderRadius: '5px',
            padding: '0.2em 0.5em',
            fontSize: '0.85em',
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
