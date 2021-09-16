export interface UserLoginForm {
    email: string,
    password: string,
    remember_me?: boolean,
}

export interface UserObject {
    user_id: number,
    login: string,
    name: string,
    avatarURL: string,
}

export interface UserRegisterForm {
    login: string,
    email: string,
    password: string,
    repeat_password: string,
    name?: string,
    surname?: string,
    gender?: number,
    birth_date: string,
    accept_statute: boolean
}

export const Gender: {id: number, value: string}[] = [
    {
        id: 0,
        value: 'Nieokreślona',
    },
    {
        id: 1,
        value: 'Kobieta',
    },
    {
        id: 2,
        value: 'Mężczyzna',
    },
];
