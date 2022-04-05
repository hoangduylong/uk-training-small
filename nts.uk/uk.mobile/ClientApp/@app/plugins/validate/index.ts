import { IRule } from 'declarations';
import { Vue, VueConstructor } from '@app/provider';

import { $, dom, TimeDuration, TimeWithDay } from '@app/utils';
import * as validators from '@app/plugins/validate/validators';

const DIRTY = 'dirty',
    defReact = Vue.util.defineReactive,
    validate = {
        install(vue: VueConstructor<Vue>) {
            const isRule = (rule: IRule) => {
                rule = Vue.toJS(rule);

                return !!$.values(rule).map((r) => {
                    if ($.isObject(r)) {
                        let keys = $.keys(r);

                        if (keys.length == 2 && keys.indexOf('test') > -1 && keys.indexOf('message') > -1) {
                            return true;
                        }

                        return false;
                    }

                    return true;
                }).filter((m) => !m).length;
            }, updateValidator = function (rule: IRule): any {
                // tslint:disable-next-line: no-this-assignment
                let validations: IRule = this;

                $.objectForEach(rule, (key: string, value: IRule) => {
                    if (isRule(value)) {
                        updateValidator.apply((validations[key] || (validations[key] = {})), [value]);
                    } else {
                        $.objectForEach(value, (k: string, r: any) => {
                            if (!$.isNull(r)) {
                                (validations[key] || (validations[key] = {}))[k] = r;
                            } else if (validations[key]) {
                                delete validations[key][k];
                            }
                        });
                    }
                });

                return validations;
            }, paths = (model: any) => {
                return $.pathsOfObject(model)
                    .filter((path: string) => !(path as any).endsWith('.test'))
                    .filter((m) => {
                        let rule: IRule = $.get(model, m),
                            keysOfRule: Array<string> = $.keys(rule).filter((k) => DIRTY !== k);

                        if (keysOfRule.length == 2) {
                            return (keysOfRule.indexOf('test') == -1 && keysOfRule.indexOf('message') == -1 && keysOfRule.indexOf('messageId') == -1);
                        }

                        return true;
                    })
                    .filter((m) => {
                        let rule: IRule = $.get(model, m);

                        return $.values(rule)
                            .filter((c) => {
                                if (!$.isObject(c)) {
                                    return true;
                                } else {
                                    let keys = $.keys(c);

                                    if (keys.filter((k) => ['test', 'message', 'messageId']
                                        .indexOf(k) > -1).length == keys.length) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }
                            }).length;
                    });
            };

            vue.mixin({
                beforeCreate() {
                    let self: Vue = this,
                        validations = Vue.toJS(self.$options.validations || {});

                    // init errors & $valid obser
                    defReact(self, '$errors', {});
                    // store all watchers of validators
                    defReact(self, '$validators', {});
                    // store all validators define in decorator as react obsv
                    defReact(self, 'validations', validations);

                    // valid flag for check all validate item in view model
                    Object.defineProperty(self, '$valid', {
                        get() {
                            let rulePath = [],
                                $errors = self.toJS(self.$errors),
                                $erPaths = $.pathsOfObject($errors).sort(),
                                $isValid = (p: string) => !$.size($.get($errors, p));

                            $erPaths.forEach((p: string, i: number) => {
                                if (!$erPaths[i + 1] || $erPaths[i + 1].indexOf(p + '.') === -1) {
                                    rulePath.push(p);
                                }
                            });

                            return !rulePath.map($isValid).filter((f) => !f).length;
                        }
                    });

                    // define obser for validations
                    const errors = {};

                    paths(validations)
                        .forEach((path: string) => {
                            $.set(errors, path, {});
                        });

                    vue.set(self, '$errors', errors);

                    delete self.$options.validations;

                    if (self.$options.constraints && self.$options.constraints.length) {
                        self.$http
                            .post('/validate/constraints/map', self.$options.constraints)
                            .then((resp: { data: Array<{ [key: string]: any }> }) => {
                                paths(validations)
                                    .forEach((path: string) => {
                                        let validation: IRule = $.get(validations, path, {});

                                        if (validation.constraint) {
                                            let cstr: { [key: string]: any } = self.toJS(resp.data.filter((c) => c.name === validation.constraint)[0]);

                                            if (cstr) {
                                                ['path', 'name']
                                                    .forEach((v) => {
                                                        cstr = $.omit(cstr, v);
                                                    });

                                                if (cstr.valueType === 'String' || (cstr.minLength || cstr.maxLength)) {
                                                    if (!cstr.charType) {
                                                        cstr.charType = 'Any';
                                                    }
                                                }

                                                switch (validation.constraint) {
                                                    case 'EmployeeCode':
                                                        cstr.charType = 'EmployeeCode';
                                                        break;
                                                    case 'WorkplaceCode':
                                                        cstr.charType = 'WorkplaceCode';
                                                        break;
                                                    default:
                                                        break;
                                                }

                                                ['min', 'max', 'minLength', 'maxLength', 'mantissaMaxLength']
                                                    .forEach((v) => {
                                                        if ($.has(cstr, v)) {
                                                            if (['Decimal', 'Integer'].indexOf($.get(cstr, 'valueType')) > -1) {
                                                                $.set(cstr, v, Number($.get(cstr, v)));
                                                            } else if (['Clock'].indexOf($.get(cstr, 'valueType')) > -1) {
                                                                $.set(cstr, v, TimeWithDay.from($.get(cstr, v)).toNumber());
                                                            } else if (['Time'].indexOf($.get(cstr, 'valueType')) > -1) {
                                                                $.set(cstr, v, TimeDuration.from($.get(cstr, v)).toNumber());
                                                            } else {
                                                                // date ?
                                                            }
                                                        }
                                                    });

                                                self.$updateValidator(path, cstr);
                                            }
                                        }
                                    });

                                delete self.$options.constraints;
                            });
                    }
                },
                created() {
                    let self: Vue = this;

                    // clean error when change validation
                    self.$watch('validations', (validations: any) => {
                        validations = Vue.toJS(validations);

                        // update error object
                        let $paths = paths(validations),
                            $validators: {
                                [key: number]: {
                                    path: string;
                                    watch: (value: any) => void;
                                    unwatch: () => void;
                                }
                            } = (self as any).$validators;

                        $.objectForEach($validators, (k: string, validtor: {
                            path: string;
                            watch: (value: any) => void;
                            unwatch: () => void;
                        }) => {
                            validtor.unwatch();

                            delete $validators[k];
                        });

                        // for loop model
                        $paths.forEach((path: string) => {
                            let rule = $.get(validations, path);

                            if (rule.loop) {
                                let lid = path.lastIndexOf('.'),
                                    $lp = path.substring(0, lid),
                                    $loopModel = $.get(self, $lp);

                                if ($.isArray($loopModel)) {
                                    let $watch = $.get($loopModel, '$watch');

                                    if ($watch && $watch instanceof Function) {
                                        $watch();
                                    }

                                    $.set($loopModel, '$watch', self.$watch($lp, () => {
                                        Object.keys($loopModel)
                                            .forEach((key: string) => {
                                                if (key.match(/\$\d+/)) {
                                                    delete $loopModel[key];
                                                }
                                            });

                                        $loopModel.forEach((value: any, key: number) => {
                                            $.set($loopModel, `$${key}`, value);

                                            Object.defineProperty($loopModel, `$${key}`, {
                                                get() {
                                                    return $loopModel[key];
                                                },
                                                set(value: any) {
                                                    $loopModel[key] = value;
                                                }
                                            });
                                        });
                                    }, { deep: true, immediate: true }));
                                }
                            }
                        });

                        $paths.forEach((path: string, idx: number) => {
                            let $rule = $.get(Vue.toJS(self.validations), path, {}),
                                $watch = (path: string, path2: string, idx: number) => {
                                    let watch = function (value: any) {
                                        let errors = Vue.toJS(self.$errors),
                                            models = $.get(errors, path2),
                                            rule = $.get(Vue.toJS(self.validations), path, {}),
                                            msgkey = $.keys(models)[0];

                                        if (models === undefined) {
                                            $.set(errors, path2, {});

                                            models = $.get(errors, path2);
                                        }

                                        if (rule.validate !== false) {
                                            // re validate
                                            if (msgkey) {
                                                $.objectForEach(validators, (key: string, vldtor: (...params: any) => string) => {
                                                    if (key == msgkey) {
                                                        let params: Array<any> = $.isArray(rule[key]) ? rule[key] : [rule[key]],
                                                            message = vldtor.apply(self, [value, ...params, rule]);

                                                        if (!message) {
                                                            $.omit(models, key);
                                                        } else {
                                                            if (!$.size(models)) {
                                                                $.set(models, key, message);
                                                            }
                                                        }
                                                    }
                                                });

                                                let vldtor: Function | { test: RegExp | Function; message?: string; messageId?: string; } = rule[msgkey];

                                                if (vldtor) {
                                                    if ($.isFunction(vldtor)) {
                                                        let msgs = vldtor.apply(self, [value]);
                                                        if (msgs) {
                                                            $.set(models, msgkey, msgs);
                                                        } else {
                                                            $.omit(models, msgkey);
                                                        }
                                                    } else if ($.isFunction(vldtor.test)) {
                                                        if (!vldtor.test.apply(self, [value])) {
                                                            if (!$.size(models)) {
                                                                $.set(models, msgkey, vldtor.message || vldtor.messageId);
                                                            }
                                                        } else {
                                                            $.omit(models, msgkey);
                                                        }
                                                    } else if ($.isRegExp(vldtor.test)) {
                                                        if (value && !vldtor.test.test(value)) {
                                                            if (!$.size(models)) {
                                                                $.set(models, msgkey, vldtor.message || vldtor.messageId);
                                                            }
                                                        } else {
                                                            $.omit(models, msgkey);
                                                        }
                                                    }
                                                }
                                            }

                                            // check fixed validators
                                            $.objectForEach(validators, (key: string, vldtor: (...params: any) => string) => {
                                                if ($.has(rule, key)) {
                                                    let params: Array<any> = $.isArray(rule[key]) ? rule[key] : [rule[key]],
                                                        message = vldtor.apply(self, [value, ...params, rule]);

                                                    if (!message) {
                                                        $.omit(models, key);
                                                    } else {
                                                        if (!$.size(models)) {
                                                            $.set(models, key, message);
                                                        }
                                                    }
                                                }
                                            });

                                            // check custom validators of dev
                                            $.keys(rule)
                                                .filter((f) => $.keys(validators).indexOf(f) == -1)
                                                .forEach((key: string) => {
                                                    let vldtor: Function | { test: RegExp | Function; message?: string; messageId: string; } = rule[key];

                                                    if (vldtor) {
                                                        if ($.isFunction(vldtor)) {
                                                            let msgs = vldtor.apply(self, [value]);
                                                            if (msgs) {
                                                                $.set(models, msgkey, msgs);
                                                            } else {
                                                                $.omit(models, msgkey);
                                                            }
                                                        } else if ($.isFunction(vldtor.test)) {
                                                            if (!vldtor.test.apply(self, [value])) {
                                                                if (!$.size(models)) {
                                                                    $.set(models, key, vldtor.message || vldtor.messageId);
                                                                }
                                                            } else {
                                                                $.omit(models, key);
                                                            }
                                                        } else if ($.isRegExp(vldtor.test)) {
                                                            if (value && !vldtor.test.test(value)) {
                                                                if (!$.size(models)) {
                                                                    $.set(models, key, vldtor.message || vldtor.messageId);
                                                                }
                                                            } else {
                                                                $.omit(models, key);
                                                            }
                                                        }
                                                    }
                                                });
                                        } else {
                                            $.set(errors, path2, {});
                                        }

                                        vue.set(self, '$errors', errors);
                                    };

                                    // add new watchers
                                    $validators[idx] = {
                                        watch,
                                        path: path2,
                                        unwatch: self.$watch(path2, watch)
                                    };
                                };

                            if (!$rule.loop) {
                                $watch(path, path, (idx + 1) * 100000000);
                            } else {
                                // loop item
                                let lid = path.lastIndexOf('.'),
                                    $lp1 = path.substring(0, lid),
                                    $lp2 = path.substring(lid + 1),
                                    $loopModel = $.get(self, $lp1);

                                if ($.isArray($loopModel)) {
                                    $loopModel.forEach((v: any, k: number) => {
                                        $watch(path, `${$lp1}.$${k}.${$lp2}`, ((idx + 1) * 100000000) + k);
                                    });
                                }
                            }
                        });

                        vue.set(self, '$validators', Vue.toJS($validators));
                    }, { deep: true });

                    vue.set(self, 'validations', Vue.toJS(self.validations));

                    setTimeout(() => self.$validate('clear'), 100);
                }
            });

            vue.directive('validate', {
                update(el, binding: any) {
                    setTimeout(() => {
                        // if arg is always, skip all errors
                        if (!($.has(binding.value, 'always') && $.has(binding.value, 'errors'))) {
                            if (binding.arg !== 'always') {
                                if (el.getAttribute('disabled')) {
                                    vue.set(binding, 'value', {});
                                }
                            }

                            // toggle class css error
                            if ($.size(binding.value)) {
                                if (el.className.includes('form-control')) {
                                    dom.addClass(el, 'is-invalid');
                                } else if (el.className.includes('btn')) {
                                    dom.removeClass(el, 'btn-primary');
                                    dom.removeClass(el, 'btn-secondary');
                                    dom.addClass(el, 'btn-outline-danger');
                                } else if (el.className.includes('form-check')) {
                                    dom.addClass(el, 'form-check-danger');
                                    dom.addClass(el, 'text-danger');
                                }
                            } else {
                                if (el.className.includes('form-control')) {
                                    dom.removeClass(el, 'is-invalid');
                                } else if (el.className.includes('btn')) {
                                    dom.removeClass(el, 'btn-outline-danger');

                                    const $inp = el.querySelector('input') as HTMLInputElement;
                                    if ($inp) {
                                        if ($inp.checked) {
                                            dom.addClass(el, 'btn-primary');
                                        } else {
                                            dom.addClass(el, 'btn-secondary');
                                        }
                                    }
                                } else if (el.className.includes('form-check')) {
                                    dom.removeClass(el, 'form-check-danger');
                                    dom.removeClass(el, 'text-danger');
                                }
                            }
                        } else if ($.has(binding.value, 'always') && $.has(binding.value, 'errors')) {
                            if (!binding.value.always) {
                                if (el.getAttribute('disabled')) {
                                    vue.set(binding.value, 'errors', {});
                                }
                            }

                            // toggle class css error
                            if ($.size(binding.value.errors)) {
                                if (el.className.includes('form-control')) {
                                    dom.addClass(el, 'is-invalid');
                                } else if (el.className.includes('btn')) {
                                    dom.removeClass(el, 'btn-primary');
                                    dom.removeClass(el, 'btn-secondary');
                                    dom.addClass(el, 'btn-outline-danger');
                                } else if (el.className.includes('form-check')) {
                                    dom.addClass(el, 'form-check-danger');
                                    dom.addClass(el, 'text-danger');
                                }
                            } else {
                                if (el.className.includes('form-control')) {
                                    dom.removeClass(el, 'is-invalid');
                                } else if (el.className.includes('btn')) {
                                    dom.removeClass(el, 'btn-outline-danger');

                                    const $inp = el.querySelector('input') as HTMLInputElement;
                                    if ($inp) {
                                        if ($inp.checked) {
                                            dom.addClass(el, 'btn-primary');
                                        } else {
                                            dom.addClass(el, 'btn-secondary');
                                        }
                                    }
                                } else if (el.className.includes('form-check')) {
                                    dom.removeClass(el, 'form-check-danger');
                                    dom.removeClass(el, 'text-danger');
                                }
                            }
                        }
                    }, 5);
                }
            });

            vue.component('v-errors', {
                props: ['value', 'name'],
                template: `<div class="invalid-feedback mt-1"><span v-for="(err, k) in  value" v-bind:key="k" >{{ resource | i18n(params) }}</span></div>`,
                computed: {
                    params() {
                        let self = this,
                            value = self.value;

                        if (value) {
                            let $msg = value[Object.keys(value)[0]];

                            if (!$.isArray($msg)) {
                                return [];
                            } else {
                                return $msg.slice(1);
                            }
                        }

                        return [];
                    },
                    resource() {
                        let value = this.value;

                        if (value) {
                            let $msg = value[Object.keys(value)[0]];

                            return $.isString($msg) ? $msg : ($.isArray($msg) ? $msg[0] : '');
                        }

                        return '';
                    }
                }
            });

            // define $validate instance method
            vue.prototype.$validate = function (field?: string | 'clear') {
                let self: Vue = this,
                    errors = Vue.toJS(self.$errors);

                if (field) { // check match field name
                    if (field === 'clear') {
                        let $validators: {
                            [key: number]: {
                                path: string;
                                watch: (value: any) => void;
                                unwatch: () => void;
                            }
                        } = (self as any).$validators,
                            errors = {};

                        $.objectForEach($validators, (k: string, validator: {
                            path: string;
                            watch: (value: any) => void;
                            unwatch: () => void;
                        }) => {
                            $.set(errors, validator.path, {});
                        });

                        setTimeout(() => {
                            vue.set(self, '$errors', errors);
                        }, 100);
                    } else {
                        let mdel = $.get(self, field, null),
                            error = $.get(errors, field, null),
                            $validators: {
                                [key: number]: {
                                    path: string;
                                    watch: (value: any) => void;
                                    unwatch: () => void;
                                }
                            } = (self as any).$validators;

                        if ($.has(self, field) && error && $validators) {
                            $.objectForEach($validators, (k: string, validator: {
                                path: string;
                                watch: (value: any) => void;
                                unwatch: () => void;
                            }) => {
                                if (validator.path === field) {
                                    validator.watch(mdel);
                                }
                            });
                        }
                    }
                } else { // check all
                    let $validators: Array<{
                        path: string;
                        watch: (value: any) => void;
                        unwatch: () => void;
                    }> = (self as any).$validators;

                    $.objectForEach($validators, (k: string, validtor: {
                        path: string;
                        watch: (value: any) => void;
                        unwatch: () => void;
                    }) => {
                        validtor.watch($.get(self, validtor.path));
                    });
                }
            };

            vue.prototype.$updateValidator = function (pathOrRule?: string | IRule, rule?: Array<Date | number | string> | Date | number | boolean | IRule | {
                test: RegExp | Function;
                message: string;
            } | {
                test: RegExp | Function;
                messageId: string;
            }) {
                let self: Vue = this,
                    validations = Vue.toJS(self.validations);

                if (arguments.length === 0) {
                    vue.set(self, 'validations', validations);
                } else {
                    if (!$.isString(pathOrRule) && $.isObject(pathOrRule)) {
                        vue.set(self, 'validations', updateValidator.apply(validations, [pathOrRule]));
                    } else if ($.isString(pathOrRule) && $.isObject(rule)) {
                        $.update(validations, pathOrRule, rule);

                        vue.set(self, 'validations', validations);
                    }
                }
            };
        }
    };

Vue.use(validate);