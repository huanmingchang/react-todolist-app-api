import navlogo from '../images/navlogo.png'
import homepage from '../images/homepage-bg.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const Register = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm()
  const API = 'https://todoo.5xcamp.us/'

  const onSubmit = async (data) => {
    try {
      setIsProcessing(true)
      const response = await axios.post(`${API}users`, {
        user: data,
      })

      if (response.status !== 201) {
        throw new Error(response.data.message)
      }

      Swal.fire({
        title: '恭喜你',
        text: '註冊成功',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d87355',
      })

      setIsProcessing(false)
      navigate('/login')
    } catch (error) {
      setIsProcessing(false)
      console.log(error.response.status + error.response.data.message)

      Swal.fire({
        title: '註冊失敗',
        text: '註冊帳號已被使用，請重新選擇帳號',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d87355',
      })

      reset()
    }
  }

  return (
    <div id='signUpPage' className='bg-yellow'>
      <div className='conatiner signUpPage vhContainer'>
        <div className='side'>
          <a href='#'>
            <img className='logoImg' src={navlogo} alt='' />
          </a>
          <img className='d-m-n' src={homepage} alt='workImg' />
        </div>
        <div>
          <form className='formControls' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='formControls_txt'>註冊帳號</h2>
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

            <label className='formControls_label' htmlFor='nickname'>
              您的暱稱
            </label>
            <input
              className='formControls_input'
              type='text'
              name='nickname'
              id='nickname'
              placeholder='請輸入您的暱稱'
              {...register('nickname', {
                required: { value: true, message: '此欄位不可留空' },
              })}
            />
            <span>{errors.nickname?.message}</span>

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

            <label className='formControls_label' htmlFor='confirmPwd'>
              再次輸入密碼
            </label>
            <input
              className='formControls_input'
              type='password'
              name='confirmPwd'
              id='confirmPwd'
              placeholder='請再次輸入密碼'
              {...register('confirmPwd', {
                required: { value: true, message: '此欄位不可留空' },
                validate: (value: string) => {
                  if (watch('password') != value) {
                    return '密碼不一致'
                  }
                },
              })}
            />
            <span>{errors.confirmPwd?.message}</span>

            <input
              className='formControls_btnSubmit'
              type='submit'
              value={isProcessing ? '註冊中...' : '註冊帳號'}
              disabled={isProcessing}
            />
            <Link className='formControls_btnLink' to='/login'>
              登入
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
