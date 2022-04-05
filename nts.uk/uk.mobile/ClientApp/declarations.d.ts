import Vue, { ComponentOptions } from "vue";
import { ErrorHandler } from "vue-router/types/router";

declare interface Window {
    Reflect: any;
}

interface IFetchOption {
    url: string;
    type?: 'url' | 'form' | 'json';
    method: 'get' | 'post' | 'push' | 'patch' | 'delete';
    data?: any;
    headers?: any;
}

declare interface IRule {
    loop?: boolean;
    validate?: boolean;
    required?: boolean;
    min?: number | Date;
    max?: number | Date;
    mantissaMaxLength?: number;
    minLength?: number;
    maxLength?: number;
    timeRange?: boolean;
    dateRange?: boolean;
    constraint?: string;
    charType?: 'Any' | 'Kana' | 'AnyHalfWidth' | 'AlphaNumeric' | 'Numeric';
    valueType?: 'String' | 'Decimal' | 'Integer' | 'HalfInt' | 'Date' | 'Time' | 'Clock' | 'Duration' | 'TimePoint' | 'TimeRange' | 'DateRange';
    [rule: string]: Array<Date | number | string> | Date | number | boolean | IRule | string | Function | {
        test: RegExp | Function;
        message: string | Array<string | { [key: string]: string }>;
    } | {
        test: RegExp | Function;
        messageId: string | Array<string | { [key: string]: string }>;
    };
}

declare interface IModalOptions {
    type?: 'modal' | 'popup' | 'info' | 'dropback';
    size?: 'lg' | 'md' | 'sm' | 'xs';
    title?: string;
    style?: string;
    animate?: 'up' | 'right' | 'down' | 'left';
    opacity?: number;
}

declare interface IValidations {
    [name: string]: IValidations | IRule
}

declare module "vue/types/options" {
    interface ComponentOptions<V extends Vue> {
        route?: string | {
            url: string;
            parent?: string;
        };
        style?: string;
        resource?: {
            [lang: string]: {
                [resources: string]: string;
            }
        };
        validations?: {
            [name: string]: IRule | IValidations;
        },
        markdown?: string | {
            [lang: string]: string;
        };
        constraints?: Array<string>;
        enums?: Array<string>;
    }
}

declare module "*.json" {
    const value: any;
    export default value;
}

