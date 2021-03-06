import React, {useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

import './style.css';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import {getLogoutUser} from '../../helpers/api/user/userCall';
import useCancelledPromise from '../../hooks/useCancelledPromise';

interface LogoutPageProps {
}

const LogoutPage: React.FC<LogoutPageProps> = ({}) => {
    const userContext = React.useContext(CurrentUserContext);
    const [counter, setCounter] = useState(10);
    const [intervalID, setIntervalID] = useState<NodeJS.Timer>();
    const [redirect, setRedirect] = useState(false);
    const {promise, cancelPromise} = useCancelledPromise();

    useEffect(() => {
        promise(getLogoutUser()).then((r) => {
            userContext?.logoutUser();
            setRedirect(true);
        }, (e) => setRedirect(true));

        return () => {
            cancelPromise();
        };
    }, []);

    useEffect(() => {
        if (counter > 0) {
            let interval = setInterval(() => setCounter(counter - 1), 1000);
            setIntervalID(interval);

            return () => {
                clearInterval(interval);
            }
        }
    }, [counter]);

    return (
        <div className="main-container content-container center-container">
            {redirect && <Redirect to={{
                pathname: '/',
            }}/>}
            <Helmet>
                <title>Wylogowanie - WebFilm</title>
            </Helmet>
            <h2>Zostałeś wylogowany!</h2>
            <p>
                Zaraz nastąpi przekierowanie na stronę główną.
            </p>
            <p>
                Jeżeli nie nastąpi w ciągu {counter} sekund naciśnij ten guzik.
            </p>
            <Link to={'/'}>
                <div className="button short-button">
                    Powrót na stronę główną
                </div>
            </Link>
        </div>
    );
}

export default LogoutPage;
