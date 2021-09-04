const apiCall = async (url: string, method: string, body: Record<string, string> | null,
                       resolve: any, reject: any, userAuth: boolean) => {
    let header: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'X-CSRFToken': getCookie('csrftoken'),
    };
    if(userAuth) {
        header['Authorization'] = 'Bearer '+ getCookie('token');
    }

    return fetch(url, {
        method: method,
        credentials: 'include',
        headers: header,
        body: JSON.stringify(body),
    }).then((response) => {
        resolve(response);
    }, (error) => {
        reject(new Error('Serwis niedostępny'));
    });
};

export const post = async (url: string, body: Record<string, string>, userAuth: boolean = false) => {
    return new Promise(
        (resolve, reject) => {
            apiCall(url, 'POST', body, resolve, reject, userAuth);
        }
    );
};

export const getCookie = (name: string): string => {
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
