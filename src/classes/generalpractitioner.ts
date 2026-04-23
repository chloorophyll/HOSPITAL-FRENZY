import { Doctor } from './doctor'

export class GeneralPractitioner extends Doctor {
    constructor(name: string) {
        super(name)
    }

    treat(patient: any): void {
        console.log(`${this.name} is treating patient: ${patient.name}`)
    }   

    assess(patient: any): void {
        console.log(`${this.name} is assessing patient: ${patient.name}`)
    }
}
