import * as Phaser from 'phaser'

export abstract class HospitalStaff {
  name: string
  isIdle: boolean = true
  sprite!: Phaser.Physics.Arcade.Sprite

  constructor(name: string) {
    this.name = name
  }

  abstract treat(patient: any): void
  abstract assess(patient: any): void
}
