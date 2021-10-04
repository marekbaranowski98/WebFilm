export interface UserLoginForm {
    email: string,
    password: string,
    remember_me?: boolean,
    recaptcha: string,
}

export interface UserObject {
    id: number,
    login: string,
    email: string,
    name: string,
    surname: string,
    gender: number,
    birth_date: Date,
    avatarURL?: string,
    avatar: string,
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
    recaptcha: string,
}

export interface UserNameSurnameForm {
    name?: string,
    surname?: string,
}

export interface UserBirthDateForm {
    birth_date: string,
}

export interface UserGenderForm {
    gender?: number,
}

export interface UserEmailForm {
    email: string,
    current_password: string,
}

export interface UserNickForm {
    login: string,
    current_password: string,
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
    email: string,
    recaptcha: string,
}

export interface ResetPasswordObject {
    current_password?: string,
    password: string,
    repeat_password: string,
    recaptcha: string,
}

export enum UserRole {
    AnonymousUser = 0,
    User = 1,
    Moderator = 5,
    Admin = 10
}
