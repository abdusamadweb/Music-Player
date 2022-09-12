import React from "react";
import { playAudio } from "../../functions";

const Song = ({
  song,
  setCurrentSong,
  id,
  audioRef,
  isPlaying,
  songs,
  setSongs,
}) => {
  const selectSongHandle = () => {
    setCurrentSong(song);

    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });

    console.log(newSongs);

    playAudio(audioRef, isPlaying);

    setSongs(newSongs);
  };


  return (
    <li
      className={`row align-center list__item ${song.active ? "selected" : ""}`}
      onClick={selectSongHandle}
    >
      <img className="list__img" src={song.cover} alt="img" />
      <div>
        <span className="list__name">{song.name}</span>
        <span className="list__artist">{song.artist}</span>
      </div>
    </li>
  );
};

export default Song;
