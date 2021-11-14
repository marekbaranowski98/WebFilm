import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

import './style.css';
import useWindowsDimensions from '../../hooks/useWindowsDimensions';
import Search from '../../components/Search';
import {AlertType, ResultType} from '../../types/ErrorType';
import Alert from '../../components/Alert';

interface MainPageProps {
}

const MainPage: React.FC<MainPageProps> = ({}) => {
    const {heightWindow, widthWindow} = useWindowsDimensions();
    const location = useLocation<ResultType>();
    const history = useHistory();
    const [notification, setNotification] = useState<AlertType>();

    useEffect(() => {
        if (location.state?.alertMessage) {
            setNotification(location.state?.alertMessage);
            history.replace({pathname: location.pathname, state: undefined});
        }
    }, []);

    return (
        <>
            {widthWindow < 600 && <Search/>}
            {notification && <Alert
                icon={notification.icon}
                message={notification.message}
            />}
        </>
    );
};

export default MainPage;
