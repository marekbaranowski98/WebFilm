import {getBlobFromBucketURL} from './routes';
import {get} from './api';

export const getImage = async (bucket: string, blob: string): Promise<string> => {
    return get(getBlobFromBucketURL(bucket, blob), false).then(async (r) => {
        let response = r as Response;
        if(response.status === 200) {
            let e = await response.json();
            return `data:image/png;base64,${e.image}`;
        }else {
            throw new Error('Nie ma takiego obrazu.');
        }
    }, (e) => {
        throw new Error('Nie ma takiego obrazu.');
    });
}
