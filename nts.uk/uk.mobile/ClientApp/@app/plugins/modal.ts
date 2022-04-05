import { Vue, VueConstructor, ComponentOptions } from '@app/provider';
import { obj, dom, browser } from '@app/utils';
import { IModalOptions } from 'declarations';
import { RootApp } from '@app/core';

const modal = {
    install(vue: VueConstructor<Vue>) {
        // prevent error
        vue.mixin({
            methods: {
                $close() { }
            }
        });

        window.onpopstate = function (event: Event) {
            if (document.querySelector('.modal.show')) {
                // window.history.forward();
            }
        };

        vue.prototype.$modal = function (name: string | ComponentOptions<Vue>, params?: any, options?: IModalOptions) {
            let self = typeof name === 'string' ? this : {},
                $options = typeof name === 'string' ? self.$options : {},
                components = typeof name === 'string' ? $options.components : {},
                focused = document.querySelector(':focus') as HTMLElement;

            params = obj.toJS(params || {});

            options = options || {
                title: name,
                size: 'md',
                type: 'modal',
                opacity: 0.5
            } as IModalOptions;

            return new Promise((resolve) => {
                if (typeof name === 'string' ? components : true) {
                    let component = typeof name === 'string' ? components[name] : name;

                    if (component) {
                        // remove old mixin methods
                        [].slice.call(component.mixins || (component.mixins = [])).forEach((mixin) => {
                            if (obj.has(mixin, 'methods')) {
                                let methods = mixin.methods;

                                if (methods && obj.has(methods, '$close') && obj.has(mixin, 'mounted')) {
                                    delete mixin.methods;
                                    delete mixin.mounted;
                                }
                            }

                            if (obj.isEmpty(mixin)) {
                                component.mixins.splice(component.mixins.indexOf(mixin), 1);
                            }
                        });

                        // add new mixin methods
                        component.mixins.push({
                            methods: {
                                $close(data?: any) {
                                    this.$emit('callback', data);

                                    this.$destroy(true);
                                }
                            },
                            mounted() {
                                let el = this.$el as HTMLElement;

                                if (el.nodeType !== 8) {
                                    let header = el.querySelector('.modal-header') as HTMLElement;

                                    if (!header) {
                                        this.$emit('toggle-title', true);
                                    } else {
                                        this.$emit('toggle-title', false);

                                        let mcontent = el.closest('.modal-content');

                                        if (mcontent) {
                                            let body = mcontent.querySelector('.modal-body') as HTMLElement;

                                            if (body) {
                                                mcontent.insertBefore(header, body);
                                            } else {
                                                mcontent.append(header);
                                            }
                                        }
                                    }

                                    let footer = el.querySelector('.modal-footer') as HTMLElement;

                                    // move footer element from body to modal content
                                    if (footer) {
                                        let mcontent = el.closest('.modal-content');

                                        if (mcontent) {
                                            if (!dom.hasClass(footer, 'top')) {
                                                mcontent.append(footer);
                                            } else {
                                                let body = mcontent.querySelector('.modal-body') as HTMLElement;

                                                if (body) {
                                                    mcontent.insertBefore(footer, body);
                                                } else {
                                                    mcontent.append(footer);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        });

                        let dlg = dom.create('div'),
                            vm = RootApp.extend({
                                components: {
                                    'nts-dialog': component
                                },
                                data: () => ({ name: 'nts-dialog', params, show: false, hasTitle: true, brsize: true }),
                                computed: {
                                    title() {
                                        return options.title || (typeof name === 'string' ? name : 'nts-dialog');
                                    },
                                    $class() {
                                        let classNames: Array<string> = [];

                                        if (!options.size) {
                                            classNames.push(`modal-md`);
                                        } else {
                                            classNames.push(`modal-${options.size}`);
                                        }

                                        if (options.type === 'modal' || options.type === 'dropback' || options.type === undefined) {
                                            if (options.type === 'dropback') {
                                                classNames.push(options.type);
                                            }

                                            classNames.push('modal-dialog-scrollable');
                                        } else if (options.type === 'popup') {
                                            classNames.push('modal-popup modal-dialog-centered');
                                        } else {
                                            classNames.push('modal-popup modal-info modal-dialog-centered');
                                        }

                                        if (options.style) {
                                            classNames.push(options.style);
                                        }

                                        return classNames.join(' ');
                                    },
                                    animate() {
                                        return `fade-${options.animate || (browser.width < 576 ? 'right' : 'down')}`;
                                    }
                                },
                                methods: {
                                    callback(data) {
                                        resolve(data);

                                        this.show = false;
                                    },
                                    afterLeave() {
                                        // destroy modal app
                                        this.$destroy(true);
                                    },
                                    toggleTitle(hasTitle: boolean) {
                                        this.hasTitle = hasTitle;
                                    },
                                    clickDropback(evt: MouseEvent) {
                                        if ((evt.target as HTMLElement).querySelector('.modal-dialog.dropback')) {
                                            this.callback('dropback');
                                        }
                                    }
                                },
                                beforeMount() {
                                    // show modal backdrop
                                    if (document.querySelector('.modal-backdrop.show')) {
                                        this.$mask('show', 0.01);
                                    } else {
                                        this.$mask('show', options.opacity);
                                    }

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
                                mounted() {
                                    let self = this,
                                        resize = () => {
                                            self.brsize = browser.mobile;
                                        };

                                    resize();
                                    self.show = true;

                                    dom.data.set(self.$el, '__wzeri', resize);

                                    window.addEventListener('resize', resize);
                                },
                                beforeDestroy() {
                                    let self = this;

                                    window.removeEventListener('resize', dom.data.get(self.$el, '__wzeri'));
                                },
                                destroyed() {
                                    // remove own element on body
                                    document.body.removeChild(this.$el);

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

                                    // focus to preview item (caller of modal)
                                    if (focused) {
                                        focused.focus();
                                    }

                                    // hide own mask layer
                                    this.$mask('hide');
                                },
                                template: `<transition apear v-bind:name="animate" v-on:after-leave="afterLeave">
                                    <div class="modal show" v-show="show" v-on:click="clickDropback">
                                        <div class="modal-dialog" v-bind:class="$class">
                                            <div class="modal-content uk-bg-silver">
                                                <template v-if="hasTitle">
                                                    <div class="modal-header uk-bg-teal rounded-0" v-bind:key="hasTitle">
                                                        <h4 class="modal-title text-white">
                                                            <template v-if="brsize">
                                                                <i class="fas fa-angle-left mr-1" v-on:click="show = false" v-bind:key="'mobilesize'"></i>
                                                            </template>
                                                            <template v-else></template>
                                                            <span>{{title | i18n}}</span>
                                                        </h4>
                                                        <template v-if="!brsize">
                                                            <button tabindex="-1" v-bind:key="'desktopsize'" type="button" v-on:click="show = false" class="close btn-close">&times;</button>
                                                        </template>
                                                        <template v-else></template>
                                                    </div>
                                                </template>
                                                <template v-else></template>
                                                <component v-bind:is="name" v-bind:params="params" v-on:callback="callback" v-on:toggle-title="toggleTitle" class="modal-body" />
                                            </div>
                                        </div>
                                    </div>
                                </transition>`
                            });

                        document.body.appendChild(dlg);

                        new vm().$mount(dlg);
                    }
                }
            });
        };

        // hack view height for modal
        window.addEventListener('resize', () => {
            // We execute the same script as before
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });

        window.dispatchEvent(new Event('resize'));
    }
};

Vue.use(modal);