import React, {useContext, useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Redirect, useParams} from 'react-router-dom';

import error from '../../images/error.svg';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import {RedirectType} from '../../types/ErrorType';
import {UserObject} from '../../types/UserType';
import {getImage} from '../../helpers/api/photo';
import {getUser} from '../../helpers/api/user/userCall';
import useCancelledPromise from '../../hooks/useCancelledPromise';
import UserHeader from '../../components/UserHeader';

interface UserPageProps {
}

interface UserParam {
    login: string,
}

const UserPage: React.FC<UserPageProps> = ({}) => {
    const {login} = useParams<UserParam>();
    const userContext = useContext(CurrentUserContext);
    const [user, setUser] = useState<React.ReactNode>();
    const [url, setURL] = useState<RedirectType>();
    const {promise, cancelPromise} = useCancelledPromise();

    useEffect(() => {
        if (login === userContext?.user?.login) {
            setUser(<UserHeader user={userContext.user} show_edit={true} />);
        } else {
            promise(getUser(login)).then((res) => {
                let response = res as Response;
                if (response.status === 200) {
                    response.json().then(async (json) => {
                        let tmpUser: UserObject = json;

                        tmpUser.avatar = await getImage('users', json['avatar_url']);
                        setUser(<UserHeader user={tmpUser} show_edit={true}/>);
                    });
                } else if (response.status === 500) {
                    throw new Error();
                } else {
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
        }

        return () => {
            cancelPromise();
        };
    }, [login, userContext?.user]);

    return (
        <article className="main-content content-container">
            {url && <Redirect to={url}/>}
            <Helmet>
                <title>{login} - profil - WebFilm</title>
            </Helmet>
            {user ?
                user
                :
                <h2>Trwa wczytywanie użytkownika...</h2>
            }
        </article>
    );
};

export default UserPage;
