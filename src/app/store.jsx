import { configureStore } from "@reduxjs/toolkit";
import musicData from "./slices/musicList";

let store = configureStore({
    reducer:{
        app:musicData
    }
})

export default store