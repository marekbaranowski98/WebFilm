import React, {useEffect, useState} from 'react';
import {Redirect, useParams} from 'react-router-dom';

import UserHeader from '../../components/UserHeader';
import {getUser} from '../../helpers/api/user';
import error from '../../images/error.svg';
import {RedirectType} from '../../types/ErrorType';

interface UserPageProps {
}

interface UserParam {
    login: string,
}

const UserPage: React.FC<UserPageProps> = ({}) => {
    const {login} = useParams<UserParam>();
    const [user, setUser] = useState<React.ReactNode>();
    const [url, setURL] = useState<RedirectType>();

    useEffect(() => {
        getUser(login).then((res) => {
            let response = res as Response;
            if (response.status === 200) {
                response.json().then((json) => {
                    setUser(<UserHeader user={json}/>);
                });
            }else {
                setUser(<UserHeader/>);
            }
        }, (e) => {
            throw new Error();
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
    }, [login]);

    return (
        <article className="content-container">
            {url && <Redirect to={url}/>}
            {user ?
                user
                :
                <h2>Trwa wczytywanie użytkownika...</h2>
            }
        </article>
    );
};

export default UserPage;
