// Simple in-memory mock API with latency and occasional errors
let todos = [
  { id: 1, text: 'Learn TanStack Query', done: false },
  { id: 2, text: 'Implement optimistic updates', done: false },
]

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export async function fetchTodos() {
  await delay(500)
  return [...todos]
}

export async function addTodo(text) {
  await delay(600)
  // Introduce a small chance of server error to demonstrate rollback
  if (Math.random() < 0.15) {
    throw new Error('Server error: failed to add todo')
  }
  const newTodo = { id: Date.now(), text, done: false }
  todos = [...todos, newTodo]
  return newTodo
}

export async function updateTodo(updated) {
  await delay(400)
  const exists = todos.some((t) => t.id === updated.id)
  if (!exists) throw new Error('Not found')
  todos = todos.map((t) => (t.id === updated.id ? { ...t, ...updated } : t))
  return updated
}

