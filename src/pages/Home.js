import { TodoList } from '../components/TodoList';

export function Home() {
  return (
    <>
      <h1 data-testid="page-title">Home</h1>
      <p>Have a nice day!</p>
      <p>This is the list.</p>
      <TodoList />
    </>
  );
}
