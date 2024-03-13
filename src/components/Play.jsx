import React, { useEffect, useRef, useState } from "react";
import "./Play.css";
import Jeena from "../../public/music/Jeena.mp3";
import ca from "../../public/img/ca.png";

// icons
import { IoPlaySkipBackSharp } from "react-icons/io5";
import { IoPlaySkipForward } from "react-icons/io5";
import { FaRegPlayCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { nextB, crrentSong } from "../app/slices/musicList";
import { IoMdVolumeHigh } from "react-icons/io";
import { TiArrowLoop } from "react-icons/ti";


const Play = () => {
  let { songs, music } = useSelector((state) => state.app);
  let [play, SetPlay] = useState(false);
  let [next, SetNext] = useState(0);
  let [durre, SetDurre] = useState(0);
  let [min, SetMin] = useState(0);
  let [sec, SetSec] = useState(0);
  let [volToggel,Setvolume] = useState(false)

  let useRe = useRef(null);
  let useAudio = useRef(null);
  let useValuem = useRef(null);

  useEffect(() => {
    SetPlay(false);
  }, [music]);

  useEffect(() => {
    useAudio.current.volume = 0.1
  },[]);


  let musics = () => {
    let m = document.getElementById("mainAudio");
    if (play) {
      m.pause();
    } else {
      m.play();
    }
    SetPlay((pre) => !pre);
    Setvolume(false)
  };

  let useDis = useDispatch();

  let nextBtn = () => {
    if (next == music.length - 1) {
      SetNext(0);
    } else {
      SetNext((pre) => (pre += 1));
    }
    useDis(crrentSong(next));
    useDis(nextB(next));
    SetPlay(false);
    Setvolume(false)

  };

  let prevBtn = () => {
    if (next == 0) {
      SetNext(music.length - 1);
    } else {
      SetNext((pre) => (pre -= 1));
    }
    useDis(crrentSong(next));
    useDis(nextB(next));
    SetPlay(false);
    Setvolume(false)
  };

  let timeUP = (e) => {
    let { currentTime, duration } = e.nativeEvent.srcElement;

    let du = (currentTime * 100) / duration;
    SetDurre(du);

    SetMin(Math.trunc(currentTime / 60));
    SetSec(Math.trunc(currentTime % 60));
  };

  let inpuFun = () => {
    SetDurre(useRe.current.value);
    useAudio.current.currentTime =
      (useRe.current.value / 100) * useAudio.current.duration;
  };

  let [loop,SetLoop]=useState(false)

  let ended = (e) => {
    if (!loop)SetPlay(false)
  };

  // valuem
  let valuem = () => {
    useAudio.current.volume = (1 / 100) * useValuem.current.value;
  };
  return (
    <div className="play_menu">
      <div className="valume" style={{display:`${volToggel?"flex":"none"}`}}>
        <input
          type="range"
          ref={useValuem}
          onChange={() => valuem()}
        />
      </div>
      <div className="playMusic">
        <h1>{songs.name ? songs.name : "Jeena"}</h1>
        <div className={`caset ${play ? "active" : null}`}>
          <img src={ca} alt="" onClick={() => musics()} />
          <audio
            loop={loop?true:false}
            ref={useAudio}
            id="mainAudio"
            src={songs.element ? songs.element : Jeena}
            onEnded={(e) => ended(e)}
            onTimeUpdate={(e) => timeUP(e)}
          ></audio>
        </div>
      </div>
      <div className="play">
        <div className="div">
          <span>{`${min}:${sec}`}</span>
          <input
            type="range"
            ref={useRe}
            value={durre}
            onChange={() => inpuFun()}
          />
        </div>
        <div className="playBox">
          <i>
            <IoPlaySkipBackSharp size={30} cursor={"pointer"} onClick={() => prevBtn()} />
          </i>
          <i>
            <FaRegPlayCircle
              style={{ color: `${play ? "green" : "black"}`,cursor:"pointer" }}
              size={30}
              onClick={() => musics()}
            />
          </i>
          <i>
            <IoPlaySkipForward size={30} cursor={"pointer"} onClick={() => nextBtn()} />
          </i>
          <i id="volume" style={{color:`${volToggel?"red":"black"}`}}>
            <IoMdVolumeHigh size={20} cursor={"pointer"} onClick={()=>Setvolume(pre=>!pre)}/>
          </i>

          <i id="loop" style={{color:`${loop?"red":"black"}`}}>
            <TiArrowLoop size={20} cursor={"pointer"} onClick={()=>SetLoop(pre=>!pre)}/>
          </i>
        </div>
      </div>
    </div>
  );
};

export default Play;
