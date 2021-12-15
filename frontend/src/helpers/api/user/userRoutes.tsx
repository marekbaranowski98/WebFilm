import {SERVER_URL} from '../routes';

const userURL = (): string => {
    return `${SERVER_URL}users/`;
};

export const loginURL = (): string => {
    return `${userURL()}login/`;
};

export const loggedUserURL = (): string => {
    return `${userURL()}me/`;
};

export const logoutUserURL = (): string => {
    return `${userURL()}me/logout/`;
};

export const validateDataUserURL = (): string => {
    return `${userURL()}me/validator-unique/`;
};

export const registerUserURL = (): string => {
    return `${userURL()}`;
};

export const activeUserURL = (uuid: string): string => {
    return `${userURL()}act/${uuid}/`;
};

export const requestResetPasswordURL = (): string => {
    return `${userURL()}me/reset-password/`;
};

export const resetPasswordURL = (key: string): string => {
    return `${requestResetPasswordURL()}${key}/`;
};

export const userLoginURL = (login: string): string => {
    return `${userURL()}${login}/`;
};

export const userClearAvatarURL = (): string => {
    return `${loggedUserURL()}delete-avatar/`;
};

export const editUserURL = (): string => {
    return `${userURL()}me/`;
};

export const deleteUserURL = (): string => {
    return `${userURL()}me/`;
};
