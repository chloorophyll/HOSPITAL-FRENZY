import * as Phaser from 'phaser'

class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

  constructor() {
    super({ key: 'GameScene' })
  }

  preload() {
    this.load.image('player', 'assets/player1.png')
  }

  create() {
    this.cameras.main.setBackgroundColor('#1a1a2e')

    this.player = this.physics.add.sprite(400, 300, 'player')
    this.player.setScale(2)

    this.cursors = this.input.keyboard!.createCursorKeys()

    this.add.text(10, 10, 'Arrow keys to move!', {
      fontSize: '16px',
      color: '#ffffff'
    })
  }

  update() {
    const body = this.player.body as Phaser.Physics.Arcade.Body
    body.setVelocity(0)

    if (this.cursors.left.isDown)  body.setVelocityX(-200)
    if (this.cursors.right.isDown) body.setVelocityX(200)
    if (this.cursors.up.isDown)    body.setVelocityY(-200)
    if (this.cursors.down.isDown)  body.setVelocityY(200)
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: [GameScene]
})