import {REGEX_EMAIL} from './ConstType';

export const validateEmail = (email?: string): boolean => {
    if (email) {
        if (email.length < 5 || !REGEX_EMAIL.test(email)) {
            let error: Error = Error('Podaj poprawny adres e-mail.');
            error.name = 'email';
            throw error;
        } else if (email.length > 254) {
            let error: Error = Error('Upewnij się, że to pole ma nie więcej niż 254 znaków.');
            error.name = 'email';
            throw error;
        }

        return true;
    }else {
        let error: Error = Error('To pole jest wymagane.');
        error.name = 'email';
        throw error;
    }
}
