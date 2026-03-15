export default function AnimalComponent({ animalName, clickFocus, clickDelete }) {
  return (
    <div className="animal-card">
      <strong>{animalName}</strong>
      <div className="button-row">
        <button onClick={() => clickFocus(animalName)}>Focus</button>
        <button onClick={() => clickDelete(animalName)}>Delete</button>
      </div>
    </div>
  );
}