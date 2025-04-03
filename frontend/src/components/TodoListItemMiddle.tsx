export function TodoListItemMiddle({ status }: { status: string }) {
  return (
    <div style={{ flex: 1, textAlign: 'center' }}>
      <strong>{status}</strong>
    </div>
  );
}
