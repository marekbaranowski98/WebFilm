import {REGEX_EMAIL} from './ConstType';

export const validateEmail = (email?: string): boolean => {
    if (email) {
        if (email.length < 5 || !REGEX_EMAIL.test(email)) {
            throw new Error('Podaj poprawny adres e-mail.')
        } else if (email.length > 254) {
            throw new Error('Upewnij się, że to pole ma nie więcej niż 254 znaków.')
        }

        return true;
    }else {
        throw new Error('To pole jest wymagane');
    }

}