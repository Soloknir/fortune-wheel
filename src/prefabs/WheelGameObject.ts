import { IPosition, IPrize } from "../types";
import SectorGameObject from "./SectorGameObject";

interface IWheelOptions {
  position: IPosition;
  prizes: (IPrize | null)[];
}

export default class WheelGameObject extends Phaser.GameObjects.Container {
  
  constructor(scene: Phaser.Scene, { position, prizes }: IWheelOptions) {
    super(scene, position.x, position.y);
    
    this.addSections(prizes)

    scene.add.existing(this);
  }

  addSections(prizes: (IPrize | null)[]) {
    const radius = 130;

    for (var i = 0; i < prizes.length; ++i) {
      const angle = i * Math.PI * 2 / prizes.length;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius

      this.add(new SectorGameObject(this.scene, {
        position: { x, y },
        contrastBackground: i % 2 === 0,
        prize: prizes[i]
      }).setAngle(90 + 45 * i))
    }
  }
} 

