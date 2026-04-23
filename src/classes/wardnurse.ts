import { Nurse } from './nurse'

export class WardNurse extends Nurse {
    constructor(name: string) {
        super(name)
    }

    treat(patient: any): void {
        console.log(`${this.name} is checking in patient: ${patient.name}`)
    }

    assess(patient: any): void {
        console.log(`${this.name} is assessing patient: ${patient.name}`)
    }   
}
