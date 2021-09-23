import React, {useReducer, useState} from 'react';

import {ErrorType} from '../types/ErrorType';
import {FileUploadType} from '../types/FileType';

interface useFormProps<T> {
    initialObject: T,
    validateObject: (object: T, nameValidateField: string) => Promise<boolean>,
    sendRequestToAPI: (object: T, setErrors: (errors: ErrorType) => void) => void,
}

const useForm = <T extends {}>({initialObject, validateObject, sendRequestToAPI,}: useFormProps<T>) => {
    const [errors, setErrors] = useState<ErrorType>({});
    const [init, setInit] = useState<boolean>(true);
    const validate = (state:  T, action: {field: string, value: any}): T  => {
        if(init) {
            setInit(false);
            return state;
        }else {
            let errorsTMP: ErrorType = errors;
            let tmpState: T;
            delete errorsTMP[action.field];

            tmpState = {
                ...state,
                [action.field]: action.value,
            };
            validateObject(tmpState, action.field).catch((e) => {
                errorsTMP = {
                    ...errorsTMP,
                    [(e as Error).name]: (e as Error).message
                };
                setErrors(errorsTMP);
            });
            return tmpState;
        }
    };

    const [values, dispatch] = useReducer(validate, initialObject);

    const updateValue = (e: React.ChangeEvent<HTMLInputElement |  HTMLSelectElement> | FileUploadType): void  => {
        if('file_list' in e) {
            console.log(e.file_list);
            dispatch({
                field: e.name,
                value: e.file_list,
            });
        }else {
            let tmpValue: any = e.target.value;
            if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
                tmpValue = e.target.checked;
            }

            dispatch({
                field: e.target.name,
                value: tmpValue,
            });
        }
    };

    const submitHandler = (e: React.FormEvent): void => {
        e.preventDefault();

        if(Object.keys(errors).filter((x) => x !== 'non_field_errors').length == 0) {
            setErrors({});
            sendRequestToAPI(values, setErrors);
        }
    };

    return {updateValue, submitHandler, errors, setErrors};
}

export default useForm;
