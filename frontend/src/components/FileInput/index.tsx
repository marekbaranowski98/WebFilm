import React, {useEffect, useState} from 'react';

import './style.css';
import upload from '../../images/upload.svg';
import {validateFile} from '../../helpers/validators';
import ErrorMessage from '../ErrorMessage';
import {ErrorType} from '../../types/ErrorType';
import {FileUploadType} from '../../types/FileType';

interface FileInputProps {
    update(FileListType: FileUploadType): void
    start_errors: ErrorType,
    set_errors(errors: ErrorType): void,
}

const FileInput: React.FC<FileInputProps> = ({
        update,
        start_errors,
        set_errors,
    }) => {
    const [files, setFiles] = useState<FileList>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        setError(start_errors.avatar);
    }, [start_errors]);

    const uploadFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            saveFile(e.target.files);
        }
    };

    const saveFile = (file_list: FileList): void => {
        try {
            if (validateFile(file_list[0])) {
                let f: DataTransfer = new DataTransfer();
                f.items.add(file_list[0])
                setFiles(f.files);

                setError(undefined);
                set_errors({
                    ...start_errors,
                    ['avatar']: '',
                });

                update({
                    name: 'avatar',
                    file_list: f.files,
                });
            }
        } catch (e) {
            setError((e as Error).message);
        }
    };

    const removeFile = (e: React.MouseEvent<HTMLDivElement>): void => {
        setFiles(undefined);
    };

    const fileDrop = (e: React.DragEvent<HTMLElement>): void => {
        overrideEventDefaults(e);

        saveFile(e.dataTransfer.files);
    };

    const enterBoxFile = (e: React.DragEvent): void => {
        overrideEventDefaults(e);
        e.currentTarget.className = ['box-file', 'zoom-box'].join(' ');
    };

    const leaveBoxFile = (e: React.DragEvent): void => {
        overrideEventDefaults(e);
        e.currentTarget.className = ['box-file'].join(' ');
    };

    const overrideEventDefaults = (e: React.DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div className="input-field">
            <div className={['box-input'].join(' ')}>
                {files ?
                    <div className="box-file">
                        <div className="miniature">
                            <div className="button remove-image-button" onClick={removeFile}>
                                <div className="cross"/>
                            </div>
                            <img className="min-image" src={URL.createObjectURL(files[0])}/>
                        </div>
                    </div>
                    :
                    <label
                        className="box-file"
                        onDragOver={overrideEventDefaults}
                        onDragEnter={enterBoxFile}
                        onDragLeave={leaveBoxFile}
                        onDrop={fileDrop}
                    >
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={uploadFile}
                        />
                        <img className="upload-logo" src={upload} alt="Wgraj plik"/>
                        <div className="button">Wybierz plik lub przeciągnij go</div>
                    </label>
                }
            </div>
            {error && <ErrorMessage message={error}/>}
        </div>
    );
};

export default FileInput;
