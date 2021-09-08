import React, {useReducer, useState} from 'react';

import {ErrorType} from '../types/ErrorType';

interface useFormProps<T> {
    initialObject: T,
    validateObject: (object: T, nameValidateField: string) => boolean,
    sendRequestToAPI: (object: T, setErrors: (errors: ErrorType) => void) => void,
}

const useForm = <T extends {}>({initialObject, validateObject, sendRequestToAPI,}: useFormProps<T>) => {
    const [errors, setErrors] = useState<ErrorType>({});

    const validate = (state:  T, action: {field: string, value: any}): T  => {
        let errorsTMP: ErrorType = {}
        let tmpState: T = {
            ...state,
            [action.field]: action.value,
        };

        try {
            validateObject(tmpState, action.field);
        }catch(e: unknown) {
            errorsTMP = {
                ...errorsTMP,
                [(e as Error).name]: (e as Error).message
            };
        }
        setErrors(errorsTMP);
        return tmpState;
    };

    const [values, dispatch] = useReducer(validate, initialObject);

    const updateValue = (e: React.ChangeEvent<HTMLInputElement>): void  => {
        dispatch({
            field: e.target.name,
            value: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    };
    const submitHandler = (e: React.FormEvent): void => {
        e.preventDefault();

        if(Object.keys(errors).length == 0) {
            sendRequestToAPI(values, setErrors);
        }
    };

    return {updateValue, submitHandler, errors};
}

export default useForm;
