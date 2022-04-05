const $ = {
    range(startOrLength: number, end?: number): number[] {
        let length = Math.abs((end || 0) - startOrLength);

        if (length === startOrLength) {
            return [...Array(length).keys()];
        } else {
            return [...Array(length + 1).keys()].map((m) => m + startOrLength);
        }
    },
    size(object: Array<any> | string | any | Function): number {
        if (object instanceof Function) {
            object = object.apply();
        }

        if (object === null || object === undefined) {
            return 0;
        }

        if (typeof object === 'string') {
            return object.length;
        }

        if (object instanceof Array) {
            return [].slice.call(object).length;
        }

        return Object.keys(object).length;
    },
    has(obj: any, prop: string): boolean {
        if (prop.indexOf('.') === -1) {
            return !!obj && Object.prototype.hasOwnProperty.call(obj, prop);
        } else {
            let paths = prop.split('.'),
                _obj = obj && obj[paths.shift()];

            return !!_obj && $.has(_obj, paths.join('.'));
        }
    },
    isNil(obj: any): obj is null {
        return $.isNull(obj) || $.isUndefined(obj);
    },
    isNull(obj: any): obj is null {
        return obj === null || ($.isObject(obj) && $.size(obj) === 0);
    },
    isUndefined(value: any): value is undefined {
        return typeof value === 'undefined';
    },
    isNumber(value: any): value is Number {
        return typeof value === 'number' && !isNaN(value);
    },
    isString(value: any): value is String {
        return typeof value === 'string' || value instanceof String;
    },
    isBoolean(value: any): value is boolean {
        return typeof value === 'boolean';
    },
    isFunction(value: any): value is Function {
        return typeof value === 'function';
    },
    isRegExp(value: any): value is RegExp {
        return value && typeof value === 'object' && value.constructor === RegExp;
    },
    isEmpty(object: any) {
        if ($.isObject(object)) {
            return !Object.keys(object).length;
        } else if (object instanceof Array || typeof object === 'string') {
            return ![].slice.call(object).length;
        }

        return true;
    },
    escape: (string: string) => {
        /** Used to map characters to HTML entities. */
        let htmlEscapes: {
            [key: string]: string
        } = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '\'': '&#39;'
        };

        return (string || '').replace(/[&<>"']/g, (chr: string) => htmlEscapes[chr]);
    },
    unescape: (string: string) => {
        /** Used to map characters to HTML entities. */
        let htmlUnescapes: {
            [key: string]: string
        } = {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#39;': '\''
        };

        return (string || '').replace(/&(?:amp|lt|gt|quot|#39);/g, (chr: string) => htmlUnescapes[chr]);
    },
    isObject(object: any): object is Object {
        return object && typeof object === 'object' && object.constructor === Object;
    },
    cloneObject(obj: any): any {
        if (!$.isNull(obj)) {
            if ($.isArray(obj)) {
                let clone = [];

                obj.forEach((value: any, k: number) => {
                    clone.push($.cloneObject(value));
                });

                return clone;
            } else if ($.isObject(obj)) {
                let clone = {};

                $.objectForEach(obj, (key: string, value: any) => {
                    $.set(clone, key, $.cloneObject(value));
                });

                return clone;
            }
        } else if ($.isObject(obj)) {
            return {};
        }

        return obj;
    },
    isArray(object: any): object is any[] {
        return object && Array.isArray(object) && typeof object === 'object' && object.constructor === Array;
    },
    isDate(date: any): date is Date {
        return date instanceof Date && !isNaN(date.getTime()) ? true : false;
    },
    get(object: any | undefined, path: Array<string> | string, defaultVal?: any): any {
        let _path = Array.isArray(path) ? path : (path || '').split('.').filter((i) => i.length);

        if (object === undefined) {
            return undefined;
        }

        if (!_path.length) {
            return object === undefined ? defaultVal : object;
        }

        return $.get(object[_path.shift() || -1], _path, defaultVal);
    },
    extend(to: any, from: any): any {
        Object.assign(to, from);
    },
    omit(object: any, path: Array<string> | string): any {
        let _path = Array.isArray(path) ? path : (path || '')
            .split('.').filter((i) => i.length),
            child: string = _path.shift() || '';

        if (!$.isNull(object)) {
            if (_path.length) {
                if (object[child] instanceof Object) {
                    $.omit(object[child], _path);
                }
            } else {
                delete object[child];
            }
        }

        return object;
    },
    set(object: any, path: Array<string> | string, value: any): any {
        let _path = Array.isArray(path) ? path : (path || '')
            .split('.').filter((i) => i.length),
            child: string = _path.shift() || '';

        if (object !== null && object !== undefined) {
            if (_path.length) {
                if (!$.has(object, child)) {
                    object[child] = {};
                }

                if (object[child] instanceof Object) {
                    $.set(object[child], _path, value);
                }
            } else {
                object[child] = value;
            }
        }

        return object;
    },
    update(object: any, path: Array<string> | string, value: any): any {
        let _path = Array.isArray(path) ? path : (path || '')
            .split('.').filter((i) => i.length),
            child: string = _path.shift() || '';

        if (object !== null && object !== undefined) {
            if (_path.length) {
                if (!$.has(object, child)) {
                    object[child] = {};
                }

                if (object[child] instanceof Object) {
                    $.update(object[child], _path, value);
                }
            } else {
                if (!$.isObject(value)) {
                    if (value === null) {
                        $.omit(object, child);
                    } else {
                        $.set(object, child, value);
                    }
                } else {
                    $.objectForEach(value, (k: string, v: any) => {
                        if (v === null) {
                            $.omit(object, `${child}.${k}`);
                        } else {
                            $.set(object, `${child}.${k}`, v);
                        }
                    });
                }
            }
        }

        return object;
    },
    merge(object: any, source: any, over: boolean = false): any {
        $.objectForEach(source, (key: string, value: any) => {
            let override = $.get(object, key);

            if (override === null || override == undefined || (over && !$.isObject(override))) {
                $.set(object, key, value);
            } else if (override instanceof Object) {
                $.merge(override, value);
            }
        });

        return object;
    },
    keys(object: Array<any> | string | any | Function): string[] {
        if (object instanceof Function) {
            object = object.apply();
        }

        if (object instanceof Array || typeof object === 'string') {
            return [].slice.call(object).map((v: any, i: number) => Number(i));
        }

        if ($.isObject(object)) {
            return Object.keys(object);
        }

        return [];
    },
    values(object: Array<any> | string | any | Function): any[] {
        if (object instanceof Function) {
            object = object.apply();
        }

        if (object instanceof Array || typeof object === 'string') {
            return [].slice.call(object).map((v: any, i: number) => v);
        }

        return $.keys(object).map((k: string) => object[k]);
    },
    pathsOfObject(object: any): string[] {
        if ($.isObject(object)) {
            let $paths = [],
                nodes = [{
                    obj: object,
                    path: []
                }];

            while (nodes.length > 0) {
                let n = nodes.pop();

                $.objectForEach(n.obj, (k: string, value: any) => {
                    if ($.isObject(value)) {
                        let path = n.path.concat(k);

                        $paths.push(path);

                        nodes.unshift({
                            obj: value,
                            path
                        });
                    }
                });
            }

            return $paths
                .map((paths: Array<string>) => paths.join('.'));
        }

        return [];
    },
    objectForEach: (source: any, callback: (key: string, value: any) => void) => {
        if ($.isObject(source)) {
            Object.keys(source).forEach((key: string) => callback.apply(source, [key, source[key]]));
        }
    },
    toJS: (object: any) => {
        if (object instanceof Function) {
            object = object.apply();
        }

        return $.isObject(object) ? JSON.parse(JSON.stringify(object)) : (Object as any).assign({}, object);
    },
    find(source: any, callback: (value: any, index: number) => any): any {
        return [].slice.call(source).filter(callback)[0];
    },
    isNullOrEmpty(target: any): target is null {
        return (target === undefined || target === null || target.length == 0);
    },
    hierarchy(items: Array<any>, childProp: string, parent?: any) {
        if (!items || items.length == 0 || !childProp) {
            return items;
        } else {
            let $hier = [];

            items.forEach((item: any) => {
                $hier.push(item);

                if (!$.has(item, '$h')) {
                    $.extend(item, {
                        $h: {
                            collapse: true,
                            parent: parent || null,
                            childs: item[childProp] || []
                        }
                    });

                    // get rank of item
                    Object.defineProperty(item.$h, 'rank', {
                        get() {
                            const $rank = (item: any) => {
                                if (item.$h.parent === null) {
                                    return 0;
                                } else {
                                    return 1 + $rank(item.$h.parent);
                                }
                            };

                            return $rank(item);
                        }
                    });

                    // get root of item
                    Object.defineProperty(item.$h, 'root', {
                        get() {
                            const $root = (item: any) => {
                                if (item.$h.parent === null) {
                                    return item;
                                } else {
                                    return $root(item.$h.parent);
                                }
                            };

                            return $root(item);
                        }
                    });

                    Object.defineProperty(item.$h, 'show', {
                        get() {
                            const $collapse = (item: any) => {
                                if (item.$h.parent === null) {
                                    return true;
                                } else {
                                    if (!item.$h.parent.$h.collapse) {
                                        return false;
                                    } else {
                                        return $collapse(item.$h.parent);
                                    }
                                }
                            };

                            return $collapse(item);
                        }
                    });
                }

                if ($.isArray(item[childProp])) {
                    $hier = [...$hier, ...$.hierarchy(item[childProp], childProp, item)];
                }
            });

            return $hier;
        }
    }
};

export { $, $ as obj };