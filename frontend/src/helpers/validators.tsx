import {
    ACCEPT_EXTENSIONS_IMAGE, GOOD_UUID,
    MAX_SIZE_IMAGE_MB,
    MIN_AGE_TO_SIGN_UP,
    REGEX_EMAIL,
    REGEX_LOGIN,
    REGEX_PASSWORD
} from './ConstType';
import {Gender} from '../types/UserType';
import {checkDataUser} from './api/user';
import {convertToFormData} from './api/api';

export const validateLogin = (login: string): boolean => {
    if (login) {
        if (login.length < 6 || login.length > 30) {
            let error: Error = new Error('Login powinien mieć od 6 do 30 znaków.');
            error.name = 'login';
            throw error;
        } else if (!REGEX_LOGIN.test(login)) {
            let error: Error = new Error('Login może się składać tylko ze znaków alfanumerycznych.');
            error.name = 'login';
            throw error;
        }
        return true
    } else {
        let error: Error = new Error('To pole jest wymagane.');
        error.name = 'login';
        throw error;
    }
};

export const validateEmail = (email?: string): boolean => {
    if (email) {
        if (email.length < 5 || !REGEX_EMAIL.test(email)) {
            let error: Error = new Error('Podaj poprawny adres e-mail.');
            error.name = 'email';
            throw error;
        } else if (email.length > 254) {
            let error: Error = new Error('Upewnij się, że to pole ma nie więcej niż 254 znaków.');
            error.name = 'email';
            throw error;
        }
        return true;
    }else {
        let error: Error = new Error('To pole jest wymagane.');
        error.name = 'email';
        throw error;
    }
};

export const checkDataIsAvailable = (key: string, value: string) => {
    let data = convertToFormData({'key': key, 'value': value});
    return checkDataUser(data).then(async (r) => {
        let response = r as Response;
        if(response.status === 204) {
            return true;
        }else if(response.status === 422) {
            let e = await response.json();
            for(const oneError in e) {
                let error: Error = new Error(e[oneError]);
                error.name = oneError;
                throw error;
            }
        }else {
            let error: Error = new Error('Serwis niedostępny.');
            error.name = 'non_field_errors';
            throw error;
        }
        return false;
    }, (e) => {
        let error: Error = new Error('Serwis niedostępny.');
        error.name = 'non_field_errors';
        throw error;
    });
};

export const validatePassword = (password: string): boolean => {
    if (password) {
        if(password.length < 8) {
            let error: Error = new Error('Hasło powinno zawierać minimum 8 znaków.');
            error.name = 'password';
            throw error;
        }else if(password.length > 128) {
            let error: Error = new Error('Hasło nie może zawierać więcej niż 128 znaków.');
            error.name = 'password';
            throw error;
        }else if (!REGEX_PASSWORD.test(password)) {
            let error: Error = new Error('Hasło musi zawierać cyfrę, znak specjalny !@$%^&*-_,.?;, małą i dużą litere.');
            error.name = 'password';
            throw error;
        }
        return true;
    }else {
        let error: Error = new Error('To pole jest wymagane.');
        error.name = 'password';
        throw error;
    }
};

export const validateRepeatPassword = (password: string, repeat_password: string): boolean => {
    if(repeat_password) {
        if(password !== repeat_password) {
            let error: Error = new Error('Hasła nie identyczne.');
            error.name = 'repeat_password';
            throw error;
        }
        return true;
    }else {
        let error: Error = new Error('To pole jest wymagane.');
        error.name = 'repeat_password';
        throw error;
    }
};

export const validateName = (name?: string): boolean => {
    if(name && name.length > 250) {
        let error: Error = new Error('Imię może mieć max 250 znaków.');
        error.name = 'name';
        throw error;
    }
    return true;
};

export const validateSurname = (surname?: string): boolean => {
    if(surname && surname.length > 250) {
        let error: Error = new Error('Nazwisko może mieć max 250 znaków.');
        error.name = 'surname';
        throw error;
    }
    return true;
};

export const validateGender = (gender?: number): boolean => {
    if(gender && !Gender.some(x => x.id == gender)) {
        let error: Error = new Error('Wybierz płeć z pośród podanych.');
        error.name = 'gender';
        throw error;
    }
    return true;
};

const validateDate = (date: string): boolean => {
    return !isNaN(new Date(date).getTime());
};

export const validateBirthDate = (date: string): boolean => {
    if(!validateDate(date)) {
        let error: Error = new Error('Podaj date urodzenia w formacie YYYY-MM-DD.');
        error.name = 'birth_date';
        throw error;
    }

    let tmpDate = new Date();
    tmpDate.setFullYear(tmpDate.getFullYear() - MIN_AGE_TO_SIGN_UP);
    if(new Date(date) > tmpDate) {
        let error: Error = new Error('Aby założyć konto należy mieć min 13 lat.');
        error.name = 'birth_date';
        throw error;
    }
    return true;
};

export const validateStatute = (status_statute: boolean): boolean => {
    if(status_statute) {
        return true;
    }else {
        let error: Error = new Error('Akceptacja regulaminu jest obowiązkowa.');
        error.name = 'accept_statute';
        throw error;
    }
};

export const validateFile = (file: File): boolean => {
    const max_size_image = MAX_SIZE_IMAGE_MB * 1024**2

    if(file.size > max_size_image) {
        let error: Error = new Error(`Maksymlany rozmiar pliku to ${MAX_SIZE_IMAGE_MB} MB.`);
        error.name = 'avatar';
        throw error;
    }
    if(!ACCEPT_EXTENSIONS_IMAGE.includes(file.type)) {
        let error: Error = new Error('Akceptowalne są jedynie pliki graficzne.');
        error.name = 'avatar';
        throw error;
    }

    return true;
};

export const validateUUID = (uuid: string): boolean => {
    return GOOD_UUID.test(uuid);
};
