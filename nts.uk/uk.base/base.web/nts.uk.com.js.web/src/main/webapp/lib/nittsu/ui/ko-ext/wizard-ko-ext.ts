/// <reference path="../../reference.ts"/>

module nts.uk.ui.koExtentions {

    export module wizard {

        type WZ_PARAM = {
            active: number | KnockoutObservable<number>;
            steps: string[] | WZ_STEP[] | KnockoutObservableArray<WZ_STEP | string>;
        }

        interface WZ_STEP {
            content: string;
        }

        @handler({
            bindingName: 'ntsWizard',
            validatable: true,
            virtual: false
        })
        export class WizardBindingHandler implements KnockoutBindingHandler {
            init(element: HTMLElement, valueAccessor: () => WZ_PARAM, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
                const data = valueAccessor();

                element.classList.add('cf');
                element.classList.add('nts-wizard');

                element.removeAttribute('data-bind');

                $(element).find('.header .image').remove();

                const childs = $(element).children();

                if (!$(element).find('.steps').length) {
                    const tablist = $('<div>', { class: 'steps' });

                    tablist
                        .appendTo(element);

                    const list = $('<div>', { class: 'step-list' });

                    list.appendTo(tablist);
                } else {
                    const list = $('<div>', { class: 'step-list' });
                    const head = $(element).find('.header');

                    $(element)
                        .find('.steps')
                        .children()
                        .each((i: number, e: HTMLElement) => {
                            if (!$(e).find('.content').length) {
                                const content = $('<div>', { class: 'content', html: e.innerHTML });

                                $(e).html('').append(content);
                            }

                            $(e).prepend($('<div>', { class: 'step-icon', 'data-step': i + 1 }));

                            list.append(e);

                            $(e).addClass('step');
                        });

                    $(element)
                        .find('.steps')
                        .append(head)
                        .append(list);

                    head.prepend($('<div>', { class: 'step-icon' }));
                }

                if (!$(element).find('.contents').length) {
                    const wrapper = $('<div>', { class: 'contents' });

                    wrapper
                        .appendTo(element).append(childs);
                }

                $(element)
                    .on('wz.change', () => {
                        const index: number = $(element).ntsWizard('getCurrentStep');

                        if (ko.isObservable(data.active)) {
                            data.active(index);
                        }
                    });

                ko.computed({
                    read: () => {
                        $(element).ntsWizard('goto', ko.unwrap<number>(data.active));
                    },
                    disposeWhenNodeIsRemoved: element
                })
            }

            update(element: HTMLElement, valueAccessor: () => WZ_PARAM, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
                const data = valueAccessor();
                const index = ko.unwrap<number>(data.active);
                const steps = ko.unwrap<Array<string | WZ_STEP>>(data.steps) || [];
                const active = steps[index];
                const contents = steps.map((c) => _.isString(c) ? c : c.content).join(', ');

                $(element)
                    .find('.contents')
                    .find(contents)
                    .addClass('hidden');

                if (active) {
                    $(element)
                        .find('.contents')
                        .find(_.isString(active) ? active : active.content)
                        .removeClass('hidden');
                } else if (steps.length === 0) {

                    $(element)
                        .find('.contents')
                        .children()
                        .each((i: number, e: HTMLElement) => {
                            if (i !== index) {
                                e.classList.add('hidden');
                            } else {
                                e.classList.remove('hidden');
                            }
                        });
                }
            }
        }
    }
}