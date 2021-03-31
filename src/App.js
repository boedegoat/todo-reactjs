import React, { useEffect, useState } from 'react'
import Form from './components/Form'
import TodoList from './components/TodoList'
import Menu from './components/Menu'

export const themes = {
  blue: '#3d405b',
  red: '#c1292e',
  green: '#588157',
  yellow: '#fcbf49',
  purple: '#52154e',
}

const App = () => {
  // States
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState([])
  const [todosFilter, setTodosFilter] = useState('all')
  const [color, setColor] = useState('blue')

  // functions
  function saveToLocal() {
    localStorage.setItem('todos', JSON.stringify(todos))
    localStorage.setItem('theme', JSON.stringify(color))
    localStorage.setItem('filter', JSON.stringify(todosFilter))
  }

  function getLocal() {
    // todos
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      let localTodos = JSON.parse(localStorage.getItem('todos'))
      setTodos(localTodos)
    }

    // theme
    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme', JSON.stringify(color))
    } else {
      let localTheme = JSON.parse(localStorage.getItem('theme'))
      setColor(localTheme)
    }

    // filter
    if (localStorage.getItem('filter') === null) {
      localStorage.setItem('filter', JSON.stringify(todosFilter))
    } else {
      let localFilter = JSON.parse(localStorage.getItem('filter'))
      setTodosFilter(localFilter)
    }
  }

  // only run once
  useEffect(() => {
    getLocal()
  }, [])

  // run every state changing
  useEffect(() => {
    saveToLocal()
  }, [todos, color])

  // JSX
  return (
    <React.Fragment>
      <header>
        <h1 style={{ color: themes[color] }}>TODO</h1>
      </header>
      {/* mengoper function ke component di file lain */}
      <Form setInput={setInput} setTodos={setTodos} todos={todos} input={input} color={color} />
      <TodoList todos={todos} setTodos={setTodos} todosFilter={todosFilter} color={color} />
      <Menu todos={todos} setTodos={setTodos} todosFilter={todosFilter} setTodosFilter={setTodosFilter} color={color} setColor={setColor} />
    </React.Fragment>
  )
}

export default App
