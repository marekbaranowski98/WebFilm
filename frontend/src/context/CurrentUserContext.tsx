import React, {useState} from 'react';

import {UserObject, UserRole} from '../types/UserType';
import {getLoggedUser} from '../helpers/api/user/userCall';
import {checkExistCookie} from '../helpers/api/api';
import {getImage} from '../helpers/api/photo';

interface CurrentUserContextProps {
    user: UserObject | null,
    checkIsUserLogged: () => Promise<UserRole>,
    logoutUser: () => void,
    updateUser: (user: UserObject) => void,
}

export const CurrentUserContext = React.createContext<CurrentUserContextProps | null>(null);

interface CurrentUserProviderProps {
    children: React.ReactNode,
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
                                updateUser(u);
                                resolve(u.role);
                            });
                        } else {
                            reject(UserRole.AnonymousUser);
                        }
                    }, (e) => {
                        reject(UserRole.AnonymousUser);
                    }).catch((e) => {
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

    const updateUser = (u: any): void => {
        let tmpUser: UserObject = u;
        tmpUser.birth_date = new Date(u['birth_date']);
        getImage('users', u['avatar_url']).then((image) => {
            tmpUser.avatar = image;
            setUser(tmpUser);
        }, () => setUser(tmpUser));
    };

    return (
        <CurrentUserContext.Provider value={{
            user: user,
            checkIsUserLogged: checkIsUserLogged,
            logoutUser: logoutUser,
            updateUser: updateUser,
        }}>
            {children}
        </CurrentUserContext.Provider>
    );
};
