import { useAuth } from './Context'
import axios from 'axios'
import Swal from 'sweetalert2'

const Input = (props) => {
  const API = 'https://todoo.5xcamp.us/'
  const { newTodo, setNewTodo, setTodos, getTodos } = props
  const { token } = useAuth()

  const addNewTodo = async (e) => {
    e.preventDefault()
    try {
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

      const response = await axios.post(
        `${API}todos`,
        {
          todo: {
            content: newTodo,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      getTodos()
      setNewTodo('')
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: '錯誤',
        text: '目前無法新增待辦清單，請稍後再試',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d87355',
      })
    }
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
      <a href='#' onClick={(e) => addNewTodo(e)}>
        <i className='fa fa-plus'></i>
      </a>
    </div>
  )
}

export default Input
