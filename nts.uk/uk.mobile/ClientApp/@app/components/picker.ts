import { Vue } from '@app/provider';
import { obj, dom } from '@app/utils';

import { InfinityPicker } from './infinity-picker';

export const MobilePicker = {
    components: {
        'ipkr': InfinityPicker
    },
    template: `<transition name="picker-fade" v-on:after-leave="destroyPicker">
        <div class="modal show" v-show="show">
            <div class="modal-dialog modal-md modal-popup modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body infinity-picker android" v-bind:class="className">
                        <div class="ipkr-caption" v-if="title">
                            <div class="ipkr-caption-item">{{title}}</div>
                        </div>
                        <div class="ipkr-content">
                            <ipkr v-for="(cols, idx) in dataSources" v-bind:key="idx"
                                v-model="selects[idx]"
                                v-bind:data-sources="cols"
                                v-bind:option-text="options.text"
                                v-bind:option-value="options.value"
                                v-on:input="value => onInput(value, idx)" />
                        </div>
                        <div class="ipkr-navbar">
                            <button class="btn btn-link ipkr-navbar-btn text-grey-800" ref="close" v-focus v-on:click="close">{{'cancel' | i18n}}</button>
                            <template v-if="deleteAble">
                                <button v-bind:key="'deleteAble'" class="btn btn-link ipkr-navbar-btn text-danger" v-on:click="remove">{{'remove' | i18n}}</button>
                            </template>
                            <template v-else />
                            <button class="btn btn-link ipkr-navbar-btn text-primary" v-on:click="finish">{{'accept' | i18n}}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>`,
    props: {
        show: {
            default: false
        },
        value: {
            default: () => ({})
        },
        dataSources: {
            default: () => ({})
        },
        title: {
            default: () => ''
        },
        options: {
            default: () => ({
                text: 'text',
                value: 'value',
                required: false,
                className: ''
            })
        }
    },
    data: () => ({
        selects: {}
    }),
    watch: {
        show: {
            handler(show: boolean) {
                let self = this,
                    opts = self.options,
                    defaultData = self.value;

                if (!show) {
                    if (dom.modals.length <= 1) {
                        let top = 0,
                            container = document.body.querySelector('.container-fluid') as HTMLElement;

                        if (container) {
                            top = Number((container.style.marginTop || '').replace('px', ''));
                            container.style.marginTop = '';
                        }

                        document.body.classList.remove('modal-open');

                        document.scrollingElement.scrollTop = Math.abs(top);
                    }
                } else {
                    let top = document.scrollingElement.scrollTop,
                        container = document.body.querySelector('.container-fluid') as HTMLElement;

                    dom.addClass(document.body, 'modal-open');

                    if (!container.style.marginTop) {
                        container.style.marginTop = `-${top}px`;
                    }

                    obj.objectForEach(self.dataSources, (key: string, items: any[]) => {
                        if (defaultData[key] !== undefined) {
                            self.selects[key] = defaultData[key];
                        } else {
                            self.selects[key] = items[0][opts.value];
                        }
                    });
                }
            }
        },
        dataSources: {
            deep: true,
            handler(dataSources: any[]) {
                let self = this,
                    opts = self.options;

                obj.objectForEach(dataSources, (key: string, items: any[]) => {
                    if (!obj.has(self.selects, key)) {
                        self.selects[key] = obj.has(self.value, key) ? self.value[key] : (items[0] && items[0][opts.value]);
                    }
                });
            }
        },
        selects: {
            deep: true,
            immediate: true,
            handler(value: { [key: string]: any }) {
                let self = this;

                self.$emit('select', self.toJS(value));
            }
        }
    },
    computed: {
        deleteAble() {
            return !this.options.required && !!obj.keys(obj.cloneObject(this.value)).length;
        },
        className() {
            return this.options.className;
        }
    },
    methods: {
        onInput(value: any, idx: string) {
            let self = this,
                selects = self.toJS(self.selects);

            selects[idx] = value;

            Vue.set(self, 'selects', selects);
        },
        close() {
            this.show = false;
            this.$emit('close');

            this.$nextTick(() => {
                this.selects = {};
            });
        },
        remove() {
            this.show = false;
            this.$emit('input', {});
            this.$emit('remove', {});
            this.$emit('close');

            this.$nextTick(() => {
                this.selects = {};
            });
        },
        finish() {
            this.show = false;
            this.$emit('input', obj.cloneObject(this.selects));
            this.$emit('finish', obj.cloneObject(this.selects));
            this.$emit('close');

            this.$nextTick(() => {
                this.selects = {};
            });
        },
        destroyPicker() { }
    }
};