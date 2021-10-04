import {post, get, patch, convertToFormData} from './api';
import {
    loginURL,
    loggedUserURL,
    logoutUserURL,
    validateDataUserURL,
    registerUserURL,
    activeUserURL,
    requestResetPasswordURL, resetPasswordURL, userLoginURL
} from './routes';
import {ResetPasswordObject, SendEmailResetPasswordEmail, UserLoginForm, UserRegisterForm} from '../../types/UserType';

export const loginUser = async (data: UserLoginForm) => {
    return post(loginURL(), convertToFormData(data));
};

export const getLoggedUser = async () => {
    return get(loggedUserURL(), true);
};

export const getLogoutUser = async () => {
    return get(logoutUserURL(), true);
};

export const checkDataUser = async (body: FormData, isLogged: boolean) => {
    return post(validateDataUserURL(), body, isLogged);
};

export const registerUser = async (data: UserRegisterForm) => {
    return post(registerUserURL(), convertToFormData(data), false);
};

export const activeUser = async (uuid: string) => {
    return get(activeUserURL(uuid), false);
};

export const requestResetPassword = async (body: SendEmailResetPasswordEmail) => {
    return post(requestResetPasswordURL(), convertToFormData(body), false);
};

export const resetPassword = async (key:string, body: ResetPasswordObject) => {
    return patch(resetPasswordURL(key), convertToFormData(body), false);
};

export const getUser = async (login: string) => {
    return get(userLoginURL(login), false);
};

export const editUser = async (body: object) => {
    return patch(loggedUserURL(), convertToFormData(body), true);
};
