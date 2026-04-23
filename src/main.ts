import { TriageNurse } from './classes/triagenurse'
import { WardNurse } from './classes/wardnurse'
import { GeneralPractitioner } from './classes/generalpractitioner'
import { ERDoctor } from './classes/ERdoctor'

const triage = new TriageNurse('Nurse Joy')
const ward = new WardNurse('Nurse Ana')
const gp = new GeneralPractitioner('Dr. Santos')
const er = new ERDoctor('Dr. Reyes')

const testPatient = { name: 'Juan dela Cruz' }

triage.treat(testPatient)
triage.assess(testPatient)
ward.treat(testPatient)
gp.treat(testPatient)
er.treat(testPatient)