import Nav from './Nav'
import Input from './Input'
import Todos from './Todos'
import NoContent from './NoContent'
import { useAuth } from './Context'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'

const TodoPage = () => {
  const API = 'https://todoo.5xcamp.us/'
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [currentTab, setCurrentTab] = useState('all')
  const { token } = useAuth()

  useEffect(() => {
    async function getTodos() {
      try {
        const response = await axios.get(`${API}todos`, {
          headers: {
            Authorization: token,
          },
        })

        if (response.status !== 200) {
          throw new Error(response.message)
        }

        setTodos(response.data.todos)
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: '錯誤',
          text: '目前無法取得待辦清單，請稍後再試',
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d87355',
        })
      }
    }

    getTodos()
  }, [])

  const showNotCompletedTodos = () => {
    return todos.filter((todo) => todo.completed === false).length + ' '
  }

  const clearCompleted = (e) => {
    e.preventDefault()
    Swal.fire({
      title: '稍等一下',
      text: '確定要清除所有完成事項？',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#d87355',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        setTodos(todos.filter((todo) => todo.completed === false))
      }

      return
    })
  }

  const changeTab = (tab, e) => {
    e.preventDefault()
    if (tab === 'all') {
      setCurrentTab('all')
    }

    if (tab === 'active') {
      setCurrentTab('active')
    }

    if (tab === 'completed') {
      setCurrentTab('completed')
    }
  }

  const filteredTodos = () => {
    if (currentTab === 'all') {
      return todos
    }

    if (currentTab === 'active') {
      return todos.filter((todo) => !todo.completed)
    }

    if (currentTab === 'completed') {
      return todos.filter((todo) => todo.completed)
    }
  }

  return (
    <div id='todoListPage' className='bg-half'>
      <Nav />
      <div className='conatiner todoListPage vhContainer'>
        <div className='todoList_Content'>
          <Input
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            setTodos={setTodos}
          />
          {todos.length === 0 ? (
            <NoContent />
          ) : (
            <div className='todoList_list'>
              <ul className='todoList_tab'>
                <li>
                  <a
                    href='#'
                    className={currentTab === 'all' ? 'active' : ''}
                    onClick={(e) => changeTab('all', e)}
                  >
                    全部
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className={currentTab === 'active' ? 'active' : ''}
                    onClick={(e) => changeTab('active', e)}
                  >
                    待完成
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className={currentTab === 'completed' ? 'active' : ''}
                    onClick={(e) => changeTab('completed', e)}
                  >
                    已完成
                  </a>
                </li>
              </ul>
              <div className='todoList_items'>
                {filteredTodos().length === 0 ? (
                  <p className='todoList_item todoList_label'>
                    這個類別目前沒有待辦事項
                  </p>
                ) : (
                  <ul className='todoList_item'>
                    <Todos
                      todos={todos}
                      setTodos={setTodos}
                      filteredTodos={filteredTodos()}
                    />
                  </ul>
                )}
                <div className='todoList_statistics'>
                  <p>{showNotCompletedTodos()}個待完成項目</p>
                  <a href='#' onClick={(e) => clearCompleted(e)}>
                    清除已完成項目
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TodoPage
