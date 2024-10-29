import { Trash } from 'lucide-react'

interface Todo {
  id: string
  text: string
  marcado: boolean
}

interface ItemCardProps {
  todo: Todo
  onDelete: (id: string) => void
  onToggle: (id: string) => void
}

const ItemCard: React.FC<ItemCardProps> = ({ todo, onDelete, onToggle }) => {
  return (
    <li className="flex items-center justify-between p-5 bg-blue-100 rounded-lg shadow-md hover:bg-blue-200 transition-colors">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={todo.marcado}
          className="h-6 w-6 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          onChange={() => onToggle(todo.id)}
          aria-label={`Marcar como ${
            todo.marcado ? 'não concluído' : 'concluído'
          } ${todo.text}`}
        />
        <label
          className={`text-lg font-semibold ${
            todo.marcado ? 'line-through text-gray-500' : 'text-gray-800'
          }`}
        >
          {todo.text}
        </label>
      </div>
      <button
        className="text-gray-500 hover:text-red-600 transition-colors h-6 w-6"
        onClick={() => onDelete(todo.id)}
        aria-label={`Excluir a tarefa ${todo.text}`}
      >
        <Trash className="h-6 w-6" />
      </button>
    </li>
  )
}

export default ItemCard
