const apiCall = async (url: string, method: string, body: Record<string, string>,  resolve: any, reject: any) => {
    return fetch(url,
        {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify(body)
        },
    ).then((response) => {
        resolve(response);
    }, (error) => {
        reject(new Error('Serwis niedostępny'));
    });
};

export const post = async (url: string, body: Record<string, string>) => {
    return new Promise(
        (resolve, reject) => {
            apiCall(url, 'POST', body, resolve, reject);
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
