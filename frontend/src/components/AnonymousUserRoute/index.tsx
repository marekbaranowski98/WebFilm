import React, {useContext, useEffect, useState} from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';

import error from '../../images/error.svg';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import {RedirectType} from '../../types/ErrorType';

const AnonymousUserRoute: React.FC<RouteProps> = ({path, exact, component}) => {
    const userContext = useContext(CurrentUserContext);
    const [url, setURL] = useState<RedirectType>();

    useEffect(() => {
        userContext?.checkIsUserLogged().then(() => {
            setURL({
                pathname: '/',
                state: undefined,
            });
        }, () => {
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
            <Route
                path={path}
                exact={exact}
                component={component}
            />
        </>
    );
};

export default AnonymousUserRoute;
