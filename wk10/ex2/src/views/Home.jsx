import { NavLink } from 'react-router-dom'
import musicData from '../assets/music.json'
import './Home.css'

export function Home() {
  const { songs } = musicData

  return (
    <>
      <h1>Top 50 Songs</h1>
      {songs.map((song) => (
        <div className="song-spacing" key={song.rank}>
          <NavLink to={`/songs/${song.slug}`}>
            {song.rank}. {song.title}
          </NavLink>
        </div>
      ))}
    </>
  )
}