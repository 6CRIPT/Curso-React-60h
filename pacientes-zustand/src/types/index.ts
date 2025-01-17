export type Patient = {
    id: string,
    name: string,
    caretaker: string,
    email: string,
    date: Date,
    symptoms: string
}

export type PatientDraft = Omit<Patient, 'id'>  //para cuando no tenemos id