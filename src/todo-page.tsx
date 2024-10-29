import { useState } from 'react'
import ButtonAdd from './components/button-add'
import ItemCard from './components/item-card'

export function TodoList() {
  const [todos, setTodos] = useState([
    { id: '1', text: 'Estudar React', marcado: false },
    { id: '2', text: 'Fazer compras', marcado: false },
    { id: '3', text: 'Ler um livro', marcado: true },
  ])

  const addTodo = (newTodo: string) => {
    const newTodoItem = {
      id: (todos.length + 1).toString(),
      text: newTodo,
      marcado: false,
    }
    setTodos([...todos, newTodoItem])
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, marcado: !todo.marcado } : todo
      )
    )
  }

  return (
    <div className="container mx-auto p-8 max-w-md bg-yellow-50 shadow-lg rounded-lg">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-green-600">
        Todo List
      </h1>
      <ButtonAdd onAdd={addTodo} />
      <ul className="space-y-3">
        {todos.map((todo) => (
          <ItemCard
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
          />
        ))}
      </ul>
    </div>
  )
}

export default TodoList
