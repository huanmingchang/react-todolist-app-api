import { useAuth } from './Context'
import Swal from 'sweetalert2'
import axios from 'axios'

const Todos = (props) => {
  const API = 'https://todoo.5xcamp.us/'
  const { token } = useAuth()
  const { todos, setTodos, filteredTodos } = props

  const changeCompleted = (item) => {
    setTodos(
      todos.map((todo) =>
        todo.id === item.id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (item, e) => {
    e.preventDefault()
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
        async function deleteTodoAPI() {
          try {
            const response = await axios.delete(`${API}todos/${item.id}`, {
              headers: {
                Authorization: token,
              },
            })
          } catch (error) {
            console.log(error)
            Swal.fire({
              title: '錯誤',
              text: '目前無法刪除待辦清單，請稍後再試',
              icon: 'warning',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d87355',
            })
          }
        }

        deleteTodoAPI()
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
              <i
                className='fa fa-times'
                onClick={(e) => deleteTodo(item, e)}
              ></i>
            </a>
          </li>
        )
      })}
    </>
  )
}

export default Todos
