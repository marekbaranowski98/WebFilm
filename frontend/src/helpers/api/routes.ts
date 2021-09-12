const SERVER_URL = 'http://127.0.0.1:8000/api/';

export const userURL = (): string => {
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
