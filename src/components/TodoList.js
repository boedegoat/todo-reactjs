import React from 'react'
import { themes } from './../App'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const TodoList = (props) => {
  // State and props
  const { todos, setTodos, todosFilter, color } = props

  // Functions
  function checkHandler(e) {
    const name = e.target.name
    const isComplete = e.target.checked
    setTodos(
      todos.map((todo) => {
        if (todo.text === name) {
          e.target.nextSibling.classList.toggle('completed')
          if (todosFilter === 'all') {
            return {
              ...todo,
              completed: isComplete,
              show: true,
            }
          }
          if (todosFilter === 'completed') {
            if (isComplete) {
              return {
                ...todo,
                completed: isComplete,
                show: true,
              }
            } else {
              return {
                ...todo,
                completed: isComplete,
                show: false,
              }
            }
          }
          if (todosFilter === 'uncompleted') {
            if (isComplete) {
              return {
                ...todo,
                completed: isComplete,
                show: false,
              }
            } else {
              return {
                ...todo,
                completed: isComplete,
                show: true,
              }
            }
          }
        }
        return todo
      })
    )
  }

  function editHandler(e) {
    const id = e.target.parentNode.getAttribute('keyvalue')
    const edited = e.target.value
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            text: edited,
          }
        }
        return todo
      })
    )
  }

  function removeHandler(e) {
    const id = e.target.parentNode.getAttribute('keyvalue')
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function capitalize(str) {
    return str[0].toUpperCase() + str.substring(1)
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return
    // copy isi todos
    const items = [...todos]

    // hapus element yg lagi di drag dari todos
    // lalu destructure masukin ke reordereditem
    const [reorderedItem] = items.splice(result.source.index, 1)

    // gabung reorderedItem ke index tujuan
    items.splice(result.destination.index, 0, reorderedItem)

    // setTodos jadi items
    setTodos(items)
  }

  // JSX
  return (
    <div className='container' style={{ backgroundColor: themes[color] }}>
      <ul className='list'>
        {todos.length === 0 ? (
          ''
        ) : (
          <>
            <p
              className='sorted-by'
              style={{ color: color === 'yellow' ? '#000' : '#fff' }}
            >
              Sorted by : {capitalize(todosFilter)}
            </p>
            <hr className='break-line' />
          </>
        )}

        {/* Todo's items */}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='items'>
            {(provided) => (
              <div
                className='items'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {todos
                  .filter((todo) => todo.show)
                  .map((todo, index) => {
                    return (
                      <Draggable
                        key={todo.id}
                        draggableId={todo.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className='item'
                            key={todo.id}
                            keyvalue={todo.id}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <input
                              type='checkbox'
                              className='checkbox'
                              name={todo.text}
                              onChange={checkHandler}
                              checked={todo.completed && 'checked'}
                            />
                            <input
                              className={
                                todo.completed ? 'text completed' : 'text'
                              }
                              type='text'
                              name={todo.text}
                              value={todo.text}
                              onChange={editHandler}
                              style={{
                                color: color === 'yellow' ? '#000' : '#fff',
                              }}
                            />
                            <button className='remove' onClick={removeHandler}>
                              <i className='im im-x-mark-circle remove-icon'></i>
                            </button>
                          </div>
                        )}
                      </Draggable>
                    )
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ul>
    </div>
  )
}

export default TodoList
