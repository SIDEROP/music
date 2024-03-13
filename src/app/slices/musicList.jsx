import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

import Akhiyaan from "../../../public/music/Akhiyaan.mp3";
import Jeena from "../../../public/music/Jeena.mp3";
import Teri from "../../../public/music/Teri.mp3";

export let musicData = createSlice({
  name: "musicData",
  initialState: {
    music: [
      {
        id: 1,
        name: "Akhiyaan",
        element: Akhiyaan,
        status: false
      },
      {
        id: 2,
        name: "Jeena",
        element: Jeena,
        status: false
      },
      {
        id: 3,
        name: "Teri",
        element: Teri,
        status: false
      },
    ],
    songs: [],
  },
  reducers: {
    addSong: (state, action) => {
      state.songs = action.payload;
    },
    crrentSong: (state, action) => {
      state.music = state.music.map((val, i) => {
        if (action.payload == i) {
            return {...val,status:true}
        }
        else{
           return {...val,status:false}
        }
      });
    },
    nextB:(state,action)=>{
        state?.music?.map((val,i)=>{
            if (i == action.payload) {
               state.songs = val
            }
        })
    }
  },
});

export default musicData.reducer;
export const { addSong, crrentSong, nextB } = musicData.actions;
