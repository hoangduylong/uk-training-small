import { routes } from '@app/core/routes';
import { Vue, ComponentOptions } from '@app/provider';

import { $, browser } from '@app/utils';
import { resources, Language } from '@app/plugins/i18n';
import { cssbeautify } from '@app/utils/css';
import classDecorator from 'vue-class-component';

import { Prop, Watch, Model, Provide, Emit, Mixins, Inject } from 'vue-property-decorator';

declare type VueClass<V> = {
    new(...args: any[]): V & Vue;
} & typeof Vue;

const styles: Array<string> = [];

export function component(options: ComponentOptions<Vue>): any {
    return function (Component: VueClass<Vue>) {
        // inject resouce
        if (options.resource) {
            $.merge(resources, options.resource);

            delete options.resource;
        }

        (options.mixins || (options.mixins = [])).push({
            components: {
                markdown: {
                    template: `<div class="markdown-content" v-html="markdown"></div>`,
                    computed: {
                        markdown() {
                            return ($.isString(options.markdown) ? options.markdown : options.markdown[Language.current]) || '';
                        }
                    }
                }
            }
        });

        // render template 
        if (typeof options.template === 'object') {
            const { render, staticRenderFns } = (options.template as any).default;

            options.render = render;
            options.staticRenderFns = staticRenderFns;

            delete options.template;
        }

        // inject style sheet css
        if (options.style) {
            const head = document.querySelector('head'),
                $st = document.createElement('style');

            $st.setAttribute('type', 'text/css');
            $st.setAttribute('rel', 'stylesheet');

            $st.textContent = `\n${cssbeautify(options.style, {
                indent: '  ',
                openbrace: 'separate-line',
                autosemicolon: true
            })}`;

            delete options.style;

            (options.mixins || (options.mixins = [])).push({
                beforeCreate() {
                    styles.push(options.name);

                    if (styles.indexOf(options.name) > -1
                        && styles.indexOf(options.name) == styles.lastIndexOf(options.name)) {
                        if (head && $st.textContent != '') {
                            head.appendChild($st);
                        }
                    }
                },
                beforeDestroy() {
                    styles.splice(styles.indexOf(options.name), 1);

                    if (styles.indexOf(options.name) == -1) {
                        if (head && head.contains($st)) {
                            head.removeChild($st);
                        }
                    }
                }
            });
        }

        // call super decorator (vue-class-component)
        classDecorator(options)(Component);

        // initial route for component
        if (options.route) {
            if (typeof options.route === 'string') {
                let rt = $.find(routes, (r) => r.name === options.name);

                if (!rt) {
                    routes.push({
                        name: options.name,
                        path: options.route,
                        component: options,
                        props: true
                    });

                    (options.mixins || (options.mixins = [])).push({
                        created() {
                            this.pgName = options.name;
                        }
                    });
                } else {
                    console.error('Dupplicate view name: ' + options.name);
                }
            } else {
                if (options.route.parent) {
                    let rt = routes.find((r) => r.path === (options.route as any).parent);

                    if (rt) {
                        (rt.children || (rt.children = [])).push({
                            name: options.name,
                            path: options.route.url.replace(/^\/+/, ''),
                            component: options,
                            props: true
                        });
                    } else {
                        routes.push({
                            name: options.name,
                            path: `${options.route.parent}/${options.route.url}`.replace(/\/+/g, '/'),
                            component: options,
                            props: true
                        });
                    }

                    (options.mixins || (options.mixins = [])).push({
                        created() {
                            this.pgName = options.name;
                        }
                    });
                }
            }

            delete options.route;

            // use next on
            if (browser.mobile) {
                if (browser.ios) {
                    (options.mixins || (options.mixins = [])).push({
                        mounted() {
                            let cont = this.$el as HTMLElement,
                                types: string[] = ['text', 'number', 'tel', 'date', 'password'];

                            if (cont.nodeType !== 8) {
                                let input = cont.querySelector(`${types.map((m) => 'form[action="#"] input[type=' + m + ']').join(',')}, form[action="#"] textarea`) as HTMLElement;

                                if (input) {
                                    input.addEventListener('keydown', (evt: KeyboardEvent) => {
                                        if (evt.keyCode === 13) {
                                            setTimeout(() => {
                                                input.blur();
                                            }, 50);
                                        }
                                    });
                                }
                            }
                        }
                    });
                } else {
                    (options.mixins || (options.mixins = [])).push({
                        mounted() {
                            let cont = this.$el as HTMLElement,
                                types: string[] = ['text', 'number', 'tel', 'date', 'password'],
                                inputs = cont.nodeType !== 8 ? cont.querySelectorAll(`${types.map((m) => 'input[type=' + m + ']').join(',')}, textarea`) : [];

                            [].slice.call(inputs)
                                .forEach((element: HTMLElement, index: number) => {
                                    element.addEventListener('keydown', (evt: KeyboardEvent) => {
                                        if (evt.keyCode === 13) {
                                            if (!element.closest('form[action="#"]')) {
                                                let nextItem = inputs[index + 1] as HTMLElement;

                                                if (nextItem) {
                                                    nextItem.focus();

                                                    if (nextItem.closest('form[action="#"]')) {
                                                        evt.preventDefault();
                                                        evt.stopPropagation();
                                                        evt.stopImmediatePropagation();
                                                    }
                                                }
                                            } else {
                                                // hide keyboard when click go on lastest input control
                                                setTimeout(() => {
                                                    element.blur();
                                                }, 50);
                                            }
                                        }
                                    });
                                });
                        }
                    });
                }
            }
        }

        return options;
    };
}

export { Prop, Watch, Model, Provide, Emit, Mixins, Inject };