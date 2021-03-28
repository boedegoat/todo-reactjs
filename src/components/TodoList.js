import React, { useEffect } from 'react'

const TodoList = (props) => {
  // State and props
  const { todos, setTodos } = props

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

  // JSX
  return (
    <div className='container'>
      <ul className='list'>
        {todos.map((todo) => {
          if (todo.show) {
            return (
              <li className='item' key={todo.id}>
                <input type='checkbox' className='checkbox' name={todo.text} onChange={checkHandler} checked={todo.completed && 'checked'} />
                <input className={todo.completed ? 'text completed' : 'text'} type='text' name={todo.text} value={todo.text} onChange={editHandler} />
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
