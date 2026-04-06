import { useState } from "react";
import { nanoid } from "nanoid";
import Masthead from "../Masthead/Masthead";
import ItemCard from "../ItemCard/ItemCard";
import { NewGameForm } from "../NewGameForm/NewGameForm";
import gameData from "../assets/gameData.json";

export function Home() {
  const [games, setGames] = useState(gameData);

  function addGame(data) {
    const newGame = {
      ...data,
      soloPlay: !!data.soloPlay,
      id: nanoid(6),
    };
    setGames([...games, newGame]);
  }

  function deleteCard(id) {
    const updatedArray = games.filter((game) => {
      return game.id !== id;
    });
    setGames(updatedArray);
  }

  function duplicateCard(id) {
    const matchingGame = games.find((game) => {
      return game.id === id;
    });
    const updatedGame = { ...matchingGame, id: nanoid() };
    setGames([...games, updatedGame]);
  }

  return (
    <div className="page">
      <Masthead />
      <div className="collection">
        {games.map((game) => {
          return (
            <ItemCard
              key={game.id}
              deleteFn={deleteCard}
              duplicateFn={duplicateCard}
              {...game}
            />
          );
        })}
      </div>
      <NewGameForm addGameFn={addGame} />
    </div>
  );
}