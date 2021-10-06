import React from 'react';
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';

interface ReCaptchaProviderProps {
    children?: React.ReactNode,
}

const ReCaptchaProvider: React.FC<ReCaptchaProviderProps> = ({children}) => {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey="6LdTX5EcAAAAAH_d1xBTYMB_1XXMPhfmCaWgLBlA"
            language="pl"
        >
            {children}
        </GoogleReCaptchaProvider>
    );
};

export default ReCaptchaProvider;
