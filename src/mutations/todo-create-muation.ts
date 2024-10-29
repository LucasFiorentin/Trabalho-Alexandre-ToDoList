import { addDoc, collection } from 'firebase/firestore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { firestore } from '../services/firebase'
import { LIST_TODOS_QUERY_KEY } from '../queries/all-todos'
import { Todo } from '../models/todo-list-schema'

export function useCreateTodoMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['createTodo'],
    mutationFn: (values: Todo) =>
      addDoc(collection(firestore, 'TodoList'), values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIST_TODOS_QUERY_KEY })
    },
  })
}
