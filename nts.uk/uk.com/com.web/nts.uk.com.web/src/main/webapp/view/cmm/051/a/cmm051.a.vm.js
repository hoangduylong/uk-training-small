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
////// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm051;
                (function (cmm051) {
                    var a;
                    (function (a) {
                        var modal = nts.uk.ui.windows.sub.modal;
                        var setShared = nts.uk.ui.windows.setShared;
                        var getShared = nts.uk.ui.windows.getShared;
                        var block = nts.uk.ui.block;
                        var isNullOrEmpty = nts.uk.util.isNullOrEmpty;
                        var isNullOrUndefined = nts.uk.util.isNullOrUndefined;
                        var API = {
                            deleteWkpManager: "at/auth/cmm051/workplace/manager/delete",
                            deleteWkpHist: "at/auth/cmm051/workplace/manager/delete-history",
                            addWkpManager: "at/auth/cmm051/workplace/manager/add",
                            addHistWkpManager: "at/auth/cmm051/workplace/manager/register",
                            getDataInit: "com/screen/cmm051/get-data-init",
                            getListEmpByWpid: "com/screen/cmm051/get-employee-list-by-wplid",
                            getListEmpInf: "com/screen/cmm051/get-data-init/employee-mode",
                            getListHist: "com/screen/cmm051/get-wpl-manager"
                        };
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel(params) {
                                var _this = _super.call(this) || this;
                                _this.langId = ko.observable('ja');
                                _this.ntsHeaderColumns = ko.observableArray([]);
                                _this.historyId = ko.observable(null);
                                // Screen mode
                                _this.isNewMode = ko.observable(false);
                                _this.isNewModeHist = ko.observable(true);
                                _this.isUpdateModeHist = ko.observable(true);
                                _this.isDeleteModeHist = ko.observable(true);
                                _this.isClicked = ko.observable(false);
                                _this.isDelete = ko.observable(true);
                                //Date Range Picker
                                _this.dateValue = ko.observable("");
                                _this.employInfors = ko.observableArray([]);
                                _this.listEmployee = ko.observableArray([]);
                                _this.dateHistoryList = ko.observableArray([]);
                                _this.dateHistoryListFull = ko.observableArray([]);
                                _this.workPlaceIdList = ko.observableArray([]);
                                _this.workPlaceList = ko.observableArray([]);
                                _this.mode = ko.observable(1);
                                //A8
                                _this.workplaceCode = ko.observable("");
                                _this.workplaceName = ko.observable("");
                                //A3
                                _this.employeeCode = ko.observable(null);
                                _this.employeeName = ko.observable("");
                                _this.selectedEmCode = ko.observable(null);
                                _this.idAddOrUpdate = ko.observable(null);
                                _this.startDate = ko.observable(null);
                                _this.endDate = ko.observable(null);
                                _this.workPlaceId = ko.observable(null);
                                _this.employeeId = ko.observable(null);
                                var vm = _this;
                                vm.selectedWkpId = ko.observable('');
                                vm.count = 1;
                                vm.setDataDefaultMode();
                                vm.ntsHeaderColumns = ko.observableArray([
                                    { headerText: '', key: 'code', hidden: true },
                                    { headerText: '', key: 'display', formatter: _.escape }
                                ]);
                                vm.columns = ko.observableArray([
                                    { headerText: '', key: 'id', hidden: true },
                                    { headerText: nts.uk.resource.getText("CMM051_44"), key: 'code', width: 110 },
                                    { headerText: nts.uk.resource.getText("CMM051_45"), key: 'name', width: 170 }
                                ]);
                                return _this;
                            }
                            ViewModel.prototype.setDataDefaultMode = function () {
                                var vm = this;
                                var workplaceManagerList = [];
                                var listEmployee = [];
                                var personList = [];
                                vm.KCP005_load();
                                block.invisible();
                                vm.$ajax('com', API.getDataInit).done(function (data) {
                                    if (!isNullOrUndefined(data)) {
                                        if (!isNullOrUndefined(data.workplaceInfoImport)) {
                                            vm.workPlaceId(data.workplaceInfoImport.workplaceId);
                                            vm.workplaceCode(data.workplaceInfoImport.workplaceCode);
                                            vm.workplaceName(data.workplaceInfoImport.workplaceName);
                                        }
                                        workplaceManagerList = data.employeeInformation.workplaceManagerList;
                                        listEmployee = data.employeeInformation.listEmployee;
                                        personList = data.employeeInformation.personList;
                                        vm.setData(workplaceManagerList, listEmployee, personList, vm.employeeId(), vm.workPlaceId(), vm.historyId());
                                    }
                                    else {
                                        vm.setModeNoData();
                                    }
                                }).always(function () {
                                    block.clear();
                                }).fail(function (error) {
                                    nts.uk.ui.block.clear();
                                    nts.uk.ui.dialog.alertError({ messageId: error.messageId }).then(function () {
                                        vm.backToTopPage();
                                    });
                                });
                            };
                            ViewModel.prototype.initScreen = function (mode, sid, wplId, histId) {
                                var vm = this;
                                if (!isNullOrUndefined(sid) && !isNullOrUndefined(wplId)) {
                                    var param = {
                                        workplaceId: wplId,
                                        sid: sid
                                    };
                                    block.invisible();
                                    vm.$ajax("com", API.getListHist, param).done(function (data) {
                                        if (!isNullOrEmpty(data)) {
                                            vm.dateHistoryListFull(data);
                                            vm.setDataHist(vm.employeeId(), vm.dateHistoryListFull(), histId, wplId);
                                        }
                                        else {
                                            vm.isNewModeHist(true);
                                            vm.startDate(null);
                                            vm.endDate(null);
                                            vm.historyId(null);
                                            vm.dateHistoryList([]);
                                        }
                                        // if(isNullOrEmpty(vm.dateHistoryList())){
                                        //
                                        // }
                                    }).always(function () {
                                        block.clear();
                                    }).fail(function (error) {
                                        nts.uk.ui.block.clear();
                                        nts.uk.ui.dialog.alertError({ messageId: error.messageId }).then(function () {
                                            vm.backToTopPage();
                                        });
                                    });
                                }
                                else {
                                    vm.dateHistoryList([]);
                                }
                            };
                            ViewModel.prototype.backToTopPage = function () {
                                nts.uk.request.jump("/view/ccg/008/a/index.xhtml");
                            };
                            ViewModel.prototype.setData = function (workplaceManagerList, listEmployee, personList, sid, wplId, histId) {
                                var vm = this;
                                var mode = vm.mode();
                                vm.dateHistoryListFull(workplaceManagerList);
                                if (mode == Mode.WPL) {
                                    var emps = [];
                                    if (!isNullOrEmpty(personList) && !isNullOrEmpty(listEmployee)) {
                                        var _loop_1 = function (i) {
                                            var em = listEmployee[i];
                                            var info_1 = _.find(personList, function (e) { return e.pid == em.personId; });
                                            if (!isNullOrUndefined(info_1)) {
                                                emps.push({
                                                    id: em.employeeId,
                                                    code: em.employeeCode,
                                                    name: info_1.businessName,
                                                });
                                            }
                                        };
                                        for (var i = 0; i < listEmployee.length; i++) {
                                            _loop_1(i);
                                        }
                                    }
                                    if (isNullOrEmpty(emps)) {
                                        vm.employeeCode(null);
                                        vm.employeeName(null);
                                        vm.setModeNoData();
                                    }
                                    else {
                                        vm.isNewMode(false);
                                    }
                                    emps = _.orderBy(emps, ['code'], ['asc']);
                                    vm.employInfors(emps);
                                    var info = _.find(vm.employInfors(), function (e) { return e.id == sid; });
                                    if (isNullOrUndefined(info)) {
                                        if (!isNullOrEmpty(emps)) {
                                            vm.selectedEmCode(emps[0].code);
                                            vm.selectedEmCode.valueHasMutated();
                                        }
                                    }
                                    else {
                                        vm.selectedEmCode(info.code);
                                        vm.selectedEmCode.valueHasMutated();
                                    }
                                }
                                if (mode == Mode.EMPLOYMENT) {
                                    var info = _.find(vm.workPlaceList(), function (e) { return e.id == wplId; });
                                    if (!isNullOrUndefined(info)) {
                                        vm.workPlaceId(info.id);
                                    }
                                    else {
                                        if (!isNullOrEmpty(vm.workPlaceList())) {
                                            if (!vm.isNewMode()) {
                                                vm.workPlaceId(vm.workPlaceList()[0].id);
                                                vm.workPlaceId.valueHasMutated();
                                            }
                                        }
                                    }
                                }
                            };
                            ViewModel.prototype.setModeNoData = function () {
                                var vm = this;
                                vm.isDelete(false);
                                vm.isNewMode(true);
                                vm.isNewModeHist(true);
                                vm.isUpdateModeHist(false);
                                vm.isDeleteModeHist(false);
                                $('#swa_22').first().focus();
                            };
                            ViewModel.prototype.setDataHist = function (sid, workplaceManagerList, histId, wplId) {
                                var vm = this;
                                var listDatePeriod = [];
                                var listHist = [];
                                if (!isNullOrEmpty(workplaceManagerList)) {
                                    listHist = _.filter(workplaceManagerList, function (e) { return e.workplaceId == wplId && e.employeeId == sid; });
                                    for (var i = 0; i < listHist.length; i++) {
                                        var wpl = listHist[i];
                                        var id = wpl.workplaceManagerId;
                                        var display = wpl.startDate + nts.uk.resource.getText("CMM051_62") + wpl.endDate;
                                        listDatePeriod.push({
                                            id: id,
                                            sid: wpl.employeeId,
                                            display: display,
                                            startDate: wpl.startDate,
                                            endDate: wpl.endDate
                                        });
                                    }
                                }
                                listDatePeriod = _.orderBy(listDatePeriod, ['startDate'], ['desc']);
                                vm.dateHistoryList(listDatePeriod);
                                if (!isNullOrEmpty(listDatePeriod)) {
                                    var hist = _.find(vm.dateHistoryList(), function (e) { return e.id == histId; });
                                    if (isNullOrUndefined(hist)) {
                                        vm.historyId(listDatePeriod[0].id);
                                        vm.startDate(listDatePeriod[0].startDate);
                                        vm.endDate(listDatePeriod[0].endDate);
                                    }
                                    else {
                                        vm.historyId(hist.id);
                                        vm.startDate(hist.startDate);
                                        vm.endDate(hist.endDate);
                                    }
                                    vm.isNewModeHist(true);
                                    vm.isUpdateModeHist(true);
                                    vm.isDeleteModeHist(true);
                                }
                                else {
                                    vm.startDate(null);
                                    vm.endDate(null);
                                    vm.historyId(null);
                                    vm.dateHistoryList([]);
                                }
                            };
                            ViewModel.prototype.KCP005_load = function () {
                                var vm = this;
                                vm.baseDate = ko.observable(new Date());
                                vm.isShowAlreadySet = ko.observable(false);
                                vm.alreadySettingPersonal = ko.observableArray([]);
                                vm.isDialog = ko.observable(false);
                                vm.isShowNoSelectRow = ko.observable(false);
                                vm.isMultiSelect = ko.observable(false);
                                vm.isShowWorkPlaceName = ko.observable(false);
                                vm.isShowSelectAllButton = ko.observable(false);
                                vm.disableSelection = ko.observable(false);
                                vm.listComponentOption = {
                                    isShowAlreadySet: false,
                                    isMultiSelect: false,
                                    listType: ListType.EMPLOYEE,
                                    employeeInputList: vm.employInfors,
                                    selectType: SelectType.SELECT_ALL,
                                    selectedCode: vm.selectedEmCode,
                                    isDialog: false,
                                    alreadySettingList: vm.alreadySettingPersonal,
                                    isShowSelectAllButton: false,
                                    showOptionalColumn: false,
                                    maxWidth: 420,
                                    maxRows: 13,
                                };
                                $('#kcp005').ntsListComponent(vm.listComponentOption);
                            };
                            // Start page
                            ViewModel.prototype.created = function () {
                            };
                            ViewModel.prototype.mounted = function () {
                                var vm = this;
                                $('#swa_22').first().focus();
                                vm.mode.subscribe(function (mode) {
                                    console.log("MODE :" + mode);
                                    if (mode == Mode.WPL) {
                                        vm.employeeId(null);
                                        vm.employeeCode(null);
                                        vm.employeeName(null);
                                        vm.workplaceCode(null);
                                        vm.workplaceName(null);
                                        vm.selectedEmCode(null);
                                        vm.historyId(null);
                                        vm.dateHistoryList([]);
                                        vm.setDataDefaultMode();
                                    }
                                    else if (mode == Mode.EMPLOYMENT) {
                                        vm.employeeId(null);
                                        vm.selectedEmCode(null);
                                        vm.employeeCode(null);
                                        vm.employeeName(null);
                                        vm.workplaceCode(null);
                                        vm.workplaceName(null);
                                        vm.historyId(null);
                                        vm.dateHistoryList([]);
                                        var sidLogin = vm.$user.employeeId;
                                        var sid = [];
                                        sid.push(sidLogin);
                                        vm.getEmployeeInfo(sid, null);
                                    }
                                });
                                vm.selectedEmCode.subscribe(function (e) {
                                    if (!isNullOrUndefined(e)) {
                                        var eminfo = _.find(vm.employInfors(), function (i) { return i.code == e; });
                                        if (!isNullOrUndefined(eminfo)) {
                                            vm.employeeName(eminfo.name);
                                            vm.employeeCode(e);
                                            vm.employeeId(eminfo.id);
                                        }
                                        else {
                                            vm.employeeCode(null);
                                            vm.employeeName(null);
                                        }
                                    }
                                });
                                vm.employeeId.subscribe(function (e) {
                                    if (!isNullOrUndefined(e)) {
                                        var eminfo = _.find(vm.employInfors(), function (i) { return i.id == e; });
                                        if (!isNullOrUndefined(eminfo)) {
                                            vm.selectedEmCode(eminfo.code);
                                            vm.isDelete(true);
                                            vm.isNewMode(false);
                                        }
                                        else {
                                            vm.employeeCode(null);
                                            vm.employeeName(null);
                                        }
                                        vm.initScreen(vm.mode(), vm.employeeId(), vm.workPlaceId(), vm.historyId());
                                    }
                                });
                                vm.workPlaceId.subscribe(function (e) {
                                    vm.selectedEmCode(null);
                                    if (!isNullOrUndefined(e)) {
                                        var info = _.find(vm.workPlaceList(), function (i) { return i.id == e; });
                                        if (!isNullOrEmpty(info)) {
                                            vm.workplaceName(info.name);
                                            vm.workplaceCode(info.code);
                                            vm.isDelete(true);
                                            vm.isNewMode(false);
                                        }
                                        else {
                                            vm.workplaceName(null);
                                            vm.workplaceCode(null);
                                        }
                                        vm.initScreen(vm.mode(), vm.employeeId(), e, vm.historyId());
                                    }
                                });
                                vm.historyId.subscribe(function (id) {
                                    if (!isNullOrUndefined(id)) {
                                        var idAddOrUpdate = vm.idAddOrUpdate();
                                        var hist = _.find(vm.dateHistoryList(), function (e) { return e.id == id; });
                                        if (!isNullOrUndefined(hist)) {
                                            vm.startDate(hist.startDate);
                                            vm.endDate(hist.endDate);
                                        }
                                        if (!isNullOrUndefined(idAddOrUpdate)) {
                                            if (id == idAddOrUpdate) {
                                                vm.isNewModeHist(false);
                                                vm.isDeleteModeHist(false);
                                                vm.isUpdateModeHist(true);
                                            }
                                            else {
                                                vm.isNewModeHist(false);
                                                vm.isDeleteModeHist(false);
                                                vm.isUpdateModeHist(false);
                                            }
                                            if (id != idAddOrUpdate && !vm.isNewMode()) {
                                                vm.isNewModeHist(false);
                                                vm.isDeleteModeHist(false);
                                                vm.isUpdateModeHist(false);
                                            }
                                        }
                                        else {
                                            vm.isNewModeHist(true);
                                            vm.isDeleteModeHist(true);
                                            vm.isUpdateModeHist(true);
                                        }
                                    }
                                });
                            };
                            ViewModel.prototype.initManager = function () {
                                var vm = this;
                                nts.uk.ui.errors.clearAll();
                                if (vm.isNewMode() == true) {
                                    if (vm.mode() == Mode.WPL) {
                                        vm.selectedEmCode(null);
                                        vm.employeeId(null);
                                        vm.employeeCode(null);
                                        vm.employeeName(null);
                                        vm.openDialogCDL009();
                                    }
                                    if (vm.mode() == Mode.EMPLOYMENT) {
                                        vm.workPlaceId(null);
                                        vm.workplaceCode(null);
                                        vm.workplaceName(null);
                                        vm.openCDL008Dialog();
                                    }
                                    vm.dateHistoryList([]);
                                    vm.historyId(null);
                                    vm.startDate(null);
                                    vm.endDate(null);
                                }
                            };
                            /**
                             * Button on screen
                             */
                            // 新規 button
                            ViewModel.prototype.createWkpManager = function () {
                                var vm = this;
                                nts.uk.ui.errors.clearAll();
                                vm.isNewMode(true);
                                vm.isUpdateModeHist(false);
                                vm.isDeleteModeHist(false);
                                vm.isNewModeHist(true);
                                vm.isDelete(false);
                                vm.initManager();
                            };
                            // 登録 button
                            ViewModel.prototype.saveWkpManager = function () {
                                var vm = this;
                                var mode = vm.mode();
                                // validate
                                if (vm.validate()) {
                                    return;
                                }
                                ;
                                var workplaceId = vm.workPlaceId();
                                var sid = vm.employeeId();
                                var startDate = nts.uk.time.parseMoment(vm.startDate()).format();
                                var endDate = nts.uk.time.parseMoment(vm.endDate()).format();
                                var command = {
                                    "workPlaceId": workplaceId,
                                    "sid": sid,
                                    "startDate": startDate,
                                    "endDate": endDate
                                };
                                block.invisible();
                                if (vm.isNewMode()) {
                                    vm.$ajax("com", API.addWkpManager, command).done(function () {
                                        vm.$dialog.info({ messageId: "Msg_15" }).then(function () {
                                            vm.initScreen(mode, sid, workplaceId, null);
                                            if (mode == Mode.WPL) {
                                                vm.getListWpl(workplaceId);
                                            }
                                            else {
                                                var sids = [];
                                                sids.push(vm.employeeId());
                                                vm.getEmployeeInfo(sids, workplaceId);
                                            }
                                            vm.isNewMode(false);
                                            vm.idAddOrUpdate(null);
                                            vm.isDelete(true);
                                        });
                                    }).always(function () {
                                        block.clear();
                                    }).fail(function (res) {
                                        nts.uk.ui.block.clear();
                                        vm.showMessageError(res);
                                    });
                                }
                                else {
                                    var commandHist = {
                                        "wkpManagerId": vm.historyId(),
                                        "startDate": startDate,
                                        "endDate": endDate
                                    };
                                    vm.$ajax("com", API.addHistWkpManager, commandHist).done(function () {
                                        vm.$dialog.info({ messageId: "Msg_15" }).then(function () {
                                            vm.initScreen(mode, sid, workplaceId, vm.historyId());
                                            vm.isNewMode(false);
                                            vm.isDelete(true);
                                            vm.idAddOrUpdate(null);
                                        });
                                    }).always(function () {
                                        block.clear();
                                    }).fail(function (res) {
                                        nts.uk.ui.block.clear();
                                        vm.showMessageError(res);
                                    });
                                }
                            };
                            /**
                             * validate
                             */
                            ViewModel.prototype.validate = function () {
                                var vm = this;
                                var hasError = false;
                                // clear error
                                vm.clearError();
                                if (vm.mode() == Mode.WPL) {
                                    if (isNullOrUndefined(vm.workplaceCode())) {
                                        nts.uk.ui.dialog.alertError({ messageId: 'Msg_218', messageParams: [nts.uk.resource.getText("CMM051_46")] });
                                        $('#a8_2').focus();
                                        hasError = true;
                                        return hasError;
                                    }
                                    if (isNullOrUndefined(vm.employeeCode())) {
                                        nts.uk.ui.dialog.alertError({ messageId: 'Msg_218', messageParams: [nts.uk.resource.getText("CMM051_41")] });
                                        $('#a10_2').focus();
                                        hasError = true;
                                        return hasError;
                                    }
                                }
                                else {
                                    if (isNullOrUndefined(vm.employeeCode())) {
                                        nts.uk.ui.dialog.alertError({ messageId: 'Msg_218', messageParams: [nts.uk.resource.getText("CMM051_41")] });
                                        $('#a3_2').focus();
                                        hasError = true;
                                        return hasError;
                                    }
                                    if (isNullOrUndefined(vm.workplaceCode())) {
                                        nts.uk.ui.dialog.alertError({ messageId: 'Msg_218', messageParams: [nts.uk.resource.getText("CMM051_46")] });
                                        $('#a6_2').focus();
                                        hasError = true;
                                        return hasError;
                                    }
                                }
                                if (isNullOrUndefined(vm.startDate()) || isNullOrUndefined(vm.endDate())) {
                                    nts.uk.ui.dialog.alertError({ messageId: 'Msg_2201', messageParams: [] });
                                    $('#new_date').focus();
                                    hasError = true;
                                    return hasError;
                                }
                                return hasError;
                            };
                            /**
                             * clearError
                             */
                            ViewModel.prototype.clearError = function () {
                                nts.uk.ui.errors.clearAll();
                            };
                            // 削除 button
                            ViewModel.prototype.remove = function () {
                                var vm = this;
                                var mode = vm.mode();
                                // show message confirm
                                nts.uk.ui.dialog.confirm({ messageId: 'Msg_18' }).ifYes(function () {
                                    var workplaceId = vm.workPlaceId();
                                    var command = {
                                        "workplaceId": workplaceId,
                                        "sid": vm.employeeId()
                                    };
                                    block.invisible();
                                    vm.$ajax("com", API.deleteWkpManager, command).done(function () {
                                        vm.$dialog.info({ messageId: "Msg_16" }).then(function () {
                                            if (mode == Mode.WPL) {
                                                var indexRemove = _.findIndex(vm.employInfors(), function (e) { return e.id == vm.employeeId(); });
                                                var emifId = null;
                                                if (indexRemove == (vm.employInfors().length - 1)) {
                                                    emifId = indexRemove >= 1 ? vm.employInfors()[indexRemove - 1].id : null;
                                                    $('#swa_22').first().focus();
                                                }
                                                else {
                                                    emifId = vm.employInfors()[indexRemove + 1].id;
                                                }
                                                vm.employeeId(emifId);
                                                vm.getListWpl(workplaceId);
                                            }
                                            else {
                                                var indexRemoveWP = _.findIndex(vm.workPlaceList(), function (e) { return e.id == vm.workPlaceId(); });
                                                var wpId = null;
                                                if (indexRemoveWP == (vm.workPlaceList().length - 1)) {
                                                    wpId = indexRemoveWP >= 1 ? vm.workPlaceList()[indexRemoveWP - 1].id : null;
                                                    $('#swa_22').first().focus();
                                                }
                                                else {
                                                    wpId = vm.workPlaceList()[indexRemoveWP + 1].id;
                                                }
                                                vm.workPlaceId(wpId);
                                                var sids = [];
                                                sids.push(vm.employeeId());
                                                vm.getEmployeeInfo(sids, wpId);
                                            }
                                            vm.initScreen(mode, vm.employeeId(), vm.workPlaceId(), vm.historyId());
                                        });
                                    }).always(function () {
                                        block.clear();
                                    }).fail(function (res) {
                                        nts.uk.ui.block.clear();
                                        vm.showMessageError(res);
                                    });
                                });
                            };
                            ViewModel.prototype.openDialogA3282 = function () {
                                var vm = this;
                                var mode = vm.mode();
                                if (mode == 1) {
                                    vm.openCDL008Dialog();
                                }
                                else if (mode == 0) {
                                    vm.openDialogCDL009();
                                }
                            };
                            ViewModel.prototype.openDialogA62102 = function () {
                                var vm = this;
                                var mode = vm.mode();
                                if (mode == 1) {
                                    vm.openDialogCDL009();
                                }
                                else if (mode == 0) {
                                    vm.openCDL008Dialog();
                                }
                            };
                            // 社員選択 button
                            ViewModel.prototype.openDialogCDL009 = function () {
                                var vm = this;
                                setShared('CDL009Params', {
                                    isMultiSelect: false,
                                    baseDate: moment(new Date()).toDate(),
                                    selectedEmCode: vm.employeeCode(),
                                    target: 1
                                }, true);
                                modal("/view/cdl/009/a/index.xhtml").onClosed(function () {
                                    var isCancel = getShared('CDL009Cancel');
                                    if (isCancel) {
                                        return;
                                    }
                                    var employeeId = getShared('CDL009Output');
                                    vm.employeeId(employeeId);
                                    var sids = [];
                                    if (!isNullOrUndefined(employeeId)) {
                                        sids.push(employeeId);
                                        vm.getEmployeeInfo(sids, null);
                                    }
                                });
                            };
                            ViewModel.prototype.getEmployeeInfo = function (empId, wplId) {
                                var vm = this;
                                if (!isNullOrEmpty(empId)) {
                                    var param = {
                                        "employIds": empId
                                    };
                                    block.invisible();
                                    vm.$ajax("com", API.getListEmpInf, param).done(function (data) {
                                        if (!isNullOrUndefined(data)) {
                                            var wpl = data.workplaceInfors;
                                            var eminfos = data.listEmployee;
                                            var personList = data.personList;
                                            if (vm.mode() == Mode.WPL) {
                                                if (!isNullOrEmpty(eminfos) && !isNullOrEmpty(personList)) {
                                                    var eminfo_1 = eminfos[0];
                                                    var info = _.find(personList, function (e) { return e.pid == eminfo_1.personId; });
                                                    vm.employeeId(eminfo_1.employeeId);
                                                    vm.employeeCode(eminfo_1.employeeCode);
                                                    vm.employeeName(info.businessName);
                                                }
                                            }
                                            if (vm.mode() == Mode.EMPLOYMENT) {
                                                if (!isNullOrEmpty(empId)) {
                                                    var eInfor_1 = _.find(eminfos, function (e) { return e.employeeId == empId[0]; });
                                                    if (!isNullOrUndefined(eInfor_1)) {
                                                        var per = _.find(personList, function (e) { return e.pid == eInfor_1.personId; });
                                                        vm.employeeId(eInfor_1.employeeId);
                                                        vm.employeeCode(eInfor_1.employeeCode);
                                                        vm.employeeName(per.businessName);
                                                    }
                                                    var wplIf = [];
                                                    if (!isNullOrEmpty(wpl)) {
                                                        for (var i = 0; i < wpl.length; i++) {
                                                            var item = wpl[i];
                                                            wplIf.push({
                                                                id: item.workplaceId,
                                                                code: item.workplaceCode,
                                                                name: item.workplaceName
                                                            });
                                                        }
                                                    }
                                                    else {
                                                        vm.workplaceName(null);
                                                        vm.workplaceCode(null);
                                                        vm.workPlaceId(null);
                                                        vm.dateHistoryList([]);
                                                        vm.workPlaceList([]);
                                                    }
                                                    wplIf = _.orderBy(wplIf, ['code'], ['asc']);
                                                    vm.workPlaceList(wplIf);
                                                    if (!isNullOrEmpty(vm.workPlaceList())) {
                                                        var wp = _.find(vm.workPlaceList(), function (i) { return i.id == wplId; });
                                                        if (isNullOrUndefined(wp)) {
                                                            vm.workPlaceId(vm.workPlaceList()[0].id);
                                                            vm.workPlaceId.valueHasMutated();
                                                        }
                                                        else {
                                                            vm.workPlaceId(wplId);
                                                        }
                                                        vm.isDelete(true);
                                                        vm.isNewMode(false);
                                                    }
                                                    else {
                                                        vm.setModeNoData();
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            vm.dateHistoryList([]);
                                            vm.workPlaceList([]);
                                        }
                                    }).always(function () {
                                        block.clear();
                                    }).fail(function (res) {
                                        nts.uk.ui.block.clear();
                                        vm.showMessageError(res);
                                    });
                                }
                            };
                            /**
                             * Common
                             */
                            /**
                             * showMessageError
                             */
                            ViewModel.prototype.showMessageError = function (res) {
                                if (res.businessException) {
                                    nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds });
                                }
                            };
                            /**
                             * Screen D - openAddHistoryDialog
                             */
                            ViewModel.prototype.openAddHistoryDialog = function () {
                                var vm = this;
                                var dataToScreenB = {
                                    isCreate: true,
                                    isUpdate: false,
                                };
                                nts.uk.ui.windows.setShared("dataToScreenB", dataToScreenB);
                                nts.uk.ui.windows.sub.modal('/view/cmm/051/b/index.xhtml').onClosed(function () {
                                    var prams = getShared('dataToScreenA');
                                    if (!isNullOrUndefined(prams)) {
                                        vm.isNewMode(true);
                                        vm.isNewModeHist(false);
                                        vm.isUpdateModeHist(true);
                                        vm.isDeleteModeHist(false);
                                        var display = prams.startDate + nts.uk.resource.getText("CMM051_62") + prams.endDate;
                                        vm.startDate(prams.startDate);
                                        vm.endDate(prams.endDate);
                                        var idNew = "idNew";
                                        vm.idAddOrUpdate(idNew);
                                        var hist = {
                                            id: idNew,
                                            sid: "",
                                            display: display,
                                            startDate: prams.startDate,
                                            endDate: prams.endDate
                                        };
                                        var hists = vm.dateHistoryList();
                                        hists.push(hist);
                                        hists = _.orderBy(hists, ['startDate'], ['desc']);
                                        vm.dateHistoryList(hists);
                                        vm.historyId(idNew);
                                    }
                                });
                            };
                            /**
                             * Screen E - openUpdateHistoryDialog
                             */
                            ViewModel.prototype.openUpdateHistoryDialog = function () {
                                var vm = this;
                                var id = vm.historyId();
                                var info = _.find(vm.dateHistoryList(), function (e) { return e.id == id; });
                                var startDate = "";
                                var endDate = "";
                                if (!isNullOrUndefined(info)) {
                                    startDate = info.startDate;
                                    endDate = info.endDate;
                                }
                                var dataToScreenC = {
                                    isCreate: false,
                                    isUpdate: true,
                                    startDate: startDate,
                                    endDate: endDate
                                };
                                nts.uk.ui.windows.setShared("dataToScreenC", dataToScreenC);
                                nts.uk.ui.windows.sub.modal('/view/cmm/051/c/index.xhtml').onClosed(function () {
                                    var prams = getShared('dataToScreenA');
                                    if (!isNullOrUndefined(prams)) {
                                        vm.isClicked(false);
                                        var id_1 = vm.historyId();
                                        if (id_1 == "idNew") {
                                            vm.isNewMode(true);
                                        }
                                        else {
                                            vm.isNewMode(false);
                                        }
                                        if (!isNullOrUndefined(prams)) {
                                            var hists = vm.dateHistoryList();
                                            var index = _.findIndex(hists, function (e) { return e.id == id_1; });
                                            if (index >= 0) {
                                                var display = prams.startDate + nts.uk.resource.getText("CMM051_62") + prams.endDate;
                                                vm.startDate(prams.startDate);
                                                vm.endDate(prams.endDate);
                                                var hist = {
                                                    id: id_1,
                                                    sid: hists[index].sid,
                                                    display: display,
                                                    startDate: prams.startDate,
                                                    endDate: prams.endDate
                                                };
                                                hists[index] = hist;
                                                hists = _.orderBy(hists, ['startDate'], ['desc']);
                                                vm.dateHistoryList(hists);
                                                vm.isNewModeHist(false);
                                                if (!vm.isNewMode()) {
                                                    vm.isDeleteModeHist(true);
                                                }
                                                if (id_1 == vm.idAddOrUpdate()) {
                                                    vm.isDeleteModeHist(false);
                                                }
                                                vm.idAddOrUpdate(id_1);
                                            }
                                        }
                                    }
                                });
                            };
                            ViewModel.prototype.removeHistory = function () {
                                var vm = this;
                                if (vm.dateHistoryList().length == 1) {
                                    nts.uk.ui.dialog.alertError({ messageId: 'Msg_57', messageParams: [] });
                                }
                                else {
                                    nts.uk.ui.dialog.confirm({ messageId: "Msg_18" })
                                        .ifYes(function () {
                                        var id = vm.historyId();
                                        if (!isNullOrUndefined(id)) {
                                            block.invisible();
                                            var command = {
                                                "wkpManagerId": id
                                            };
                                            vm.$ajax("com", API.deleteWkpHist, command).done(function () {
                                                vm.$dialog.info({ messageId: "Msg_16" }).then(function () {
                                                    var indexRemove = _.findIndex(vm.dateHistoryList(), function (e) { return e.id == id; });
                                                    var idHist = null;
                                                    if ((indexRemove == (vm.dateHistoryList().length) - 1)) {
                                                        idHist = indexRemove >= 1 ? vm.dateHistoryList()[indexRemove - 1].id : null;
                                                    }
                                                    else {
                                                        idHist = vm.dateHistoryList()[indexRemove + 1].id;
                                                    }
                                                    vm.dateHistoryList().splice(indexRemove, 1);
                                                    vm.historyId(idHist);
                                                    if (vm.mode() == Mode.WPL) {
                                                        vm.employeeId(vm.employeeId());
                                                        vm.getListWpl(vm.workPlaceId());
                                                    }
                                                    else {
                                                        var em = [];
                                                        em.push(vm.employeeId());
                                                        vm.getEmployeeInfo(em, vm.workPlaceId());
                                                    }
                                                    vm.initScreen(vm.mode(), vm.employeeId(), vm.workPlaceId(), vm.historyId());
                                                    vm.isNewMode(false);
                                                });
                                            }).always(function () {
                                                block.clear();
                                            }).fail(function (res) {
                                                nts.uk.ui.block.clear();
                                                vm.showMessageError(res);
                                            });
                                        }
                                    })
                                        .ifNo(function () {
                                    });
                                }
                            };
                            ViewModel.prototype.openCDL008Dialog = function () {
                                var vm = this;
                                var inputCDL008 = {
                                    startMode: StartMode.WORKPLACE,
                                    isMultiple: false,
                                    showNoSelection: false,
                                    selectedCodes: vm.workPlaceId(),
                                    isShowBaseDate: true,
                                    baseDate: moment.utc().toISOString(),
                                    selectedSystemType: SystemType.EMPLOYMENT,
                                    isrestrictionOfReferenceRange: true //参照範囲の絞込: する
                                };
                                setShared('inputCDL008', inputCDL008);
                                modal('/view/cdl/008/a/index.xhtml').onClosed(function () {
                                    var isCancel = getShared('CDL008Cancel');
                                    if (isCancel) {
                                        return;
                                    }
                                    var wid = getShared('outputCDL008');
                                    var workplaceInfor = getShared('workplaceInfor');
                                    if (!isNullOrUndefined(wid) && !isNullOrEmpty(workplaceInfor)) {
                                        vm.workPlaceId(workplaceInfor[0].id);
                                        vm.workplaceCode(workplaceInfor[0].code);
                                        vm.workplaceName(workplaceInfor[0].name);
                                        if (vm.mode() == Mode.WPL) {
                                            vm.employeeId(null);
                                        }
                                        vm.getListWpl(wid);
                                    }
                                });
                            };
                            ViewModel.prototype.getListWpl = function (wid) {
                                var vm = this;
                                var wplParam = {
                                    "workPlaceId": wid
                                }, workplaceManagerList = [], listEmployee = [], personList = [], mode = vm.mode();
                                block.invisible();
                                vm.$ajax('com', API.getListEmpByWpid, wplParam).done(function (data) {
                                    if (!isNullOrEmpty(data)) {
                                        workplaceManagerList = data.workplaceManagerList;
                                        listEmployee = data.listEmployee;
                                        personList = data.personList;
                                        vm.setData(workplaceManagerList, listEmployee, personList, vm.employeeId(), vm.workPlaceId(), null);
                                    }
                                    else {
                                        vm.dateHistoryList([]);
                                        vm.workPlaceList([]);
                                    }
                                }).always(function () {
                                    block.clear();
                                }).fail(function (res) {
                                    nts.uk.ui.block.clear();
                                    vm.showMessageError(res);
                                });
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                        var SystemType;
                        (function (SystemType) {
                            SystemType[SystemType["PERSONAL_INFORMATION"] = 1] = "PERSONAL_INFORMATION";
                            SystemType[SystemType["EMPLOYMENT"] = 2] = "EMPLOYMENT";
                            SystemType[SystemType["SALARY"] = 3] = "SALARY";
                            SystemType[SystemType["HUMAN_RESOURCES"] = 4] = "HUMAN_RESOURCES";
                            SystemType[SystemType["ADMINISTRATOR"] = 5] = "ADMINISTRATOR";
                        })(SystemType || (SystemType = {}));
                        var StartMode;
                        (function (StartMode) {
                            StartMode[StartMode["WORKPLACE"] = 0] = "WORKPLACE";
                            StartMode[StartMode["DEPARTMENT"] = 1] = "DEPARTMENT";
                        })(StartMode || (StartMode = {}));
                        var SelectType = /** @class */ (function () {
                            function SelectType() {
                            }
                            SelectType.SELECT_BY_SELECTED_CODE = 1;
                            SelectType.SELECT_ALL = 2;
                            SelectType.SELECT_FIRST_ITEM = 3;
                            SelectType.NO_SELECT = 4;
                            return SelectType;
                        }());
                        a.SelectType = SelectType;
                        var ListType = /** @class */ (function () {
                            function ListType() {
                            }
                            ListType.EMPLOYMENT = 1;
                            ListType.Classification = 2;
                            ListType.JOB_TITLE = 3;
                            ListType.EMPLOYEE = 4;
                            return ListType;
                        }());
                        a.ListType = ListType;
                        var Mode = /** @class */ (function () {
                            function Mode() {
                            }
                            Mode.EMPLOYMENT = 0;
                            Mode.WPL = 1;
                            return Mode;
                        }());
                        a.Mode = Mode;
                    })(a = cmm051.a || (cmm051.a = {}));
                })(cmm051 = view.cmm051 || (view.cmm051 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm051.a.vm.js.map