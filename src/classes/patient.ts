import * as Phaser from 'phaser'

export abstract class Patient {
    name: string
    sprite!: Phaser.Physics.Arcade.Sprite
    isIdle: boolean = false
    
    constructor(name: string) {
        this.name = name
    }

    abstract triage(): void
    abstract interact(): void
}