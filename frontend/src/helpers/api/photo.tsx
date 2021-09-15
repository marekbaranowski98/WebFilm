import {getBlobFromBucket} from './routes';
import {get} from './api';

export const getImage = async (bucket: string, blob: string): Promise<string> => {
    return get(getBlobFromBucket(bucket, blob), false).then(async (r) => {
        let response = r as Response;
        if(response.status === 200) {
            let e = await response.json();
            return e.image;
        }else {
            throw new Error('Nie ma takiego obrazu.');
        }
    }, (e) => {
        throw new Error('Nie ma takiego obrazu.');
    });
}
