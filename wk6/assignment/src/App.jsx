import './App.css'

function App() {
  // Array of llama facts to display on the page
  const llamaFacts = [
    "Llamas communicate with each other primarily through humming, ear movements, and body posture.",
    "A baby llama is called a 'cria,' which comes from the Spanish word for baby.",
    "Llamas have been used as guard animals for livestock like sheep and goats for centuries.",
    "Llamas can learn simple tasks after just a few repetitions, making them one of the easier large animals to train.",
    "Llamas have three stomach compartments that help them efficiently digest tough grasses and plants.",
    "Llamas prefer to live in groups and can become stressed or depressed when kept alone."
  ]

  // Boolean variable to control which fact displays via the ternary
  const isGroupAnimal = true

  return (
    <div>
      <h1>Llama Facts</h1>
      <ul>
        <li>{llamaFacts[0]}</li>
        <li>{llamaFacts[1]}</li>
        <li>{llamaFacts[2]}</li>
        <li>{llamaFacts[3]}</li>
        <li>{isGroupAnimal ? llamaFacts[5] : llamaFacts[4]}</li>
      </ul>
    </div>
  )
}

export default App