declare module "vue/types/vue" {
    interface Vue {
        pgName: string;
        readonly $valid: boolean;
        readonly $http: {
            get(url: string): Promise<{}>;
            get(pg: 'at' | 'pr' | 'hr' | 'com', url: string): Promise<{}>;
            post(url: string, data?: any): Promise<{}>;
            post(pg: 'at' | 'pr' | 'hr' | 'com', url: string, data?: any): Promise<{}>;
            file: {
                live: (fileId: string) => string;
                upload: (form: FormData) => Promise<{}>;
                download: (fileId: string) => Promise<{}>;
            },
            async: {
                info: (taskId: string) => Promise<{}>;
                cancel: (taskId: string) => Promise<{}>;
            },
            enum(enumNames?: Array<String>): Promise<{}>;
            readonly resources: Promise<{}>;
        };
        readonly $auth: {
            login: (data: any) => Promise<{}>;
            logout: () => Promise<{}>;
            readonly user: Promise<null | {
                employee: boolean;
                companyId: string;
                employeeId: string;
                companyCode: string;
                employeeCode: string;
                constractCode: string;
                role: {
                    payroll: string;
                    personnel: string;
                    attendance: string;
                    systemAdmin: string;
                    companyAdmin: string;
                    personalInfo: string;
                    officeHelper: string;
                    groupCompanyAdmin: string;
                }
            }>;
            readonly token: Promise<string>;
            readonly contract: Promise<null | { code: string; password: string }>;
        };
        $i18n: {
            (resr: string): string;
            (resr: string, param: string): string;
            (resr: string, param: string[]): string;
            (resr: string, param: { [key: string]: string }): string;
        };
        $close: {
            (): void;
            (data: any): void;
        };
        $mask: {
            (act: 'hide'): void;
            (act: 'show', opacity?: number): {
                on: (click: () => void, hide?: () => void) => void;
            };
            (act: 'show', options: { opacity?: number; message?: boolean | string; }): {
                on: (click: () => void, hide?: () => void) => void;
            };
        };
        readonly $dt: {
            readonly now: Date;
            (value: Date, format?: string): string;
            readonly interval: {
                (intv: number): void;
            };
            readonly date: {
                (value: Date): string;
                (value: Date, format: string): string;
            };
            readonly fromString: {
                (value: string): Date;
                (value: string, format: string): Date;
            };
            readonly fromUTCString: {
                (value: string, format: string): Date;
            };
            readonly timewd: {
                (value: number): string;
            };
            readonly timedr: {
                (value: number): string;
            };
            readonly timept: {
                (value: number): string;
            };
            readonly yearmonth: {
                (value: number): string;
                (value: number, format: string): string;
            };
        }
        $goto: {
            (name: string): Promise<{}>;
            (name: string, params: { [key: string]: any; }): Promise<{}>;
            (location: { name: string, params?: { [key: string]: any; } }): Promise<{}>;
            home(): Promise<{}>;
            home(params: any): Promise<{}>;
            login(): Promise<{}>;
            login(params: any): Promise<{}>;
            password: {
                change(): Promise<{}>;
                change(params: any): Promise<{}>;
                forget(): Promise<{}>;
                forget(params: any): Promise<{}>;
                reset(): Promise<{}>;
                reset(params: any): Promise<{}>;
                mail(): Promise<{}>;
                mail(params: any): Promise<{}>;
            }
        };
        $modal: {
            (name: string): Promise<{}>;
            (name: string, params: any): Promise<{}>;
            (name: string, params: any, options: IModalOptions): Promise<{}>;
            (component: VueConstructor<Vue>): Promise<{}>;
            (component: VueConstructor<Vue>, params: any): Promise<{}>;
            (component: VueConstructor<Vue>, params: any, options: IModalOptions): Promise<{}>;
            (component: ComponentOptions<Vue>): Promise<{}>;
            (component: ComponentOptions<Vue>, params: any): Promise<{}>;
            (component: ComponentOptions<Vue>, params: any, options: IModalOptions): Promise<{}>;
            warn: {
                (msg: string): Promise<{}>;
                (resource: { messageId: string, messageParams?: string[] | { [key: string]: string } }): Promise<{}>;
            };
            info: {
                (msg: string): Promise<{}>;
                (resource: { messageId: string, messageParams?: string[] | { [key: string]: string } }): Promise<{}>;
            };
            error: {
                (msg: string): Promise<{}>;
                (resource: { messageId: string, messageParams?: string[] | { [key: string]: string } }): Promise<{}>;
            };
            confirm: {
                (msg: string, style?: 'normal' | 'process' | 'danger'): Promise<'yes' | 'no'>;
                (resource: { messageId: string, messageParams?: string[] | { [key: string]: string } }, style?: 'normal' | 'process' | 'danger'): Promise<'yes' | 'no'>;
            }
        };
        $picker: {
            (value: { [key: string]: any },
                dataSources: { [key: string]: any[] },
                options?: {
                    text?: string;
                    value?: string;
                    title?: string;
                    required?: boolean;
                    className?: 'clock' | 'time' | 'time-day';
                    onSelect?: (selects: { [key: string]: any }, pkr: { title: string; dataSources: { [key: string]: any[] } }) => void;
                }): Promise<{}>;
            (value: { [key: string]: any },
                dataSources: { [key: string]: any[] },
                onSelect: (selects: { [key: string]: any }, pkr: { title: string; dataSources: { [key: string]: any[] } }) => void,
                options?: {
                    text?: string;
                    value?: string;
                    title?: string;
                    required?: boolean;
                    className?: 'clock' | 'time' | 'time-day';
                }): Promise<{}>;
        };
        readonly $errors: {
            [name: string]: {
                [rule: string]: string;
            }
        };
        $validate: {
            (): void;
            (act: 'clear'): void;
            (name: string): boolean;
        };
        $updateValidator: {
            (): void;
            (rule: IRule): void;
            (name: string, rule: IRule): void;
        };
        readonly validations: {
            [name: string]: IRule;
        };
        toJS: (value: any) => any;
    }

    export interface VueConstructor<V extends Vue = Vue> {
        util: {
            defineReactive: (obj: any, key: string, val: any) => void;
            extend: (to: any, from: any) => any;
        };
        toJS: (value: any) => any;
        vmOf: (el: HTMLElement) => { [key: string]: any; };
    }
}

declare module "vue-router/types/router" {
    export interface VueRouter {
        goto: {
            (location: { name: string }): Promise<{}>;
            (location: { name: string; params?: { [key: string]: any } }): Promise<{}>;
            home(): Promise<{}>;
            home(params: any): Promise<{}>;
            login(): Promise<{}>;
            login(params: any): Promise<{}>;
            password: {
                change(): Promise<{}>;
                change(params: any): Promise<{}>;
                forget(): Promise<{}>;
                forget(params: any): Promise<{}>;
                reset(): Promise<{}>;
                reset(params: any): Promise<{}>;
                mail(): Promise<{}>;
                mail(params: any): Promise<{}>;
            }
        }
    }
}

export declare type VueClass<V> = {
    new(...args: any[]): V & Vue;
} & typeof Vue;