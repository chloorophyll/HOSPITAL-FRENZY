import * as Phaser from 'phaser'
import { TriageNurse } from './classes/triagenurse'
import { GeneralPractitioner } from './classes/generalpractitioner'
import { Fever } from './classes/fever'

class GameScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private activeStaff!: TriageNurse | GeneralPractitioner
  private triageNurse!: TriageNurse
  private doctor!: GeneralPractitioner
  private staffLabel!: Phaser.GameObjects.Text
  private patient!: Fever
  private timerBar!: Phaser.GameObjects.Rectangle
  private timerBarBg!: Phaser.GameObjects.Rectangle
  private timerValue: number = 100
  private patientLabel!: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'GameScene' })
  }

  preload() {
    this.load.image('nurse', 'assets/player1.png')
    this.load.image('doctor', 'assets/player1.png')
    this.load.image('patient', 'assets/player1.png')
  }

  create() {
    this.cameras.main.setBackgroundColor('#1a1a2e')

    this.triageNurse = new TriageNurse('Nurse Anne')
    this.triageNurse.sprite = this.physics.add.sprite(200, 300, 'nurse')
    this.triageNurse.sprite.setScale(3)
    this.triageNurse.sprite.setTint(0x00ffff)

    this.doctor = new GeneralPractitioner('Dr. Ramos')
    this.doctor.sprite = this.physics.add.sprite(600, 300, 'doctor')
    this.doctor.sprite.setScale(3)
    this.doctor.sprite.setTint(0xff9900)

    this.add.text(175, 265, 'Nurse Anne', { fontSize: '12px', color: '#00ffff' })
    this.add.text(575, 265, 'Dr. Ramos', { fontSize: '12px', color: '#ff9900' })
    this.patient = new Fever('Pitchie')
    this.patient.sprite = this.physics.add.sprite(-50, 400, 'patient')
    this.patient.sprite.setScale(3)
    this.patient.sprite.setTint(0xff4444)
    this.patient.triage()

    this.patientLabel = this.add.text(0, 370, 'Pedro (Fever)', {
      fontSize: '12px',
      color: '#ff4444'
    })

    this.timerBarBg = this.add.rectangle(0, 360, 60, 8, 0x555555)

    this.timerBar = this.add.rectangle(0, 360, 60, 8, 0x00ff00)

    this.staffLabel = this.add.text(10, 10,
      'CONTROLLING: Nurse Anne (S to switch)',
      { fontSize: '14px', color: '#ffff00' }
    )

    this.activeStaff = this.triageNurse
    this.triageNurse.isIdle = false


    this.input.keyboard!.on('keydown-S', () => {
      if (this.activeStaff === this.triageNurse) {
        this.activeStaff = this.doctor
        this.triageNurse.isIdle = true
        this.doctor.isIdle = false
        this.staffLabel.setText('CONTROLLING: Dr. Ramos (S to switch)')
      } else {
        this.activeStaff = this.triageNurse
        this.doctor.isIdle = true
        this.triageNurse.isIdle = false
        this.staffLabel.setText('CONTROLLING: Nurse Anne (S to switch)')
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

    const patientBody = this.patient.sprite.body as Phaser.Physics.Arcade.Body
    if (this.patient.sprite.x < 400) {
      patientBody.setVelocityX(60) 
    } else {
      patientBody.setVelocityX(0) 
    }
    
    this.timerBarBg.setPosition(this.patient.sprite.x, this.patient.sprite.y - 40)
    this.timerBar.setPosition(this.patient.sprite.x, this.patient.sprite.y - 40)
    this.patientLabel.setPosition(this.patient.sprite.x - 40, this.patient.sprite.y - 55)


    if (!this.patient.isBeingTreated) {
      this.timerValue -= 0.05
      const width = (this.timerValue / 100) * 60
      this.timerBar.setSize(width, 8)

      if (this.timerValue < 30) {
        this.timerBar.setFillStyle(0xff0000) 
      } else if (this.timerValue < 60) {
        this.timerBar.setFillStyle(0xffaa00)
      }
    }

    const dist = Phaser.Math.Distance.Between(
      this.triageNurse.sprite.x,
      this.triageNurse.sprite.y,
      this.patient.sprite.x,
      this.patient.sprite.y
    )

    if (dist < 60 && !this.patient.isBeingTreated) {
      this.patient.isBeingTreated = true
      this.triageNurse.treat(this.patient)
      this.timerBar.setFillStyle(0x00ff00)
      this.staffLabel.setText('Patient treated! Good job! ✓')
    }
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