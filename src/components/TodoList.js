import React from 'react'
import { themes } from './../App'

const TodoList = (props) => {
  // State and props
  const { todos, setTodos, todosFilter, color } = props

  // Functions
  function checkHandler(e) {
    const name = e.target.name
    const isComplete = e.target.checked
    setTodos(
      [...todos].map((todo) => {
        if (todo.text === name) {
          e.target.nextSibling.classList.toggle('completed')
          return {
            ...todo,
            completed: isComplete,
          }
        } else {
          return todo
        }
      })
    )
  }

  function editHandler(e) {
    const name = e.target.name
    const edited = e.target.value
    setTodos(
      [...todos].map((todo) => {
        if (todo.text === name) {
          return {
            ...todo,
            text: edited,
          }
        } else {
          return todo
        }
      })
    )
  }

  function removeHandler(e) {
    const name = e.target.previousSibling.name
    setTodos([...todos].filter((todo) => todo.text !== name))
  }

  function capitalize(str) {
    return str[0].toUpperCase() + str.substring(1)
  }

  // JSX
  return (
    <div className='container' style={{ backgroundColor: themes[color] }}>
      <ul className='list'>
        <p className='sorted-by' style={{ color: color === 'yellow' ? '#000' : '#fff' }}>
          Sorted by : {capitalize(todosFilter)}
        </p>
        <hr className='break-line' />
        {todos.map((todo) => {
          if (todo.show) {
            return (
              <li className='item' key={todo.id}>
                <input type='checkbox' className='checkbox' name={todo.text} onChange={checkHandler} checked={todo.completed && 'checked'} />
                <input className={todo.completed ? 'text completed' : 'text'} type='text' name={todo.text} value={todo.text} onChange={editHandler} style={{ color: color === 'yellow' ? '#000' : '#fff' }} />
                <button className='remove' onClick={removeHandler}>
                  <i className='im im-x-mark-circle remove-icon'></i>
                </button>
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
}

export default TodoList
