import './App.css'

function App() {
  const myName = "Alex";
  const city = "San Diego";
  const yearsLived = 5;
  const beachDistance = 10;
  const closeToBeach = beachDistance <= 15 
    ? "close enough to visit the beach anytime" 
    : "a bit of a drive to the coast";

  return (
    <div>
      <h1>Hello World!</h1>
      <p>My name is {myName} and I live in {city}.</p>
      <p>I have lived here for {yearsLived} years and I am {closeToBeach}.</p>
      {yearsLived > 3 && (
        <p>At this point, I can not imagine living anywhere else.</p>
      )}
    </div>
  )
}

export default App