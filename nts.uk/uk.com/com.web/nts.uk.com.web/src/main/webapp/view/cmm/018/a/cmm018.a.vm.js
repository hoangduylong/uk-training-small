var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com_1) {
            var view;
            (function (view) {
                var cmm018;
                (function (cmm018) {
                    var a;
                    (function (a_1) {
                        var getText = nts.uk.resource.getText;
                        var servicebase = cmm018.shr.servicebase;
                        var vmbase = cmm018.shr.vmbase;
                        var getShared = nts.uk.ui.windows.getShared;
                        var setShared = nts.uk.ui.windows.setShared;
                        var modal = nts.uk.ui.windows.sub.modal;
                        var block = nts.uk.ui.block;
                        var dialog = nts.uk.ui.dialog;
                        var mode_system = nts.uk.com.view.cmm018.x.viewmodel.MODE_SYSTEM;
                        //=========Mode A: まとめて登録モード==============
                        var viewmodelA;
                        (function (viewmodelA) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    //===================
                                    this.lstNameS = [];
                                    this.systemAtr = ko.observable(0);
                                    this.lstAppDis = [];
                                    this.c1_1 = ko.observable('');
                                    this.c1_3 = ko.observable('');
                                    this.c1_4 = ko.observable('');
                                    this.a1_3 = ko.observable('');
                                    this.rowHist = ko.observable(10);
                                    this.rowHist2 = ko.observable(9);
                                    this.rowHist3 = ko.observable(8);
                                    this.unitSet = ko.observable({
                                        companyUnit: 0,
                                        workplaceUnit: 0,
                                        employeeUnit: 0
                                    });
                                    //_______Check che do hien thi____
                                    this.visibleTabCom = ko.observable(false);
                                    this.visibleTabWkp = ko.observable(false);
                                    this.visibleTabPs = ko.observable(false);
                                    this.lstNoticeDis = [];
                                    this.lstEventDis = [];
                                    //===================
                                    this.nameCompany = ko.observable('');
                                    this.modeCommon = ko.observable(true);
                                    this.listMode = ko.observableArray([
                                        { code: 0, name: getText("CMM018_15") },
                                        { code: 1, name: getText("CMM018_16") }
                                    ]);
                                    //Mode まとめて & 申請個別
                                    this.selectedModeCode = ko.observable(0);
                                    this.columns = ko.observableArray([
                                        { headerText: 'Id', key: 'id', hidden: true },
                                        { headerText: getText('CMM018_22'), key: 'dateRange' },
                                        { headerText: '', key: 'overLap', width: '20px' }
                                    ]);
                                    this.listHistory = ko.observableArray([]);
                                    this.currentCode = ko.observable(null);
                                    this.historyStr = ko.observable('');
                                    //enable button register
                                    this.enableRegister = ko.observable(true);
                                    //---list AppPhase---
                                    this.listAppPhase = ko.observableArray([]);
                                    //---list data right---
                                    this.cpA = ko.observableArray([]);
                                    this.checkAAA = ko.observable(1);
                                    //----- list chua id history va approval id
                                    this.lstAppId = ko.observableArray([]);
                                    //-------data dialog I gui sang
                                    this.dataI = ko.observable(null);
                                    this.checkAddHistory = ko.observable(false);
                                    this.idOld = ko.observable(null);
                                    this.itemOld = ko.observable(null);
                                    //_____button Edit History___
                                    this.enableDelete = ko.observable(true);
                                    // _____button creatNew History___
                                    this.enableCreatNew = ko.observable(true);
                                    //param transfer to dialog K
                                    this.approverInfor = ko.observableArray([]);
                                    this.selectTypeSet = ko.observable(0);
                                    //___________KCP009______________
                                    this.employeeInputList = ko.observableArray([]);
                                    this.isDisplayOrganizationName = ko.observable(true);
                                    this.targetBtnText = getText("KCP009_3");
                                    this.selectedItem = ko.observable(null);
                                    this.tabindex = 1;
                                    //__________Sidebar________
                                    this.tabSelected = ko.observable(null);
                                    this.lstCompany = ko.observableArray([]);
                                    this.lstWorkplace = ko.observableArray([]);
                                    this.lstPerson = ko.observableArray([]);
                                    this.workplaceId = ko.observable("");
                                    this.employeeId = ko.observable("");
                                    //visableCCG001
                                    this.visibleCCG001 = ko.observable(true);
                                    this.ENDDATE_LATEST = '9999/12/31';
                                    //work place Info
                                    this.wpCode = ko.observable("");
                                    this.wpName = ko.observable("");
                                    //emp info: TH goi tu man application
                                    this.empInfoLabel = ko.observable("");
                                    this.items = ko.observableArray([]);
                                    var self = this;
                                    // clear localStorage , bug that is width's appName
                                    uk.localStorage.removeItem('AppName_CMM018');
                                    //get param url
                                    // let url = $(location).attr('search');
                                    var systemAtrLocal = uk.localStorage.getItem(mode_system);
                                    // let urlParam: number = url.split("=")[1];
                                    var systemTransfer = __viewContext.transferred.value;
                                    if (systemTransfer == 0 || systemTransfer == 1) {
                                        self.systemAtr(systemTransfer);
                                    }
                                    else {
                                        self.systemAtr(systemAtrLocal.isPresent() ? systemAtrLocal.get() : 0);
                                    }
                                    uk.localStorage.removeItem(MODE_SYSTEM);
                                    uk.localStorage.setItem(MODE_SYSTEM, ko.toJS(self.systemAtr));
                                    self.systemReference = self.systemAtr() == 1 ? ko.observable(vmbase.SystemType.PERSONNEL)
                                        : ko.observable(vmbase.SystemType.EMPLOYMENT);
                                    //---subscribe currentCode (list left)---
                                    self.currentCode.subscribe(function (codeChanged) {
                                        if (codeChanged == -1) {
                                            return;
                                        }
                                        self.historyStr('');
                                        if (codeChanged != null) {
                                            self.enableDelete(true);
                                        }
                                        var history = self.findHistory(codeChanged);
                                        if (history != undefined) {
                                            self.historyStr(history.dateRange);
                                        }
                                        else {
                                            self.historyStr('');
                                        }
                                        var lstRoot = [];
                                        //TH: tab company
                                        if (self.tabSelected() == vmbase.RootType.COMPANY) {
                                            self.enableCreatNew(true);
                                            //check add history new
                                            if (self.checkAddHistory()) {
                                                self.getDataCompany(0);
                                            }
                                            var lstCompany = self.findAppIdForCom(codeChanged);
                                            if (lstCompany != undefined) {
                                                _.each(lstCompany.lstCompanyRoot, function (item) {
                                                    var empR = item.company.employmentRootAtr;
                                                    var typeA = self.findType(empR, item.company.applicationType, item.company.confirmationRootType, item.company.noticeId, item.company.busEventId);
                                                    lstRoot.push(new vmbase.DataRootCheck(item.company.approvalId, item.company.historyId, typeA, empR, item.company.branchId, item.lstAppPhase));
                                                });
                                            }
                                            var itemHist = self.findHistory(self.currentCode());
                                            if (itemHist != undefined) {
                                                if (itemHist.overLap == '※' || itemHist.overLap == true) {
                                                    self.cpA(self.convertlistRoot(lstRoot, true));
                                                }
                                                else {
                                                    self.cpA(self.convertlistRoot(lstRoot, false));
                                                }
                                            }
                                            else {
                                                self.cpA([]);
                                            }
                                        }
                                        //TH: tab work place
                                        else if (self.tabSelected() == vmbase.RootType.WORKPLACE) {
                                            self.enableCreatNew(true);
                                            //check add history new
                                            if (self.checkAddHistory()) {
                                                self.getDataWorkplace(0);
                                            }
                                            //self.convertHistForWp(self.lstWorkplace());
                                            var lstWorkplace = self.findAppIdForWp(codeChanged);
                                            if (lstWorkplace != undefined) {
                                                _.each(lstWorkplace.lstWorkplaceRoot, function (item) {
                                                    var empR = item.workplace.employmentRootAtr;
                                                    var typeA = self.findType(empR, item.workplace.applicationType, item.workplace.confirmationRootType, item.workplace.noticeId, item.workplace.busEventId);
                                                    lstRoot.push(new vmbase.DataRootCheck(item.workplace.approvalId, item.workplace.historyId, typeA, empR, item.workplace.branchId, item.lstAppPhase));
                                                });
                                            }
                                            var itemHist = self.findHistory(self.currentCode());
                                            if (itemHist != undefined) {
                                                if (itemHist.overLap == '※' || itemHist.overLap == true) {
                                                    self.cpA(self.convertlistRoot(lstRoot, true));
                                                }
                                                else {
                                                    self.cpA(self.convertlistRoot(lstRoot, false));
                                                }
                                            }
                                            else {
                                                self.cpA([]);
                                            }
                                        }
                                        //TH: tab person: vmbase.RootType.PERSON
                                        else {
                                            self.enableCreatNew(true);
                                            //check add history new
                                            if (self.checkAddHistory()) {
                                                self.getDataPerson(0);
                                            }
                                            //self.convertHistForPs(self.lstPerson());
                                            var lstPerson = self.findAppIdForPs(codeChanged);
                                            if (lstPerson != undefined) {
                                                _.each(lstPerson.lstPersonRoot, function (item) {
                                                    var empR = item.person.employmentRootAtr;
                                                    var typeA = self.findType(empR, item.person.applicationType, item.person.confirmationRootType, item.person.noticeId, item.person.busEventId);
                                                    lstRoot.push(new vmbase.DataRootCheck(item.person.approvalId, item.person.historyId, typeA, empR, item.person.branchId, item.lstAppPhase));
                                                });
                                            }
                                            var itemHist = self.findHistory(self.currentCode());
                                            if (itemHist != undefined) {
                                                if (itemHist.overLap == '※' || itemHist.overLap == true) {
                                                    self.cpA(self.convertlistRoot(lstRoot, true));
                                                }
                                                else {
                                                    self.cpA(self.convertlistRoot(lstRoot, false));
                                                }
                                            }
                                            else {
                                                self.cpA([]);
                                            }
                                        }
                                        __viewContext.viewModel.viewmodelSubA.reloadGridN(self.cpA(), self.tabSelected(), vmbase.MODE.MATOME);
                                        vmbase.ProcessHandler.resizeColumn(self.cpA(), self.tabSelected(), vmbase.MODE.MATOME);
                                    });
                                    //---subscribe tab selected---
                                    self.tabSelected.subscribe(function (codeChanged) {
                                        if (codeChanged == null) {
                                            return;
                                        }
                                        self.currentCode('');
                                        self.historyStr('');
                                        self.enableDelete(true);
                                        self.enableCreatNew(true);
                                        var lstRoot = [];
                                        //TH: tab company
                                        if (codeChanged == 0) {
                                            var param = { tab: 0, workplaceID: '', employeeId: '' };
                                            if (self.systemAtr() == vmbase.SystemAtr.WORK) { //就業
                                                servicebase.setAppUseKaf022(param).done(function (lstUse) {
                                                    self.lstAppDis = [];
                                                    self.lstNameAppType([]);
                                                    _.each(lstUse, function (item) {
                                                        // refactor5 remove 36 application
                                                        if (item.useAtr == 1) {
                                                            self.lstAppDis.push(item.appType);
                                                            self.lstNameAppType.push(new vmbase.ApplicationType(item.appType, self.findName(self.lstNameS, item.appType).localizedName, 1));
                                                        }
                                                    });
                                                    self.lstNameAppType.push(new vmbase.ApplicationType(0, getText('CMM018_107'), 2));
                                                    self.lstNameAppType.push(new vmbase.ApplicationType(1, getText('CMM018_108'), 2));
                                                    self.getDataCompany(1).done(function () {
                                                        if (self.listHistory().length > 0) {
                                                            self.currentCode(self.listHistory()[0].id);
                                                        }
                                                        else {
                                                            self.currentCode(null);
                                                        }
                                                    });
                                                });
                                            }
                                            else {
                                                self.getDataCompany(1).done(function () {
                                                    if (self.listHistory().length > 0) {
                                                        self.currentCode(self.listHistory()[0].id);
                                                    }
                                                    else {
                                                        self.currentCode(null);
                                                    }
                                                });
                                            }
                                        }
                                        //TH: tab work place
                                        else if (codeChanged == 1) {
                                            var param = { tab: 1, workplaceID: self.workplaceId(), employeeId: '' };
                                            if (self.systemAtr() == vmbase.SystemAtr.WORK) { //就業
                                                servicebase.setAppUseKaf022(param).done(function (lstUse) {
                                                    self.lstAppDis = [];
                                                    self.lstNameAppType([]);
                                                    _.each(lstUse, function (item) {
                                                        // refactor5 remove 36 application
                                                        if (item.useAtr == 1) {
                                                            self.lstAppDis.push(item.appType);
                                                            self.lstNameAppType.push(new vmbase.ApplicationType(item.appType, self.findName(self.lstNameS, item.appType).localizedName, 1));
                                                        }
                                                    });
                                                    self.lstNameAppType.push(new vmbase.ApplicationType(0, getText('CMM018_107'), 2));
                                                    self.lstNameAppType.push(new vmbase.ApplicationType(1, getText('CMM018_108'), 2));
                                                    self.getDataWorkplace(1).done(function () {
                                                        if (self.listHistory().length > 0) {
                                                            self.currentCode(self.listHistory()[0].id);
                                                        }
                                                        else {
                                                            self.currentCode(null);
                                                        }
                                                    });
                                                });
                                            }
                                            else {
                                                self.getDataWorkplace(1).done(function () {
                                                    if (self.listHistory().length > 0) {
                                                        self.currentCode(self.listHistory()[0].id);
                                                    }
                                                    else {
                                                        self.currentCode(null);
                                                    }
                                                });
                                            }
                                        }
                                        //TH: tab person
                                        else {
                                            var param = { tab: 2, workplaceID: '', employeeId: self.selectedItem() };
                                            if (self.systemAtr() == vmbase.SystemAtr.WORK) { //就業
                                                servicebase.setAppUseKaf022(param).done(function (lstUse) {
                                                    self.lstAppDis = [];
                                                    self.lstNameAppType([]);
                                                    _.each(lstUse, function (item) {
                                                        // refactor5 remove 36 application
                                                        if (item.useAtr == 1) {
                                                            self.lstAppDis.push(item.appType);
                                                            self.lstNameAppType.push(new vmbase.ApplicationType(item.appType, self.findName(self.lstNameS, item.appType).localizedName, 1));
                                                        }
                                                    });
                                                    self.lstNameAppType.push(new vmbase.ApplicationType(0, getText('CMM018_107'), 2));
                                                    self.lstNameAppType.push(new vmbase.ApplicationType(1, getText('CMM018_108'), 2));
                                                    self.getDataPerson(1).done(function () {
                                                        if (self.listHistory().length > 0) {
                                                            self.currentCode(self.listHistory()[0].id);
                                                        }
                                                        else {
                                                            self.currentCode(null);
                                                        }
                                                    });
                                                });
                                            }
                                            else {
                                                self.getDataPerson(1).done(function () {
                                                    if (self.listHistory().length > 0) {
                                                        self.currentCode(self.listHistory()[0].id);
                                                    }
                                                    else {
                                                        self.currentCode(null);
                                                    }
                                                });
                                            }
                                            $('#emp-component').ntsLoadListComponent(self.listComponentOption);
                                        }
                                        try {
                                            self.resizeColumn();
                                        }
                                        catch (error) {
                                        }
                                    });
                                    self.lstNameAppType = ko.observableArray([]);
                                    //___subscribe selected mode code______
                                    self.selectedModeCode.subscribe(function (codeChanged) {
                                        self.enableCreatNew(true);
                                        self.enableDelete(true);
                                        if (codeChanged == 1) { //private
                                            self.checkAAA(0);
                                            __viewContext.viewModel.viewmodelSubB.singleSelectedCode(null);
                                            __viewContext.viewModel.viewmodelSubB.tabSelectedB(self.tabSelected());
                                            //TH: company
                                            if (self.tabSelected() == vmbase.RootType.COMPANY) {
                                                __viewContext.viewModel.viewmodelSubB.checkTabSelectedB(vmbase.RootType.COMPANY, '');
                                            }
                                            //TH: work place
                                            else if (self.tabSelected() == vmbase.RootType.WORKPLACE) {
                                                __viewContext.viewModel.viewmodelSubB.checkTabSelectedB(vmbase.RootType.WORKPLACE, self.workplaceId());
                                            }
                                            //TH: person
                                            else {
                                                __viewContext.viewModel.viewmodelSubB.checkTabSelectedB(vmbase.RootType.PERSON, self.selectedItem());
                                            }
                                        }
                                        else { //common
                                            self.checkAAA(1);
                                            self.tabSelected(__viewContext.viewModel.viewmodelSubB.tabSelectedB());
                                            //TH: company
                                            if (self.tabSelected() == vmbase.RootType.COMPANY) {
                                                self.getDataCompany(1);
                                            }
                                            //TH: work place
                                            else if (self.tabSelected() == vmbase.RootType.WORKPLACE) {
                                                self.getDataWorkplace(1);
                                            }
                                            //TH: person
                                            else {
                                                self.getDataPerson(1);
                                            }
                                        }
                                    });
                                    //_______KCP009_______
                                    // Initial listComponentOption
                                    self.listComponentOption = {
                                        systemReference: self.systemReference(),
                                        isDisplayOrganizationName: self.isDisplayOrganizationName(),
                                        employeeInputList: self.employeeInputList,
                                        targetBtnText: self.targetBtnText,
                                        selectedItem: self.selectedItem,
                                        tabIndex: self.tabindex
                                    };
                                    //____subscribe selected item (return employee id)____
                                    self.selectedItem.subscribe(function (codeChanged) {
                                        var param = { tab: 2, workplaceID: '', employeeId: codeChanged };
                                        if (self.systemAtr() == vmbase.SystemAtr.WORK) { //就業
                                            servicebase.setAppUseKaf022(param).done(function (lstUse) {
                                                self.lstAppDis = [];
                                                self.lstNameAppType([]);
                                                _.each(lstUse, function (item) {
                                                    // refactor5 remove 36 application
                                                    if (item.useAtr == 1) {
                                                        self.lstAppDis.push(item.appType);
                                                        self.lstNameAppType.push(new vmbase.ApplicationType(item.appType, self.findName(self.lstNameS, item.appType).localizedName, 1));
                                                    }
                                                });
                                                self.lstNameAppType.push(new vmbase.ApplicationType(0, getText('CMM018_107'), 2));
                                                self.lstNameAppType.push(new vmbase.ApplicationType(1, getText('CMM018_108'), 2));
                                                if (self.systemAtr() == 0) {
                                                    __viewContext.viewModel.viewmodelSubB.lstNameAppType(self.lstNameAppType());
                                                }
                                                if (self.selectedModeCode() == 0) {
                                                    self.enableCreatNew(true);
                                                    self.getDataPerson(1);
                                                }
                                                else {
                                                    __viewContext.viewModel.viewmodelSubB.checkTabSelectedB(vmbase.RootType.PERSON, codeChanged);
                                                }
                                            });
                                        }
                                        else {
                                            //TH: mode A: まとめて登録モード
                                            if (self.selectedModeCode() == 0) {
                                                self.enableCreatNew(true);
                                                self.getDataPerson(1);
                                            }
                                            //TH: mode B: 申請個別登録モード
                                            else {
                                                __viewContext.viewModel.viewmodelSubB.checkTabSelectedB(vmbase.RootType.PERSON, codeChanged);
                                            }
                                        }
                                    });
                                    self.sidebar();
                                    self.ccg001Init();
                                    $('#ccgcomponent').ntsGroupComponent(self.ccgcomponent);
                                }
                                ScreenModel.prototype.jumpToX = function (param) {
                                    var self = this;
                                    nts.uk.request.jump('/view/cmm/018/x/index.xhtml?systemAtr=' + ko.toJS(self.systemAtr));
                                };
                                ScreenModel.prototype.ccg001Init = function () {
                                    var self = this;
                                    var wkp = self.systemAtr() == 0 ? true : false;
                                    var dep = self.systemAtr() == 1 ? true : false;
                                    //_____CCG001________
                                    self.selectedEmployee = ko.observableArray([]);
                                    self.showinfoSelectedEmployee = ko.observable(false);
                                    //self.baseDate = ko.observable(moment(new Date()).toDate());
                                    self.ccgcomponent = {
                                        showEmployeeSelection: false,
                                        systemType: wkp ? 2 : 4,
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
                                        inService: true,
                                        leaveOfAbsence: true,
                                        closed: true,
                                        retirement: false,
                                        /** Quick search tab options */
                                        showAllReferableEmployee: true,
                                        showOnlyMe: false,
                                        showSameWorkplace: wkp,
                                        showSameWorkplaceAndChild: wkp,
                                        showSameDepartment: dep,
                                        showSameDepartmentAndChild: dep,
                                        /** Advanced search properties */
                                        showEmployment: false,
                                        showWorkplace: wkp,
                                        showDepartment: dep,
                                        showClassification: false,
                                        showJobTitle: false,
                                        showWorktype: false,
                                        isMutipleCheck: true,
                                        /**
                                        * @param dataList: list employee returned from component.
                                        * Define how to use this list employee by yourself in the function's body.
                                        */
                                        returnDataFromCcg001: function (data) {
                                            self.showinfoSelectedEmployee(true);
                                            self.selectedEmployee(data.listEmployee);
                                            __viewContext.viewModel.viewmodelA.convertEmployeeCcg01ToKcp009(data.listEmployee);
                                        }
                                    };
                                };
                                ScreenModel.prototype.sidebar = function () {
                                    var self = this;
                                    //____________sidebar tab_____________
                                    $("#sidebar").ntsSideBar("init", {
                                        active: self.tabSelected(),
                                        activate: function (event, info) {
                                            switch (info.newIndex) {
                                                case 0:
                                                    if (self.selectedModeCode() == 0) {
                                                        self.tabSelected(vmbase.RootType.COMPANY);
                                                        try {
                                                            self.resizeColumn();
                                                        }
                                                        catch (error) {
                                                        }
                                                    }
                                                    else {
                                                        __viewContext.viewModel.viewmodelSubB.checkTabSelectedB(vmbase.RootType.COMPANY, '');
                                                    }
                                                    break;
                                                case 1: //workplace
                                                    if (self.selectedModeCode() == 0) {
                                                        self.tabSelected(vmbase.RootType.WORKPLACE);
                                                        try {
                                                            self.resizeColumn();
                                                        }
                                                        catch (error) {
                                                        }
                                                    }
                                                    else {
                                                        __viewContext.viewModel.viewmodelSubB.checkTabSelectedB(vmbase.RootType.WORKPLACE, '');
                                                    }
                                                    break;
                                                default: //employee
                                                    if (self.selectedModeCode() == 0) {
                                                        self.tabSelected(vmbase.RootType.PERSON);
                                                        try {
                                                            self.resizeColumn();
                                                        }
                                                        catch (error) {
                                                        }
                                                    }
                                                    else {
                                                        if (self.employeeInputList().length == 0) {
                                                            servicebase.getInfoEmLogin().done(function (employeeInfo) {
                                                                //can lay thong tin work place name
                                                                servicebase.getWpDepName(self.systemAtr()).done(function (wpDepName) {
                                                                    self.employeeInputList.push(new vmbase.EmployeeKcp009(employeeInfo.sid, employeeInfo.employeeCode, employeeInfo.employeeName, wpDepName.name, wpDepName.name));
                                                                });
                                                            });
                                                        }
                                                        $('#emp-component').ntsLoadListComponent(self.listComponentOption);
                                                        __viewContext.viewModel.viewmodelSubB.checkTabSelectedB(vmbase.RootType.PERSON, self.selectedItem());
                                                    }
                                            }
                                        }
                                    });
                                };
                                ScreenModel.prototype.convertEmployeeCcg01ToKcp009 = function (dataList) {
                                    var self = this;
                                    self.employeeInputList([]);
                                    _.each(dataList, function (item) {
                                        self.employeeInputList.push(new vmbase.EmployeeKcp009(item.employeeId, item.employeeCode, item.employeeName, item.affiliationName, item.affiliationName));
                                    });
                                    $('#emp-component').ntsLoadListComponent(self.listComponentOption);
                                    if (dataList.length == 0) {
                                        self.selectedItem('');
                                    }
                                    else {
                                        var item = self.findIdSelected(dataList, self.selectedItem());
                                        var sortByEmployeeCode = _.orderBy(dataList, ["employeeCode"], ["asc"]);
                                        if (item == undefined)
                                            self.selectedItem(sortByEmployeeCode[0].employeeId);
                                    }
                                };
                                ScreenModel.prototype.findIdSelected = function (dataList, selectedItem) {
                                    return _.find(dataList, function (obj) {
                                        return obj.employeeId == selectedItem;
                                    });
                                };
                                /**
                                 * open dialog CDL008
                                 * chose work place
                                 * @param baseDate, isMultiple, workplaceId
                                 * @return workplaceId
                                 */
                                ScreenModel.prototype.openDialogCDL008 = function () {
                                    var self = this;
                                    block.grayout();
                                    setShared('inputCDL008', { baseDate: moment(new Date()).toDate(),
                                        isMultiple: false,
                                        selectedCodes: self.workplaceId(),
                                        selectedSystemType: self.systemAtr() == 1 ? 4 : 2,
                                        isrestrictionOfReferenceRange: true,
                                        startMode: self.systemAtr() });
                                    modal("/view/cdl/008/a/index.xhtml").onClosed(function () {
                                        block.clear();
                                        var data = getShared('outputCDL008');
                                        if (data == null || data === undefined) {
                                            return;
                                        }
                                        self.workplaceId(data);
                                        var param = { tab: 1, workplaceID: data, employeeId: '' };
                                        if (self.systemAtr() == vmbase.SystemAtr.WORK) { //就業
                                            servicebase.setAppUseKaf022(param).done(function (lstUse) {
                                                self.lstAppDis = [];
                                                self.lstNameAppType([]);
                                                _.each(lstUse, function (item) {
                                                    // refactor5 remove 36 application
                                                    if (item.useAtr == 1) {
                                                        self.lstAppDis.push(item.appType);
                                                        self.lstNameAppType.push(new vmbase.ApplicationType(item.appType, self.findName(self.lstNameS, item.appType).localizedName, 1));
                                                    }
                                                });
                                                self.lstNameAppType.push(new vmbase.ApplicationType(0, getText('CMM018_107'), 2));
                                                self.lstNameAppType.push(new vmbase.ApplicationType(1, getText('CMM018_108'), 2));
                                                if (self.systemAtr() == 0) {
                                                    __viewContext.viewModel.viewmodelSubB.lstNameAppType(self.lstNameAppType());
                                                }
                                                if (self.selectedModeCode() == 0) {
                                                    self.enableCreatNew(true);
                                                    self.getDataWorkplace(1);
                                                }
                                                else {
                                                    __viewContext.viewModel.viewmodelSubB.checkTabSelectedB(vmbase.RootType.WORKPLACE, data);
                                                }
                                            });
                                        }
                                        else {
                                            if (self.selectedModeCode() == 0) {
                                                self.enableCreatNew(true);
                                                self.getDataWorkplace(1);
                                            }
                                            else {
                                                __viewContext.viewModel.viewmodelSubB.checkTabSelectedB(vmbase.RootType.WORKPLACE, data);
                                            }
                                        }
                                    });
                                };
                                /**
                                 * startPage
                                 * get all data company
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.preStart = function (transferData) {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    if (self.systemAtr() == 1) {
                                        self.rowHist(5);
                                    }
                                    vmbase.ProcessHandler.getSettingApprovalUnit(self.systemAtr()).done(function (setTing) {
                                        if (setTing.companyUnit == 0 && setTing.workplaceUnit == 0 && setTing.employeeUnit == 0) {
                                            //エラーメッセージ「Msg_1607」を表示
                                            nts.uk.ui.dialog.alertError({ messageId: "Msg_1607" }).then(function () {
                                                //トップページを戻す
                                                nts.uk.request.jump("/view/ccg/008/a/index.xhtml");
                                            });
                                            return;
                                        }
                                        self.unitSet(setTing);
                                        self.startPage(transferData);
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                // Refactor5 利用している申請承認ルート
                                // UKDesign.ドメインモデル."NittsuSystem.UniversalK".ワークフロー.承認設定.アルゴリズム.利用している申請承認ルート
                                ScreenModel.prototype.getAppDis = function (transferData) {
                                    var dfd = $.Deferred();
                                    var self = this;
                                    var tab = 0;
                                    if (transferData.screen == 'Application' || (self.unitSet().companyUnit == 0 && self.unitSet().workplaceUnit == 0)) {
                                        tab = 2;
                                    }
                                    else if (self.unitSet().companyUnit == 1) {
                                        tab = 0;
                                    }
                                    else {
                                        tab = 1;
                                    }
                                    var param = { tab: tab, workplaceID: '', employeeId: '' };
                                    if (self.systemAtr() == vmbase.SystemAtr.WORK) { //就業
                                        servicebase.setAppUseKaf022(param).done(function (lstUse) {
                                            self.lstAppDis = [];
                                            self.lstNameAppType([]);
                                            servicebase.getNameAppType().done(function (lstName) {
                                                self.lstNameS = lstName;
                                                _.each(lstUse, function (item) {
                                                    // refactor5 remove 36 application
                                                    if (item.useAtr == 1) {
                                                        self.lstAppDis.push(item.appType);
                                                        self.lstNameAppType.push(new vmbase.ApplicationType(item.appType, self.findName(lstName, item.appType).localizedName, 1, null));
                                                    }
                                                });
                                                self.lstNameAppType.push(new vmbase.ApplicationType(0, getText('CMM018_107'), 2, null));
                                                self.lstNameAppType.push(new vmbase.ApplicationType(1, getText('CMM018_108'), 2, null));
                                                if (self.systemAtr() == 0) {
                                                    __viewContext.viewModel.viewmodelSubB.lstNameAppType(self.lstNameAppType());
                                                }
                                                dfd.resolve();
                                            });
                                        });
                                    }
                                    else { //人事
                                        servicebase.settingJnh011().done(function (lstNotice) {
                                            servicebase.settingJmm018().done(function (lstEvent) {
                                                //                                /**届出*/
                                                //                                NOTICE(4),
                                                //                                /**各業務エベント*/
                                                //                                BUS_EVENT(5);
                                                _.each(lstNotice, function (notice) {
                                                    self.lstNoticeDis.push(notice.reportClsId.toString());
                                                    self.lstNameAppType.push(new vmbase.ApplicationType(notice.reportClsId.toString(), notice.reportName, 4, notice.noRankOrder));
                                                });
                                                _.each(lstEvent, function (event) {
                                                    self.lstEventDis.push(event.programId);
                                                    self.lstNameAppType.push(new vmbase.ApplicationType(event.programId, event.programName, 5, event.noRankOrder == 1 ? true : false));
                                                });
                                                dfd.resolve();
                                            });
                                        });
                                    }
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.findName = function (lstName, appType) {
                                    return _.find(lstName, function (name) {
                                        return name.value == appType;
                                    });
                                };
                                ScreenModel.prototype.startPage = function (transferData) {
                                    var self = this;
                                    block.invisible();
                                    self.textIinit();
                                    //get name application type
                                    self.getAppDis(transferData).done(function () {
                                        if (transferData.screen == 'Application' || (self.unitSet().companyUnit == 0 && self.unitSet().workplaceUnit == 0)) { //screen Application
                                            self.visibleTabCom(false);
                                            self.visibleTabWkp(false);
                                            self.visibleTabPs(true);
                                            if (transferData.screen == 'Application') {
                                                self.employeeId(transferData.employeeId);
                                                self.visibleCCG001(false);
                                            }
                                            else {
                                                self.visibleCCG001(true);
                                            }
                                            if (transferData.screen == 'Application') {
                                                servicebase.getInfoEmployee(self.employeeId()).done(function (employeeInfo) {
                                                    var emp = '対象者：' + employeeInfo.employeeCode + '　' + employeeInfo.employeeName;
                                                    self.empInfoLabel(emp);
                                                    self.selectedItem(employeeInfo.sid);
                                                    self.tabSelected(vmbase.RootType.PERSON);
                                                    self.sidebar();
                                                });
                                            }
                                            else {
                                                servicebase.getInfoEmLogin().done(function (employeeInfo) {
                                                    //can lay thong tin work place name
                                                    servicebase.getWpDepName(self.systemAtr()).done(function (wpDepName) {
                                                        self.employeeInputList.push(new vmbase.EmployeeKcp009(employeeInfo.sid, employeeInfo.employeeCode, employeeInfo.employeeName, wpDepName.name, wpDepName.name));
                                                        self.tabSelected(vmbase.RootType.PERSON);
                                                        self.sidebar();
                                                    });
                                                });
                                            }
                                        }
                                        else {
                                            //visible
                                            self.visibleTabCom(self.unitSet().companyUnit == 1);
                                            self.visibleTabWkp(self.unitSet().workplaceUnit == 1);
                                            self.visibleTabPs(self.unitSet().employeeUnit == 1);
                                            //tab
                                            if (self.unitSet().companyUnit == 1) {
                                                self.tabSelected(vmbase.RootType.COMPANY);
                                            }
                                            else if (self.unitSet().workplaceUnit == 1) {
                                                self.tabSelected(vmbase.RootType.WORKPLACE);
                                            }
                                            else {
                                                self.tabSelected(vmbase.RootType.PERSON);
                                            }
                                            self.sidebar();
                                            self.visibleCCG001(true);
                                            if (self.visibleTabPs()) {
                                                servicebase.getInfoEmLogin().done(function (employeeInfo) {
                                                    //can lay thong tin work place name
                                                    servicebase.getWpDepName(self.systemAtr()).done(function (wpDepName) {
                                                        self.employeeInputList.push(new vmbase.EmployeeKcp009(employeeInfo.sid, employeeInfo.employeeCode, employeeInfo.employeeName, wpDepName.name, wpDepName.name));
                                                    });
                                                });
                                            }
                                        }
                                    });
                                };
                                ScreenModel.prototype.textIinit = function () {
                                    var self = this;
                                    if (self.systemAtr() == vmbase.SystemAtr.WORK) {
                                        var a_2 = getText('Com_Workplace');
                                        self.c1_1(getText('CMM018_104', [a_2]));
                                        self.c1_3(getText('CMM018_105', [a_2]));
                                        self.c1_4(getText('CMM018_106', [a_2]));
                                        self.a1_3(getText('Com_Workplace'));
                                    }
                                    else {
                                        var b = getText('Com_Department');
                                        self.c1_1(getText('CMM018_104', [b]));
                                        self.c1_3(getText('CMM018_105', [b]));
                                        self.c1_4(getText('CMM018_106', [b]));
                                        self.a1_3(getText('Com_Department'));
                                    }
                                };
                                /**
                                 * get data company
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.getDataCompany = function (check) {
                                    var self = this;
                                    block.invisible();
                                    var dfd = $.Deferred();
                                    var param = {
                                        /**システム区分*/
                                        systemAtr: self.systemAtr(),
                                        /**就業ルート区分: 会社(0)　－　職場(1)　－　社員(2)*/
                                        rootType: vmbase.RootType.COMPANY,
                                        /**履歴ID*/
                                        workplaceId: '',
                                        /**社員ID*/
                                        employeeId: '',
                                        /**申請種類*/
                                        lstAppType: self.lstAppDis,
                                        /**届出種類ID,プログラムID(インベント)*/
                                        lstNoticeID: self.lstNoticeDis,
                                        /**プログラムID(インベント)*/
                                        lstEventID: self.lstEventDis
                                    };
                                    servicebase.getAllDataCom(param).done(function (data) {
                                        if (data == null || data === undefined || data.lstCompany.length == 0) { // 画面を新規モードにする
                                            self.historyStr('');
                                            self.listHistory([]);
                                            self.cpA([]);
                                            self.enableRegister(false);
                                            self.lstCompany([]);
                                            self.enableDelete(false);
                                            self.nameCompany(data != null ? data.companyName : '');
                                            __viewContext.viewModel.viewmodelSubA.reloadGridN(self.cpA(), self.tabSelected(), vmbase.MODE.MATOME);
                                            vmbase.ProcessHandler.resizeColumn(self.cpA(), self.tabSelected(), vmbase.MODE.MATOME);
                                            block.clear();
                                            dfd.resolve();
                                            return dfd.promise();
                                        }
                                        // 最新の「就業承認ルート履歴」を選択する
                                        self.nameCompany(data.companyName);
                                        self.enableDelete(true);
                                        self.enableRegister(true);
                                        self.checkAddHistory(false);
                                        self.lstCompany(data.lstCompany);
                                        var lstRoot = [];
                                        self.convertHistForCom(self.lstCompany());
                                        if (self.listHistory().length > 0) {
                                            var history_1 = self.findHistory(self.currentCode());
                                            if (history_1 !== undefined) {
                                                self.historyStr(history_1.dateRange);
                                            }
                                        }
                                        if (self.dataI() != null || check == 1) {
                                            self.currentCode(self.listHistory()[0].id);
                                        }
                                        var lstCompany = self.findAppIdForCom(self.currentCode());
                                        if (lstCompany != null || lstCompany !== undefined) {
                                            _.each(lstCompany.lstCompanyRoot, function (item) {
                                                var empR = item.company.employmentRootAtr;
                                                var typeA = self.findType(empR, item.company.applicationType, item.company.confirmationRootType, item.company.noticeId, item.company.busEventId);
                                                lstRoot.push(new vmbase.DataRootCheck(item.company.approvalId, item.company.historyId, typeA, empR, item.company.branchId, item.lstAppPhase));
                                            });
                                        }
                                        self.cpA(self.convertlistRoot(lstRoot, false));
                                        var itemHist = self.findHistory(self.currentCode());
                                        if (itemHist != undefined) {
                                            if (itemHist.overLap == '※' || itemHist.overLap == true) {
                                                self.cpA(self.convertlistRoot(lstRoot, true));
                                            }
                                            else {
                                                self.cpA(self.convertlistRoot(lstRoot, false));
                                            }
                                        }
                                        __viewContext.viewModel.viewmodelSubA.reloadGridN(self.cpA(), self.tabSelected(), vmbase.MODE.MATOME);
                                        vmbase.ProcessHandler.resizeColumn(self.cpA(), self.tabSelected(), vmbase.MODE.MATOME);
                                        self.dataI(null);
                                        block.clear();
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * get data work place
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.getDataWorkplace = function (check) {
                                    var self = this;
                                    block.invisible();
                                    var dfd = $.Deferred();
                                    self.listHistory([]);
                                    var param = {
                                        /**システム区分*/
                                        systemAtr: self.systemAtr(),
                                        /**就業ルート区分: 会社(0)　－　職場(1)　－　社員(2)*/
                                        rootType: vmbase.RootType.WORKPLACE,
                                        /**履歴ID*/
                                        workplaceId: self.workplaceId(),
                                        /**社員ID*/
                                        employeeId: '',
                                        /**申請種類*/
                                        lstAppType: self.lstAppDis,
                                        /**届出種類ID*/
                                        lstNoticeID: self.lstNoticeDis,
                                        /**プログラムID(インベント)*/
                                        lstEventID: self.lstEventDis
                                    };
                                    self.lstWorkplace([]);
                                    servicebase.getAllDataCom(param).done(function (data) {
                                        self.workplaceId(data.workplaceId);
                                        servicebase.getWkpDepInfo({ id: data.workplaceId, sysAtr: self.systemAtr() }).done(function (wkpDep) {
                                            self.wpCode(wkpDep.code);
                                            self.wpName(wkpDep.name);
                                        });
                                        if (data == null || data === undefined || data.lstWorkplace.length == 0) {
                                            self.historyStr('');
                                            self.cpA([]);
                                            self.enableRegister(false);
                                            self.listHistory([]);
                                            self.lstWorkplace([]);
                                            self.enableDelete(false);
                                            __viewContext.viewModel.viewmodelSubA.reloadGridN(self.cpA(), self.tabSelected(), vmbase.MODE.MATOME);
                                            vmbase.ProcessHandler.resizeColumn(self.cpA(), self.tabSelected(), vmbase.MODE.MATOME);
                                            block.clear();
                                            dfd.resolve();
                                            return dfd.promise();
                                        }
                                        self.enableDelete(true);
                                        self.enableRegister(true);
                                        self.checkAddHistory(false);
                                        self.lstWorkplace(data.lstWorkplace);
                                        var lstRoot = [];
                                        self.convertHistForWp(self.lstWorkplace());
                                        if (self.listHistory().length > 0) {
                                            var history_2 = self.findHistory(self.currentCode());
                                            if (history_2 !== undefined) {
                                                self.historyStr(history_2.dateRange);
                                            }
                                        }
                                        if (self.dataI() != null || check == 1) {
                                            self.currentCode(self.listHistory()[0].id);
                                        }
                                        var lstWorkplace = self.findAppIdForWp(self.currentCode());
                                        if (lstWorkplace != undefined) {
                                            _.each(lstWorkplace.lstWorkplaceRoot, function (item) {
                                                var empR = item.workplace.employmentRootAtr;
                                                var typeA = self.findType(empR, item.workplace.applicationType, item.workplace.confirmationRootType, item.workplace.noticeId, item.workplace.busEventId);
                                                lstRoot.push(new vmbase.DataRootCheck(item.workplace.approvalId, item.workplace.historyId, typeA, empR, item.workplace.branchId, item.lstAppPhase));
                                            });
                                        }
                                        self.cpA(self.convertlistRoot(lstRoot, false));
                                        var itemHist = self.findHistory(self.currentCode());
                                        if (itemHist != undefined) {
                                            if (itemHist.overLap == '※' || itemHist.overLap == true) {
                                                self.cpA(self.convertlistRoot(lstRoot, true));
                                            }
                                            else {
                                                self.cpA(self.convertlistRoot(lstRoot, false));
                                            }
                                        }
                                        self.dataI(null);
                                        __viewContext.viewModel.viewmodelSubA.reloadGridN(self.cpA(), self.tabSelected(), vmbase.MODE.MATOME);
                                        vmbase.ProcessHandler.resizeColumn(self.cpA(), self.tabSelected(), vmbase.MODE.MATOME);
                                        block.clear();
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * get data person
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.getDataPerson = function (check) {
                                    var self = this;
                                    block.invisible();
                                    var dfd = $.Deferred();
                                    var param = {
                                        /**システム区分*/
                                        systemAtr: self.systemAtr(),
                                        /**就業ルート区分: 会社(0)　－　職場(1)　－　社員(2)*/
                                        rootType: vmbase.RootType.PERSON,
                                        /**履歴ID*/
                                        workplaceId: '',
                                        /**社員ID*/
                                        employeeId: self.selectedItem(),
                                        /**申請種類*/
                                        lstAppType: self.lstAppDis,
                                        /**届出種類ID*/
                                        lstNoticeID: self.lstNoticeDis,
                                        /**プログラムID(インベント)*/
                                        lstEventID: self.lstEventDis
                                    };
                                    servicebase.getAllDataCom(param).done(function (data) {
                                        if (data == null || data === undefined || data.lstPerson.length == 0) {
                                            self.historyStr('');
                                            self.listHistory([]);
                                            self.cpA([]);
                                            self.enableRegister(false);
                                            self.enableDelete(false);
                                            self.lstPerson([]);
                                            __viewContext.viewModel.viewmodelSubA.reloadGridN(self.cpA(), self.tabSelected(), vmbase.MODE.MATOME);
                                            vmbase.ProcessHandler.resizeColumn(self.cpA(), self.tabSelected(), vmbase.MODE.MATOME);
                                            block.clear();
                                            dfd.resolve();
                                            return dfd.promise();
                                        }
                                        self.enableDelete(true);
                                        self.enableRegister(true);
                                        self.checkAddHistory(false);
                                        self.lstPerson(data.lstPerson);
                                        var lstRoot = [];
                                        self.convertHistForPs(self.lstPerson());
                                        if (self.listHistory().length > 0) {
                                            var history_3 = self.findHistory(self.currentCode());
                                            if (history_3 !== undefined) {
                                                self.historyStr(history_3.dateRange);
                                            }
                                        }
                                        if (self.dataI() != null || check == 1) {
                                            self.currentCode(self.listHistory()[0].id);
                                        }
                                        var lstPerson = self.findAppIdForPs(self.currentCode());
                                        if (lstPerson != undefined) {
                                            _.each(lstPerson.lstPersonRoot, function (item) {
                                                var empR = item.person.employmentRootAtr;
                                                var typeA = self.findType(empR, item.person.applicationType, item.person.confirmationRootType, item.person.noticeId, item.person.busEventId);
                                                lstRoot.push(new vmbase.DataRootCheck(item.person.approvalId, item.person.historyId, typeA, empR, item.person.branchId, item.lstAppPhase));
                                            });
                                        }
                                        var itemHist = self.findHistory(self.currentCode());
                                        if (itemHist != undefined) {
                                            if (itemHist.overLap == '※' || itemHist.overLap == true) {
                                                self.cpA(self.convertlistRoot(lstRoot, true));
                                            }
                                            else {
                                                self.cpA(self.convertlistRoot(lstRoot, false));
                                            }
                                        }
                                        self.dataI(null);
                                        __viewContext.viewModel.viewmodelSubA.reloadGridN(self.cpA(), self.tabSelected(), vmbase.MODE.MATOME);
                                        vmbase.ProcessHandler.resizeColumn(self.cpA(), self.tabSelected(), vmbase.MODE.MATOME);
                                        block.clear();
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * Open dialog 履歴追加 : Add History
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.openDialogI = function () {
                                    var self = this;
                                    block.grayout();
                                    var checkReload = false;
                                    var itemCurrent = null;
                                    self.enableDelete(false);
                                    self.enableCreatNew(false);
                                    var paramI = null;
                                    self.checkAddHistory(false);
                                    var overLap = false;
                                    var lstAppType = [];
                                    if (self.listHistory() == null || self.listHistory().length == 0) { //tao moi tu dau
                                        lstAppType.push(new vmbase.ApplicationType(null, '', 0));
                                        _.each(self.lstNameAppType(), function (appType) {
                                            lstAppType.push(new vmbase.ApplicationType(appType.value, '', appType.employRootAtr));
                                        });
                                        paramI = {
                                            name: "",
                                            startDate: '',
                                            check: self.tabSelected(),
                                            mode: self.selectedModeCode(),
                                            lstAppType: lstAppType,
                                            overLap: overLap
                                        };
                                    }
                                    else {
                                        //最新の期間履歴の重なるフラグをチェックする(check 重なるフラグ của period history mới nhất)
                                        if (self.listHistory()[0].overLap == '※' || self.listHistory()[0].overLap == true) {
                                            overLap = true;
                                            //item is selected
                                            itemCurrent = self.findHistory(self.currentCode());
                                            //最新の期間履歴を選択するかチェックする(check có đang chọn period history mới nhất hay không)
                                            var lstApp = self.findAppTypeHistory(self.tabSelected());
                                            var histLAst = self.findHistBestNewA(lstApp[0].value, lstApp[0].employRootAtr, self.tabSelected());
                                            if (itemCurrent.overLap != '※' && itemCurrent.overLap != true) {
                                                //エラーメッセージ(Msg_181)(error message (Msg_181))
                                                dialog.alertError({ messageId: "Msg_181" });
                                                block.clear();
                                                self.enableDelete(true);
                                                block.clear();
                                                return;
                                            }
                                            if (itemCurrent.startDate != histLAst.startDate) {
                                                //エラーメッセージ(Msg_181)(error message (Msg_181))
                                                dialog.alertError({ messageId: "Msg_181" });
                                                block.clear();
                                                self.enableDelete(true);
                                                block.clear();
                                                return;
                                            }
                                        }
                                        var appType = null;
                                        var employRootAtr = null;
                                        var startDate = '';
                                        itemCurrent = self.findHistory(self.listHistory()[0].id);
                                        //TH: tab company
                                        if (self.tabSelected() == vmbase.RootType.COMPANY) {
                                            //Check dang chon item vua moi them
                                            if (self.currentCode() == -1) {
                                                checkReload = true;
                                                appType = self.itemOld().lstCompanyRoot[0].company.applicationType;
                                                employRootAtr = self.itemOld().lstCompanyRoot[0].company.employmentRootAtr;
                                                lstAppType = self.lstAppType;
                                            }
                                            else { //selected item
                                                self.itemOld(self.findComRoot(self.currentCode()));
                                                var it = self.itemOld().lstCompanyRoot[0].company;
                                                appType = self.findType(it.employmentRootAtr, it.applicationType, it.confirmationRootType, it.noticeId, it.busEventId);
                                                employRootAtr = it.employmentRootAtr;
                                                lstAppType = self.findAppTypeHistory(self.tabSelected());
                                            }
                                            var histLAst = self.findHistBestNewA(appType, employRootAtr, vmbase.RootType.COMPANY);
                                            startDate = histLAst.startDate;
                                        }
                                        //TH: tab work place
                                        else if (self.tabSelected() == vmbase.RootType.WORKPLACE) {
                                            //Check dang chon item vua moi them
                                            if (self.currentCode() == -1) {
                                                checkReload = true;
                                                appType = self.itemOld().lstWorkplaceRoot[0].workplace.applicationType;
                                                employRootAtr = self.itemOld().lstWorkplaceRoot[0].workplace.employmentRootAtr;
                                                lstAppType = self.lstAppType;
                                            }
                                            else {
                                                self.itemOld(self.findWpRoot(self.currentCode()));
                                                var it = self.itemOld().lstWorkplaceRoot[0].workplace;
                                                appType = self.findType(it.employmentRootAtr, it.applicationType, it.confirmationRootType, it.noticeId, it.busEventId);
                                                employRootAtr = it.employmentRootAtr;
                                                lstAppType = self.findAppTypeHistory(self.tabSelected());
                                            }
                                            var histLAst = self.findHistBestNewA(appType, employRootAtr, vmbase.RootType.WORKPLACE);
                                            startDate = histLAst.startDate;
                                        }
                                        //TH: tab person
                                        else {
                                            //Check dang chon item vua moi them
                                            if (self.currentCode() == -1) {
                                                checkReload = true;
                                                appType = self.itemOld().lstPersonRoot[0].person.applicationType;
                                                employRootAtr = self.itemOld().lstPersonRoot[0].person.employmentRootAtr;
                                                lstAppType = self.lstAppType;
                                            }
                                            else {
                                                self.itemOld(self.findPsRoot(self.currentCode()));
                                                var it = self.itemOld().lstPersonRoot[0].person;
                                                appType = self.findType(it.employmentRootAtr, it.applicationType, it.confirmationRootType, it.noticeId, it.busEventId);
                                                employRootAtr = it.employmentRootAtr;
                                                lstAppType = self.findAppTypeHistory(self.tabSelected());
                                            }
                                            var histLAst = self.findHistBestNewA(appType, employRootAtr, vmbase.RootType.PERSON);
                                            startDate = histLAst.startDate;
                                        }
                                        paramI = { name: "",
                                            startDate: startDate,
                                            check: self.tabSelected(),
                                            mode: 0,
                                            lstAppType: lstAppType,
                                            overLap: overLap
                                        };
                                    }
                                    setShared('CMM018I_PARAM', paramI);
                                    modal("/view/cmm/018/i/index.xhtml").onClosed(function () {
                                        //Xu ly sau khi dong dialog I
                                        var data = getShared('CMM018I_DATA');
                                        if (data == null) {
                                            self.enableCreatNew(true);
                                            if (self.listHistory() != null && self.listHistory().length > 0) {
                                                self.enableDelete(true);
                                            }
                                            block.clear();
                                            return;
                                        }
                                        self.enableRegister(true);
                                        self.lstAppType = data.lstAppType;
                                        self.checkAddHistory(true);
                                        var add = new vmbase.ListHistory(-1, data.startDate + '～' + self.ENDDATE_LATEST, data.startDate, self.ENDDATE_LATEST, '');
                                        self.historyStr(add.dateRange);
                                        var lstRoot = [];
                                        //display history new in screen main
                                        var tmp = [];
                                        self.dataI(data);
                                        if (self.listHistory() == null || self.listHistory().length == 0) { //tao moi hoan toan
                                            //TH: list left
                                            //TH: list right
                                            self.cpA(self.createNew(data.lstAppType, data.overLap));
                                            //                        __viewContext.viewModel.viewmodelSubA.reloadGridN(self.cpA(), self.tabSelected(), vmbase.MODE.MATOME);
                                            //                        vmbase.ProcessHandler.resizeColumn(self.cpA(), self.tabSelected(), vmbase.MODE.MATOME);
                                        }
                                        else {
                                            //TH: list left
                                            if (checkReload) {
                                                _.remove(self.listHistory(), function (n) {
                                                    return n.id == -1;
                                                });
                                                itemCurrent = self.findHistory(self.idOld());
                                            }
                                            var startDate = moment(data.startDate, 'YYYY/MM/DD').toDate();
                                            startDate.setDate(startDate.getDate() - 1);
                                            var month = self.checkDate(startDate.getMonth() + 1);
                                            var day = self.checkDate(startDate.getDate());
                                            var endDateNew = startDate.getFullYear() + '/' + month + '/' + day;
                                            var old = new vmbase.ListHistory(itemCurrent.id, itemCurrent.startDate + '～' + endDateNew, itemCurrent.startDate, endDateNew, itemCurrent.overLap);
                                            if (checkReload) {
                                                _.each(self.listHistory(), function (item) {
                                                    if (item.id != self.idOld()) {
                                                        tmp.push(item);
                                                    }
                                                });
                                            }
                                            else {
                                                _.each(self.listHistory(), function (item) {
                                                    if (item.id != self.listHistory()[0].id) {
                                                        tmp.push(item);
                                                    }
                                                });
                                            }
                                            //TH: list right
                                            //初めから作成するを選択した場合(tạo mới từ đầu)
                                            if (!data.copyDataFlag) {
                                                var check = self.createNew(data.lstAppType, data.overLap);
                                                self.cpA(check);
                                            }
                                            //履歴から引き継ぐから作成する場合(tao moi theo lich su cu)
                                            else {
                                                //重なるフラグがfalse
                                                //重なるフラグがtrue
                                                //TH: tab company
                                                if (self.tabSelected() == vmbase.RootType.COMPANY) {
                                                    var lstCompany = void 0;
                                                    if (self.currentCode() == -1) {
                                                        lstCompany = self.findAppIdForCom(self.idOld());
                                                    }
                                                    else {
                                                        if (data.overlap) {
                                                            lstCompany = self.findAppIdForCom(self.currentCode());
                                                        }
                                                        else {
                                                            var index = _.findIndex(self.listHistory(), function (o) { return o.endDate == "9999/12/31"; });
                                                            lstCompany = self.findAppIdForCom(self.listHistory()[index].id);
                                                        }
                                                    }
                                                    _.each(lstCompany.lstCompanyRoot, function (item) {
                                                        var empR = item.company.employmentRootAtr;
                                                        var typeA = self.findType(empR, item.company.applicationType, item.company.confirmationRootType, item.company.noticeId, item.company.busEventId);
                                                        lstRoot.push(new vmbase.DataRootCheck(item.company.approvalId, item.company.historyId, typeA, empR, item.company.branchId, item.lstAppPhase));
                                                    });
                                                }
                                                //TH: tab work place
                                                else if (self.tabSelected() == vmbase.RootType.WORKPLACE) {
                                                    var lstWorkplace = void 0;
                                                    if (self.currentCode() == -1) {
                                                        lstWorkplace = self.findAppIdForWp(self.idOld());
                                                    }
                                                    else {
                                                        if (data.overlap) {
                                                            lstWorkplace = self.findAppIdForWp(self.currentCode());
                                                        }
                                                        else {
                                                            var index = _.findIndex(self.listHistory(), function (o) { return o.endDate == "9999/12/31"; });
                                                            lstWorkplace = self.findAppIdForWp(self.listHistory()[index].id);
                                                        }
                                                    }
                                                    _.each(lstWorkplace.lstWorkplaceRoot, function (item) {
                                                        var empR = item.workplace.employmentRootAtr;
                                                        var typeA = self.findType(empR, item.workplace.applicationType, item.workplace.confirmationRootType, item.workplace.noticeId, item.workplace.busEventId);
                                                        lstRoot.push(new vmbase.DataRootCheck(item.workplace.approvalId, item.workplace.historyId, typeA, empR, item.workplace.branchId, item.lstAppPhase));
                                                    });
                                                }
                                                //TH: tab person
                                                else {
                                                    var lstPerson = void 0;
                                                    if (self.currentCode() == -1) {
                                                        lstPerson = self.findAppIdForPs(self.idOld());
                                                    }
                                                    else {
                                                        if (data.overlap) {
                                                            lstPerson = self.findAppIdForPs(self.currentCode());
                                                        }
                                                        else {
                                                            var index = _.findIndex(self.listHistory(), function (o) { return o.endDate == "9999/12/31"; });
                                                            lstPerson = self.findAppIdForPs(self.listHistory()[index].id);
                                                        }
                                                    }
                                                    _.each(lstPerson.lstPersonRoot, function (item) {
                                                        var empR = item.person.employmentRootAtr;
                                                        var typeA = self.findType(empR, item.person.applicationType, item.person.confirmationRootType, item.person.noticeId, item.person.busEventId);
                                                        lstRoot.push(new vmbase.DataRootCheck(item.person.approvalId, item.person.historyId, typeA, empR, item.person.branchId, item.lstAppPhase));
                                                    });
                                                }
                                                self.cpA(self.convertlistRoot(lstRoot, overLap));
                                            }
                                            tmp.push(old);
                                        }
                                        tmp.push(add);
                                        var lstHistNew = _.orderBy(tmp, ["dateRange"], ["desc"]);
                                        self.listHistory(lstHistNew);
                                        //luu id
                                        if (self.currentCode() != -1) {
                                            self.idOld(self.currentCode());
                                        }
                                        self.listHistory.valueHasMutated();
                                        __viewContext.viewModel.viewmodelSubA.reloadGridN(self.cpA(), self.tabSelected(), vmbase.MODE.MATOME);
                                        vmbase.ProcessHandler.resizeColumn(self.cpA(), self.tabSelected(), vmbase.MODE.MATOME);
                                        self.currentCode(-1);
                                        block.clear();
                                    });
                                };
                                /**
                                 * find all app type of history is selected in db
                                 */
                                ScreenModel.prototype.findAppTypeHistory = function (rootType) {
                                    var self = this;
                                    var lstApp = [];
                                    if (rootType == vmbase.RootType.COMPANY) {
                                        var obj = self.findAppIdForCom(self.currentCode());
                                        if (obj != undefined) {
                                            _.each(obj.lstCompanyRoot, function (item) {
                                                var empR = item.company.employmentRootAtr;
                                                var typeA = self.findType(empR, item.company.applicationType, item.company.confirmationRootType, item.company.noticeId, item.company.busEventId);
                                                lstApp.push(new vmbase.ApplicationType(typeA, '', empR));
                                            });
                                        }
                                    }
                                    else if (rootType == vmbase.RootType.WORKPLACE) {
                                        var obj = self.findAppIdForWp(self.currentCode());
                                        if (obj != undefined) {
                                            _.each(obj.lstWorkplaceRoot, function (item) {
                                                var empR = item.workplace.employmentRootAtr;
                                                var typeA = self.findType(empR, item.workplace.applicationType, item.workplace.confirmationRootType, item.workplace.noticeId, item.workplace.busEventId);
                                                lstApp.push(new vmbase.ApplicationType(typeA, '', empR));
                                            });
                                        }
                                    }
                                    else {
                                        var obj = self.findAppIdForPs(self.currentCode());
                                        if (obj != undefined) {
                                            _.each(obj.lstPersonRoot, function (item) {
                                                var empR = item.person.employmentRootAtr;
                                                var typeA = self.findType(empR, item.person.applicationType, item.person.confirmationRootType, item.person.noticeId, item.person.busEventId);
                                                lstApp.push(new vmbase.ApplicationType(typeA, '', empR));
                                            });
                                        }
                                    }
                                    return lstApp;
                                };
                                ScreenModel.prototype.findListUpdate = function () {
                                    var self = this;
                                    var lstApp = [];
                                    _.each(self.cpA(), function (item) {
                                        lstApp.push(new vmbase.UpdateHistoryDto(item.approvalId, item.historyId, item.appTypeValue, item.employRootAtr));
                                    });
                                    return lstApp;
                                };
                                /**
                                 * open dialog J
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.openDialogJ = function () {
                                    var self = this;
                                    block.grayout();
                                    var history = self.findHistory(self.currentCode());
                                    if (self.listHistory()[0].overLap == '※' || self.listHistory()[0].overLap == true) { //check ls moi nhat co overlap k?
                                        if (history.overLap != '※' && history.overLap != true) { //ls dang chon k bi chong cheo
                                            //エラーメッセージ(Msg_154) (Msg_154: Chỉ ls mới nhất mới được chỉnh sửa)
                                            dialog.alertError({ messageId: "Msg_154" });
                                            block.clear();
                                            return;
                                        }
                                        else {
                                            //find all appType of history is selected
                                            var lstApp = self.findAppTypeHistory(self.tabSelected());
                                            var check_1 = false;
                                            _.each(lstApp, function (app) {
                                                var appNew = self.findHistBestNewA(app.value, app.employRootAtr, self.tabSelected());
                                                if (history.startDate.localeCompare(appNew.startDate) < 0) {
                                                    //エラーメッセージ(Msg_154) (Msg_154: Chỉ ls mới nhất mới được chỉnh sửa)
                                                    dialog.alertError({ messageId: "Msg_154" });
                                                    block.clear();
                                                    check_1 = true;
                                                    return;
                                                }
                                            });
                                            if (check_1) {
                                                return;
                                            }
                                        }
                                    }
                                    else {
                                        //編集する期間が最新なのかチェックする(Check xem có phải ls mới nhất k?)
                                        if (history.startDate != self.listHistory()[0].startDate) {
                                            //エラーメッセージ(Msg_154) (Msg_154: Chỉ ls mới nhất mới được chỉnh sửa)
                                            dialog.alertError({ messageId: "Msg_154" });
                                            block.clear();
                                            return;
                                        }
                                    }
                                    if (history.overLap == '※' || history.overLap == true) {
                                        dialog.alertError({ messageId: "Msg_319" });
                                        block.clear();
                                        return;
                                    }
                                    //list approvalId + historyId
                                    var lst = self.findListUpdate();
                                    var paramJ = {
                                        startDate: history.startDate,
                                        endDate: history.endDate,
                                        workplaceId: self.workplaceId(),
                                        employeeId: self.selectedItem(),
                                        check: self.tabSelected(),
                                        mode: self.selectedModeCode(),
                                        overlapFlag: history.overLap,
                                        lstUpdate: lst,
                                        sysAtr: self.systemAtr()
                                    };
                                    setShared('CMM018J_PARAM', paramJ);
                                    modal("/view/cmm/018/j/index.xhtml").onClosed(function () {
                                        block.clear();
                                        var cancel = getShared('CMM018J_OUTPUT');
                                        if (cancel != undefined && cancel.cancel) {
                                            return;
                                        }
                                        //load data
                                        if (self.tabSelected() == vmbase.RootType.COMPANY) { //company
                                            self.getDataCompany(1);
                                        }
                                        else if (self.tabSelected() == vmbase.RootType.WORKPLACE) { //work place
                                            self.getDataWorkplace(1);
                                        }
                                        else { //person
                                            self.getDataPerson(1);
                                        }
                                    });
                                };
                                /**
                                 * open dialog K
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.openDialogK = function (obj, approvalId, appTypeValue, employRootAtr, phaseOrder) {
                                    var self = __viewContext.viewModel.viewmodelA;
                                    block.grayout();
                                    self.approverInfor([]);
                                    var formSetting = obj.approvalForm == 0 ? 1 : obj.approvalForm;
                                    var confirmedPerson = '';
                                    var appAtr = obj.approvalAtr;
                                    _.each(obj.approver, function (item) {
                                        if (appAtr == 0) {
                                            self.approverInfor.push({ id: item.employeeId, code: item.empCode, name: item.name, approvalAtr: appAtr, dispOrder: item.approverOrder });
                                            if (item.confirmPerson == 1) {
                                                confirmedPerson = item.employeeId;
                                            }
                                        }
                                        else {
                                            self.approverInfor.push({ code: item.jobGCD, name: item.name, approvalAtr: appAtr, dispOrder: item.approverOrder });
                                            if (item.confirmPerson == 1) {
                                                confirmedPerson = item.jobTitleId;
                                            }
                                        }
                                    });
                                    var specWkp = '';
                                    if (appAtr == 2) {
                                        specWkp = obj.approver.length > 0 ? obj.approver[0].specWkpId : '';
                                    }
                                    var appType = vmbase.ProcessHandler.findAppbyValue(appTypeValue, employRootAtr, self.lstNameAppType());
                                    var appTypeName;
                                    if (appType != undefined) {
                                        appTypeName = appType.localizedName;
                                    }
                                    else {
                                        appTypeName = '共通';
                                    }
                                    var typeSet = 1;
                                    var tabSel = self.selectedModeCode() == 0 ? self.tabSelected() : __viewContext.viewModel.viewmodelSubB.tabSelectedB();
                                    if (tabSel == 2) {
                                        typeSet = 0;
                                    }
                                    else {
                                        typeSet = self.approverInfor().length == 0 ? 1 : self.approverInfor()[0].approvalAtr;
                                    }
                                    setShared("CMM018K_PARAM", {
                                        systemAtr: self.systemAtr(),
                                        appTypeName: appTypeName,
                                        formSetting: formSetting,
                                        approverInfor: self.approverInfor(),
                                        confirmedPerson: confirmedPerson,
                                        tab: tabSel,
                                        typeSetting: typeSet,
                                        specWkpId: specWkp
                                    });
                                    modal("/view/cmm/018/k/index.xhtml").onClosed(function () {
                                        block.clear();
                                        var subA = __viewContext.viewModel.viewmodelSubA;
                                        subA.setWidthCloseDialog(tabSel, phaseOrder);
                                        var modeA = __viewContext.viewModel.viewmodelA.selectedModeCode();
                                        self.approverInfor([]);
                                        var data = getShared('CMM018K_DATA');
                                        if (data == null) {
                                            return;
                                        }
                                        var data2;
                                        if (modeA == vmbase.MODE.SHINSEI) {
                                            data2 = __viewContext.viewModel.viewmodelSubB.comRoot();
                                        }
                                        else {
                                            data2 = self.findRootAR(approvalId);
                                            _.remove(self.cpA(), function (item) {
                                                return item.approvalId == approvalId;
                                            });
                                        }
                                        var a = null;
                                        var approver = [];
                                        var approvalAtr = data.selectTypeSet;
                                        var length = data.approverInfor.length;
                                        var lstAPhase = [data2.appPhase1, data2.appPhase2, data2.appPhase3, data2.appPhase4, data2.appPhase5];
                                        var color = length > 0 ? true : self.checkColor(lstAPhase, phaseOrder);
                                        _.each(data.approverInfor, function (item, index) {
                                            var confirmedPerson = (data.formSetting == 2) && (item.id == data.confirmedPerson) ? 1 : 0;
                                            var confirmName = confirmedPerson == 1 ? '（確定）' : '';
                                            approver.push(new vmbase.ApproverDto(approvalAtr != 0 ? item.code : null, approvalAtr == 0 ? item.id : null, approvalAtr == 0 ? item.code : null, item.name, item.dispOrder, approvalAtr, confirmedPerson, confirmName, data.specWkpId));
                                        });
                                        var b = new vmbase.ApprovalPhaseDto(approver, '', length == 0 ? 0 : data.formSetting, length == 0 ? '' : data.approvalFormName, 0, phaseOrder, approvalAtr);
                                        switch (phaseOrder) {
                                            case 1:
                                                a = new vmbase.CompanyAppRootADto(color, data2.employRootAtr, appTypeValue, data2.appTypeName, approvalId, data2.historyId, data2.branchId, b, data2.appPhase2, data2.appPhase3, data2.appPhase4, data2.appPhase5);
                                                break;
                                            case 2:
                                                a = new vmbase.CompanyAppRootADto(color, data2.employRootAtr, appTypeValue, data2.appTypeName, approvalId, data2.historyId, data2.branchId, data2.appPhase1, b, data2.appPhase3, data2.appPhase4, data2.appPhase5);
                                                break;
                                            case 3:
                                                a = new vmbase.CompanyAppRootADto(color, data2.employRootAtr, appTypeValue, data2.appTypeName, approvalId, data2.historyId, data2.branchId, data2.appPhase1, data2.appPhase2, b, data2.appPhase4, data2.appPhase5);
                                                break;
                                            case 4:
                                                a = new vmbase.CompanyAppRootADto(color, data2.employRootAtr, appTypeValue, data2.appTypeName, approvalId, data2.historyId, data2.branchId, data2.appPhase1, data2.appPhase2, data2.appPhase3, b, data2.appPhase5);
                                                break;
                                            default:
                                                a = new vmbase.CompanyAppRootADto(color, data2.employRootAtr, appTypeValue, data2.appTypeName, approvalId, data2.historyId, data2.branchId, data2.appPhase1, data2.appPhase2, data2.appPhase3, data2.appPhase4, b);
                                                break;
                                        }
                                        if (modeA == vmbase.MODE.SHINSEI) {
                                            __viewContext.viewModel.viewmodelSubB.comRoot(a);
                                            __viewContext.viewModel.viewmodelSubA.reloadGridN([a], tabSel, vmbase.MODE.SHINSEI);
                                            vmbase.ProcessHandler.resizeColumn([a], tabSel, vmbase.MODE.SHINSEI);
                                        }
                                        else {
                                            var dataOld = self.cpA();
                                            if (!isNaN(parseInt(a.appTypeValue))) {
                                                a.appTypeValue = parseInt(a.appTypeValue);
                                            }
                                            dataOld.push(a);
                                            var listHistoryNew = vmbase.ProcessHandler.orderByList(dataOld);
                                            self.cpA(listHistoryNew);
                                            // bug #109950
                                            __viewContext.viewModel.viewmodelSubA.reloadGridN(self.cpA(), tabSel, vmbase.MODE.MATOME).then(__viewContext.viewModel.viewmodelSubA.scrollToIndex(a));
                                            vmbase.ProcessHandler.resizeColumn(self.cpA(), tabSel, vmbase.MODE.MATOME);
                                        }
                                    });
                                };
                                /**
                                 * delete row (root)
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.deleteRow = function (approvalId, employRootAtr) {
                                    var self = this;
                                    var objSelected = self.findApprovalA(approvalId);
                                    var modeA = __viewContext.viewModel.viewmodelA.selectedModeCode();
                                    var lstNew = [];
                                    if (modeA == vmbase.MODE.SHINSEI) {
                                        lstNew.push(__viewContext.viewModel.viewmodelSubB.comRoot());
                                    }
                                    else {
                                        lstNew = self.cpA();
                                        self.cpA([]);
                                    }
                                    var lstRootNew = [];
                                    var rootDelete; //item delete
                                    _.each(lstNew, function (item) {
                                        if (item.approvalId == approvalId && item.employRootAtr == employRootAtr) {
                                            rootDelete = item;
                                        }
                                        else {
                                            lstRootNew.push(item);
                                        }
                                    });
                                    var empty = new vmbase.ApprovalPhaseDto([], null, 0, '', null, null, 0);
                                    var rootNew = new vmbase.CompanyAppRootADto(false, rootDelete.employRootAtr, rootDelete.appTypeValue, rootDelete.appTypeName, rootDelete.approvalId, rootDelete.historyId, rootDelete.branchId, empty, empty, empty, empty, empty);
                                    lstRootNew.push(rootNew);
                                    var lstSort = vmbase.ProcessHandler.orderByList(lstRootNew);
                                    var tabSel = self.selectedModeCode() == 0 ? self.tabSelected() : __viewContext.viewModel.viewmodelSubB.tabSelectedB();
                                    if (modeA == vmbase.MODE.SHINSEI) {
                                        var a_3 = lstRootNew[0];
                                        __viewContext.viewModel.viewmodelSubB.comRoot(a_3);
                                        __viewContext.viewModel.viewmodelSubA.reloadGridN([a_3], tabSel, vmbase.MODE.SHINSEI);
                                        vmbase.ProcessHandler.resizeColumn([a_3], tabSel, vmbase.MODE.SHINSEI);
                                    }
                                    else {
                                        self.cpA(lstSort);
                                        __viewContext.viewModel.viewmodelSubA.reloadGridN(self.cpA(), tabSel, vmbase.MODE.MATOME);
                                        vmbase.ProcessHandler.resizeColumn(self.cpA(), tabSel, vmbase.MODE.MATOME);
                                    }
                                };
                                ScreenModel.prototype.findApprovalA = function (value) {
                                    var self = this;
                                    return _.find(self.cpA(), function (obj) {
                                        return obj.approvalId == value;
                                    });
                                };
                                /**
                                 * find appRootHist is selected
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.findHistory = function (value) {
                                    var self = this;
                                    return _.find(self.listHistory(), function (obj) {
                                        return obj.id == value;
                                    });
                                };
                                /**
                                 * find history moi nhat theo loai don
                                 */
                                ScreenModel.prototype.findHistBestNewA = function (appType, employRootAtr, rootType) {
                                    var self = this;
                                    //TH: company
                                    if (rootType == vmbase.RootType.COMPANY) {
                                        var lstComRoot_1 = [];
                                        _.each(self.lstCompany(), function (comRoot) {
                                            _.each(comRoot.lstCompanyRoot, function (com) {
                                                lstComRoot_1.push(com);
                                            });
                                        });
                                        var lstCompany_1 = [];
                                        _.each(lstComRoot_1, function (root) {
                                            lstCompany_1.push(root.company);
                                        });
                                        var rootType_1 = self.filterByEmpR(lstCompany_1, employRootAtr, appType);
                                        var lstHistorySort = _.orderBy(rootType_1, ["startDate"], ["desc"]);
                                        return lstHistorySort[0];
                                    }
                                    //TH: work place
                                    else if (rootType == vmbase.RootType.WORKPLACE) {
                                        var lstWpRoot_1 = [];
                                        _.each(self.lstWorkplace(), function (wpRoot) {
                                            _.each(wpRoot.lstWorkplaceRoot, function (wp) {
                                                lstWpRoot_1.push(wp);
                                            });
                                        });
                                        var lstWorkplace_1 = [];
                                        _.each(lstWpRoot_1, function (root) {
                                            lstWorkplace_1.push(root.workplace);
                                        });
                                        var rootType_2 = self.filterByEmpR(lstWorkplace_1, employRootAtr, appType);
                                        var lstHistorySort = _.orderBy(rootType_2, ["startDate"], ["desc"]);
                                        return lstHistorySort[0];
                                    }
                                    //TH: person    
                                    else {
                                        var lstPsRoot_1 = [];
                                        _.each(self.lstPerson(), function (wpRoot) {
                                            _.each(wpRoot.lstPersonRoot, function (ps) {
                                                lstPsRoot_1.push(ps);
                                            });
                                        });
                                        var lstPerson_1 = [];
                                        _.each(lstPsRoot_1, function (root) {
                                            lstPerson_1.push(root.person);
                                        });
                                        var rootType_3 = self.filterByEmpR(lstPerson_1, employRootAtr, appType);
                                        var lstHistorySort = _.orderBy(rootType_3, ["startDate"], ["desc"]);
                                        return lstHistorySort[0];
                                    }
                                };
                                //file root by type, empR
                                ScreenModel.prototype.filterByEmpR = function (lstRoot, employRootAtr, appType) {
                                    var rootType = [];
                                    if (employRootAtr == 2) {
                                        rootType = _.filter(lstRoot, function (root) {
                                            return root.confirmationRootType == appType && root.employmentRootAtr == 2;
                                        });
                                    }
                                    else if (employRootAtr == 4) {
                                        rootType = _.filter(lstRoot, function (root) {
                                            return root.noticeId == appType && root.employmentRootAtr == 4;
                                        });
                                    }
                                    else if (employRootAtr == 5) {
                                        rootType = _.filter(lstRoot, function (root) {
                                            return root.busEventId == appType && root.employmentRootAtr == 5;
                                        });
                                    }
                                    else if (employRootAtr == 0) {
                                        rootType = _.filter(lstRoot, function (root) {
                                            return root.employmentRootAtr == 0;
                                        });
                                    }
                                    else {
                                        rootType = _.filter(lstRoot, function (root) {
                                            return root.applicationType == appType && root.employmentRootAtr == 1;
                                        });
                                    }
                                    return rootType;
                                };
                                /**
                                 * find appRootHist is selected of company
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.findAppIdForCom = function (value) {
                                    var self = this;
                                    return _.find(self.lstCompany(), function (obj) {
                                        return obj.id == value;
                                    });
                                };
                                /**
                                 * find appRootHist is selected of work place
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.findAppIdForWp = function (value) {
                                    var self = this;
                                    return _.find(self.lstWorkplace(), function (obj) {
                                        return obj.id == value;
                                    });
                                };
                                /**
                                 * find appRootHist is selected of person
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.findAppIdForPs = function (value) {
                                    var self = this;
                                    return _.find(self.lstPerson(), function (obj) {
                                        return obj.id == value;
                                    });
                                };
                                /**
                                 * find root is selected
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.findRootAR = function (value) {
                                    var self = this;
                                    return _.find(self.cpA(), function (obj) {
                                        return obj.approvalId == value;
                                    });
                                };
                                /**
                                 * find company root is selected
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.findComRoot = function (value) {
                                    var self = this;
                                    return _.find(self.lstCompany(), function (obj) {
                                        return obj.id == value;
                                    });
                                };
                                /**
                                 * find work place root is selected
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.findWpRoot = function (value) {
                                    var self = this;
                                    return _.find(self.lstWorkplace(), function (obj) {
                                        return obj.id == value;
                                    });
                                };
                                /**
                                 * find person root is selected
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.findPsRoot = function (value) {
                                    var self = this;
                                    return _.find(self.lstPerson(), function (obj) {
                                        return obj.id == value;
                                    });
                                };
                                /**
                                 * register
                                 * add history
                                 * add/update approver
                                 * delete root
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.register = function (rootType) {
                                    var self = this;
                                    block.invisible();
                                    var checkAddHist = false;
                                    var root = [];
                                    if (self.dataI() != null) {
                                        checkAddHist = true;
                                    }
                                    if (self.selectedModeCode() == 0) { //common
                                        root = self.cpA();
                                    }
                                    else { //private
                                        __viewContext.viewModel.viewmodelSubB.registerB();
                                        block.clear();
                                        return;
                                    }
                                    var history = self.findHistory(self.currentCode());
                                    var listType = self.findAppTypeHistory(self.tabSelected());
                                    //QA#100601
                                    var checkEmpty = false;
                                    _.each(root, function (rootItem) {
                                        if (rootItem.color) {
                                            checkEmpty = true;
                                        }
                                    });
                                    //登録対象の承認ルートをチェックする
                                    if (!checkEmpty) { //0件の場合
                                        //エラーメッセージ(Msg_37)を表示する (Hiển thị message lỗi (Msg_37))
                                        dialog.alertError({ messageId: "Msg_37" }).then(function () {
                                            block.clear();
                                        });
                                        return;
                                    }
                                    var data = new vmbase.DataResigterDto(self.systemAtr(), self.tabSelected(), checkAddHist, self.workplaceId(), self.selectedItem(), history.startDate, history.endDate, self.dataI(), listType == undefined ? [] : listType, root, self.selectedModeCode());
                                    servicebase.updateRoot(data).done(function () {
                                        self.enableCreatNew(true);
                                        self.enableDelete(true);
                                        if (self.tabSelected() == vmbase.RootType.COMPANY) {
                                            self.getDataCompany(0);
                                        }
                                        else if (self.tabSelected() == vmbase.RootType.WORKPLACE) {
                                            self.getDataWorkplace(0);
                                        }
                                        else {
                                            self.getDataPerson(0);
                                        }
                                        block.clear();
                                        dialog.info({ messageId: "Msg_15" });
                                    }).fail(function () {
                                        block.clear();
                                    });
                                };
                                /**
                                 * convert to list history company
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.convertHistForCom = function (lstCom) {
                                    var self = this;
                                    var lstHist = [];
                                    self.listHistory([]);
                                    _.each(lstCom, function (itemHist) {
                                        var sDate = itemHist.lstCompanyRoot[0].company.startDate;
                                        var eDate = itemHist.lstCompanyRoot[0].company.endDate;
                                        var overLap = itemHist.overLap;
                                        lstHist.push(new vmbase.ListHistory(itemHist.id, sDate + '～' + eDate, sDate, eDate, overLap == true ? '※' : ''));
                                    });
                                    var a = _.orderBy(lstHist, ["dateRange"], ["desc"]);
                                    self.listHistory(a);
                                    self.listHistory.valueHasMutated();
                                };
                                /**
                                 * convert to list history work place
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.convertHistForWp = function (lstWp) {
                                    var self = this;
                                    var lstHist = [];
                                    self.listHistory([]);
                                    _.each(lstWp, function (itemHist) {
                                        var sDate = itemHist.lstWorkplaceRoot[0].workplace.startDate;
                                        var eDate = itemHist.lstWorkplaceRoot[0].workplace.endDate;
                                        var overLap = itemHist.overLap;
                                        lstHist.push(new vmbase.ListHistory(itemHist.id, sDate + '～' + eDate, sDate, eDate, overLap == true ? '※' : ''));
                                    });
                                    var a = _.orderBy(lstHist, ["dateRange"], ["desc"]);
                                    self.listHistory(a);
                                    self.listHistory.valueHasMutated();
                                };
                                /**
                                 * convert to list history for person
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.convertHistForPs = function (lstPs) {
                                    var self = this;
                                    var lstHist = [];
                                    self.listHistory([]);
                                    _.each(lstPs, function (itemHist) {
                                        var sDate = itemHist.lstPersonRoot[0].person.startDate;
                                        var eDate = itemHist.lstPersonRoot[0].person.endDate;
                                        var overLap = itemHist.overLap;
                                        lstHist.push(new vmbase.ListHistory(itemHist.id, sDate + '～' + eDate, sDate, eDate, overLap == true ? '※' : ''));
                                    });
                                    var a = _.orderBy(lstHist, ["dateRange"], ["desc"]);
                                    self.listHistory(a);
                                    self.listHistory.valueHasMutated();
                                };
                                /**
                                 * check list app phase (TH: <5)
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.checklist = function (list) {
                                    var self = this;
                                    var listFix = [];
                                    var itemBonus = new vmbase.ApprovalPhaseDto([], null, 0, '', null, null, 0);
                                    for (var i_1 = 1; i_1 <= 5; i_1++) {
                                        var a_4 = self.findAppPhase(i_1, list);
                                        if (a_4 != null) {
                                            listFix.push(a_4);
                                        }
                                        else {
                                            listFix.push(itemBonus);
                                        }
                                    }
                                    return listFix;
                                };
                                /**
                                * check list root (TH: <14)
                                * mode A: まとめて登録モード
                                */
                                ScreenModel.prototype.checklistRoot = function (root) {
                                    var self = this;
                                    var lstbyApp = [];
                                    var a = new vmbase.ApprovalPhaseDto([], '', 0, '', 0, 0, 0);
                                    var color;
                                    //Them common type
                                    _.each(root, function (itemRoot) {
                                        color = itemRoot.lstAppPhase.length > 0 ? true : false;
                                        self.listAppPhase(self.checklist(itemRoot.lstAppPhase));
                                        //TH: co data
                                        if (itemRoot.applicationType == null && itemRoot.employmentRootAtr == 0) {
                                            lstbyApp.push(new vmbase.CompanyAppRootADto(color, itemRoot.employmentRootAtr, null, getText('CMM018_109'), itemRoot.approvalId, itemRoot.historyId, itemRoot.branchId, self.listAppPhase()[0], self.listAppPhase()[1], self.listAppPhase()[2], self.listAppPhase()[3], self.listAppPhase()[4]));
                                        }
                                    });
                                    //TH: khong co data
                                    if (lstbyApp.length < 1) {
                                        lstbyApp.push(new vmbase.CompanyAppRootADto(false, 0, null, getText('CMM018_109'), '', '', '', a, a, a, a, a));
                                    }
                                    _.each(self.lstNameAppType(), function (item, index) {
                                        var check = false;
                                        _.each(root, function (itemRoot) {
                                            color = itemRoot.lstAppPhase.length > 0 ? true : false;
                                            // refactor5 remove 36 application
                                            if (item.value == itemRoot.applicationType) {
                                                lstbyApp.push(new vmbase.CompanyAppRootADto(color, itemRoot.employmentRootAtr, item.value, item.localizedName, itemRoot.approvalId, itemRoot.historyId, itemRoot.branchId, self.listAppPhase()[0], self.listAppPhase()[1], self.listAppPhase()[2], self.listAppPhase()[3], self.listAppPhase()[4]));
                                                check = true;
                                            }
                                        });
                                        // refactor5 remove 36 application
                                        if (!check) { //chua co du lieu
                                            lstbyApp.push(new vmbase.CompanyAppRootADto(false, item.employRootAtr, item.value, item.localizedName, index, '', '', a, a, a, a, a));
                                        }
                                    });
                                    return vmbase.ProcessHandler.orderByList(lstbyApp);
                                };
                                /**
                                * convert list root (TH: <14)
                                * mode A: まとめて登録モード
                                */
                                ScreenModel.prototype.convertlistRoot = function (root, overLap) {
                                    var self = this;
                                    var lstbyApp = [];
                                    var appName = '';
                                    var color;
                                    _.each(root, function (itemRoot) {
                                        color = itemRoot.lstAppPhase.length > 0 ? true : false;
                                        self.listAppPhase(self.checklist(itemRoot.lstAppPhase));
                                        //HHH
                                        var appType = vmbase.ProcessHandler.findAppbyValue(itemRoot.applicationType, itemRoot.employmentRootAtr, self.lstNameAppType());
                                        appName = itemRoot.employmentRootAtr == 0 ? getText('CMM018_109') : appType.localizedName;
                                        lstbyApp.push(new vmbase.CompanyAppRootADto(color, itemRoot.employmentRootAtr, itemRoot.applicationType, appName, itemRoot.approvalId, itemRoot.historyId, itemRoot.branchId, self.listAppPhase()[0], self.listAppPhase()[1], self.listAppPhase()[2], self.listAppPhase()[3], self.listAppPhase()[4]));
                                    });
                                    if (!overLap) {
                                        var lstAppCur = self.findAppTypeHistory(self.tabSelected());
                                        var app = vmbase.ProcessHandler.findAppbyValue(null, 0, lstAppCur);
                                        var a_5 = new vmbase.ApprovalPhaseDto([], '', 0, '', 0, 0, 0);
                                        if (app == undefined) {
                                            lstbyApp.push(new vmbase.CompanyAppRootADto(false, 0, null, getText('CMM018_109'), '0', '', '', a_5, a_5, a_5, a_5, a_5));
                                        }
                                        _.each(self.lstNameAppType(), function (appType, index) {
                                            index++;
                                            // refactor5 remove 36 application
                                            if (!vmbase.ProcessHandler.checkExist(lstbyApp, appType.value, appType.employRootAtr)) {
                                                lstbyApp.push(new vmbase.CompanyAppRootADto(false, appType.employRootAtr, appType.value, appType.employRootAtr == 0 ? getText('CMM018_109') : appType.localizedName, index.toString(), '', '', a_5, a_5, a_5, a_5, a_5));
                                            }
                                        });
                                    }
                                    return vmbase.ProcessHandler.orderByList(lstbyApp);
                                };
                                /**
                                 * create root new after add history new
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.createNew = function (lstAppType, check) {
                                    var self = this;
                                    var lstbyApp = [];
                                    var a = new vmbase.ApprovalPhaseDto([], '', 0, '', 0, 0, 0);
                                    if (!check) {
                                        _.each(self.lstNameAppType(), function (appType, index) {
                                            var objType = vmbase.ProcessHandler.findAppbyValue(appType.value, appType.employRootAtr, self.lstNameAppType());
                                            lstbyApp.push(new vmbase.CompanyAppRootADto(false, appType.employRootAtr, objType == null ? null : objType.value, appType.employRootAtr == 0 ? '共通ルート' : objType.localizedName, index.toString(), '', '', a, a, a, a, a));
                                        });
                                        lstbyApp.push(new vmbase.CompanyAppRootADto(false, 0, null, getText('CMM018_109'), '16', '', '', a, a, a, a, a));
                                    }
                                    else { //TH overlap
                                        _.each(lstAppType, function (appType, index) {
                                            var objType = vmbase.ProcessHandler.findAppbyValue(appType.value, appType.employRootAtr, self.lstNameAppType());
                                            lstbyApp.push(new vmbase.CompanyAppRootADto(false, appType.employRootAtr, objType == null ? null : objType.value, appType.employRootAtr == 0 ? '共通ルート' : objType.localizedName, index.toString(), '', '', a, a, a, a, a));
                                        });
                                    }
                                    return vmbase.ProcessHandler.orderByList(lstbyApp);
                                };
                                /**
                                 * find app phase
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.findAppPhase = function (phaseOrder, list) {
                                    return _.find(list, function (obj) {
                                        return obj.phaseOrder == phaseOrder;
                                    });
                                };
                                /**
                                 * find approver
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.findApprover = function (approverOrder, list) {
                                    return _.find(list, function (obj) {
                                        return obj.approverOrder == approverOrder;
                                    });
                                };
                                /**
                                 * find root
                                 * mode A: まとめて登録モード
                                 */
                                ScreenModel.prototype.findRoot = function (orderNumber, list) {
                                    return _.find(list, function (obj) {
                                        return obj.company.applicationType == orderNumber;
                                    });
                                };
                                /**
                                 * check Month/Day <10: insert 0
                                 */
                                ScreenModel.prototype.checkDate = function (value) {
                                    if (value < 10) {
                                        return '0' + value;
                                    }
                                    return value.toString();
                                };
                                /**
                                 * open dialog L: 未登録社員リスト
                                 */
                                ScreenModel.prototype.openDialogL = function () {
                                    setShared('CMM018L_PARAM', { sysAtr: this.systemAtr(), lstName: this.lstNameAppType() });
                                    modal("/view/cmm/018/l/index.xhtml");
                                };
                                /**
                                 * open dialog M: マスタリスト
                                 */
                                // openDialogM(){
                                // setShared('CMM018M_PARAM',{sysAtr: this.systemAtr(), lstName: this.lstNameAppType()});
                                // modal("/view/cmm/018/m/index.xhtml");
                                //}
                                /**
                                 * open dialog N: 承認者一覧
                                 */
                                ScreenModel.prototype.openDialogN = function () {
                                    setShared('CMM018N_PARAM', { sysAtr: this.systemAtr(), lstName: this.lstNameAppType() });
                                    modal("/view/cmm/018/n/index.xhtml");
                                };
                                ScreenModel.prototype.checkColor = function (lstAppPhase, int) {
                                    var check = false;
                                    _.each(lstAppPhase, function (appPhase, index) {
                                        if (appPhase.approvalForm != 0) {
                                            if ((index + 1) != int) {
                                                check = true;
                                            }
                                        }
                                    });
                                    return check;
                                };
                                ScreenModel.prototype.findType = function (empR, appType, confirm, notice, event) {
                                    switch (empR) {
                                        case 0:
                                            return null;
                                        case 1:
                                            return appType;
                                        case 2:
                                            return confirm;
                                        case 4:
                                            return notice;
                                        default:
                                            return event;
                                    }
                                };
                                return ScreenModel;
                            }());
                            viewmodelA.ScreenModel = ScreenModel;
                            var MODE_SYSTEM = 'SYSTEM_MODE';
                        })(viewmodelA = a_1.viewmodelA || (a_1.viewmodelA = {}));
                    })(a = cmm018.a || (cmm018.a = {}));
                })(cmm018 = view.cmm018 || (view.cmm018 = {}));
            })(view = com_1.view || (com_1.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm018.a.vm.js.map