export interface UserLoginForm {
    email: string,
    password: string,
    remember_me?: boolean,
}

export interface UserObject {
    user_id: number,
    login: string,
    name: string,
    avatar: string,
}
