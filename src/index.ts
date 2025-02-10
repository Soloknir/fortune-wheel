import Phaser, { AUTO } from "phaser";
import WheelScene from "./scenes/WheelScene";

document.addEventListener('DOMContentLoaded', () => {
  const config = {
    autoFocus: true,
    type: AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [WheelScene]
  };
  
  new Phaser.Game(config);
}, {});
