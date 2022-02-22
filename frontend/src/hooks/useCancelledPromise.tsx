import {useState} from 'react';

const useCancelledPromise = () => {
    const [isCancel, setIsCancel] = useState({value: false});

    const wrappedPromise = (promise: Promise<any | void>): Promise<any | void> => {
        return new Promise((resolve, reject) => {
            promise.then((d) => {
                return isCancel.value ? reject() : resolve(d);
            }, (e) => {}).catch((e) => {
                return reject();
            });
        });
    };

    const cancelPromise = () => {
        setIsCancel({value: true});
    };

    return {promise: wrappedPromise, cancelPromise};
};

export default useCancelledPromise;
