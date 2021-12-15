import React, {useContext, useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';

import './style.css';
import camera from '../../images/camera.svg';
import settings from '../../images/settings.svg';
import error from '../../images/error.svg';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import {UserObject} from '../../types/UserType';
import {ErrorType, RedirectType} from '../../types/ErrorType';
import {DEFAULT_UUID} from '../../helpers/ConstType';
import {validateFile} from '../../helpers/validators';
import {deleteAvatar, editUser} from '../../helpers/api/user/userCall';
import useCancelledPromise from '../../hooks/useCancelledPromise';
import ErrorMessage from '../ErrorMessage';

interface UserHeaderProps {
    user?: UserObject | null;
    show_edit?: boolean,
}

const UserHeader: React.FC<UserHeaderProps> = ({user, show_edit}) => {
    const userContext = useContext(CurrentUserContext);
    const [url, setURL] = useState<RedirectType>();
    const [errors, setErrors] = useState<ErrorType>();
    const {promise, cancelPromise} = useCancelledPromise();

    useEffect(() => {
        return () => {
            cancelPromise();
        };
    }, []);

    const uploadFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && validateFile(e.target.files[0])) {
            promise(editUser({'avatar': e.target.files[0]})).then((r) => {
                let response = (r as Response);
                if (response.status === 200) {
                    response.json().then((u => userContext?.updateUser(u)));
                } else if (response.status === 401 || response.status === 404) {
                    setURL({
                        pathname: '/',
                        state: {
                            alertMessage: {
                                icon: error,
                                message: 'Nie jesteś zalogowany',
                            },
                        },
                    });
                } else if (response.status === 403) {
                    response.json().then(allErrors => {
                        let e: ErrorType = {};
                        for (let oneError in allErrors['errors']) {
                            e[oneError] = allErrors['errors'][oneError][0];
                        }
                        setErrors(e);
                    });
                }else {
                    throw new Error();
                }
            }, (e) => {
                throw new Error();
            }).catch((e) => {
                setErrors({
                    'non_field_errors': 'Serwis niedostępny',
                });
            });
        }
    };

    const removeAvatar = (): void => {
        promise(deleteAvatar()).then((r) => {
            let response = (r as Response);
            if (response.status === 200) {
                response.json().then((u => userContext?.updateUser(u)));
            } else if (response.status === 401 || response.status === 404) {
                setURL({
                    pathname: '/',
                    state: {
                        alertMessage: {
                            icon: error,
                            message: 'Nie jesteś zalogowany',
                        },
                    },
                });
            } else {
                throw new Error();
            }
        }, (e) => {
            throw new Error();
        }).catch((e) => {
            setErrors({
                'non_field_errors': 'Serwis niedostępny',
            });
        });
    };

    return (
        <header>
            {url && <Redirect to={url}/>}
            {user ?
                <div className="user-header">
                    {(user.id === userContext?.user?.id && show_edit) &&
                    <Link className="link user-settings" to={'/settings/'}>
                        <img src={settings} alt="Ustawienia"/>
                        Ustawienia
                    </Link>
                    }
                    {user.id === userContext?.user?.id ?
                        <div className="container-settings-avatar">
                            <label className="settings-avatar">
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={uploadFile}
                                />
                                <img src={user.avatar} className="user-avatar" alt="Avatar użytkownika"/>
                                <img src={camera} className="options-avatar" alt="Zmień avatar"/>
                            </label>
                            {user.avatar_url !== DEFAULT_UUID &&
                                <div className="button remove-image-button clear-avatar" onClick={removeAvatar}>
                                    <div className="cross"/>
                                </div>
                            }
                        </div>
                        :
                        <img src={user.avatar} className="user-avatar" alt="Avatar użytkownika"/>
                    }
                    {errors && <ErrorMessage message={errors.avatar}/>}
                    <div className="user-identity">
                        <h2>{user.name} {user.surname}</h2>
                        <p>@{user.login}</p>
                    </div>
                </div>
                :
                <div className="user-error">
                    <h2>Nie ma takiego użytkownika</h2>
                    <Link to={'/'}>
                        <div className="button">
                            Powrót na stronę główną
                        </div>
                    </Link>
                </div>
            }
        </header>
    );
};

export default UserHeader;
