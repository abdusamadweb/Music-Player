import React, { useState, useEffect } from "react";
import "./Player.scss";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  timeUpdater,
  songs,
  setCurrentSong,
  setSongs
}) => {

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const moveRange = (e) => {
    audioRef.current.currentTime = e.target.value;
  };

  const playSong = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const songSkiper = (direction) => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);

    if (direction === 'next') {
      setCurrentSong((songs[(currentIndex + 1) % songs.length]));
    } 
    
    if (direction === 'back') {
      if ((currentIndex - 1) < 0) {
        setCurrentSong(songs[songs.length - 1]);
        return;
      }
      setCurrentSong((songs[currentIndex - 1]));
    }
    console.log(currentIndex);
  }

  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
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

    setSongs(newSongs);

    if (isPlaying) {
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
        });
      }
    }
  }, [currentSong]);

  
  return (
    <div className="container">
      <div className="player">
        <div className="player__imgs">
          <img className={`player__img ${isPlaying ? 'active-img' : ''}`} src={currentSong.cover} alt="music" />
        </div>
        <h2 className="player__title">{currentSong.name}</h2>
        <span className="player__artist">{currentSong.artist}</span>
        <div className="inp-wrapper">
          <input
            className="player__inp"
            type="range"
            min={0}
            max={songInfo.duration ? songInfo.duration : "--:--"}
            onChange={moveRange}
            value={songInfo.currentTime}
          />
          <div className="range-up"></div>
        </div>
        <div className="row between player__time time">
          <span className="time__start">{songInfo.currentTime ? getTime(songInfo.currentTime) : '0:00'}</span>
          <span className="time__end">{songInfo.duration ? getTime(songInfo.duration) : '--:--'}</span>
        </div>
        <div className="row between player__ps ps">
          <button className="ps__btn" onClick={() => songSkiper('back')}>
            <i className="fas fa-angle-double-left"></i>
          </button>
          <button className="ps__btn" onClick={playSong}>
            <i className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
          </button>
          <button className="ps__btn" onClick={() => songSkiper('next')}>
            <i className="fas fa-angle-double-right"></i>
          </button>
        </div>
        <audio
          onTimeUpdate={timeUpdater}
          onLoadedMetadata={timeUpdater}
          ref={audioRef}
          src={currentSong.audio}
        ></audio>
      </div>
    </div>
  );
};

export default Player;
