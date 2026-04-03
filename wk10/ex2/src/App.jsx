import { Routes, Route } from 'react-router-dom'
import { Home } from './views/Home'
import { SongDetails } from './views/SongDetails'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/songs/:slug" element={<SongDetails />} />
      </Routes>
    </>
  )
}

export default App