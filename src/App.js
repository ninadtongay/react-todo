import './App.css'
import React, { useReducer, useState } from 'react'

function reducer (state, action) {
  switch (action.type) {
    case 'add-todo':
      return {
        todos: [...state.todos, { text: action.text, completed: false }],
        todoCount: state.todoCount + 1
      }
    case 'toggle-todo':
      return {
        todos: state.todos.map((t, idx) => idx === action.idx ? { ...t, completed: !t.completed } : t),
        todoCount: state.todoCount
      }
    case 'delete-todo':
      return {
        todos: state.todos.filter((t) => t.completed !== true),
        todoCount: state.todos.filter((t) => t.completed !== true).length
      }
    case 'reset-count':
      return {
        todos: [...state.todos],
        todoCount: 0
      }
    case 'delete-all':
      return {
        todos: [],
        todoCount: 0
      }
    default:
      return state
  }
}

function App () {
  const [{ todos, todoCount }, dispatch] = useReducer(reducer, { todos: [], todoCount: 0 })
  const [text, setText] = useState()

  return (
    <div className='app'>
      <h1>Simple todo app</h1>
      <div><h3>Number of todos: {todoCount}</h3></div>
      <form onSubmit={e => {
        e.preventDefault()
        dispatch({ type: 'add-todo', text })
        setText('')
      }}
      >
        <input value={text} onChange={e => setText(e.target.value)} />
      </form>

      {todos.map((t, idx) => (
        <div key={idx} onClick={() => dispatch({ type: 'toggle-todo', idx })} style={{ textDecoration: t.completed ? 'line-through' : '' }}> {t.text}
        </div>

      ))}
      <button onClick={() => dispatch({ type: 'delete-todo' })}>Click here to delete tasks done</button>
      <button onClick={() => dispatch({ type: 'reset-count' })}>Click here to reset todo count</button>
      <button onClick={() => dispatch({ type: 'delete-all' })}>Click here to delete all todos</button>
    </div>
  )
}

export default App
