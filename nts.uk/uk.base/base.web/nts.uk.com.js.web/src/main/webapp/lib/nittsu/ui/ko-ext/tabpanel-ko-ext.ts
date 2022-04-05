/// <reference path="../../reference.ts"/>

module nts.uk.ui.koExtentions {
    export module tabpanel {

        type TABPANEL_PARAMS = {
            direction: 'horizontal' | 'vertical' | 'vertical-link' | KnockoutObservable<'horizontal' | 'vertical' | 'vertical-link'>;
            active: string | KnockoutObservable<string>;
            dataSource: TabModel[] | KnockoutObservableArray<TabModel>;
        };

        interface TabModel {
            id: string;
            icon: string;
            title: string;
            content: string;
            enable: boolean;
            visible: boolean;
        }

        @handler({
            bindingName: 'ntsTabPanel',
            validatable: true,
            virtual: false
        })
        export class TabPanelBindingHandler implements KnockoutBindingHandler {
            init(element: HTMLElement, valueAccessor: () => TABPANEL_PARAMS, allBindingsAccessor: () => any, viewModel: nts.uk.ui.vm.ViewModel, bindingContext: KnockoutBindingContext & { $vm: nts.uk.ui.vm.ViewModel }): { controlsDescendantBindings: boolean } {
                const accessor = valueAccessor();
                const active = accessor.active;
                const tabindex = element.getAttribute('tabindex');

                element.removeAttribute('tabindex');
                element.classList.add('tabs-panel');
                element.removeAttribute('data-bind');

                const childs = $(element).children();

                const tablist = $('<div>', { class: 'tabs-list' });

                tablist
                    .appendTo(element);

                if (childs.length) {
                    const wrapper = $('<div>', { class: 'tabs-content' });

                    wrapper
                        .append(childs)
                        .appendTo(element);

                    element.classList.add('has-content');
                    element.classList.remove('no-content');
                } else {
                    element.classList.add('no-content');
                    element.classList.remove('has-content');
                }

                const bindingData = (dir: 'horizontal' | 'vertical' | 'vertical-link') => {
                    const tabs = tablist.get(0);

                    const ntsRadioBoxGroup = {
                        options: ko.computed({
                            read: () => {
                                const ds: TabModel[] = ko.toJS(accessor.dataSource);

                                return ds.filter((d) => d.visible !== false)
                                    .map((d) => ({
                                        ...d,
                                        active,
                                        tabindex,
                                        dataBind: 'vertical-link' !== dir ? undefined : {
                                            'btn-link': d.title,
                                            icon: d.icon || 'CHECKBOX',
                                            width: 40,
                                            height: 32,
                                            state: active,
                                            value: d.id,
                                            disabled: d.enable === false
                                        }
                                    }));
                            },
                            disposeWhenNodeIsRemoved: element
                        }),
                        optionsText: 'title',
                        optionsValue: 'id',
                        value: accessor.active,
                        tabindex,
                    };

                    ko.cleanNode(tabs);
                    tabs.innerHTML = '';

                    ko.applyBindingsToNode(tabs, { ntsRadioBoxGroup }, bindingContext);
                }

                bindingData(ko.toJS(accessor.direction));

                if (ko.isObservable(accessor.direction)) {
                    accessor.direction.subscribe(bindingData);
                }

                return { controlsDescendantBindings: false };
            }
            update(element: HTMLElement, valueAccessor: () => TABPANEL_PARAMS, allBindingsAccessor: () => any, viewModel: nts.uk.ui.vm.ViewModel, bindingContext: KnockoutBindingContext & { $vm: nts.uk.ui.vm.ViewModel }): void {
                const data = valueAccessor();
                const active = ko.unwrap(data.active);
                const direction = ko.unwrap<'vertical' | 'horizontal' | 'vertical-link'>(data.direction) || 'horizontal';

                const dataSource = ko.unwrap<TabModel[]>(data.dataSource);
                const tab = _.find(dataSource, (t: TabModel) => t.id === active);
                const contents = dataSource.map(({ content }) => content).join(', ');

                $(element)
                    .find(contents)
                    .addClass('hidden');

                const $tabs = $(element).find('.tabs-list').get(0);
                const $contents = $(element).find('.tabs-content').get(0);

                element.classList.remove('vertical');
                element.classList.remove('horizontal');
                element.classList.remove('vertical-link');

                element.classList.add(direction);

                if ($contents) {
                    if (direction === 'horizontal') {
                        $contents.style.minHeight = '';
                    } else {
                        $contents.style.minHeight = `${$tabs.offsetHeight}px`;
                    }
                }

                $(element)
                    .find((tab || {}).content || '')
                    .removeClass('hidden');
            }
        }
    }
}


/*update(element: HTMLElement, valueAccessor: () => TABPANEL_PARAMS, allBindingsAccessor: () => any, viewModel: nts.uk.ui.vm.ViewModel, bindingContext: KnockoutBindingContext & { $vm: nts.uk.ui.vm.ViewModel }): void {
                const mvm = new ko.ViewModel();
                const data = valueAccessor();
                const active = ko.unwrap<string>(data.active);
                const dataSource = ko.unwrap<TabModel[]>(data.dataSource);
                const direction = ko.unwrap<'vertical' | 'horizontal'>(data.direction) || 'horizontal';
                const tabindex = element.getAttribute('data-tabindex');

                const $tabs = $(element).find('.tabs-list').get(0);
                const $contents = $(element).find('.tabs-content').get(0);

                element.classList.remove('vertical');
                element.classList.remove('horizontal');

                element.classList.add(direction);

                if ($tabs) {
                    $tabs.innerHTML = '';

                    const contents = dataSource.map(({ content }) => content).join(', ');

                    $(element)
                        .find(contents)
                        .addClass('hidden');

                    _.each(dataSource, (tab: TabModel) => {
                        const { id, title, enable, icon, visible, content } = tab;

                        if (ko.unwrap<boolean>(visible)) {
                            const btn = $('<button>', {
                                text: mvm.$i18n(title),
                                disabled: !ko.unwrap<boolean>(enable),
                                class: direction === 'vertical' ? 'link icon' : '',
                                tabindex: tabindex
                            })
                                .appendTo($tabs)
                                .on('click', () => {
                                    if (direction === 'horizontal') {
                                        if (ko.isObservable(data.active)) {
                                            data.active(id);
                                        }
                                    }
                                });

                            if (direction === 'vertical') {
                                ko.applyBindingsToNode(btn.get(0), {
                                    'btn-link': title,
                                    icon: icon || 'CHECKBOX',
                                    width: 40,
                                    height: 32,
                                    state: data.active,
                                    value: id,
                                    disabled: !ko.unwrap<boolean>(enable),
                                });
                            }

                            if (active === id) {
                                btn
                                    .addClass('active');

                                $(element)
                                    .find(content)
                                    .removeClass('hidden');
                            }
                        }
                    });

                    if ($contents) {
                        if (direction === 'horizontal') {
                            $contents.style.minHeight = '';
                        } else {
                            $contents.style.minHeight = `${$tabs.offsetHeight}px`;
                        }
                    }
                }
            }*/