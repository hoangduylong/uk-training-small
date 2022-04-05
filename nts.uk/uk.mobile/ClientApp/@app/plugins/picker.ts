import { obj, dom, $ } from '@app/utils';
import { Vue, VueConstructor } from '@app/provider';
import { MobilePicker } from '@app/components/picker';

const vm = Vue
    .extend(MobilePicker)
    .extend({
        methods: {
            destroyPicker() {
                this.$destroy(true);
            }
        },
        destroyed() {
            document.body.removeChild(this.$el);
        },
        computed: {
            className() {
                return `plugin ${this.options.className}`.trim();
            }
        },
        beforeMount() {
            // remove all tabindex of item below modal-backdrop
            let inputs = document.querySelectorAll('a, input, select, button, textarea');

            [].slice.call(inputs).forEach((element: HTMLElement) => {
                if (!element.getAttribute('data-tabindex')) {
                    let tabindex = element.getAttribute('tabindex');

                    element.setAttribute('tabindex', '-1');

                    if (tabindex) {
                        element.setAttribute('data-tabindex', tabindex);
                    }
                }
            });
        },
        beforeDestroy() {
            // restore all tabindex of item below modal-backdrop
            let inputs = document.querySelectorAll('a, input, select, button, textarea');

            [].slice.call(inputs).forEach((element: HTMLElement) => {
                let tabindex = element.getAttribute('data-tabindex');

                element.removeAttribute('data-tabindex');

                if (!tabindex) {
                    element.removeAttribute('tabindex');
                } else {
                    element.setAttribute('tabindex', tabindex);
                }
            });
        }
    }), picker = {
        install(vue: VueConstructor<Vue>) {
            vue.prototype.$picker = function (value: string | number | Date | { [key: string]: string | number | Date },
                // tslint:disable-next-line: align
                dataSources: Array<string | number | Date> | { [key: string]: Array<string | number | Date> },
                // tslint:disable-next-line: align
                onSelect: Function,
                // tslint:disable-next-line: align
                options: {
                    text: string;
                    value: string;
                    required?: boolean;
                    onSelect?: Function;
                    title?: string;
                } = { text: 'text', value: 'value', required: false }) {
                let self = this,
                    focused = document.querySelector(':focus') as HTMLElement;

                value = obj.cloneObject(value);
                options = obj.cloneObject(options);
                dataSources = obj.cloneObject(dataSources);

                if (!$.isFunction(onSelect) && $.isObject(onSelect)) {
                    options = onSelect;
                }

                obj.merge(options, { text: 'text', value: 'value', required: false });

                return new Promise((resolve) => {
                    let Picker = new vm(),
                        pkr = dom.create('div');

                    document.body.appendChild(pkr);

                    Picker.$mount(pkr);

                    Picker.title = options.title;
                    Picker.value = obj.cloneObject(value);
                    Picker.options = obj.cloneObject(options);
                    Picker.dataSources = obj.cloneObject(dataSources);

                    Picker.$nextTick(() => {
                        Picker.show = true;
                    });

                    Picker
                        .$on('select', (value) => {
                            if ($.isFunction(onSelect)) {
                                onSelect.apply(self, [obj.cloneObject(value), Picker]);
                            } else if (obj.isFunction(options.onSelect)) {
                                options.onSelect.apply(self, [obj.cloneObject(value), Picker]);
                            }
                        })
                        .$on('close', () => {
                            resolve();
                            focused && focused.focus();
                        })
                        .$on('remove', () => {
                            resolve(null);
                            focused && focused.focus();
                        })
                        .$on('finish', (value: any) => {
                            resolve(value);
                            focused && focused.focus();
                        });
                });
            };
        }
    };


Vue.use(picker);
