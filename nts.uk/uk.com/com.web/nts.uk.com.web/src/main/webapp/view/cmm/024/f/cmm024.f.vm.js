/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />
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
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm024;
                (function (cmm024) {
                    var f;
                    (function (f) {
                        var common = nts.uk.com.view.cmm024.a.common;
                        var EmployeeDto = common.EmployeeDto;
                        var StartMode = kcp.share.tree.StartMode;
                        var SelectType = kcp.share.tree.SelectionType;
                        var SystemType = kcp.share.tree.SystemType;
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel(params) {
                                var _this = 
                                // start point of object
                                _super.call(this) || this;
                                _this.itemsSwap = ko.observableArray([]);
                                _this.enableSubmitButton = ko.observable(false);
                                //getShare & setShare
                                _this.workplaceId = ko.observable(null);
                                _this.currentCodeListSwap = ko.observableArray([]);
                                _this.oldCodeListSwap = ko.observableArray([]);
                                var vm = _this;
                                vm.columns = ko.observableArray([
                                    { headerText: vm.$i18n('CMM024_50'), key: 'employeeCode', width: 90, formatter: _.escape },
                                    { headerText: vm.$i18n('CMM024_51'), key: 'employeeName', width: 150, formatter: _.escape },
                                    { headerText: '', key: 'employeeId', hidden: true, formatter: _.escape },
                                ]);
                                vm.baseDate = ko.observable(new Date());
                                vm.multiSelectedId = ko.observableArray([]);
                                vm.alreadySettingList = ko.observableArray([]);
                                vm.treeGrid = {
                                    isShowAlreadySet: false,
                                    isMultipleUse: false,
                                    isMultiSelect: false,
                                    startMode: StartMode.WORKPLACE,
                                    selectedId: vm.multiSelectedId,
                                    baseDate: vm.baseDate,
                                    selectType: SelectType.SELECT_FIRST_ITEM,
                                    isShowSelectButton: true,
                                    isDialog: true,
                                    alreadySettingList: vm.alreadySettingList,
                                    maxRows: 10,
                                    tabindex: 1,
                                    systemType: SystemType.EMPLOYMENT, //2
                                };
                                return _this;
                            }
                            ViewModel.prototype.created = function (params) {
                                // start point of object
                                var vm = this;
                                vm.enableSubmitButton(false);
                            };
                            ViewModel.prototype.mounted = function () {
                                // raise event when view initial success full
                                var vm = this, selectType = 0;
                                vm.$blockui('hide');
                                $('#tree-grid').ntsTreeComponent(vm.treeGrid);
                                //get share
                                vm.$window.storage('workPlaceCodeList').then(function (data) {
                                    var codeList = [];
                                    //remove if employeeCode is null / empty
                                    data.codeList && data.codeList.map(function (item) {
                                        if (!nts.uk.util.isNullOrEmpty(item.employeeCode)
                                            && item.employeeCode != '-1') {
                                            codeList.push(item);
                                        }
                                    });
                                    vm.currentCodeListSwap(codeList);
                                    vm.oldCodeListSwap(codeList);
                                });
                                vm.multiSelectedId.subscribe(function (workplaceId) {
                                    if (!nts.uk.util.isNullOrUndefined(workplaceId)) {
                                        vm.getEmployeesFromCompanyWorkplace(workplaceId);
                                    }
                                });
                                vm.currentCodeListSwap.subscribe(function (value) {
                                    vm.enableSubmitButton(value.length > 0);
                                });
                                $('#single-tree-grid-tree-grid_container').attr('tabindex', 1);
                                $('#swap-list-gridArea1').attr('tabindex', 2);
                                $('#swap-list-gridArea2').attr('tabindex', 3);
                            };
                            ViewModel.prototype.getEmployeesFromCompanyWorkplace = function (wpId) {
                                var vm = this, employees = [], params = {
                                    workplaceId: wpId,
                                    baseDate: vm.baseDate //基準日期間
                                };
                                if (!nts.uk.util.isNullOrEmpty(wpId)) {
                                    vm.$blockui('show');
                                    vm.$ajax('at', common.CMM024_API.screenF_GetEmployeesList, ko.toJS(params))
                                        .done(function (response) {
                                        if (!nts.uk.util.isNullOrEmpty(response)) {
                                            response.forEach(function (element) {
                                                employees.push(new EmployeeDto(element.empCd, element.empName, element.empId, element.empId)); //'基本給　給本給本'
                                            });
                                        }
                                        //clear emplyees list
                                        vm.itemsSwap([]);
                                        var newEmployees = _.orderBy(employees, 'employeeCode', 'asc');
                                        vm.itemsSwap(newEmployees);
                                        vm.$blockui('hide');
                                    })
                                        .fail(function () { return vm.$blockui('hide'); })
                                        .always(function () { return vm.$blockui('hide'); });
                                }
                            };
                            /**
                             * Process
                             * */
                            ViewModel.prototype.proceed = function () {
                                var vm = this;
                                if (vm.currentCodeListSwap().length > 5) {
                                    vm.$dialog.error({ messageId: 'Msg_887' });
                                    return;
                                }
                                if (!nts.uk.ui.errors.hasError()) {
                                    if (vm.multiSelectedId().length > 0) {
                                        vm.$window.storage('newWorkPlaceCodeList', {
                                            workplaceId: vm.multiSelectedId()[0],
                                            codeList: vm.currentCodeListSwap()
                                        });
                                    }
                                    else
                                        vm.$window.storage('newWorkPlaceCodeList', null);
                                    vm.$window.close();
                                    return false;
                                }
                            };
                            /**
                             * Cancel and close window
                             * */
                            ViewModel.prototype.cancel = function () {
                                var vm = this;
                                vm.$window.storage('newWorkPlaceCodeList', null);
                                vm.$window.close();
                                return false;
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                    })(f = cmm024.f || (cmm024.f = {}));
                })(cmm024 = view.cmm024 || (view.cmm024 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm024.f.vm.js.map