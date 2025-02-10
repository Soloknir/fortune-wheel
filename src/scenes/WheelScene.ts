import { PrizesIds } from "../enums";
import Header from "../prefabs/Header";
import Button from "../prefabs/UIButton";
import WheelGameObject from "../prefabs/WheelGameObject";
import { IPrize } from "../types";

interface WheelSceneState {
  attempts: number;
  isSpinning: boolean;
}

export default class WheelScene extends Phaser.Scene {
  state: WheelSceneState;

  wheelFace?: WheelGameObject;
  prizes: (IPrize | null)[] = [];
  header?: Header;
  button?: Button;

  constructor() {
    super({ key: 'wheel' });

    this.state = {
      attempts: 3,
      isSpinning: false
    };
  }

  preload() {
    this.load.svg('wheel', '/assets/wheel.svg');
    this.load.svg('sector', '/assets/sector.svg');
    this.load.svg('pointer', '/assets/pointer.svg');
    this.load.svg('plate', './assets/plate.svg');
    this.load.image('fortune', './assets/fortune.png');

    this.load.image(PrizesIds.COIN, `/assets/${PrizesIds.COIN}.png`);
    this.load.image(PrizesIds.EXP, `/assets/${PrizesIds.EXP}.png`);
    this.load.image(PrizesIds.GIFT_1, `/assets/${PrizesIds.GIFT_1}.png`);
    this.load.image(PrizesIds.GIFT_2, `/assets/${PrizesIds.GIFT_2}.png`);
    this.load.image(PrizesIds.GIFT_3, `/assets/${PrizesIds.GIFT_3}.png`);
    this.load.image(PrizesIds.GIFT_4, `/assets/${PrizesIds.GIFT_4}.png`);
  }

  create() {
    this.header = new Header(this, { position: { x: 0, y: 0 }, attempts: this.state.attempts });

    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    this.add.image(screenCenterX, screenCenterY + 5, 'wheel')

    const screenCenter = { x: screenCenterX, y: screenCenterY } 
    this.prizes = [
      { item: PrizesIds.GIFT_2, qty: 1 },
      { item: PrizesIds.GIFT_3, qty: 1 },
      { item: PrizesIds.GIFT_4, qty: 1 },
      null,
      { item: PrizesIds.GIFT_1, qty: 1 },
      { item: PrizesIds.EXP, qty: 10 },
      { item: PrizesIds.COIN, qty: 25 },
      null,
    ]

    this.wheelFace = new WheelGameObject(this, { position: screenCenter, prizes: this.prizes })

    this.add.image(screenCenterX, screenCenterY, 'pointer');

    this.button = new Button(this, { position: { x: screenCenterX, y: screenCenterY + 400 }, text: 'Крутить колесо', callback: this.spinTheWheel.bind(this) })
  }

  spinTheWheel() : void {
    if (!this.wheelFace) {
      throw new Error('Wheel face is not initialized!')
    }

    this.hideUI();

    this.wheelFace.setAngle(0);
    const angle = (360 * (Math.random())) * (Math.random() * 5 + 5);

    this.tweens.add({
      targets: this.wheelFace,
      angle,
      duration: 5000,
      ease: 'Cubic.easeOut'
    }).on('complete', () => {
      if (!this.wheelFace) {
        return;
      }

      this.state.attempts--;

      const position = angle % 45;
      const dAngle = position < 22.5 ? -position : 45 - position
      const newAngle = this.wheelFace?.angle + dAngle;
      
      this.tweens.add({
        targets: this.wheelFace,
        angle: newAngle,
        duration: 1000,
        ease: 'Cubic.easeOut'
      }).on('complete', () => {
        this.showResult(this.prizes[Math.abs(newAngle / 45)]);
        this.showUI();
      });
    });
  }

  update(time: number, delta: number): void {
    this.header?.update(`${this.state.attempts}`)
  }

  hideUI() {
    this.button && this.button.setVisible(false);
    this.header && this.header.setVisible(false);
  }

  showUI() {
    this.button && this.button.setVisible(true);
    this.header && this.header.setVisible(true);
  }

  showResult(result: IPrize | null) {
    console.log(result)
  }
}