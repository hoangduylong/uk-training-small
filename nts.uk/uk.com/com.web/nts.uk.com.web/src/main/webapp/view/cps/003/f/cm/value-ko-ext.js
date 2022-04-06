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
        var parseTime = nts.uk.time.parseTime;
        var modal = nts.uk.ui.windows.sub.modal;
        var setShared = nts.uk.ui.windows.setShared;
        var getShared = nts.uk.ui.windows.getShared;
        var timewd = window['nts']['uk']['time']['minutesBased']['clock']['dayattr']['create'], fetch = function (codes) { return nts.uk.request.ajax('com', 'ctx/pereg/grid-layout/get-item/name', { itemCodes: codes || ['IS00020', 'IS00279', 'IS00253'] }); }, fetch1 = { checkFunctionNo: function () { return nts.uk.request.ajax("ctx/pereg/functions/auth/find-with-role-person-info"); } };
        var ValueBoxControl = /** @class */ (function () {
            function ValueBoxControl() {
                this.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                    var accessor = valueAccessor(), itemData = ko.toJS(accessor.itemData), template = {
                        str: "<input id=\"string-value\" data-bind=\"ntsTextEditor: { name: i18n('CPS003_81'), value: value, constraint: constraint, enable: true, required: false }\" />",
                        numb: "<input data-bind=\"ntsNumberEditor: { name: i18n('CPS003_81'), value: value, constraint: constraint, enable: true, required: false, option: options }\" />",
                        amount: "<div class='number-group-box' data-bind=\"let: { m1: ko.computed(function() { return mode() == '0'; }), m2: ko.computed(function() { return mode() == '1'; }) }\">\n                                <div class=\"grant-selection-group\" data-bind=\"ntsRadioBoxGroup: {\n                                    options: ko.observableArray([\n                                        { id: '0', name: '' },\n                                        { id: '1', name: '' }]),\n                                    optionsValue: 'id',\n                                    optionsText: 'name',\n                                    value: mode,\n                                    enable: true\n                                }\"></div>\n                                <div class=\"text-box\">\n                                    <div style=\"position: relative; margin-top: -10px; margin-left: 2px\">\n                                        <input data-bind=\"ntsNumberEditor: { name: i18n('CPS003_81'), value: value, constraint: constraint, enable: m1, required: false, option: options }\"/>\n                                    </div>\n                                </div>\n                                <div class=\"dropdown-box\">\n                                    <div id=\"pk-amount\" class=\"pk-amount\" data-bind=\"ntsComboBox: {\n                                        width: '60px',\n                                        name: i18n('CPS003_84'),\n                                        options: ko.observableArray([{ optionValue: '+', optionText: '+' }, { optionValue: '-', optionText: '-' }]),\n                                        optionsValue: 'optionValue',\n                                        visibleItemsCount: 5,\n                                        value: value1,\n                                        optionsText: 'optionText',\n                                        editable: false,\n                                        required: m2,\n                                        selectFirstIfNull: true,\n                                        enable: m2,\n                                        columns: [{ prop: 'optionText', length: 10 }]}\"></div>\n                                    <input data-bind=\"ntsNumberEditor: { name: i18n('CPS003_85'), value: value2, constraint: constraint, enable: m2, required: m2, option: options }\" />\n                                </div>\n                                <div class=\"\" data-bind=\"text: i18n('CPS003_86'), style: { marginLeft: '35px'}\"></div>\n                            </div>",
                        grDate: "<div class='selection-group-box' data-bind=\"let: { m3: ko.computed(function() { return mode() == '2' }), m4: ko.computed(function() { return mode() == '3' }) }\">\n                                <div class=\"grant-selection-group\" data-bind=\"ntsRadioBoxGroup: {\n                                    options: ko.observableArray([\n                                        { id: '0', name: i18n('CPS003_88', [itemNames()['IS00020']]) },\n                                        { id: '1', name: i18n('CPS003_88', [itemNames()['IS00279']]) },\n                                        { id: '2', name: ''}, \n                                        { id: '3', name: ''}]),\n                                    optionsValue: 'id',\n                                    optionsText: 'name',\n                                    value: mode,\n                                    enable: true\n                                }\"></div>\n                                <div class=\"dropdown-box\">\n                                    <div class=\"pk-year\" data-bind=\"ntsComboBox: {\n                                        width: '140px',\n                                        name: i18n('CPS003_89'),\n                                        options: ko.observableArray([\n                                            {optionValue: '0', optionText: i18n('CPS003_131') },\n                                            {optionValue: '1', optionText: i18n('CPS003_132') },\n                                            {optionValue: '2', optionText: i18n('CPS003_133') }\n                                        ]),\n                                        optionsValue: 'optionValue',\n                                        visibleItemsCount: 5,\n                                        value: value,\n                                        optionsText: 'optionText',\n                                        editable: false,\n                                        required: false,\n                                        selectFirstIfNull: true,\n                                        enable: m3,\n                                        columns: [\n                                            { prop: 'optionText', length: 10 },\n                                        ]}\"></div>\n                                    <div id=\"monthdays\" data-bind=\"ntsMonthDays: { name: i18n('CPS003_81'), value: value1, enable: m3, required: m3 }\"/>\n                                </div>\n                                <div class=\"text-box\">\n                                    <div data-bind=\"ntsDatePicker: { name: i18n('CPS003_90'), value: value2, constraint: constraint, enable: m4, required: false, dateFormat: 'YYYY/MM/DD' }\"></div>\n                                </div>\n                            </div>",
                        date: "<div data-bind=\"ntsDatePicker: { name: i18n('CPS003_81'), value: value, constraint: constraint, enable: true, required: false, dateFormat: 'YYYY/MM/DD' }\"></div>",
                        time: "<input data-bind=\"ntsTimeEditor: { name: i18n('CPS003_81'), value: value, constraint: constraint, inputFormat: 'time', mode: 'time', enable: true, required: false }\" />",
                        timey: "<div class='stime-group-box' data-bind=\"let: { m1: ko.computed(function() { return mode() == '0'; }), m2: ko.computed(function() { return mode() == '1'; }) }\">\n                                <div class=\"grant-selection-group\" data-bind=\"ntsRadioBoxGroup: {\n                                    options: ko.observableArray([\n                                        { id: '0', name: i18n('CPS003_91', [itemNames()['IS00253']]) },\n                                        { id: '1', name: '' }]),\n                                    optionsValue: 'id',\n                                    optionsText: 'name',\n                                    value: mode,\n                                    enable: true\n                                }\"></div>\n                                <div class=\"text-box-x\">\n                                    <input data-bind=\"ntsNumberEditor: {\n                                        name: i18n('CPS003_78'), \n                                        value: value,\n                                        constraint: '',\n                                        option: {\n                                            width: '80px',\n                                            unitID: 'DAYS'\n                                        },\n                                        required: true,\n                                        enable: m1\n                                    }\" />\n                                </div>\n                                <div class=\"text-box-a\">\n                                    <input data-bind=\"ntsTimeEditor: { name: i18n('CPS003_81'), value: value1, constraint: constraint, inputFormat: 'time', mode: 'time', enable: m2, required: false }\" />\n                                </div>\n                            </div>",
                        timep: "<input data-bind=\"ntsTimeWithDayEditor: { name: i18n('CPS003_81'), value: value, constraint: constraint, enable: true, required: false }\" />",
                        radio: "<div id=\"value-selection\" data-bind=\"ntsComboBox: {\n                                name: i18n('CPS003_81'),\n                                options: itemOptions,\n                                optionsValue: 'optionValue',\n                                visibleItemsCount: 5,\n                                value: value,\n                                optionsText: 'optionText',\n                                editable: false,\n                                required: required,\n                                selectFirstIfNull: required,\n                                enable: true,\n                                columns: [\n                                    { prop: 'optionText', length: 10 },\n                                ]}\"></div>\n                            <button data-bind=\"ntsHelpButton: { textId: 'CPS003_118', position: 'bottom right' }\">\uFF1F</button>",
                        button: "<button id=\"buttonWt-value\" data-bind=\"text: i18n('CPS003_87'), enable: true, click: openDialog\"></button>\n                             <label class=\"value-text readonly\" data-bind=\"html: textValue\"></label>",
                        buttonWt: "<button id=\"buttonWt-value\" data-bind=\"text: i18n('CPS003_87'), enable: true, click: openDialog\"></button>\n                               <div class=\"worktime\">\n                                 <label class=\"value-text readonly\" data-bind=\"html: textValue\"></label>\n                                 <label class=\"value-text readonly\" data-bind=\"html: textWtValue1\"></label>\n                                 <label class=\"value-text readonly\" data-bind=\"html: textWtValue2\"></label>\n                                </div>"
                    }, vm = {
                        itemNames: ko.observable({}),
                        i18n: nts.uk.resource.getText,
                        mode: ko.observable('0'),
                        value: ko.observable(),
                        value1: ko.observable(),
                        value2: ko.observable(),
                        constraint: '',
                        options: {
                            decimallength: 4,
                            grouplength: 0,
                        },
                        textValue: ko.observable(''),
                        textWtValue1: ko.observable(''),
                        textWtValue2: ko.observable(''),
                        itemOptions: ko.observableArray([]),
                        required: false,
                        openDialog: function () {
                            var itemData = ko.toJS(accessor.itemData), value = ko.toJS(accessor.value().value0);
                            if (['IS00131', 'IS00140',
                                'IS00158', 'IS00167',
                                'IS00176', 'IS00149',
                                'IS00194', 'IS00203',
                                'IS00212', 'IS00221',
                                'IS00230', 'IS00239',
                                'IS00185'].indexOf(itemData.itemCode) > -1) {
                                setShared("kml001multiSelectMode", false);
                                setShared("kml001selectedCodeList", _.isNil(value) ? [] : [value]);
                                //setShared("kml001selectedCodeList", []);
                                setShared("kml001isSelection", true);
                                setShared("kml001selectAbleCodeList", itemData.selectionItems.map(function (x) { return x.optionValue; }), true);
                                modal('at', '/view/kdl/001/a/index.xhtml').onClosed(function () {
                                    var childData = getShared('kml001selectedTimes');
                                    if (childData) {
                                        if (childData.length > 0) {
                                            var data = childData[0];
                                            vm.value(data.selectedWorkTimeCode);
                                            vm.value1(data);
                                            if (data.selectedWorkTimeName == '選択なし') {
                                                data.selectedWorkTimeName = '';
                                                vm.textWtValue1('');
                                                vm.textWtValue2('');
                                            }
                                            vm.textValue("".concat(data.selectedWorkTimeCode, " ").concat(data.selectedWorkTimeName));
                                            if (data.first && data.first.start && data.first.end) {
                                                vm.textWtValue1("".concat(timewd(data.first.start).fullText, " ~ ").concat(timewd(data.first.end).fullText));
                                            }
                                            if (data.second && data.second.start && data.second.end) {
                                                vm.textWtValue2("".concat(timewd(data.second.start).fullText, " ~ ").concat(timewd(data.second.end).fullText));
                                            }
                                        }
                                    }
                                });
                            }
                            else if (['IS00084', 'IS00085'].indexOf(itemData.itemCode) > -1) {
                                fetch1.checkFunctionNo().done(function (role) {
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
                                            var selectedValue = _.filter(ko.toJS(__viewContext.viewModel.currentItem.itemData().selectionItems), function (value) { return value.optionValue == output; });
                                            vm.value(output);
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
                                        vm.value1(childData[0]);
                                        if (childData[0].name == '選択なし') {
                                            childData[0].name = '';
                                            vm.value('');
                                            vm.value1('');
                                        }
                                        vm.textValue("".concat(childData[0].code, " ").concat(childData[0].name));
                                    }
                                });
                            }
                        }
                    };
                    element.classList.add('v-top');
                    // bind data out
                    ko.computed({
                        read: function () {
                            var mode = ko.toJS(vm.mode), value = ko.toJS(vm.value), value1 = ko.toJS(vm.value1), value2 = ko.toJS(vm.value2), textView = '';
                            switch (itemData.dataType) {
                                default:
                                    textView = '';
                                    break;
                                case ITEM_SINGLE_TYPE.DATE:
                                    if ([
                                        'IS00279', 'IS00295',
                                        'IS00302', 'IS00309',
                                        'IS00316', 'IS00323',
                                        'IS00330', 'IS00337',
                                        'IS00344', 'IS00351',
                                        'IS00358', 'IS00559',
                                        'IS00566', 'IS00573',
                                        'IS00580', 'IS00587',
                                        'IS00594', 'IS00601',
                                        'IS00608', 'IS00615',
                                        'IS00622'
                                    ].indexOf(itemData.itemCode) > -1) {
                                        switch (mode) {
                                            case '0':
                                                textView = vm.i18n('CPS003_88', [vm.itemNames()['IS00020']]);
                                                break;
                                            case '1':
                                                textView = vm.i18n('CPS003_88', [vm.itemNames()['IS00279']]);
                                                break;
                                            case '2':
                                                if (value1) {
                                                    switch (value) {
                                                        case "0":
                                                            textView = vm.i18n('CPS003_131') + nts.uk.time.formatMonthDayLocalized(value1);
                                                            break;
                                                        case "1":
                                                            textView = vm.i18n('CPS003_132') + nts.uk.time.formatMonthDayLocalized(value1);
                                                            break;
                                                        case "2":
                                                            textView = vm.i18n('CPS003_133') + nts.uk.time.formatMonthDayLocalized(value1);
                                                            break;
                                                    }
                                                }
                                                break;
                                            case '3':
                                                if (isNaN(Date.parse(value2)) === false) {
                                                    textView = moment.utc(value2).format('YYYY/MM/DD');
                                                }
                                                else {
                                                    textView = value2;
                                                }
                                                break;
                                            default: break;
                                        }
                                    }
                                    else {
                                        if (isNaN(Date.parse(value)) === false) {
                                            textView = moment.utc(value).format('YYYY/MM/DD');
                                        }
                                        else {
                                            textView = value;
                                        }
                                        break;
                                    }
                                    break;
                                case ITEM_SINGLE_TYPE.STRING:
                                    textView = value;
                                    break;
                                case ITEM_SINGLE_TYPE.TIME:
                                    if (itemData.itemCode == 'IS00287') {
                                        if (mode == '0') {
                                            textView = vm.i18n('CPS003_91', [vm.itemNames()['IS00253']]) + ' ' + value;
                                        }
                                        else {
                                            textView = value1 == null ? "" : parseTime(Number(value1), true).format();
                                        }
                                    }
                                    else {
                                        if (value && !isNaN(Number(value))) {
                                            textView = parseTime(Number(value), true).format();
                                        }
                                    }
                                    break;
                                case ITEM_SINGLE_TYPE.TIMEPOINT:
                                    if (value && !isNaN(Number(value))) {
                                        textView = timewd(Number(value)).fullText;
                                    }
                                    break;
                                case ITEM_SINGLE_TYPE.NUMERIC:
                                    if (!itemData.amount) {
                                        if (value && !isNaN(Number(value))) {
                                            textView = value;
                                        }
                                    }
                                    else {
                                        if (mode == '0') {
                                            if (value && !isNaN(Number(value))) {
                                                textView = Number(value).toLocaleString('ja-JP', { useGrouping: true }) + vm.i18n('CPS003_122');
                                            }
                                        }
                                        else {
                                            if (value2 && !isNaN(Number(value2))) {
                                                // format value
                                                textView = value1 + Number(value2).toLocaleString('ja-JP', { useGrouping: true }) + vm.i18n('CPS003_122');
                                            }
                                        }
                                    }
                                    break;
                                case ITEM_SINGLE_TYPE.SELECTION:
                                case ITEM_SINGLE_TYPE.SEL_RADIO:
                                case ITEM_SINGLE_TYPE.SEL_BUTTON:
                                    textView = (_.find(itemData.selectionItems, function (m) { return m.optionValue == value; }) || { optionText: '' }).optionText;
                                    break;
                            }
                            accessor.replacer(textView);
                            accessor.value({
                                mode: mode,
                                value0: value,
                                value1: value1,
                                value2: value2
                            });
                        }
                    });
                    vm.mode.subscribe(function (m) {
                        $(element).find('input').ntsError('clear');
                        setTimeout(function () {
                            if (m == "0") {
                                var input = document.querySelector('.text-box-x input, .number-group-box .text-box input');
                                if (input) {
                                    input.focus();
                                }
                                // clear amount value
                                if (itemData.dataType == ITEM_SINGLE_TYPE.NUMERIC && itemData.amount) {
                                    vm.value2(undefined);
                                }
                                else if (itemData.dataType == ITEM_SINGLE_TYPE.DATE && [
                                    'IS00279', 'IS00295',
                                    'IS00302', 'IS00309',
                                    'IS00316', 'IS00323',
                                    'IS00330', 'IS00337',
                                    'IS00344', 'IS00351',
                                    'IS00358', 'IS00559',
                                    'IS00566', 'IS00573',
                                    'IS00580', 'IS00587',
                                    'IS00594', 'IS00601',
                                    'IS00608', 'IS00615',
                                    'IS00622'
                                ].indexOf(itemData.itemCode) > -1) {
                                    vm.value1(undefined);
                                    vm.value2(undefined);
                                }
                                else if (itemData.dataType == ITEM_SINGLE_TYPE.TIME && itemData.itemCode == 'IS00287') {
                                    vm.value1(undefined);
                                }
                            }
                            else if (m == "1") {
                                var input = document.querySelector('.text-box-a input, .number-group-box .dropdown-box .ntsControl');
                                if (input) {
                                    input.focus();
                                }
                                // clear amount value
                                if (itemData.dataType == ITEM_SINGLE_TYPE.NUMERIC && itemData.amount) {
                                    vm.value(undefined);
                                }
                                else if (itemData.dataType == ITEM_SINGLE_TYPE.DATE && [
                                    'IS00279', 'IS00295',
                                    'IS00302', 'IS00309',
                                    'IS00316', 'IS00323',
                                    'IS00330', 'IS00337',
                                    'IS00344', 'IS00351',
                                    'IS00358', 'IS00559',
                                    'IS00566', 'IS00573',
                                    'IS00580', 'IS00587',
                                    'IS00594', 'IS00601',
                                    'IS00608', 'IS00615',
                                    'IS00622'
                                ].indexOf(itemData.itemCode) > -1) {
                                    vm.value1(undefined);
                                    vm.value2(undefined);
                                }
                                else if (itemData.dataType == ITEM_SINGLE_TYPE.TIME && itemData.itemCode == 'IS00287') {
                                    vm.value(undefined);
                                }
                            }
                            else if (m == "2") {
                                var combx = document.querySelector('.dropdown-box>.ntsControl');
                                if (combx) {
                                    combx.focus();
                                }
                                if (itemData.dataType == ITEM_SINGLE_TYPE.DATE && [
                                    'IS00279', 'IS00295',
                                    'IS00302', 'IS00309',
                                    'IS00316', 'IS00323',
                                    'IS00330', 'IS00337',
                                    'IS00344', 'IS00351',
                                    'IS00358', 'IS00559',
                                    'IS00566', 'IS00573',
                                    'IS00580', 'IS00587',
                                    'IS00594', 'IS00601',
                                    'IS00608', 'IS00615',
                                    'IS00622'
                                ].indexOf(itemData.itemCode) > -1) {
                                    vm.value1(101);
                                    vm.value2(undefined);
                                }
                            }
                            else if (m == "3") {
                                var input = document.querySelector('.text-box input');
                                if (input) {
                                    input.focus();
                                }
                                if (itemData.dataType == ITEM_SINGLE_TYPE.DATE && [
                                    'IS00279', 'IS00295',
                                    'IS00302', 'IS00309',
                                    'IS00316', 'IS00323',
                                    'IS00330', 'IS00337',
                                    'IS00344', 'IS00351',
                                    'IS00358', 'IS00559',
                                    'IS00566', 'IS00573',
                                    'IS00580', 'IS00587',
                                    'IS00594', 'IS00601',
                                    'IS00608', 'IS00615',
                                    'IS00622'
                                ].indexOf(itemData.itemCode) > -1) {
                                    vm.value1(undefined);
                                }
                            }
                        }, 5);
                    });
                    // update value of binding
                    ko.computed({
                        read: function () {
                            var value = ko.toJS(accessor.value);
                        }
                    });
                    ko.computed({
                        read: function () {
                            itemData = ko.toJS(accessor.itemData);
                            // clear old value
                            vm.value('');
                            vm.value1('');
                            vm.value2('');
                            vm.textValue('');
                            vm.textWtValue1('');
                            vm.textWtValue2('');
                            vm.constraint = itemData.constraint;
                            vm.required = itemData.required;
                            // bind items to dropdownList (if avaiable)
                            vm.itemOptions(itemData.selectionItems || []);
                            // clean binding
                            ko.cleanNode(element);
                            nts.uk.ui.errors.clearAll();
                            switch (itemData.dataType) {
                                default:
                                    vm.mode(undefined);
                                    ko.utils.setHtml(element, '');
                                    break;
                                case ITEM_SINGLE_TYPE.DATE:
                                    if ([
                                        'IS00279', 'IS00295',
                                        'IS00302', 'IS00309',
                                        'IS00316', 'IS00323',
                                        'IS00330', 'IS00337',
                                        'IS00344', 'IS00351',
                                        'IS00358', 'IS00559',
                                        'IS00566', 'IS00573',
                                        'IS00580', 'IS00587',
                                        'IS00594', 'IS00601',
                                        'IS00608', 'IS00615',
                                        'IS00622'
                                    ].indexOf(itemData.itemCode) > -1) {
                                        vm.mode('0');
                                        ko.utils.setHtml(element, template.grDate);
                                    }
                                    else {
                                        vm.mode(undefined);
                                        ko.utils.setHtml(element, template.date);
                                    }
                                    break;
                                case ITEM_SINGLE_TYPE.STRING:
                                    vm.mode(undefined);
                                    ko.utils.setHtml(element, template.str);
                                    break;
                                case ITEM_SINGLE_TYPE.TIME:
                                    if (itemData.itemCode == 'IS00287') {
                                        vm.mode('0');
                                        ko.utils.setHtml(element, template.timey);
                                    }
                                    else {
                                        vm.mode(undefined);
                                        ko.utils.setHtml(element, template.time);
                                    }
                                    break;
                                case ITEM_SINGLE_TYPE.TIMEPOINT:
                                    vm.mode(undefined);
                                    ko.utils.setHtml(element, template.timep);
                                    break;
                                case ITEM_SINGLE_TYPE.NUMERIC:
                                    if (!itemData.amount) {
                                        vm.mode(undefined);
                                        ko.utils.setHtml(element, template.numb);
                                        vm.options.grouplength = 0;
                                    }
                                    else {
                                        vm.mode('0');
                                        ko.utils.setHtml(element, template.amount);
                                        vm.options.grouplength = 3;
                                    }
                                    vm.options.decimallength = itemData.decimalLength;
                                    break;
                                case ITEM_SINGLE_TYPE.SELECTION:
                                case ITEM_SINGLE_TYPE.SEL_RADIO:
                                    vm.mode(undefined);
                                    ko.utils.setHtml(element, template.radio);
                                    break;
                                case ITEM_SINGLE_TYPE.SEL_BUTTON:
                                    vm.mode(undefined);
                                    if (['IS00131', 'IS00140',
                                        'IS00158', 'IS00167',
                                        'IS00176', 'IS00149',
                                        'IS00194', 'IS00203',
                                        'IS00212', 'IS00221',
                                        'IS00230', 'IS00239',
                                        'IS00185', 'IS00084',
                                        'IS00085'].indexOf(itemData.itemCode) > -1) {
                                        ko.utils.setHtml(element, template.buttonWt);
                                    }
                                    else {
                                        ko.utils.setHtml(element, template.button);
                                    }
                                    break;
                            }
                            fetch().done(function (v) {
                                vm.itemNames(v);
                                // re binding viewModel to view
                                ko.applyBindingsToDescendants(vm, element);
                            });
                        }
                    });
                    return { controlsDescendantBindings: true };
                };
            }
            return ValueBoxControl;
        }());
        custombinding.ValueBoxControl = ValueBoxControl;
    })(custombinding = nts.custombinding || (nts.custombinding = {}));
})(nts || (nts = {}));
ko.bindingHandlers["cps003fValue"] = new nts.custombinding.ValueBoxControl();
//# sourceMappingURL=value-ko-ext.js.map