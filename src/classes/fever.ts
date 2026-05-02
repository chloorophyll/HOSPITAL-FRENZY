import { PhysicalPatient } from './physicalpatient'

export class Fever extends PhysicalPatient {
    constructor(name: string) {
        super(name)
    }

    triage(): void {
        console.log(`${this.name} is being treated for fever.`)
    }

    interact(): void {
        console.log(`${this.name} says: I feel very warm....`)
    }

}


