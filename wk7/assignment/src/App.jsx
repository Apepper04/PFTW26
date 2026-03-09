import "./App.css";
import { GameRow } from "./GameRow";

function App() {
  const boardGames = [
    {
      name: "Settlers of Catan",
      players: "3-4",
      playTime: "60-90 min",
      category: "Strategy",
      description:
        "Players compete to settle an island by collecting and trading resources to build roads, settlements, and cities. The first to reach 10 victory points wins.",
      soloPlay: false,
      image: "./catan.png",
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
    },
  ];

  return (
    <>
      <h1>Board Game Collection</h1>
      <p>
        A look at some of my favorite tabletop games, from quick puzzlers to
        longer strategy sessions.
      </p>
      <p className="key">
        Key: Games highlighted in{" "}
        <span className="solo-label">blue</span> include a solo mode.
      </p>

      <table className="game-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Players</th>
            <th>Play Time</th>
            <th>Category</th>
            <th className="desc-col">Description</th>
            <th>Solo Mode?</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {boardGames.map((game, index) => {
            return (
              <GameRow
                key={game.name}
                odd={index % 2 === 0}
                name={game.name}
                players={game.players}
                playTime={game.playTime}
                category={game.category}
                description={game.description}
                soloPlay={game.soloPlay}
                image={game.image}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;