import { HospitalStaff } from './hospitalstaff'

export abstract class Doctor extends HospitalStaff {
    constructor(name: string) {
        super(name)
    }
}