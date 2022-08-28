import Swal from 'sweetalert2'

const Todos = (props) => {
  const { todos, setTodos, filteredTodos } = props

  const changeCompleted = (item) => {
    setTodos(
      todos.map((todo) =>
        todo.id === item.id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (item) => {
    Swal.fire({
      title: '稍等一下',
      text: '確定要刪除這筆待辦事項？',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#d87355',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        setTodos(todos.filter((todo) => todo.id !== item.id))
      }

      return
    })
  }

  return (
    <>
      {filteredTodos.map((item) => {
        return (
          <li key={item.id}>
            <label className='todoList_label'>
              <input
                className='todoList_input'
                type='checkbox'
                value={item.completed}
                checked={item.completed ? 'checked' : ''}
                onChange={() => changeCompleted(item)}
              />
              <span>{item.content}</span>
            </label>
            <a href='#'>
              <i className='fa fa-times' onClick={() => deleteTodo(item)}></i>
            </a>
          </li>
        )
      })}
    </>
  )
}

export default Todos
