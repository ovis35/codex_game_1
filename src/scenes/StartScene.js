import * as Phaser from 'phaser'
import { GAME_WIDTH } from '../config/gameConfig.js'

export class StartScene extends Phaser.Scene {
  constructor() {
    super('StartScene')
  }

  create() {
    this.cameras.main.setBackgroundColor('#f7fbff')

    this.add
      .text(GAME_WIDTH / 2, 150, 'Tiny Star Pop', {
        fontFamily: 'system-ui, Segoe UI, sans-serif',
        fontSize: '54px',
        color: '#243447',
      })
      .setOrigin(0.5)

    this.add
      .text(GAME_WIDTH / 2, 232, 'White-box horizontal shooter prototype', {
        fontFamily: 'system-ui, Segoe UI, sans-serif',
        fontSize: '22px',
        color: '#56677d',
      })
      .setOrigin(0.5)

    this.add.rectangle(190, 340, 54, 38, 0x8bd3ff).setStrokeStyle(4, 0x243447)
    this.add.triangle(226, 340, 226, 318, 226, 362, 265, 340, 0xffd166)
    this.add.rectangle(650, 340, 46, 46, 0xff8fab).setStrokeStyle(4, 0x243447)
    this.add.circle(708, 340, 10, 0xffd166)
    this.add.circle(748, 340, 7, 0xffd166)

    this.add
      .text(GAME_WIDTH / 2, 432, 'Press Space or Enter to start', {
        fontFamily: 'system-ui, Segoe UI, sans-serif',
        fontSize: '26px',
        color: '#243447',
      })
      .setOrigin(0.5)

    this.input.keyboard.once('keydown-SPACE', () => this.scene.start('GameScene'))
    this.input.keyboard.once('keydown-ENTER', () => this.scene.start('GameScene'))
  }
}
