function Camelid({ name, img, trivia }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <img src={img} alt={name} />
      <p>{trivia}</p>
    </div>
  );
}

export default Camelid;