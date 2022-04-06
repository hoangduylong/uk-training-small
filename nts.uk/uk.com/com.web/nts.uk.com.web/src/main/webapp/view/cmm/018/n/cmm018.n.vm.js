var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm018;
                (function (cmm018) {
                    var n;
                    (function (n) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.lstAppName = [];
                                    this.isShow = ko.observable(false);
                                    // get selected code in KCP005
                                    this.multiSelectedCode = ko.observableArray([]);
                                    var self = this;
                                    var param = nts.uk.ui.windows.getShared('CMM018N_PARAM');
                                    self.sysAtr = param.sysAtr || 0;
                                    _.each(param.lstName, function (app) {
                                        self.lstAppName.push({ id: app.employRootAtr.toString() + app.value,
                                            code: app.value, name: app.localizedName, empRoot: app.employRootAtr,
                                            lowerApprove: app.lowerApprove });
                                    });
                                    //Init right table.
                                    self.lstAppDis = ko.observableArray([]);
                                    self.columns = ko.observableArray([
                                        { headerText: '', key: 'id', width: 30, hidden: true },
                                        { headerText: '申請一覧', key: 'name', width: 200 }
                                    ]);
                                    self.currentAppType = ko.observableArray([]);
                                    //Init selectedEmployee
                                    self.selectedEmployee = ko.observableArray([]);
                                    self.baseDate = ko.observable(moment(new Date()).toDate());
                                    if (self.sysAtr == 0) {
                                        self.start();
                                    }
                                    else {
                                        self.lstAppDis.push({ id: '0_null', code: null, name: "共通ルート", empRoot: 0 });
                                        _.each(self.lstAppName, function (app) {
                                            self.lstAppDis.push({ id: app.id, code: app.code, name: app.name,
                                                empRoot: app.empRoot, lowerApprove: app.lowerApprove });
                                        });
                                        // set selected all in list apptype
                                        // get ids 
                                        var ids = _.map(ko.toJS(self.lstAppDis), function (i) { return i.id; });
                                        self.currentAppType(ids);
                                        self.loadGrid();
                                    }
                                    self.selectedEmployee.subscribe(function (value) {
                                        if (value) {
                                            self.initKCP005();
                                            if (!ko.toJS(self.isShow)) {
                                                self.isShow(true);
                                            }
                                        }
                                    });
                                }
                                ScreenModel.prototype.initKCP005 = function () {
                                    var self = this;
                                    var isShowAlreadySet = ko.observable(false);
                                    var isDialog = ko.observable(true);
                                    var isShowNoSelectRow = ko.observable(false);
                                    var isMultiSelect = ko.observable(true);
                                    var isShowWorkPlaceName = ko.observable(true);
                                    var isShowSelectAllButton = ko.observable(false);
                                    var disableSelection = ko.observable(false);
                                    var dataSource = ko.toJS(self.selectedEmployee);
                                    var dataList = [];
                                    _.map(dataSource, function (i) {
                                        var um = {};
                                        um.id = i.employeeCode;
                                        um.code = i.employeeCode;
                                        um.name = i.employeeName;
                                        um.affiliationName = i.workplaceName;
                                        dataList.push(um);
                                    });
                                    var employeeList = ko.observableArray(dataList);
                                    self.selectedEmployeeKCP005 = employeeList;
                                    var listComponentOption = {
                                        isShowAlreadySet: isShowAlreadySet(),
                                        isMultiSelect: isMultiSelect(),
                                        listType: ListType.EMPLOYEE,
                                        employeeInputList: employeeList,
                                        selectType: SelectType.SELECT_BY_SELECTED_CODE,
                                        selectedCode: self.multiSelectedCode,
                                        isDialog: isDialog(),
                                        isShowNoSelectRow: isShowNoSelectRow(),
                                        isShowWorkPlaceName: isShowWorkPlaceName(),
                                        isShowSelectAllButton: isShowSelectAllButton(),
                                        disableSelection: disableSelection(),
                                        maxHeight: 375,
                                        maxRows: 15
                                    };
                                    $('#component-items-list').ntsListComponent(listComponentOption);
                                };
                                ScreenModel.prototype.loadGrid = function () {
                                    var self = this;
                                    self.ccgcomponent = {
                                        showEmployeeSelection: false,
                                        systemType: 2,
                                        showQuickSearchTab: true,
                                        showAdvancedSearchTab: true,
                                        showBaseDate: true,
                                        showClosure: false,
                                        showAllClosure: false,
                                        showPeriod: false,
                                        periodFormatYM: false,
                                        /** Required parameter */
                                        baseDate: moment.utc().toISOString(),
                                        periodStartDate: moment.utc("1900/01/01", "YYYY/MM/DD").toISOString(),
                                        periodEndDate: moment.utc("9999/12/31", "YYYY/MM/DD").toISOString(),
                                        inService: false,
                                        leaveOfAbsence: false,
                                        closed: false,
                                        retirement: false,
                                        /** Quick search tab options */
                                        showAllReferableEmployee: true,
                                        showOnlyMe: false,
                                        showSameWorkplace: true,
                                        showSameWorkplaceAndChild: true,
                                        /** Advanced search properties */
                                        showEmployment: false,
                                        showWorkplace: true,
                                        showClassification: false,
                                        showJobTitle: false,
                                        showWorktype: false,
                                        isMutipleCheck: true,
                                        isInDialog: true,
                                        /**
                                        * @param dataList: list employee returned from component.
                                        * Define how to use this list employee by yourself in the function's body.
                                        */
                                        returnDataFromCcg001: function (data) {
                                            self.selectedEmployee(data.listEmployee);
                                        }
                                    };
                                    $('#ccgcomponent').ntsGroupComponent(self.ccgcomponent);
                                };
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    n.service.getRightList().done(function (data) {
                                        var items = [];
                                        items.push({ id: '0_null', code: null, name: "共通ルート", empRoot: 0 });
                                        _.forEach(data, function (value) {
                                            // if(value.value !== 14){
                                            items.push({ id: '1' + value.value, code: value.value, name: value.localizedName, empRoot: 1 });
                                            // }
                                        });
                                        n.service.getConfirmName().done(function (confirm) {
                                            _.forEach(confirm, function (obj) {
                                                items.push({ id: '2' + obj.value, code: obj.value, name: obj.localizedName, empRoot: 2 });
                                            });
                                            self.lstAppDis(items);
                                            // set selected all in list apptype
                                            // get ids 
                                            var ids = _.map(ko.toJS(self.lstAppDis), function (i) { return i.id; });
                                            self.currentAppType(ids);
                                            self.loadGrid();
                                        });
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                //閉じるボタン
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                //Exceｌ出力
                                ScreenModel.prototype.printExcel = function () {
                                    var self = this;
                                    // get employees in KCP005
                                    var selectedEmployeeKCP = [];
                                    _.map(ko.toJS(self.multiSelectedCode), function (i) {
                                        var list = _.filter(self.selectedEmployee(), function (item) {
                                            return item.employeeCode == i;
                                        });
                                        if (!_.isEmpty(list)) {
                                            selectedEmployeeKCP.push(list[0]);
                                        }
                                    });
                                    //対象社員を選択したかをチェックする(kiểm tra đã chọn nhân viên chưa?)
                                    //対象者未選択(chưa chọn nhân viên)
                                    if (selectedEmployeeKCP.length <= 0) {
                                        nts.uk.ui.dialog.alert({ messageId: "Msg_184" });
                                        return;
                                    }
                                    //出力対象申請を選択したかチェックする(check đã chọn đơn xin để xuất ra chưa?)
                                    //出力対象未選択(chưa chọn đối tượng output)
                                    if (selectedEmployeeKCP.length <= 0) {
                                        nts.uk.ui.dialog.alert({ messageId: "Msg_199" });
                                        return;
                                    }
                                    var lstApp = [];
                                    _.each(self.currentAppType(), function (code) {
                                        var a = self.findTypeSelected(code);
                                        lstApp.push({ code: a.code,
                                            empRoot: a.empRoot,
                                            name: a.name,
                                            lowerApprove: a.lowerApprove });
                                    });
                                    //xuat file
                                    var data = new n.service.model.appInfor(self.baseDate(), selectedEmployeeKCP, lstApp, self.sysAtr);
                                    nts.uk.ui.block.invisible();
                                    n.service.saveAsExcel(data).done(function () {
                                        nts.uk.ui.block.clear();
                                    }).fail(function (res) {
                                        nts.uk.ui.dialog.alert({ messageId: res.messageId || res.message });
                                        nts.uk.ui.block.clear();
                                    });
                                };
                                ScreenModel.prototype.findTypeSelected = function (id) {
                                    var self = this;
                                    return _.find(self.lstAppDis(), function (app) {
                                        return app.id == id;
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var ListType = /** @class */ (function () {
                                function ListType() {
                                }
                                ListType.EMPLOYMENT = 1;
                                ListType.Classification = 2;
                                ListType.JOB_TITLE = 3;
                                ListType.EMPLOYEE = 4;
                                return ListType;
                            }());
                            viewmodel.ListType = ListType;
                            var SelectType = /** @class */ (function () {
                                function SelectType() {
                                }
                                SelectType.SELECT_BY_SELECTED_CODE = 1;
                                SelectType.SELECT_ALL = 2;
                                SelectType.SELECT_FIRST_ITEM = 3;
                                SelectType.NO_SELECT = 4;
                                return SelectType;
                            }());
                            viewmodel.SelectType = SelectType;
                        })(viewmodel = n.viewmodel || (n.viewmodel = {}));
                    })(n = cmm018.n || (cmm018.n = {}));
                })(cmm018 = view.cmm018 || (view.cmm018 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm018.n.vm.js.map