
// import {camelizeKeys} from 'humps'


let API_ROOT = 'https://xuegong.twt.edu.cn/api';

export const fetchApi = (apiPath, request = {}) => {
    const fullUrl = `${API_ROOT}/${apiPath}`;
    const { headers, body, method } = request;
    let customRequest = {};

    if (method) {
        customRequest.method = method.toUpperCase();
    }
    if (body) {
        customRequest.body = body;
    }
    if (headers) {
        const { contentType, auth } = headers;
        customRequest.headers = {};

        if (contentType) {
            customRequest.headers['Content-Type'] = contentType;
        }
        if (auth) {
            customRequest.headers['Authentication'] = auth;
        }
    }
    return fetch(fullUrl, customRequest)
    // .then(res => res.json())
    // .then(json => {
    //     if (json.err) {
    //         return Promise.reject(json);
    //     }
    //     const camelizedJson = camelizeKeys(json);
    //     console.log(camelizedJson);
    //     return camelizedJson;
    // })
};
