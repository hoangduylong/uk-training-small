module nts.custombinding {
    const dd = ko.utils.domData,
        dispatch = ko.utils.triggerEvent;

    export class GridListControl implements KnockoutBindingHandler {
        init = (element: HTMLElement, valueAccessor: any, allBindingsAccessor: any, viewModel: any, bindingContext: KnockoutBindingContext) => {
            let accessor = valueAccessor(),
                gridHtml = `
                <style tye='text/css' rel='stylesheet'>
                    .cps003d-grid-list {
                        display: inline-block;
                        border: 1px solid #ccc;
                    }
                    .cps003d-grid-list .cps003d-header {
                        background-color: #CFF1A5;
                        border-bottom: 1px solid #ccc;
                    }
                    .cps003d-grid-list .cps003d-header>.cps003d-col3 {
                        position: relative;                        
                    }
                    .cps003d-grid-list .cps003d-body {
                        height: 329px;
                        overflow-y: scroll;
                    }
                    .cps003d-grid-list .cps003d-header [class^="cps003d-col"],
                    .cps003d-grid-list .cps003d-body-row [class^="cps003d-col"] {
                        display: inline-block;
                        box-sizing: border-box;
                        height: 32px;
                        line-height: 32px;
                        vertical-align: middle;
                        padding: 0 2px;
                    }
                    .cps003d-grid-list .cps003d-header [class^="cps003d-col"] {
                        height: 50px;
                    }
                    .cps003d-grid-list .cps003d-header .cps003d-col1,
                    .cps003d-grid-list .cps003d-body-row .cps003d-col1 {
                        width: 192px;
                        border-right: 1px solid #ccc;
                    }
                    .cps003d-grid-list .cps003d-header .cps003d-col2,
                    .cps003d-grid-list .cps003d-body-row .cps003d-col2 {
                        width: 80px;
                        border-right: 1px solid #ccc;
                    }
                    .cps003d-grid-list .cps003d-header .cps003d-col3,
                    .cps003d-grid-list .cps003d-body-row .cps003d-col3 {
                        width: 60px;
                        text-align: center;
                        
                    }
                    .cps003d-grid-list .cps003d-body-row {
                        border-bottom: 1px solid #ccc;
                    }
                    .cps003d-grid-list .cps003d-body-row.selected,
                    .cps003d-grid-list .cps003d-body-row.selected>[class^="cps003d-col"] {
                        background-color: #FFD966;
                    }
                    .cps003d-grid-list .cps003d-body-row:nth-child(n + 9):last-child {
                        border-bottom: none;
                    }
                    .cps003d-grid-list .ntsCheckBox {
                        padding: 0;
                        line-height: 1px;
                    }
                    .cps003d-grid-list  .ntsCheckBox .ntsCheckBox-label {
                        line-height: 1px;
                    }
                    .cps003d-grid-list .cps003d-header>.cps003d-col3 .ntsCheckBox {
                        position: absolute;
                        top: 25px;
                        left: 20px;
                    }
                </style>
                <div class="cps003d-header">
                    <div class='cps003d-col1' data-bind="text: i18n('CPS003_57')"></div>
                    <div class='cps003d-col2' data-bind="text: i18n('CPS003_58')"></div>
                    <div class='cps003d-col3'>
                        <div data-bind="text: i18n('CPS003_59')"></div>
                        <div tabindex="0" class="ntsControl ntsCheckBox" data-bind="event: { keydown: checkAll }">
                            <label class="ntsCheckBox-label">
                                <input class="check-all" type="checkbox" data-bind="event: { change: checkAll }" />
                                <span class="box"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="cps003d-body" data-bind="foreach: { data: items, as: 'row', afterRender: afterRender }">
                    <div class="cps003d-body-row">
                        <div class='cps003d-col1 limited-label' data-bind="text: row['itemName']"></div>
                        <div class='cps003d-col2' data-bind="text: $parent.i18n(row['required'] ? 'CPS006_27' : 'CPS006_26')"></div>
                        <div class='cps003d-col3'>
                            <div tabindex="0" class="ntsControl ntsCheckBox" data-bind="event: { keydown: $parent.checkItem }">
                                <label class="ntsCheckBox-label">
                                    <input class="check-item" type="checkbox" data-bind="event: { change: $parent.checkItem }, attr: {
                                            'data-id': row['perInfoItemDefID'],
                                            'data-require': row['required'],
                                            'data-ic': row['itemCD'],
                                            'data-pc': row['itemParentCD']
                                        }" />
                                    <span class="box"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>`,
                gridVm = {
                    i18n: nts.uk.resource.getText,
                    items: accessor.dataSources,
                    checkAll: (vm, evt) => {
                        if (evt.target.tagName == 'DIV' && [13, 32].indexOf(evt.keyCode) > -1) {
                            let input = evt.target.querySelector('input');

                            if (input) {
                                dispatch(input, 'click');
                            }
                        } else if (evt.target.tagName == 'INPUT') {
                            let input = evt.target,
                                dataSources = ko.toJS(accessor.dataSources),
                                inputs = element.querySelectorAll('.cps003d-body input.check-item');

                            // raise event for all input
                            [].slice.call(inputs).forEach(inp => {
                                if (inp.disabled) {
                                    if (inp.getAttribute('data-require') == 'true') {
                                        inp.checked = true;
                                    } else if (inp.getAttribute('data-pc')) {
                                        let pc = inp.getAttribute('data-pc'),
                                            parent = !!dataSources.filter(d => d.required == true && d.itemCD == pc).length;

                                        if (parent) {
                                            inp.checked = true;
                                        } else {
                                            inp.checked = input.checked;
                                        }
                                    } else {
                                        inp.checked = input.checked;
                                    }
                                } else {
                                    inp.checked = input.checked;
                                }
                            });

                            // bind dataout
                            changeSelect(inputs);
                        }

                        return true;
                    },
                    checkItem: (item, evt) => {
                        if (evt.target.tagName == 'DIV' && [13, 32].indexOf(evt.keyCode) > -1) {
                            let input = evt.target.querySelector('input');

                            if (input && !input.disabled) {
                                dispatch(input, 'click');
                            }
                        } else if (evt.target.tagName == 'INPUT') {
                            let input = evt.target,
                                inputs = element.querySelectorAll('.cps003d-body input.check-item'),
                                checkAll = element.querySelector('.cps003d-header input.check-all');

                            checkItems(input);

                            if (checkAll) {
                                checkAll.checked = ![].slice.call(inputs).filter(m => !m.checked).length;
                            }

                            // bind dataout
                            changeSelect(inputs);
                        }

                        return true;
                    },
                    afterRender: (elements, item) => {
                        let dataSources = ko.toJS(accessor.dataSources),
                            input = element.querySelector(`.cps003d-body input[data-id="${item['perInfoItemDefID']}"]`),
                            inputs = element.querySelectorAll('.cps003d-body input.check-item'),
                            checkall = dataSources.filter(m => m.regulationAtr).length == dataSources.length;

                        if (input && (input.getAttribute('data-require') == 'true' || input.getAttribute('data-pc'))) {
                            input.disabled = true;
                            $(input).closest('.ntsControl.ntsCheckBox').attr('tabindex', -1);
                        } else {
                            $(input).closest('.ntsControl.ntsCheckBox').attr('tabindex', 0);
                        }

                        if ([].slice.call(inputs).length == dataSources.length) {
                            // checked item
                            [].slice.call(inputs).forEach(inp => {
                                let id = inp.getAttribute('data-id'),
                                    row = $(inp).closest('.cps003d-body-row');

                                if (dataSources.filter(m => m.regulationAtr && m.perInfoItemDefID == id).length == 1) {
                                    inp.checked = true;
                                    if (inp.getAttribute('data-require') == 'true') {
                                        row.addClass('selected');
                                    }
                                } else {
                                    if (inp.disabled) {
                                        if (inp.getAttribute('data-require') == 'true') {
                                            inp.checked = true;
                                            row.addClass('selected');
                                        } else if (inp.getAttribute('data-pc')) {
                                            let pc = inp.getAttribute('data-pc'),
                                                parent = !!dataSources.filter(d => d.required == true && d.itemCD == pc).length;

                                            if (parent) {
                                                inp.checked = true;
                                            } else {
                                                inp.checked = false;
                                            }
                                            row.removeClass('selected');
                                        } else {
                                            inp.checked = false;
                                            row.removeClass('selected');
                                        }
                                    } else {
                                        inp.checked = false;
                                        if (inp.getAttribute('data-require') == 'true') {
                                            row.addClass('selected');
                                        }
                                    }
                                }
                            });

                            // check all
                            if (checkall) {
                                let input = element.querySelector('.cps003d-header input.check-all');

                                if (input) {
                                    input.checked = true;
                                }
                            }

                            // bind dataout
                            changeSelect(inputs);
                        }
                    }
                },
                checkItems = (input) => {
                    let childs = element.querySelectorAll(`input[data-pc="${input.getAttribute('data-ic')}"]`);

                    [].slice.call(childs).forEach(c => {
                        c.checked = input.checked;
                        checkItems(c);
                    });
                },
                changeSelect = (inputs) => {
                    if (ko.isObservable(accessor.selecteds)) {
                        let data = [].slice.call(inputs)
                            .map(m => {
                                if (m.checked) {
                                    return m.getAttribute('data-id');
                                } else {
                                    return undefined;
                                }
                            })
                            .filter(m => !!m);

                        accessor.selecteds(data);
                    }
                };

            element.classList.add('cps003d-grid-list');

            // apply new $vm to grid
            ko.utils.setHtml(element, gridHtml);
            ko.applyBindingsToDescendants(gridVm, element);

            return { controlsDescendantBindings: true };
        }
    }
}

ko.bindingHandlers["grid4d"] = new nts.custombinding.GridListControl();