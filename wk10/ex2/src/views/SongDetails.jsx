import { useParams, NavLink } from 'react-router-dom'
import musicData from '../assets/music.json'
import './SongDetails.css'

export function SongDetails() {
  const { slug } = useParams()
  const { songs } = musicData
  const selectedSong = songs.find((song) => song.slug === slug)

  return (
    <div>
      {selectedSong ? (
        <div>
          <NavLink className="back-link" to="/">Home</NavLink>
          <h1>{selectedSong.title}</h1>
          <h2>{selectedSong.artist}</h2>
          {selectedSong.cover && (
            <img src={selectedSong.cover} alt={selectedSong.title} />
          )}
          <h2>Current Rank: {selectedSong.rank}</h2>
          <h3>Other Positions:</h3>
          <p>Peak Position: {selectedSong.position.peakPosition}</p>
          <p>Position Last Week: {selectedSong.position.positionLastWeek}</p>
          <p>Weeks on Chart: {selectedSong.position.weeksOnChart}</p>
        </div>
      ) : (
        <div>
          <NavLink className="back-link" to="/">Home</NavLink>
          <p>No song matched your url.</p>
        </div>
      )}
    </div>
  )
}