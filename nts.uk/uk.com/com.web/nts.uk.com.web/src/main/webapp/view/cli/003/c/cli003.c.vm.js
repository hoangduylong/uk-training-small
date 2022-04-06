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
/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cli003;
                (function (cli003) {
                    var c;
                    (function (c) {
                        var ListType = kcp.share.list.ListType;
                        var SelectType = kcp.share.list.SelectType;
                        var UnitModel = /** @class */ (function () {
                            function UnitModel(id, code, name, affiliationName) {
                                this.id = id;
                                this.code = code;
                                this.name = name;
                                this.affiliationName = affiliationName;
                            }
                            return UnitModel;
                        }());
                        c.UnitModel = UnitModel;
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel(params) {
                                var _this = _super.call(this) || this;
                                _this.formLabelTitle = ko.observable('');
                                _this.targetNumber = ko.observable('');
                                var vm = _this;
                                vm.initComponentC();
                                vm.initComponentKCP005();
                                vm.initComponentCCG001();
                                vm.$window
                                    .storage("CLI003_C_FormLabel")
                                    .then(function (data) {
                                    vm.formLabelTitle(data);
                                });
                                return _this;
                            }
                            ScreenModel.prototype.initComponentC = function () {
                                var vm = this;
                                vm.initEmployeeList = ko.observableArray([]);
                                vm.employeeDeletionList = ko.observableArray([]);
                                vm.categoryDeletionList = ko.observableArray([]);
                                vm.selectedEmployeeCodeTarget = ko.observableArray([]);
                                // update id sau check
                                vm.targetEmployeeIdList = ko.observableArray([]);
                                vm.alreadySettingPersonal = ko.observableArray([]);
                                vm.employeeList = ko.observableArray([]);
                                //Date
                                vm.enable = ko.observable(true);
                                vm.enableTargetDate = ko.observable(true);
                                vm.required = ko.observable(true);
                                vm.startDateString = ko.observable("");
                                vm.endDateString = ko.observable("");
                                vm.dateValue = ko.observable({});
                                vm.startDateString.subscribe(function (value) {
                                    vm.dateValue().startDate = value;
                                    vm.dateValue.valueHasMutated();
                                });
                                vm.endDateString.subscribe(function (value) {
                                    vm.dateValue().endDate = value;
                                    vm.dateValue.valueHasMutated();
                                });
                                vm.dateValue = ko.observable({
                                    startDate: moment.utc().format("YYYY/MM/DD"),
                                    endDate: moment.utc().format("YYYY/MM/DD"),
                                });
                                vm.selectedRuleCode = ko.observable(1);
                                vm.selectedTitleAtr = ko.observable(0);
                                vm.selectedTitleAtr.subscribe(function (value) {
                                    if (value === 1) {
                                        vm.applyKCP005ContentSearch(vm.initEmployeeList());
                                    }
                                    else {
                                        vm.applyKCP005ContentSearch([]);
                                    }
                                });
                            };
                            ScreenModel.prototype.initComponentCCG001 = function () {
                                var vm = this;
                                // Set component option
                                vm.ccg001ComponentOption = {
                                    showEmployeeSelection: false,
                                    systemType: 5,
                                    showQuickSearchTab: false,
                                    showAdvancedSearchTab: true,
                                    showBaseDate: true,
                                    showClosure: false,
                                    showAllClosure: false,
                                    showPeriod: false,
                                    periodFormatYM: false,
                                    isInDialog: true,
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
                                    showWorktype: false,
                                    isMutipleCheck: true,
                                    /** Required parameter */
                                    baseDate: moment().toISOString(),
                                    periodStartDate: moment().toISOString(),
                                    periodEndDate: moment().toISOString(),
                                    inService: true,
                                    leaveOfAbsence: true,
                                    closed: true,
                                    retirement: true,
                                    /**
                                     * vm-defined function: Return data from CCG001
                                     * @param: data: the data return from CCG001
                                     */
                                    returnDataFromCcg001: function (data) {
                                        vm.selectedTitleAtr(1);
                                        data.listEmployee = _.orderBy(data.listEmployee, ["employeeCode"], ["asc", "asc"]);
                                        vm.employeeList();
                                        vm.applyKCP005ContentSearch(data.listEmployee);
                                    },
                                };
                            };
                            ScreenModel.prototype.initComponentKCP005 = function () {
                                //KCP005
                                var vm = this;
                                vm.listComponentOption = {
                                    isShowAlreadySet: false,
                                    isMultiSelect: true,
                                    listType: ListType.EMPLOYEE,
                                    employeeInputList: vm.employeeList,
                                    selectType: SelectType.SELECT_ALL,
                                    selectedCode: vm.selectedEmployeeCodeTarget,
                                    isDialog: true,
                                    isShowNoSelectRow: false,
                                    alreadySettingList: vm.alreadySettingPersonal,
                                    isShowWorkPlaceName: true,
                                    isShowSelectAllButton: true,
                                    maxWidth: 550,
                                    maxRows: 13,
                                };
                            };
                            ScreenModel.prototype.applyKCP005ContentSearch = function (dataEmployee) {
                                var vm = this;
                                var employeeSearchs = [];
                                _.forEach(dataEmployee, function (item) {
                                    employeeSearchs.push(new UnitModel(item.employeeId, item.employeeCode, item.employeeName, item.affiliationName));
                                });
                                vm.employeeList(employeeSearchs);
                            };
                            ScreenModel.prototype.closeDialog = function () {
                                var vm = this;
                                if (vm.formLabelTitle() === vm.$i18n("CLI003_23")) {
                                    vm.$window
                                        .storage("operatorEmployeeCount", undefined)
                                        .then(function () { return vm.$window.storage("selectedEmployeeCodeOperator", undefined); })
                                        .then(function () { return vm.$window.close(); });
                                }
                                if (vm.formLabelTitle() === vm.$i18n("CLI003_16")) {
                                    vm.$window
                                        .storage("targetEmployeeCount", undefined)
                                        .then(function () { return vm.$window.storage("selectedEmployeeCodeTarget", undefined); })
                                        .then(function () { return vm.$window.close(); });
                                }
                            };
                            ScreenModel.prototype.getListEmployeeId = function () {
                                var vm = this;
                                var listEmployeeId = [];
                                _.map(vm.selectedEmployeeCodeTarget(), function (employeeCode) {
                                    var employeeId = _.find(vm.employeeList(), function (employee) { return employee.code === employeeCode; }).id;
                                    listEmployeeId.push(employeeId);
                                });
                                return listEmployeeId;
                            };
                            ScreenModel.prototype.setEmployee = function () {
                                var vm = this;
                                vm.targetNumber(nts.uk.text.format(vm.$i18n("CLI003_57"), vm.selectedEmployeeCodeTarget().length));
                                if (vm.formLabelTitle() === vm.$i18n("CLI003_16")) {
                                    vm.$window.storage("targetEmployeeCount", vm.targetNumber())
                                        .then(function () { return vm.$window.storage("selectedEmployeeCodeTarget", vm.getListEmployeeId()); })
                                        .then(function () { return vm.$window.close(); });
                                }
                                if (vm.formLabelTitle() === vm.$i18n("CLI003_23")) {
                                    vm.$window.storage("operatorEmployeeCount", vm.targetNumber())
                                        .then(function () { return vm.$window.storage("selectedEmployeeCodeOperator", vm.getListEmployeeId()); })
                                        .then(function () { return vm.$window.close(); });
                                }
                            };
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                $('#ccgComponent').ntsGroupComponent(vm.ccg001ComponentOption).done(function () {
                                    vm.applyKCP005ContentSearch([]);
                                    $('#employeeSearch').ntsListComponent(vm.listComponentOption);
                                });
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        c.ScreenModel = ScreenModel;
                    })(c = cli003.c || (cli003.c = {}));
                })(cli003 = view.cli003 || (view.cli003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cli003.c.vm.js.map