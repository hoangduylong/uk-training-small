var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cdl009;
                (function (cdl009) {
                    var a;
                    (function (a) {
                        var close = nts.uk.ui.windows.close;
                        var setShared = nts.uk.ui.windows.setShared;
                        var getShared = nts.uk.ui.windows.getShared;
                        var SelectType = kcp.share.list.SelectType;
                        var ListType = kcp.share.list.ListType;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    var params = getShared('CDL009Params');
                                    self.selectFirst = ko.observable(params.selectFirst || params.selectFirst === false ? params.selectFirst : true);
                                    self.multiSelectedTree = ko.observableArray([]);
                                    self.multiSelectedTree(params.selectedIds ? params.selectedIds : []);
                                    self.isMultiSelect = ko.observable(params.isMultiple);
                                    self.baseDate = ko.observable(params.baseDate ? params.baseDate : moment(new Date()).toDate());
                                    self.target = ko.observable(params.target ? params.target : TargetClassification.WORKPLACE);
                                    self.employeeList = ko.observableArray();
                                    self.selectedEmpCode = ko.observable('');
                                    self.selectedEmps = ko.observableArray([]);
                                    // Initial listComponentOption
                                    self.treeGrid = {
                                        isMultipleUse: true,
                                        isMultiSelect: true,
                                        treeType: TreeType.WORK_PLACE,
                                        selectType: self.selectFirst() == true ? SelectType.SELECT_FIRST_ITEM : SelectType.SELECT_BY_SELECTED_CODE,
                                        baseDate: self.baseDate,
                                        selectedId: self.multiSelectedTree,
                                        isShowSelectButton: true,
                                        isDialog: true,
                                        maxRows: 12,
                                        systemType: 2
                                    };
                                    self.listComponentOpt = {
                                        isMultiSelect: self.isMultiSelect(),
                                        listType: ListType.EMPLOYEE,
                                        selectType: SelectType.NO_SELECT,
                                        selectedCode: ko.observable(),
                                        isDialog: true,
                                        employeeInputList: self.employeeList,
                                        maxRows: 12,
                                        width: 445
                                    };
                                    // Set SelectedCode to listComponentOpt (Depend on isMultiSelect)
                                    if (self.isMultiSelect()) {
                                        self.listComponentOpt.selectedCode = self.selectedEmps;
                                        self.listComponentOpt.isShowSelectAllButton = false;
                                    }
                                    else {
                                        self.listComponentOpt.selectedCode = self.selectedEmpCode;
                                    }
                                    self.enrollmentStatusList = ko.observableArray();
                                    self.isIncumbent = ko.observable(true);
                                    self.isLeaveOfAbsence = ko.observable(false);
                                    self.isHoliday = ko.observable(false);
                                    self.isRetirement = ko.observable(false);
                                }
                                /**
                                 * Search Employee
                                 */
                                ScreenModel.prototype.searchEmp = function () {
                                    nts.uk.ui.block.grayout(); // block ui
                                    var self = this;
                                    var treeData = $('#workplace-component').getDataList();
                                    var selectedRow = $('#workplace-component').getRowSelected();
                                    if (treeData.length == 0 || selectedRow.length <= 0) {
                                        if (self.target() == TargetClassification.WORKPLACE) {
                                            nts.uk.ui.dialog.alertError({ messageId: "Msg_643" });
                                        }
                                        else {
                                            nts.uk.ui.dialog.alertError({ messageId: "Msg_647" });
                                        }
                                        nts.uk.ui.block.clear();
                                        return;
                                    }
                                    // Search Employees
                                    self.findEmployee().done(function () {
                                        $('#emp-component').focus();
                                    }).always(function () { return nts.uk.ui.block.clear(); });
                                };
                                /**
                                 * Find Employee
                                 */
                                ScreenModel.prototype.findEmployee = function () {
                                    var self = this, dfd = $.Deferred();
                                    var empStatusList = [];
                                    // Enrollment is INCUMBENT
                                    if (self.isIncumbent()) {
                                        empStatusList.push(EnrollmentStatus.INCUMBENT);
                                    }
                                    // Enrollment is LEAVE_OF_ABSENCE
                                    if (self.isLeaveOfAbsence()) {
                                        empStatusList.push(EnrollmentStatus.LEAVE_OF_ABSENCE);
                                    }
                                    // Enrollment is HOLIDAY
                                    if (self.isHoliday()) {
                                        empStatusList.push(EnrollmentStatus.HOLIDAY);
                                    }
                                    // Enrollment is RETIREMENT
                                    if (self.isRetirement()) {
                                        empStatusList.push(EnrollmentStatus.RETIREMENT);
                                    }
                                    //                let selectedRow = $('#workplace-component').getRowSelected();
                                    //                let wkpIds = selectedRow.map(item => item.workplaceId);
                                    //                self.multiSelectedTree(selectedRow);
                                    var query = {
                                        workplaceIdList: self.multiSelectedTree(),
                                        referenceDate: self.baseDate(),
                                        empStatus: empStatusList
                                    };
                                    a.service.findEmployees(query).done(function (res) {
                                        if (res) {
                                            // Set Employee List
                                            var empList_1 = [];
                                            res.forEach(function (item) {
                                                empList_1.push({ id: item.employeeId, code: item.employeeCode, name: item.employeeName, workplaceName: item.workplaceName });
                                            });
                                            var data = _.orderBy(empList_1, ["code"], ['asc']);
                                            self.employeeList(data);
                                        }
                                        else {
                                            self.employeeList([]);
                                        }
                                        dfd.resolve();
                                    }).fail(function (error) {
                                        dfd.reject(error);
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * Close dialog.
                                 */
                                ScreenModel.prototype.closeDialog = function () {
                                    setShared('CDL009Cancel', true);
                                    nts.uk.ui.windows.close();
                                };
                                /**
                                 * Decide Employee
                                 */
                                ScreenModel.prototype.decideData = function () {
                                    var self = this;
                                    var isNoSelectRowSelected = $("#emp-component").isNoSelectRowSelected();
                                    if (self.isMultiSelect()) {
                                        if ((!self.selectedEmps() || self.selectedEmps().length == 0)) {
                                            nts.uk.ui.dialog.alertError({ messageId: "Msg_644" });
                                        }
                                        else {
                                            var empIds = self.getEmpIds();
                                            setShared('CDL009Output', empIds);
                                            close();
                                        }
                                    }
                                    else if (!self.selectedEmpCode() && !isNoSelectRowSelected) {
                                        nts.uk.ui.dialog.alertError({ messageId: "Msg_644" });
                                    }
                                    else {
                                        // Get Emp Id
                                        var emp = self.employeeList().filter(function (item) {
                                            return item.code == self.selectedEmpCode();
                                        })[0];
                                        setShared('CDL009Output', emp.id);
                                        close();
                                    }
                                };
                                /**
                                 * Get employee Ids
                                 */
                                ScreenModel.prototype.getEmpIds = function () {
                                    var self = this;
                                    var data = [];
                                    var _loop_1 = function (empCode) {
                                        var emp = self.employeeList().filter(function (item) {
                                            return item.code == empCode;
                                        })[0];
                                        data.push(emp.id);
                                    };
                                    for (var _i = 0, _a = self.selectedEmps(); _i < _a.length; _i++) {
                                        var empCode = _a[_i];
                                        _loop_1(empCode);
                                    }
                                    return data;
                                };
                                /**
                                 * function check employment
                                 */
                                ScreenModel.prototype.checkExistWorkplace = function (code, data) {
                                    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                                        var item = data_1[_i];
                                        if (code === item.workplaceId) {
                                            return true;
                                        }
                                    }
                                    return false;
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            /**
                            * Tree Type
                            */
                            var TreeType = /** @class */ (function () {
                                function TreeType() {
                                }
                                TreeType.WORK_PLACE = 1;
                                TreeType.DEPARTMENT = 2;
                                return TreeType;
                            }());
                            viewmodel.TreeType = TreeType;
                            /**
                         * Class TargetClassification
                         */
                            var TargetClassification = /** @class */ (function () {
                                function TargetClassification() {
                                }
                                TargetClassification.WORKPLACE = 1;
                                TargetClassification.DEPARTMENT = 2;
                                return TargetClassification;
                            }());
                            viewmodel.TargetClassification = TargetClassification;
                            /**
                             * class EnrollmentStatus
                             */
                            var EnrollmentStatus = /** @class */ (function () {
                                function EnrollmentStatus() {
                                }
                                //在職者
                                EnrollmentStatus.INCUMBENT = 1;
                                //休業者
                                EnrollmentStatus.LEAVE_OF_ABSENCE = 2;
                                //休職者
                                EnrollmentStatus.HOLIDAY = 3;
                                //退職者
                                EnrollmentStatus.RETIREMENT = 6;
                                return EnrollmentStatus;
                            }());
                            viewmodel.EnrollmentStatus = EnrollmentStatus;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cdl009.a || (cdl009.a = {}));
                })(cdl009 = view.cdl009 || (view.cdl009 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl009.a.vm.js.map