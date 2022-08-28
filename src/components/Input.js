import { v4 as uuidv4 } from 'uuid'
import Swal from 'sweetalert2'

const Input = (props) => {
  const { newTodo, setNewTodo, setTodos } = props

  const addNewTodo = () => {
    if (newTodo.trim().length === 0) {
      Swal.fire({
        text: '待辦事項不可為空白',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d87355',
      })

      setNewTodo('')
      return
    }

    setTodos((prev) => [
      ...prev,
      {
        id: uuidv4(),
        content: newTodo,
        completed: false,
      },
    ])

    setNewTodo('')
  }

  return (
    <div className='inputBox'>
      <input
        type='text'
        placeholder='請輸入待辦事項'
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <a href='#' onClick={() => addNewTodo()}>
        <i className='fa fa-plus'></i>
      </a>
    </div>
  )
}

export default Input
