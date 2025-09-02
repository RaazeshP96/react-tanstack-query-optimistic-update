import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchTodos, addTodo } from '../api/todos'

export default function Todos() {
  const queryClient = useQueryClient()
  const [text, setText] = useState('')

  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  const addTodoMutation = useMutation({
    mutationFn: (newText) => addTodo(newText),
    onMutate: async (newText) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })
      const previousTodos = queryClient.getQueryData(['todos'])
      const optimistic = { id: Date.now(), text: newText, done: false, optimistic: true }
      queryClient.setQueryData(['todos'], (old = []) => [...old, optimistic])
      setText('')
      return { previousTodos }
    },
    onError: (_err, _newText, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos)
      }
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  if (todosQuery.isPending) return <p>Loading...</p>
  if (todosQuery.isError) return <p>Error: {todosQuery.error.message}</p>

  return (
    <div style={{ maxWidth: 520, margin: '2rem auto', padding: 16 }}>
      <h2>Todos (Optimistic Add)</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!text.trim()) return
          addTodoMutation.mutate(text.trim())
        }}
        style={{ display: 'flex', gap: 8 }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a todo"
          disabled={addTodoMutation.isPending}
          style={{ flex: 1 }}
        />
        <button type="submit" disabled={addTodoMutation.isPending}>
          {addTodoMutation.isPending ? 'Adding...' : 'Add'}
        </button>
      </form>

      <ul style={{ marginTop: 16 }}>
        {todosQuery.data?.map((t) => (
          <li key={t.id} style={{ opacity: t.optimistic ? 0.6 : 1 }}>
            {t.text}
            {t.optimistic && ' (pending...)'}
          </li>
        ))}
      </ul>

      {addTodoMutation.isError && (
        <p style={{ color: 'crimson' }}>Add failed. Please try again.</p>
      )}
    </div>
  )
}


