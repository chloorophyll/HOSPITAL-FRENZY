export abstract class HospitalStaff {
    name: string
    isIdle: boolean = true

    constructor(name: string) {
        this.name = name
    }

    abstract treat(patient: any): void
    abstract assess(patient: any): void
}
