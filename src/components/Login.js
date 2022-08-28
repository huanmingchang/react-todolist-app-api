import navlogo from '../images/navlogo.png'
import homepage from '../images/homepage-bg.png'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const Login = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)

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

            <label className='formControls_label' htmlFor='pwd'>
              密碼
            </label>
            <input
              className='formControls_input'
              type='password'
              name='pwd'
              id='pwd'
              placeholder='請輸入密碼'
              {...register('pwd', {
                required: { value: true, message: '此欄位不可留空' },
                minLength: { value: 6, message: 'password 需大於 6 碼' },
              })}
            />
            <span>{errors.pwd?.message}</span>

            <input
              className='formControls_btnSubmit'
              type='submit'
              value={isProcessing ? '登入中...' : '登入'}
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
