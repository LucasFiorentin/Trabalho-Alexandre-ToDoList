import { useState } from 'react'
import { Trash } from 'lucide-react'
import { useListTodosQuery } from './queries/all-todos'
import { useCreateTodoMutation } from './mutations/todo-create-muation'
import { useDeleteTodoMutation } from './mutations/delete-todo-mutation'
import { useUpdateTodoMutation } from './mutations/mark-todo-mutation'

export function TodoPage() {
  const [newTodo, setNewTodo] = useState('')
  const { data, isLoading, error } = useListTodosQuery()
  const createTodoMutation = useCreateTodoMutation()
  const deleteTodoMutation = useDeleteTodoMutation()
  const updateTodoMutation = useUpdateTodoMutation()

  const handleAddTodo = async () => {
    if (newTodo.trim() === '') return
    try {
      await createTodoMutation.mutateAsync({
        text: newTodo,
        marcado: false,
      })
      setNewTodo('')
    } catch (err) {
      console.error('Failed to add todo:', err)
    }
  }

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodoMutation.mutateAsync(id)
    } catch (err) {
      console.error('Failed to delete todo:', err)
    }
  }

  const handleToggleTodo = async (id: string, currentMarked: boolean) => {
    try {
      await updateTodoMutation.mutateAsync({
        id,
        marcado: !currentMarked,
      })
    } catch (err) {
      console.error('Failed to update todo:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Carregando...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <h1 className="text-2xl font-bold text-red-500 text-center">
        Erro ao carregar os dados
      </h1>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-md bg-white shadow-lg rounded-lg">
      <p className="text-4xl font-bold mb-6 text-center text-red-600">
        Todo List
      </p>

      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Adicionar uma nova tarefa"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleAddTodo}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Adicionar
        </button>
      </div>

      <ul className="space-y-2">
        {data?.map((todo) => (
          <li
            key={todo?.id}
            className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={todo?.marcado}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                onChange={() => {
                  if (todo) {
                    handleToggleTodo(todo?.id ?? '', todo?.marcado ?? false)
                  }
                }}
              />
              <label
                className={`text-base font-medium ${
                  todo?.marcado ? 'line-through text-gray-500' : 'text-gray-800'
                }`}
              >
                {todo?.text}
              </label>
            </div>
            <button
              className="text-gray-400 hover:text-red-500 transition-colors"
              onClick={() => {
                handleDeleteTodo(todo?.id ?? '')
              }}
            >
              <Trash className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoPage
