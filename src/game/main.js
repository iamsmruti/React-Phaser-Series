import Phaser from "phaser";
import { Game } from "./scenes/Game";

export const config = {
  type: Phaser.AUTO,
  parent: 'phaser-container',
  width: 800,
  height: 600,
  scene: Game,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
    },
  },
};