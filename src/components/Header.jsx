import React, { useState } from "react";
import "./Header.css";
import { RiPlayListLine } from "react-icons/ri";
import MusicList from "./MusicList";

const Header = () => {
  let [toggel, SetToggel] = useState(false);

  return (
    <>
      <header>
        <h2>ADAK</h2>
        <RiPlayListLine
          style={{ cursor: "pointer",position:"relative",zIndex:"2" }}
          size={26}
          onClick={() => SetToggel((pre) => !pre)}
        />
      </header>
      <MusicList val={toggel}/>
    </>
  );
};

export default Header;
