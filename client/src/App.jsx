import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'
import Form from './Components/Form';
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home /> }/>
        <Route path='/form' element={<Form />} />
        <Route path='*' element={<h1>Error 404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
