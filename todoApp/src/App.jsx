import { useState } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')

  const handleAddTodo = (e) => {
    e.preventDefault()
    if (inputValue.trim() === '') return
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      status: 'Not done'
    }
    setTodos([...todos, newTodo])
    setInputValue('')
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setEditValue('')
    }  
  }

  const handleEditTodo = (todo) => {
    setEditingId(todo.id)
    setEditValue(todo.text)
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    if (editValue.trim() === '') return
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editValue } : todo
      )
    )
    setEditingId(null)
    setEditValue('')
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditValue('')
  }

  const cycleStatus = (id) => {
    const statuses = ['Not done', 'On progress', 'Done']
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const currentIndex = statuses.indexOf(todo.status)
          const nextIndex = (currentIndex + 1) % statuses.length
          return { ...todo, status: statuses[nextIndex] }
        }
        return todo
      })
    )
  }

  const getStatusBadgeClasses = (status) => {
    const baseClasses = "text-xs px-2.5 py-0.5 rounded-xl uppercase font-bold cursor-pointer border-none transition-transform hover:scale-105"
    if (status === 'Not done') return `${baseClasses} bg-orange-500 text-black`
    if (status === 'On progress') return `${baseClasses} bg-blue-500 text-white`
    if (status === 'Done') return `${baseClasses} bg-green-500 text-white`
    return baseClasses
  }

  const getStatusTextClasses = (status) => {
    const baseClasses = "flex-1 text-left break-all text-white text-lg font-medium transition-all duration-300"
    if (status === 'Done') return `${baseClasses} line-through opacity-50 text-gray-500`
    if (status === 'On progress') return `${baseClasses} font-bold text-white [text-shadow:0_0_8px_rgba(33,150,243,0.5)]`
    return `${baseClasses} opacity-100`
  }

  return (
    <div className="max-w-[600px] w-full p-10 bg-[#1a1a1a] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] text-center border border-[#333]">
      <h1 className="text-[#646cff] mb-8 text-4xl">My To-Do List</h1>

      <form onSubmit={handleAddTodo} className="flex gap-2 mb-8">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-3 border border-[#333] rounded-lg bg-[#222] text-white text-base transition-colors focus:border-[#646cff] focus:outline-none"
        />
        <button 
          type="submit" 
          className="px-6 py-3 bg-[#646cff] text-white border-none rounded-lg cursor-pointer font-semibold transition-colors hover:bg-[#535bf2]"
        >
          Add
        </button>
      </form>

      <ul className="list-none p-0 m-0 ms-5">
        {todos.map((todo) => (
          <li key={todo.id} className="bg-[#2a2a2a] mb-3 p-4 rounded-lg flex flex-col transition-transform">
            {editingId === todo.id ? (
              <form onSubmit={handleSaveEdit} className="flex flex-col gap-3">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="px-2 py-2 border border-[#444] rounded bg-[#333] text-white"
                  autoFocus
                />
                <div className="flex gap-2 justify-end">
                  <button 
                    type="submit" 
                    className="px-3 py-1.5 rounded bg-blue-500 text-white border-none cursor-pointer text-sm font-medium transition-opacity hover:opacity-90"
                  >
                    Save
                  </button>
                  <button 
                    type="button" 
                    onClick={handleCancelEdit} 
                    className="px-3 py-1.5 rounded bg-gray-600 text-white border-none cursor-pointer text-sm font-medium transition-opacity hover:opacity-90"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-center gap-4">
                <div className="flex flex-col items-start gap-2 flex-1">
                  <span className={getStatusTextClasses(todo.status)}>
                    {todo.text}
                  </span>
                  <button
                    onClick={() => cycleStatus(todo.id)}
                    className={getStatusBadgeClasses(todo.status)}
                  >
                    {todo.status}
                  </button>
                </div>
                <div className="flex gap-2 justify-end">
                  <button 
                    onClick={() => handleEditTodo(todo)} 
                    className="px-3 py-1.5 rounded bg-green-500 text-white border-none cursor-pointer text-sm font-medium transition-opacity hover:opacity-90"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteTodo(todo.id)} 
                    className="px-3 py-1.5 rounded bg-red-500 text-white border-none cursor-pointer text-sm font-medium transition-opacity hover:opacity-90"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
