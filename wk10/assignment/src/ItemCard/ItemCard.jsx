import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ItemCard.css";
import trash from "../assets/icons/trash.svg";
import copy from "../assets/icons/copy.svg";

export default function ItemCard({
  name,
  players,
  playTime,
  category,
  description,
  soloPlay,
  image,
  id,
  deleteFn,
  duplicateFn,
}) {
  return (
    <div className={soloPlay ? "gameCard solo" : "gameCard"}>
      {soloPlay && <span className="solo-tag">Solo</span>}
      <div className="cardImage">
        <img src={image} alt={name} />
      </div>
      <div className="cardTitle">
        <Link to={`${id}`}>{name}</Link>
      </div>
      <div className="cardDetails">
        <span>{players} players</span>
        <span>{playTime}</span>
        <span>{category}</span>
      </div>
      <p className="cardDescription">{description}</p>
      <div className="actions">
        <a
          href="#"
          onClick={(evt) => {
            evt.preventDefault();
            deleteFn(id);
          }}
        >
          <img src={trash} alt="Delete" />
        </a>
        <a
          href="#"
          onClick={(evt) => {
            evt.preventDefault();
            duplicateFn(id);
          }}
        >
          <img src={copy} alt="Duplicate" />
        </a>
      </div>
    </div>
  );
}

ItemCard.propTypes = {
  name: PropTypes.string,
  players: PropTypes.string,
  playTime: PropTypes.string,
  category: PropTypes.string,
  description: PropTypes.string,
  soloPlay: PropTypes.bool,
  image: PropTypes.string,
  id: PropTypes.string,
  deleteFn: PropTypes.func,
  duplicateFn: PropTypes.func,
};