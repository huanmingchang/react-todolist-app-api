import navlogo from '../images/navlogo.png'
import homepage from '../images/homepage-bg.png'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const Register = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()
  const onSubmit = (data) => console.log(data)

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

            <label className='formControls_label' htmlFor='name'>
              您的暱稱
            </label>
            <input
              className='formControls_input'
              type='text'
              name='name'
              id='name'
              placeholder='請輸入您的暱稱'
              {...register('name', {
                required: { value: true, message: '此欄位不可留空' },
              })}
            />
            <span>{errors.name?.message}</span>

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
                  if (watch('pwd') != value) {
                    return '密碼不一致'
                  }
                },
              })}
            />
            <span>{errors.confirmPwd?.message}</span>

            <input
              className='formControls_btnSubmit'
              type='submit'
              value='註冊帳號'
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
