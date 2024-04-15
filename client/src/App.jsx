import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Form from './Components/Form';
import Register from './Components/Register';
import Update from './Components/Update';
import Login from './Components/Login';
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home /> }/>
        <Route path='/register' element={<Register />} />
        <Route path='/form' element={<Form />} />
        <Route path='/update/:id' element={<Update />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<h1>Error 404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
