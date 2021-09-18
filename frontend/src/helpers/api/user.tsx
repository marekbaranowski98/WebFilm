import {post, get, convertToFormData} from './api';
import {loginURL, loggedUserURL, logoutUserURL, validateDataUserURL, registerUserURL} from './routes';
import {UserLoginForm, UserRegisterForm} from '../../types/UserType';

export const loginUser = async (data: UserLoginForm) => {
    return post(loginURL(), convertToFormData(data));
};

export const getLoggedUser = async () => {
    return get(loggedUserURL(), true);
};

export const getLogoutUser = async () => {
    return get(logoutUserURL(), true);
};

export const checkDataUser = async (body: FormData) => {
    return post(validateDataUserURL(), body, false);
};

export const registerUser = async (data: UserRegisterForm) => {
    return post(registerUserURL(), convertToFormData(data), false);
};
