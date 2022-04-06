var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var oem003;
                (function (oem003) {
                    var a;
                    (function (a_1) {
                        var API = {
                            register: 'com/screen/oem003/insert',
                            findSettings: 'com/screen/oem003/findSettings',
                        };
                        var COMMA = '、';
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.equipmentList = ko.observableArray([]);
                                _this.checkAll = ko.observable(false);
                                _this.dataTables = ko.observableArray([]);
                                _this.formTitle = ko.observable(_this.$i18n('OEM003_25'));
                                _this.enableButtonAdd = ko.computed(function () { return _this.dataTables().length !== 9; });
                                _this.$focus = null;
                                return _this;
                            }
                            ViewModel.prototype.created = function () {
                                var vm = this;
                                vm.checkAll.subscribe(function (value) {
                                    var checkData = _.forEach(vm.dataTables(), function (item) {
                                        item.selected(value);
                                    });
                                    vm.dataTables(checkData);
                                });
                            };
                            ViewModel.prototype.mounted = function () {
                                var vm = this;
                                vm.startPage();
                            };
                            ViewModel.prototype.startPage = function () {
                                var vm = this;
                                vm
                                    .$blockui('grayout')
                                    .then(function () { return vm.$ajax('com', API.findSettings); })
                                    .then(function (response) {
                                    vm.toDataDisplay(response);
                                    $('#form-title').focus();
                                })
                                    .always(function () { return vm.$blockui('clear'); });
                            };
                            ViewModel.prototype.clickAdd = function () {
                                var vm = this;
                                var dataLength = vm.dataTables().length;
                                // Max length is 9
                                if (dataLength >= 9)
                                    return;
                                var order = dataLength + 1;
                                var data = vm.dataTables();
                                data.push(vm.defaultDataTable(order));
                                vm.dataTables(data);
                                $(".data-".concat(order, " .A4_D2")).focus();
                            };
                            ViewModel.prototype.clickExport = function () {
                                var vm = this;
                                if (_.isEmpty(vm.dataTables())) {
                                    vm.$dialog.error({ messageId: 'Msg_37' });
                                    return;
                                }
                                vm.$blockui('grayout');
                                var program = nts.uk.ui._viewModel.kiban.programName().split(' ');
                                var domainType = 'OEM003設備利用実績の設定';
                                if (program.length > 1) {
                                    program.shift();
                                    domainType = domainType + program.join(' ');
                                }
                                nts.uk.request
                                    .exportFile('/masterlist/report/print', {
                                    domainId: 'EquipmentUsageSettings',
                                    domainType: domainType,
                                    languageId: __viewContext.user.selectedLanguage.basicLanguageId,
                                    reportType: 0,
                                })
                                    .fail(function (err) { return vm.$dialog.error({ messageId: err.messageId }); })
                                    .always(function () {
                                    vm.$blockui('clear');
                                    if (!_.isNil(vm.$focus) && !_.isEmpty(vm.dataTables))
                                        vm.$focus.focus();
                                });
                            };
                            ViewModel.prototype.removeData = function (delOrder) {
                                var vm = this;
                                var deleteOrder = 0;
                                // filter to remove data
                                var filterArr = _.filter(vm.dataTables(), function (item, index) {
                                    if (item.order() !== delOrder())
                                        return true;
                                    deleteOrder = index + 1;
                                    item.$errors('clear');
                                    return false;
                                });
                                // set new order for data
                                filterArr.map(function (item, index) {
                                    var order = index + 1;
                                    item.order(order);
                                    item.index = order;
                                });
                                vm.dataTables(filterArr);
                                _.forEach(vm.dataTables(), function (data) { return vm.validateItem(data, data.itemNo()); });
                                if (deleteOrder > 0 && deleteOrder <= vm.dataTables().length) {
                                    $(".data-".concat(deleteOrder, " input[tabindex=\"6\"]")).focus();
                                }
                                if (deleteOrder > 0 && deleteOrder > vm.dataTables().length) {
                                    $(".data-".concat(deleteOrder - 1, " input[tabindex=\"6\"]")).focus();
                                }
                            };
                            ViewModel.prototype.toOrderBy = function (type) {
                                var vm = this;
                                // Clone data list of table
                                var data = _.cloneDeep(vm.dataTables());
                                // Get old position top of first selected item
                                var firstSelected = _.find(vm.dataTables(), function (i) { return i.checked(); }).order();
                                var $container = $('.ui-iggrid-scrolldiv');
                                var $scrollTo = $(".data-".concat(firstSelected));
                                var oldOffsetTop = $scrollTo.offset().top;
                                var newOffsetTop = type === 'before'
                                    ? oldOffsetTop - $scrollTo.height()
                                    : oldOffsetTop + $scrollTo.height();
                                var move = function (fromOrder, toOrder) {
                                    var from = fromOrder - 1;
                                    var to = toOrder - 1;
                                    if (!data[to] || data[to].checked())
                                        return;
                                    // remove `from` item and store it
                                    var f = data.splice(from, 1)[0];
                                    // insert stored item into position `to`
                                    data.splice(to, 0, f);
                                };
                                // Change the order of data list
                                _.map(
                                // If type is before, map the data tables, ifnot map the reverse of data table
                                type === 'before' ? vm.dataTables() : vm.dataTables().reverse(), function (item) {
                                    if (item.checked() && type === 'before') {
                                        item.toBefore();
                                        move(item.index, item.order());
                                    }
                                    if (item.checked() && type === 'after') {
                                        item.toAfter();
                                        move(item.index, item.order());
                                    }
                                });
                                // Apply new order
                                _.map(data, function (item, index) {
                                    item.order(index + 1);
                                    item.index = index + 1;
                                });
                                vm.dataTables(data);
                                vm.setFocusEvent();
                                this.$nextTick(function () {
                                    $container.scrollTop(newOffsetTop - $container.offset().top + $container.scrollTop());
                                });
                            };
                            ViewModel.prototype.beforeRegisted = function () {
                                var vm = this, dfd = $.Deferred();
                                var isErrors = false;
                                var data = ko.unwrap(vm.dataTables);
                                if (_.isEmpty(data)) {
                                    vm.$dialog.error({ messageId: 'Msg_2219' });
                                    dfd.reject();
                                }
                                // Error lines cause of empty item type
                                vm.$validate(".item-type").then(function (result) {
                                    if (!result) {
                                        dfd.reject();
                                    }
                                });
                                // Error lines cause of min and max
                                var minmaxEL = [];
                                // Error lines cause of item no
                                var itemNoEL = [];
                                _.map(data, function (item) {
                                    // If min greater than max, add to error list
                                    if ((item.isNumeric() || item.isTime()) && Number(item.min()) > Number(item.max())) {
                                        minmaxEL.push(item.order());
                                    }
                                    if (!_.includes(itemNoEL, item.order())) {
                                        var errorLines = vm.checkItemNo(item.itemNo());
                                        itemNoEL = _.concat(itemNoEL, errorLines);
                                        // If has more than 1 lines duplicate item no, show error
                                        if (errorLines.length > 1) {
                                            isErrors = true;
                                            var messageParams = [errorLines.join(COMMA)];
                                            var selector = ".data-".concat(item.order());
                                            var msg = { messageId: 'Msg_2218', messageParams: messageParams };
                                            vm.$errors(selector, msg);
                                        }
                                        if (errorLines.length <= 1) {
                                            item.itemTypeError(false);
                                        }
                                    }
                                });
                                if (!_.isEmpty(minmaxEL)) {
                                    isErrors = true;
                                    var messageParams = [minmaxEL.join(COMMA)];
                                    vm.$dialog.error({ messageId: 'Msg_2220', messageParams: messageParams });
                                }
                                if (isErrors)
                                    dfd.reject();
                                if (!isErrors)
                                    dfd.resolve();
                                return dfd.promise();
                            };
                            ViewModel.prototype.clickRegister = function () {
                                var vm = this;
                                vm
                                    .beforeRegisted()
                                    .then(function () {
                                    var command = new EquipmentUsageSetting(__viewContext.user.companyId, vm.formTitle(), vm.dataTables());
                                    vm
                                        .$validate()
                                        .then(function (valid) {
                                        if (!valid)
                                            return;
                                        vm
                                            .$blockui('grayout')
                                            .then(function () { return vm.$ajax('com', API.register, command); })
                                            .then(function () { return vm.$dialog.info({ messageId: 'Msg_15' }); })
                                            .always(function () {
                                            vm.$blockui('clear');
                                            if (!_.isNil(vm.$focus) && !_.isEmpty(vm.dataTables))
                                                vm.$focus.focus();
                                        });
                                    });
                                });
                            };
                            ViewModel.prototype.defaultDataTable = function (order) {
                                var vm = this;
                                var data = new DataTable('', 6, null, null, null, null, '', false, '', order);
                                vm.subscribeItemNo(data);
                                return data;
                            };
                            ViewModel.prototype.toDataDisplay = function (_a) {
                                var itemSettings = _a.itemSettings, formatSetting = _a.formatSetting, formSetting = _a.formSetting;
                                var vm = this;
                                var merged = _.reduce(itemSettings, function (arr, e) {
                                    arr.push($.extend({}, e, _.find(formatSetting.itemDisplaySettings, function (a) { return a.itemNo === e.itemNo; })));
                                    return arr;
                                }, []);
                                var dataTables = _.map(merged, function (item) {
                                    var data = new DataTable(item.items.itemName, item.displayWidth, item.itemNo, item.inputControl.minimum, item.inputControl.maximum, item.inputControl.digitsNo, item.items.unit, item.inputControl.require, item.items.memo, item.displayOrder);
                                    vm.subscribeItemNo(data);
                                    return data;
                                });
                                if (formSetting) {
                                    vm.formTitle(formSetting.title);
                                }
                                vm.dataTables(dataTables);
                                vm.setFocusEvent();
                            };
                            ViewModel.prototype.setFocusEvent = function () {
                                var vm = this;
                                $('.ui-iggrid-scrolldiv table.data-table tr td *').focusin(function (e) {
                                    vm.$focus = e.target;
                                });
                            };
                            ViewModel.prototype.subscribeItemNo = function (data) {
                                var vm = this;
                                data.itemNo.subscribe(function () {
                                    data.min(null);
                                    data.max(null);
                                    data.digitsNo(null);
                                    data.unit('');
                                    data.$errors('clear');
                                }, 'beforeChange');
                                data.itemNo.subscribe(function (value) { return vm.validateItem(data, value); });
                            };
                            ViewModel.prototype.validateItem = function (data, value) {
                                var vm = this;
                                _.forEach(vm.dataTables(), function (i) { return i.itemTypeError(false); });
                                vm
                                    .$errors('clear', [
                                    '.data-1', '.data-2', '.data-3',
                                    '.data-4', '.data-5', '.data-6',
                                    '.data-7', '.data-8', '.data-9',
                                ])
                                    .then(function () { return data.$validate(); })
                                    .then(function () {
                                    var errorLines = vm.checkItemNo(value);
                                    if (errorLines.length <= 1) {
                                        data.itemTypeError(false);
                                        return;
                                    }
                                    var messageParams = [errorLines.join(COMMA)];
                                    var selector = ".data-".concat(data.order());
                                    var msg = { messageId: 'Msg_2218', messageParams: messageParams };
                                    vm.$errors(selector, msg);
                                });
                            };
                            ViewModel.prototype.checkItemNo = function (value) {
                                var vm = this;
                                var finder = _.filter(vm.dataTables(), function (item) {
                                    if (item.itemNo() != value) {
                                        return false;
                                    }
                                    if (item.itemNo() == value) {
                                        item.itemTypeError(true);
                                        return true;
                                    }
                                    return false;
                                });
                                return _.map(finder, function (i) { return i.order(); });
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                        a_1.ViewModel = ViewModel;
                        var DataTable = /** @class */ (function (_super) {
                            __extends(DataTable, _super);
                            function DataTable(itemName, displayWidth, itemNo, min, max, digitsNo, unit, require, memo, order) {
                                var _this = _super.call(this) || this;
                                _this.checked = ko.observable(false);
                                _this.itemTypes = ko.observableArray([
                                    { itemNo: 1, text: _this.$i18n('OEM003_26') },
                                    { itemNo: 2, text: _this.$i18n('OEM003_27') },
                                    { itemNo: 3, text: _this.$i18n('OEM003_28') },
                                    { itemNo: 4, text: _this.$i18n('OEM003_29') },
                                    { itemNo: 5, text: _this.$i18n('OEM003_30') },
                                    { itemNo: 6, text: _this.$i18n('OEM003_31') },
                                    { itemNo: 7, text: _this.$i18n('OEM003_32') },
                                    { itemNo: 8, text: _this.$i18n('OEM003_33') },
                                    { itemNo: 9, text: _this.$i18n('OEM003_34') },
                                ]);
                                _this.itemTypeError = ko.observable(false);
                                var vm = _this;
                                vm.id = nts.uk.util.randomId();
                                vm.itemName = ko.observable(itemName);
                                vm.displayWidth = ko.observable(displayWidth);
                                vm.itemNo = ko.observable(itemNo);
                                vm.min = ko.observable(min);
                                vm.max = ko.observable(max);
                                vm.digitsNo = ko.observable(digitsNo);
                                vm.unit = ko.observable(unit);
                                vm.require = ko.observable(require);
                                vm.memo = ko.observable(memo);
                                vm.order = ko.observable(order);
                                vm.isCharacter = ko.computed(function () { return 1 <= _this.itemNo() && _this.itemNo() <= 3; });
                                vm.isNumeric = ko.computed(function () { return 4 <= _this.itemNo() && _this.itemNo() <= 6; });
                                vm.isTime = ko.computed(function () { return 7 <= _this.itemNo() && _this.itemNo() <= 9; });
                                vm.isCharOrNumber = ko.computed(function () { return vm.isCharacter() || vm.isNumeric(); });
                                vm.isItemTypeNull = ko.computed(function () { return _.isNull(vm.itemNo()); });
                                vm.css = ko.computed(function () {
                                    var _a;
                                    var data = "data-".concat(vm.order());
                                    return _a = {},
                                        _a[data] = true,
                                        _a['active'] = vm.checked(),
                                        _a;
                                });
                                vm.index = order;
                                return _this;
                            }
                            DataTable.prototype.toAfter = function () {
                                var vm = this;
                                if (vm.order() >= 9)
                                    return;
                                vm.order(vm.order() + 1);
                            };
                            DataTable.prototype.toBefore = function () {
                                var vm = this;
                                if (vm.order() <= 1)
                                    return;
                                vm.order(vm.order() - 1);
                            };
                            DataTable.prototype.selected = function (selected) {
                                var vm = this;
                                vm.checked(selected);
                            };
                            return DataTable;
                        }(ko.ViewModel));
                        var ItemClassification;
                        (function (ItemClassification) {
                            ItemClassification[ItemClassification["TEXT"] = 0] = "TEXT";
                            ItemClassification[ItemClassification["NUMBER"] = 1] = "NUMBER";
                            ItemClassification[ItemClassification["TIME"] = 2] = "TIME";
                        })(ItemClassification || (ItemClassification = {}));
                        var EquipmentUsageSetting = /** @class */ (function () {
                            function EquipmentUsageSetting(cid, title, dataTables) {
                                var vm = this;
                                vm.formSetting = { cid: cid, title: title };
                                var itemSettings = [];
                                var itemDisplaySettings = [];
                                _.forEach(dataTables, function (item) {
                                    itemDisplaySettings.push({
                                        displayWidth: item.displayWidth(),
                                        displayOrder: item.order(),
                                        itemNo: item.itemNo(),
                                    });
                                    itemSettings.push({
                                        cid: cid,
                                        itemNo: item.itemNo(),
                                        inputControl: {
                                            itemCls: item.isCharacter()
                                                ? ItemClassification.TEXT
                                                : item.isNumeric()
                                                    ? ItemClassification.NUMBER
                                                    : ItemClassification.TIME,
                                            require: item.require(),
                                            digitsNo: item.digitsNo(),
                                            maximum: item.max(),
                                            minimum: item.min(),
                                        },
                                        items: {
                                            itemName: item.itemName(),
                                            unit: item.unit(),
                                            memo: item.memo(),
                                        },
                                    });
                                });
                                vm.itemSettings = itemSettings;
                                vm.formatSetting = { cid: cid, itemDisplaySettings: itemDisplaySettings };
                            }
                            return EquipmentUsageSetting;
                        }());
                    })(a = oem003.a || (oem003.a = {}));
                })(oem003 = view.oem003 || (view.oem003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=oem003.a.vm.js.map