import "./Masthead.css";

export default function Masthead() {
  return (
    <div className="masthead">
      <h1>Board Game Collection</h1>
      <p>
        A look at some of my favorite tabletop games, from quick puzzlers to
        longer strategy sessions.
      </p>
      <div className="legend">
        <span className="solo-badge">Solo</span>
        <span>= includes a solo mode</span>
      </div>
    </div>
  );
}