import { deleteDoc, doc } from 'firebase/firestore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { firestore } from '../services/firebase'
import { LIST_TODOS_QUERY_KEY } from '../queries/all-todos'

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteTodo'],
    mutationFn: async (id: string) => {
      const todoDocRef = doc(firestore, 'TodoList', id)
      await deleteDoc(todoDocRef)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIST_TODOS_QUERY_KEY })
    },
  })
}
