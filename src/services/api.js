import {BASE_URL} from '../config/index';

require('es6-promise/auto');

function getFetchAction(endpoint, method, token, body, header) {
    let reqHeader = {
        Accept: 'application/json',
        ...header
    };

    if (!(body instanceof FormData)) {
        reqHeader['Content-Type'] = 'application/json; charset=UTF-8';
    }

    if (token) {
        reqHeader = Object.assign({}, reqHeader, {Authorization: `Bearer ${token}`});
    }

    if (method === 'POST') {
        return fetch(`${BASE_URL}${endpoint}`, {
            method,
            headers: reqHeader,
            body: body instanceof FormData ? body : JSON.stringify(body)
        });
    }

    if (method === 'DELETE') {
        return fetch(`${BASE_URL}${endpoint}`, {
            method,
            headers: reqHeader
        });
    }

    return fetch(`${BASE_URL}${endpoint}`, {headers: reqHeader});
}

export function callApi(endpoint, method, token, body, header) {
    return Promise.race([
        getFetchAction(endpoint, method, token, body, header),
        new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error('request timeout')), 60000);
        })
    ])
        .then(response => response.json().then(json => ({json, response})))
        .then(({json, response}) => {
            if (!response.ok || (typeof json === 'boolean' && !json)) {
                const nJson = Object.assign({}, json);
                nJson.code = response.status;
                return Promise.reject(nJson);
            }
            return json;
        });
}

export const apiMqiddleware = store => next => action => {
    let {endpoint} = action;
    const {body, types, bodyExtra, method, header, payload} = action;

    const state = store.getState();

    if (payload !== undefined){
        return payloadMiddleware(payload(state), types, next)
    }

    if (!endpoint && !method && !types && action.type) {
        return next(action);
    }

    if (typeof endpoint === 'function') {
        endpoint = endpoint(state);
    }

    if (!method) {
        throw new Error('method is not exist');
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.');
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }

    const [requestType, successType, failureType] = types;
    let resultFailureType = failureType;
    const extraData = bodyExtra ? {extra: bodyExtra} : {};
    const request = ({
        url: `${BASE_URL}${endpoint}`,
        method: method
    });
    next(Object.assign({}, {type: requestType, request}, extraData));

    return callApi(endpoint, method, '', body, header).then(
        response => {
            const result = response;
            next(Object.assign({}, {type: successType, result, request}, extraData));
            return result;
        },
        error => {
            if (error.code === 401) {
                resultFailureType = 'EXPIRED_SESSION';
            }
            next(
                Object.assign(
                    {},
                    {
                        type: resultFailureType,
                        status: 'ERROR',
                        errorCode: error.code,
                        description: error.details || error.data || 'Something bad happened'
                    },
                    extraData
                )
            );
        }
    );
};

function payloadMiddleware(payload, types, next) {
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }
    const [requestType, successType, failureType] = types;
    next(Object.assign({}, {type: requestType}, {}));
    payload.then(
        response=>{
            next(Object.assign({}, {type: successType, response}, {}));
        },
        error => {
            next(
                Object.assign(
                    {},
                    {
                        type: failureType,
                        status: 'ERROR',
                        errorCode: error.code,
                        description: error.details || error.data || 'Something bad happened'
                    },
                    {}
                )
            )
        }
    )
}
