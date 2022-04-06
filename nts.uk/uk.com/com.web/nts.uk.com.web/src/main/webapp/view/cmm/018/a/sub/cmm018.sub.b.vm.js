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
                        var sub;
                        (function (sub) {
                            var getText = nts.uk.resource.getText;
                            var servicebase = cmm018.shr.servicebase;
                            var vmbase = cmm018.shr.vmbase;
                            var getShared = nts.uk.ui.windows.getShared;
                            var setShared = nts.uk.ui.windows.setShared;
                            var modal = nts.uk.ui.windows.sub.modal;
                            var block = nts.uk.ui.block;
                            var dialog = nts.uk.ui.dialog;
                            /**
                             * =============mode B: 申請個別登録モード===========
                             * -------------viewmodelSubB---------------
                             * 申請個別登録モード
                             * Screen B,D,F
                             */
                            var viewmodelSubB;
                            (function (viewmodelSubB) {
                                var ScreenModel = /** @class */ (function () {
                                    function ScreenModel() {
                                        //-----SCREEN B
                                        //===================
                                        //===================
                                        this.selectedCode = ko.observableArray([]);
                                        this.singleSelectedCode = ko.observable('');
                                        this.lstNameAppType = ko.observableArray([]);
                                        this.dataSourceB = ko.observable(null);
                                        this.dataDisplay = ko.observableArray([]);
                                        //param transfer to dialog K
                                        this.approverInfor = ko.observableArray([]);
                                        this.confirmedPerson = ko.observable(null);
                                        this.selectTypeSet = ko.observable(0);
                                        //---display screen B
                                        this.cpA = ko.observableArray([]);
                                        this.historyStr = ko.observable('');
                                        this.nameCompany = ko.observable('');
                                        this.columns = ko.observableArray([{ headerText: "Item Code", width: "250px", key: 'approvalId', dataType: "number", hidden: true },
                                            { headerText: "Item Text", key: 'nameAppType', width: "200px", dataType: "string" }]);
                                        //--------data right: company
                                        this.comRoot = ko.observable(null);
                                        //__________Sidebar________
                                        this.tabSelectedB = ko.observable(0);
                                        this.lstCompany = ko.observableArray([]);
                                        this.lstWorkplace = ko.observableArray([]);
                                        this.lstPerson = ko.observableArray([]);
                                        //__________KCP009: 申請個別登録モード_____
                                        this.employeeId = ko.observable('');
                                        //_____________dialog I____
                                        this.dataIB = ko.observable(null);
                                        //_______CDL008_____
                                        this.workplaceIdB = ko.observable('');
                                        this.ENDDATE_LATEST = '9999/12/31';
                                        //_____button Edit History___
                                        this.enableDeleteB = ko.observable(false);
                                        this.enableCreatNewB = ko.observable(true);
                                        var self = this;
                                        //----SCREEN B
                                        //_____subcribe singleSelectedCode________
                                        self.singleSelectedCode.subscribe(function (codeChanged) {
                                            if (codeChanged == '-1' || codeChanged == '') {
                                                return;
                                            }
                                            //TH: company
                                            if (self.tabSelectedB() == 0) {
                                                self.enableCreatNewB(true);
                                                if (self.dataIB() != null) {
                                                    self.getDataCompanyPr();
                                                }
                                                var com_2 = self.findRootComB(codeChanged);
                                                //TH: item data
                                                if (com_2 != null && com_2 !== undefined) {
                                                    self.historyStr(com_2.company.startDate + '～' + com_2.company.endDate);
                                                    var name_1 = self.findNameApp(com_2.company.employmentRootAtr == 2 ? com_2.company.confirmationRootType : com_2.company.applicationType, com_2.company.employmentRootAtr);
                                                    var appPhase = __viewContext.viewModel.viewmodelA.checklist(com_2.lstAppPhase);
                                                    var color = com_2.lstAppPhase.length > 0 ? true : false;
                                                    var aaa = new vmbase.CompanyAppRootADto(color, com_2.company.employmentRootAtr, com_2.company.employmentRootAtr == 2 ? com_2.company.confirmationRootType : com_2.company.applicationType, name_1, com_2.company.approvalId, com_2.company.historyId, com_2.company.branchId, appPhase[0], appPhase[1], appPhase[2], appPhase[3], appPhase[4]);
                                                    self.comRoot(aaa);
                                                    self.enableDeleteB(true);
                                                }
                                                //TH: 1,2,appName
                                                else {
                                                    self.showItem(codeChanged);
                                                    self.enableDeleteB(false);
                                                }
                                            }
                                            //TH: work place
                                            else if (self.tabSelectedB() == 1) {
                                                self.enableCreatNewB(true);
                                                if (self.dataIB() != null) {
                                                    self.getDataWorkplacePr();
                                                }
                                                var wp = self.findRootWpD(codeChanged);
                                                if (wp != null && wp !== undefined) {
                                                    self.historyStr(wp.workplace.startDate + '～' + wp.workplace.endDate);
                                                    var name_2 = self.findNameApp(wp.workplace.employmentRootAtr == 2 ? wp.workplace.confirmationRootType : wp.workplace.applicationType, wp.workplace.employmentRootAtr);
                                                    var appPhase = __viewContext.viewModel.viewmodelA.checklist(wp.lstAppPhase);
                                                    var color = wp.lstAppPhase.length > 0 ? true : false;
                                                    var aaa = new vmbase.CompanyAppRootADto(color, wp.workplace.employmentRootAtr, wp.workplace.employmentRootAtr == 2 ? wp.workplace.confirmationRootType : wp.workplace.applicationType, name_2, wp.workplace.approvalId, wp.workplace.historyId, wp.workplace.branchId, appPhase[0], appPhase[1], appPhase[2], appPhase[3], appPhase[4]);
                                                    self.comRoot(aaa);
                                                    self.enableDeleteB(true);
                                                }
                                                //TH: 1,2,appName
                                                else {
                                                    self.showItem(codeChanged);
                                                    self.enableDeleteB(false);
                                                }
                                            }
                                            //TH: person
                                            else {
                                                self.enableCreatNewB(true);
                                                if (self.dataIB() != null) {
                                                    self.getDataPersonPr();
                                                }
                                                var ps = self.findRootPsF(codeChanged);
                                                if (ps != null && ps !== undefined) {
                                                    self.historyStr(ps.person.startDate + '～' + ps.person.endDate);
                                                    var name_3 = self.findNameApp(ps.person.employmentRootAtr == 2 ? ps.person.confirmationRootType : ps.person.applicationType, ps.person.employmentRootAtr);
                                                    var appPhase = __viewContext.viewModel.viewmodelA.checklist(ps.lstAppPhase);
                                                    var color = ps.lstAppPhase.length > 0 ? true : false;
                                                    var aaa = new vmbase.CompanyAppRootADto(color, ps.person.employmentRootAtr, ps.person.employmentRootAtr == 2 ? ps.person.confirmationRootType : ps.person.applicationType, name_3, ps.person.approvalId, ps.person.historyId, ps.person.branchId, appPhase[0], appPhase[1], appPhase[2], appPhase[3], appPhase[4]);
                                                    self.comRoot(aaa);
                                                    self.enableDeleteB(true);
                                                }
                                                //TH: 1,2,appName
                                                else {
                                                    self.showItem(codeChanged);
                                                    self.enableDeleteB(false);
                                                }
                                            }
                                            self.comRoot.valueHasMutated();
                                            __viewContext.viewModel.viewmodelSubA.reloadGridN([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                                            vmbase.ProcessHandler.resizeColumn([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                                        });
                                    }
                                    /**
                                     * get data company mode 申請個別
                                     */
                                    ScreenModel.prototype.getDataCompanyPr = function () {
                                        var self = this;
                                        block.invisible();
                                        var dfd = $.Deferred();
                                        var param = {
                                            /**システム区分*/
                                            systemAtr: vmbase.SystemAtr.WORK,
                                            /**就業ルート区分: 会社(0)　－　職場(1)　－　社員(2)*/
                                            rootType: vmbase.RootType.COMPANY,
                                            /**履歴ID*/
                                            workplaceId: '',
                                            /**社員ID*/
                                            employeeId: '',
                                            /**申請種類*/
                                            lstAppType: [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                                            /**届出種類ID*/
                                            lstNoticeID: [],
                                            /**プログラムID(インベント)*/
                                            lstEventID: []
                                        };
                                        servicebase.getAllDataPr(param).done(function (data) {
                                            var lstRoot = [];
                                            if (data == null || data === undefined || data.lstCompanyRoot.length == 0) {
                                                self.singleSelectedCode('');
                                                self.historyStr('');
                                                self.dataSourceB();
                                                self.cpA([]);
                                                self.lstCompany([]);
                                                self.singleSelectedCode(null);
                                                self.dataDisplay(self.convert(lstRoot));
                                                __viewContext.viewModel.viewmodelA.enableRegister(false);
                                                __viewContext.viewModel.viewmodelSubA.reloadGridN([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                                                vmbase.ProcessHandler.resizeColumn([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                                                block.clear();
                                                dfd.resolve();
                                                return dfd.promise();
                                            }
                                            __viewContext.viewModel.viewmodelA.enableRegister(true);
                                            self.dataSourceB(data);
                                            self.lstCompany(data.lstCompanyRoot);
                                            //list left
                                            _.each(self.lstCompany(), function (item) {
                                                lstRoot.push(new vmbase.DataCheckModeB(item.company.approvalId, item.company.startDate, item.company.endDate, item.company.applicationType, item.company.confirmationRootType, item.company.employmentRootAtr));
                                            });
                                            self.dataDisplay(self.convert(lstRoot));
                                            var a = null;
                                            if (self.dataIB() == null) {
                                                a = self.findRootComB(self.singleSelectedCode());
                                            }
                                            else {
                                                a = self.findHistByType(self.dataIB().lstAppType[0].value, self.dataIB().lstAppType[0].employRootAtr, self.dataIB().startDate, self.tabSelectedB());
                                            }
                                            if (a != undefined) {
                                                self.singleSelectedCode(a.company.approvalId);
                                            }
                                            __viewContext.viewModel.viewmodelSubA.reloadGridN([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                                            vmbase.ProcessHandler.resizeColumn([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                                            self.dataIB(null);
                                            block.clear();
                                            dfd.resolve();
                                        });
                                        return dfd.promise();
                                    };
                                    /**
                                     * get data work place mode 申請個別
                                     */
                                    ScreenModel.prototype.getDataWorkplacePr = function () {
                                        var self = this;
                                        block.invisible();
                                        var dfd = $.Deferred();
                                        var param = {
                                            /**システム区分*/
                                            systemAtr: vmbase.SystemAtr.WORK,
                                            /**就業ルート区分: 会社(0)　－　職場(1)　－　社員(2)*/
                                            rootType: vmbase.RootType.WORKPLACE,
                                            /**履歴ID*/
                                            workplaceId: self.workplaceIdB(),
                                            /**社員ID*/
                                            employeeId: '',
                                            /**申請種類*/
                                            lstAppType: [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                                            /**届出種類ID*/
                                            lstNoticeID: [],
                                            /**プログラムID(インベント)*/
                                            lstEventID: []
                                        };
                                        servicebase.getAllDataPr(param).done(function (data) {
                                            self.workplaceIdB(data.workplaceId);
                                            __viewContext.viewModel.viewmodelA.workplaceId(data.workplaceId);
                                            servicebase.getWkpDepInfo({ id: data.workplaceId, sysAtr: 0 }).done(function (wpInfo) {
                                                __viewContext.viewModel.viewmodelA.wpCode(wpInfo.code);
                                                __viewContext.viewModel.viewmodelA.wpName(wpInfo.name);
                                            });
                                            var lstRoot = [];
                                            if (data == null || data === undefined || data.lstWorkplaceRoot.length == 0) {
                                                self.singleSelectedCode('');
                                                self.historyStr('');
                                                self.dataSourceB();
                                                self.cpA([]);
                                                //                        self.singleSelectedCode(null);
                                                self.lstWorkplace([]);
                                                self.dataDisplay(self.convert(lstRoot));
                                                __viewContext.viewModel.viewmodelA.enableRegister(false);
                                                __viewContext.viewModel.viewmodelSubA.reloadGridN([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                                                vmbase.ProcessHandler.resizeColumn([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                                                block.clear();
                                                dfd.resolve();
                                                return dfd.promise();
                                            }
                                            __viewContext.viewModel.viewmodelA.enableRegister(true);
                                            self.dataSourceB(data);
                                            self.lstWorkplace(data.lstWorkplaceRoot);
                                            //list left
                                            _.each(self.lstWorkplace(), function (item) {
                                                lstRoot.push(new vmbase.DataCheckModeB(item.workplace.approvalId, item.workplace.startDate, item.workplace.endDate, item.workplace.applicationType, item.workplace.confirmationRootType, item.workplace.employmentRootAtr));
                                            });
                                            //list right
                                            var com = self.findRootWpD(self.singleSelectedCode());
                                            self.dataDisplay(self.convert(lstRoot));
                                            var a = null;
                                            if (self.dataIB() == null) {
                                                a = self.findRootWpD(self.singleSelectedCode());
                                            }
                                            else {
                                                a = self.findHistByType(self.dataIB().lstAppType[0].value, self.dataIB().lstAppType[0].employRootAtr, self.dataIB().startDate, self.tabSelectedB());
                                            }
                                            if (a != undefined) {
                                                self.singleSelectedCode(a.workplace.approvalId);
                                            }
                                            __viewContext.viewModel.viewmodelSubA.reloadGridN([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                                            vmbase.ProcessHandler.resizeColumn([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                                            self.dataIB(null);
                                            block.clear();
                                            dfd.resolve();
                                        }).fail(function () {
                                            block.clear();
                                        });
                                        return dfd.promise();
                                    };
                                    /**
                                     * get data person mode 申請個別
                                     */
                                    ScreenModel.prototype.getDataPersonPr = function () {
                                        var self = this;
                                        block.invisible();
                                        var dfd = $.Deferred();
                                        var param = {
                                            /**システム区分*/
                                            systemAtr: vmbase.SystemAtr.WORK,
                                            /**就業ルート区分: 会社(0)　－　職場(1)　－　社員(2)*/
                                            rootType: vmbase.RootType.PERSON,
                                            /**履歴ID*/
                                            workplaceId: '',
                                            /**社員ID*/
                                            employeeId: self.employeeId(),
                                            /**申請種類*/
                                            lstAppType: [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                                            /**届出種類ID*/
                                            lstNoticeID: [],
                                            /**プログラムID(インベント)*/
                                            lstEventID: []
                                        };
                                        servicebase.getAllDataPr(param).done(function (data) {
                                            var lstRoot = [];
                                            self.employeeId(data.employeeId);
                                            if (data == null || data === undefined || data.lstPersonRoot.length == 0) {
                                                self.singleSelectedCode('');
                                                self.historyStr('');
                                                self.dataSourceB();
                                                self.cpA([]);
                                                self.lstPerson([]);
                                                self.dataDisplay(self.convert(lstRoot));
                                                __viewContext.viewModel.viewmodelA.enableRegister(false);
                                                __viewContext.viewModel.viewmodelSubA.reloadGridN([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                                                vmbase.ProcessHandler.resizeColumn([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                                                block.clear();
                                                dfd.resolve();
                                                return dfd.promise();
                                            }
                                            __viewContext.viewModel.viewmodelA.enableRegister(true);
                                            self.dataSourceB(data);
                                            self.lstPerson(data.lstPersonRoot);
                                            //list left
                                            _.each(self.lstPerson(), function (item) {
                                                lstRoot.push(new vmbase.DataCheckModeB(item.person.approvalId, item.person.startDate, item.person.endDate, item.person.applicationType, item.person.confirmationRootType, item.person.employmentRootAtr));
                                            });
                                            //list right
                                            var com = self.findRootWpD(self.singleSelectedCode());
                                            self.dataDisplay(self.convert(lstRoot));
                                            var a = null;
                                            if (self.dataIB() == null) {
                                                a = self.findRootPsF(self.singleSelectedCode());
                                            }
                                            else {
                                                a = self.findHistByType(self.dataIB().lstAppType[0].value, self.dataIB().lstAppType[0].employRootAtr, self.dataIB().startDate, self.tabSelectedB());
                                            }
                                            if (a != null && a != undefined) {
                                                self.singleSelectedCode(a.person.approvalId);
                                            }
                                            __viewContext.viewModel.viewmodelSubA.reloadGridN([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                                            vmbase.ProcessHandler.resizeColumn([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                                            self.dataIB(null);
                                            block.clear();
                                            dfd.resolve();
                                        });
                                        return dfd.promise();
                                    };
                                    /**
                                     * find appType name
                                     * mode B: 申請個別登録モード
                                     */
                                    ScreenModel.prototype.findNameApp = function (applicationType, employmentRootAtr) {
                                        var self = this;
                                        if (applicationType == null && employmentRootAtr == 0) { //common
                                            return getText('CMM018_109');
                                        }
                                        var name = vmbase.ProcessHandler.findAppbyValue(applicationType, employmentRootAtr, self.lstNameAppType());
                                        return name.localizedName;
                                    };
                                    /**
                                     * find appType by name
                                     * mode B: 申請個別登録モード
                                     */
                                    ScreenModel.prototype.findAppbyName = function (name) {
                                        var self = this;
                                        return _.find(self.lstNameAppType(), function (obj) {
                                            return obj.localizedName == name;
                                        });
                                    };
                                    /**
                                     * find company root is selected
                                     * mode B: 申請個別登録モード
                                     */
                                    ScreenModel.prototype.findRootComB = function (value) {
                                        var self = this;
                                        return _.find(self.lstCompany(), function (obj) {
                                            return obj.company.approvalId == value;
                                        });
                                    };
                                    /**
                                     * find work place root is selected
                                     * mode B: 申請個別登録モード
                                     */
                                    ScreenModel.prototype.findRootWpD = function (value) {
                                        var self = this;
                                        return _.find(self.lstWorkplace(), function (obj) {
                                            return obj.workplace.approvalId == value;
                                        });
                                    };
                                    /**
                                     * find person root is selected
                                     * mode B: 申請個別登録モード
                                     */
                                    ScreenModel.prototype.findRootPsF = function (value) {
                                        var self = this;
                                        return _.find(self.lstPerson(), function (obj) {
                                            return obj.person.approvalId == value;
                                        });
                                    };
                                    /**
                                     * find history is selected
                                     * mode B: 申請個別登録モード
                                     */
                                    ScreenModel.prototype.findHist = function (approvalId, rootType) {
                                        var self = this;
                                        if (approvalId == '-1') {
                                            return self.dataIB();
                                        }
                                        //TH: company
                                        if (rootType == 0) {
                                            return _.find(self.lstCompany(), function (obj) {
                                                return obj.company.approvalId == approvalId;
                                            });
                                        }
                                        //TH: work place
                                        else if (rootType == 1) {
                                            return _.find(self.lstWorkplace(), function (obj) {
                                                return obj.workplace.approvalId == approvalId;
                                            });
                                        }
                                        //TH: person
                                        else {
                                            return _.find(self.lstPerson(), function (obj) {
                                                return obj.person.approvalId == approvalId;
                                            });
                                        }
                                    };
                                    ScreenModel.prototype.findHistByType = function (appType, employRootAtr, startDate, rootType) {
                                        var self = this;
                                        //TH: company
                                        if (rootType == 0) {
                                            return _.find(self.lstCompany(), function (obj) {
                                                return obj.company.applicationType == appType && obj.company.startDate == startDate && obj.company.employmentRootAtr == employRootAtr;
                                            });
                                        }
                                        //TH: work place
                                        else if (rootType == 1) {
                                            return _.find(self.lstWorkplace(), function (obj) {
                                                return obj.workplace.applicationType == appType && obj.workplace.startDate == startDate && obj.workplace.employmentRootAtr == employRootAtr;
                                            });
                                        }
                                        //TH: person
                                        else {
                                            return _.find(self.lstPerson(), function (obj) {
                                                return obj.person.applicationType == appType && obj.person.startDate == startDate && obj.person.employmentRootAtr == employRootAtr;
                                            });
                                        }
                                    };
                                    /**
                                     * find history best new
                                     * mode B: 申請個別登録モード
                                     */
                                    ScreenModel.prototype.findHistBestNew = function (appType, employRootAtr, rootType) {
                                        var self = this;
                                        //TH: company
                                        if (rootType == 0) {
                                            var rootType_1 = _.filter(self.lstCompany(), function (root) {
                                                var typeApp = employRootAtr == 2 ? root.company.confirmationRootType : root.company.applicationType;
                                                return root.company.employmentRootAtr == employRootAtr && typeApp == appType;
                                            });
                                            var lstCompany_1 = [];
                                            _.each(rootType_1, function (obj) {
                                                lstCompany_1.push(obj.company);
                                            });
                                            var lstHistorySort = _.orderBy(lstCompany_1, ["startDate"], ["desc"]);
                                            return lstCompany_1.length == 0 ? null : lstHistorySort[0];
                                        }
                                        //TH: work place
                                        else if (rootType == 1) {
                                            var rootType_2 = _.filter(self.lstWorkplace(), function (root) {
                                                var typeApp = employRootAtr == 2 ? root.workplace.confirmationRootType : root.workplace.applicationType;
                                                return typeApp == appType && root.workplace.employmentRootAtr == employRootAtr;
                                            });
                                            var lstWorkplace_1 = [];
                                            _.each(rootType_2, function (obj) {
                                                lstWorkplace_1.push(obj.workplace);
                                            });
                                            var lstHistorySort = _.orderBy(lstWorkplace_1, ["startDate"], ["desc"]);
                                            return lstWorkplace_1.length == 0 ? null : lstHistorySort[0];
                                        }
                                        //TH: person
                                        else {
                                            var rootType_3 = _.filter(self.lstPerson(), function (root) {
                                                var typeApp = employRootAtr == 2 ? root.person.confirmationRootType : root.person.applicationType;
                                                return typeApp == appType && root.person.employmentRootAtr == employRootAtr;
                                            });
                                            var lstPerson_1 = [];
                                            _.each(rootType_3, function (obj) {
                                                lstPerson_1.push(obj.person);
                                            });
                                            var lstHistorySort = _.orderBy(lstPerson_1, ["startDate"], ["desc"]);
                                            return lstPerson_1.length == 0 ? null : lstHistorySort[0];
                                        }
                                    };
                                    /**
                                     * convert data db to data display
                                     * mode B: 申請個別登録モード
                                     */
                                    ScreenModel.prototype.convert = function (root) {
                                        var self = this;
                                        var lstbyApp = [];
                                        var aa = []; //list tra ve
                                        var bb = [];
                                        var appCommon = [];
                                        //lay history cua common
                                        _.each(root, function (itemRoot) {
                                            if (itemRoot.applicationType == null && itemRoot.employmentRootAtr == 0) {
                                                appCommon.push(new vmbase.DataTree(itemRoot.approvalId, itemRoot.startDate + '～' + itemRoot.endDate, itemRoot.employmentRootAtr, []));
                                            }
                                        });
                                        aa.push(new vmbase.DataTreeB(getText('CMM018_109'), appCommon.length > 0 ? '●' + getText('CMM018_109') : getText('CMM018_109'), _.orderBy(appCommon, ["nameAppType"], ["desc"])));
                                        //lay theo don  
                                        _.each(self.lstNameAppType(), function (item) {
                                            var lstbyApp = [];
                                            _.each(root, function (itemRoot) {
                                                if (item.employRootAtr == 2 && item.value == itemRoot.confirmationRootType) { //confirm
                                                    lstbyApp.push(new vmbase.Com(itemRoot.approvalId, itemRoot.startDate + '～' + itemRoot.endDate, itemRoot.employmentRootAtr));
                                                }
                                                else if (item.value != 14 && item.value == itemRoot.applicationType && item.employRootAtr == itemRoot.employmentRootAtr) {
                                                    lstbyApp.push(new vmbase.Com(itemRoot.approvalId, itemRoot.startDate + '～' + itemRoot.endDate, itemRoot.employmentRootAtr));
                                                }
                                            });
                                            if (item.value != 14) {
                                                var nameApp = lstbyApp.length > 0 ? '●' + item.localizedName : item.localizedName;
                                                bb.push(new vmbase.DataTree(item.localizedName, nameApp, item.employRootAtr, _.orderBy(lstbyApp, ["nameAppType"], ["desc"])));
                                            }
                                        });
                                        var str = getText("CMM018_7");
                                        aa.push(new vmbase.DataTreeB(str, str, bb));
                                        return aa;
                                    };
                                    /**
                                     * register
                                     * mode B: 申請個別登録モード
                                     */
                                    ScreenModel.prototype.registerB = function () {
                                        block.invisible();
                                        var self = this;
                                        var appCur = self.findAppbyName(self.singleSelectedCode());
                                        if (self.singleSelectedCode() == null || self.singleSelectedCode() == getText('CMM018_109') ||
                                            self.singleSelectedCode() == getText("CMM018_7") || appCur != undefined) {
                                            dialog.alertError({ messageId: "Msg_181" }).then(function () {
                                                block.clear();
                                            });
                                            return;
                                        }
                                        var checkAddHist = false;
                                        var root = [];
                                        if (self.dataIB() != null) {
                                            checkAddHist = true;
                                        }
                                        root.push(self.comRoot());
                                        var history = self.findHist(self.singleSelectedCode(), self.tabSelectedB());
                                        var listType = [];
                                        var startDate = '';
                                        var endDate = '';
                                        if (self.tabSelectedB() == 0) {
                                            if (self.singleSelectedCode() == -1) {
                                                endDate = self.ENDDATE_LATEST;
                                                startDate = history.startDate;
                                                listType.push(new vmbase.ApplicationType(history.lstAppType[0].value, '', history.lstAppType[0].employRootAtr));
                                            }
                                            else {
                                                endDate = history.company.endDate;
                                                startDate = history.company.startDate;
                                                var typeS = history.company.employmentRootAtr == 2 ? history.company.confirmationRootType : history.company.applicationType;
                                                listType.push(new vmbase.ApplicationType(typeS, '', history.company.employmentRootAtr));
                                            }
                                        }
                                        else if (self.tabSelectedB() == 1) {
                                            if (self.singleSelectedCode() == -1) {
                                                endDate = self.ENDDATE_LATEST;
                                                startDate = history.startDate;
                                                listType.push(new vmbase.ApplicationType(history.lstAppType[0].value, '', history.lstAppType[0].employRootAtr));
                                            }
                                            else {
                                                endDate = history.workplace.endDate;
                                                startDate = history.workplace.startDate;
                                                var typeS = history.workplace.employmentRootAtr == 2 ? history.workplace.confirmationRootType : history.workplace.applicationType;
                                                listType.push(new vmbase.ApplicationType(typeS, '', history.workplace.employmentRootAtr));
                                            }
                                        }
                                        else {
                                            if (self.singleSelectedCode() == -1) {
                                                endDate = self.ENDDATE_LATEST;
                                                startDate = history.startDate;
                                                listType.push(new vmbase.ApplicationType(history.lstAppType[0].value, '', history.lstAppType[0].employRootAtr));
                                            }
                                            else {
                                                endDate = history.person.endDate;
                                                startDate = history.person.startDate;
                                                var typeS = history.person.employmentRootAtr == 2 ? history.person.confirmationRootType : history.person.applicationType;
                                                listType.push(new vmbase.ApplicationType(typeS, '', history.person.employmentRootAtr));
                                            }
                                        }
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
                                        var data = new vmbase.DataResigterDto(vmbase.SystemAtr.WORK, self.tabSelectedB(), checkAddHist, self.workplaceIdB(), self.employeeId(), startDate, endDate, self.dataIB(), listType, root, __viewContext.viewModel.viewmodelA.selectedModeCode());
                                        servicebase.updateRoot(data).done(function () {
                                            self.enableCreatNewB(true);
                                            block.clear();
                                            var lstRoot = [];
                                            if (self.tabSelectedB() == 0) { //company
                                                self.getDataCompanyPr();
                                            }
                                            else if (self.tabSelectedB() == 1) {
                                                self.getDataWorkplacePr();
                                            }
                                            else {
                                                self.getDataPersonPr();
                                            }
                                            dialog.info({ messageId: "Msg_15" });
                                        }).fail(function () {
                                            block.clear();
                                        });
                                    };
                                    /**
                                     * open dialog I
                                     * mode B: 申請個別登録モード
                                     */
                                    ScreenModel.prototype.openDialogI = function () {
                                        var self = this;
                                        block.grayout();
                                        var sDate = '';
                                        //履歴変更対象を選択しているチェックする
                                        var name = '';
                                        var typeApp = null;
                                        var employRootAtr = null;
                                        self.enableCreatNewB(false);
                                        var lstAppType = [];
                                        if (self.singleSelectedCode() == getText("CMM018_7") || self.singleSelectedCode() == null) { //2
                                            dialog.alertError({ messageId: "Msg_181" });
                                            block.clear();
                                            return;
                                        }
                                        var itemCurrent = self.findHist(self.singleSelectedCode(), self.tabSelectedB());
                                        if (itemCurrent == undefined) { //TH: chon name
                                            var obj = self.findAppbyName(self.singleSelectedCode());
                                            typeApp = obj == undefined ? null : obj.value;
                                            employRootAtr = obj == undefined ? 0 : obj.employRootAtr;
                                            var itemLast = self.findHistBestNew(typeApp, employRootAtr, self.tabSelectedB());
                                            if (itemLast != undefined) {
                                                sDate = itemLast.startDate;
                                            }
                                        }
                                        else { //chon item
                                            if (self.tabSelectedB() == 0) {
                                                if (itemCurrent !== undefined) {
                                                    if (self.singleSelectedCode() == '-1') {
                                                        typeApp = itemCurrent.lstAppType[0].value;
                                                        employRootAtr = itemCurrent.lstAppType[0].employRootAtr;
                                                    }
                                                    else {
                                                        typeApp = itemCurrent.company.employmentRootAtr == 2 ? itemCurrent.company.confirmationRootType : itemCurrent.company.applicationType;
                                                        employRootAtr = itemCurrent.company.employmentRootAtr;
                                                    }
                                                    var itemLast = self.findHistBestNew(typeApp, employRootAtr, self.tabSelectedB());
                                                    sDate = itemLast.startDate;
                                                }
                                            }
                                            else if (self.tabSelectedB() == 1) {
                                                if (itemCurrent !== undefined) {
                                                    if (self.singleSelectedCode() == '-1') {
                                                        typeApp = itemCurrent.lstAppType[0].value;
                                                        employRootAtr = itemCurrent.lstAppType[0].employRootAtr;
                                                    }
                                                    else {
                                                        typeApp = itemCurrent.workplace.employmentRootAtr == 2 ? itemCurrent.workplace.confirmationRootType : itemCurrent.workplace.applicationType;
                                                        employRootAtr = itemCurrent.workplace.employmentRootAtr;
                                                    }
                                                    var itemLast = self.findHistBestNew(typeApp, employRootAtr, self.tabSelectedB());
                                                    sDate = itemLast.startDate;
                                                }
                                            }
                                            else {
                                                if (itemCurrent !== undefined) {
                                                    if (self.singleSelectedCode() == '-1') {
                                                        typeApp = itemCurrent.lstAppType[0].value;
                                                        employRootAtr = itemCurrent.lstAppType[0].employRootAtr;
                                                    }
                                                    else {
                                                        typeApp = itemCurrent.person.employmentRootAtr == 2 ? itemCurrent.person.confirmationRootType : itemCurrent.person.applicationType;
                                                        employRootAtr = itemCurrent.person.employmentRootAtr;
                                                    }
                                                    var itemLast = self.findHistBestNew(typeApp, employRootAtr, self.tabSelectedB());
                                                    sDate = itemLast.startDate;
                                                }
                                            }
                                        }
                                        name = self.findNameApp(typeApp, employRootAtr);
                                        lstAppType.push(new vmbase.ApplicationType(typeApp, '', employRootAtr));
                                        var paramI = {
                                            name: name,
                                            startDate: sDate,
                                            check: self.tabSelectedB(),
                                            mode: 1,
                                            lstAppType: lstAppType,
                                            overLap: true
                                        };
                                        setShared('CMM018I_PARAM', paramI);
                                        modal("/view/cmm/018/i/index.xhtml").onClosed(function () {
                                            block.clear();
                                            var data = getShared('CMM018I_DATA');
                                            if (data == null) {
                                                self.enableCreatNewB(true);
                                                return;
                                            }
                                            var singleSelectedCodeOld = self.singleSelectedCode();
                                            self.enableDeleteB(false);
                                            __viewContext.viewModel.viewmodelA.enableRegister(true);
                                            self.dataIB(data);
                                            var lst = data.lstAppType;
                                            var data2 = [];
                                            var rangeDate = data.startDate + '～' + self.ENDDATE_LATEST;
                                            self.historyStr(rangeDate);
                                            var startDate = moment(data.startDate, 'YYYY/MM/DD').toDate();
                                            startDate.setDate(startDate.getDate() - 1);
                                            var month = __viewContext.viewModel.viewmodelA.checkDate(startDate.getMonth() + 1);
                                            var day = __viewContext.viewModel.viewmodelA.checkDate(startDate.getDate());
                                            var endDateNew = startDate.getFullYear() + '/' + month + '/' + day;
                                            var employRootAtr = data.lstAppType[0].employRootAtr;
                                            var appTypeValue = employRootAtr == 1 ? data.lstAppType[0].value : null;
                                            var confirmValue = employRootAtr == 2 ? data.lstAppType[0].value : null;
                                            var typeS = employRootAtr == 2 ? confirmValue : appTypeValue;
                                            if (!data.copyDataFlag) { //create new
                                                var app = vmbase.ProcessHandler.findAppbyValue(appTypeValue, employRootAtr, self.lstNameAppType());
                                                var b = new vmbase.ApprovalPhaseDto([], '', '', 0, '', 0, 0);
                                                self.comRoot(new vmbase.CompanyAppRootADto(false, employRootAtr, typeS, app == undefined ? getText('CMM018_109') : app.localizedName, '-1', '', '', b, b, b, b, b));
                                            }
                                            else {
                                                self.findHistoryLastofApp(typeS, employRootAtr); //list right
                                            }
                                            var histLast = self.findHistBestNew(appTypeValue, employRootAtr, self.tabSelectedB());
                                            if (histLast != null) {
                                                singleSelectedCodeOld = histLast.approvalId;
                                            }
                                            if (self.tabSelectedB() == 0) { //company
                                                var a_2 = null;
                                                _.each(self.lstCompany(), function (item) {
                                                    if (item.company.approvalId != singleSelectedCodeOld) { //bo them ls cua cai dang sua
                                                        data2.push(new vmbase.DataCheckModeB(item.company.approvalId, item.company.startDate, item.company.endDate, item.company.applicationType, item.company.confirmationRootType, item.company.employmentRootAtr));
                                                    }
                                                    else {
                                                        a_2 = new vmbase.DataCheckModeB(item.company.approvalId, item.company.startDate, item.company.endDate, item.company.applicationType, item.company.confirmationRootType, item.company.employmentRootAtr);
                                                    }
                                                });
                                                if (a_2 == null) { //loai don chua co lich su : them moi tu dau
                                                    var add = new vmbase.DataCheckModeB('-1', data.startDate, self.ENDDATE_LATEST, appTypeValue, confirmValue, employRootAtr);
                                                    data2.push(add);
                                                    self.dataDisplay(self.convert(data2));
                                                }
                                                else {
                                                    var add = new vmbase.DataCheckModeB('-1', data.startDate, self.ENDDATE_LATEST, a_2.applicationType, confirmValue, a_2.employmentRootAtr);
                                                    var old = new vmbase.DataCheckModeB(a_2.approvalId, a_2.startDate, endDateNew, a_2.applicationType, a_2.confirmationRootType, a_2.employmentRootAtr);
                                                    data2.push(add);
                                                    data2.push(old);
                                                    self.dataDisplay(self.convert(data2));
                                                    self.dataDisplay.valueHasMutated();
                                                }
                                            }
                                            else if (self.tabSelectedB() == 1) { //workplace
                                                var a_3 = null;
                                                _.each(self.lstWorkplace(), function (item) {
                                                    if (item.workplace.approvalId != singleSelectedCodeOld) { //bo them ls cua cai dang sua
                                                        data2.push(new vmbase.DataCheckModeB(item.workplace.approvalId, item.workplace.startDate, item.workplace.endDate, item.workplace.applicationType, item.workplace.confirmationRootType, item.workplace.employmentRootAtr));
                                                    }
                                                    else {
                                                        a_3 = new vmbase.DataCheckModeB(item.workplace.approvalId, item.workplace.startDate, item.workplace.endDate, item.workplace.applicationType, item.workplace.confirmationRootType, item.workplace.employmentRootAtr);
                                                    }
                                                });
                                                if (a_3 == null) { //loai don chua co lich su : them moi tu dau
                                                    var add = new vmbase.DataCheckModeB('-1', data.startDate, self.ENDDATE_LATEST, appTypeValue, confirmValue, employRootAtr);
                                                    data2.push(add);
                                                    self.dataDisplay(self.convert(data2));
                                                }
                                                else {
                                                    var add = new vmbase.DataCheckModeB('-1', data.startDate, self.ENDDATE_LATEST, a_3.applicationType, a_3.confirmationRootType, a_3.employmentRootAtr);
                                                    var old = new vmbase.DataCheckModeB(a_3.approvalId, a_3.startDate, endDateNew, a_3.applicationType, a_3.confirmationRootType, a_3.employmentRootAtr);
                                                    data2.push(add);
                                                    data2.push(old);
                                                    self.dataDisplay(self.convert(data2));
                                                    self.dataDisplay.valueHasMutated();
                                                }
                                            }
                                            else { //person
                                                var a_4 = null;
                                                _.each(self.lstPerson(), function (item) {
                                                    if (item.person.approvalId != singleSelectedCodeOld) { //bo them ls cua cai dang sua
                                                        data2.push(new vmbase.DataCheckModeB(item.person.approvalId, item.person.startDate, item.person.endDate, item.person.applicationType, item.person.confirmationRootType, item.person.employmentRootAtr));
                                                    }
                                                    else {
                                                        a_4 = new vmbase.DataCheckModeB(item.person.approvalId, item.person.startDate, item.person.endDate, item.person.applicationType, item.person.confirmationRootType, item.person.employmentRootAtr);
                                                    }
                                                });
                                                if (a_4 == null) { //loai don chua co lich su : them moi tu dau
                                                    var add = new vmbase.DataCheckModeB('-1', data.startDate, self.ENDDATE_LATEST, appTypeValue, confirmValue, employRootAtr);
                                                    data2.push(add);
                                                    self.dataDisplay(self.convert(data2));
                                                }
                                                else {
                                                    var add = new vmbase.DataCheckModeB('-1', data.startDate, self.ENDDATE_LATEST, a_4.applicationType, a_4.confirmationRootType, a_4.employmentRootAtr);
                                                    var old = new vmbase.DataCheckModeB(a_4.approvalId, a_4.startDate, endDateNew, a_4.applicationType, a_4.confirmationRootType, a_4.employmentRootAtr);
                                                    data2.push(add);
                                                    data2.push(old);
                                                    self.dataDisplay(self.convert(data2));
                                                    self.dataDisplay.valueHasMutated();
                                                }
                                            }
                                            self.singleSelectedCode('-1');
                                            __viewContext.viewModel.viewmodelSubA.reloadGridN([self.comRoot()], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                                        });
                                    };
                                    /**
                                     * open dialog J
                                     * mode B: 申請個別登録モード
                                     */
                                    ScreenModel.prototype.openDialogJ = function () {
                                        var self = this;
                                        block.grayout();
                                        var history;
                                        var startDate = '';
                                        var endDate = '';
                                        var name = '';
                                        var historyId = '';
                                        var approvalId = '';
                                        var appType;
                                        var employRootAtr;
                                        if (self.tabSelectedB() == 0) { //company
                                            history = self.findRootComB(self.singleSelectedCode());
                                            if (history != undefined) {
                                                historyId = history.company.historyId;
                                                approvalId = history.company.approvalId;
                                                startDate = history.company.startDate;
                                                endDate = history.company.endDate;
                                                appType = history.company.employmentRootAtr == 2 ? history.company.confirmationRootType : history.company.applicationType;
                                                employRootAtr = history.company.employmentRootAtr;
                                            }
                                        }
                                        else if (self.tabSelectedB() == 1) {
                                            history = self.findRootWpD(self.singleSelectedCode());
                                            if (history != undefined) {
                                                historyId = history.workplace.historyId;
                                                approvalId = history.workplace.approvalId;
                                                startDate = history.workplace.startDate;
                                                endDate = history.workplace.endDate;
                                                appType = history.workplace.employmentRootAtr == 2 ? history.workplace.confirmationRootType : history.workplace.applicationType;
                                                employRootAtr = history.workplace.employmentRootAtr;
                                            }
                                        }
                                        else {
                                            history = self.findRootPsF(self.singleSelectedCode());
                                            if (history != undefined) {
                                                historyId = history.person.historyId;
                                                approvalId = history.person.approvalId;
                                                startDate = history.person.startDate;
                                                endDate = history.person.endDate;
                                                appType = history.person.employmentRootAtr == 2 ? history.person.confirmationRootType : history.person.applicationType;
                                                employRootAtr = history.person.employmentRootAtr;
                                            }
                                        }
                                        //履歴変更対象を選択しているチェックする(check có chọn đối tượng sửa lịch sử hay không ?)
                                        //対象未選択、申請ごとのルートを選択している場合(chưa chọn đối tượng, hoặc đang chọn 申請ごとのルート)
                                        if (history == undefined) {
                                            //エラーメッセージ(Msg_181)(error message (Msg_181))
                                            dialog.alertError({ messageId: "Msg_181" });
                                            block.clear();
                                            return;
                                        }
                                        //編集する期間が最新なのかチェックする(check lịch sử đang sửa có phải lịch sử mới nhất hay không)
                                        //編集する履歴が最新履歴じゃない(lịch sử đang sửa không phải là lịch sử mới nhất)
                                        //                self.findHistBestNew();
                                        if (endDate != self.ENDDATE_LATEST) {
                                            //エラーメッセージ(Msg_154)(error message (Msg_154))
                                            dialog.alertError({ messageId: "Msg_154" });
                                            block.clear();
                                            return;
                                        }
                                        var lst = [];
                                        lst.push(new vmbase.UpdateHistoryDto(approvalId, historyId, appType, employRootAtr));
                                        name = self.findNameApp(appType, employRootAtr);
                                        var paramJ = {
                                            name: name,
                                            startDate: startDate,
                                            endDate: endDate,
                                            workplaceId: self.workplaceIdB(),
                                            employeeId: self.employeeId(),
                                            check: self.tabSelectedB(),
                                            mode: 1,
                                            lstUpdate: lst,
                                            sysAtr: 0
                                        };
                                        setShared('CMM018J_PARAM', paramJ);
                                        modal("/view/cmm/018/j/index.xhtml").onClosed(function () {
                                            block.clear();
                                            var cancel = getShared('CMM018J_OUTPUT');
                                            if (cancel != undefined && cancel.cancel) {
                                                return;
                                            }
                                            var currentCodeSingle = self.singleSelectedCode();
                                            if (self.tabSelectedB() == 0) {
                                                self.getDataCompanyPr().done(function () {
                                                    _.forEach(self.deepToApprovalId(currentCodeSingle), function (el) {
                                                        self.singleSelectedCode(el);
                                                    });
                                                });
                                            }
                                            else if (self.tabSelectedB() == 1) {
                                                self.getDataWorkplacePr().done(function () {
                                                    _.forEach(self.deepToApprovalId(currentCodeSingle), function (el) {
                                                        self.singleSelectedCode(el);
                                                    });
                                                });
                                            }
                                            else {
                                                self.getDataPersonPr().done(function () {
                                                    _.forEach(self.deepToApprovalId(currentCodeSingle), function (el) {
                                                        self.singleSelectedCode(el);
                                                    });
                                                });
                                            }
                                        });
                                    };
                                    ScreenModel.prototype.deepToApprovalId = function (approvalId) {
                                        var self = this;
                                        var listResult = [];
                                        var displayData = self.dataDisplay();
                                        _.forEach(displayData, function (el) {
                                            if (el.approvalId == approvalId) {
                                                listResult.push(el.approvalId);
                                            }
                                            if (!_.isEmpty(el.lstbyApp)) {
                                                _.forEach(el.lstbyApp, function (el1) {
                                                    if (el1.approvalId == approvalId) {
                                                        listResult.push(el.approvalId);
                                                        listResult.push(el1.approvalId);
                                                    }
                                                    if (!_.isEmpty(el1.lstbyApp)) {
                                                        _.forEach(el1.lstbyApp, function (el2) {
                                                            if (el2.approvalId == approvalId) {
                                                                listResult.push(el.approvalId);
                                                                listResult.push(el1.approvalId);
                                                                listResult.push(el2.approvalId);
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                        return listResult;
                                    };
                                    ScreenModel.prototype.findRootByEndDate = function (endDate, appType, employRootAtr, rootType) {
                                        var self = this;
                                        if (rootType == 0) {
                                            return _.find(self.lstCompany(), function (root) {
                                                return root.company.applicationType == appType && root.company.endDate == endDate && root.company.employmentRootAtr;
                                            });
                                        }
                                        else if (rootType == 1) {
                                            return _.find(self.lstWorkplace(), function (root) {
                                                return root.workplace.applicationType == appType && root.workplace.endDate == endDate && root.workplace.employmentRootAtr;
                                            });
                                        }
                                        else {
                                            return _.find(self.lstPerson(), function (root) {
                                                return root.person.applicationType == appType && root.person.endDate == endDate && root.person.employmentRootAtr;
                                            });
                                        }
                                    };
                                    /**
                                     * subscribe tab selected
                                     * mode B: 申請個別登録モード
                                     */
                                    ScreenModel.prototype.checkTabSelectedB = function (codeChanged, id) {
                                        var self = this;
                                        var mode = __viewContext.viewModel.viewmodelA.selectedModeCode();
                                        if (mode == 0) { //まとめて登録モード
                                            return;
                                        }
                                        self.historyStr('');
                                        self.singleSelectedCode(null);
                                        self.dataDisplay([]);
                                        self.enableCreatNewB(true);
                                        var lstRoot = [];
                                        //TH: tab company
                                        if (codeChanged == vmbase.RootType.COMPANY) {
                                            self.tabSelectedB(vmbase.RootType.COMPANY);
                                            self.getDataCompanyPr().done(function (data) {
                                                //list left
                                                _.each(self.lstCompany(), function (item) {
                                                    lstRoot.push(new vmbase.DataCheckModeB(item.company.approvalId, item.company.startDate, item.company.endDate, item.company.applicationType, item.company.confirmationRootType, item.company.employmentRootAtr));
                                                });
                                                //list right
                                                var com = self.findRootComB(self.singleSelectedCode());
                                                self.dataDisplay(self.convert(lstRoot));
                                            });
                                            ;
                                        }
                                        //TH: tab work place
                                        else if (codeChanged == vmbase.RootType.WORKPLACE) {
                                            self.tabSelectedB(vmbase.RootType.WORKPLACE);
                                            self.workplaceIdB(id);
                                            self.getDataWorkplacePr();
                                        }
                                        //TH: tab person
                                        else {
                                            self.tabSelectedB(2);
                                            self.employeeId(id);
                                            self.getDataPersonPr();
                                        }
                                        var b = new vmbase.ApprovalPhaseDto([], '', '', 0, '', 0, 0);
                                        var a = new vmbase.CompanyAppRootADto(false, 1, 0, '', '', '', '', b, b, b, b, b);
                                        __viewContext.viewModel.viewmodelSubA.reloadGridN([a], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                                        vmbase.ProcessHandler.resizeColumn([a], self.tabSelectedB(), vmbase.MODE.SHINSEI);
                                    };
                                    /**
                                     * display item right TH 1,2,appName
                                     */
                                    ScreenModel.prototype.showItem = function (codeChanged) {
                                        var self = this;
                                        self.historyStr('');
                                        var employRootAtr;
                                        var b = new vmbase.ApprovalPhaseDto([], '', '', 0, '', 0, 0);
                                        if (codeChanged == null) {
                                            var a_5 = new vmbase.CompanyAppRootADto(false, 0, 0, '', '', '', '', b, b, b, b, b);
                                            self.comRoot(a_5);
                                        }
                                        if (codeChanged == getText('CMM018_109')) { //1
                                            var a_6 = new vmbase.CompanyAppRootADto(false, 0, 0, codeChanged, '', '', '', b, b, b, b, b);
                                            self.comRoot(a_6);
                                        }
                                        else if (codeChanged == getText("CMM018_7") || codeChanged == null) { //2 | not selected
                                            var a_7 = new vmbase.CompanyAppRootADto(false, 1, 0, '', '', '', '', b, b, b, b, b);
                                            self.comRoot(a_7);
                                        }
                                        else { //appName
                                            //find item current
                                            var value = self.findAppbyName(codeChanged);
                                            var a1 = new vmbase.CompanyAppRootADto(false, value.employRootAtr, value.value, value.localizedName, '', '', '', b, b, b, b, b);
                                            self.comRoot(a1);
                                        }
                                    };
                                    ScreenModel.prototype.findHistoryLastofApp = function (appType, employRootAtr) {
                                        var self = this;
                                        var histLast = self.findHistBestNew(appType, employRootAtr, self.tabSelectedB());
                                        var value = vmbase.ProcessHandler.findAppbyValue(appType, employRootAtr, self.lstNameAppType());
                                        if (value == undefined) {
                                            value = new vmbase.ApplicationType(null, getText('CMM018_109'), 0);
                                        }
                                        var b = new vmbase.ApprovalPhaseDto([], '', '', 0, '', 0, 0);
                                        if (histLast == null) {
                                            self.comRoot(new vmbase.CompanyAppRootADto(false, value.employRootAtr, value.value, value.localizedName, '', '', '', b, b, b, b, b));
                                        }
                                        else {
                                            var histNew = null;
                                            if (self.tabSelectedB() == vmbase.RootType.COMPANY) { //company
                                                histNew = self.findRootComB(histLast.approvalId);
                                            }
                                            else if (self.tabSelectedB() == vmbase.RootType.WORKPLACE) { //workplace
                                                histNew = self.findRootWpD(histLast.approvalId);
                                            }
                                            else { //person
                                                histNew = self.findRootPsF(histLast.approvalId);
                                            }
                                            var lstAppPhase = __viewContext.viewModel.viewmodelA.checklist(histNew.lstAppPhase);
                                            var rootNew = new vmbase.CompanyAppRootADto(histNew == undefined ? false : true, employRootAtr, appType, value == undefined ? getText('CMM018_109') : value.localizedName, '', '', '', lstAppPhase[0], lstAppPhase[1], lstAppPhase[2], lstAppPhase[3], lstAppPhase[4]);
                                            self.comRoot(rootNew);
                                        }
                                    };
                                    return ScreenModel;
                                }());
                                viewmodelSubB.ScreenModel = ScreenModel;
                            })(viewmodelSubB = sub.viewmodelSubB || (sub.viewmodelSubB = {}));
                        })(sub = a_1.sub || (a_1.sub = {}));
                    })(a = cmm018.a || (cmm018.a = {}));
                })(cmm018 = view.cmm018 || (view.cmm018 = {}));
            })(view = com_1.view || (com_1.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm018.sub.b.vm.js.map