import * as Phaser from 'phaser'
import {
  ENEMY_SPEED,
  FIRE_COOLDOWN,
  GAME_HEIGHT,
  GAME_WIDTH,
  PLAYER_SPEED,
  PROJECTILE_SPEED,
} from '../config/gameConfig.js'

export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  create() {
    this.score = 0
    this.lastFiredAt = 0
    this.isGameOver = false

    this.createTextures()
    this.createWorld()
    this.createPlayer()
    this.createGroups()
    this.createControls()
    this.createHud()

    this.physics.add.overlap(
      this.projectiles,
      this.enemies,
      this.handleProjectileEnemy,
      undefined,
      this,
    )
    this.physics.add.overlap(this.player, this.enemies, this.handlePlayerEnemy, undefined, this)

    this.enemyTimer = this.time.addEvent({
      delay: 900,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    })
  }

  update(time) {
    if (this.isGameOver) {
      return
    }

    this.updatePlayerMovement()

    if (this.fireKey.isDown && time > this.lastFiredAt + FIRE_COOLDOWN) {
      this.fireProjectile(time)
    }

    this.cleanupOffscreenObjects()
  }

  createTextures() {
    const graphics = this.add.graphics()

    graphics.fillStyle(0x8bd3ff, 1)
    graphics.fillRoundedRect(0, 0, 52, 36, 9)
    graphics.fillStyle(0xffd166, 1)
    graphics.fillTriangle(43, 5, 43, 31, 68, 18)
    graphics.lineStyle(4, 0x243447, 1)
    graphics.strokeRoundedRect(0, 0, 52, 36, 9)
    graphics.generateTexture('player-placeholder', 72, 40)
    graphics.clear()

    graphics.fillStyle(0xffd166, 1)
    graphics.fillRoundedRect(0, 0, 20, 8, 4)
    graphics.lineStyle(2, 0x243447, 1)
    graphics.strokeRoundedRect(0, 0, 20, 8, 4)
    graphics.generateTexture('projectile-placeholder', 22, 10)
    graphics.clear()

    graphics.fillStyle(0xff8fab, 1)
    graphics.fillRoundedRect(0, 0, 42, 42, 10)
    graphics.fillStyle(0xffffff, 1)
    graphics.fillCircle(13, 15, 4)
    graphics.fillCircle(29, 15, 4)
    graphics.lineStyle(4, 0x243447, 1)
    graphics.strokeRoundedRect(0, 0, 42, 42, 10)
    graphics.generateTexture('enemy-placeholder', 46, 46)
    graphics.destroy()
  }

  createWorld() {
    this.cameras.main.setBackgroundColor('#f7fbff')

    for (let x = 70; x < GAME_WIDTH; x += 120) {
      this.add.circle(x, 96, 3, 0xc7d2fe, 0.85)
      this.add.circle(x + 52, 250, 2, 0xb8f7d4, 0.85)
      this.add.circle(x + 24, 430, 3, 0xffd6e0, 0.85)
    }

    this.add.rectangle(GAME_WIDTH / 2, 44, GAME_WIDTH, 4, 0xd7ebff)
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - 44, GAME_WIDTH, 4, 0xd7ebff)
  }

  createPlayer() {
    this.player = this.physics.add.sprite(110, GAME_HEIGHT / 2, 'player-placeholder')
    this.player.setCollideWorldBounds(true)
    this.player.body.setSize(58, 30).setOffset(4, 5)
  }

  createGroups() {
    this.projectiles = this.physics.add.group({
      allowGravity: false,
    })
    this.enemies = this.physics.add.group({
      allowGravity: false,
    })
  }

  createControls() {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    })
    this.fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
  }

  createHud() {
    this.scoreText = this.add.text(24, 20, 'Score: 0', {
      fontFamily: 'system-ui, Segoe UI, sans-serif',
      fontSize: '24px',
      color: '#243447',
    })

    this.add.text(GAME_WIDTH - 24, 24, 'Move: WASD / Arrows   Fire: Space', {
      fontFamily: 'system-ui, Segoe UI, sans-serif',
      fontSize: '17px',
      color: '#56677d',
    }).setOrigin(1, 0)
  }

  updatePlayerMovement() {
    const left = this.cursors.left.isDown || this.keys.left.isDown
    const right = this.cursors.right.isDown || this.keys.right.isDown
    const up = this.cursors.up.isDown || this.keys.up.isDown
    const down = this.cursors.down.isDown || this.keys.down.isDown

    const velocity = new Phaser.Math.Vector2(
      (right ? 1 : 0) - (left ? 1 : 0),
      (down ? 1 : 0) - (up ? 1 : 0),
    )

    if (velocity.lengthSq() > 0) {
      velocity.normalize().scale(PLAYER_SPEED)
    }

    this.player.setVelocity(velocity.x, velocity.y)
  }

  fireProjectile(time) {
    const projectile = this.projectiles.create(this.player.x + 45, this.player.y, 'projectile-placeholder')
    projectile.setVelocityX(PROJECTILE_SPEED)
    projectile.body.setSize(20, 8)
    this.lastFiredAt = time
  }

  spawnEnemy() {
    const y = Phaser.Math.Between(86, GAME_HEIGHT - 86)
    const enemy = this.enemies.create(GAME_WIDTH + 34, y, 'enemy-placeholder')
    enemy.setVelocityX(-(ENEMY_SPEED + Math.min(this.score * 3, 130)))
    enemy.body.setSize(38, 38).setOffset(4, 4)
  }

  handleProjectileEnemy(projectile, enemy) {
    projectile.destroy()
    enemy.destroy()
    this.score += 10
    this.scoreText.setText(`Score: ${this.score}`)
  }

  handlePlayerEnemy() {
    this.endGame()
  }

  cleanupOffscreenObjects() {
    this.projectiles.children.each((projectile) => {
      if (projectile.active && projectile.x > GAME_WIDTH + 40) {
        projectile.destroy()
      }
    })

    this.enemies.children.each((enemy) => {
      if (enemy.active && enemy.x < -50) {
        enemy.destroy()
      }
    })
  }

  endGame() {
    if (this.isGameOver) {
      return
    }

    this.isGameOver = true
    this.enemyTimer.remove(false)
    this.physics.pause()
    this.time.delayedCall(250, () => {
      this.scene.start('GameOverScene', { score: this.score })
    })
  }
}
