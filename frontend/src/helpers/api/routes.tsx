export const SERVER_URL = 'http://127.0.0.1:8000/api/';

const photosURL = (): string => {
    return `${SERVER_URL}photos/`;
};

export const getBlobFromBucketURL = (bucket: string, blob: string): string => {
    return `${photosURL()}${bucket}/${blob}/`;
};
