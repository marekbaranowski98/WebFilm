import {post} from './api';
import {loginURL} from './routes';
import {UserLoginForm} from '../../types/UserType';

export const loginUser = async (data: UserLoginForm) => {
    const tmpData = data as unknown as Record<string, string>
    return post(loginURL(), tmpData)
}
