import React from "react";
import "./PlayerList.scss";
import Song from "./Song";

const Playerlist = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  return (
    <ul className="player-list list">
      {songs.map((song) => (
        <Song
          song={song}
          setCurrentSong={setCurrentSong}
          id={song.id}
          key={song.id}
          audioRef={audioRef}
          isPlaying={isPlaying}
          songs={songs}
          setSongs={setSongs}
        />
      ))}
    </ul>
  );
};

export default Playerlist;
