import empty from '../images/empty-bg.png'

const NoContent = () => {
  return (
    <div className='no-content'>
      <p>目前尚無待辦事項</p>
      <img src={empty} alt='' />
    </div>
  )
}

export default NoContent
