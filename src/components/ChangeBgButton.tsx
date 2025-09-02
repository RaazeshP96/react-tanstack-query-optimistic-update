import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchColor, setColor } from '../api/color'

export default function ChangeBgButton() {
  const queryClient = useQueryClient()
  const colorQuery = useQuery<string>({ queryKey: ['color'], queryFn: fetchColor })

  const mutation = useMutation<string, Error, string, { previous?: string }>({
    mutationFn: (next) => setColor(next),
    onMutate: async (next) => {
      await queryClient.cancelQueries({ queryKey: ['color'] })
      const previous = queryClient.getQueryData<string>(['color'])
      queryClient.setQueryData(['color'], next)
      return { previous }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous !== undefined) queryClient.setQueryData(['color'], ctx.previous)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['color'] }),
  })

  if (colorQuery.isPending) return <p>Loading…</p>
  if (colorQuery.isError) return <p>Error: {(colorQuery.error as Error).message}</p>

  const current = colorQuery.data!
  const next = current === '#ffedd5' ? '#dbeafe' : '#ffedd5'

  return (
    <div style={{ background: current, minHeight: 240, padding: 16, borderRadius: 8 }}>
      <button onClick={() => mutation.mutate(next)} disabled={mutation.isPending}>
        {mutation.isPending ? 'Changing…' : 'Change Background'}
      </button>
    </div>
  )
}


