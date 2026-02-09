import { useState } from 'react'
import './App.css'

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

  return (
    <div className="todo-container">
      <h1>My To-Do List</h1>

      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button type="submit" className="add-button">Add</button>
      </form>

      <ul className="todo-list ms-5">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editingId === todo.id ? (
              <form onSubmit={handleSaveEdit} className="edit-form">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="edit-input"
                  autoFocus
                />
                <div className="button-group">
                  <button type="submit" className="save-button">Save</button>
                  <button type="button" onClick={handleCancelEdit} className="cancel-button">Cancel</button>
                </div>
              </form>
            ) : (
              <div className="todo-content">
                <div className="todo-info">
                  <span className="todo-text">{todo.text}</span>
                  <button
                    onClick={() => cycleStatus(todo.id)}
                    className={`status-badge status-${todo.status.toLowerCase().replace(' ', '-')}`}
                  >
                    {todo.status}
                  </button>
                </div>
                <div className="button-group">
                  <button onClick={() => handleEditTodo(todo)} className="edit-button">Edit</button>
                  <button onClick={() => handleDeleteTodo(todo.id)} className="delete-button">Delete</button>
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
