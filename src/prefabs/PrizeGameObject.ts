import { PrizesIds } from "../enums";

export default class PrizeGameObject extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x: number, y: number, item: PrizesIds) {
    super(scene, x, y, item);

    scene.add.existing(this);
    this.setScale(0.45)
  }
}
