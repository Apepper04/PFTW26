import { useForm } from "react-hook-form";
import "./NewGameForm.css";

export function NewGameForm(props) {
  const { addGameFn } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function handleSubmitGame(data) {
    addGameFn(data);
    reset();
  }

  return (
    <div className="form-wrapper">
      <h4>Add a Board Game</h4>
      <form onSubmit={handleSubmit(handleSubmitGame)}>
        <div className="form-group">
          <label htmlFor="gameName">Game Name</label>
          <input
            id="gameName"
            type="text"
            {...register("name", { required: true })}
          />
          {errors.name && <p className="error">Game name is required</p>}
        </div>

        <div className="form-group">
          <label htmlFor="gamePlayers">Players (e.g. 2-4)</label>
          <input
            id="gamePlayers"
            type="text"
            {...register("players", { required: true })}
          />
          {errors.players && <p className="error">Player count is required</p>}
        </div>

        <div className="form-group">
          <label htmlFor="gamePlayTime">Play Time</label>
          <select id="gamePlayTime" {...register("playTime")}>
            <option value="15-30 min">15-30 min</option>
            <option value="30-45 min">30-45 min</option>
            <option value="45-60 min">45-60 min</option>
            <option value="60-90 min">60-90 min</option>
            <option value="90+ min">90+ min</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="gameCategory">Category</label>
          <select id="gameCategory" {...register("category")}>
            <option value="Strategy">Strategy</option>
            <option value="Abstract Strategy">Abstract Strategy</option>
            <option value="Engine Building">Engine Building</option>
            <option value="Dice Drafting">Dice Drafting</option>
            <option value="Party">Party</option>
            <option value="Cooperative">Cooperative</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="gameDescription">Description</label>
          <textarea
            id="gameDescription"
            rows="3"
            {...register("description")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="gameImage">Image URL</label>
          <input
            id="gameImage"
            type="text"
            {...register("image", { required: true })}
          />
          {errors.image && <p className="error">Image is required</p>}
        </div>

        <div className="form-group checkbox-group">
          <label htmlFor="gameSolo">
            <input
              id="gameSolo"
              type="checkbox"
              {...register("soloPlay")}
            />{" "}
            Includes solo mode
          </label>
        </div>

        <button type="submit">Add Game</button>
      </form>
    </div>
  );
}