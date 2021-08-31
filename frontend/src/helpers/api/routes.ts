const SERVER_URL = 'http://localhost:8000/api/';

export const userURL = () => {
    return `${SERVER_URL}users/`;
};

export const loginURL = () => {
    return `${userURL()}login/`;
}
