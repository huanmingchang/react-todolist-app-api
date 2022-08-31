import './styles/App.css'
import Nav from './components/Nav'
import Input from './components/Input'
import Todos from './components/Todos'
import NoContent from './components/NoContent'
import Login from './components/Login'
import Register from './components/Register'
import NotFound from './components/NotFound'
import { AuthContext, useAuth } from './components/Context'
import { v4 as uuidv4 } from 'uuid'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [token, setToken] = useState('')
  const [todos, setTodos] = useState([
    {
      id: uuidv4(),
      content: '把冰箱發霉的檸檬拿去丟',
      completed: true,
    },
    {
      id: uuidv4(),
      content: '打電話叫媽媽匯款給我',
      completed: false,
    },
    {
      id: uuidv4(),
      content: '整理電腦資料夾',
      completed: false,
    },
    {
      id: uuidv4(),
      content: '繳電費水費瓦斯費',
      completed: false,
    },
    {
      id: uuidv4(),
      content: '約vicky禮拜三泡溫泉',
      completed: false,
    },
    {
      id: uuidv4(),
      content: '約ada禮拜四吃晚餐',
      completed: false,
    },
  ])
  const [newTodo, setNewTodo] = useState('')
  const [currentTab, setCurrentTab] = useState('all')

  const showNotCompletedTodos = () => {
    return todos.filter((todo) => todo.completed === false).length + ' '
  }

  const clearCompleted = () => {
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

  const changeTab = (tab) => {
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

  const TodoPage = () => {
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
                      onClick={() => changeTab('all')}
                    >
                      全部
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className={currentTab === 'active' ? 'active' : ''}
                      onClick={() => changeTab('active')}
                    >
                      待完成
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className={currentTab === 'completed' ? 'active' : ''}
                      onClick={() => changeTab('completed')}
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
                    <a href='#' onClick={() => clearCompleted()}>
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

  return (
    <div className='App'>
      <AuthContext.Provider value={{ token, setToken }}>
        <HashRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='todo' element={<TodoPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </HashRouter>
      </AuthContext.Provider>
    </div>
  )
}

export default App
