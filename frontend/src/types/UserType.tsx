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
    role: number,
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
    avatar?: FileList,
    accept_statute: boolean,
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

export interface SendEmailResetPasswordEmail {
    email: string
}

export interface ResetPasswordObject {
    password: string,
    repeat_password: string,
}

export enum UserRole {
    AnonymousUser = 0,
    User = 1,
    Moderator = 5,
    Admin = 10
}
