import React, {useContext, useEffect, useState} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

import error from '../../images/error.svg';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import UserHeader from '../../components/UserHeader';
import {getUser} from '../../helpers/api/user/userCall';
import {RedirectType} from '../../types/ErrorType';
import {getImage} from '../../helpers/api/photo';
import {UserObject} from '../../types/UserType';

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

    useEffect(() => {
        if (login === userContext?.user?.login) {
            setUser(<UserHeader user={userContext.user} show_edit={true} />);
        } else {
            getUser(login).then((res) => {
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
