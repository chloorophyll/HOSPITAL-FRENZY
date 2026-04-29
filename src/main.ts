import * as Phaser from 'phaser'
import { TriageNurse } from './classes/triagenurse'
import { GeneralPractitioner } from './classes/generalpractitioner'

class GameScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private activeStaff!: TriageNurse | GeneralPractitioner
  private triageNurse!: TriageNurse
  private doctor!: GeneralPractitioner
  private staffLabel!: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'GameScene' })
  }

  preload() {
    this.load.image('nurse', 'assets/player1.png')
    this.load.image('doctor', 'assets/player1.png')
  }

  create() {
    this.cameras.main.setBackgroundColor('#1a1a2e')

    
    this.triageNurse = new TriageNurse('Nurse Anne')
    this.triageNurse.sprite = this.physics.add.sprite(200, 300, 'nurse')
    this.triageNurse.sprite.setScale(3)
    this.triageNurse.sprite.setTint(0x00ffff) // cyan = nurse

    this.doctor = new GeneralPractitioner('Dr. Ramos')
    this.doctor.sprite = this.physics.add.sprite(600, 300, 'doctor')
    this.doctor.sprite.setScale(3)
    this.doctor.sprite.setTint(0xff9900) // orange = doctor

    this.add.text(175, 265, 'Nurse Anne', { fontSize: '12px', color: '#00ffff' })
    this.add.text(575, 265, 'Dr. Ramos', { fontSize: '12px', color: '#ff9900' })

    this.staffLabel = this.add.text(10, 10,
      'CONTROLLING: Nurse Anne (press S to switch)',
      { fontSize: '14px', color: '#ffff00' }
    )

    this.activeStaff = this.triageNurse
    this.triageNurse.isIdle = false

    this.input.keyboard!.on('keydown-S', () => {
      if (this.activeStaff === this.triageNurse) {
        this.activeStaff = this.doctor
        this.triageNurse.isIdle = true
        this.doctor.isIdle = false
        this.staffLabel.setText('CONTROLLING: Dr. Ramos (press S to switch)')
      } else {
        this.activeStaff = this.triageNurse
        this.doctor.isIdle = true
        this.triageNurse.isIdle = false
        this.staffLabel.setText('CONTROLLING: Nurse Anne (press S to switch)')
      }
    })

    this.cursors = this.input.keyboard!.createCursorKeys()
  }

  update() {
    const body = this.activeStaff.sprite.body as Phaser.Physics.Arcade.Body
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