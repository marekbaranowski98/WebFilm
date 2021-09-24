const SERVER_URL = 'http://127.0.0.1:8000/api/';

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

const photosURL = (): string => {
    return `${SERVER_URL}photos/`;
};

export const getBlobFromBucketURL = (bucket: string, blob: string): string => {
    return `${photosURL()}${bucket}/${blob}/`;
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
