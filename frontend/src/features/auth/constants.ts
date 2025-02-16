export const REQUIRED_ERROR_TYPE = 'required'
export const STEP_KEY = 'step'

export const INITIAL_USER_DATA = {
    dateOfBirth: '',
    firstName: undefined,
    lastName: undefined,
    gender: '',
    preferences: [],
    checked: false,
    topics: [],
    mobileNumber: '',
    phoneNumber: '',
    language: '',
}

export const GENDER_VALUES = {
    female: 'female',
    male: 'male',
    pns: 'pns',
}

export const initialDate = {
    day: '',
    month: '',
    year: '',
}

export enum USER_NAMES {
    fName = 'firstName',
    lName = 'lastName',
}

export const ERRORS_TEXT: Record<string, string> = {
    firstName: 'Vorname ist Fehlerhaft',
    lastName: 'Nachname ist Fehlerhaft'
}