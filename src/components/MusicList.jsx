import React, { useState } from "react";
import "./MusicList.css";

import { useDispatch, useSelector } from "react-redux";
import { addSong, crrentSong } from "../app/slices/musicList";

const MusicList = ({ val }) => {
  let {music} = useSelector(state=>state.app)
  let dis = useDispatch()


  let musicContr = (val,i)=>{
    dis(addSong(val))
    dis(crrentSong(i))
  }
  return (
    <div style={{ bottom: `${val ? "-60px" : "-100%"}` }} className="musicList">
      {music &&
        music?.map((val, i) => (
          <div key={i} style={{border:`${val?.status?"1px solid green":"1px solid transparent"}`,color:`${val?.status?"green":"black"}`}} className="song" onClick={()=>musicContr(val,i)}>
            <h4>{val.name}</h4>
            <audio src={val.element}></audio>
          </div>
        ))}
    </div>
  );
};

export default MusicList;
