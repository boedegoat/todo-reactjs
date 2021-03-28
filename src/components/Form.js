import React, { useEffect, useRef } from 'react'

const Form = (props) => {
  // State and props
  const { setInput, setTodos, todos, input } = props
  const inputForm = useRef(null)

  // functions
  function inputHandler(e) {
    setInput(e.target.value)
  }

  function submitHandler(e) {
    e.preventDefault()
    setTodos([
      ...todos,
      {
        id: new Date().getTime().toString(),
        text: input,
        completed: false,
        show: true,
      },
    ])
    setInput('')
    e.target.previousSibling.value = ''
  }

  useEffect(() => {
    inputForm.current.focus()
  }, [])

  // JSX
  return (
    <form className='add-section'>
      <div className='add-list'>
        <input type='text' className='add-input' placeholder='add a task' onChange={inputHandler} ref={inputForm} />
        <button type='submit' className='add-btn' onClick={submitHandler}>
          <i className='im im-plus-circle add-icon'></i>
        </button>
      </div>
    </form>
  )
}

export default Form
