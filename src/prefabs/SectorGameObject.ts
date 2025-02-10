import { IPosition, IPrize } from '../types';
import PrizeGameObject from './PrizeGameObject';

interface ISectorOptions {
  position: IPosition;
  contrastBackground: boolean;
  prize: IPrize | null;
}

export default class SectorGameObject extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, { position, prize, contrastBackground }: ISectorOptions) {
    super(scene, position.x, position.y);

    if (contrastBackground) {
      this.add(new Phaser.GameObjects.Image(scene, 0, 0, 'sector'))
    }
    
    if (prize) {
      this.add(new PrizeGameObject(scene, 0, -40, prize.item))

      const qtyText = `x${prize.qty}`;
      const textStyles: Partial<Phaser.GameObjects.TextStyle> = {
        fontSize: 24,
        color: contrastBackground ? '#0D42C1' : '#FFFF',
      };
  
      this.add(new Phaser.GameObjects.Text(scene, 0, 15, qtyText, textStyles).setOrigin(0.5, 0));
    } else {
      const textStyles: Partial<Phaser.GameObjects.TextStyle> = {
        fontSize: 24,
        color: contrastBackground ? '#0D42C1' : '#FFFF',
      };

      this.add(new Phaser.GameObjects.Text(scene, 0, -30, 'Пусто', textStyles).setOrigin(0.5, 0));
    }

    scene.add.existing(this);
  }
} 
