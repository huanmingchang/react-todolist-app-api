import './styles/App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import TodoPage from './components/TodoPage'
import NotFound from './components/NotFound'
import WithTokenRoute from './components/WithTokenRoute'
import WithoutTokenRoute from './components/WithoutTokenRoute'
import { HashRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <HashRouter>
        <Routes>
          <Route element={<WithTokenRoute />}>
            <Route path='/' element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>
          <Route element={<WithoutTokenRoute />}>
            <Route path='todo' element={<TodoPage />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
