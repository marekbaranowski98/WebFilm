export interface UserLoginForm {
    email: string,
    password: string,
}

export interface UserLoginError extends Partial<UserLoginForm> {
    non_field_errors?: string,
}
