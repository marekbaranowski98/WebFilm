import React, {useEffect, useState} from 'react';
import {Link, Redirect, useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

import check from '../../images/check.svg';
import error from '../../images/error.svg';
import {RedirectType} from '../../types/ErrorType';
import {validateUUID} from '../../helpers/validators';
import {activeUser} from '../../helpers/api/user/userCall';
import useCancelledPromise from '../../hooks/useCancelledPromise';

interface ActivePageProps {
}

interface ActiveParams {
    key: string,
}

const ActivePage: React.FC<ActivePageProps> = ({}) => {
    const {key} = useParams<ActiveParams>();
    const [counter, setCounter] = useState(10);
    const [intervalID, setIntervalID] = useState<NodeJS.Timer>();
    const [url, setURL] = useState<RedirectType>();
    const {promise, cancelPromise} = useCancelledPromise();

    useEffect(() => {
        if (validateUUID(key)) {
            promise(activeUser(key)).then((r) => {
                let response = r as Response;
                if (response.status === 204) {
                    setURL({
                        pathname: '/',
                        state: {
                            alertMessage: {
                                icon: check,
                                message: 'Konto zostało aktywowane',
                            },
                        },
                    });
                } else if (response.status === 401) {
                    setURL({
                        pathname: '/',
                    });
                } else if (response.status === 404) {
                    setURL({
                        pathname: '/',
                        state: {
                            alertMessage: {
                                icon: error,
                                message: 'Błędny link',
                            },
                        },
                    });
                } else {
                    throw new Error();
                }
            }, () => {
                throw new Error();
            }).catch((e) => {
                throw new Error();
            });
        } else {
            setURL({
                pathname: '/',
                state: {
                    alertMessage: {
                        icon: error,
                        message: 'Błędny link',
                    },
                },
            });
        }

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
        <article className="main-content content-container center-container">
            {url && <Redirect to={url}/>}
            <Helmet>
                <title>Aktywacja konta - WebFilm</title>
            </Helmet>
            <h2>Konto zostało aktywowane</h2>
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
        </article>
    );
};

export default ActivePage;
