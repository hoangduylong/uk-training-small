var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf004;
                (function (cmf004) {
                    var b;
                    (function (b) {
                        var viewmodel;
                        (function (viewmodel) {
                            var getText = nts.uk.resource.getText;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var dialog = nts.uk.ui.dialog;
                            var block = nts.uk.ui.block;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.stepList = [
                                        { content: '.step-1' },
                                        { content: '.step-2' },
                                        { content: '.step-3' },
                                        { content: '.step-4' }
                                    ];
                                    this.stepSelected = ko.observable({ id: 'step-1', content: '.step-1' });
                                    this.activeStep = ko.observable(0);
                                    this.selectedId = ko.observable(1);
                                    this.options = ko.observableArray([
                                        { value: 1, text: getText('CMF004_30') },
                                        { value: 2, text: getText('CMF004_32') }
                                    ]);
                                    //ScreenB
                                    this.startDateString = ko.observable("");
                                    this.endDateString = ko.observable("");
                                    this.dataRecoverySelection = ko.observable(new DataRecoverySelection(1, 0, {}, [], null));
                                    //upload file
                                    this.fileId = ko.observable(null);
                                    this.fileName = ko.observable(null);
                                    //Screen E, F, G, H
                                    this.dataRecoveryProcessId = ko.observable(null);
                                    this.recoverySourceFile = ko.observable("");
                                    this.recoverySourceCode = ko.observable("");
                                    this.recoverySourceName = ko.observable("");
                                    this.supplementaryExplanation = ko.observable("");
                                    this.saveForm = ko.observable("");
                                    //Screen E
                                    this.dataContentConfirm = ko.observable(new DataContentConfirm([], 0));
                                    this.switchRules = ko.observableArray([
                                        { code: 1, name: getText('CMF004_472') },
                                        { code: 2, name: getText('CMF004_473') }
                                    ]);
                                    this.selectedRuleCode = ko.observable(1);
                                    this.checkboxChk = ko.observable(false);
                                    this.pwdCompressEdt = {
                                        value: ko.observable(''),
                                        enable: ko.observable(true),
                                        required: ko.observable(true)
                                    };
                                    this.pwdConfirmEdt = {
                                        value: ko.observable(''),
                                        enable: ko.observable(true),
                                        required: ko.observable(true)
                                    };
                                    this.explanationValue = ko.observable('');
                                    this.output = ko.observableArray([]);
                                    this.pwdConstraint = ko.observable('');
                                    //Screen F
                                    this.changeDataRecoveryPeriod = ko.observable(new ChangeDataRecoveryPeriod([]));
                                    this.selectedEmployee = ko.observableArray([]);
                                    this.selectedEmployeeCodeScreenG = ko.observableArray([]);
                                    this.employeeListScreenG = ko.observableArray([]);
                                    this.recoveryMethodOptions = ko.observableArray([
                                        { value: RecoveryMethod.RESTORE_ALL, text: getText('CMF004_92') },
                                        { value: RecoveryMethod.SELECTED_RANGE, text: getText('CMF004_93') }
                                    ]);
                                    this.datePickerEnb = ko.observable(true);
                                    this.dateValue = ko.observable(new DateValueDto());
                                    //Screen H
                                    this.buton_I_enable = ko.observable(true);
                                    this.recoveryMethodDescription1 = ko.observable("");
                                    this.recoveryMethodDescription2 = ko.observable("");
                                    this.dataRecoverySummary = ko.observable(new DataRecoverySummary([], 0, [], []));
                                    this.selectedEmployeeCodeScreenH = ko.observableArray([]);
                                    this.employeeListScreenH = ko.observableArray([]);
                                    this.buttonProceed = ko.observable(true);
                                    this.categoryListOld = [];
                                    this.periodValueArr = [
                                        { period: PeriodValue.DAY, format: "YYYY/MM/DD" },
                                        { period: PeriodValue.MONTH, format: "YYYY/MM" },
                                        { period: PeriodValue.YEAR, format: "YYYY" },
                                        { period: PeriodValue.FULLTIME }
                                    ];
                                    var self = this;
                                    //Fixed table
                                    if (/Chrome/.test(navigator.userAgent)) {
                                        $("#E4_1").ntsFixedTable({ height: 164, width: 715 });
                                        $("#F4_1").ntsFixedTable({ height: 184, width: 715 });
                                        $("#H4_1").ntsFixedTable({ height: 164, width: 700 });
                                    }
                                    else {
                                        $("#E4_1").ntsFixedTable({ height: 165, width: 715 });
                                        $("#F4_1").ntsFixedTable({ height: 184, width: 715 });
                                        $("#H4_1").ntsFixedTable({ height: 164, width: 700 });
                                    }
                                    //_____KCP005G________
                                    self.kcp005ComponentOptionScreenG = {
                                        isShowAlreadySet: false,
                                        isMultiSelect: true,
                                        listType: ListType.EMPLOYEE,
                                        employeeInputList: self.employeeListScreenG,
                                        selectType: SelectType.SELECT_BY_SELECTED_CODE,
                                        selectedCode: self.selectedEmployeeCodeScreenG,
                                        isDialog: false,
                                        isShowNoSelectRow: false,
                                        alreadySettingList: ko.observableArray([]),
                                        isShowWorkPlaceName: false,
                                        isShowSelectAllButton: true,
                                        maxRows: 15,
                                        tabindex: -1
                                    };
                                    //_____KCP005H________
                                    self.kcp005ComponentOptionScreenH = {
                                        isShowAlreadySet: false,
                                        isMultiSelect: false,
                                        listType: ListType.EMPLOYEE,
                                        employeeInputList: self.employeeListScreenH,
                                        selectType: SelectType.SELECT_BY_SELECTED_CODE,
                                        selectedCode: self.selectedEmployeeCodeScreenH,
                                        isDialog: false,
                                        isShowNoSelectRow: false,
                                        alreadySettingList: ko.observableArray([]),
                                        isShowWorkPlaceName: false,
                                        isShowSelectAllButton: false,
                                        maxRows: 20,
                                        tabindex: -1
                                    };
                                    // CCG001
                                    self.ccg001ComponentOption = {
                                        /** Common properties */
                                        systemType: 1,
                                        showEmployeeSelection: true,
                                        showQuickSearchTab: true,
                                        showAdvancedSearchTab: true,
                                        showBaseDate: true,
                                        showClosure: true,
                                        showAllClosure: true,
                                        showPeriod: true,
                                        periodFormatYM: false,
                                        /** Required parameter */
                                        baseDate: moment().format("YYYY-MM-DD"),
                                        periodStartDate: moment().format("YYYY-MM-DD"),
                                        periodEndDate: moment().format("YYYY-MM-DD"),
                                        inService: true,
                                        leaveOfAbsence: true,
                                        closed: true,
                                        retirement: true,
                                        /** Quick search tab options */
                                        showAllReferableEmployee: true,
                                        showOnlyMe: true,
                                        showSameDepartment: true,
                                        showSameDepartmentAndChild: true,
                                        showSameWorkplace: true,
                                        showSameWorkplaceAndChild: true,
                                        /** Advanced search properties */
                                        showEmployment: true,
                                        showDepartment: true,
                                        showWorkplace: true,
                                        showClassification: true,
                                        showJobTitle: true,
                                        showWorktype: true,
                                        isMutipleCheck: true,
                                        returnDataFromCcg001: function (data) {
                                            self.employeeListScreenG.removeAll();
                                            var employeeData = [];
                                            _.forEach(data.listEmployee, function (x) {
                                                employeeData.push({ code: x.employeeCode, name: x.employeeName, id: x.employeeId });
                                            });
                                            employeeData = _.sortBy(employeeData, ["code"]);
                                            self.employeeListScreenG(employeeData);
                                            self.updateKcp005ScreenG(self.dataContentConfirm().selectedRecoveryMethod() === 0);
                                        }
                                    };
                                    self.startDateString.subscribe(function (value) {
                                        self.dataRecoverySelection().executePeriodInput().startDate = value;
                                        self.dataRecoverySelection().executePeriodInput.valueHasMutated();
                                    });
                                    self.endDateString.subscribe(function (value) {
                                        self.dataRecoverySelection().executePeriodInput().endDate = value;
                                        self.dataRecoverySelection().executePeriodInput.valueHasMutated();
                                    });
                                    //New code
                                    self.dataRecoverySelection().selectedUploadCls.subscribe(function (value) {
                                        if (value == 1) {
                                            nts.uk.ui.errors.clearAll();
                                        }
                                    });
                                    //End new code
                                    self.dataContentConfirm().dataContentcategoryList.subscribe(function (value) {
                                        self.setWidthScrollHeader('.contentE', value);
                                    });
                                    self.changeDataRecoveryPeriod().changeDataCategoryList.subscribe(function (value) {
                                        self.setWidthScrollHeader('.contentF', value);
                                    });
                                    self.dataRecoverySummary().recoveryCategoryList.subscribe(function (value) {
                                        self.setWidthScrollHeader('.contentH', value);
                                    });
                                    self.dataContentConfirm().selectedRecoveryMethod.subscribe(function (value) {
                                        self.updateKcp005ScreenG(value === 0);
                                    });
                                    self.output.subscribe(function (value) {
                                        _.forEach(value, function (x, i) {
                                            var chosen = self.dataContentConfirm().dataContentcategoryList()
                                                .filter(function (d) { return Number(d.categoryId()) === Number(x.categoryTable.categoryId); }).pop();
                                            if (chosen) {
                                                chosen.isRecover(x.systemChargeCategory);
                                                chosen.iscanNotBeOld(x.systemChargeCategory);
                                            }
                                        });
                                    });
                                    self.checkboxChk.subscribe(function (value) {
                                        if (value) {
                                            self.pwdConstraint('FileCompressionPassword');
                                            self.pwdConstraint.valueHasMutated();
                                            $(".password-input").trigger("validate");
                                        }
                                        else {
                                            self.pwdConstraint("");
                                            self.pwdConstraint.valueHasMutated();
                                            self.pwdCompressEdt.value("");
                                            self.pwdConfirmEdt.value("");
                                            $('.password-input').ntsError('clear');
                                        }
                                    });
                                }
                                ScreenModel.prototype.openHandleFileDialog = function (continueShowHandleDialog, doUpload) {
                                    var _this = this;
                                    if (doUpload === void 0) { doUpload = true; }
                                    var self = this;
                                    if (!continueShowHandleDialog) {
                                        $('#E4_1').focus();
                                        return;
                                    }
                                    nts.uk.ui.windows.sub.modal('../c/index.xhtml').onClosed(function () {
                                        setShared("CMF004_D_PARAMS", getShared("CMF004_D_PARAMS"));
                                        if (doUpload) {
                                            nts.uk.ui.windows.sub.modal('../d/index.xhtml').onClosed(function () {
                                                if (getShared("CMF004_E_PARAMS")) {
                                                    var recoveryInfo = getShared("CMF004_E_PARAMS");
                                                    if (recoveryInfo) {
                                                        var self_1 = _this;
                                                        if (recoveryInfo.continuteProcessing) {
                                                            self_1.dataRecoverySelection().selectedRecoveryFile(recoveryInfo.storeProcessingId);
                                                            self_1.recoveryProcessingId = recoveryInfo.processingId;
                                                            self_1.initScreenE();
                                                            $('#data-recovery-wizard').ntsWizard("next");
                                                            $('#E4_1').focus();
                                                            return;
                                                        }
                                                        else {
                                                            if (recoveryInfo.continueShowHandleDialog)
                                                                self_1.openHandleFileDialog(true);
                                                        }
                                                    }
                                                }
                                                $('#E4_1').focus();
                                            });
                                        }
                                        else {
                                            var passwordInfo = getShared("CMF004_D_PARAMS");
                                            if (passwordInfo.continuteProcessing) {
                                                self.initScreenE();
                                                $('#data-recovery-wizard').ntsWizard("next");
                                                $('#E4_1').focus();
                                            }
                                            else {
                                                if (passwordInfo.message) {
                                                    dialog.alertError({ messageId: passwordInfo.message });
                                                }
                                            }
                                        }
                                        $('#E4_1').focus();
                                    });
                                };
                                ScreenModel.prototype.finished = function (fileInfo) {
                                    var self = this;
                                    if (fileInfo.id != null && fileInfo.originalName != null) {
                                        setShared("CMF004lParams", {
                                            fileId: fileInfo.id,
                                            fileName: fileInfo.originalName,
                                            fromServerFile: false
                                        }, true);
                                        self.openHandleFileDialog(true);
                                    }
                                };
                                ScreenModel.prototype.setWidthScrollHeader = function (frame, value) {
                                    if (value.length > 5) {
                                        $(frame + ' .scroll-header.nts-fixed-header').css('width', '17px');
                                    }
                                    else {
                                        $(frame + ' .scroll-header.nts-fixed-header').css('width', '0px');
                                    }
                                };
                                ScreenModel.prototype.initWizardScreen = function () {
                                    var self = this;
                                    self.initScreenB();
                                };
                                /**
                                 * B: データ復旧選択
                                 */
                                ScreenModel.prototype.initScreenB = function () {
                                    var self = this;
                                    block.invisible();
                                    self.startDateString(moment.utc().subtract(1, "M").add(1, "d").format("YYYY/MM/DD"));
                                    self.endDateString(moment.utc().format("YYYY/MM/DD"));
                                    var paramSearch = {
                                        startDate: moment.utc(self.dataRecoverySelection().executePeriodInput().startDate, "YYYY/MM/DD hh:mm:ss").toISOString(),
                                        endDate: moment.utc(self.dataRecoverySelection().executePeriodInput().endDate, "YYYY/MM/DD hh:mm:ss").add(1, "d").add(-1, "s").toISOString()
                                    };
                                    b.service.findDataRecoverySelection(paramSearch).done(function (data) {
                                        if (data && data.length) {
                                            var recoveryFileList = [];
                                            for (var i_1 = 0; i_1 < data.length; i_1++) {
                                                var itemTarget = {
                                                    saveSetCode: data[i_1].code == null ? '' : data[i_1].code,
                                                    saveSetName: data[i_1].name,
                                                    supplementaryExplanation: data[i_1].suppleExplanation,
                                                    storageStartDate: moment.utc(data[i_1].saveStartDatetime).format('YYYY/MM/DD HH:mm:ss'),
                                                    executeCategory: (data[i_1].saveForm) == 0 ? getText('CMF004_300') : getText('CMF004_301'),
                                                    targetNumber: data[i_1].targetNumberPeople + "人",
                                                    saveFileName: data[i_1].saveFileName + ".zip",
                                                    fileId: data[i_1].fileId,
                                                    storeProcessingId: data[i_1].storeProcessingId
                                                };
                                                recoveryFileList.push(itemTarget);
                                            }
                                            self.dataRecoverySelection().recoveryFileList(recoveryFileList);
                                        }
                                    }).always(function () {
                                        block.clear();
                                        $("#B3_1").focus();
                                    });
                                };
                                ScreenModel.prototype.searchDataRecovery = function () {
                                    var self = this;
                                    $("#daterangepicker_b4_3 .ntsDatepicker").trigger("validate");
                                    if (!nts.uk.ui.errors.hasError()) {
                                        block.invisible();
                                        var paramSearch = {
                                            startDate: moment.utc(self.dataRecoverySelection().executePeriodInput().startDate, "YYYY/MM/DD hh:mm:ss").toISOString(),
                                            endDate: moment.utc(self.dataRecoverySelection().executePeriodInput().endDate, "YYYY/MM/DD hh:mm:ss").add(1, "d").add(-1, "s").toISOString()
                                        };
                                        self.dataRecoverySelection().recoveryFileList.removeAll();
                                        b.service.findDataRecoverySelection(paramSearch).done(function (data) {
                                            if (data && data.length) {
                                                var recoveryFileList = [];
                                                for (var i_2 = 0; i_2 < data.length; i_2++) {
                                                    var itemTarget = {
                                                        saveSetCode: data[i_2].code ? data[i_2].code : '',
                                                        saveSetName: data[i_2].name,
                                                        supplementaryExplanation: data[i_2].suppleExplanation,
                                                        storageStartDate: moment.utc(data[i_2].saveStartDatetime).format('YYYY/MM/DD HH:mm:ss'),
                                                        executeCategory: (data[i_2].saveForm) == 0 ? getText('CMF004_300') : getText('CMF004_301'),
                                                        targetNumber: data[i_2].targetNumberPeople + "人",
                                                        saveFileName: data[i_2].saveFileName + ".zip",
                                                        fileId: data[i_2].fileId,
                                                        storeProcessingId: data[i_2].storeProcessingId
                                                    };
                                                    recoveryFileList.push(itemTarget);
                                                }
                                                self.dataRecoverySelection().recoveryFileList(recoveryFileList);
                                            }
                                            self.dataRecoverySelection().selectedRecoveryFile("");
                                        }).always(function () {
                                            block.clear();
                                        });
                                    }
                                };
                                /**
                                 * E:データ内容確認
                                 */
                                ScreenModel.prototype.initScreenE = function () {
                                    var self = this;
                                    block.invisible();
                                    //Get Data TableList for Screen E
                                    b.service.setScreenItem(self.dataRecoverySelection().selectedRecoveryFile()).done(function (data) {
                                        self.itemSets = data;
                                        var listCategory = [];
                                        if (data && data.length) {
                                            _.each(data, function (c, i) {
                                                var x = c.categoryTable;
                                                var rowNumber = i + 1;
                                                var iscanNotBeOld = c.systemChargeCategory;
                                                var isRecover = c.systemChargeCategory;
                                                var categoryName = x.categoryName;
                                                var categoryId = x.categoryId;
                                                var recoveryPeriod = x.retentionPeriodCls;
                                                var startOfPeriod = x.saveDateFrom;
                                                var endOfPeriod = x.saveDateTo;
                                                var recoveryMethod = x.storageRangeSaved == 1 ? getText('CMF004_305') : getText('CMF004_306');
                                                var systemType = x.systemType;
                                                var saveSetName = x.saveSetName;
                                                listCategory.push(new CategoryInfo(rowNumber, isRecover, categoryId, categoryName, recoveryPeriod, startOfPeriod, endOfPeriod, recoveryMethod, iscanNotBeOld, systemType, saveSetName));
                                            });
                                            self.dataContentConfirm().dataContentcategoryList(listCategory);
                                            self.recoverySourceFile(data[0].categoryTable.compressedFileName + '.zip');
                                            self.recoverySourceCode(data[0].categoryTable.patternCode);
                                            self.recoverySourceName(data[0].categoryTable.saveSetName);
                                            self.saveForm(data[0].categoryTable.saveForm);
                                            self.supplementaryExplanation(data[0].categoryTable.supplementaryExplanation);
                                        }
                                    }).always(function () {
                                        block.clear();
                                    });
                                };
                                ScreenModel.prototype.getTextRecovery = function (recoveryPeriod) {
                                    if (recoveryPeriod() === 0)
                                        return getText("Enum_TimeStore_FULL_TIME");
                                    if (recoveryPeriod() === 3)
                                        return getText("Enum_TimeStore_ANNUAL");
                                    if (recoveryPeriod() === 2)
                                        return getText("Enum_TimeStore_MONTHLY");
                                    if (recoveryPeriod() === 1)
                                        return getText("Enum_TimeStore_DAILY");
                                };
                                ScreenModel.prototype.getSystemType = function (systemType) {
                                    switch (systemType) {
                                        case 0: return getText("Enum_SystemType_PERSON_SYSTEM");
                                        case 1: return getText("Enum_SystemType_ATTENDANCE_SYSTEM");
                                        case 2: return getText("Enum_SystemType_PAYROLL_SYSTEM");
                                        case 3: return getText("Enum_SystemType_OFFICE_HELPER");
                                    }
                                };
                                ScreenModel.prototype.isCheckboxActive = function () {
                                    var self = this;
                                    var isActive = self.selectedRuleCode() === 1 && self.checkboxChk();
                                    if (!isActive) {
                                        nts.uk.ui.errors.clearAll();
                                    }
                                    return isActive;
                                };
                                ScreenModel.prototype.configEdt = function (val) {
                                    var self = this;
                                    self.pwdCompressEdt.enable(val);
                                    self.pwdConfirmEdt.enable(val);
                                    if (!val) {
                                        nts.uk.ui.errors.clearAll();
                                    }
                                };
                                /**
                                 * F:データ復旧期間変更
                                 */
                                ScreenModel.prototype.initScreenF = function () {
                                    var self = this;
                                };
                                ScreenModel.prototype.initScreenG = function () {
                                    var self = this;
                                    block.invisible();
                                    //Get Data PerformDataRecover for Screen KCP 005
                                    var param = {
                                        itemSets: self.itemSets,
                                        dataRecoveryProcessId: self.recoveryProcessingId
                                    };
                                    b.service.findPerformDataRecover(param).done(function (data) {
                                        if (data.targets) {
                                            self.employeeListScreenG.removeAll();
                                            var employeeData_1 = [];
                                            _.forEach(data.targets, function (x) {
                                                employeeData_1.push({ code: x.scd, name: x.bussinessName, id: x.sid });
                                            });
                                            employeeData_1 = _.sortBy(employeeData_1, ["code"]);
                                            self.employeeListScreenG(employeeData_1);
                                            $('#kcp005component .nts-gridlist').attr('tabindex', -1);
                                            self.updateKcp005ScreenG(self.dataContentConfirm().selectedRecoveryMethod() === 0);
                                        }
                                        self.dateValue().dateRange({ startDate: data.dailyFrom, endDate: data.dailyTo });
                                        self.dateValue().monthRange({ startDate: data.monthlyFrom, endDate: data.monthlyTo });
                                        self.dateValue().yearRange({ startDate: data.annualFrom, endDate: data.annualTo });
                                        self.dateValue.valueHasMutated();
                                    }).always(function () {
                                        block.clear();
                                    });
                                    $('#kcp005component .ntsSearchBox').attr('tabindex', -1);
                                    $('#kcp005component').find(':button').each(function () {
                                        $(this).attr('tabindex', -1);
                                    });
                                    $('#G4_3').ntsGroupComponent(self.ccg001ComponentOption);
                                };
                                ScreenModel.prototype.updateKcp005ScreenG = function (val) {
                                    var self = this;
                                    self.kcp005ComponentOptionScreenG.selectType = 2;
                                    self.kcp005ComponentOptionScreenG.disableSelection = val;
                                    $('#kcp005component').ntsListComponent(self.kcp005ComponentOptionScreenG);
                                };
                                /**
                                 * H:データ復旧サマリ
                                 */
                                ScreenModel.prototype.initScreenH = function () {
                                    var self = this;
                                    // check recovery method
                                    var recoveryMethod = self.dataContentConfirm().selectedRecoveryMethod();
                                    var _listCategory = self.dataContentConfirm().dataContentcategoryList();
                                    // _.forEach(_listCategory, (x, i) => {
                                    //     let isRecover = true;
                                    //     if (!x.iscanNotBeOld() || !x.isRecover()) {
                                    //         isRecover = false;
                                    //     }
                                    //     let isEnablePeriod = recoveryMethod == RecoveryMethod.SELECTED_RANGE ? true : false;
                                    //     _itemList.push(new CategoryInfo(i + 1, isRecover, x.categoryId(), x.categoryName(), x.recoveryPeriod(),
                                    //         x.startOfPeriod(), x.endOfPeriod(), x.recoveryMethod(), isEnablePeriod, x.systemType(), x.saveSetName()));
                                    // });
                                    self.changeDataRecoveryPeriod().changeDataCategoryList(_listCategory);
                                    self.categoryListOld = ko.toJS(_listCategory);
                                    // $('#kcp005component1 div[id*="horizontalScrollContainer"]').remove();
                                    var _categoryList = self.getRecoveryCategory(self.changeDataRecoveryPeriod().changeDataCategoryList())
                                        .filter(function (data) { return data.isRecover() && data.iscanNotBeOld(); });
                                    if (_categoryList.length > 0) {
                                        // _.forEach(_categoryList, categoryItem => {
                                        //     let a = categoryItem;
                                        //     categoryItem.startOfPeriod(self.formatDate(categoryItem.recoveryPeriod, categoryItem.startOfPeriod()));
                                        //     categoryItem.endOfPeriod(self.formatDate(categoryItem.recoveryPeriod, categoryItem.endOfPeriod()));
                                        // });
                                        self.buttonProceed(true);
                                    }
                                    else
                                        self.buttonProceed(false);
                                    if (self.dataContentConfirm().selectedRecoveryMethod() === 1) {
                                        var _employeeList = self.getRecoveryEmployee(self.employeeListScreenG(), self.selectedEmployeeCodeScreenG());
                                        _employeeList = _.sortBy(_employeeList, ["code"]);
                                        self.employeeListScreenH(_employeeList);
                                    }
                                    else {
                                        self.employeeListScreenH(self.employeeListScreenG());
                                    }
                                    var _recoveryMethod = self.dataContentConfirm().selectedRecoveryMethod();
                                    var _recoveryMethodDescription1 = self.getRecoveryMethodDescription1(_recoveryMethod);
                                    var _recoveryMethodDescription2 = self.getRecoveryMethodDescription2(_recoveryMethod);
                                    self.dataRecoverySummary().recoveryCategoryList(_categoryList);
                                    self.dataRecoverySummary().recoveryMethod(_recoveryMethod);
                                    self.recoveryMethodDescription1(_recoveryMethodDescription1);
                                    self.recoveryMethodDescription2(_recoveryMethodDescription2);
                                };
                                /**
                                 * Get recovery category
                                 */
                                ScreenModel.prototype.getRecoveryCategory = function (selectedCategory) {
                                    var self = this;
                                    var _listCategory = _.filter(selectedCategory, function (x) { return x.isRecover() == true; });
                                    var _itemList = [];
                                    _.forEach(_listCategory, function (x, i) {
                                        _itemList.push(new CategoryInfo(i + 1, x.isRecover(), x.categoryId(), x.categoryName(), x.recoveryPeriod(), x.startOfPeriod(), x.endOfPeriod(), x.recoveryMethod(), x.iscanNotBeOld(), x.systemType(), x.saveSetName()));
                                    });
                                    return _itemList;
                                };
                                ScreenModel.prototype.formatDate = function (recoveryPeriod, dateFormat) {
                                    if (recoveryPeriod() == PeriodEnum.DAY) {
                                        return moment.utc(dateFormat).format("YYYY/MM/DD");
                                    }
                                    if (recoveryPeriod() == PeriodEnum.MONTH) {
                                        return nts.uk.time.formatYearMonth(parseInt(dateFormat));
                                    }
                                    return dateFormat;
                                };
                                /**
                                 * Get recovery employee
                                 */
                                ScreenModel.prototype.getRecoveryEmployee = function (dataEmployeeList, selectedEmployeeList) {
                                    return _.filter(dataEmployeeList, function (item) { return _.includes(selectedEmployeeList, item.code); });
                                };
                                ScreenModel.prototype.getRecoveryMethodDescription1 = function (recoveryMethod) {
                                    if (recoveryMethod == RecoveryMethod.RESTORE_ALL)
                                        return getText('CMF004_92');
                                    return getText('CMF004_93');
                                };
                                ScreenModel.prototype.getRecoveryMethodDescription2 = function (recoveryMethod) {
                                    if (recoveryMethod == RecoveryMethod.RESTORE_ALL)
                                        return getText('CMF004_94');
                                    return getText('CMF004_95');
                                };
                                ScreenModel.prototype.nextToScreenE = function () {
                                    var self = this;
                                    self.recoveryProcessingId = nts.uk.util.randomId();
                                    var paramObtainRecovery = {
                                        storeProcessingId: self.dataRecoverySelection().selectedRecoveryFile(),
                                        dataRecoveryProcessId: self.recoveryProcessingId
                                    };
                                    nts.uk.ui.block.grayout();
                                    b.service.obtainRecovery(paramObtainRecovery).done(function (res) {
                                        if (res) {
                                            if (res.status) {
                                                self.initScreenE();
                                                $('#data-recovery-wizard').ntsWizard("next");
                                                $('#E4_1').focus();
                                            }
                                            else {
                                                var arr = res.message.split("/");
                                                if (arr.length > 1) {
                                                    setShared("CMF004lParams", {
                                                        fileId: arr[0],
                                                        fileName: arr[1],
                                                        storeProcessingId: paramObtainRecovery.storeProcessingId,
                                                        fromServerFile: true
                                                    }, true);
                                                    self.openHandleFileDialog(true, false);
                                                }
                                                else if (res.message.length > 0) {
                                                    dialog.alertError({ messageId: res.message });
                                                }
                                            }
                                        }
                                    }).fail(function (err) {
                                        dialog.alertError(err);
                                        block.clear();
                                    }).always(function (err) {
                                        block.clear();
                                    });
                                    $('#E4_1').focus();
                                };
                                ScreenModel.prototype.backToScreenA = function () {
                                    nts.uk.request.jump("/view/cmf/004/a/index.xhtml");
                                };
                                ScreenModel.prototype.nextToScreenF = function () {
                                    var self = this;
                                    self.initScreenF();
                                    nts.uk.ui.errors.clearAll();
                                    var checkItemE = _.filter(self.dataContentConfirm().dataContentcategoryList(), function (x) { return x.isRecover() == true; }).length;
                                    if (checkItemE == 0) {
                                        dialog.alertError({ messageId: "Msg_1265" });
                                    }
                                    else {
                                        $('#data-recovery-wizard').ntsWizard("next");
                                        $("#F5_5:first-child .start-date input:first-child").focus();
                                    }
                                };
                                ScreenModel.prototype.nextToScreenG = function () {
                                    var self = this;
                                    var selectedCategory = _.filter(self.dataContentConfirm().dataContentcategoryList(), function (x) { return x.isRecover() == true; });
                                    if (selectedCategory.length < 1) {
                                        nts.uk.ui.dialog.alertError({ messageId: 'Msg_1265' });
                                        return;
                                    }
                                    if (self.isCheckboxActive()) {
                                        $("#E8_3_2 input").trigger("validate");
                                        $("#E8_3_4 input").trigger("validate");
                                        if (!nts.uk.ui.errors.hasError()) {
                                            if (self.pwdCompressEdt.value() !== self.pwdConfirmEdt.value()) {
                                                nts.uk.ui.dialog.alertError({ messageId: 'Msg_566' });
                                                return;
                                            }
                                        }
                                    }
                                    if (!nts.uk.ui.errors.hasError()) {
                                        var _loop_1 = function (checkRow) {
                                            if (checkRow.isRecover) {
                                                if (checkRow.startOfPeriod > checkRow.endOfPeriod) {
                                                    $('tr[data-id=' + checkRow.rowNumber + ']').find('.ntsDatepicker').eq(0).ntsError('set', { messageId: 'Msg_1320', messageParams: [checkRow.rowNumber] });
                                                }
                                                var oldData = _.find(self.categoryListOld, function (x) {
                                                    return x.categoryId == checkRow.categoryId;
                                                });
                                                if (oldData.startOfPeriod > checkRow.startOfPeriod) {
                                                    $('tr[data-id=' + checkRow.rowNumber + ']').find('.ntsDatepicker').eq(0).ntsError('set', { messageId: 'Msg_1319', messageParams: [checkRow.rowNumber] });
                                                }
                                                if (oldData.endOfPeriod < checkRow.endOfPeriod) {
                                                    $('tr[data-id=' + checkRow.rowNumber + ']').find('.ntsDatepicker').eq(1).ntsError('set', { messageId: 'Msg_1319', messageParams: [checkRow.rowNumber] });
                                                }
                                            }
                                        };
                                        for (var _i = 0, _a = ko.toJS(self.changeDataRecoveryPeriod().changeDataCategoryList()); _i < _a.length; _i++) {
                                            var checkRow = _a[_i];
                                            _loop_1(checkRow);
                                        }
                                        if (self.dataContentConfirm().dataContentcategoryList().length < 1) {
                                            nts.uk.ui.dialog.alertError({ messageId: 'Msg_471' });
                                            return;
                                        }
                                    }
                                    if (!nts.uk.ui.errors.hasError()) {
                                        self.initScreenG();
                                        $('#data-recovery-wizard').ntsWizard("next");
                                    }
                                    $('#kcp005component').focus();
                                };
                                ScreenModel.prototype.nextToScreenH = function () {
                                    var self = this;
                                    if (!nts.uk.ui.errors.hasError()) {
                                        self.initScreenH();
                                        $('#data-recovery-wizard').ntsWizard("next");
                                        $('#H9_2').focus();
                                    }
                                };
                                ScreenModel.prototype.restoreData_click = function () {
                                    var self = this;
                                    if (self.employeeListScreenG().length !== self.selectedEmployeeCodeScreenG().length) {
                                        self.employeeListScreenG(_.filter(self.employeeListScreenG(), function (e) { return _.includes(self.selectedEmployeeCodeScreenG(), e.code); }));
                                    }
                                    setShared("CMF004IParams", {
                                        saveForm: self.saveForm(),
                                        employeeList: ko.toJS(self.employeeListScreenG),
                                        recoveryCategoryList: ko.toJS(self.dataRecoverySummary().recoveryCategoryList),
                                        recoveryFile: self.recoverySourceFile(),
                                        recoverySourceCode: self.recoverySourceCode(),
                                        recoverySourceName: self.recoverySourceName(),
                                        supplementaryExplanation: self.supplementaryExplanation(),
                                        recoveryMethodOptions: self.dataContentConfirm().selectedRecoveryMethod(),
                                        recoveryProcessingId: self.recoveryProcessingId,
                                        store_del_ProcessingId: self.dataRecoverySelection().selectedRecoveryFile()
                                    });
                                    if (self.selectedRuleCode() === 1) {
                                        b.service.addMalSet(self.createManualSettings()).done(function (res) {
                                            if ((res != null) && (res != "")) {
                                                setShared("CMF004KParams", {
                                                    storeProcessingId: res,
                                                    dataSaveSetName: self.dataRecoverySelection().recoveryFileList().filter(function (data) { return data.storeProcessingId; }).pop().saveSetName,
                                                    dayValue: self.dateValue().dateRange(),
                                                    monthValue: self.dateValue().monthRange(),
                                                    yearValue: self.dateValue().yearRange()
                                                });
                                                nts.uk.ui.windows.sub.modal("/view/cmf/004/k/index.xhtml").onClosed(function () {
                                                    var param = getShared("CMF004KParams");
                                                    if (param.isSuccess) {
                                                        nts.uk.ui.windows.sub.modal("/view/cmf/004/i/index.xhtml").onClosed(function () {
                                                            self.buton_I_enable(false);
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        nts.uk.ui.windows.sub.modal("/view/cmf/004/i/index.xhtml").onClosed(function () {
                                            self.buton_I_enable(false);
                                        });
                                    }
                                };
                                ScreenModel.prototype.createManualSettings = function () {
                                    var self = this;
                                    var dateValue = new DateValueDto();
                                    if (self.dataContentConfirm().selectedRecoveryMethod() === 0) {
                                        _.each(self.periodValueArr, function (item) {
                                            var val = self.dataRecoverySummary().recoveryCategoryList().filter(function (data) { return data.recoveryPeriod() === item.period; }).pop();
                                            if (val) {
                                                var temp;
                                                switch (item.period) {
                                                    case PeriodValue.DAY:
                                                        dateValue.dateRange = ko.observable(temp);
                                                        break;
                                                    case PeriodValue.MONTH:
                                                        dateValue.monthRange = ko.observable(temp);
                                                        break;
                                                    case PeriodValue.YEAR:
                                                        dateValue.yearRange = ko.observable(temp);
                                                        break;
                                                    case PeriodValue.FULLTIME:
                                                        if (self.dataRecoverySummary().recoveryCategoryList().every(function (data) { return data.recoveryPeriod() === item.period; })) {
                                                            dateValue.dateRange = ko.observable();
                                                            dateValue.monthRange = ko.observable();
                                                            dateValue.yearRange = ko.observable();
                                                        }
                                                        break;
                                                }
                                                temp.startDate = val.startOfPeriod();
                                                temp.endDate = val.endOfPeriod();
                                            }
                                        });
                                    }
                                    else {
                                        dateValue.dateRange(self.dateValue().dateRange);
                                        dateValue.monthRange(self.dateValue().monthRange);
                                        dateValue.yearRange(self.dateValue().yearRange);
                                    }
                                    return new ManualSettingModal(Number(self.isCheckboxActive()), self.dataContentConfirm().dataContentcategoryList().map(function (data) { return data.saveSetName(); }).pop(), moment.utc().toISOString(), self.pwdCompressEdt.value(), moment.utc().toISOString(), moment.utc(dateValue.dateRange().endDate, "YYYY/MM/DD").toISOString(), moment.utc(dateValue.dateRange().startDate, "YYYY/MM/DD").toISOString(), moment.utc(dateValue.monthRange().endDate, "YYYY/MM/DD").toISOString(), moment.utc(dateValue.monthRange().startDate, "YYYY/MM/DD").toISOString(), self.explanationValue(), Number(dateValue.yearRange().endDate), Number(dateValue.yearRange().startDate), self.dataContentConfirm().selectedRecoveryMethod(), self.employeeListScreenG(), _.map(self.dataRecoverySummary().recoveryCategoryList(), function (data) { return new CategoryTableList(data.categoryId(), data.systemType()); }), self.recoverySourceCode());
                                };
                                ScreenModel.prototype.backToPreviousScreen = function () {
                                    var self = this;
                                    $('#data-recovery-wizard').ntsWizard("prev");
                                    nts.uk.ui.errors.clearAll();
                                };
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    self.initWizardScreen();
                                    dfd.resolve(self);
                                    return dfd.promise();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var PeriodEnum;
                            (function (PeriodEnum) {
                                PeriodEnum[PeriodEnum["FULLTIME"] = 0] = "FULLTIME";
                                PeriodEnum[PeriodEnum["YEAR"] = 3] = "YEAR";
                                PeriodEnum[PeriodEnum["MONTH"] = 2] = "MONTH";
                                PeriodEnum[PeriodEnum["DAY"] = 1] = "DAY"; //年次
                            })(PeriodEnum = viewmodel.PeriodEnum || (viewmodel.PeriodEnum = {}));
                            var PeriodValue;
                            (function (PeriodValue) {
                                PeriodValue["FULLTIME"] = "\u5168\u671F\u9593\u4E00\u5F8B";
                                PeriodValue["YEAR"] = "\u65E5\u6B21";
                                PeriodValue["MONTH"] = "\u6708\u6B21";
                                PeriodValue["DAY"] = "\u5E74\u6B21";
                            })(PeriodValue = viewmodel.PeriodValue || (viewmodel.PeriodValue = {}));
                            var RecoveryMethod;
                            (function (RecoveryMethod) {
                                RecoveryMethod[RecoveryMethod["RESTORE_ALL"] = 0] = "RESTORE_ALL";
                                RecoveryMethod[RecoveryMethod["SELECTED_RANGE"] = 1] = "SELECTED_RANGE"; //選択した範囲で復旧
                            })(RecoveryMethod = viewmodel.RecoveryMethod || (viewmodel.RecoveryMethod = {}));
                            var CategoryInfo = /** @class */ (function () {
                                function CategoryInfo(rowNumber, isRecover, categoryId, categoryName, recoveryPeriod, startOfPeriod, endOfPeriod, recoveryMethod, isEnablePeriod, systemType, saveSetName) {
                                    var self = this;
                                    self.rowNumber = ko.observable(rowNumber);
                                    self.isRecover = ko.observable(isRecover);
                                    self.categoryId = ko.observable(categoryId);
                                    self.categoryName = ko.observable(categoryName);
                                    self.recoveryPeriod = ko.observable(recoveryPeriod);
                                    self.startOfPeriod = ko.observable(startOfPeriod);
                                    self.endOfPeriod = ko.observable(endOfPeriod);
                                    self.recoveryMethod = ko.observable(recoveryMethod);
                                    self.iscanNotBeOld = ko.observable(isEnablePeriod);
                                    self.isEnablePeriod = ko.observable(isEnablePeriod);
                                    self.systemType = ko.observable(systemType);
                                    self.saveSetName = ko.observable(saveSetName);
                                }
                                return CategoryInfo;
                            }());
                            viewmodel.CategoryInfo = CategoryInfo;
                            var RecoveryFileInfo = /** @class */ (function () {
                                function RecoveryFileInfo(input) {
                                    var self = this;
                                    self.saveSetCode = input.saveSetCode;
                                    self.saveSetName = input.saveSetName;
                                    self.supplementaryExplanation = input.supplementaryExplanation;
                                    self.storageStartDate = input.storageStartDate;
                                    self.executeCategory = input.executeCategory;
                                    self.targetNumber = input.targetNumber;
                                    self.saveFileName = input.saveFileName;
                                    self.fileId = input.fileId;
                                    this.storeProcessingId = input.storeProcessingId;
                                }
                                return RecoveryFileInfo;
                            }());
                            viewmodel.RecoveryFileInfo = RecoveryFileInfo;
                            /**
                             * B: データ復旧選択
                             */
                            var DataRecoverySelection = /** @class */ (function () {
                                function DataRecoverySelection(selectedUploadCls, selectedSaveFileCls, executePeriodInput, recoveryFileList, selectedRecoveryFile) {
                                    var self = this;
                                    self.selectedUploadCls = ko.observable(selectedUploadCls);
                                    self.selectedSaveFileCls = ko.observable(selectedSaveFileCls);
                                    self.executePeriodInput = ko.observable(executePeriodInput);
                                    self.recoveryFileList = ko.observableArray(recoveryFileList);
                                    self.selectedRecoveryFile = ko.observable(selectedRecoveryFile);
                                }
                                return DataRecoverySelection;
                            }());
                            viewmodel.DataRecoverySelection = DataRecoverySelection;
                            /**
                             * E:データ内容確認
                             */
                            var DataContentConfirm = /** @class */ (function () {
                                function DataContentConfirm(categoryList, selectedRecoveryMethod) {
                                    var self = this;
                                    self.dataContentcategoryList = ko.observableArray(categoryList);
                                    self.selectedRecoveryMethod = ko.observable(selectedRecoveryMethod);
                                }
                                return DataContentConfirm;
                            }());
                            viewmodel.DataContentConfirm = DataContentConfirm;
                            var Output = /** @class */ (function () {
                                function Output() {
                                }
                                return Output;
                            }());
                            viewmodel.Output = Output;
                            var CategoryTableList = /** @class */ (function () {
                                function CategoryTableList(categoryId, systemType) {
                                    var self = this;
                                    self.categoryId = categoryId;
                                    self.systemType = systemType;
                                }
                                return CategoryTableList;
                            }());
                            viewmodel.CategoryTableList = CategoryTableList;
                            /**
                             * F:データ復旧期間変更
                             */
                            var ChangeDataRecoveryPeriod = /** @class */ (function () {
                                function ChangeDataRecoveryPeriod(categoryList) {
                                    var self = this;
                                    self.changeDataCategoryList = ko.observableArray(categoryList);
                                }
                                return ChangeDataRecoveryPeriod;
                            }());
                            viewmodel.ChangeDataRecoveryPeriod = ChangeDataRecoveryPeriod;
                            /**
                             * G:
                             */
                            var DateValueDto = /** @class */ (function () {
                                function DateValueDto() {
                                    this.dateRange = ko.observable({ startDate: moment.utc().subtract(1, 'months').add(1, 'days').format("YYYY/MM/DD"), endDate: moment.utc().format("YYYY/MM/DD") });
                                    this.monthRange = ko.observable({ startDate: moment.utc().format("YYYY/MM"), endDate: moment.utc().format("YYYY/MM") });
                                    this.yearRange = ko.observable({ startDate: moment.utc().format("YYYY"), endDate: moment.utc().format("YYYY") });
                                }
                                return DateValueDto;
                            }());
                            viewmodel.DateValueDto = DateValueDto;
                            /**
                             * H:データ復旧サマリ
                             */
                            var DataRecoverySummary = /** @class */ (function () {
                                function DataRecoverySummary(recoveryCategoryList, recoveryMethod, recoveryEmployee, selectedEmployee) {
                                    var self = this;
                                    self.recoveryCategoryList = ko.observableArray(recoveryCategoryList);
                                    self.recoveryMethod = ko.observable(recoveryMethod);
                                    self.recoveryEmployee = ko.observableArray(recoveryEmployee);
                                    self.selectedEmployee = ko.observableArray(selectedEmployee);
                                }
                                return DataRecoverySummary;
                            }());
                            viewmodel.DataRecoverySummary = DataRecoverySummary;
                            var ManualSettingModal = /** @class */ (function () {
                                function ManualSettingModal(passwordAvailability, saveSetName, referenceDate, compressedPassword, executionDateAndTime, daySaveEndDate, daySaveStartDate, monthSaveEndDate, monthSaveStartDate, suppleExplanation, endYear, startYear, presenceOfEmployee, employees, category, patternCode) {
                                    this.passwordAvailability = passwordAvailability;
                                    this.saveSetName = saveSetName;
                                    this.referenceDate = referenceDate;
                                    this.compressedPassword = compressedPassword;
                                    this.executionDateAndTime = executionDateAndTime;
                                    this.daySaveEndDate = daySaveEndDate;
                                    this.daySaveStartDate = daySaveStartDate;
                                    this.monthSaveEndDate = monthSaveEndDate;
                                    this.monthSaveStartDate = monthSaveStartDate;
                                    this.suppleExplanation = suppleExplanation;
                                    this.endYear = endYear;
                                    this.startYear = startYear;
                                    this.presenceOfEmployee = presenceOfEmployee;
                                    this.employees = _.map(employees, function (e) { return new TargetEmployee(e.id, e.code, e.name); });
                                    this.category = category;
                                    this.patternCode = patternCode;
                                }
                                return ManualSettingModal;
                            }());
                            viewmodel.ManualSettingModal = ManualSettingModal;
                            var TargetEmployee = /** @class */ (function () {
                                function TargetEmployee(sid, scd, name) {
                                    this.sid = sid;
                                    this.scd = scd;
                                    this.name = name;
                                }
                                return TargetEmployee;
                            }());
                            viewmodel.TargetEmployee = TargetEmployee;
                            /**
                             * KCP005
                             */
                            var ListType = /** @class */ (function () {
                                function ListType() {
                                }
                                ListType.EMPLOYMENT = 1;
                                ListType.CLASSIFICATION = 2;
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
                        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                    })(b = cmf004.b || (cmf004.b = {}));
                })(cmf004 = view.cmf004 || (view.cmf004 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf004.b.vm.js.map