import axios from 'axios';
import qs from 'qs';
//此文件配置请求前置操作,后置操作
//若增加log可以写到此文件
let instance = axios.create({
    // `url` is the server URL that will be used for the request
    // url: '/user',

    // `method` is the request method to be used when making the request
//  method: 'post', // default

    // `baseURL` will be prepended to `url` unless `url` is absolute.
    // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
    // to methods of that instance.
    baseURL: 'https://cnodejs.org/api/v1',

    // `transformRequest` allows changes to the request data before it is sent to the server
    // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
    // The last function in the array must return a string, an ArrayBuffer, or a Stream
    transformRequest: [function(data) {
        // Do whatever you want to transform the data  
        // console.log(data)
        return qs.stringify(data, {arrayFormat: 'indices'});
        // return qs.stringify(data, {arrayFormat: 'brackets'});
        return data
    }],

    // `transformResponse` allows changes to the response data to be made before
    // it is passed to then/catch
    /*transformResponse: [function (data) {
        // Do whatever you want to transform the data
        // console.log(data);
        return data
    }],*/

    // `headers` are custom headers to be sent
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },

    // `params` are the URL parameters to be sent with the request
    // Must be a plain object or a URLSearchParams object
    params: {},

    // `paramsSerializer` is an optional function in charge of serializing `params`
    // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
    /*paramsSerializer: function(params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
    },*/

    // `data` is the data to be sent as the request body
    // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
    // When no `transformRequest` is set, must be of one of the following types:
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - Browser only: FormData, File, Blob
    // - Node only: Stream
    /*data: {
        firstName: 'Fred'
    },*/

    // `timeout` specifies the number of milliseconds before the request times out.
    // If the request takes longer than `timeout`, the request will be aborted.
    timeout: process.env.ENV_NAME === 'PRO' ? 30000 : 300000,

    // `withCredentials` indicates whether or not cross-site Access-Control requests
    // should be made using credentials
    // withCredentials: false, // default

    // `adapter` allows custom handling of requests which makes testing easier.
    // Return a promise and supply a valid response (see [response docs](#response-api)).
    /*adapter: function (config) {
        //...
    },*/

    // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
    // This will set an `Authorization` header, overwriting any existing
    // `Authorization` custom headers you have set using `headers`.
    /*auth: {
        username: '',
        password: ''
    },*/

    // `responseType` indicates the type of data that the server will respond with
    // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default

    // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
    // xsrfCookieName: 'XSRF-TOKEN', // default

    // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
    // xsrfHeaderName: 'X-XSRF-TOKEN', // default

    // `onUploadProgress` allows handling of progress events for uploads
    /*onUploadProgress: function (progressEvent) {
        // Do whatever you want with the native progress event
    },*/

    // `onDownloadProgress` allows handling of progress events for downloads
    /*onDownloadProgress: function (progressEvent) {
        // Do whatever you want with the native progress event
    },*/

    // `maxContentLength` defines the max size of the http response content allowed
    // maxContentLength: 2000,

    // `validateStatus` defines whether to resolve or reject the promise for a given
    // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
    // or `undefined`), the promise will be resolved; otherwise, the promise will be
    // rejected.
    /*validateStatus: function (status) {
        return status >= 200 && status < 300; // default
    },*/

    // `maxRedirects` defines the maximum number of redirects to follow in node.js.
    // If set to 0, no redirects will be followed.
    // maxRedirects: 5, // default
    maxRedirects: 0, // default

    // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
    // and https requests, respectively, in node.js. This allows to configure options like
    // `keepAlive` that are not enabled by default.
    // httpAgent: new http.Agent({ keepAlive: true }),
    // httpsAgent: new https.Agent({ keepAlive: true }),

    // 'proxy' defines the hostname and port of the proxy server
    // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and supplies credentials.
    // This will set an `Proxy-Authorization` header, overwriting any existing `Proxy-Authorization` custom headers you have set using `headers`.
    /*proxy: {
        host: '127.0.0.1',
        port: 9000,
        auth: : {
            username: 'mikeymike',
            password: 'rapunz3l'
        }
    },*/

    // `cancelToken` specifies a cancel token that can be used to cancel the request
    // (see Cancellation section below for details)
    /*cancelToken: new CancelToken(function (cancel) {
    })*/
});
//参考 https://www.mmxiaowu.com/article/589af8cde9be1c5b21ef8e9c
//拦截发起请求时
instance.interceptors.request.use(config => {
    // if(process.env.MOCK_ON) console.log(`request: ${config.url}`);
    return config
}, error => {
    return Promise.reject(error) //扶正发起请求时发生的错误并返回
})

instance.interceptors.response.use(response => {
    if(process.env.MOCK_ON) console.log(`request: ${response.config.url} response: \n`,response.data);
    return response
}, error => {
    // 这里我们把错误信息扶正, 后面就不需要写 catch 了
    // console.log(error)
    // console.log(error.response)
    return Promise.resolve(error.response)
})
export default instance;
