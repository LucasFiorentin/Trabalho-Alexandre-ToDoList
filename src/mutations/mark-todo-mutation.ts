import { useMutation, useQueryClient } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../services/firebase'
import { LIST_TODOS_QUERY_KEY } from '../queries/all-todos'

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['updateTodo'],
    mutationFn: async ({ id, marcado }: { id: string; marcado: boolean }) => {
      const todoDocRef = doc(firestore, 'TodoList', id)
      await updateDoc(todoDocRef, { marcado: marcado })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIST_TODOS_QUERY_KEY })
    },
  })
}
