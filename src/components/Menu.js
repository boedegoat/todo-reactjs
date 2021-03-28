import React, { useEffect, useRef } from 'react'

const Menu = (props) => {
  // Props and state
  const { todos, setTodos } = props
  const menuBox = useRef(null)

  // Functions
  function menuHandler() {
    menuBox.current.classList.toggle('show-menu-box')
  }

  useEffect(() => {
    document.addEventListener('click', (e) => {
      const menuBoxClass = menuBox.current.classList
      const targetClass = e.target.classList.value
      if (menuBoxClass.contains('show-menu-box') && targetClass !== 'menu-btn') {
        menuBoxClass.remove('show-menu-box')
      }
    })
  }, [])

  function filterHandler(e) {
    const filter = e.target.innerText.toLowerCase()
    switch (filter) {
      case 'all':
        setTodos(
          [...todos].map((todo) => {
            return {
              ...todo,
              show: true,
            }
          })
        )
        break

      case 'completed':
        setTodos(
          [...todos].map((todo) => {
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
        console.log('uncompleted')
        setTodos(
          [...todos].map((todo) => {
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
    }
  }

  return (
    <div className='menu'>
      <button className='menu-btn' onClick={menuHandler}>
        <i className='im im-menu-dot-v menu-icon'></i>
      </button>
      <div className='menu-box' ref={menuBox}>
        <p className='menu-box-header'>Sort By</p>
        <button className='menu-box-option' onClick={filterHandler}>
          All
        </button>
        <button className='menu-box-option' onClick={filterHandler}>
          Completed
        </button>
        <button className='menu-box-option' onClick={filterHandler}>
          Uncompleted
        </button>
      </div>
    </div>
  )
}

export default Menu
