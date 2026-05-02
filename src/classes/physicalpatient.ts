import { Patient } from './patient'

export abstract class PhysicalPatient extends Patient {
    constructor(name: string) {
        super(name)
    }
}

