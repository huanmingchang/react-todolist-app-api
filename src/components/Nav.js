import { useAuth } from './Context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const Nav = () => {
  const navigate = useNavigate()
  const API = 'https://todoo.5xcamp.us/'
  const { setToken } = useAuth()
  const token = JSON.parse(localStorage.getItem('token'))

  const logout = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.delete(`${API}users/sign_out`, {
        headers: {
          Authorization: token,
        },
      })

      if (response.status !== 200) {
        throw new Error(response.data.message)
      }

      Swal.fire({
        title: '已登出',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d87355',
      })

      localStorage.removeItem('token')
      localStorage.removeItem('name')
      setToken('')
      navigate('/')
    } catch (error) {
      console.log(error.message + ' ' + error.response.data.message)
      Swal.fire({
        title: '登出失敗',
        text: '請稍後再試',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d87355',
      })
    }
  }

  return (
    <nav>
      <h1>
        <a href='#'>
          <img src='' alt='' />
          ONLINE TODO LIST
        </a>
      </h1>
      <ul>
        <li className='todo_sm'>
          <a href='#'>
            <span>
              {localStorage.getItem('name')
                ? JSON.parse(localStorage.getItem('name'))
                : 'User'}
              的代辦
            </span>
          </a>
        </li>
        <li>
          <a href='#' onClick={(e) => logout(e)}>
            登出
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
