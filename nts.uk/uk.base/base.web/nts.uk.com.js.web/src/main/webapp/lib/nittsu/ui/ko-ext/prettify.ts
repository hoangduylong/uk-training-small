module nts.uk.ui.bindings {
    declare const PR: undefined | {
        prettyPrintOne: (source: string, lang: string, line: boolean) => string;
    };

    declare const markdownit: undefined | ((options: {
        highlight: (str: string, lng: string) => string;
    }) => ({
        render: (temp: string) => string;
        renderInline: (temp: string) => string;
    }));

    const P_URL = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js';
    const M_URL = 'https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.0.4/markdown-it.min.js';

    @handler({
        bindingName: 'prettify'
    })
    export class PrettyPrintBindingHandler implements KnockoutBindingHandler {
        init(element: HTMLElement, valueAccessor: () => 'xml' | 'js', allValueAccessor: KnockoutAllBindingsAccessor) {
            const lang = valueAccessor() || 'xml';
            const value = allValueAccessor.get('code');

            let html = value || element.innerHTML
                .trim()
                .replace(/\n/g, '')
                .replace(/\]\]--\>$/g, '')
                .replace(/^\<\!--\[CDATA\[/g, '');

            $.Deferred()
                .resolve()
                .then(() => {
                    const pr = _.get(window, 'PR');

                    if (!pr) {
                        const st = $('<style>', {
                            type: 'text/css',
                            rel: 'stylesheet',
                            html: `
                            .prettyprint {
                                box-sizing: border-box;
                                background: #f5f5f5;
                                max-width: 100%;
                                padding: 5px !important;
                                margin: 10px 0;
                                border: none !important;
                                overflow: auto;
                                border-radius: 5px;
                            }
                            .prettyprint,
                            .prettyprint * {
                                font-family: Consolas;
                            }`.trim().replace(/\s{1,}/g, ' ')
                        });

                        st.appendTo(document.head);

                        return $.getScript(P_URL);
                    }

                    return pr;
                })
                .then(() => PR)
                .then(({ prettyPrintOne }) => {
                    const match = html.match(/\s{2,}/g);
                    const matctgm = (p: string, c: string) => c.length < p.length ? c : p;

                    if (match) {
                        const min = match.reduce(matctgm, match[0]);

                        html = html.replace(new RegExp(min, 'g'), '\n');
                    }

                    element.innerHTML = prettyPrintOne(_.escape(html), lang, false);

                    element.classList.add('prettyprint');
                });

            element.removeAttribute('data-bind');

            return { controlsDescendantBindings: true };
        }
    }

    @handler({
        bindingName: 'markdown',
        validatable: true,
        virtual: false
    })
    export class MarkdownBindingHandler implements KnockoutBindingHandler {
        init(element: HTMLElement, valueAccessor: () => string, allValueAccessor: KnockoutAllBindingsAccessor) {
            const contents = valueAccessor() || element.innerHTML;

            $.Deferred()
                .resolve()
                .then(() => {
                    const PR = _.get(window, 'PR');

                    if (!PR) {
                        const st = $('<style>', {
                            type: 'text/css',
                            rel: 'stylesheet',
                            html: `
                            .prettyprint {
                                box-sizing: border-box;
                                background: #f5f5f5;
                                max-width: 100%;
                                padding: 5px !important;
                                margin: 10px 0;
                                border: none !important;
                                overflow: auto;
                                border-radius: 5px;
                            }
                            .prettyprint,
                            .prettyprint * {
                                font-family: Consolas;
                            }`.trim().replace(/\s{1,}/g, ' ')
                        });

                        st.appendTo(document.head);

                        return $.getScript(P_URL);
                    }

                    return PR;
                })
                .then(() => {
                    const markdownit = _.get(window, 'markdownit');

                    if (!markdownit) {
                        return $.getScript(M_URL);
                    }

                    return markdownit;
                })
                .then(() => {
                    const { prettyPrintOne } = PR;

                    return markdownit({
                        highlight: (str: string, lng: string) => {
                            return prettyPrintOne(_.escape(str), lng, false);
                        }
                    });
                })
                .then((md) => {
                    if (!contents.match(/\.md$/)) {
                        return md.render(contents);
                    } else {
                        return $.get(contents).then((ctx) => md.render(ctx));
                    }
                })
                .then((html) => {
                    element.innerHTML = html;
                    element.classList.add('markdown-content');

                    element
                        .querySelectorAll('pre')
                        .forEach((e: HTMLPreElement) => e.classList.add('prettyprint'));
                });

            element.removeAttribute('data-bind');

            return { controlsDescendantBindings: true };
        }
    }
}