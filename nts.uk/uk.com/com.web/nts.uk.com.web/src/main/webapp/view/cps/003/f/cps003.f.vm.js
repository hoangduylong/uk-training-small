var cps003;
(function (cps003) {
    var f;
    (function (f_1) {
        var vm;
        (function (vm) {
            var text = nts.uk.resource.getText;
            var alert = nts.uk.ui.dialog.alert;
            var confirm = nts.uk.ui.dialog.confirm;
            var close = nts.uk.ui.windows.close;
            var parseTime = nts.uk.time.parseTime;
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var validation = validationcps003f;
            var __viewContext = window['__viewContext'] || {}, writeConstraint = window['nts']['uk']['ui']['validation']['writeConstraint'], parseTimeWidthDay = window['nts']['uk']['time']['minutesBased']['clock']['dayattr']['create'];
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.currentItem = {
                        allOrMatch: ko.observableArray([
                            { id: 'all', name: text('CPS003_76') },
                            { id: 'match', name: text('CPS003_77', ['対象項目名']) }
                        ]),
                        id: ko.observable(''),
                        name: ko.observable(''),
                        target: ko.observable(''),
                        applyFor: ko.observable('all'),
                        filter: ko.observable(''),
                        value: ko.observable(),
                        replacer: ko.observable(''),
                        itemData: ko.observable({ itemCode: '', dataType: 0, amount: 0 }),
                        textView: ko.observable('')
                    };
                    this.dataSources = ko.observableArray([]);
                    var self = this, data = getShared('CPS003F_PARAM') || { id: '', baseDate: '', itemsDefIds: [] };
                    self.baseDate = data.baseDate;
                    // sample data
                    if (data.id) {
                        f_1.service.fetch.setting({ categoryId: data.id, itemIds: data.itemsDefIds }).done(function (resp) {
                            var excs = resp.perInfoData.map(function (m) { return m.itemParentCD; }), items = _(resp.perInfoData)
                                .filter(function (f) { return excs.indexOf(f.itemCD) == -1; })
                                .filter(function (f) { return data.itemsDefIds.indexOf(f.perInfoItemDefID) > -1; })
                                .filter(function (f) { return [
                                'IS00133', 'IS00134', 'IS00136', 'IS00137',
                                'IS00142', 'IS00143', 'IS00145', 'IS00146',
                                'IS00151', 'IS00152', 'IS00154', 'IS00155',
                                'IS00160', 'IS00161', 'IS00163', 'IS00164',
                                'IS00169', 'IS00170', 'IS00172', 'IS00173',
                                'IS00178', 'IS00179', 'IS00181', 'IS00182',
                                'IS00196', 'IS00197', 'IS00199', 'IS00200',
                                'IS00205', 'IS00206', 'IS00208', 'IS00209',
                                'IS00214', 'IS00215', 'IS00217', 'IS00218',
                                'IS00223', 'IS00224', 'IS00226', 'IS00227',
                                'IS00232', 'IS00233', 'IS00235', 'IS00236',
                                'IS00241', 'IS00242', 'IS00244', 'IS00245',
                                'IS00187', 'IS00188', 'IS00190', 'IS00191' // IS00185
                            ].indexOf(f.itemCD) == -1; })
                                //.orderBy([])
                                .map(function (m) { return ({ id: m.perInfoItemDefID, name: m.itemName }); }).value();
                            self.dataSources(items);
                            // select first item
                            if (items[0]) {
                                self.currentItem.id(items[0].id);
                            }
                        });
                    }
                    // get info of current item
                    self.currentItem.id.subscribe(function (id) {
                        if (!id) {
                            return;
                        }
                        f_1.service.fetch.getItemsById(id).done(function (item) {
                            if (item && item.itemTypeState.dataTypeState) {
                                var dts = item.itemTypeState.dataTypeState, itemData_1 = {
                                    constraint: '',
                                    constraint_filter: '',
                                    itemName: item.itemName,
                                    itemCode: item.itemCode,
                                    dataType: dts.dataTypeValue,
                                    amount: !!dts.numericItemAmount,
                                    required: !!item.isRequired,
                                    decimalLength: dts.decimalPart,
                                    selectionItems: [],
                                    selectionItem_filters: []
                                }, command = {
                                    itemId: item.id,
                                    required: false,
                                    baseDate: self.baseDate
                                }, constraint = {
                                    itemName: item.itemName,
                                    itemCode: item.itemCode,
                                    required: !!item.isRequired // !!x.isRequired
                                }, constraint_filter = {
                                    itemName: item.itemName + "_filter",
                                    itemCode: item.itemCode + "_filter",
                                    required: false
                                };
                                // set name for display on F2_004
                                self.currentItem.name(item.itemName);
                                self.currentItem.allOrMatch()[1].name = text('CPS003_77', [item.itemName]);
                                self.currentItem.allOrMatch.valueHasMutated();
                                // generate primitive value
                                if (dts) {
                                    switch (dts.dataTypeValue) {
                                        default:
                                        case ITEM_SINGLE_TYPE.STRING:
                                            constraint.valueType = "String";
                                            constraint.maxLength = dts.stringItemLength || dts.maxLength;
                                            constraint.stringExpression = /(?:)/;
                                            constraint_filter.valueType = "String";
                                            constraint_filter.maxLength = dts.stringItemLength || dts.maxLength;
                                            constraint_filter.stringExpression = /(?:)/;
                                            switch (dts.stringItemType) {
                                                default:
                                                case ITEM_STRING_TYPE.ANY:
                                                    constraint.charType = 'Any';
                                                    constraint_filter.charType = 'Any';
                                                    break;
                                                case ITEM_STRING_TYPE.CARDNO:
                                                    constraint.itemCode = 'StampNumber';
                                                    constraint.charType = 'AnyHalfWidth';
                                                    constraint.stringExpression = /^[a-zA-Z0-9\s"#$%&(~|{}\[\]@:`*+?;\\/_\-><)]{1,20}$/;
                                                    constraint_filter.itemCode = 'StampNumber';
                                                    constraint_filter.charType = 'AnyHalfWidth';
                                                    constraint_filter.stringExpression = /^[a-zA-Z0-9\s"#$%&(~|{}\[\]@:`*+?;\\/_\-><)]{1,20}$/;
                                                    break;
                                                case ITEM_STRING_TYPE.EMPLOYEE_CODE:
                                                    constraint.itemCode = 'EmployeeCode';
                                                    constraint.charType = 'AnyHalfWidth';
                                                    constraint_filter.itemCode = 'EmployeeCode';
                                                    constraint_filter.charType = 'AnyHalfWidth';
                                                    break;
                                                case ITEM_STRING_TYPE.ANYHALFWIDTH:
                                                    constraint.charType = 'AnyHalfWidth';
                                                    constraint_filter.charType = 'AnyHalfWidth';
                                                    break;
                                                case ITEM_STRING_TYPE.ALPHANUMERIC:
                                                    constraint.charType = 'AlphaNumeric';
                                                    constraint_filter.charType = 'AlphaNumeric';
                                                    break;
                                                case ITEM_STRING_TYPE.NUMERIC:
                                                    constraint.charType = 'Numeric';
                                                    constraint_filter.charType = 'Numeric';
                                                    break;
                                                case ITEM_STRING_TYPE.KANA:
                                                    constraint.charType = 'Kana';
                                                    constraint_filter.charType = 'Kana';
                                                    break;
                                            }
                                            break;
                                        case ITEM_SINGLE_TYPE.NUMERIC:
                                        case ITEM_SINGLE_TYPE.NUMBERIC_BUTTON:
                                            constraint.charType = 'Numeric';
                                            constraint_filter.charType = 'Numeric';
                                            if (dts.decimalPart == 0) {
                                                constraint.valueType = "Integer";
                                                constraint_filter.valueType = "Integer";
                                            }
                                            else {
                                                constraint.valueType = "Decimal";
                                                constraint.mantissaMaxLength = dts.decimalPart;
                                                constraint_filter.valueType = "Decimal";
                                                constraint_filter.mantissaMaxLength = dts.decimalPart;
                                            }
                                            var max = (Math.pow(10, dts.integerPart) - Math.pow(10, -(dts.decimalPart || 0)));
                                            constraint.min = dts.numericItemMin || 0;
                                            constraint.max = dts.numericItemMax || max;
                                            constraint_filter.min = dts.numericItemMin || 0;
                                            constraint_filter.max = dts.numericItemMax || max;
                                            break;
                                        case ITEM_SINGLE_TYPE.DATE:
                                            constraint.valueType = "Date";
                                            constraint.max = parseTime(dts.max, true).format() || '';
                                            constraint.min = parseTime(dts.min, true).format() || '';
                                            constraint_filter.valueType = "Date";
                                            constraint_filter.max = parseTime(dts.max, true).format() || '';
                                            constraint_filter.min = parseTime(dts.min, true).format() || '';
                                            break;
                                        case ITEM_SINGLE_TYPE.TIME:
                                            constraint.valueType = "Time";
                                            constraint.max = parseTime(dts.max, true).format();
                                            constraint.min = parseTime(dts.min, true).format();
                                            constraint_filter.valueType = "Time";
                                            constraint_filter.max = parseTime(dts.max, true).format();
                                            constraint_filter.min = parseTime(dts.min, true).format();
                                            break;
                                        case ITEM_SINGLE_TYPE.TIMEPOINT:
                                            constraint.valueType = "Clock";
                                            constraint.max = parseTimeWidthDay(dts.timePointItemMax).shortText;
                                            constraint.min = parseTimeWidthDay(dts.timePointItemMin).shortText;
                                            constraint_filter.valueType = "Clock";
                                            constraint_filter.max = parseTimeWidthDay(dts.timePointItemMax).shortText;
                                            constraint_filter.min = parseTimeWidthDay(dts.timePointItemMin).shortText;
                                            break;
                                        case ITEM_SINGLE_TYPE.SELECTION:
                                            constraint.valueType = "Selection";
                                            constraint_filter.valueType = "Selection";
                                            break;
                                        case ITEM_SINGLE_TYPE.SEL_RADIO:
                                            constraint.valueType = "Radio";
                                            constraint_filter.valueType = "Radio";
                                            break;
                                        case ITEM_SINGLE_TYPE.SEL_BUTTON:
                                            constraint.valueType = "Button";
                                            constraint_filter.valueType = "Button";
                                            break;
                                        case ITEM_SINGLE_TYPE.READONLY:
                                            constraint.valueType = "READONLY";
                                            constraint_filter.valueType = "READONLY";
                                            break;
                                        case ITEM_SINGLE_TYPE.RELATE_CATEGORY:
                                            constraint.valueType = "RELATE_CATEGORY";
                                            constraint_filter.valueType = "RELATE_CATEGORY";
                                            break;
                                        case ITEM_SINGLE_TYPE.READONLY_BUTTON:
                                            constraint.valueType = "READONLY_BUTTON";
                                            constraint_filter.valueType = "READONLY_BUTTON";
                                            break;
                                    }
                                }
                                // update constraint for filter, value control
                                itemData_1.constraint = constraint.itemCode;
                                itemData_1.constraint_filter = constraint_filter.itemCode;
                                if (constraint.itemCode == 'EmployeeCode') {
                                    _.extend(constraint, {
                                        formatOption: __viewContext.primitiveValueConstraints.EmployeeCode.formatOption
                                    });
                                    _.extend(constraint_filter, {
                                        formatOption: __viewContext.primitiveValueConstraints.EmployeeCode.formatOption
                                    });
                                }
                                writeConstraint(constraint.itemCode, constraint);
                                writeConstraint(constraint_filter.itemCode, constraint_filter);
                                // if dataType isn't selection item
                                if ([ITEM_SINGLE_TYPE.SELECTION, ITEM_SINGLE_TYPE.SEL_RADIO, ITEM_SINGLE_TYPE.SEL_BUTTON]
                                    .indexOf(item.itemTypeState.dataTypeState.dataTypeValue) == -1) {
                                    self.currentItem.itemData(itemData_1);
                                    //self.currentItem.filter.valueHasMutated();
                                }
                                else {
                                    // get selection options
                                    f_1.service.fetch.getCbxOptions(command).done(function (items) {
                                        itemData_1.selectionItems = items;
                                        self.currentItem.itemData(itemData_1);
                                        //self.currentItem.filter.valueHasMutated();
                                    });
                                }
                                if (["IS00003", "IS00004", "IS00015", "IS00015"].indexOf(self.currentItem.itemData().itemCode) > -1) {
                                    validation.initCheckErrorSpecialItem(self.currentItem);
                                }
                            }
                            else {
                                self.currentItem.itemData({ itemCode: '', dataType: 0, amount: 0, selectionItems: [] });
                                self.currentItem.filter.valueHasMutated();
                            }
                        });
                    });
                    // 対象者
                    ko.computed({
                        read: function () {
                            var target = ko.toJS(self.currentItem.applyFor), filter = ko.toJS(self.currentItem.filter), itemName = ko.toJS(self.currentItem.name), itemData = ko.toJS(self.currentItem.itemData);
                            if (target == 'all') {
                                self.currentItem.target(text('CPS003_119'));
                            }
                            else {
                                if (itemData.dataType == ITEM_SINGLE_TYPE.NUMERIC || itemData.dataType == ITEM_SINGLE_TYPE.TIME || itemData.dataType == ITEM_SINGLE_TYPE.TIMEPOINT) {
                                    if (!!filter || filter === 0 || (filter != "" && filter != null)) {
                                        var value = '';
                                        switch (itemData.dataType) {
                                            case ITEM_SINGLE_TYPE.DATE:
                                                value = moment.utc(filter).format('YYYY/MM/DD');
                                                break;
                                            case ITEM_SINGLE_TYPE.STRING:
                                                value = filter;
                                                break;
                                            case ITEM_SINGLE_TYPE.NUMERIC:
                                                if ((filter || filter === 0) && !isNaN(Number(filter))) {
                                                    if (!itemData.amount) {
                                                        value = filter;
                                                    }
                                                    else {
                                                        value = Number(filter).toLocaleString('ja-JP', { useGrouping: true }) + text('CPS003_122');
                                                    }
                                                }
                                                break;
                                            case ITEM_SINGLE_TYPE.TIME:
                                                if ((filter || filter === 0) && !isNaN(Number(filter))) {
                                                    try {
                                                        value = parseTime(Number(filter), true).format();
                                                    }
                                                    catch (error) {
                                                        value = value;
                                                    }
                                                }
                                                break;
                                            case ITEM_SINGLE_TYPE.TIMEPOINT:
                                                if ((filter || filter === 0) && !isNaN(Number(filter))) {
                                                    try {
                                                        value = parseTimeWidthDay(Number(filter)).fullText;
                                                    }
                                                    catch (err) {
                                                        value = value;
                                                    }
                                                }
                                                break;
                                            case ITEM_SINGLE_TYPE.SELECTION:
                                            case ITEM_SINGLE_TYPE.SEL_RADIO:
                                            case ITEM_SINGLE_TYPE.SEL_BUTTON:
                                                value = (_.find(itemData.selectionItems, function (m) { return m.optionValue == filter; }) || { optionText: '' }).optionText;
                                                break;
                                        }
                                        self.currentItem.target(text('CPS003_120', [itemName, value]));
                                    }
                                    else {
                                        self.currentItem.target(text('CPS003_121', [itemName]));
                                    }
                                }
                                else {
                                    if (!!filter) {
                                        var value = '';
                                        switch (itemData.dataType) {
                                            case ITEM_SINGLE_TYPE.DATE:
                                                if (isNaN(Date.parse(filter)) === false) {
                                                    value = moment.utc(filter).format('YYYY/MM/DD');
                                                }
                                                else {
                                                    value = filter;
                                                }
                                                break;
                                            case ITEM_SINGLE_TYPE.STRING:
                                                value = filter;
                                                break;
                                            case ITEM_SINGLE_TYPE.NUMERIC:
                                                if (filter && !isNaN(Number(filter))) {
                                                    if (!itemData.amount) {
                                                        value = filter;
                                                    }
                                                    else {
                                                        value = Number(filter).toLocaleString('ja-JP', { useGrouping: true }) + text('CPS003_122');
                                                    }
                                                }
                                                break;
                                            case ITEM_SINGLE_TYPE.TIME:
                                                if (filter && !isNaN(Number(filter))) {
                                                    value = parseTime(Number(filter), true).format();
                                                }
                                                break;
                                            case ITEM_SINGLE_TYPE.TIMEPOINT:
                                                if (filter && !isNaN(Number(filter))) {
                                                    value = parseTimeWidthDay(Number(filter)).fullText;
                                                }
                                                break;
                                            case ITEM_SINGLE_TYPE.SELECTION:
                                            case ITEM_SINGLE_TYPE.SEL_RADIO:
                                            case ITEM_SINGLE_TYPE.SEL_BUTTON:
                                                value = (_.find(itemData.selectionItems, function (m) { return m.optionValue == filter; }) || { optionText: '' }).optionText;
                                                break;
                                        }
                                        self.currentItem.target(text('CPS003_120', [itemName, value]));
                                    }
                                    else {
                                        self.currentItem.target(text('CPS003_121', [itemName]));
                                    }
                                }
                            }
                        }
                    });
                    ko.computed({
                        read: function () {
                            var itemData = self.currentItem.itemData() || {}, rep = self.currentItem.value() || {};
                            if (itemData.amount && rep.mode == 2) {
                                self.currentItem.textView(text('CPS003_95'));
                            }
                            else {
                                self.currentItem.textView(text('CPS003_94'));
                            }
                        }
                    });
                }
                ViewModel.prototype.pushData = function () {
                    var self = this, item = ko.toJS(self.currentItem), mode = item.value.mode != undefined ? Number(item.value.mode) : null, value = {
                        mode: undefined,
                        replaceAll: item.applyFor == 'all',
                        targetItem: item.itemData.itemCode,
                        matchValue: item.filter || null,
                        replaceValue: undefined,
                        replaceFormat: undefined
                    };
                    if (item.itemData.dataType == ITEM_SINGLE_TYPE.NUMERIC || item.itemData.dataType == ITEM_SINGLE_TYPE.TIME || item.itemData.dataType == ITEM_SINGLE_TYPE.TIMEPOINT) {
                        if (item.filter === 0 || item.filter === "") {
                            value.matchValue = item.filter;
                        }
                    }
                    nts.uk.ui.errors.clearAll();
                    $('input:not([disabled])').trigger('validate');
                    validation.initCheckError(self.currentItem);
                    validation.checkError(self.currentItem);
                    if (nts.uk.ui.errors.hasError()) {
                        return;
                    }
                    switch (item.itemData.dataType) {
                        default:
                            break;
                        case ITEM_SINGLE_TYPE.DATE:
                            if (value.matchValue) {
                                value.matchValue = moment.utc(value.matchValue).format('YYYY/MM/DD');
                            }
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
                            ].indexOf(item.itemData.itemCode) > -1) {
                                value.mode = APPLY_MODE.GRANDDATE;
                                var i_1 = 0, optionsText = $(".grant-selection-group").find(".ntsRadioBox");
                                for (i_1 = 0; i_1 < optionsText.length; i_1++) {
                                    if (i_1 == mode) {
                                        item.itemName_grant = optionsText[i_1].innerText;
                                        break;
                                    }
                                }
                                console.log(item.itemName_grant);
                                switch (mode) {
                                    case 0:
                                        value.replaceFormat = REPLACE_FORMAT.HIRE_DATE;
                                        break;
                                    case 1:
                                        value.replaceFormat = REPLACE_FORMAT.GRAND_DATE;
                                        break;
                                    case 2:
                                        value.replaceValue = [Number(item.value.value0), item.value.value1];
                                        value.replaceFormat = REPLACE_FORMAT.DESI_YEAR_OE;
                                        break;
                                    case 3:
                                        if (item.value.value2) {
                                            value.replaceValue = moment.utc(item.value.value2).format('YYYY/MM/DD');
                                        }
                                        value.replaceFormat = REPLACE_FORMAT.VALUE;
                                        break;
                                }
                            }
                            else {
                                value.mode = APPLY_MODE.DATE;
                                if (item.value.value0) {
                                    value.replaceValue = moment.utc(item.value.value0).format('YYYY/MM/DD');
                                }
                                value.replaceFormat = REPLACE_FORMAT.VALUE;
                            }
                            break;
                        case ITEM_SINGLE_TYPE.STRING:
                            value.mode = APPLY_MODE.STRING;
                            value.replaceValue = item.value.value0;
                            value.replaceFormat = REPLACE_FORMAT.VALUE;
                            break;
                        case ITEM_SINGLE_TYPE.TIME:
                            if (item.itemData.itemCode == 'IS00287') {
                                value.mode = APPLY_MODE.TIMEYEAR;
                                if (mode == 0) {
                                    value.replaceValue = Number(item.value.value0);
                                    value.replaceFormat = REPLACE_FORMAT.CONTRACT_TIME;
                                }
                                else {
                                    value.replaceValue = item.value.value1;
                                    value.replaceFormat = REPLACE_FORMAT.VALUE;
                                }
                            }
                            else {
                                value.mode = APPLY_MODE.TIME;
                                value.replaceValue = item.value.value0;
                                value.replaceFormat = REPLACE_FORMAT.VALUE;
                            }
                            break;
                        case ITEM_SINGLE_TYPE.TIMEPOINT:
                            value.mode = APPLY_MODE.CLOCK;
                            value.replaceValue = item.value.value0;
                            value.replaceFormat = REPLACE_FORMAT.VALUE;
                            break;
                        case ITEM_SINGLE_TYPE.NUMERIC:
                            if (value.matchValue != null && value.matchValue != "") {
                                value.matchValue = Number(value.matchValue);
                            }
                            else {
                                value.matchValue = null;
                            }
                            if (!item.itemData.amount) {
                                value.mode = APPLY_MODE.NUMBER;
                                if (item.value.value0) {
                                    value.replaceValue = Number(item.value.value0);
                                }
                                value.replaceFormat = REPLACE_FORMAT.VALUE;
                            }
                            else {
                                value.mode = APPLY_MODE.AMOUNT;
                                if (mode == 0) {
                                    if (item.value.value0) {
                                        value.replaceValue = Number(item.value.value0);
                                    }
                                    value.replaceFormat = REPLACE_FORMAT.VALUE;
                                }
                                else {
                                    if (item.value.value2) {
                                        value.replaceValue = Number(item.value.value1 + item.value.value2);
                                    }
                                    value.replaceFormat = REPLACE_FORMAT.ADD_OR_SUB;
                                }
                            }
                            break;
                        case ITEM_SINGLE_TYPE.SELECTION:
                        case ITEM_SINGLE_TYPE.SEL_RADIO:
                        case ITEM_SINGLE_TYPE.SEL_BUTTON:
                            if ([
                                ITEM_SINGLE_TYPE.SELECTION,
                                ITEM_SINGLE_TYPE.SEL_RADIO
                            ].indexOf(item.itemData.dataType) > -1) {
                                value.mode = APPLY_MODE.SELECTION;
                                value.replaceValue = item.value.value0;
                                value.replaceFormat = REPLACE_FORMAT.VALUE;
                            }
                            else {
                                if (['IS00131', 'IS00140',
                                    'IS00158', 'IS00167',
                                    'IS00176', 'IS00149',
                                    'IS00194', 'IS00203',
                                    'IS00212', 'IS00221',
                                    'IS00230', 'IS00239',
                                    'IS00185'].indexOf(item.itemData.itemCode) > -1) {
                                    var target = value.targetItem, values = item.value.value1;
                                    value.mode = APPLY_MODE.WORKTIME;
                                    switch (target) {
                                        case "IS00131":
                                            value.targetItem = [target, 'IS00133', 'IS00134', 'IS00136', 'IS00137'];
                                            break;
                                        case "IS00140":
                                            value.targetItem = [target, 'IS00142', 'IS00143', 'IS00145', 'IS00146'];
                                            break;
                                        case "IS00158":
                                            value.targetItem = [target, 'IS00160', 'IS00161', 'IS00163', 'IS00164'];
                                            break;
                                        case "IS00167":
                                            value.targetItem = [target, 'IS00169', 'IS00170', 'IS00172', 'IS00173'];
                                            break;
                                        case "IS00176":
                                            value.targetItem = [target, 'IS00178', 'IS00179', 'IS00181', 'IS00182'];
                                            break;
                                        case "IS00149":
                                            value.targetItem = [target, 'IS00151', 'IS00152', 'IS00154', 'IS00155'];
                                            break;
                                        case "IS00194":
                                            value.targetItem = [target, 'IS00196', 'IS00197', 'IS00199', 'IS00200'];
                                            break;
                                        case "IS00203":
                                            value.targetItem = [target, 'IS00205', 'IS00206', 'IS00208', 'IS00209'];
                                            break;
                                        case "IS00212":
                                            value.targetItem = [target, 'IS00214', 'IS00215', 'IS00217', 'IS00218'];
                                            break;
                                        case "IS00221":
                                            value.targetItem = [target, 'IS00223', 'IS00224', 'IS00226', 'IS00227'];
                                            break;
                                        case "IS00230":
                                            value.targetItem = [target, 'IS00232', 'IS00233', 'IS00235', 'IS00236'];
                                            break;
                                        case "IS00239":
                                            value.targetItem = [target, 'IS00241', 'IS00242', 'IS00244', 'IS00245'];
                                            break;
                                        case "IS00185":
                                            value.targetItem = [target, 'IS00187', 'IS00188', 'IS00190', 'IS00191'];
                                            break;
                                    }
                                    value.replaceValue = [
                                        values.selectedWorkTimeCode,
                                        values.first == undefined ? null : values.first.start,
                                        values.first == undefined ? null : values.first.end,
                                        values.second == undefined ? null : values.second.start,
                                        values.second == undefined ? null : values.second.end
                                    ];
                                    value.replaceFormat = REPLACE_FORMAT.VALUE;
                                }
                                else {
                                    value.mode = APPLY_MODE.SELECTION;
                                    value.replaceValue = item.value.value0;
                                    value.replaceFormat = REPLACE_FORMAT.VALUE;
                                }
                            }
                            break;
                    }
                    // 画面項目「対象者選択（F1_007）」の状態をチェックする
                    if (value.replaceAll) { // 全員（F1_008）が選択されている場合
                        if (mode == null) {
                            var checkArray = Array.isArray(value.replaceValue), replaceValue = checkArray == true ? value.replaceValue[0] : value.replaceValue;
                            if (replaceValue) {
                                confirm({ messageId: 'Msg_633', messageParams: [item.name, item.replacer] }).ifYes(function () {
                                    setShared('CPS003F_VALUE', value);
                                    close();
                                });
                            }
                            else {
                                if (checkArray == true) {
                                    value.replaceValue[0] = null;
                                }
                                else {
                                    value.replaceValue = null;
                                }
                                confirm({ messageId: 'Msg_634', messageParams: [item.name] }).ifYes(function () {
                                    setShared('CPS003F_VALUE', value);
                                    close();
                                });
                            }
                        }
                        else {
                            if (item.itemData.amount) { // 画面モード＝金額モードの場合
                                if (mode == 0) { // 通常置換（F1_026）が選択されている場合
                                    if (value.replaceValue) {
                                        confirm({ messageId: 'Msg_633', messageParams: [item.name, item.replacer] }).ifYes(function () {
                                            setShared('CPS003F_VALUE', value);
                                            close();
                                        });
                                    }
                                    else {
                                        confirm({ messageId: 'Msg_634', messageParams: [item.name] }).ifYes(function () {
                                            setShared('CPS003F_VALUE', value);
                                            close();
                                        });
                                    }
                                }
                                else { // 加減算（F1_027）が選択されている場合
                                    if (value.replaceValue) {
                                        confirm({ messageId: 'Msg_679', messageParams: [item.name, text(value.replaceValue > 0 ? 'CPS003_123' : 'CPS003_124') + Math.abs(value.replaceValue) + text('CPS003_122')] }).ifYes(function () {
                                            setShared('CPS003F_VALUE', value);
                                            close();
                                        });
                                    }
                                }
                            }
                            else {
                                // 画面モード＝時間年休上限モードの場合
                                if (item.itemData.dataType == ITEM_SINGLE_TYPE.TIME && item.itemData.itemCode == 'IS00287') {
                                    if (mode == 0) {
                                        confirm({ messageId: 'Msg_633', messageParams: [item.name, item.replacer] }).ifYes(function () {
                                            setShared('CPS003F_VALUE', value);
                                            close();
                                        });
                                    }
                                    else {
                                        if (value.replaceValue) {
                                            confirm({ messageId: 'Msg_633', messageParams: [item.name, item.replacer] }).ifYes(function () {
                                                setShared('CPS003F_VALUE', value);
                                                close();
                                            });
                                        }
                                        else {
                                            confirm({ messageId: 'Msg_634', messageParams: [item.name] }).ifYes(function () {
                                                setShared('CPS003F_VALUE', value);
                                                close();
                                            });
                                        }
                                    }
                                }
                                else {
                                    if ([0, 1].indexOf(mode) > -1) {
                                        confirm({ messageId: 'Msg_633', messageParams: [item.name, item.itemName_grant] }).ifYes(function () {
                                            setShared('CPS003F_VALUE', value);
                                            close();
                                        });
                                    }
                                    else if (mode == 2) {
                                        var options = [{ optionValue: '0', optionText: text('CPS003_131') },
                                            { optionValue: '1', optionText: text('CPS003_132') },
                                            { optionValue: '2', optionText: text('CPS003_133') }], optionTextSeleted = _.filter(options, function (c) { return c.optionValue == item.value.value0; }), month = Math.floor(item.value.value1 / 100), day = item.value.value1 % 100;
                                        confirm({ messageId: 'Msg_633', messageParams: [item.name, optionTextSeleted[0].optionText + month + "月" + day + "日"] }).ifYes(function () {
                                            setShared('CPS003F_VALUE', value);
                                            close();
                                        });
                                    }
                                    else {
                                        if (value.replaceValue) {
                                            confirm({ messageId: 'Msg_633', messageParams: [item.name, value.replaceValue] }).ifYes(function () {
                                                setShared('CPS003F_VALUE', value);
                                                close();
                                            });
                                        }
                                        else {
                                            confirm({ messageId: 'Msg_634', messageParams: [item.name] }).ifYes(function () {
                                                setShared('CPS003F_VALUE', value);
                                                close();
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else { // 一致する社員のみ（F1_009）が選択されている場合
                        var isNumber = (item.itemData.dataType == ITEM_SINGLE_TYPE.NUMERIC || item.itemData.dataType == ITEM_SINGLE_TYPE.NUMBERIC_BUTTON || item.itemData.dataType == ITEM_SINGLE_TYPE.TIME || item.itemData.dataType == ITEM_SINGLE_TYPE.TIMEPOINT);
                        if (value.matchValue || ((value.matchValue === 0) && isNumber)) {
                            if (mode == null) {
                                var checkArray = Array.isArray(value.replaceValue), replaceValue_1 = checkArray == true ? value.replaceValue[0] : value.replaceValue;
                                if (replaceValue_1 || ((replaceValue_1 === 0) && isNumber)) {
                                    var matchText = value.matchValue, replaceText = value.replaceValue;
                                    if (item.itemData.dataType == ITEM_SINGLE_TYPE.SELECTION || item.itemData.dataType == ITEM_SINGLE_TYPE.SEL_BUTTON) {
                                        var itemMatch = _.filter(item.itemData.selectionItems, function (x) { return x.optionValue == value.matchValue; }), itemReplace = _.filter(item.itemData.selectionItems, function (x) { return x.optionValue == replaceValue_1; });
                                        if (itemMatch.length > 0) {
                                            matchText = itemMatch[0].optionText;
                                            replaceText = itemReplace[0].optionText;
                                        }
                                    }
                                    else if (item.itemData.dataType == ITEM_SINGLE_TYPE.TIMEPOINT) {
                                        matchText = parseTimeWidthDay(value.matchValue).fullText;
                                        replaceText = parseTimeWidthDay(value.replaceValue).fullText;
                                    }
                                    else if (item.itemData.dataType == ITEM_SINGLE_TYPE.TIME) {
                                        matchText = parseTime(value.matchValue, true).format();
                                        replaceText = parseTime(value.replaceValue, true).format();
                                    }
                                    confirm({ messageId: 'Msg_635', messageParams: [item.name, matchText, replaceText] }).ifYes(function () {
                                        setShared('CPS003F_VALUE', value);
                                        close();
                                    });
                                }
                                else {
                                    var valueTextMatch = item.replacer;
                                    if (checkArray == true) {
                                        value.replaceValue[0] = null;
                                    }
                                    else {
                                        value.replaceValue = null;
                                    }
                                    if (item.itemData.dataType == ITEM_SINGLE_TYPE.SELECTION || item.itemData.dataType == ITEM_SINGLE_TYPE.SEL_BUTTON) {
                                        var itemX = _.filter(item.itemData.selectionItems, function (x) { return x.optionValue == value.matchValue; });
                                        if (itemX.length > 0) {
                                            valueTextMatch = itemX[0].optionText;
                                        }
                                    }
                                    else if (item.itemData.dataType == ITEM_SINGLE_TYPE.TIMEPOINT) {
                                        valueTextMatch = parseTimeWidthDay(value.matchValue).fullText;
                                    }
                                    else if (item.itemData.dataType == ITEM_SINGLE_TYPE.TIME) {
                                        valueTextMatch = parseTime(value.matchValue, true).format();
                                    }
                                    else {
                                        valueTextMatch = value.matchValue;
                                    }
                                    confirm({ messageId: 'Msg_636', messageParams: [item.name, valueTextMatch] }).ifYes(function () {
                                        setShared('CPS003F_VALUE', value);
                                        close();
                                    });
                                }
                            }
                            else {
                                if (item.itemData.amount) {
                                    if (mode == 0) { // 通常置換（F1_026）が選択されている場合
                                        if (value.replaceValue) {
                                            confirm({ messageId: 'Msg_635', messageParams: [item.name, Number(value.matchValue).toLocaleString('ja-JP', { useGrouping: true }) + text('CPS003_122'), item.replacer] }).ifYes(function () {
                                                setShared('CPS003F_VALUE', value);
                                                close();
                                            });
                                        }
                                        else {
                                            confirm({ messageId: 'Msg_636', messageParams: [item.name, value.matchValue + text('CPS003_122')] }).ifYes(function () {
                                                setShared('CPS003F_VALUE', value);
                                                close();
                                            });
                                        }
                                    }
                                    else { // 加減算（F1_027）が選択されている場合
                                        if (value.replaceValue) {
                                            confirm({ messageId: 'Msg_714', messageParams: [item.name, Number(value.matchValue).toLocaleString('ja-JP', { useGrouping: true }), text(value.replaceValue > 0 ? 'CPS003_123' : 'CPS003_124') + Number(Math.abs(value.replaceValue)).toLocaleString('ja-JP', { useGrouping: true }) + text('CPS003_122')] }).ifYes(function () {
                                                setShared('CPS003F_VALUE', value);
                                                close();
                                            });
                                        }
                                    }
                                }
                                else {
                                    if ([0, 1, 2].indexOf(mode) > -1) {
                                        var valueTextMatch = value.matchValue;
                                        if (item.itemData.dataType == ITEM_SINGLE_TYPE.TIMEPOINT) {
                                            valueTextMatch = parseTimeWidthDay(value.matchValue).fullText;
                                        }
                                        else if (item.itemData.dataType == ITEM_SINGLE_TYPE.TIME) {
                                            valueTextMatch = parseTime(value.matchValue, true).format();
                                        }
                                        if (value.replaceValue) {
                                            confirm({ messageId: 'Msg_635', messageParams: [item.name, valueTextMatch, item.replacer] }).ifYes(function () {
                                                setShared('CPS003F_VALUE', value);
                                                close();
                                            });
                                        }
                                        else {
                                            confirm({ messageId: 'Msg_636', messageParams: [item.name, valueTextMatch] }).ifYes(function () {
                                                setShared('CPS003F_VALUE', value);
                                                close();
                                            });
                                        }
                                    }
                                    else {
                                        if (value.replaceValue) {
                                            confirm({ messageId: 'Msg_635', messageParams: [item.name, value.matchValue, value.replaceValue] }).ifYes(function () {
                                                setShared('CPS003F_VALUE', value);
                                                close();
                                            });
                                        }
                                        else {
                                            confirm({ messageId: 'Msg_636', messageParams: [item.name, item.replacer] }).ifYes(function () {
                                                setShared('CPS003F_VALUE', value);
                                                close();
                                            });
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            if (mode == null) {
                                var checkArray = Array.isArray(value.replaceValue), replaceValue = checkArray == true ? value.replaceValue[0] : value.replaceValue;
                                if (replaceValue || (replaceValue === 0 && (item.itemData.dataType == ITEM_SINGLE_TYPE.NUMERIC || item.itemData.dataType == ITEM_SINGLE_TYPE.NUMBERIC_BUTTON || item.itemData.dataType == ITEM_SINGLE_TYPE.TIME || item.itemData.dataType == ITEM_SINGLE_TYPE.TIMEPOINT))) {
                                    confirm({ messageId: 'Msg_637', messageParams: [item.name, item.replacer] }).ifYes(function () {
                                        setShared('CPS003F_VALUE', value);
                                        close();
                                    });
                                }
                                else {
                                    if (checkArray == true) {
                                        value.replaceValue[0] = null;
                                    }
                                    else {
                                        value.replaceValue = null;
                                    }
                                    alert({ messageId: 'Msg_638', messageParams: [item.name, item.replacer] }).then(function () {
                                        setShared('CPS003F_VALUE', null);
                                        //close();
                                    });
                                }
                            }
                            else {
                                if (item.itemData.amount) {
                                    if ((value.replaceValue || value.matchValue) && mode == 0) {
                                        if (mode == 0) {
                                            confirm({ messageId: 'Msg_637', messageParams: [item.name, item.replacer] }).ifYes(function () {
                                                setShared('CPS003F_VALUE', value);
                                                close();
                                            });
                                        }
                                        else {
                                            alert({ messageId: 'Msg_638', messageParams: [item.name, item.replacer + text('CPS003_122')] }).then(function () {
                                                setShared('CPS003F_VALUE', null);
                                                //close();
                                            });
                                        }
                                    }
                                    else {
                                        if (mode == 0) {
                                            alert({ messageId: 'Msg_638', messageParams: [item.name, item.replacer + text('CPS003_122')] }).then(function () {
                                                setShared('CPS003F_VALUE', null);
                                                //close();
                                            });
                                        }
                                        else {
                                            alert({ messageId: 'Msg_1069', messageParams: [] }).then(function () {
                                                setShared('CPS003F_VALUE', null);
                                                //close();
                                            });
                                        }
                                    }
                                }
                                else {
                                    // 画面モード＝時間年休上限モードの場合
                                    if (item.itemData.dataType == ITEM_SINGLE_TYPE.TIME && item.itemData.itemCode == 'IS00287') {
                                        if (value.matchValue) {
                                            if (mode == 0) {
                                                confirm({ messageId: 'Msg_635', messageParams: [item.name, value.matchValue, item.replacer] }).ifYes(function () {
                                                    setShared('CPS003F_VALUE', value);
                                                    close();
                                                });
                                            }
                                            else {
                                                if (value.replaceValue) {
                                                    confirm({ messageId: 'Msg_635', messageParams: [item.name, value.matchValue, item.replacer] }).ifYes(function () {
                                                        setShared('CPS003F_VALUE', value);
                                                        close();
                                                    });
                                                }
                                                else {
                                                    confirm({ messageId: 'Msg_636', messageParams: [item.name, item.replacer] }).ifYes(function () {
                                                        setShared('CPS003F_VALUE', value);
                                                        close();
                                                    });
                                                }
                                            }
                                        }
                                        else {
                                            if (mode == 0) {
                                                confirm({ messageId: 'Msg_637', messageParams: [item.name, item.replacer] }).ifYes(function () {
                                                    setShared('CPS003F_VALUE', value);
                                                    close();
                                                });
                                            }
                                            else {
                                                if (value.replaceValue) {
                                                    confirm({ messageId: 'Msg_637', messageParams: [item.name, item.replacer] }).ifYes(function () {
                                                        setShared('CPS003F_VALUE', value);
                                                        close();
                                                    });
                                                }
                                                else {
                                                    alert({ messageId: 'Msg_638', messageParams: [item.name, item.replacer] }).then(function () {
                                                        setShared('CPS003F_VALUE', null);
                                                        //close();
                                                    });
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        if ([0, 1].indexOf(mode) > -1) {
                                            confirm({ messageId: 'Msg_637', messageParams: [item.name, item.itemName_grant] }).ifYes(function () {
                                                setShared('CPS003F_VALUE', value);
                                                close();
                                            });
                                        }
                                        else if (mode == 2) {
                                            var options = [{ optionValue: '0', optionText: text('CPS003_131') },
                                                { optionValue: '1', optionText: text('CPS003_132') },
                                                { optionValue: '2', optionText: text('CPS003_133') }], optionTextSeleted = _.filter(options, function (c) { return c.optionValue == item.value.value0; }), month = Math.floor(item.value.value1 / 100), day = item.value.value1 % 100;
                                            confirm({ messageId: 'Msg_637', messageParams: [item.name, optionTextSeleted[0].optionText + month + "月" + day + "日"] }).ifYes(function () {
                                                setShared('CPS003F_VALUE', value);
                                                close();
                                            });
                                        }
                                        else {
                                            if (value.replaceValue) {
                                                confirm({ messageId: 'Msg_637', messageParams: [item.name, value.replaceValue] }).ifYes(function () {
                                                    setShared('CPS003F_VALUE', value);
                                                    close();
                                                });
                                            }
                                            else {
                                                alert({ messageId: 'Msg_638', messageParams: [item.name, value.replaceValue] }).then(function () {
                                                    setShared('CPS003F_VALUE', null);
                                                    //close();
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                ViewModel.prototype.close = function () {
                    close();
                };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
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
            var ITEM_STRING_TYPE;
            (function (ITEM_STRING_TYPE) {
                ITEM_STRING_TYPE[ITEM_STRING_TYPE["ANY"] = 1] = "ANY";
                // 2:全ての半角文字(AnyHalfWidth)
                ITEM_STRING_TYPE[ITEM_STRING_TYPE["ANYHALFWIDTH"] = 2] = "ANYHALFWIDTH";
                // 3:半角英数字(AlphaNumeric)
                ITEM_STRING_TYPE[ITEM_STRING_TYPE["ALPHANUMERIC"] = 3] = "ALPHANUMERIC";
                // 4:半角数字(Numeric)
                ITEM_STRING_TYPE[ITEM_STRING_TYPE["NUMERIC"] = 4] = "NUMERIC";
                // 5:全角カタカナ(Kana)
                ITEM_STRING_TYPE[ITEM_STRING_TYPE["KANA"] = 5] = "KANA";
                // 6: カードNO
                ITEM_STRING_TYPE[ITEM_STRING_TYPE["CARDNO"] = 6] = "CARDNO";
                // 7: 社員コード
                ITEM_STRING_TYPE[ITEM_STRING_TYPE["EMPLOYEE_CODE"] = 7] = "EMPLOYEE_CODE";
            })(ITEM_STRING_TYPE || (ITEM_STRING_TYPE = {}));
            var APPLY_MODE;
            (function (APPLY_MODE) {
                APPLY_MODE[APPLY_MODE["DATE"] = 1] = "DATE";
                APPLY_MODE[APPLY_MODE["STRING"] = 2] = "STRING";
                APPLY_MODE[APPLY_MODE["TIME"] = 3] = "TIME";
                APPLY_MODE[APPLY_MODE["CLOCK"] = 4] = "CLOCK";
                APPLY_MODE[APPLY_MODE["NUMBER"] = 5] = "NUMBER";
                APPLY_MODE[APPLY_MODE["AMOUNT"] = 6] = "AMOUNT";
                APPLY_MODE[APPLY_MODE["SELECTION"] = 7] = "SELECTION";
                APPLY_MODE[APPLY_MODE["WORKTIME"] = 8] = "WORKTIME";
                APPLY_MODE[APPLY_MODE["GRANDDATE"] = 9] = "GRANDDATE";
                APPLY_MODE[APPLY_MODE["TIMEYEAR"] = 10] = "TIMEYEAR";
            })(APPLY_MODE || (APPLY_MODE = {}));
            var REPLACE_FORMAT;
            (function (REPLACE_FORMAT) {
                REPLACE_FORMAT[REPLACE_FORMAT["VALUE"] = 0] = "VALUE";
                REPLACE_FORMAT[REPLACE_FORMAT["ADD_OR_SUB"] = 1] = "ADD_OR_SUB";
                REPLACE_FORMAT[REPLACE_FORMAT["HIRE_DATE"] = 2] = "HIRE_DATE";
                REPLACE_FORMAT[REPLACE_FORMAT["GRAND_DATE"] = 3] = "GRAND_DATE";
                REPLACE_FORMAT[REPLACE_FORMAT["DESI_YEAR_OE"] = 4] = "DESI_YEAR_OE";
                REPLACE_FORMAT[REPLACE_FORMAT["CONTRACT_TIME"] = 5] = "CONTRACT_TIME"; //契約時間
            })(REPLACE_FORMAT || (REPLACE_FORMAT = {}));
            var YEAR_OF_JOIN;
            (function (YEAR_OF_JOIN) {
                YEAR_OF_JOIN[YEAR_OF_JOIN["NEXT"] = 0] = "NEXT";
                YEAR_OF_JOIN[YEAR_OF_JOIN["SAME"] = 1] = "SAME";
                YEAR_OF_JOIN[YEAR_OF_JOIN["PREV"] = 2] = "PREV"; //前年
            })(YEAR_OF_JOIN || (YEAR_OF_JOIN = {}));
        })(vm = f_1.vm || (f_1.vm = {}));
    })(f = cps003.f || (cps003.f = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=cps003.f.vm.js.map