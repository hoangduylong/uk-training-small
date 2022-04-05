/// <reference path="../../reference.ts"/>

interface JQuery {
    ntsWizard: {
        (act: 'getCurrentStep'): number;
        (act: 'begin' | 'end' | 'next' | 'prev'): JQueryPromise<boolean>;
        (act: 'goto', index: number): JQueryPromise<boolean>;
    }
}

module nts.uk.ui.jqueryExtentions {
    export module ntsWizard {
        // mock function ntsWizard (shit)
        $.fn.ntsWizard = function (act: 'begin' | 'end' | 'next' | 'prev' | 'getCurrentStep' | 'goto', index?: number) {
            const $el = $(this);
            const steps = $el.find('.step-list').children();
            const current = $el.find('.step-list').children('.current');

            if (['begin', 'end', 'next', 'prev'].indexOf(act) > -1) {
                steps.each((__: number, e: HTMLElement) => e.classList.remove('current'));
            }

            switch (act) {
                case 'begin':
                    steps.first().addClass('current');
                    $el.trigger('wz.change');
                    break;
                case 'end':
                    steps.last().addClass('current');
                    $el.trigger('wz.change');
                    break;
                case 'next':
                    const next = current.next();

                    if (next.length) {
                        next.addClass('current');
                        $el.trigger('wz.change');
                    } else {
                        current.addClass('current');
                    }
                    break;
                case 'prev':
                    const prev = current.prev();

                    if (prev.length) {
                        prev.addClass('current');
                        $el.trigger('wz.change');
                    } else {
                        current.addClass('current');
                    }
                    break;
                case 'getCurrentStep':
                    const indexs = steps
                        .toArray()
                        .map((e: HTMLElement, i: number) => e.classList.contains('current') ? i : -1)
                        .filter((c) => c > -1);

                    const [step] = indexs;

                    return _.isNumber(step) ? step : -1;
                case 'goto':
                    if (_.isNumber(index) && index > -1 && index < steps.length) {
                        steps.each((i: number, e: HTMLElement) => {
                            if (i === index) {
                                e.classList.add('current');
                                $el.trigger('wz.change');
                            } else {
                                e.classList.remove('current');
                            }
                        });
                    }
                    break;
            }

            return $.Deferred().resolve(true);
        };
    }
}