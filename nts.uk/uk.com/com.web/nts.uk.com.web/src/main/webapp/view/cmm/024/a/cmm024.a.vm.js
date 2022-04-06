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
                    var a;
                    (function (a) {
                        var common = nts.uk.com.view.cmm024.a.common;
                        var EmployeeDto = nts.uk.com.view.cmm024.a.common.EmployeeDto;
                        var ScheduleHistoryDto = nts.uk.com.view.cmm024.a.common.ScheduleHistoryDto;
                        var Model = nts.uk.com.view.cmm024.a.common.Model;
                        var HistoryRes = nts.uk.com.view.cmm024.a.common.HistoryRes;
                        var ScreenModel = nts.uk.com.view.cmm024.a.common.ScreenModel;
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel(params) {
                                var _this = 
                                // start point of object
                                _super.call(this) || this;
                                _this.ntsHeaderColumns = ko.observableArray([]);
                                //Screen A
                                _this.modelA = ko.observable(new Model());
                                _this.enableRegisterA = ko.observable(true);
                                _this.company = ko.observable({ name: null, id: null });
                                _this.screenAModeAddNew = ko.observable(true);
                                _this.screenAModeEdit = ko.observable(false);
                                _this.screenAMode = ko.observable(ScreenModel.EDIT);
                                _this.enableScheduleHistoryA = ko.observable(true);
                                _this.allowSettingA = ko.observable(true);
                                _this.companyScheduleHistoryList = ko.observableArray([]);
                                _this.companyScheduleHistorySelected = ko.observable();
                                _this.companyScheduleHistoryObjSelected = ko.observable(null);
                                _this.companyLatestPeriod = ko.observable(null);
                                _this.isNoteSaveAfterClonedA = ko.observable(false);
                                //Screen B
                                _this.modelB = ko.observable(new Model());
                                _this.enableRegisterB = ko.observable(false);
                                _this.screenBModeAddNew = ko.observable(true);
                                _this.screenBModeEdit = ko.observable(false);
                                _this.screenBMode = ko.observable(ScreenModel.EDIT);
                                _this.enableScheduleHistoryB = ko.observable(true);
                                _this.allowSettingB = ko.observable(true);
                                _this.isShowPanelB = ko.observable(true);
                                _this.workplaceScheduleHistoryList = ko.observableArray([]);
                                _this.workplaceScheduleHistorySelected = ko.observable();
                                _this.workplaceScheduleHistoryObjSelected = ko.observable(null);
                                _this.workplaceLatestPeriod = ko.observable(null);
                                _this.isNoteSaveAfterClonedB = ko.observable(false);
                                _this.isReloadScreen = ko.observable(true);
                                var vm = _this;
                                vm.ntsHeaderColumns = ko.observableArray([
                                    { headerText: vm.$i18n('CMM024_7'), key: 'code', hidden: true },
                                    { headerText: vm.$i18n('CMM024_7'), key: 'display', formatter: _.escape }
                                ]);
                                //Screen B			
                                vm.selectedWkpId = ko.observable('');
                                // Initial listComponentOption
                                vm.listComponentOption = {
                                    targetBtnText: vm.$i18n("KCP010_3"),
                                    tabIndex: -1
                                };
                                vm.kcp010Model = $('#wkp-component').ntsLoadListComponent(vm.listComponentOption);
                                vm.initialScreenB();
                                //Screen A			
                                vm.screenAMode(ScreenModel.EDIT);
                                vm.companyScheduleHistoryListing();
                                var company = JSON.parse(nts.uk.sessionStorage.nativeStorage.getItem('nts.uk.session.COMPANY'));
                                if (!_.isEmpty(company)) {
                                    vm.company({ name: company[0].companyName, id: company[0].companyId });
                                }
                                vm.modelA().workPlaceCompanyId = vm.company().id;
                                vm.companyScheduleHistorySelected.subscribe(function (value) {
                                    if (value === 'reload' || _.isNil(value))
                                        return;
                                    if (vm.isNoteSaveAfterClonedA()) {
                                        vm.companyScheduleHistoryObjSelected(_.find(vm.companyScheduleHistoryList(), function (x) { return x.code === value; }));
                                        vm.screenAMode(ScreenModel.EDIT);
                                        vm.companyScheduleHistoryListing();
                                    }
                                    else
                                        vm.displayInfoOnScreenA(value);
                                });
                                //Screen B			
                                vm.workplaceScheduleHistorySelected.subscribe(function (value) {
                                    if (value === 'reload' || _.isNil(value))
                                        return;
                                    if (vm.isShowPanelB()) {
                                        if (vm.isNoteSaveAfterClonedB()) {
                                            vm.workplaceScheduleHistoryObjSelected(_.find(vm.workplaceScheduleHistoryList(), function (x) { return x.code === value; }));
                                            vm.screenBMode(ScreenModel.EDIT);
                                            vm.workplaceScheduleHistoryListing();
                                        }
                                        else
                                            vm.displayInfoOnScreenB(value);
                                    }
                                });
                                vm.kcp010Model.workplaceId.subscribe(function (wkpId) {
                                    if (wkpId) {
                                        vm.selectedWkpId(wkpId);
                                        if (vm.isShowPanelB())
                                            vm.workplaceScheduleHistoryListing();
                                    }
                                });
                                return _this;
                            }
                            // start point of object
                            ViewModel.prototype.created = function (params) {
                                var vm = this;
                            };
                            // raise event when view initial success full
                            ViewModel.prototype.mounted = function () {
                                var vm = this;
                                //responsive
                                if ($(window).width() < 1360) {
                                    $('.contents-area').addClass('fix1280');
                                }
                                else if ($(window).width() < 1400) {
                                    $('.contents-area').addClass('fix1366');
                                }
                                else
                                    $('.contents-area')
                                        .removeClass('fix1366')
                                        .removeClass('fix1280');
                            };
                            /***********************************************************************
                             * Screen A
                             * ********************************************************************/
                            ViewModel.prototype.displayInfoOnScreenA = function (value) {
                                if (value === void 0) { value = null; }
                                var vm = this, objFind = null, scheduleHistory = vm.companyScheduleHistoryList();
                                if (scheduleHistory.length > 0) {
                                    value = (value === null) ? scheduleHistory[0].code : value;
                                    objFind = _.find(scheduleHistory, function (x) { return x.code === value; });
                                    if (nts.uk.util.isNullOrUndefined(objFind)) {
                                        objFind = scheduleHistory[0];
                                    }
                                    vm.companyScheduleHistoryObjSelected(objFind); //keep old history period before change/update
                                    vm.modelA().startDate(moment.utc(objFind.startDate, 'YYYY/MM/DD').toDate());
                                    vm.modelA().endDate(moment.utc(objFind.endDate, 'YYYY/MM/DD').toDate());
                                    //36承認者パネル
                                    vm.createEmployeesPanelList('A', 1, objFind.personalInfoApprove);
                                    //従業員代表パネル
                                    vm.createEmployeesPanelList('A', 2, objFind.personalInfoConfirm);
                                    //reset to EDIT mode
                                    vm.resetSettingsScreenA(true, true, true, true, ScreenModel.EDIT);
                                    if (scheduleHistory[0].code === value)
                                        $('#historyList tr:first-child').focus();
                                    else
                                        $('#historyList tr[data-id="' + objFind.code + '"]').focus();
                                }
                                else {
                                    vm.resetSettingsScreenA(false, true, false, true, ScreenModel.ADDNEW);
                                }
                            };
                            /**
                             * Register data on Screen A
                             * */
                            ViewModel.prototype.RegisterA = function () {
                                var vm = this, currentScheduleItem = vm.modelA();
                                ;
                                var tempList = currentScheduleItem.approverPanel().filter(function (item) {
                                    return (item.employeeCode !== '-1' && item.employeeCode !== null);
                                });
                                if (tempList.length <= 0) {
                                    vm.$dialog.error({ messageId: 'Msg_1790' });
                                    $('.employee-lists-a').focus();
                                    return;
                                }
                                switch (vm.screenAMode()) {
                                    case ScreenModel.EDIT:
                                        vm.updateScheduleHistoryByCompany();
                                        break;
                                    case ScreenModel.ADDNEW:
                                        vm.registerScheduleHistoryByCompany();
                                        break;
                                }
                            };
                            /**
                             * Registration new schedule history
                            */
                            ViewModel.prototype.registerScheduleHistoryByCompany = function () {
                                var vm = this, currentScheduleItem = vm.modelA();
                                vm.$blockui('show');
                                var params = {
                                    companyId: vm.company().id,
                                    startDate: moment.utc(currentScheduleItem.startDate(), 'YYYY-MM-DD'),
                                    endDate: moment.utc(currentScheduleItem.endDate(), 'YYYY-MM-DD'),
                                    approvedList: [],
                                    confirmedList: [] // 従業員代表指定リンクラベル
                                };
                                currentScheduleItem.approverPanel().map(function (item) {
                                    if (item.employeeCode != '-1' && item.employeeCode != null)
                                        params.approvedList.push(item.employeeId);
                                });
                                currentScheduleItem.employeesRepresentative().map(function (item) {
                                    if (item.employeeCode != '-1' && item.employeeCode != null)
                                        params.confirmedList.push(item.employeeId);
                                });
                                vm.$ajax('at', common.CMM024_API.screenA_RegisterScheduleHistory, params)
                                    .done(function (response) {
                                    vm.$dialog.info({ messageId: 'Msg_15' }).then(function () {
                                        vm.companyScheduleHistoryListing();
                                        vm.$blockui('hide');
                                    });
                                }).fail(function (error) {
                                    console.log(error);
                                }).always(function () {
                                    vm.$blockui('hide');
                                });
                            };
                            /**
                             * Registration new schedule history
                            */
                            ViewModel.prototype.updateScheduleHistoryByCompany = function () {
                                var vm = this, currentScheduleItem = vm.modelA();
                                vm.$blockui('show');
                                var params = {
                                    companyId: vm.company().id,
                                    startDate: moment.utc(currentScheduleItem.startDate(), 'YYYY-MM-DD'),
                                    endDate: moment.utc(currentScheduleItem.endDate(), 'YYYY-MM-DD'),
                                    approvedList: [],
                                    confirmedList: [],
                                    startDateBeforeChange: moment.utc(currentScheduleItem.startDate(), 'YYYY-MM-DD') //期間
                                };
                                currentScheduleItem.approverPanel().map(function (item) {
                                    if (item.employeeCode != '-1' && item.employeeCode != null)
                                        params.approvedList.push(item.employeeId);
                                });
                                currentScheduleItem.employeesRepresentative().map(function (item) {
                                    if (item.employeeCode != '-1' && item.employeeCode != null)
                                        params.confirmedList.push(item.employeeId);
                                });
                                vm.$ajax('at', common.CMM024_API.screenA_UpdateScheduleHistory, params)
                                    .done(function (response) {
                                    vm.$dialog.info({ messageId: 'Msg_15' }).then(function () {
                                        vm.companyScheduleHistoryListing();
                                        vm.$blockui('hide');
                                    });
                                }).fail(function (error) {
                                    console.log(error);
                                }).always(function () {
                                    vm.$blockui('hide');
                                });
                            };
                            /**
                             * Display page C
                             * */
                            ViewModel.prototype.screenAShowDialogC = function () {
                                var vm = this, currentScheduleHistoryList = vm.companyScheduleHistoryList();
                                var params = (currentScheduleHistoryList.length > 0) ? currentScheduleHistoryList[0] : null;
                                //vm.companyScheduleHistorySelected(null);
                                vm.$window.storage("scheduleHistorySelected", params);
                                vm.$window.modal("/view/cmm/024/c/index.xhtml", { title: vm.$i18n('CMM024_92') }).then(function () {
                                    //開始年月日テキストボックス
                                    vm.$window.storage("newScheduleHistory").then(function (data) {
                                        if (!nts.uk.util.isNullOrUndefined(data.scheduleHistoryItem)) {
                                            currentScheduleHistoryList = vm.updateScheduleHistoryListing(vm.companyScheduleHistoryList(), data);
                                            //re-update the list
                                            vm.companyScheduleHistoryList(currentScheduleHistoryList);
                                            vm.companyScheduleHistorySelected(currentScheduleHistoryList[0].code);
                                            if (data.registrationHistoryType == HistoryRes.HISTORY_NEW) {
                                                vm.modelA(new Model(vm.$user.companyCode, data.scheduleHistoryItem.startDate, data.scheduleHistoryItem.endDate, vm.addEmptySetting(), vm.addEmptySetting()));
                                            }
                                            else { //clone
                                                vm.modelA().startDate(data.scheduleHistoryItem.startDate);
                                                vm.modelA().endDate(data.scheduleHistoryItem.endDate);
                                            }
                                            //disable/enable buttons
                                            vm.resetSettingsScreenA(true, false, false, true, ScreenModel.ADDNEW);
                                            vm.isNoteSaveAfterClonedA(true);
                                        }
                                        else {
                                            if (currentScheduleHistoryList.length > 0)
                                                vm.resetSettingsScreenA(true, true, true, true, ScreenModel.EDIT);
                                            else
                                                vm.resetSettingsScreenA(false, true, false, false, ScreenModel.EDIT);
                                            $('#historyList tr:first-child').focus();
                                        }
                                    });
                                });
                            };
                            ViewModel.prototype.resetSettingsScreenA = function (register, addnew, edit, enablePeriodlist, mode) {
                                var vm = this;
                                vm.enableRegisterA(register);
                                vm.screenAModeAddNew(addnew);
                                vm.screenAModeEdit(edit);
                                vm.enableScheduleHistoryA(enablePeriodlist);
                                vm.screenAMode(mode);
                                vm.allowSettingA(register);
                                //clear model
                                var historyperiod = vm.companyScheduleHistoryList();
                                if (historyperiod.length <= 0) {
                                    vm.modelA(new Model(null, null, null, [], []));
                                }
                            };
                            /**
                             * Display page D
                             * */
                            ViewModel.prototype.screenShowDialogAD = function () {
                                var vm = this, allowStartDate = null, isAllowEdit = true, scheduleHistory = [];
                                //get second item
                                var data = {};
                                scheduleHistory = vm.companyScheduleHistoryList();
                                if (scheduleHistory.length > 1) {
                                    allowStartDate = scheduleHistory[1].startDate;
                                    isAllowEdit = (vm.companyScheduleHistoryObjSelected().code === scheduleHistory[0].code);
                                }
                                data.allowStartDate = allowStartDate;
                                data.scheduleHistoryUpdate = vm.companyScheduleHistoryObjSelected();
                                data.workPlaceCompanyId = vm.company().id;
                                data.screen = 'A';
                                if (!isAllowEdit) {
                                    vm.$dialog.error({ messageId: 'Msg_154' });
                                    $('#historyList tr[data-id="' + data.scheduleHistoryUpdate.code + '"]').focus();
                                    return;
                                }
                                //ScheduleHistoryModel
                                vm.$window.storage("CMM024_D_INPUT", data);
                                vm.$window.modal("/view/cmm/024/d/index.xhtml", { title: vm.$i18n('CMM024_93') }).then(function () {
                                    vm.$window.storage("CMM024_D_RESULT").then(function (data) {
                                        if (!nts.uk.util.isNullOrEmpty(data)) {
                                            vm.companyScheduleHistoryObjSelected(null);
                                            vm.companyScheduleHistoryListing();
                                            //vm.resetSettingsScreenA(true, true, true, true, ScreenModel.EDIT);
                                        }
                                        else {
                                            vm.resetSettingsScreenA(vm.enableRegisterA(), true, true, vm.allowSettingA(), vm.screenAMode());
                                            $('#historyList tr:first-child').focus();
                                        }
                                    });
                                });
                            };
                            /**
                             * Display page D on B
                             * */
                            ViewModel.prototype.screenShowDialogBD = function () {
                                var vm = this, allowStartDate = null, isAllowEdit = true, scheduleHistory = [];
                                //get second item
                                var data = {};
                                scheduleHistory = vm.workplaceScheduleHistoryList();
                                if (scheduleHistory.length > 1) {
                                    allowStartDate = scheduleHistory[1].startDate;
                                    isAllowEdit = (vm.workplaceScheduleHistoryObjSelected().code === scheduleHistory[0].code);
                                }
                                data.allowStartDate = allowStartDate;
                                data.scheduleHistoryUpdate = vm.workplaceScheduleHistoryObjSelected();
                                data.workPlaceCompanyId = vm.selectedWkpId();
                                data.screen = 'B';
                                if (!isAllowEdit) {
                                    vm.$dialog.error({ messageId: 'Msg_154' });
                                    $('#historyListB tr[data-id="' + data.scheduleHistoryUpdate.code + '"]').focus();
                                    return;
                                }
                                //ScheduleHistoryModel
                                vm.$window.storage("CMM024_D_INPUT", data);
                                vm.$window.modal("/view/cmm/024/d/index.xhtml", { title: vm.$i18n('CMM024_93') }).then(function () {
                                    vm.$window.storage("CMM024_D_RESULT").then(function (data) {
                                        if (!nts.uk.util.isNullOrEmpty(data)) {
                                            vm.workplaceScheduleHistoryObjSelected(null);
                                            vm.workplaceScheduleHistoryListing();
                                            //vm.resetSettingsScreenB(true, true, true, true, ScreenModel.EDIT);
                                        }
                                        else {
                                            vm.resetSettingsScreenB(vm.enableRegisterB(), true, true, vm.allowSettingB(), vm.screenBMode());
                                            $('#historyListB tr:first-child').focus();
                                        }
                                    });
                                });
                            };
                            /**
                             * Display page F
                             * */
                            ViewModel.prototype.showDialogScreenF = function (panel, screen) {
                                if (screen === void 0) { screen = 'A'; }
                                var vm = this, isAllowSetting = false, employeesList = [];
                                var model = (screen === 'A') ? vm.modelA() : vm.modelB();
                                employeesList = (panel === 1) ? model.approverPanel() : model.employeesRepresentative();
                                switch (screen) {
                                    case 'A':
                                        isAllowSetting = vm.allowSettingA();
                                        break;
                                    case 'B':
                                        isAllowSetting = vm.allowSettingB();
                                        break;
                                }
                                if (isAllowSetting) {
                                    vm.$window.storage("workPlaceCodeList", {
                                        workplaceId: (screen === 'A') ? null : vm.selectedWkpId(),
                                        codeList: employeesList
                                    });
                                    vm.$window.modal("/view/cmm/024/f/index.xhtml", { title: vm.$i18n('CMM024_94') }).then(function () {
                                        //36承認者パネル
                                        vm.$window.storage("newWorkPlaceCodeList").then(function (data) {
                                            var dataList = [];
                                            if (!nts.uk.util.isNullOrEmpty(data)) {
                                                if (data.codeList) {
                                                    dataList = data.codeList;
                                                    dataList = (dataList.length <= 0) ? vm.addEmptySetting() : dataList;
                                                    dataList = dataList.slice(0, 5); //max 5
                                                }
                                                if (panel === 1)
                                                    model.approverPanel(dataList);
                                                else
                                                    model.employeesRepresentative(dataList);
                                                if ((screen === 'A'))
                                                    vm.modelA(model);
                                                else
                                                    vm.modelB(model);
                                            }
                                        });
                                    });
                                }
                            };
                            /*
                            * Get history listing
                            * */
                            ViewModel.prototype.companyScheduleHistoryListing = function () {
                                var vm = this, selectedHistory = null, tempScheduleList = [];
                                vm.$blockui('show');
                                vm.isNoteSaveAfterClonedA(false);
                                //get Schedule of a company			
                                vm.$ajax('at', common.CMM024_API.screenA_GetScheduleHistoryList)
                                    .done(function (response) {
                                    if (!nts.uk.util.isNullOrUndefined(response)) {
                                        vm.company().id = response.companyId;
                                        vm.company().name = response.companyName;
                                        //A2-6 - Schedule history listing
                                        if (!nts.uk.util.isNullOrEmpty(response.scheduleHistory)) {
                                            response.scheduleHistory.map(function (history) {
                                                tempScheduleList.push(new ScheduleHistoryDto(history.startDate, history.endDate, history.personalInfoApprove, history.personalInfoConfirm));
                                            });
                                            //sort DECS
                                            tempScheduleList = _.orderBy(tempScheduleList, 'code', 'desc');
                                        }
                                        //create schedule history listing
                                        vm.companyScheduleHistoryList(tempScheduleList);
                                        if (vm.companyScheduleHistoryList().length > 0) {
                                            //get the first item of list							
                                            if (ScreenModel.ADDNEW !== vm.screenAMode() && vm.companyScheduleHistoryObjSelected())
                                                selectedHistory = vm.companyScheduleHistoryObjSelected();
                                            else
                                                selectedHistory = vm.companyScheduleHistoryList()[0];
                                            vm.companyScheduleHistoryObjSelected(selectedHistory);
                                            vm.companyScheduleHistorySelected(selectedHistory.code);
                                            vm.companyScheduleHistorySelected.valueHasMutated();
                                            vm.resetSettingsScreenA(true, true, true, true, ScreenModel.EDIT);
                                        }
                                        else {
                                            vm.companyScheduleHistorySelected(null);
                                            vm.companyScheduleHistoryObjSelected(null);
                                            vm.enableRegisterA(false);
                                            vm.modelB().approverPanel([]);
                                            vm.modelB().employeesRepresentative([]);
                                            vm.resetSettingsScreenA(true, true, false, true, ScreenModel.ADDNEW);
                                            //vm.displayInfoOnScreenA(null);
                                        }
                                    }
                                    vm.$blockui('hide');
                                })
                                    .always(function () {
                                    vm.$blockui('hide');
                                });
                            };
                            /**
                             * 36承認者一覧リンクラベル
                             * @model string : screen A | B
                             * @panel nuner	: 1: approver | 2: representative
                             * @listOfEmployees array : the list of employees
                             * return the list of employees who have authority to approve schedule history
                             */
                            ViewModel.prototype.createEmployeesPanelList = function (model, panel, listOfEmployees) {
                                if (model === void 0) { model = 'A'; }
                                if (panel === void 0) { panel = 1; }
                                if (listOfEmployees === void 0) { listOfEmployees = []; }
                                var vm = this, employeesList = [];
                                listOfEmployees &&
                                    listOfEmployees.map(function (employee) {
                                        employeesList.push(new EmployeeDto(_.trim(employee.employeeCode), _.trim(employee.employeeName), _.trim(employee.personId), _.trim(employee.employeeId)));
                                    });
                                if (employeesList.length <= 0) {
                                    employeesList = vm.addEmptySetting();
                                }
                                else {
                                    employeesList = _.orderBy(employeesList, 'employeeCode', 'asc');
                                }
                                switch (model) {
                                    case 'A':
                                        if (panel === 1)
                                            vm.modelA().approverPanel(employeesList);
                                        else
                                            vm.modelA().employeesRepresentative(employeesList); //従業員代表指定リンクラベル
                                        break;
                                    case 'B':
                                        if (panel === 1)
                                            vm.modelB().approverPanel(employeesList);
                                        else
                                            vm.modelB().employeesRepresentative(employeesList); //従業員代表指定リンクラベル
                                        break;
                                }
                            };
                            /**
                             * Update the schedule history listing
                             * @params currentList : Array
                             * @params data	:
                            */
                            ViewModel.prototype.updateScheduleHistoryListing = function (currentList, data) {
                                var vm = this, newScheduleHistoryList = [], oldStartDate = null, newEndDate = common.END_DATE;
                                newScheduleHistoryList = currentList;
                                if (newScheduleHistoryList.length > 0) {
                                    //update endDate before insert to first
                                    var beforeNewStartDate = moment(data.scheduleHistoryItem.startDate, "YYYY/MM/DD")
                                        .subtract(1, "days").format("YYYY/MM/DD");
                                    //update newEndDate for old first element of the listing
                                    oldStartDate = newScheduleHistoryList[0].startDate;
                                    newScheduleHistoryList[0] = new ScheduleHistoryDto(oldStartDate, beforeNewStartDate, newScheduleHistoryList[0].personalInfoApprove, newScheduleHistoryList[0].personalInfoConfirm);
                                    //update new element to first element of the new listing
                                    newScheduleHistoryList.unshift(data.scheduleHistoryItem);
                                }
                                else {
                                    var tempDate = moment(data.scheduleHistoryItem.startDate, "YYYY/MM/DD").format("YYYY/MM/DD");
                                    newScheduleHistoryList.push(new ScheduleHistoryDto(tempDate, newEndDate));
                                }
                                return newScheduleHistoryList;
                            };
                            /**
                             * re-update the historical period
                            */
                            ViewModel.prototype.updateHistoricalPeriod = function (scheduleHistory, data) {
                                var vm = this, newScheduleHistory = scheduleHistory;
                                newScheduleHistory[0] = new ScheduleHistoryDto(data.newScheduleHistory.startDate, newScheduleHistory[0].endDate, newScheduleHistory[0].personalInfoApprove, newScheduleHistory[0].personalInfoConfirm);
                                if (newScheduleHistory.length > 1) {
                                    newScheduleHistory[1] = new ScheduleHistoryDto(newScheduleHistory[1].startDate, data.newScheduleHistory.newEndDate, newScheduleHistory[1].personalInfoApprove, newScheduleHistory[1].personalInfoConfirm);
                                }
                                return newScheduleHistory;
                            };
                            /***********************************************************************
                             * Screen B
                             * ********************************************************************/
                            ViewModel.prototype.displayInfoOnScreenB = function (value) {
                                if (value === void 0) { value = null; }
                                var vm = this, objFind = null, scheduleHistory = vm.workplaceScheduleHistoryList();
                                if (scheduleHistory.length > 0) {
                                    //reset to EDIT mode
                                    vm.resetSettingsScreenB(true, true, true, true, ScreenModel.EDIT);
                                    value = (value === null) ? scheduleHistory[0].code : value;
                                    objFind = _.find(scheduleHistory, function (x) { return x.code === value; });
                                    if (nts.uk.util.isNullOrUndefined(objFind)) {
                                        objFind = scheduleHistory[0];
                                    }
                                    vm.workplaceScheduleHistoryObjSelected(objFind); //keep old history period before change/update
                                    vm.modelB().workPlaceCompanyId = vm.selectedWkpId();
                                    vm.modelB().startDate(moment.utc(objFind.startDate, 'YYYY/MM/DD').toDate());
                                    vm.modelB().endDate(moment.utc(objFind.endDate, 'YYYY/MM/DD').toDate());
                                    //36承認者パネル
                                    vm.createEmployeesPanelList('B', 1, objFind.personalInfoApprove);
                                    //従業員代表パネル
                                    vm.createEmployeesPanelList('B', 2, objFind.personalInfoConfirm);
                                    if (scheduleHistory[0].code === value)
                                        $('#historyListB tr:first-child').focus();
                                    else
                                        $('#historyListB tr[data-id="' + objFind.code + '"]').focus();
                                }
                                else {
                                    vm.resetSettingsScreenB(false, true, false, true, ScreenModel.ADDNEW);
                                }
                            };
                            /**
                             * Active Panel B
                            */
                            ViewModel.prototype.initialScreenB = function (action) {
                                var vm = this;
                                if (vm.isReloadScreen()) {
                                    vm.$ajax('at', common.CMM024_API.getAgreementUnitSetting)
                                        .done(function (data) {
                                        if (data && data.useWorkplace !== 1) { //workPlaceUseAtr
                                            $("#sidebar").ntsSideBar("hide", 1);
                                            $('.sidebar-content .disappear').html('');
                                            vm.isShowPanelB(false);
                                        }
                                        else {
                                            vm.isShowPanelB(true);
                                            if (action === 'reload') {
                                                vm.screenBMode(ScreenModel.EDIT);
                                                vm.workplaceScheduleHistorySelected('reload');
                                                vm.workplaceScheduleHistoryObjSelected(null);
                                                vm.workplaceScheduleHistoryListing();
                                                vm.screenBModeAddNew(true);
                                            }
                                        }
                                    });
                                    vm.isReloadScreen(false);
                                }
                            };
                            /**
                             * Register data on Screen B
                             * */
                            ViewModel.prototype.RegisterB = function () {
                                var vm = this, currentScheduleItem = vm.modelB();
                                var tempList = currentScheduleItem.approverPanel().filter(function (item) {
                                    return (item.employeeCode !== '-1' && item.employeeCode !== null);
                                });
                                if (tempList.length <= 0) {
                                    vm.$dialog.error({ messageId: 'Msg_1790' });
                                    $('.employee-lists-b').focus();
                                    return;
                                }
                                switch (vm.screenBMode()) {
                                    case ScreenModel.EDIT:
                                        vm.updateScheduleHistoryByWorkplace();
                                        break;
                                    case ScreenModel.ADDNEW:
                                        vm.registerScheduleHistoryByWorkplace();
                                        break;
                                }
                                //reset screen to nomal model
                                vm.resetSettingsScreenB(true, true, true, true, ScreenModel.EDIT);
                            };
                            /**
                             * Display page C
                             * */
                            ViewModel.prototype.screenBShowDialogC = function () {
                                var vm = this, currentScheduleHistoryList = vm.workplaceScheduleHistoryList();
                                var params = (currentScheduleHistoryList.length > 0) ? currentScheduleHistoryList[0] : null;
                                vm.$window.storage("scheduleHistorySelected", params);
                                vm.$window.modal("/view/cmm/024/c/index.xhtml", { title: vm.$i18n('CMM024_92') }).then(function () {
                                    //開始年月日テキストボックス
                                    vm.$window.storage("newScheduleHistory").then(function (data) {
                                        if (!nts.uk.util.isNullOrUndefined(data.scheduleHistoryItem)) {
                                            currentScheduleHistoryList = vm.updateScheduleHistoryListing(vm.workplaceScheduleHistoryList(), data);
                                            //re-update the list
                                            vm.workplaceScheduleHistoryList(currentScheduleHistoryList);
                                            vm.workplaceScheduleHistorySelected(currentScheduleHistoryList[0].code);
                                            //update schedule history
                                            if (data.registrationHistoryType == HistoryRes.HISTORY_NEW) {
                                                vm.modelB(new Model(vm.$user.companyCode, data.scheduleHistoryItem.startDate, data.scheduleHistoryItem.endDate, vm.addEmptySetting(), vm.addEmptySetting()));
                                            }
                                            else { //clone
                                                vm.modelB().startDate(data.scheduleHistoryItem.startDate);
                                                vm.modelB().endDate(data.scheduleHistoryItem.endDate);
                                            }
                                            vm.resetSettingsScreenB(true, false, false, true, ScreenModel.ADDNEW);
                                            vm.isNoteSaveAfterClonedB(true);
                                        }
                                        else {
                                            if (currentScheduleHistoryList.length > 0)
                                                vm.resetSettingsScreenB(true, true, true, true, ScreenModel.EDIT);
                                            else
                                                vm.resetSettingsScreenB(false, true, false, false, ScreenModel.EDIT);
                                            $('#historyListB tr:first-child').focus();
                                        }
                                    });
                                });
                            };
                            ViewModel.prototype.resetSettingsScreenB = function (register, addnew, edit, enablePeriodlist, mode) {
                                var vm = this;
                                vm.enableRegisterB(register);
                                vm.screenBModeAddNew(addnew);
                                vm.screenBModeEdit(edit);
                                vm.enableScheduleHistoryB(enablePeriodlist);
                                vm.screenBMode(mode);
                                vm.allowSettingB(register);
                                //clear model
                                var historyPeriod = vm.workplaceScheduleHistoryList();
                                if (historyPeriod.length <= 0) {
                                    vm.modelB(new Model(null, null, null, [], []));
                                }
                            };
                            /**
                             *
                            */
                            ViewModel.prototype.workplaceScheduleHistoryListing = function () {
                                var vm = this, selectedHistory = null, tempScheduleList = [];
                                vm.screenBModeEdit(false);
                                vm.screenBMode(ScreenModel.EDIT);
                                vm.isNoteSaveAfterClonedB(false);
                                vm.$blockui('show');
                                //get Schedule of a workplace
                                var workPlaceId = vm.selectedWkpId();
                                if (nts.uk.util.isNullOrEmpty(workPlaceId))
                                    return;
                                vm.$ajax('at', common.CMM024_API.screenB_GetScheduleHistoryList + '/' + workPlaceId)
                                    .done(function (response) {
                                    if (!nts.uk.util.isNullOrUndefined(response)) {
                                        //A2-6 - Schedule history listing
                                        if (!nts.uk.util.isNullOrEmpty(response.scheduleHistory)) {
                                            response.scheduleHistory.map(function (history) {
                                                tempScheduleList.push(new ScheduleHistoryDto(history.startDate, history.endDate, history.personalInfoApprove, history.personalInfoConfirm));
                                            });
                                            //sort DECS
                                            tempScheduleList = _.orderBy(tempScheduleList, 'code', 'desc');
                                        }
                                        //create schedule history listing
                                        vm.workplaceScheduleHistoryList(tempScheduleList);
                                        if (vm.workplaceScheduleHistoryList().length > 0) {
                                            //get the first item of list
                                            if (ScreenModel.ADDNEW !== vm.screenBMode() && vm.workplaceScheduleHistoryObjSelected())
                                                selectedHistory = vm.workplaceScheduleHistoryObjSelected();
                                            else
                                                selectedHistory = vm.workplaceScheduleHistoryList()[0];
                                            vm.workplaceScheduleHistorySelected(selectedHistory.code);
                                            vm.workplaceScheduleHistoryObjSelected(selectedHistory);
                                            vm.workplaceScheduleHistorySelected.valueHasMutated();
                                            vm.resetSettingsScreenB(true, true, true, true, ScreenModel.EDIT);
                                        }
                                        else {
                                            vm.workplaceScheduleHistorySelected(null);
                                            vm.workplaceScheduleHistoryObjSelected(null);
                                            vm.modelB().approverPanel([]);
                                            vm.modelB().employeesRepresentative([]);
                                            vm.resetSettingsScreenB(true, true, false, true, ScreenModel.ADDNEW);
                                        }
                                    }
                                    vm.$blockui('hide');
                                })
                                    .fail(function () { return vm.$blockui('hide'); })
                                    .always(function () {
                                    vm.$blockui('hide');
                                });
                            };
                            /**
                             *
                             */
                            ViewModel.prototype.updateScheduleHistoryByWorkplace = function () {
                                var vm = this, currentScheduleItem = vm.modelB();
                                vm.$blockui('show');
                                var params = {
                                    workPlaceId: vm.selectedWkpId(),
                                    startDate: moment.utc(currentScheduleItem.startDate(), 'YYYY-MM-DD'),
                                    endDate: moment.utc(currentScheduleItem.endDate(), 'YYYY-MM-DD'),
                                    approvedList: [],
                                    confirmedList: [],
                                    startDateBeforeChange: moment.utc(currentScheduleItem.startDate(), 'YYYY-MM-DD') //期間
                                };
                                currentScheduleItem.approverPanel().map(function (item) {
                                    if (item.employeeCode != '-1' && item.employeeCode != null)
                                        params.approvedList.push(item.employeeId);
                                });
                                currentScheduleItem.employeesRepresentative().map(function (item) {
                                    if (item.employeeCode != '-1' && item.employeeCode != null)
                                        params.confirmedList.push(item.employeeId);
                                });
                                vm.$ajax('at', common.CMM024_API.screenB_UpdateScheduleHistory, params)
                                    .done(function (response) {
                                    vm.$dialog.info({ messageId: 'Msg_15' }).then(function () {
                                        vm.workplaceScheduleHistoryListing();
                                        vm.$blockui('hide');
                                    });
                                }).fail(function (error) {
                                    vm.$dialog.info({ messageId: error.messageId });
                                }).always(function () {
                                    vm.$blockui('hide');
                                });
                            };
                            ViewModel.prototype.registerScheduleHistoryByWorkplace = function () {
                                var vm = this, currentScheduleItem = vm.modelB();
                                vm.$blockui('show');
                                var params = {
                                    workPlaceId: vm.selectedWkpId(),
                                    startDate: moment.utc(currentScheduleItem.startDate(), 'YYYY-MM-DD'),
                                    endDate: moment.utc(currentScheduleItem.endDate(), 'YYYY-MM-DD'),
                                    approvedList: [],
                                    confirmedList: [] // 従業員代表指定リンクラベル
                                };
                                currentScheduleItem.approverPanel().map(function (item) {
                                    if (item.employeeCode != '-1' && item.employeeCode != null)
                                        params.approvedList.push(item.employeeId);
                                });
                                currentScheduleItem.employeesRepresentative().map(function (item) {
                                    if (item.employeeCode != '-1' && item.employeeCode != null)
                                        params.confirmedList.push(item.employeeId);
                                });
                                vm.$ajax('at', common.CMM024_API.screenB_RegisterScheduleHistory, params)
                                    .done(function (response) {
                                    vm.$dialog.info({ messageId: 'Msg_15' }).then(function () {
                                        vm.workplaceScheduleHistoryListing();
                                        vm.$blockui('hide');
                                    });
                                }).fail(function (error) {
                                    vm.$dialog.info({ messageId: error.messageId }).then(function () { return vm.$blockui('hide'); });
                                }).always(function () {
                                    vm.$blockui('hide');
                                });
                            };
                            /**
                             * */
                            ViewModel.prototype.addEmptySetting = function () {
                                var vm = this, employeesList = [];
                                var newEmployee = new EmployeeDto('-1', vm.$i18n('CMM024_80'));
                                employeesList.push(newEmployee);
                                return employeesList;
                            };
                            ViewModel.prototype.initialScreenA = function () {
                                var vm = this;
                                if (!vm.isReloadScreen()) {
                                    vm.screenAMode(ScreenModel.EDIT);
                                    vm.companyScheduleHistorySelected('reload');
                                    vm.companyScheduleHistoryObjSelected(null);
                                    vm.companyScheduleHistoryListing();
                                    vm.isReloadScreen(true);
                                    vm.screenAModeAddNew(true);
                                }
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                    })(a = cmm024.a || (cmm024.a = {}));
                })(cmm024 = view.cmm024 || (view.cmm024 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm024.a.vm.js.map