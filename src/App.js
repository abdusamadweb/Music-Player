import Player from "./components/player";
import PlayerList from "./components/player-list";
import data from "./data";
import { useRef, useState } from "react";

// css
import "./assets/styles/flex-box.css";
import "./assets/styles/global.css";
import "./assets/styles/main.css";

function App() {
  const audioRef = useRef(null);

  const [songInfo, setSongInfo] = useState({
    currentTime: "--:--",
    duration: "--:--",
  });

  const timeUpdater = (e) => {
    let current = e.target.currentTime;
    let duration = e.target.duration;

    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  console.log(currentSong);

  

  return (
    <div className="App">
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        timeUpdater={timeUpdater}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <PlayerList
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
      />
    </div>
  );
}

export default App;
