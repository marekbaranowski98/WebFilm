const SERVER_URL = 'http://127.0.0.1:8000/api/';

export const userURL = () => {
    return `${SERVER_URL}users/`;
};

export const loginURL = () => {
    return `${userURL()}login/`;
};

export const loggedUserURL = () => {
    return `${userURL()}me/`
};
