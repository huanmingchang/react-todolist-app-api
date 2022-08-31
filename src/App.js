import './styles/App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import TodoPage from './components/TodoPage'
import NotFound from './components/NotFound'
import { AuthContext, useAuth } from './components/Context'
import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [token, setToken] = useState('')

  return (
    <div className='App'>
      <AuthContext.Provider value={{ token, setToken }}>
        <HashRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
            <Route path='todo' element={<TodoPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </HashRouter>
      </AuthContext.Provider>
    </div>
  )
}

export default App
