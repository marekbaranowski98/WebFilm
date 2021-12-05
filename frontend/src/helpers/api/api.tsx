const apiCall = async (url: string, method: string, body: FormData | null, resolve: any, reject: any,
                       userAuth: boolean
) => {
    let header: Record<string, string> = {
        'Accept': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'),
    };
    if (userAuth) {
        header['Authorization'] = 'Bearer ' + getCookie('token');
    }

    return fetch(url, {
        method: method,
        credentials: 'include',
        headers: header,
        body: body,
    }).then((response) => {
        resolve(response);
    }, (error) => {
        reject(new Error('Serwis niedostępny'));
    });
};

export const post = async (url: string, body: FormData, userAuth: boolean = false) => {
    return new Promise(
        (resolve, reject) => {
            apiCall(url, 'POST', body, resolve, reject, userAuth);
        }
    );
};

export const patch = async (url: string, body: FormData, userAuth: boolean = false) => {
    return new Promise(
        (resolve, reject) => {
            apiCall(url, 'PATCH', body, resolve, reject, userAuth);
        }
    );
};

export const delete_api = async (url: string, body: FormData, userAuth: boolean = false) => {
    return new Promise(
        (resolve, reject) => {
            apiCall(url, 'DELETE', body, resolve, reject, userAuth);
        }
    );
};

export const put = async (url: string, body: FormData, userAuth: boolean = false) => {
    return new Promise(
        (resolve, reject) => {
            apiCall(url, 'PUT', body, resolve, reject, userAuth);
        }
    );
};

export const get = async (url: string, userAuth: boolean = false) => {
    let header: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'X-CSRFToken': getCookie('csrftoken'),
    };
    if (userAuth) {
        header['Authorization'] = 'Bearer ' + getCookie('token');
    }

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: header,
        }).then((response) => {
            resolve(response);
        }, (error) => {
            reject(new Error('Serwis niedostępny'));
        });
    });
};

export const checkExistCookie = (name: string): boolean => {
    return !(getCookie(name) == '');
}

const getCookie = (name: string): string => {
    let cookieValue = '';
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const convertToFormData = (body: any) => {
    let tmpFormData = new FormData();
    for (let x in body) {
        if (body[x] instanceof FileList) {
            for (let y in body[x]) {
                tmpFormData.append(x, body[x][y]);
            }
        } else {
            tmpFormData.append(x, body[x]);
        }
    }
    return tmpFormData;
};
