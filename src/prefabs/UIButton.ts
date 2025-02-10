import { IPosition, IPrize } from '../types';
import PrizeGameObject from './PrizeGameObject';

interface IButtonOptions {
  position: IPosition;
  text: string;
  callback: Function
}

export default class Button extends Phaser.GameObjects.Container {
  graphics: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, { position, text, callback }: IButtonOptions) {
    super(scene, position.x, position.y);

    this.width = 596;
    this.height = 92;

    this.graphics = scene.add.graphics();
    this.graphics.fillStyle(0xD42C1, 1);
    this.graphics.fillRoundedRect(position.x - this.width / 2, position.y - this.height / 2, this.width, this.height, 15)

    const textStyles: Partial<Phaser.GameObjects.TextStyle> = {
      fontSize: 24,
      color: '#FFFF',
    };
    this.add(new Phaser.GameObjects.Text(scene, 0, 0, text, textStyles).setOrigin(0.5, 0.5));

    scene.add.existing(this);
    
    this.setInteractive({ useHandCursor: true })
      .on('pointerup', callback)
  }
  
  setVisible(value: boolean): this {
    this.graphics.setVisible(value);
    super.setVisible(value);
    
    return this;
  }
} 