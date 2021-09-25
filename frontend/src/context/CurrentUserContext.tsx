import React, {useState} from 'react';
import {UserObject, UserRole} from '../types/UserType';
import {getLoggedUser} from '../helpers/api/user';
import {checkExistCookie} from '../helpers/api/api';

interface CurrentUserContextProps {
    user: UserObject | null,
    checkIsUserLogged: () => Promise<UserRole>,
    logoutUser: () => void,
}

export const CurrentUserContext = React.createContext<CurrentUserContextProps | null>(null);

interface CurrentUserProviderProps {
    children: JSX.Element[],
}

export const CurrentUserProvider: React.FC<CurrentUserProviderProps> = ({children}) => {
    const [user, setUser] = useState<UserObject | null>(null);

    const checkIsUserLogged = async (): Promise<UserRole> => {
        return new Promise((resolve, reject) => {
            if (user == null) {
                if (checkExistCookie('token')) {
                    getLoggedUser().then((res) => {
                        let r = (res as Response);
                        if (r.status === 200) {
                            r.json().then(u => {
                                setUser(u);
                                resolve(u.role);
                            });
                        } else {
                            reject(UserRole.AnonymousUser);
                        }
                    }, (e) => {
                        reject(UserRole.AnonymousUser);
                    });
                } else {
                    reject(UserRole.AnonymousUser);
                }
            } else {
                resolve(user.role);
            }
        });
    };

    const logoutUser = (): void => {
        setUser(null);
    };

    return (
        <CurrentUserContext.Provider value={{
            user: user,
            checkIsUserLogged: checkIsUserLogged,
            logoutUser: logoutUser,
        }}>
            {children}
        </CurrentUserContext.Provider>
    );
};
