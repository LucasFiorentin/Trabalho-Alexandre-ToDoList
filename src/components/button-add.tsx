import { useState } from 'react'

interface ButtonAddProps {
  onAdd: (todo: string) => void
}

const ButtonAdd: React.FC<ButtonAddProps> = ({ onAdd }) => {
  const [newTodo, setNewTodo] = useState('')

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return
    onAdd(newTodo)
    setNewTodo('')
  }

  return (
    <div className="flex space-x-3 mb-6">
      <input
        type="text"
        placeholder="Adicionar uma nova tarefa"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="flex-1 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        aria-label="Adicionar uma nova tarefa"
      />
      <button
        onClick={handleAddTodo}
        className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
      >
        Adicionar
      </button>
    </div>
  )
}

export default ButtonAdd
