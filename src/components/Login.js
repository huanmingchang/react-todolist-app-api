import navlogo from '../images/navlogo.png'
import homepage from '../images/homepage-bg.png'
import { Link, useNavigate } from 'react-router-dom'
import { get, useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const Login = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [token, setToken] = useState('')
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const API = 'https://todoo.5xcamp.us/'

  const onSubmit = async (data) => {
    try {
      setIsProcessing(true)
      const response = await axios.post(`${API}/users/sign_in`, { user: data })

      if (response.status !== 200) {
        throw new Error(response.data.message)
      }

      Swal.fire({
        title: '恭喜你',
        text: '登入成功',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d87355',
      })
      setIsProcessing(false)
    } catch (error) {
      setIsProcessing(false)
      console.log(error.response.status + error.response.data.message)
      Swal.fire({
        title: '登入失敗',
        text: '帳號或密碼錯誤',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d87355',
      })
    }
  }

  return (
    <div id='loginPage' className='bg-yellow'>
      <div className='conatiner loginPage vhContainer '>
        <div className='side'>
          <a href='#'>
            <img className='logoImg' src={navlogo} alt='' />
          </a>
          <img className='d-m-n' src={homepage} alt='workImg' />
        </div>
        <div>
          <form className='formControls' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='formControls_txt'>最實用的線上代辦事項服務</h2>
            <label className='formControls_label' htmlFor='email'>
              Email
            </label>
            <input
              className='formControls_input'
              type='text'
              id='email'
              name='email'
              placeholder='請輸入 email'
              {...register('email', {
                required: { value: true, message: '此欄位不可留空' },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: '不符合 Email 規則',
                },
              })}
            />
            <span>{errors.email?.message}</span>

            <label className='formControls_label' htmlFor='password'>
              密碼
            </label>
            <input
              className='formControls_input'
              type='password'
              name='password'
              id='password'
              placeholder='請輸入密碼'
              {...register('password', {
                required: { value: true, message: '此欄位不可留空' },
                minLength: { value: 6, message: 'password 需大於 6 碼' },
              })}
            />
            <span>{errors.password?.message}</span>

            <input
              className='formControls_btnSubmit'
              type='submit'
              value={isProcessing ? '登入中...' : '登入'}
              disabled={isProcessing}
            />
            <Link className='formControls_btnLink' to='/register'>
              註冊帳號
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
