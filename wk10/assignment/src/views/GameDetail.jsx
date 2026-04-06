import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import "./GameDetail.css";

export function GameDetail({ data }) {
  const { id } = useParams();
  const selectedGame = data.find((game) => game.id === id);

  if (!selectedGame) {
    return (
      <div className="detail-page">
        <Link to="/" className="back-link">Return to Collection</Link>
        <p className="not-found">Game not found.</p>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">Return to Collection</Link>
      <div className="detail-card">
        <img
          className="detail-image"
          src={selectedGame.image}
          alt={selectedGame.name}
        />
        <div className="detail-info">
          <h1>{selectedGame.name}</h1>
          {selectedGame.soloPlay && (
            <span className="detail-solo-tag">Solo Mode</span>
          )}
          <p>
            <span className="detail-label">Players:</span>{" "}
            {selectedGame.players}
          </p>
          <p>
            <span className="detail-label">Play Time:</span>{" "}
            {selectedGame.playTime}
          </p>
          <p>
            <span className="detail-label">Category:</span>{" "}
            {selectedGame.category}
          </p>
          <p>
            <span className="detail-label">Description:</span>{" "}
            {selectedGame.description}
          </p>
        </div>
      </div>
    </div>
  );
}

GameDetail.propTypes = {
  data: PropTypes.array,
};