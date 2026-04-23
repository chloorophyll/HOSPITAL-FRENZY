import { HospitalStaff } from './hospitalstaff'

export abstract class Nurse extends HospitalStaff {
    constructor(name: string) {
        super(name)
    }
}
