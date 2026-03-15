import { useState } from 'react'
import llama from './assets/llama.jpg'
import alpaca from './assets/alpaca.jpg'
import './App.css'

function App() {
  const [currentImage, setCurrentImage] = useState(llama)

  return (
    <>
      <h1>{currentImage === llama ? 'Llama' : 'Alpaca'}</h1>
      <div className="image-frame">
        <img src={currentImage} alt="A camelid" />
      </div>
      <div className="button-container">
        <button
          className={currentImage === llama ? 'active' : ''}
          onClick={() => setCurrentImage(llama)}
        >
          Llama
        </button>
        <button
          className={currentImage === alpaca ? 'active' : ''}
          onClick={() => setCurrentImage(alpaca)}
        >
          Alpaca
        </button>
      </div>
    </>
  )
}

export default App