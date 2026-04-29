import * as Phaser from 'phaser'
import { GAME_WIDTH } from '../config/gameConfig.js'

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene')
  }

  init(data) {
    this.finalScore = data.score || 0
  }

  create() {
    this.cameras.main.setBackgroundColor('#fff5f8')

    this.add
      .text(GAME_WIDTH / 2, 166, 'Game Over', {
        fontFamily: 'system-ui, Segoe UI, sans-serif',
        fontSize: '58px',
        color: '#243447',
      })
      .setOrigin(0.5)

    this.add
      .text(GAME_WIDTH / 2, 252, `Score: ${this.finalScore}`, {
        fontFamily: 'system-ui, Segoe UI, sans-serif',
        fontSize: '30px',
        color: '#56677d',
      })
      .setOrigin(0.5)

    this.add
      .text(GAME_WIDTH / 2, 382, 'Press Space or Enter to restart', {
        fontFamily: 'system-ui, Segoe UI, sans-serif',
        fontSize: '25px',
        color: '#243447',
      })
      .setOrigin(0.5)

    this.input.keyboard.once('keydown-SPACE', () => this.scene.start('GameScene'))
    this.input.keyboard.once('keydown-ENTER', () => this.scene.start('GameScene'))
  }
}
