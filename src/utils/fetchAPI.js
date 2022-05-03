/**
 * This file contains important function for communication with api serever
 */

// vendor
import _ from 'lodash';
import qs from 'qs';

// proj
// import store from 'store/store';
// import { selectAuthToken } from 'Common/redux/duck';

export const API = process.env.REACT_APP_API_URL;

class ResponseError extends Error {
    constructor(response, status) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.message = 'Response Error';
        this.response = response;
        this.status = status || 500;
    }
}

/**
 * This function is used to make requests to the server. It automatically handles all transformations and, set authorization token and get aut tiken
 * @param {*} method    - request method, one of: "POST", "PUT", "GET", etc.
 * @param {*} endpoint  - request endpoint, for example: '/users'
 * @param {*} [ query ] - query parameters in form of js object: {myParam: "text", queryFilter: "bla"}, null if no value
 * @param {*} [ body ]  - js object for some methods, null if no body
 * 
 * @param {*} [ options = {} ]        - additional options for request
 * @param {*} [ options.rawResponse ] - Do not transform received response into json and return as is
 * @param {*} [ options.noThrowingError ] - If true error will not be thrawed and nothing will be returned(useful if you do not depend on returned data)
 * @param {*} [ options.removeEmptyStrings = true ] - If true error will remove all empty strings
 */
export async function fetchAPI(method, endpoint = '', query = {}, body = {}, options = {}) {
    const {
        rawResponse = false,
        noThrowingError=false,
        removeEmptyStrings=true
    } = options;

    const omittedQuery = _.omitBy( query, value => removeEmptyStrings && _.isString(value) && _.isEmpty(value)); //Remove empty strings

    const queryString = qs.stringify(omittedQuery, {
        skipNulls:   true,
        arrayFormat: 'repeat',
    });

    const request = {
        method,
        headers: {
            'content-type':                   'application/json',
            'Access-Control-Request-Headers': '*',
        },
    };

    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        request.body = JSON.stringify(body);
    }

    const url = `${API}${endpoint}${queryString ? `?${queryString}` : ''}`;
    const response = await fetch(url, request);

    const { status } = response;

    switch (true) {
        case status >= 200 && status < 300:
            return rawResponse ? await response : await response.json();
        default:
            if(noThrowingError) {
                return undefined;
            } else {
                throw new ResponseError(await response.json(), status);
            }
    }
}
