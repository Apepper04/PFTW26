import { useState } from "react";
import "./App.css";
import AnimalComponent from "./AnimalComponent";

function App() {
  const startingAnimals = [
    "Dog",
    "Cat",
    "Elephant",
    "Tiger",
    "Dolphin",
    "Penguin",
    "Giraffe",
    "Wolf",
    "Otter",
    "Hawk"
  ];

  const [headline, setHeadline] = useState("Alex's List of Animals");
  const [animals, setAnimals] = useState(startingAnimals);

  function focusAnimal(animalName) {
    setHeadline(animalName);
  }

  function deleteAnimal(animalName) {
    const updatedAnimals = animals.filter((animal) => {
      return animal !== animalName;
    });
    setAnimals(updatedAnimals);
  }

  return (
    <div className="app">
      <h1>{headline}</h1>
      <button
        className="reset-button"
        onClick={() => {
          setAnimals(startingAnimals);
          setHeadline("Alex's List of Animals");
        }}
      >
        Reset List
      </button>
      {animals.length === 0 ? (
        <p className="empty-message">No animals left!</p>
      ) : (
        <div className="animal-list">
          {animals.map((animal) => {
            return (
              <AnimalComponent
                key={animal}
                animalName={animal}
                clickFocus={focusAnimal}
                clickDelete={deleteAnimal}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;