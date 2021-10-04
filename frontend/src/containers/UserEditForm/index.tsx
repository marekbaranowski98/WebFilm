import React, {useState} from 'react';

import './style.css';
import {
    Gender,
    UserObject,
    UserNameSurnameForm,
    UserBirthDateForm,
    UserGenderForm,
    UserEmailForm, UserNickForm, ResetPasswordObject
} from '../../types/UserType';
import SettingOption from '../../components/SettingOption';
import {FileUploadType} from '../../types/FileType';
import {AlertType, ErrorType} from '../../types/ErrorType';
import ErrorMessage from '../../components/ErrorMessage';
import Alert from '../../components/Alert';

interface UserEditFormProps {
    user?: UserObject | null,
}

const UserEditForm: React.FC<UserEditFormProps> = ({user}) => {
    const [notification, setNotification] = useState<AlertType>();
    const changeNameSurname = (
        update: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | FileUploadType) => void,
        errors: ErrorType,
    ): React.ReactNode => {
        return (
            <>
                <div className="input-field">
                    <div>Imię</div>
                    <input
                        type="text"
                        name="name"
                        onBlur={update}
                        defaultValue={user?.name}
                        autoComplete="given-name"
                    />
                    {errors.name && <ErrorMessage message={errors.name}/>}
                </div>
                <div className="input-field">
                    <div>Nazwisko</div>
                    <input
                        type="text"
                        name="surname"
                        onBlur={update}
                        defaultValue={user?.surname}
                        autoComplete="family-name"
                    />
                    {errors.surname && <ErrorMessage message={errors.surname}/>}
                </div>
            </>
        );
    };
    const changeBirthDate = (
        update: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | FileUploadType) => void,
        errors: ErrorType,
    ): React.ReactNode => {
        return (
            <div className="input-field">
                <div>Data urodzenia</div>
                <input
                    type="date"
                    name="birth_date"
                    max={new Date().toISOString().split('T')[0]}
                    defaultValue={user?.birth_date.toISOString().substring(0, 10)}
                    onBlur={update}
                    autoComplete="bday"
                    required
                />
                {errors.birth_date && <ErrorMessage message={errors.birth_date}/>}
            </div>
        );
    };
    const changeGender = (
        update: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | FileUploadType) => void,
        errors: ErrorType,
    ): React.ReactNode => {
        return (
            <div className="input-field">
                <div>Płeć</div>
                <select name="gender" defaultValue={user?.gender} onChange={update}>
                    {Gender.map((x) =>
                        <option key={x.id} value={x.id}>{x.value}</option>
                    )}

                </select>
                {errors.gender && <ErrorMessage message={errors.gender}/>}
            </div>
        );
    };

    const listSettingsIdentityOptions: {
        id: number,
        label: string,
        value: string,
        form: (
            update: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | FileUploadType) => void,
            errors: ErrorType,
        ) => React.ReactNode,
        initialObject: object,
    }[] = [
        {
            id: 1,
            label: 'Imię i nazwisko',
            value: `${user?.name} ${user?.surname}`,
            form: changeNameSurname,
            initialObject: {} as UserNameSurnameForm,
        },
        {
            id: 2,
            label: 'Data urodzenia',
            value: `${user?.birth_date.toLocaleDateString()}`,
            form: changeBirthDate,
            initialObject: {} as UserBirthDateForm,
        },
        {
            id: 3,
            label: 'Płeć',
            value: `${Gender.find(x => x.id === user?.gender)?.value}`,
            form: changeGender,
            initialObject: {} as UserGenderForm,
        },
    ];

    const changeEmail = (
        update: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | FileUploadType) => void,
        errors: ErrorType,
    ): React.ReactNode => {
        return (
            <>
                <div className="input-field">
                    <div>Email</div>
                    <input
                        type="email"
                        name="email"
                        defaultValue={user?.email}
                        onBlur={update}
                        autoComplete="email"
                        required
                    />
                    {errors.email && <ErrorMessage message={errors.email}/>}
                </div>
                <div className="input-field">
                    <div>Aktualne hasło:</div>
                    <input
                        type="password"
                        name="current_password"
                        onBlur={update}
                        autoComplete="current-password"
                        required
                    />
                    {errors.current_password && <ErrorMessage message={errors.current_password}/>}
                </div>
            </>
        );
    };
    const changeLogin = (
        update: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | FileUploadType) => void,
        errors: ErrorType,
    ): React.ReactNode => {
        return (
            <>
                <div className="input-field">
                    <div>Login</div>
                    <input
                        type="text"
                        name="login"
                        defaultValue={user?.login}
                        onBlur={update}
                        autoComplete="username"
                        required
                    />
                    {errors.login && <ErrorMessage message={errors.login}/>}
                </div>
                <div className="input-field">
                    <div>Aktualne hasło:</div>
                    <input
                        type="password"
                        name="current_password"
                        onBlur={update}
                        autoComplete="current-password"
                        required
                    />
                    {errors.current_password && <ErrorMessage message={errors.current_password}/>}
                </div>
            </>
        );
    };
    const changePassword = (
        update: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | FileUploadType) => void,
        errors: ErrorType,
    ): React.ReactNode => {
        return (
            <>
                <div className="input-field">
                    <div>Aktualne hasło:</div>
                    <input
                        type="password"
                        name="current_password"
                        onBlur={update}
                        autoComplete="current-password"
                        required
                    />
                    {errors.current_password && <ErrorMessage message={errors.current_password}/>}
                </div>
                <div className="input-field">
                    <div>Nowe hasło:</div>
                    <input
                        type="password"
                        name="password"
                        onBlur={update}
                        autoComplete="new-password"
                        required
                    />
                    {errors.password && <ErrorMessage message={errors.password}/>}
                </div>
                <div className="input-field">
                    <div>Powtrórz hasło:</div>
                    <input
                        type="password"
                        name="repeat_password"
                        onBlur={update}
                        autoComplete="new-password"
                        required
                    />
                    {errors.repeat_password && <ErrorMessage message={errors.repeat_password}/>}
                </div>
            </>
        );
    };

    const listSettingsSecurityOptions: {
        id: number,
        label: string,
        value: string,
        form: (
            update: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | FileUploadType) => void,
            errors: ErrorType,
        ) => React.ReactNode,
        initialObject: object,
    }[] = [
        {
            id: 1,
            label: 'Email',
            value: `${user?.email}`,
            form: changeEmail,
            initialObject: {} as UserEmailForm,
        },
        {
            id: 2,
            label: 'Login',
            value: `${user?.login}`,
            form: changeLogin,
            initialObject: {} as UserNickForm,
        },
        {
            id: 3,
            label: 'Hasło',
            value: '********',
            form: changePassword,
            initialObject: {} as ResetPasswordObject,
        },
    ];

    return (
        <div className="edit-form">
            {notification && <Alert
                icon={notification.icon}
                message={notification.message}
            />}
            <h2>Dane osobowe</h2>
            <div className="settings-grid">
                {listSettingsIdentityOptions.map(x =>
                    <SettingOption
                        key={x.id}
                        generateForm={x.form}
                        label={x.label}
                        value={x.value}
                        typeForm={x.initialObject}
                        setAlert={setNotification}
                    />
                )}
            </div>
            <h2>Dane logowania</h2>
            <div className="settings-grid">
                {listSettingsSecurityOptions.map(x =>
                    <SettingOption
                        key={x.id}
                        generateForm={x.form}
                        label={x.label}
                        value={x.value}
                        typeForm={x.initialObject}
                        setAlert={setNotification}
                    />
                )}
            </div>
        </div>
    );
};

export default UserEditForm;
