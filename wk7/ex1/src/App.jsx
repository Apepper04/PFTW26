import './App.css'
import Camelid from "./components/Camelid"
import llamaImg from "./assets/llama.jpg"
import alpacaImg from "./assets/alpaca.jpg"

function App() {
  const llama = {
    name: "Llama",
    img: llamaImg,
    trivia: "Llamas have been used as pack animals in South America for thousands of years and can carry up to 75 pounds over rough mountain terrain."
  }

  const alpaca = {
    name: "Alpaca",
    img: alpacaImg,
    trivia: "Alpacas produce one of the softest natural fibers in the world, and their fleece comes in over 20 different colors."
  }

  return (
    <div>
      <h1>Camelid Comparison</h1>
      <div className="cards">
        <Camelid name={llama.name} img={llama.img} trivia={llama.trivia} />
        <Camelid name={alpaca.name} img={alpaca.img} trivia={alpaca.trivia} />
      </div>
    </div>
  )
}

export default App