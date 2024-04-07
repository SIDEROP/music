import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Play from "./components/Play";

const App = () => {
	
  return (
    <>
      <div className="main">
      <Header />
      <Play/>
      </div>
      <div className="footer">
        <h3>MUSIC APP 😜</h3>
      </div>
    </>
  );
};

export default App;
