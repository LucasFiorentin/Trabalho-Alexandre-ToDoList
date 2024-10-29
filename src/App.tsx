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
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <h1 className="text-3xl font-semibold text-gray-600">Carregando...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <h1 className="text-2xl font-semibold text-red-600 text-center mt-10">
        Erro ao carregar os dados
      </h1>
    )
  }

  return (
    <div className="container mx-auto p-10 max-w-lg bg-blue-50 shadow-2xl rounded-3xl border border-blue-200">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-teal-500">
        Mnha lista
      </h1>

      <div className="flex justify-center items-center space-x-3 mb-8">
        <input
          type="text"
          placeholder="digite a nova atividade"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 px-5 py-4 text-lg border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-200"
        />
        <button
          onClick={handleAddTodo}
          className="px-6 py-4 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition duration-200 text-lg"
        >
          Add
        </button>
      </div>

      <ul className="space-y-5">
        {data?.map((todo) => (
          <li
            key={todo?.id}
            className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-lg border-l-4 border-teal-400 transition transform hover:scale-105"
          >
            <div className="flex items-center space-x-5">
              <input
                type="checkbox"
                checked={todo?.marcado}
                className="h-7 w-7 text-teal-500 focus:ring-teal-400 border-gray-300 rounded-full"
                onChange={() => {
                  if (todo) {
                    handleToggleTodo(todo?.id ?? '', todo?.marcado ?? false)
                  }
                }}
              />
              <label
                className={`text-lg font-semibold ${
                  todo?.marcado ? 'line-through text-gray-400' : 'text-gray-700'
                }`}
              >
                {todo?.text}
              </label>
            </div>
            <button
              className="text-gray-400 hover:text-red-500 transition duration-150 transform hover:scale-110"
              onClick={() => {
                handleDeleteTodo(todo?.id ?? '')
              }}
            >
              <Trash className="h-7 w-7" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoPage
