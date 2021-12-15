import React, {useEffect, useState} from 'react';

const getWindowDimensions = (): {widthWindow: number, heightWindow: number} => {
    const {innerWidth: widthWindow, innerHeight: heightWindow} = window;
    return {
        widthWindow,
        heightWindow,
    };
};

const useWindowsDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState<{widthWindow: number, heightWindow: number}>(getWindowDimensions);

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions(getWindowDimensions());
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowDimensions;
};

export default useWindowsDimensions;
