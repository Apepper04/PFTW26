import "./GameRow.css";

export function GameRow({
  name,
  players,
  playTime,
  category,
  description,
  soloPlay,
  image,
  odd,
}) {
  return (
    <tr className={soloPlay ? "solo" : odd ? "odd-row" : ""}>
      <td>{name}</td>
      <td>{players}</td>
      <td>{playTime}</td>
      <td>{category}</td>
      <td>{description}</td>
      <td>{soloPlay ? "Yes" : "No"}</td>
      <td>
        <img src={image} alt={name} />
      </td>
    </tr>
  );
}