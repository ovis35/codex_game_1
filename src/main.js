import * as Phaser from 'phaser'
import { GAME_HEIGHT, GAME_WIDTH } from './config/gameConfig.js'
import { GameOverScene } from './scenes/GameOverScene.js'
import { GameScene } from './scenes/GameScene.js'
import { StartScene } from './scenes/StartScene.js'
import './style.css'

document.querySelector('#app').innerHTML = '<div id="game"></div>'

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#f7fbff',
  pixelArt: false,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scene: [StartScene, GameScene, GameOverScene],
}

new Phaser.Game(config)
