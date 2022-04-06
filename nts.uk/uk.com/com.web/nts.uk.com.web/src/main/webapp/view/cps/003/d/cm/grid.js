var nts;
(function (nts) {
    var custombinding;
    (function (custombinding) {
        var dd = ko.utils.domData, dispatch = ko.utils.triggerEvent;
        var GridListControl = /** @class */ (function () {
            function GridListControl() {
                this.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                    var accessor = valueAccessor(), gridHtml = "\n                <style tye='text/css' rel='stylesheet'>\n                    .cps003d-grid-list {\n                        display: inline-block;\n                        border: 1px solid #ccc;\n                    }\n                    .cps003d-grid-list .cps003d-header {\n                        background-color: #CFF1A5;\n                        border-bottom: 1px solid #ccc;\n                    }\n                    .cps003d-grid-list .cps003d-header>.cps003d-col3 {\n                        position: relative;                        \n                    }\n                    .cps003d-grid-list .cps003d-body {\n                        height: 329px;\n                        overflow-y: scroll;\n                    }\n                    .cps003d-grid-list .cps003d-header [class^=\"cps003d-col\"],\n                    .cps003d-grid-list .cps003d-body-row [class^=\"cps003d-col\"] {\n                        display: inline-block;\n                        box-sizing: border-box;\n                        height: 32px;\n                        line-height: 32px;\n                        vertical-align: middle;\n                        padding: 0 2px;\n                    }\n                    .cps003d-grid-list .cps003d-header [class^=\"cps003d-col\"] {\n                        height: 50px;\n                    }\n                    .cps003d-grid-list .cps003d-header .cps003d-col1,\n                    .cps003d-grid-list .cps003d-body-row .cps003d-col1 {\n                        width: 192px;\n                        border-right: 1px solid #ccc;\n                    }\n                    .cps003d-grid-list .cps003d-header .cps003d-col2,\n                    .cps003d-grid-list .cps003d-body-row .cps003d-col2 {\n                        width: 80px;\n                        border-right: 1px solid #ccc;\n                    }\n                    .cps003d-grid-list .cps003d-header .cps003d-col3,\n                    .cps003d-grid-list .cps003d-body-row .cps003d-col3 {\n                        width: 60px;\n                        text-align: center;\n                        \n                    }\n                    .cps003d-grid-list .cps003d-body-row {\n                        border-bottom: 1px solid #ccc;\n                    }\n                    .cps003d-grid-list .cps003d-body-row.selected,\n                    .cps003d-grid-list .cps003d-body-row.selected>[class^=\"cps003d-col\"] {\n                        background-color: #FFD966;\n                    }\n                    .cps003d-grid-list .cps003d-body-row:nth-child(n + 9):last-child {\n                        border-bottom: none;\n                    }\n                    .cps003d-grid-list .ntsCheckBox {\n                        padding: 0;\n                        line-height: 1px;\n                    }\n                    .cps003d-grid-list  .ntsCheckBox .ntsCheckBox-label {\n                        line-height: 1px;\n                    }\n                    .cps003d-grid-list .cps003d-header>.cps003d-col3 .ntsCheckBox {\n                        position: absolute;\n                        top: 25px;\n                        left: 20px;\n                    }\n                </style>\n                <div class=\"cps003d-header\">\n                    <div class='cps003d-col1' data-bind=\"text: i18n('CPS003_57')\"></div>\n                    <div class='cps003d-col2' data-bind=\"text: i18n('CPS003_58')\"></div>\n                    <div class='cps003d-col3'>\n                        <div data-bind=\"text: i18n('CPS003_59')\"></div>\n                        <div tabindex=\"0\" class=\"ntsControl ntsCheckBox\" data-bind=\"event: { keydown: checkAll }\">\n                            <label class=\"ntsCheckBox-label\">\n                                <input class=\"check-all\" type=\"checkbox\" data-bind=\"event: { change: checkAll }\" />\n                                <span class=\"box\"></span>\n                            </label>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"cps003d-body\" data-bind=\"foreach: { data: items, as: 'row', afterRender: afterRender }\">\n                    <div class=\"cps003d-body-row\">\n                        <div class='cps003d-col1 limited-label' data-bind=\"text: row['itemName']\"></div>\n                        <div class='cps003d-col2' data-bind=\"text: $parent.i18n(row['required'] ? 'CPS006_27' : 'CPS006_26')\"></div>\n                        <div class='cps003d-col3'>\n                            <div tabindex=\"0\" class=\"ntsControl ntsCheckBox\" data-bind=\"event: { keydown: $parent.checkItem }\">\n                                <label class=\"ntsCheckBox-label\">\n                                    <input class=\"check-item\" type=\"checkbox\" data-bind=\"event: { change: $parent.checkItem }, attr: {\n                                            'data-id': row['perInfoItemDefID'],\n                                            'data-require': row['required'],\n                                            'data-ic': row['itemCD'],\n                                            'data-pc': row['itemParentCD']\n                                        }\" />\n                                    <span class=\"box\"></span>\n                                </label>\n                            </div>\n                        </div>\n                    </div>\n                </div>", gridVm = {
                        i18n: nts.uk.resource.getText,
                        items: accessor.dataSources,
                        checkAll: function (vm, evt) {
                            if (evt.target.tagName == 'DIV' && [13, 32].indexOf(evt.keyCode) > -1) {
                                var input = evt.target.querySelector('input');
                                if (input) {
                                    dispatch(input, 'click');
                                }
                            }
                            else if (evt.target.tagName == 'INPUT') {
                                var input_1 = evt.target, dataSources_1 = ko.toJS(accessor.dataSources), inputs = element.querySelectorAll('.cps003d-body input.check-item');
                                // raise event for all input
                                [].slice.call(inputs).forEach(function (inp) {
                                    if (inp.disabled) {
                                        if (inp.getAttribute('data-require') == 'true') {
                                            inp.checked = true;
                                        }
                                        else if (inp.getAttribute('data-pc')) {
                                            var pc_1 = inp.getAttribute('data-pc'), parent_1 = !!dataSources_1.filter(function (d) { return d.required == true && d.itemCD == pc_1; }).length;
                                            if (parent_1) {
                                                inp.checked = true;
                                            }
                                            else {
                                                inp.checked = input_1.checked;
                                            }
                                        }
                                        else {
                                            inp.checked = input_1.checked;
                                        }
                                    }
                                    else {
                                        inp.checked = input_1.checked;
                                    }
                                });
                                // bind dataout
                                changeSelect(inputs);
                            }
                            return true;
                        },
                        checkItem: function (item, evt) {
                            if (evt.target.tagName == 'DIV' && [13, 32].indexOf(evt.keyCode) > -1) {
                                var input = evt.target.querySelector('input');
                                if (input && !input.disabled) {
                                    dispatch(input, 'click');
                                }
                            }
                            else if (evt.target.tagName == 'INPUT') {
                                var input = evt.target, inputs = element.querySelectorAll('.cps003d-body input.check-item'), checkAll = element.querySelector('.cps003d-header input.check-all');
                                checkItems(input);
                                if (checkAll) {
                                    checkAll.checked = ![].slice.call(inputs).filter(function (m) { return !m.checked; }).length;
                                }
                                // bind dataout
                                changeSelect(inputs);
                            }
                            return true;
                        },
                        afterRender: function (elements, item) {
                            var dataSources = ko.toJS(accessor.dataSources), input = element.querySelector(".cps003d-body input[data-id=\"".concat(item['perInfoItemDefID'], "\"]")), inputs = element.querySelectorAll('.cps003d-body input.check-item'), checkall = dataSources.filter(function (m) { return m.regulationAtr; }).length == dataSources.length;
                            if (input && (input.getAttribute('data-require') == 'true' || input.getAttribute('data-pc'))) {
                                input.disabled = true;
                                $(input).closest('.ntsControl.ntsCheckBox').attr('tabindex', -1);
                            }
                            else {
                                $(input).closest('.ntsControl.ntsCheckBox').attr('tabindex', 0);
                            }
                            if ([].slice.call(inputs).length == dataSources.length) {
                                // checked item
                                [].slice.call(inputs).forEach(function (inp) {
                                    var id = inp.getAttribute('data-id'), row = $(inp).closest('.cps003d-body-row');
                                    if (dataSources.filter(function (m) { return m.regulationAtr && m.perInfoItemDefID == id; }).length == 1) {
                                        inp.checked = true;
                                        if (inp.getAttribute('data-require') == 'true') {
                                            row.addClass('selected');
                                        }
                                    }
                                    else {
                                        if (inp.disabled) {
                                            if (inp.getAttribute('data-require') == 'true') {
                                                inp.checked = true;
                                                row.addClass('selected');
                                            }
                                            else if (inp.getAttribute('data-pc')) {
                                                var pc_2 = inp.getAttribute('data-pc'), parent_2 = !!dataSources.filter(function (d) { return d.required == true && d.itemCD == pc_2; }).length;
                                                if (parent_2) {
                                                    inp.checked = true;
                                                }
                                                else {
                                                    inp.checked = false;
                                                }
                                                row.removeClass('selected');
                                            }
                                            else {
                                                inp.checked = false;
                                                row.removeClass('selected');
                                            }
                                        }
                                        else {
                                            inp.checked = false;
                                            if (inp.getAttribute('data-require') == 'true') {
                                                row.addClass('selected');
                                            }
                                        }
                                    }
                                });
                                // check all
                                if (checkall) {
                                    var input_2 = element.querySelector('.cps003d-header input.check-all');
                                    if (input_2) {
                                        input_2.checked = true;
                                    }
                                }
                                // bind dataout
                                changeSelect(inputs);
                            }
                        }
                    }, checkItems = function (input) {
                        var childs = element.querySelectorAll("input[data-pc=\"".concat(input.getAttribute('data-ic'), "\"]"));
                        [].slice.call(childs).forEach(function (c) {
                            c.checked = input.checked;
                            checkItems(c);
                        });
                    }, changeSelect = function (inputs) {
                        if (ko.isObservable(accessor.selecteds)) {
                            var data = [].slice.call(inputs)
                                .map(function (m) {
                                if (m.checked) {
                                    return m.getAttribute('data-id');
                                }
                                else {
                                    return undefined;
                                }
                            })
                                .filter(function (m) { return !!m; });
                            accessor.selecteds(data);
                        }
                    };
                    element.classList.add('cps003d-grid-list');
                    // apply new $vm to grid
                    ko.utils.setHtml(element, gridHtml);
                    ko.applyBindingsToDescendants(gridVm, element);
                    return { controlsDescendantBindings: true };
                };
            }
            return GridListControl;
        }());
        custombinding.GridListControl = GridListControl;
    })(custombinding = nts.custombinding || (nts.custombinding = {}));
})(nts || (nts = {}));
ko.bindingHandlers["grid4d"] = new nts.custombinding.GridListControl();
//# sourceMappingURL=grid.js.map