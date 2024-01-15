import React from "react";
import GameComponent from "../components/GameComponent";

import {config} from '../game/main'

const Home = () => {
  return <div>
    <GameComponent config={config} />
  </div>;
};

export default Home;
