import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '../services/firebase'
import { Todo, todoSchema } from '../models/todo-list-schema'

export const LIST_TODOS_QUERY_KEY = ['getTodos']

export function useListTodosQuery() {
  return useQuery({
    queryKey: LIST_TODOS_QUERY_KEY,
    queryFn: async () => {
      const todosRef = collection(firestore, 'TodoList').withConverter({
        toFirestore: (todo: Todo) => todo,
        fromFirestore: (snapshot) => {
          const data = todoSchema.parse({
            id: snapshot.id,
            ...snapshot.data(),
          })
          const parse = todoSchema.safeParse(data)
          return parse.data
        },
      })
      const snapshot = await getDocs(todosRef)
      return snapshot.docs.map((doc) => doc.data())
    },
  })
}
