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
var ccg018;
(function (ccg018) {
    var b;
    (function (b) {
        var viewmodel;
        (function (viewmodel) {
            var blockUI = nts.uk.ui.block;
            var ScreenModel = /** @class */ (function (_super) {
                __extends(ScreenModel, _super);
                function ScreenModel(baseModel) {
                    var _this = _super.call(this, baseModel) || this;
                    _this.alldata = ko.observableArray();
                    _this.listSwitchDate = ko.observableArray();
                    _this.selectedSwitchDate = ko.observable(0);
                    var self = _this;
                    self.screenTemplateUrl("../b/index.xhtml");
                    self.comboItemsAfterLogin(baseModel.comboItemsAfterLogin);
                    self.comboItemsAsTopPage(baseModel.comboItemsAsTopPage);
                    self.categorySet(baseModel.categorySet);
                    self.items = ko.observableArray([]);
                    self.selectedItem = ko.observable(null);
                    self.listSid = [];
                    self.currentCode = ko.observable();
                    self.employeeCode = ko.observable('');
                    self.employeeName = ko.observable('');
                    self.selectedItemAfterLogin = ko.observable('');
                    self.selectedItemAsTopPage = ko.observable('');
                    self.isEnable = ko.observable(false);
                    self.isSelectedFirst = ko.observable(true);
                    self.currentCode.subscribe(function (codeChange) {
                        if (codeChange && codeChange != "undefined") {
                            self.currentCode(codeChange);
                            self.employeeCode(codeChange);
                            self.selectedItem(_.find(self.items(), ['code', codeChange]));
                            self.employeeName(self.selectedItem().name);
                            self.selectedItemAfterLogin(self.selectedItem().uniqueCode());
                            self.selectedSwitchDate(self.selectedItem().switchingDate());
                            self.selectedItemAsTopPage(self.selectedItem().topPageCode());
                            self.isEnable(_.find(self.items(), ['code', self.currentCode()]).isAlreadySetting);
                        }
                        else {
                            self.currentCode(null);
                            self.employeeCode('');
                            self.employeeName('');
                            self.selectedItemAfterLogin('');
                            self.selectedItemAsTopPage('');
                            self.isEnable(false);
                        }
                    });
                    //component
                    self.selectedEmployee = ko.observableArray([]);
                    self.showinfoSelectedEmployee = ko.observable(false);
                    self.baseDate = ko.observable(new Date());
                    self.selectedEmployee.subscribe(function () {
                        self.listSid = [];
                        _.each(self.selectedEmployee(), function (x) {
                            self.listSid.push(x.employeeId);
                        });
                        self.findTopPagePersonSet();
                    });
                    self.isEmpty = ko.computed(function () {
                        return !nts.uk.ui.errors.hasError();
                    });
                    self.listSwitchDate(self.getSwitchDateLists());
                    return _this;
                }
                ScreenModel.prototype.initCCG001 = function () {
                    var self = this;
                    // Component option
                    self.ccgcomponent = {
                        /** Common properties */
                        systemType: 1,
                        showEmployeeSelection: false,
                        showQuickSearchTab: false,
                        showAdvancedSearchTab: true,
                        showBaseDate: true,
                        showClosure: false,
                        showAllClosure: false,
                        showPeriod: false,
                        periodFormatYM: false,
                        /** Required parameter */
                        baseDate: self.baseDate().toISOString(),
                        inService: true,
                        leaveOfAbsence: false,
                        closed: false,
                        retirement: false,
                        /** Quick search tab options */
                        showAllReferableEmployee: false,
                        showOnlyMe: false,
                        showSameWorkplace: false,
                        showSameWorkplaceAndChild: false,
                        /** Advanced search properties */
                        showEmployment: true,
                        showWorkplace: true,
                        showClassification: true,
                        showJobTitle: true,
                        showWorktype: true,
                        isMutipleCheck: true,
                        tabindex: 4,
                        /** Return data */
                        returnDataFromCcg001: function (data) {
                            self.selectedEmployee(data.listEmployee);
                        }
                    };
                    // Start component
                    $('#ccgcomponent').ntsGroupComponent(self.ccgcomponent);
                };
                ScreenModel.prototype.bindGrid = function () {
                    var self = this;
                    var listComponentOption = {
                        isShowAlreadySet: true,
                        alreadySettingList: self.items,
                        isMultiSelect: false,
                        listType: 4,
                        isShowWorkPlaceName: true,
                        selectedCode: self.currentCode,
                        isShowNoSelectRow: false,
                        isDialog: false,
                        selectType: 4,
                        isShowSelectAllButton: false,
                        employeeInputList: self.items,
                        isRemoveFilterWhenReload: false,
                        tabindex: -1,
                    };
                    $('#sample-component').ntsListComponent(listComponentOption);
                };
                ScreenModel.prototype.findTopPagePersonSet = function () {
                    var self = this;
                    var dfd = $.Deferred();
                    b.service.findTopPagePersonSet(self.listSid).done(function (data) {
                        var arr = [];
                        _.each(self.selectedEmployee(), function (x) {
                            var topPagePersonSet = _.find(data, ['employeeId', x.employeeId]);
                            if (!!topPagePersonSet) {
                                arr.push(new TopPagePersonSet({
                                    code: x.employeeCode,
                                    name: x.employeeName,
                                    affiliationName: x.affiliationName,
                                    employeeId: x.employeeId,
                                    topPageCode: topPagePersonSet.topMenuCode,
                                    loginMenuCode: topPagePersonSet.loginMenuCode,
                                    system: topPagePersonSet.system,
                                    switchingDate: topPagePersonSet.switchingDate,
                                    menuClassification: topPagePersonSet.menuClassification,
                                    isAlreadySetting: true
                                }));
                            }
                            else {
                                arr.push(new TopPagePersonSet({
                                    code: x.employeeCode,
                                    name: x.employeeName,
                                    affiliationName: x.affiliationName,
                                    employeeId: x.employeeId,
                                    topPageCode: '',
                                    loginMenuCode: '',
                                    system: 0,
                                    switchingDate: 0,
                                    menuClassification: 0,
                                    isAlreadySetting: false
                                }));
                            }
                        });
                        self.items(arr);
                        if (self.isSelectedFirst() && self.items().length > 0) {
                            self.currentCode(self.items()[0].code);
                        }
                        self.isSelectedFirst(true);
                        dfd.resolve();
                    }).fail(function () {
                        dfd.reject();
                    });
                    return dfd.promise();
                };
                /**
                 * Update/Insert data in to table TOPPAGE_PERSON_SET
                 */
                ScreenModel.prototype.save = function () {
                    var self = this;
                    if (!self.currentCode()) {
                        return;
                    }
                    var obj = {
                        employeeId: self.selectedItem().employeeId,
                        switchingDate: self.selectedSwitchDate(),
                        topMenuCode: self.selectedItemAsTopPage() ? self.selectedItemAsTopPage() : '',
                        loginMenuCode: (self.selectedItemAfterLogin().length === 6 ? self.selectedItemAfterLogin().slice(0, 4) : ''),
                        system: self.selectedItemAfterLogin().slice(-2, -1),
                        menuClassification: self.selectedItemAfterLogin().slice(-1)
                    };
                    self.update(obj);
                };
                ScreenModel.prototype.update = function (obj) {
                    var vm = this;
                    blockUI.invisible();
                    ccg018.b.service.update(obj).then(function () {
                        vm.isSelectedFirst(false);
                        $.when(vm.findTopPagePersonSet()).then(function () {
                            vm.currentCode(vm.selectedItem().code);
                            vm.isEnable(true);
                            nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                        });
                    }).fail(function () {
                        nts.uk.ui.dialog.caution({ messageId: "Msg_86" });
                    }).always(function () { return blockUI.clear(); });
                };
                /**
                 * remove data in to table TOPPAGE_PERSON_SET
                 */
                ScreenModel.prototype.removeData = function () {
                    var self = this;
                    var dfd = $.Deferred();
                    if (!self.currentCode()) {
                        return;
                    }
                    if (!!!self.currentCode()) {
                        //                nts.uk.ui.dialog.info(nts.uk.resource.getMessage('Msg_85'));
                        nts.uk.ui.dialog.info({ messageId: "Msg_85" }).then(function () {
                        });
                    }
                    else {
                        nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                            var obj = { employeeId: self.selectedItem().employeeId };
                            var keySearch = $('#sample-component .ntsSearchBox').val();
                            ccg018.b.service.remove(obj).done(function () {
                                self.isSelectedFirst(false);
                                $.when(self.findTopPagePersonSet()).done(function () {
                                    if (keySearch != "") {
                                        $('#sample-component .ntsSearchBox').val(keySearch);
                                        $('#sample-component .search-btn').trigger('click');
                                    }
                                    self.isEnable(false);
                                    self.selectedItemAfterLogin('');
                                    self.selectedItemAsTopPage('');
                                    self.selectedSwitchDate(0);
                                    //                            nts.uk.ui.dialog.info(nts.uk.resource.getMessage('Msg_16'));
                                    nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function () {
                                    });
                                });
                            }).fail(function () {
                                dfd.reject();
                            });
                        }).ifNo(function () { });
                    }
                    dfd.resolve();
                    return dfd.promise();
                };
                /**"トップページの設定を複写する (CDL023)"
                */
                ScreenModel.prototype.copy = function () {
                    var vm = this;
                    var employee = _.find(vm.items(), ['employeeId', vm.selectedItem().employeeId]);
                    if (!employee.code) {
                        return;
                    }
                    b.service.findByCId()
                        .then(function (data) {
                        vm.alldata(data);
                        var lstSidSetting = _.map(vm.alldata(), function (x) { return x.employeeId; });
                        var object = {
                            code: employee.code,
                            name: employee.name,
                            targetType: 6,
                            itemListSetting: lstSidSetting,
                            employeeId: employee.employeeId,
                            baseDate: vm.baseDate().toISOString()
                        };
                        nts.uk.ui.windows.setShared("CDL023Input", object);
                        nts.uk.ui.windows.sub.modal('/view/cdl/023/a/index.xhtml').onClosed(function () {
                            blockUI.grayout();
                            var lstSelection = nts.uk.ui.windows.getShared("CDL023Output");
                            if (nts.uk.util.isNullOrEmpty(lstSelection)) {
                                blockUI.clear();
                                return;
                            }
                            var arrObj = [];
                            _.forEach(lstSelection, function (id) {
                                var obj = {
                                    employeeId: id,
                                    switchingDate: vm.selectedSwitchDate(),
                                    topMenuCode: vm.selectedItemAsTopPage() ? vm.selectedItemAsTopPage() : '',
                                    loginMenuCode: (vm.selectedItemAfterLogin().length === 6 ? vm.selectedItemAfterLogin().slice(0, 4) : vm.selectedItemAsTopPage()),
                                    system: vm.selectedItemAfterLogin().slice(-2, -1),
                                    menuClassification: vm.selectedItemAfterLogin().slice(-1)
                                };
                                arrObj.push(obj);
                            });
                            ccg018.b.service.copy({ listTopPagePersonSetting: arrObj })
                                .then(function () {
                                vm.isSelectedFirst(false);
                                blockUI.clear();
                                nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                                vm.findTopPagePersonSet();
                            })
                                .always(function () { return blockUI.clear(); });
                        });
                    });
                };
                ScreenModel.prototype.showNote = function () {
                    $('#popup-show-note').remove();
                    var $table1 = $('#table-1');
                    $('<div/>')
                        .attr('id', 'popup-show-note')
                        .appendTo($table1);
                    var $popUpShowNote = $('#popup-show-note');
                    $popUpShowNote.ntsPopup({
                        showOnStart: false,
                        dismissible: true,
                        position: {
                            my: 'left top',
                            at: 'left bottom',
                            of: '#B6_1'
                        }
                    });
                    $('<div/>')
                        .text(nts.uk.resource.getText('CCG018_52'))
                        .appendTo($popUpShowNote);
                    $popUpShowNote.ntsPopup('show');
                };
                ScreenModel.prototype.getSwitchDateLists = function () {
                    var list = [];
                    list.push({ value: 0, text: nts.uk.resource.getText('CCG018_44') });
                    _.range(1, 32).forEach(function (current) {
                        list.push({ value: current, text: current });
                    });
                    return list;
                };
                return ScreenModel;
            }(ccg018.base.viewModel.ScreenModelBase));
            viewmodel.ScreenModel = ScreenModel;
            var TopPagePersonSet = /** @class */ (function () {
                function TopPagePersonSet(param) {
                    //beacause there can exist same code, so create uniqueCode = loginMenuCd+ system+ menuClassification
                    this.uniqueCode = ko.observable('');
                    var self = this;
                    self.code = param.code;
                    self.name = param.name;
                    self.affiliationName = param.affiliationName;
                    self.employeeId = param.employeeId;
                    self.topPageCode = ko.observable(param.topPageCode);
                    self.switchingDate = ko.observable(param.switchingDate);
                    self.loginMenuCode = ko.observable(param.loginMenuCode);
                    self.isAlreadySetting = param.isAlreadySetting;
                    self.system = ko.observable(param.system);
                    self.menuClassification = ko.observable(param.menuClassification);
                    self.uniqueCode(nts.uk.text.format("{0}{1}{2}", param.loginMenuCode, param.system, param.menuClassification));
                }
                return TopPagePersonSet;
            }());
        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
    })(b = ccg018.b || (ccg018.b = {}));
})(ccg018 || (ccg018 = {}));
//# sourceMappingURL=ccg018.b.vm.js.map