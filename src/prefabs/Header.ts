import { IPosition } from '../types';

interface IHeaderOptions {
  position: IPosition;
  attempts: number;
}

export default class Header extends Phaser.GameObjects.Container {
  attempts: Phaser.GameObjects.Text;
  
  constructor(scene: Phaser.Scene, { position, attempts }: IHeaderOptions) {
    super(scene, position.x, position.y);

    this.add(new Phaser.GameObjects.Rectangle(scene, 0, 0, window.innerWidth, 116, 0xffffff, 1).setOrigin(0, 0))

    const textStyles: Partial<Phaser.GameObjects.TextStyle> = {
      fontSize: 48,
      color: '#000000',
    };

    this.add(new Phaser.GameObjects.Text(scene, window.innerWidth / 2, 58, 'Фортуна', textStyles).setOrigin(0.5, 0.5));
    
    this.add(new Phaser.GameObjects.Image(scene, window.innerWidth / 2 + 200, 58, 'plate'));
    this.add(new Phaser.GameObjects.Image(scene, window.innerWidth / 2 + 160, 58, 'fortune').setScale(0.3));

    const fontStyle = {
      fontSize: 28,
      color: '#000'
    }
    this.attempts = new Phaser.GameObjects.Text(scene, window.innerWidth / 2 + 220, 58, `${attempts}`, fontStyle).setOrigin(0.5, 0.5);
    this.add(this.attempts);
    
    scene.add.existing(this);
  }

  update(...args: any[]): void {
    this.attempts.setText(args[0])
  }
  
} 