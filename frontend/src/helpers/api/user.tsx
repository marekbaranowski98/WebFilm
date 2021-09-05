import {post, get} from './api';
import {loginURL, loggedUserURL} from './routes';
import {UserLoginForm} from '../../types/UserType';

export const loginUser = async (data: UserLoginForm) => {
    const tmpData = data as unknown as Record<string, string>
    return post(loginURL(), tmpData);
}

export const getLoggedUser = async () => {
    return get(loggedUserURL(), true);
}
