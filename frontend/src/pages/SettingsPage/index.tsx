import React, {useContext} from 'react';
import {Helmet} from 'react-helmet-async';

import {CurrentUserContext} from '../../context/CurrentUserContext';
import UserHeader from '../../components/UserHeader';
import UserEditForm from '../../containers/UserEditForm';

interface SettingsPageProps {
}

const SettingsPage: React.FC<SettingsPageProps> = ({}) => {
    const userContext = useContext(CurrentUserContext);

    return (
        <article className="main-content content-container">
            <Helmet>
                <title>Ustawienia - WebFilm</title>
            </Helmet>
            <UserHeader user={userContext?.user}/>
            <UserEditForm user={userContext?.user}/>
        </article>
    );
};

export default SettingsPage;
