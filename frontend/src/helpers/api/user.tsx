import {post, get, patch, convertToFormData, delete_api} from './api';
import {
    loginURL,
    loggedUserURL,
    logoutUserURL,
    validateDataUserURL,
    registerUserURL,
    activeUserURL,
    requestResetPasswordURL, resetPasswordURL, userLoginURL, editUserURL, userClearAvatarURL, deleteUserURL
} from './routes';
import {
    ResetPasswordObject,
    SendEmailResetPasswordEmail,
    UserDeleteForm,
    UserLoginForm,
    UserRegisterForm
} from '../../types/UserType';

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
    return patch(editUserURL(), convertToFormData(body), true);
};

export const deleteAvatar = async () => {
    return delete_api(userClearAvatarURL(), convertToFormData({}), true);
};

export const deleteUser = async (body: UserDeleteForm) => {
    return delete_api(deleteUserURL(), convertToFormData(body), true);
};
