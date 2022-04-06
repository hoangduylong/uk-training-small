var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg001;
                (function (ccg001) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.systemTypes = ko.observableArray([
                                        { name: '個人情報', value: 1 },
                                        { name: '就業', value: 2 },
                                        { name: '給与', value: 3 },
                                        { name: '人事', value: 4 },
                                        { name: '管理者', value: 5 } // ADMINISTRATOR
                                    ]);
                                    self.periodRanges = [
                                        { name: 'なし', value: 'none' },
                                        { name: '１ヶ月', value: 'oneMonth' },
                                        { name: '１年', value: 'oneYear' }
                                    ];
                                    self.selectedEmployee = ko.observableArray([]);
                                    // initial ccg options
                                    self.setDefaultCcg001Option();
                                    // Init component.
                                    self.reloadCcg001();
                                    self.periodFormatYM.subscribe(function (item) {
                                        if (item) {
                                            self.showClosure(true);
                                        }
                                    });
                                }
                                /**
                                 * Set default ccg001 options
                                 */
                                ScreenModel.prototype.setDefaultCcg001Option = function () {
                                    var self = this;
                                    self.isQuickSearchTab = ko.observable(true);
                                    self.isAdvancedSearchTab = ko.observable(true);
                                    self.isAllReferableEmployee = ko.observable(true);
                                    self.isOnlyMe = ko.observable(true);
                                    self.isEmployeeOfDepartment = ko.observable(true);
                                    self.isEmployeeWorkplaceFollow = ko.observable(true);
                                    self.isEmployeeOfWorkplace = ko.observable(true);
                                    self.isEmployeeDepartmentFollow = ko.observable(true);
                                    self.isMutipleCheck = ko.observable(true);
                                    self.isSelectAllEmployee = ko.observable(true);
                                    self.baseDate = ko.observable(moment());
                                    self.periodStartDate = ko.observable(moment());
                                    self.periodEndDate = ko.observable(moment());
                                    self.showEmployment = ko.observable(true);
                                    self.showDepartment = ko.observable(true); // 部門条件
                                    self.showWorkplace = ko.observable(true); // 職場条件
                                    self.showClassification = ko.observable(true); // 分類条件
                                    self.showJobTitle = ko.observable(true); // 職位条件
                                    self.showWorktype = ko.observable(true); // 勤種条件
                                    self.inService = ko.observable(true); // 在職区分
                                    self.leaveOfAbsence = ko.observable(true); // 休職区分
                                    self.closed = ko.observable(true); // 休業区分
                                    self.retirement = ko.observable(true); // 退職区分
                                    self.systemType = ko.observable(1);
                                    self.employeesDoNotManageSchedules = ko.observable(false);
                                    self.showClosure = ko.observable(true); // 就業締め日利用
                                    self.showBaseDate = ko.observable(true); // 基準日利用
                                    self.showAllClosure = ko.observable(true); // 全締め表示
                                    self.showPeriod = ko.observable(false); // 対象期間利用
                                    self.periodFormatYM = ko.observable(false); // 対象期間精度
                                    self.maxPeriodRange = ko.observable('none');
                                    self.lazyLoad = ko.observable(false);
                                };
                                /**
                                 * Reload component CCG001
                                 */
                                ScreenModel.prototype.reloadCcg001 = function () {
                                    var self = this;
                                    if ($('.ccg-sample-has-error').ntsError('hasError')) {
                                        return;
                                    }
                                    // clear ccg001 errors
                                    $('#ccg001-search-period .ntsDateRangeComponent').ntsError('clear');
                                    $('#ccg001-search-period .ntsStartDate input').ntsError('clear');
                                    $('#ccg001-search-period .ntsEndDate input').ntsError('clear');
                                    $('#inp_baseDate').ntsError('clear');
                                    $('#inp-period-startYMD').ntsError('clear');
                                    $('#inp-period-endYMD').ntsError('clear');
                                    $('#inp-period-startYM').ntsError('clear');
                                    $('#inp-period-endYM').ntsError('clear');
                                    $('#ccg001-partg-start').ntsError('clear');
                                    $('#ccg001-partg-end').ntsError('clear');
                                    if (!self.showBaseDate() && !self.showClosure() && !self.showPeriod()) {
                                        nts.uk.ui.dialog.alertError("Base Date or Closure or Period must be shown!");
                                        return;
                                    }
                                    self.ccg001ComponentOption = {
                                        /** Common properties */
                                        systemType: self.systemType(),
                                        employeesDoNotManageSchedules: self.employeesDoNotManageSchedules,
                                        showEmployeeSelection: self.isSelectAllEmployee(),
                                        showQuickSearchTab: self.isQuickSearchTab(),
                                        showAdvancedSearchTab: self.isAdvancedSearchTab(),
                                        showBaseDate: self.showBaseDate(),
                                        showClosure: self.showClosure(),
                                        showAllClosure: self.showAllClosure(),
                                        showPeriod: self.showPeriod(),
                                        periodFormatYM: self.periodFormatYM(),
                                        maxPeriodRange: self.maxPeriodRange(),
                                        /** Required parameter */
                                        baseDate: self.baseDate,
                                        periodStartDate: self.periodStartDate,
                                        periodEndDate: self.periodEndDate,
                                        inService: self.inService(),
                                        leaveOfAbsence: self.leaveOfAbsence(),
                                        closed: self.closed(),
                                        retirement: self.retirement(),
                                        /** Quick search tab options */
                                        showAllReferableEmployee: self.isAllReferableEmployee(),
                                        showOnlyMe: self.isOnlyMe(),
                                        showSameDepartment: self.isEmployeeOfDepartment(),
                                        showSameDepartmentAndChild: self.isEmployeeDepartmentFollow(),
                                        showSameWorkplace: self.isEmployeeOfWorkplace(),
                                        showSameWorkplaceAndChild: self.isEmployeeWorkplaceFollow(),
                                        /** Advanced search properties */
                                        showEmployment: self.showEmployment(),
                                        showDepartment: self.showDepartment(),
                                        showWorkplace: self.showWorkplace(),
                                        showClassification: self.showClassification(),
                                        showJobTitle: self.showJobTitle(),
                                        showWorktype: self.showWorktype(),
                                        isMutipleCheck: self.isMutipleCheck(),
                                        isTab2Lazy: self.lazyLoad(),
                                        /** Return data */
                                        returnDataFromCcg001: function (data) {
                                            self.selectedEmployee(data.listEmployee);
                                        }
                                    };
                                    // Start component
                                    $('#com-ccg001').ntsGroupComponent(self.ccg001ComponentOption);
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = ccg001.a || (ccg001.a = {}));
                })(ccg001 = view.ccg001 || (view.ccg001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg001.a.vm.js.map