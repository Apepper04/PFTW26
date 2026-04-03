import { NavLink, Route, Routes } from 'react-router-dom'
import { Home } from './views/Home'
import { Llamas } from './views/Llamas'
import { Alpaca } from './views/Alpaca'
import './App.css'

function App() {
  return (
    <>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/llamas">Llamas</NavLink></li>
          <li><NavLink to="/alpacas">Alpacas</NavLink></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/llamas" element={<Llamas />} />
        <Route path="/alpacas" element={<Alpaca />} />
      </Routes>
    </>
  )
}

export default App