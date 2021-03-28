import React, { useEffect, useState } from 'react'
import Form from './components/Form'
import TodoList from './components/TodoList'
import Menu from './components/Menu'

const App = () => {
  // States
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState([])

  // functions
  function saveToLocal() {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  function getLocal() {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      let local = JSON.parse(localStorage.getItem('todos'))
      setTodos(local)
    }
  }

  // only run once
  useEffect(() => {
    getLocal()
  }, [])

  // run every state changing
  useEffect(() => {
    saveToLocal()
  }, [todos])

  // JSX
  return (
    <React.Fragment>
      <header>
        <h1>TODO</h1>
      </header>
      {/* mengoper function ke component di file lain */}
      <Form setInput={setInput} setTodos={setTodos} todos={todos} input={input} />
      <TodoList todos={todos} setTodos={setTodos} />
      <Menu todos={todos} setTodos={setTodos} />
    </React.Fragment>
  )
}

export default App
