import { IPrize } from "../types";

interface IResultOptions {
  prize: IPrize | null,
  noAttemptsLeft?: boolean
}

export default class ResultGameObject extends Phaser.GameObjects.Container {
  background?: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, { prize, noAttemptsLeft }: IResultOptions) {
    super(scene, 0, 0);
    

    const fullWidth = window.innerWidth;
    const fullHeight = window.innerHeight;

    this.add(new Phaser.GameObjects.Rectangle(scene, 0, 0, fullWidth, fullHeight, 0x000, 0.7).setOrigin(0, 0));

    const fontStyle: Partial<Phaser.Types.GameObjects.Text.TextStyle> = {
      fontSize: 48,
      align: 'center',
      wordWrap: {
        width: 800
      },
      
    }
    this.add(new Phaser.GameObjects.Text(scene, fullWidth / 2, fullHeight / 2, 'Вы ничего не выиграли. Повезет в следующий раз', fontStyle).setOrigin(0.5, 0.5))
    if (noAttemptsLeft) {
    } else if (prize) {
      this.background = new Phaser.GameObjects.Image(scene, fullWidth / 2, fullHeight / 2, 'result-bg');
      this.add(this.background);

      this.scene.tweens.add({
        targets: this.background,
        angle: 360,
        duration: 5,
        repeat: -1
      })

      this.add(new Phaser.GameObjects.Image(scene, 0, 0, prize.item));
      this.add(new Phaser.GameObjects.Text(scene, 0, 100, `x${prize.qty}`, {}));

    }

    scene.add.existing(this);
  }
}
