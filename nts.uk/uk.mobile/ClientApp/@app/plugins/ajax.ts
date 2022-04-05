import { $, obj, auth } from '@app/utils';
import { moment, Vue, VueConstructor } from '@app/provider';

import { $dialog } from '@app/plugins/dialog';

interface IFetchOption {
    url: string;
    type?: 'url' | 'form' | 'json';
    method: 'get' | 'post' | 'push' | 'patch' | 'delete';
    data?: any;
    headers?: any;
    pg?: 'at' | 'pr' | 'com' | 'hr';
    responseType?: 'blob' | 'arraybuffer' | 'document' | 'json' | 'text' | null;
    prefixUrl?: 'webapi' | string;
}

const WEB_APP_NAME = {
    at: 'nts.uk.at.web',
    pr: 'nts.uk.pr.web',
    hr: 'nts.uk.hr.web',
    com: 'nts.uk.com.web'
}, ajax = {
    install(vue: VueConstructor<Vue>, prefixUrl: string) {
        const fetch = function (opt: IFetchOption, self?: Vue) {
            return new Promise(function (resolve, reject) {
                if (!$.isObject(opt)) {
                    reject('No required parameters - "url" and "method".');

                    return;
                }

                if ($.isEmpty(opt.url)) {
                    reject('Parameter "url" is required.');

                    return;
                } else {
                    let env: { API_URL?: string } = process.env,
                        hostName: string = window.location.origin;

                    $.extend(opt, {
                        url: (`${hostName.indexOf(':3000') > -1 ? (env.API_URL || hostName.replace(/:3000/, ':8080')) : ''}/${WEB_APP_NAME[opt.pg || 'com']}/${opt.prefixUrl || 'webapi'}/${opt.url}`).replace(/([^:]\/)\/+/g, '$1')
                    });
                }

                if ($.isEmpty(opt.method)) {
                    reject('Parameter "method" is required.');

                    return;
                }

                if (!opt.type) {
                    opt.type = 'json';
                }

                const xhr = new XMLHttpRequest(),
                    parseData = () => {
                        if (opt.type) {
                            switch (opt.type.toLowerCase()) {
                                case 'form':
                                    setHeaders({ 'Content-Type': 'multipart/form-data' });

                                    return Object.prototype.toString.call(opt.data) === '[object FormData]' ? opt.data : new FormData(opt.data);
                                case 'url':
                                    setHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

                                    return JSON.stringify(opt.data);
                                case 'json':
                                    setHeaders({ 'Content-Type': 'application/json' });

                                    return isJSON(opt.data) ? opt.data : JSON.stringify(opt.data).replace(/^"|"$/g, '');
                                default:
                                    return opt.data;
                            }
                        }
                    }, setHeaders = (headers: any) => {
                        $.objectForEach(headers, (header: string, value: any) => {
                            xhr.setRequestHeader(header, value);
                        });
                    }, isJSON = (json: string) => {
                        try {
                            JSON.parse(json);

                            return true;
                        } catch (e) {
                            return false;
                        }
                    }, parseHeaders = (xhr: XMLHttpRequest) => {
                        return function () {
                            let raw = xhr.getAllResponseHeaders();

                            return headersParser(raw);
                        };
                    }, headersParser = (rawHeaders: string) => {
                        let headers: any = {};

                        if (!rawHeaders) {
                            return headers;
                        }

                        let headerPairs = rawHeaders.split('\u000d\u000a');

                        for (let i = 0; i < headerPairs.length; i++) {
                            let headerPair = headerPairs[i];
                            // Can't use split() here because it does the wrong thing
                            // if the header value has the string ": " in it.
                            let index = headerPair.indexOf('\u003a\u0020');

                            if (index > 0) {
                                let key = headerPair.substring(0, index),
                                    val = headerPair.substring(index + 2);

                                headers[key] = val;
                            }
                        }

                        return headers;
                    };

                xhr.open(opt.method, opt.url, true);

                /** use CORS for develop */
                xhr.withCredentials = true;

                if (opt.data) {
                    opt.data = parseData();
                }

                if (opt.headers) {
                    setHeaders(opt.headers);
                }

                // authentication 
                setHeaders({
                    'MOBILE': 'true',
                    'PG-Path': window.location.href,
                    'X-CSRF-TOKEN': auth.token
                });

                if (opt.responseType) {
                    xhr.responseType = opt.responseType;
                }

                xhr.onerror = function () {
                    reject(xhr);
                };

                xhr.onload = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        try {
                            let response: { [key: string]: any } = JSON.parse(xhr.response);

                            if (response.businessException) {
                                // if (self) {
                                //     self.$modal($dialog(), {
                                //         message: xhr.response
                                //     }, {
                                //             title: xhr.responseText
                                //         }).then(f => {
                                //             reject(response);
                                //         });
                                // } else {
                                reject(response);
                                // }
                            } else {
                                resolve({ data: response, headers: parseHeaders(xhr) });
                            }
                        } catch (e) {
                            resolve({ data: xhr.response, headers: parseHeaders(xhr) });
                        }

                    } else if (xhr.readyState === 4 && xhr.status === 204) {
                        resolve({ data: {}, headers: parseHeaders(xhr) });
                    } else {
                        if (self) {
                            if (xhr.status == 401) {
                                // Unauthorize
                                self.$goto.login();
                            } else {
                                self.$modal($dialog(),
                                    {
                                        message: xhr.response
                                    }, {
                                    title: 'Business exception'
                                })
                                    .then(() => {
                                        reject(xhr);
                                    });
                            }
                        } else {
                            reject(xhr);
                        }
                    }
                };

                xhr.send(opt.data);
            });
        };

        Object.defineProperty(vue, 'fetch', { value: fetch });

        vue.mixin({
            beforeCreate() {
                let self = this;

                obj.extend(self, {
                    $http: {
                        get: function (pg: 'at' | 'com' | 'pr' | string, url: string) {
                            if (pg === 'at' || pg === 'com' || pg === 'pr') {
                                return fetch({ pg, url, method: 'get', prefixUrl }, self);
                            } else {
                                return fetch({ pg: 'com', url: pg, method: 'get', prefixUrl }, self);
                            }
                        }.bind(self),
                        post: function (pg: 'at' | 'com' | 'pr' | string, url?: string | any, data?: any) {
                            if (pg === 'at' || pg === 'com' || pg === 'pr') {
                                return fetch({ pg, url, data, method: 'post', prefixUrl }, self);
                            } else {
                                return fetch({ pg: 'com', url: pg, data: url, method: 'post', prefixUrl }, self);
                            }
                        }.bind(self),
                        async: {
                            info: function (taskdId: string) {
                                return fetch({
                                    prefixUrl,
                                    method: 'post',
                                    url: '/ntscommons/arc/task/async/info/' + taskdId
                                }, self);
                            }.bind(self),
                            cancel: function (taskdId: string) {
                                return fetch({
                                    prefixUrl,
                                    method: 'post',
                                    url: '/ntscommons/arc/task/async/requesttocancel/' + taskdId
                                }, self);
                            }.bind(self)
                        },
                        file: {
                            live: function (fileId: string) {

                            }.bind(self),
                            delete: function (fileId: string) {
                                return fetch({
                                    prefixUrl,
                                    method: 'post',
                                    url: `/shr/infra/file/storage/delete/${fileId}`
                                }, self);
                            }.bind(self),
                            upload(form: FormData) {
                                /// nts.uk.com.web/webapi/ntscommons/arc/filegate/upload
                            },
                            download: function (fileId: string) {
                                return fetch({
                                    prefixUrl,
                                    method: 'get',
                                    responseType: 'blob',
                                    url: `/shr/infra/file/storage/get/${fileId}`
                                }, self).then((resp: { data: any, headers: any }) => {
                                    const blob = resp.data,
                                        fileName = resp.headers.fileName,
                                        link = document.createElement('a');

                                    link.href = URL.createObjectURL(blob);
                                    link.download = fileName;

                                    link.click();
                                }).catch((reason: any) => {
                                    console.log(reason);
                                });
                            }.bind(self)
                        },
                        enum: function (enums?: Array<String>) {
                            enums = enums || self.$options.enums;

                            if (enums && enums.length > 0) {
                                return self.$http.post('/enums/map', enums);
                            }

                            return new Promise((resolve) => resolve([]));
                        }.bind(self)
                    }
                });

                // get all resources on serve
                Object.defineProperty(self.$http, 'resources', {
                    get() {
                        let rapi: string = '/i18n/resources/mobile/get',
                            https: Array<Promise<{}>> = [0, 1, 2, 3, 4].map((m: number) => self.$http.get(`${rapi}/${m}`));

                        return new Promise((resolve) => {
                            Promise.all(https).then((responses: any[]) => {
                                resolve(Object.assign({}, ...responses.map((resp) => resp.data)));
                            });
                        });
                    }
                });
            }
        });
    }
};

Vue.use(ajax, 'webapi');