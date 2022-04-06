var nts;
(function (nts) {
    var custombinding;
    (function (custombinding) {
        // define ITEM_SINGLE_TYPE
        // type of item if it's single item
        var ITEM_SINGLE_TYPE;
        (function (ITEM_SINGLE_TYPE) {
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["STRING"] = 1] = "STRING";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["NUMERIC"] = 2] = "NUMERIC";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["DATE"] = 3] = "DATE";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["TIME"] = 4] = "TIME";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["TIMEPOINT"] = 5] = "TIMEPOINT";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["SELECTION"] = 6] = "SELECTION";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["SEL_RADIO"] = 7] = "SEL_RADIO";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["SEL_BUTTON"] = 8] = "SEL_BUTTON";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["READONLY"] = 9] = "READONLY";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["RELATE_CATEGORY"] = 10] = "RELATE_CATEGORY";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["NUMBERIC_BUTTON"] = 11] = "NUMBERIC_BUTTON";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["READONLY_BUTTON"] = 12] = "READONLY_BUTTON";
        })(ITEM_SINGLE_TYPE || (ITEM_SINGLE_TYPE = {}));
        var modal = nts.uk.ui.windows.sub.modal;
        var setShared = nts.uk.ui.windows.setShared;
        var getShared = nts.uk.ui.windows.getShared;
        custombinding.fetch = {
            checkFunctionNo: function () { return nts.uk.request.ajax("ctx/pereg/functions/auth/find-with-role-person-info"); }
        };
        var FilterBoxControl = /** @class */ (function () {
            function FilterBoxControl() {
                this.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                    var accessor = valueAccessor(), itemData = ko.toJS(accessor.itemData), template = {
                        str: "<input id=\"string-filter\" data-bind=\"ntsTextEditor: { name: i18n('CPS003_78'), value: value, constraint: constraint_filter,enable: enable, required: false }\" />",
                        numb: "<input data-bind=\"ntsNumberEditor: { name: i18n('CPS003_78'), value: value, constraint: constraint_filter, enable: enable, required: false, option: options }\" />",
                        date: "<div data-bind=\"ntsDatePicker: { name: i18n('CPS003_78'), constraint: constraint_filter,value: value, enable: enable, required: false, dateFormat: 'YYYY/MM/DD' }\"></div>",
                        time: "<input data-bind=\"ntsTimeEditor: { name: i18n('CPS003_78'), value: value, constraint: constraint_filter,inputFormat: 'time', mode: 'time', enable: enable, required: false }\" />",
                        timep: "<input data-bind=\"ntsTimeWithDayEditor: { name: i18n('CPS003_78'), value: value, constraint: constraint_filter, enable: enable, required: false }\" />",
                        radio: "<div id=\"combo-box\" data-bind=\"ntsComboBox: {\n                                name: i18n('CPS003_78'), \n                                options: itemOptions,\n                                optionsValue: 'optionValue',\n                                visibleItemsCount: 5,\n                                value: value,\n                                optionsText: 'optionText',\n                                editable: false,\n                                required: false,\n                                selectFirstIfNull: false,\n                                enable: enable,\n                                columns: [\n                                    { prop: 'optionText', length: 10 }\n                                ]}\"></div>",
                        button: "<button id=\"button-filter\" data-bind=\"text: i18n('CPS003_87'), enable: enable, click: openDialog\"></button>\n                             <label id=\"button-filter-value\" class=\"value-text readonly\" data-bind=\"html: textValue\"></label>"
                    }, vm = {
                        i18n: nts.uk.resource.getText,
                        value: ko.observable(),
                        constraint: '',
                        constraint_filter: '',
                        options: {
                            grouplength: 0,
                            decimallength: 0
                        },
                        enable: ko.observable(false),
                        textValue: ko.observable(''),
                        required: false,
                        itemOptions: ko.observableArray([]),
                        openDialog: function () {
                            var itemData = ko.toJS(accessor.itemData), value = ko.toJS(accessor.value());
                            if (['IS00131', 'IS00140',
                                'IS00158', 'IS00167',
                                'IS00176', 'IS00149',
                                'IS00194', 'IS00203',
                                'IS00212', 'IS00221',
                                'IS00230', 'IS00239',
                                'IS00185'].indexOf(itemData.itemCode) > -1) {
                                setShared("kml001multiSelectMode", false);
                                setShared("kml001selectedCodeList", _.isNil(value) ? [] : [value]);
                                setShared("kml001isSelection", true);
                                setShared("kml001selectAbleCodeList", itemData.selectionItems.map(function (x) { return x.optionValue; }), true);
                                modal('at', '/view/kdl/001/a/index.xhtml').onClosed(function () {
                                    var childData = getShared('kml001selectedTimes');
                                    if (childData) {
                                        if (childData.length > 0) {
                                            var data = childData[0];
                                            vm.value(data.selectedWorkTimeCode);
                                            if (data.selectedWorkTimeName == "選択なし") {
                                                data.selectedWorkTimeName = "";
                                            }
                                            vm.textValue("".concat(data.selectedWorkTimeCode, " ").concat(data.selectedWorkTimeName));
                                        }
                                    }
                                });
                            }
                            else if (['IS00084', 'IS00085'].indexOf(itemData.itemCode) > -1) {
                                custombinding.fetch.checkFunctionNo().done(function (role) {
                                    setShared('inputCDL008', {
                                        selectedCodes: _.isNil(value) ? [] : [value],
                                        baseDate: __viewContext.viewModel.baseDate,
                                        isMultiple: false,
                                        selectedSystemType: 1,
                                        isrestrictionOfReferenceRange: role.available,
                                        showNoSelection: !itemData.required,
                                        isShowBaseDate: false
                                    }, true);
                                    modal('com', '/view/cdl/008/a/index.xhtml').onClosed(function () {
                                        if (getShared('CDL008Cancel')) {
                                            return;
                                        }
                                        var output = getShared('outputCDL008');
                                        if (!_.isNil(output)) {
                                            vm.value(output);
                                            var selectedValue = _.filter(ko.toJS(__viewContext.viewModel.currentItem.itemData().selectionItems), function (value) { return value.optionValue == output; });
                                            vm.textValue("".concat(selectedValue.length > 0 ? selectedValue[0].optionText : ""));
                                        }
                                    });
                                });
                            }
                            else {
                                setShared("KDL002_isShowNoSelectRow", !itemData.required);
                                setShared("KDL002_Multiple", false, true);
                                setShared('kdl002isSelection', false, true);
                                setShared("KDL002_SelectedItemId", [vm.value()], true);
                                setShared("KDL002_AllItemObj", itemData.selectionItems.map(function (x) { return x.optionValue; }), true);
                                modal('at', '/view/kdl/002/a/index.xhtml').onClosed(function () {
                                    var childData = getShared('KDL002_SelectedNewItem');
                                    if (childData[0]) {
                                        vm.value(childData[0].code);
                                        if (childData[0].name == "選択なし") {
                                            childData[0].name = "";
                                        }
                                        vm.textValue("".concat(childData[0].code, " ").concat(childData[0].name));
                                    }
                                });
                            }
                        }
                    };
                    // bind data out
                    vm.value.subscribe(function (v) { return accessor.value(v); });
                    // update value of binding
                    ko.computed({
                        read: function () {
                            var value = ko.toJS(accessor.value), enable = !!ko.toJS(accessor.enable);
                            nts.uk.ui.errors.clearAll();
                            // update obsr
                            vm.enable(enable);
                            vm.textValue('');
                            if (enable) {
                                vm.value(value);
                                var ctrl = element.querySelector('.ntsControl[tabindex]');
                                if (ctrl) {
                                    ctrl.focus();
                                }
                                else {
                                    var input = element.querySelector('input');
                                    if (input) {
                                        input.focus();
                                    }
                                }
                            }
                            else {
                                vm.value('');
                                switch (itemData.dataType) {
                                    default:
                                        break;
                                    case ITEM_SINGLE_TYPE.DATE:
                                        break;
                                    case ITEM_SINGLE_TYPE.TIME:
                                    case ITEM_SINGLE_TYPE.STRING:
                                    case ITEM_SINGLE_TYPE.TIMEPOINT:
                                    case ITEM_SINGLE_TYPE.NUMERIC:
                                        $(element).find('input').ntsError('clear');
                                        break;
                                    case ITEM_SINGLE_TYPE.SELECTION:
                                    case ITEM_SINGLE_TYPE.SEL_RADIO:
                                        break;
                                    case ITEM_SINGLE_TYPE.SEL_BUTTON:
                                        break;
                                }
                            }
                        }
                    });
                    ko.computed({
                        read: function () {
                            itemData = ko.toJS(accessor.itemData);
                            // clear old value
                            vm.value('');
                            vm.constraint = itemData.constraint;
                            vm.constraint_filter = itemData.constraint_filter;
                            vm.required = false; //itemData.required;
                            // bind items to dropdownList (if avaiable)
                            vm.itemOptions(itemData.selectionItems || []);
                            // clean binding
                            ko.cleanNode(element);
                            nts.uk.ui.errors.clearAll();
                            switch (itemData.dataType) {
                                default:
                                    ko.utils.setHtml(element, '');
                                    break;
                                case ITEM_SINGLE_TYPE.DATE:
                                    ko.utils.setHtml(element, template.date);
                                    break;
                                case ITEM_SINGLE_TYPE.STRING:
                                    ko.utils.setHtml(element, template.str);
                                    break;
                                case ITEM_SINGLE_TYPE.TIME:
                                    ko.utils.setHtml(element, template.time);
                                    break;
                                case ITEM_SINGLE_TYPE.TIMEPOINT:
                                    ko.utils.setHtml(element, template.timep);
                                    break;
                                case ITEM_SINGLE_TYPE.NUMERIC:
                                    ko.utils.setHtml(element, template.numb);
                                    if (itemData.amount) {
                                        vm.options.grouplength = 3;
                                    }
                                    else {
                                        vm.options.grouplength = 0;
                                    }
                                    vm.options.decimallength = itemData.decimalLength;
                                    break;
                                case ITEM_SINGLE_TYPE.SELECTION:
                                case ITEM_SINGLE_TYPE.SEL_RADIO:
                                    ko.utils.setHtml(element, template.radio);
                                    break;
                                case ITEM_SINGLE_TYPE.SEL_BUTTON:
                                    ko.utils.setHtml(element, template.button);
                                    break;
                            }
                            // re binding viewModel to view
                            ko.applyBindingsToDescendants(vm, element);
                        }
                    });
                    return { controlsDescendantBindings: true };
                };
            }
            return FilterBoxControl;
        }());
        custombinding.FilterBoxControl = FilterBoxControl;
    })(custombinding = nts.custombinding || (nts.custombinding = {}));
})(nts || (nts = {}));
ko.bindingHandlers["cps003fFilter"] = new nts.custombinding.FilterBoxControl();
//# sourceMappingURL=filter-ko-ext.js.map