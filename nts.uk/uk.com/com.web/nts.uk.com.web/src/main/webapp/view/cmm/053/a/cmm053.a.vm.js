var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm053;
                (function (cmm053) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var getText = nts.uk.resource.getText;
                            var setShared = nts.uk.ui.windows.setShared;
                            var block = nts.uk.ui.block;
                            var dialog = nts.uk.ui.dialog;
                            var modal = nts.uk.ui.windows.sub.modal;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.settingManager = ko.observable(new SettingManager({
                                        startDate: '',
                                        endDate: '',
                                        isNewMode: false,
                                        departmentCode: '',
                                        departmentApproverId: '',
                                        departmentName: '',
                                        dailyApprovalCode: '',
                                        dailyApproverId: '',
                                        dailyApprovalName: '',
                                        hasAuthority: false,
                                        closingStartDate: ''
                                    }));
                                    this.screenMode = ko.observable(EXECUTE_MODE.NEW_MODE);
                                    this.baseDate = ko.observable(new Date());
                                    //___________KCP009______________
                                    this.employeeInputList = ko.observableArray([]);
                                    this.systemReference = ko.observable(SystemType.EMPLOYMENT);
                                    this.isDisplayOrganizationName = ko.observable(true);
                                    this.targetBtnText = getText("KCP009_3");
                                    this.selectedItem = ko.observable(null);
                                    this.tabindex = -1;
                                    this.isInitDepartment = true;
                                    this.isInitdailyApproval = true;
                                    this.displayDailyApprover = ko.observable(false);
                                    this.checkClearErrAll = ko.observable(false);
                                    this.errA27 = ko.observable("");
                                    this.errA210 = ko.observable("");
                                    this.checkChangeA27A210 = ko.observable(false);
                                    var self = this;
                                    //_____CCG001________
                                    self.selectedEmployee = ko.observableArray([]);
                                    self.showinfoSelectedEmployee = ko.observable(false);
                                    self.ccgcomponent = {
                                        /** Common properties */
                                        systemType: 2,
                                        showEmployeeSelection: true,
                                        showQuickSearchTab: true,
                                        showAdvancedSearchTab: true,
                                        showBaseDate: true,
                                        showClosure: false,
                                        showAllClosure: false,
                                        showPeriod: false,
                                        periodFormatYM: false,
                                        /** Required parameter */
                                        baseDate: moment().toISOString(),
                                        periodStartDate: moment().toISOString(),
                                        periodEndDate: moment().toISOString(),
                                        inService: true,
                                        //休職区分
                                        leaveOfAbsence: false,
                                        //休業区分
                                        closed: false,
                                        //退職区分
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
                                        /**
                                        * Self-defined function: Return data from CCG001
                                        * @param: data: the data return from CCG001
                                        */
                                        returnDataFromCcg001: function (data) {
                                            self.showinfoSelectedEmployee(true);
                                            self.selectedEmployee(data.listEmployee);
                                            self.convertEmployeeCcg01ToKcp009(data.listEmployee);
                                            self.initScreen();
                                        }
                                    };
                                    $('#ccgcomponent').ntsGroupComponent(self.ccgcomponent);
                                    //選択社員を切り替える
                                    self.selectedItem.subscribe(function (newValue) {
                                        if (newValue) {
                                            block.invisible();
                                            self.initScreen();
                                        }
                                    });
                                    //社員コードを入力する A2_7
                                    self.settingManager().departmentCode.subscribe(function (value) {
                                        if ($('#A2_7').ntsError('hasError')) {
                                            self.settingManager().departmentApproverId('');
                                            self.settingManager().departmentName('');
                                            return;
                                        }
                                        if (value != '' && value != null && value !== undefined &&
                                            (value.length == __viewContext.primitiveValueConstraints.EmployeeCode.maxLength || __viewContext.primitiveValueConstraints.EmployeeCode.maxLength == 0)) {
                                            self.getEmployeeByCode(value, APPROVER_TYPE.DEPARTMENT_APPROVER);
                                        }
                                        self.isInitDepartment = false;
                                    });
                                    //社員コードを入力する A2_10
                                    self.settingManager().dailyApprovalCode.subscribe(function (value) {
                                        if ($('#A2_10').ntsError('hasError')) {
                                            self.settingManager().dailyApproverId("");
                                            self.settingManager().dailyApprovalName("");
                                            return;
                                        }
                                        if (value != '' && value != null && value !== undefined &&
                                            (value.length == __viewContext.primitiveValueConstraints.EmployeeCode.maxLength || __viewContext.primitiveValueConstraints.EmployeeCode.maxLength == 0)) {
                                            self.getEmployeeByCode(value, APPROVER_TYPE.DAILY_APPROVER);
                                        }
                                        else {
                                            self.settingManager().dailyApproverId("");
                                            self.settingManager().dailyApprovalName("");
                                        }
                                        self.isInitdailyApproval = false;
                                    });
                                    //keyup :TH nhap gia tri cu + truoc do co err -> set lai err
                                    $(document).on('keyup', '#A2_7, #A2_10', function (evt) {
                                        if ($(evt.target).attr('id') == 'A2_7') {
                                            _.defer(function () {
                                                self.checkChangeA27A210(evt.target.value != '' && (evt.target.value != self.settingManager().departmentCode()));
                                                if (evt.target.value == self.settingManager().departmentCode() && self.errA27() != '') {
                                                    $('#A2_7').ntsError('set', { messageId: self.errA27() });
                                                }
                                            });
                                        }
                                        else {
                                            _.defer(function () {
                                                self.checkChangeA27A210(evt.target.value != '' && evt.target.value != self.settingManager().dailyApprovalCode());
                                                if (evt.target.value == self.settingManager().dailyApprovalCode() && self.errA210() != '') {
                                                    $('#A2_10').ntsError('set', { messageId: self.errA210() });
                                                }
                                            });
                                        }
                                    });
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    a.service.getInfoEmLogin().done(function (employeeInfo) {
                                        a.service.getWpName().done(function (wpName) {
                                            self.employeeInputList.push(new EmployeeKcp009(employeeInfo.sid, employeeInfo.employeeCode, employeeInfo.employeeName, wpName.name, wpName.name));
                                            self.initKCP009();
                                        });
                                    });
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                //起動する
                                ScreenModel.prototype.initScreen = function () {
                                    var self = this;
                                    if (!self.selectedItem()) {
                                        return;
                                    }
                                    nts.uk.ui.errors.clearAll();
                                    self.checkClearErrAll(true);
                                    self.errA27('');
                                    self.errA210('');
                                    self.settingManager().employeeId(self.selectedItem());
                                    a.service.getSettingManager(self.selectedItem()).done(function (result) {
                                        if (result) {
                                            self.isInitDepartment = true;
                                            self.isInitdailyApproval = true;
                                            self.settingManager().startDate(result.startDate);
                                            self.settingManager().endDate(result.endDate);
                                            self.settingManager().departmentCode(result.departmentCode);
                                            self.settingManager().departmentApproverId(result.departmentApproverId);
                                            self.settingManager().dailyApprovalCode(result.dailyApprovalCode);
                                            self.settingManager().dailyApproverId(result.dailyApproverId);
                                            self.settingManager().departmentName(result.departmentName);
                                            self.settingManager().dailyApprovalName(result.dailyApprovalName);
                                            self.settingManager().closingStartDate(result.closingStartDate);
                                            self.settingManager().hasAuthority(result.hasAuthority);
                                            self.settingManager().hasHistory(!result.newMode);
                                            self.displayDailyApprover(result.displayDailyApprover);
                                            if (result.newMode) {
                                                self.settingNewMode();
                                            }
                                            else {
                                                self.screenMode(EXECUTE_MODE.UPDATE_MODE);
                                                //フォーカス制御
                                                $('#A2_7').focus();
                                            }
                                        }
                                        self.checkClearErrAll(false);
                                        block.clear();
                                    });
                                };
                                //新規する
                                //「新規」ボタンを押下
                                ScreenModel.prototype.addSettingManager_click = function (data) {
                                    var self = this;
                                    if (self.checkChangeA27A210()) {
                                        self.checkClearErrAll(true);
                                    }
                                    else {
                                        self.checkClearErrAll(false);
                                    }
                                    nts.uk.ui.errors.clearAll();
                                    self.errA27('');
                                    self.errA210('');
                                    self.settingNewMode();
                                };
                                //登録する
                                //「登録」ボタンをクリックする
                                ScreenModel.prototype.regSettingManager_click = function (data) {
                                    var self = this;
                                    $('.nts-input').trigger("validate");
                                    if (!nts.uk.ui.errors.hasError()) {
                                        var startDate_1 = new Date(self.settingManager().startDate());
                                        var closingStartDate_1 = new Date(self.settingManager().closingStartDate());
                                        var $vm = ko.dataFor(document.querySelector('#function-panel'));
                                        var paramcheckReg = {
                                            codeA16: $vm.empDisplayCode(),
                                            codeA27: self.settingManager().departmentCode(),
                                            codeA210: self.displayDailyApprover() ? self.settingManager().dailyApprovalCode() : "",
                                            baseDate: moment(new Date(self.settingManager().startDate())).format('YYYY/MM/DD')
                                        };
                                        block.invisible();
                                        a.service.checkBfReg(paramcheckReg).done(function (result) {
                                            if (result.errFlg) { //エラーがある場合
                                                if (result.errA27) {
                                                    $('#A2_7').ntsError('clear');
                                                    $('#A2_7').ntsError('set', { messageId: result.msgId });
                                                }
                                                if (result.errA210) {
                                                    $('#A2_10').ntsError('clear');
                                                    $('#A2_10').ntsError('set', { messageId: result.msgId });
                                                }
                                                block.clear();
                                                return;
                                            }
                                            if (!nts.uk.ui.errors.hasError()) {
                                                var command = ko.toJS(self.settingManager());
                                                command.startDate = moment.utc(self.settingManager().startDate(), "YYYY/MM/DD").toISOString();
                                                command.endDate = moment.utc(self.settingManager().endDate(), "YYYY/MM/DD").toISOString();
                                                if (command.dailyApprovalCode == null || command.dailyApprovalCode === undefined
                                                    || nts.uk.text.isNullOrEmpty(command.dailyApprovalCode.trim()) || !self.displayDailyApprover()) {
                                                    command.dailyApproverId = '';
                                                }
                                                if (self.screenMode() == EXECUTE_MODE.UPDATE_MODE && self.settingManager().hasHistory()) {
                                                    self.callUpdateHistoryService(command);
                                                }
                                                else if (self.screenMode() == EXECUTE_MODE.NEW_MODE) {
                                                    //開始日＜締めの開始日 
                                                    if (startDate_1 < closingStartDate_1 && !(self.screenMode() == EXECUTE_MODE.UPDATE_MODE && self.settingManager().hasHistory())) {
                                                        closingStartDate_1 = nts.uk.time.formatDate(closingStartDate_1, 'yyyy/MM/dd');
                                                        //エラーメッセージ（Msg_1072）
                                                        dialog.alertError({ messageId: "Msg_1072", messageParams: [closingStartDate_1] }).then(function () {
                                                            block.clear();
                                                        });
                                                    }
                                                    else {
                                                        self.callInsertHistoryService(command);
                                                    }
                                                }
                                            }
                                        }).fail(function () {
                                            block.clear();
                                        });
                                    }
                                    else {
                                        self.callInsertHistoryService(command);
                                    }
                                };
                                //削除する
                                //「削除」ボタンをクリックする
                                ScreenModel.prototype.delSettingManager_click = function (data) {
                                    var self = this;
                                    block.invisible();
                                    //確認メッセージ（Msg_18）を表示する
                                    dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        self.settingManager().employeeId(self.selectedItem());
                                        var settingManager = ko.toJS(self.settingManager());
                                        settingManager.startDate = moment.utc(self.settingManager().startDate(), "YYYY/MM/DD").toISOString();
                                        settingManager.endDate = moment.utc(self.settingManager().endDate(), "YYYY/MM/DD").toISOString();
                                        a.service.deleteHistoryByManagerSetting(settingManager).done(function (result) {
                                            //情報メッセージ　Msg-16を表示する
                                            dialog.info({ messageId: "Msg_16" }).then(function () {
                                                self.initScreen();
                                            });
                                        }).always(function () {
                                            block.clear();
                                        });
                                    }).then(function () {
                                        block.clear();
                                    });
                                };
                                ScreenModel.prototype.callInsertHistoryService = function (command) {
                                    var self = this;
                                    block.invisible();
                                    a.service.insertHistoryByManagerSetting(command).done(function (result) {
                                        //情報メッセージMsg_15
                                        dialog.info({ messageId: "Msg_15" }).then(function () {
                                            self.initScreen();
                                            self.isInitDepartment = false;
                                            self.isInitdailyApproval = false;
                                        });
                                        block.clear();
                                    }).fail(function (error) {
                                        block.clear();
                                        dialog.alertError({ messageId: error.messageId });
                                    });
                                };
                                ScreenModel.prototype.callUpdateHistoryService = function (command) {
                                    var self = this;
                                    block.invisible();
                                    a.service.updateHistoryByManagerSetting(command).done(function (result) {
                                        //情報メッセージMsg_15
                                        dialog.info({ messageId: "Msg_15" }).then(function () {
                                            self.initScreen();
                                            self.isInitDepartment = false;
                                            self.isInitdailyApproval = false;
                                        });
                                        block.clear();
                                    }).fail(function (error) {
                                        block.clear();
                                        dialog.alertError({ messageId: error.messageId });
                                    });
                                };
                                //「過去履歴」ボタンをクリックする
                                ScreenModel.prototype.openCMM053b = function () {
                                    var self = this;
                                    setShared('CMM053A_employeeId', self.selectedItem());
                                    modal("/view/cmm/053/b/index.xhtml").onClosed(function () {
                                    });
                                };
                                //社員コードを入力する
                                ScreenModel.prototype.getEmployeeByCode = function (employeeCode, approverType) {
                                    var self = this;
                                    var paramFind = {
                                        employeeCode: employeeCode,
                                        hasAuthority: self.settingManager().hasAuthority(),
                                        baseDate: moment.utc(self.settingManager().startDate(), "YYYY/MM/DD").toISOString()
                                    };
                                    a.service.getEmployeeByCode(paramFind).done(function (result) {
                                        self.checkChangeA27A210(false);
                                        if (self.checkClearErrAll()) {
                                            self.settingManager().departmentName('');
                                            self.settingManager().dailyApprovalName('');
                                            self.checkClearErrAll(false);
                                        }
                                        else if (result) {
                                            if (approverType == APPROVER_TYPE.DEPARTMENT_APPROVER) {
                                                self.settingManager().departmentName(result.businessName);
                                                self.settingManager().departmentApproverId(result.employeeID);
                                                self.errA27('');
                                            }
                                            else if (approverType == APPROVER_TYPE.DAILY_APPROVER) {
                                                self.settingManager().dailyApprovalName(result.businessName);
                                                self.settingManager().dailyApproverId(result.employeeID);
                                                self.errA210('');
                                            }
                                        }
                                    }).fail(function (error) {
                                        self.checkChangeA27A210(false);
                                        if (self.checkClearErrAll()) {
                                            nts.uk.ui.errors.clearAll();
                                            self.checkClearErrAll(false);
                                        }
                                        else {
                                            if (approverType == APPROVER_TYPE.DEPARTMENT_APPROVER) {
                                                $('#A2_7').ntsError('clear');
                                                self.settingManager().departmentName('');
                                                $('#A2_7').ntsError('set', { messageId: error.messageId });
                                                self.errA27(error.messageId);
                                            }
                                            else {
                                                $('#A2_10').ntsError('clear');
                                                self.settingManager().dailyApprovalName('');
                                                $('#A2_10').ntsError('set', { messageId: error.messageId });
                                                self.errA210(error.messageId);
                                            }
                                        }
                                    });
                                };
                                ScreenModel.prototype.settingNewMode = function () {
                                    var self = this;
                                    //最初履歴がない場合
                                    if (!self.settingManager().hasHistory()) {
                                        self.settingManager().startDate(self.settingManager().closingStartDate());
                                    }
                                    else {
                                        self.settingManager().startDate('');
                                    }
                                    //画面をクリアする
                                    self.settingManager().endDate('');
                                    self.settingManager().departmentApproverId('');
                                    self.settingManager().departmentCode('');
                                    self.settingManager().departmentName('');
                                    self.settingManager().dailyApproverId('');
                                    self.settingManager().dailyApprovalCode('');
                                    self.settingManager().dailyApprovalName('');
                                    //画面を新規モードにする
                                    self.screenMode(EXECUTE_MODE.NEW_MODE);
                                    //フォーカス制御
                                    $('#A2_3').focus();
                                };
                                ScreenModel.prototype.initKCP009 = function () {
                                    var self = this;
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
                                    $('#emp-component').ntsLoadListComponent(self.listComponentOption);
                                };
                                ScreenModel.prototype.convertEmployeeCcg01ToKcp009 = function (dataList) {
                                    var self = this;
                                    self.employeeInputList([]);
                                    _.each(dataList, function (item) {
                                        self.employeeInputList.push(new EmployeeKcp009(item.employeeId, item.employeeCode, item.employeeName, item.affiliationName, ""));
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
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var EXECUTE_MODE;
                            (function (EXECUTE_MODE) {
                                EXECUTE_MODE[EXECUTE_MODE["NEW_MODE"] = 0] = "NEW_MODE";
                                EXECUTE_MODE[EXECUTE_MODE["UPDATE_MODE"] = 1] = "UPDATE_MODE";
                                EXECUTE_MODE[EXECUTE_MODE["DELETE_MODE"] = 2] = "DELETE_MODE";
                            })(EXECUTE_MODE = viewmodel.EXECUTE_MODE || (viewmodel.EXECUTE_MODE = {}));
                            var APPROVER_TYPE;
                            (function (APPROVER_TYPE) {
                                APPROVER_TYPE[APPROVER_TYPE["DEPARTMENT_APPROVER"] = 0] = "DEPARTMENT_APPROVER";
                                APPROVER_TYPE[APPROVER_TYPE["DAILY_APPROVER"] = 1] = "DAILY_APPROVER";
                            })(APPROVER_TYPE = viewmodel.APPROVER_TYPE || (viewmodel.APPROVER_TYPE = {}));
                            var SettingManager = /** @class */ (function () {
                                function SettingManager(param) {
                                    this.startDate = ko.observable('');
                                    this.endDate = ko.observable('');
                                    this.isNewMode = ko.observable(false);
                                    this.departmentCode = ko.observable('');
                                    this.departmentApproverId = ko.observable('');
                                    this.departmentName = ko.observable('');
                                    this.dailyApprovalCode = ko.observable('');
                                    this.dailyApproverId = ko.observable('');
                                    this.dailyApprovalName = ko.observable('');
                                    this.hasAuthority = ko.observable(false);
                                    this.closingStartDate = ko.observable('');
                                    this.employeeId = ko.observable('');
                                    this.hasHistory = ko.observable(false);
                                    var self = this;
                                    self.startDate(param.startDate);
                                    self.endDate(param.endDate);
                                    self.isNewMode(param.isNewMode);
                                    self.departmentCode(param.departmentCode);
                                    self.departmentApproverId(param.departmentApproverId);
                                    self.departmentName(param.departmentName);
                                    self.dailyApprovalCode(param.dailyApprovalCode);
                                    self.dailyApproverId(param.dailyApproverId);
                                    self.dailyApprovalName(param.dailyApprovalName);
                                    self.hasAuthority(param.hasAuthority);
                                    self.closingStartDate(param.closingStartDate);
                                }
                                return SettingManager;
                            }());
                            viewmodel.SettingManager = SettingManager;
                            var PersonApproval = /** @class */ (function () {
                                function PersonApproval(param) {
                                    this.anyItemApplicationId = ko.observable('');
                                    this.applicationType = ko.observable('');
                                    this.approvalId = ko.observable('');
                                    this.branchId = ko.observable('');
                                    this.companyId = ko.observable('');
                                    this.confirmationRootType = ko.observable('');
                                    this.employeeId = ko.observable('');
                                    this.employmentRootAtr = ko.observable('');
                                    this.endDate = ko.observable('');
                                    this.historyId = ko.observable('');
                                    this.startDate = ko.observable('');
                                    var self = this;
                                    self.anyItemApplicationId(param.anyItemApplicationId);
                                    self.applicationType(param.applicationType);
                                    self.approvalId(param.approvalId);
                                    self.branchId(param.branchId);
                                    self.companyId(param.companyId);
                                    self.confirmationRootType(param.confirmationRootType);
                                    self.employeeId(param.employeeId);
                                    self.employmentRootAtr(param.employmentRootAtr);
                                    self.endDate(param.endDate);
                                    self.historyId(param.historyId);
                                    self.startDate(param.startDate);
                                }
                                return PersonApproval;
                            }());
                            viewmodel.PersonApproval = PersonApproval;
                            var EmployeeKcp009 = /** @class */ (function () {
                                function EmployeeKcp009(id, code, businessName, workplaceName, depName) {
                                    this.id = id;
                                    this.code = code;
                                    this.businessName = businessName;
                                    this.workplaceName = workplaceName;
                                    this.depName = depName;
                                }
                                return EmployeeKcp009;
                            }());
                            viewmodel.EmployeeKcp009 = EmployeeKcp009;
                            var SystemType = /** @class */ (function () {
                                function SystemType() {
                                }
                                SystemType.EMPLOYMENT = 1;
                                SystemType.SALARY = 2;
                                SystemType.PERSONNEL = 3;
                                SystemType.ACCOUNTING = 4;
                                SystemType.OH = 6;
                                return SystemType;
                            }());
                            viewmodel.SystemType = SystemType;
                            var STATUS_SUBSCRIBE;
                            (function (STATUS_SUBSCRIBE) {
                                STATUS_SUBSCRIBE[STATUS_SUBSCRIBE["PENDING"] = 0] = "PENDING";
                                STATUS_SUBSCRIBE[STATUS_SUBSCRIBE["DONE"] = 1] = "DONE";
                                STATUS_SUBSCRIBE[STATUS_SUBSCRIBE["FAIL"] = 2] = "FAIL";
                            })(STATUS_SUBSCRIBE = viewmodel.STATUS_SUBSCRIBE || (viewmodel.STATUS_SUBSCRIBE = {}));
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cmm053.a || (cmm053.a = {}));
                })(cmm053 = view.cmm053 || (view.cmm053 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm053.a.vm.js.map