import React from 'react';
import {GoogleReCaptcha} from 'react-google-recaptcha-v3';

interface ReCaptchaProps {
    setToken: (x: string | undefined) => void,
}

const ReCaptcha: React.FC<ReCaptchaProps> = ({setToken}) => {
    return (
        <GoogleReCaptcha
            action={'recaptcha'}
            onVerify={setToken}
        />
    );
};

export default ReCaptcha;
