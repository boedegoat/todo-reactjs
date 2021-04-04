import React, { useEffect, useRef } from 'react'
import { themes } from './../App'

const Menu = (props) => {
  // Props and state
  const {
    todos,
    setTodos,
    todosFilter,
    setTodosFilter,
    color,
    setColor,
  } = props

  const menuBox = useRef(null)

  // Functions
  function menuHandler() {
    menuBox.current.classList.toggle('show-menu-box')
  }

  useEffect(() => {
    document.addEventListener('click', (e) => {
      const menuBoxClass = menuBox.current.classList
      const targetClass = e.target.classList.value
      if (
        menuBoxClass.contains('show-menu-box') &&
        targetClass !== 'menu-btn'
      ) {
        menuBoxClass.remove('show-menu-box')
      }
    })
  }, [])

  function themeHandler(e) {
    setColor(e.target.name)
  }

  function filterHandler(e) {
    const filter = e.target.innerText.toLowerCase()
    switch (filter) {
      case 'all':
        setTodosFilter('all')
        setTodos(
          todos.map((todo) => {
            return {
              ...todo,
              show: true,
            }
          })
        )
        break

      case 'completed':
        setTodosFilter('completed')
        setTodos(
          todos.map((todo) => {
            if (!todo.completed) {
              return {
                ...todo,
                show: false,
              }
            } else {
              return {
                ...todo,
                show: true,
              }
            }
          })
        )
        break

      case 'uncompleted':
        setTodosFilter('uncompleted')
        setTodos(
          todos.map((todo) => {
            if (todo.completed) {
              return {
                ...todo,
                show: false,
              }
            } else {
              return {
                ...todo,
                show: true,
              }
            }
          })
        )
        break

      default:
    }
  }

  // JSX
  return (
    <div className='menu'>
      <button
        className='menu-btn'
        onClick={menuHandler}
        style={{ backgroundColor: themes[color] }}
      >
        <i className='im im-menu-dot-v menu-icon'></i>
      </button>
      <div className='menu-box' ref={menuBox}>
        <p className='menu-box-header' style={{ color: themes[color] }}>
          Sort By
        </p>
        <button className='menu-box-option' onClick={filterHandler}>
          {todosFilter === 'all' ? (
            <>
              All <i className='im im-check-mark active'></i>
            </>
          ) : (
            'All'
          )}
        </button>
        <button className='menu-box-option' onClick={filterHandler}>
          {todosFilter === 'completed' ? (
            <>
              Completed <i className='im im-check-mark active'></i>
            </>
          ) : (
            'Completed'
          )}
        </button>
        <button className='menu-box-option' onClick={filterHandler}>
          {todosFilter === 'uncompleted' ? (
            <>
              Uncompleted <i className='im im-check-mark active'></i>
            </>
          ) : (
            'Uncompleted'
          )}
        </button>

        {/* Set Theme Color */}
        <p className='menu-box-header' style={{ color: themes[color] }}>
          Theme
        </p>
        <button className='menu-box-option' name='blue' onClick={themeHandler}>
          {color === 'blue' ? (
            <>
              <i className='color blue'></i>Blue{' '}
              <i className='im im-check-mark active'></i>
            </>
          ) : (
            <>
              <i className='color blue'></i>Blue
            </>
          )}
        </button>
        <button className='menu-box-option' name='red' onClick={themeHandler}>
          {color === 'red' ? (
            <>
              <i className='color red'></i>Red{' '}
              <i className='im im-check-mark active'></i>
            </>
          ) : (
            <>
              <i className='color red'></i>Red
            </>
          )}
        </button>
        <button className='menu-box-option' name='green' onClick={themeHandler}>
          {color === 'green' ? (
            <>
              <i className='color green'></i>Green{' '}
              <i className='im im-check-mark active'></i>
            </>
          ) : (
            <>
              <i className='color green'></i>Green
            </>
          )}
        </button>
        <button
          className='menu-box-option'
          name='yellow'
          onClick={themeHandler}
        >
          {color === 'yellow' ? (
            <>
              <i className='color yellow'></i>Yellow{' '}
              <i className='im im-check-mark active'></i>
            </>
          ) : (
            <>
              <i className='color yellow'></i>Yellow
            </>
          )}
        </button>
        <button
          className='menu-box-option'
          name='purple'
          onClick={themeHandler}
        >
          {color === 'purple' ? (
            <>
              <i className='color purple'></i>Purple{' '}
              <i className='im im-check-mark active'></i>
            </>
          ) : (
            <>
              <i className='color purple'></i>Purple
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default Menu
