import React, {useContext, useEffect, useState} from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';

import error from '../../images/error.svg';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import {RedirectType} from '../../types/ErrorType';
import {UserRole} from '../../types/UserType';

interface LoggedUserRouteProps extends RouteProps {
    min_user_role: UserRole,
}

const LoggedUserRoute: React.FC<LoggedUserRouteProps> = ({path, exact, component, min_user_role= UserRole.User}) => {
    const userContext = useContext(CurrentUserContext);
    const [url, setURL] = useState<RedirectType>();
    const [role, setRole] = useState<UserRole>(UserRole.AnonymousUser);

    useEffect(() => {
        userContext?.checkIsUserLogged().then((r) => {
            if (r >= min_user_role) {
                setRole(r);
            } else {
                setURL({
                    pathname: '/',
                    state: undefined,
                });
            }
        }, () => {
            setURL({
                pathname: '/',
                state: undefined,
            });
        }).catch((e) => {
            setURL({
                pathname: '/',
                state: {
                    alertMessage: {
                        icon: error,
                        message: 'Serwis niedostępny',
                    },
                },
            });
        });
    }, []);

    return (
        <>
            {url && <Redirect to={url}/>}
            {role != UserRole.AnonymousUser &&
                <Route
                    path={path}
                    exact={exact}
                    component={component}
                />
            }
        </>
    );
};

export default LoggedUserRoute;
