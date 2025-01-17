import { create } from "zustand"
import { devtools, persist, createJSONStorage } from 'zustand/middleware' //importamos las devtools para el navegador y ademas el persist  que nos permite basicamente usar el LocalStorage como siempre. la ultima es para poder definir en que storage quieres guardarlo
import { Patient, PatientDraft } from "./types"
import { v4 as uuidv4 } from "uuid"

type PatientState = {
    patients: Patient[]
    activeId: Patient['id'] // para editar un paciente
    addPatient: (data: PatientDraft) => void
    deletePatient: (id: Patient['id']) => void
    getPatientById: (id: Patient['id']) => void
    updatePatient: (data:PatientDraft) => void
}

const createPatient = (patient: PatientDraft): Patient => {
    return { ...patient, id: uuidv4() }
}

// aqui va tanto el state, como las funciones que modifican el state
export const usePatientStore = create<PatientState>()(
    devtools(
        persist((set) => ({ // set y get para obtener o modificar el estado
        patients: [],
        activeId: '',
        addPatient: (data) => {
            set((state) => ({ // es como el return de useReducer
                patients: [...state.patients, createPatient(data)] //le generamos un id y lo añadimos al array de pacientes (recuerda que un paciente tiene que tener id)
            }))
        },
        deletePatient: (id) => {
            set((state) => ({
                patients: state.patients.filter(patient => patient.id !== id)
            }))
        },
        getPatientById(id) {
            set(() => ({
                activeId: id
            }))
        },
        updatePatient(data) {
            set((state) => ({
                patients: state.patients.map(patient => patient.id === state.activeId ? {id: state.activeId, ...data} : patient),
                activeId: '' //reseteamos el activeId
            }))
        },
    }),{ //aqui van las opciones de persistencia
        name:'patient-storage', //nombre del almacenamiento 
        storage: createJSONStorage(() => sessionStorage) //para almacenar en la sesion, para local, no hace falta esta linea pues es el default
    })
    ))