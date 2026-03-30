import { useState } from "react";
import "./App.css";
import Masthead from "./Masthead/Masthead";
import ItemCard from "./ItemCard/ItemCard";
import { nanoid } from "nanoid";

function App() {
  const [games, setGames] = useState([
    {
      name: "Settlers of Catan",
      players: "3-4",
      playTime: "60-90 min",
      category: "Strategy",
      description:
        "Players compete to settle an island by collecting and trading resources to build roads, settlements, and cities. The first to reach 10 victory points wins.",
      soloPlay: false,
      image: "./catan.png",
      id: "1",
    },
    {
      name: "Ticket to Ride",
      players: "2-5",
      playTime: "45-60 min",
      category: "Strategy",
      description:
        "Collect train cards and claim railway routes across the map to connect cities and complete destination tickets for points.",
      soloPlay: false,
      image: "./ticket-to-ride.png",
      id: "2",
    },
    {
      name: "Tiny Towns",
      players: "1-6",
      playTime: "30-45 min",
      category: "Abstract Strategy",
      description:
        "Place resource cubes on a 4x4 grid in specific patterns to construct buildings. Each building type scores differently, so plan your layout carefully.",
      soloPlay: true,
      image: "./tiny-towns.png",
      id: "3",
    },
    {
      name: "Splendor",
      players: "2-4",
      playTime: "30 min",
      category: "Engine Building",
      description:
        "Collect gem tokens to purchase development cards, building up discounts and prestige. First player to 15 prestige points triggers the final round.",
      soloPlay: false,
      image: "./splendor.png",
      id: "4",
    },
    {
      name: "Azul",
      players: "2-4",
      playTime: "30-45 min",
      category: "Abstract Strategy",
      description:
        "Draft colorful tiles from shared factory displays and arrange them on your player board to create patterns. Careful tile selection is key to scoring big.",
      soloPlay: false,
      image: "./azul.png",
      id: "5",
    },
    {
      name: "Sagrada",
      players: "1-4",
      playTime: "30-45 min",
      category: "Dice Drafting",
      description:
        "Draft translucent dice and place them on your window board to build a stained glass masterpiece. Match public and secret objectives to earn the most points.",
      soloPlay: true,
      image: "./sagrada.png",
      id: "6",
    },
  ]);

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
    </div>
  );
}

export default App;