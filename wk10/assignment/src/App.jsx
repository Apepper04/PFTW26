import { Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { GameDetail } from "./views/GameDetail";
import gameData from "./assets/gameData.json";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path=":id" element={<GameDetail data={gameData} />} />
    </Routes>
  );
}

export default App;