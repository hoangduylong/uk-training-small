var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf003;
                (function (cmf003) {
                    var b;
                    (function (b) {
                        var getText = nts.uk.resource.getText;
                        var alertError = nts.uk.ui.dialog.alertError;
                        var block = nts.uk.ui.block;
                        var setShared = nts.uk.ui.windows.setShared;
                        var getShared = nts.uk.ui.windows.getShared;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.buton_E_enable = ko.observable(true);
                                    // reference date
                                    this.referenceDate = ko.observable('');
                                    //input
                                    this.password = ko.observable('');
                                    this.confirmPassword = ko.observable('');
                                    this.explanation = ko.observable('');
                                    this.dataSaveSetName = ko.observable('');
                                    //wizard
                                    this.stepList = [];
                                    this.selectedTitleAtr = ko.observable();
                                    //Screen B ver27
                                    this.patternList = ko.observableArray([]);
                                    this.patternColumns = ko.observableArray([
                                        { headerText: getText('CMF003_23'), key: 'displayCode', width: 75 },
                                        { headerText: getText('CMF003_632'), key: 'patternName', width: 185 }
                                    ]);
                                    this.systemTypes = ko.observableArray([]);
                                    this.selectedPatternId = ko.observable('');
                                    this.savedName = ko.observable('');
                                    this.nextButtonText = ko.observable('');
                                    var self = this;
                                    self.isCompressPass = ko.observable(false);
                                    self.isSymbol = ko.observable(false);
                                    self.passwordConstraint = ko.observable("");
                                    self.isCompressPass.subscribe(function (value) {
                                        if (value) {
                                            self.passwordConstraint("FileCompressionPassword");
                                            $(".passwordInput").trigger("validate");
                                        }
                                        else {
                                            nts.uk.util.value.reset($("#B4_32"), $("#B4_32").val());
                                            nts.uk.util.value.reset($("#B4_41"), $("#B4_41").val());
                                            self.passwordConstraint("");
                                            $('.passwordInput').ntsError('clear');
                                        }
                                    });
                                    self.stepList = [
                                        { content: '.step-1' },
                                        { content: '.step-2' },
                                        { content: '.step-3' }
                                    ];
                                    self.activeStep = ko.observable(0);
                                    //self.stepSelected = ko.observable({ id: 'step-1', content: '.step-1' });
                                    //gridlist
                                    this.categorys = ko.observableArray([]);
                                    //referenceDate init toDay
                                    self.referenceDate(moment.utc().format("YYYY/MM/DD"));
                                    this.columnCategorys = ko.observableArray([
                                        { headerText: '', key: 'id', hidden: true },
                                        { headerText: getText('CMF003_30'), key: 'displayName', width: 250 },
                                        { headerText: getText('CMF003_31'), formatter: timeStore, key: 'periodDivision', width: 100 },
                                        { headerText: getText('CMF003_32'), formatter: storageRangeSaved, key: 'storeRange', width: 120 }
                                    ]);
                                    this.columnEmployees = ko.observableArray([
                                        { headerText: '', key: 'categoryId', width: 100, hidden: true },
                                        { headerText: getText('CMF003_163'), key: 'code', width: 130 },
                                        { headerText: getText('CMF003_164'), key: 'businessname', width: 270 }
                                    ]);
                                    self.itemTitleAtr = ko.observableArray([
                                        { value: 0, titleAtrName: uk.resource.getText('CMF003_88') },
                                        { value: 1, titleAtrName: uk.resource.getText('CMF003_89') }
                                    ]);
                                    self.selectedTitleAtr = ko.observable(0);
                                    this.currentCode = ko.observable();
                                    this.currentCodeList = ko.observableArray([]);
                                    //Date Ranger Picker : type full day
                                    self.dayEnable = ko.observable(true);
                                    self.dayRequired = ko.observable(false);
                                    self.dayStartDateString = ko.observable("");
                                    self.dayEndDateString = ko.observable("");
                                    self.dayValue = ko.observable({
                                        startDate: moment.utc().subtract(1, "M").add(1, "d").format("YYYY/MM/DD"),
                                        endDate: moment.utc().format("YYYY/MM/DD")
                                    });
                                    self.dayStartDateString.subscribe(function (value) {
                                        self.dayValue().startDate = value;
                                        self.dayValue.valueHasMutated();
                                    });
                                    self.dayEndDateString.subscribe(function (value) {
                                        self.dayValue().endDate = value;
                                        self.dayValue.valueHasMutated();
                                    });
                                    //Date Ranger Picker : type month
                                    self.monthEnable = ko.observable(true);
                                    self.monthRequired = ko.observable(false);
                                    self.monthStartDateString = ko.observable("");
                                    self.monthEndDateString = ko.observable("");
                                    self.monthValue = ko.observable({ startDate: moment.utc().format("YYYY/MM"), endDate: moment.utc().format("YYYY/MM") });
                                    self.monthStartDateString.subscribe(function (value) {
                                        self.monthValue().startDate = value;
                                        self.monthValue.valueHasMutated();
                                    });
                                    self.monthEndDateString.subscribe(function (value) {
                                        self.monthValue().endDate = value;
                                        self.monthValue.valueHasMutated();
                                    });
                                    //Date Ranger Picker : type year
                                    self.yearEnable = ko.observable(true);
                                    self.yearRequired = ko.observable(false);
                                    self.yearStartDateString = ko.observable("");
                                    self.yearEndDateString = ko.observable("");
                                    self.yearValue = ko.observable({ startDate: moment.utc().format("YYYY"), endDate: moment.utc().format("YYYY") });
                                    self.yearStartDateString.subscribe(function (value) {
                                        self.yearValue().startDate = value;
                                        self.yearValue.valueHasMutated();
                                    });
                                    self.yearEndDateString.subscribe(function (value) {
                                        self.yearValue().endDate = value;
                                        self.yearValue.valueHasMutated();
                                    });
                                    self.dayValue.subscribe(function (value) {
                                        nts.uk.ui.errors.clearAll();
                                        $(".form-B").trigger("validate");
                                        $(".form-B .ntsDatepicker").trigger("validate");
                                    });
                                    self.monthValue.subscribe(function (value) {
                                        nts.uk.ui.errors.clearAll();
                                        $(".form-B").trigger("validate");
                                        $(".form-B .ntsDatepicker").trigger("validate");
                                    });
                                    self.yearValue.subscribe(function (value) {
                                        nts.uk.ui.errors.clearAll();
                                        $(".form-B").trigger("validate");
                                        $(".form-B .ntsDatepicker").trigger("validate");
                                    });
                                    //Defaut D4_7
                                    self.dateDefaut = ko.observable("2018/04/19");
                                    //Help Button
                                    self.enable = ko.observable(true);
                                    self.textHelp = ko.observable("”基準日説明画像”");
                                    //Radio button
                                    //                self.itemTitleAtr = ko.observableArray([
                                    //                    { value: 0, titleAtrName: resource.getText('CMF003_88') },
                                    //                    { value: 1, titleAtrName: resource.getText('CMF003_89') }]);
                                    //                self.selectedTitleAtr = ko.observable(0);
                                    self.enableGrid = ko.observable(false);
                                    $("#titleSeach").prop("disabled", true);
                                    _.defer(function () {
                                        $(".ntsSearchBox").prop('disabled', true);
                                    });
                                    // dump
                                    self.date = ko.observable('20181231');
                                    self.systemTypes = ko.observableArray([
                                        { name: 'システム管理者', value: 1 },
                                        { name: '就業', value: 2 } // EMPLOYMENT
                                    ]);
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
                                    self.startDateString = ko.observable("20180101");
                                    self.endDateString = ko.observable("20181230");
                                    self.selectedEmployeeCode = ko.observableArray([]);
                                    self.alreadySettingPersonal = ko.observableArray([]);
                                    self.maxDaysCumulationByEmp = ko.observable(0);
                                    self.periodDate = ko.observable({
                                        startDate: self.startDateString(),
                                        endDate: self.endDateString()
                                    });
                                    self.checkReCreateAtrOnlyUnConfirm = ko.observable(false);
                                    self.checkReCreateAtrAllCase = ko.observable(true);
                                    self.checkProcessExecutionAtrRebuild = ko.observable(true);
                                    self.checkProcessExecutionAtrReconfig = ko.observable(false);
                                    self.resetWorkingHours = ko.observable(false);
                                    self.resetDirectLineBounce = ko.observable(false);
                                    self.resetMasterInfo = ko.observable(false);
                                    self.resetTimeChildCare = ko.observable(false);
                                    self.resetAbsentHolidayBusines = ko.observable(false);
                                    self.resetTimeAssignment = ko.observable(false);
                                    self.checkCreateMethodAtrPersonalInfo = ko.observable(true);
                                    self.checkCreateMethodAtrPatternSchedule = ko.observable(false);
                                    self.checkCreateMethodAtrCopyPastSchedule = ko.observable(false);
                                    self.employeeList = ko.observableArray([]);
                                    self.targetEmployee = ko.observableArray([]);
                                    self.workTypeInfo = ko.observable('');
                                    self.workTypeCode = ko.observable('');
                                    self.workTimeInfo = ko.observable('');
                                    self.workTimeCode = ko.observable('');
                                    self.startDateString.subscribe(function (value) {
                                        self.periodDate().startDate = value;
                                        self.periodDate.valueHasMutated();
                                    });
                                    self.endDateString.subscribe(function (value) {
                                        self.periodDate().endDate = value;
                                        self.periodDate.valueHasMutated();
                                    });
                                    self.isCompressPass.subscribe(function (value) {
                                        if (!value) {
                                            self.password('');
                                            self.confirmPassword('');
                                        }
                                    });
                                    //KCP005
                                    self.lstPersonComponentOption = {
                                        isShowAlreadySet: false,
                                        isMultiSelect: true,
                                        listType: ListType.EMPLOYEE,
                                        employeeInputList: self.employeeList,
                                        selectType: SelectType.SELECT_ALL,
                                        selectedCode: self.selectedEmployeeCode,
                                        isDialog: false,
                                        isShowNoSelectRow: false,
                                        alreadySettingList: self.alreadySettingPersonal,
                                        isShowWorkPlaceName: true,
                                        isShowSelectAllButton: false,
                                        maxWidth: 550,
                                        maxRows: 15,
                                        disableSelection: true
                                    };
                                    self.selectedTitleAtr.subscribe(function (value) {
                                        self.lstPersonComponentOption.disableSelection = value == 0 ? true : false;
                                        $('#employeeSearch').ntsListComponent(self.lstPersonComponentOption);
                                        self.nextButtonText(value === 0 ? getText('CMF003_171') : getText('CMF003_53'));
                                    });
                                    self.selectedTitleAtr(0);
                                    self.selectedTitleAtr.valueHasMutated();
                                    self.selectedPatternId.subscribe(function (value) {
                                        self.selectPattern(value);
                                    });
                                } //end constructor
                                /**
                                 * Set default ccg001 options
                                 */
                                ScreenModel.prototype.setDefaultCcg001Option = function () {
                                    var self = this;
                                    self.isQuickSearchTab = ko.observable(true);
                                    self.isAdvancedSearchTab = ko.observable(true);
                                    self.isAllReferableEmployee = ko.observable(true);
                                    self.isOnlyMe = ko.observable(true);
                                    self.isEmployeeOfWorkplace = ko.observable(true);
                                    self.isEmployeeWorkplaceFollow = ko.observable(true);
                                    self.isMutipleCheck = ko.observable(true);
                                    self.isSelectAllEmployee = ko.observable(true);
                                    self.baseDate = ko.observable(moment());
                                    self.periodStartDate = ko.observable(moment());
                                    self.periodEndDate = ko.observable(moment());
                                    self.showEmployment = ko.observable(false); // 雇用条件
                                    self.showWorkplace = ko.observable(true); // 職場条件
                                    self.showClassification = ko.observable(true); // 分類条件
                                    self.showJobTitle = ko.observable(true); // 職位条件
                                    self.showWorktype = ko.observable(true); // 勤種条件
                                    self.inService = ko.observable(true); // 在職区分
                                    self.leaveOfAbsence = ko.observable(true); // 休職区分
                                    self.closed = ko.observable(true); // 休業区分
                                    self.retirement = ko.observable(true); // 退職区分
                                    self.systemType = ko.observable(1);
                                    self.showClosure = ko.observable(false); // 就業締め日利用
                                    self.showBaseDate = ko.observable(true); // 基準日利用
                                    self.showAllClosure = ko.observable(false); // 全締め表示
                                    self.showPeriod = ko.observable(false); // 対象期間利用
                                    self.periodFormatYM = ko.observable(false); // 対象期間精度
                                };
                                /**
                                 * Reload component CCG001
                                 */
                                ScreenModel.prototype.reloadCcg001 = function () {
                                    var self = this;
                                    var periodStartDate, periodEndDate;
                                    if (self.showBaseDate()) {
                                        periodStartDate = moment(self.periodStartDate()).format("YYYY-MM-DD");
                                        periodEndDate = moment(self.periodEndDate()).format("YYYY-MM-DD");
                                    }
                                    else {
                                        periodStartDate = moment(self.periodStartDate()).format("YYYY-MM");
                                        periodEndDate = moment(self.periodEndDate()).format("YYYY-MM"); // 対象期間終了日
                                    }
                                    if (!self.showBaseDate() && !self.showClosure() && !self.showPeriod()) {
                                        nts.uk.ui.dialog.alertError("Base Date or Closure or Period must be shown!");
                                        return;
                                    }
                                    self.ccgcomponent = {
                                        /** Common properties */
                                        systemType: self.systemType(),
                                        showEmployeeSelection: false,
                                        showQuickSearchTab: self.isQuickSearchTab(),
                                        showAdvancedSearchTab: self.isAdvancedSearchTab(),
                                        showBaseDate: self.showBaseDate(),
                                        showClosure: self.showClosure(),
                                        showAllClosure: self.showAllClosure(),
                                        showPeriod: self.showPeriod(),
                                        periodFormatYM: self.periodFormatYM(),
                                        /** Required parameter */
                                        baseDate: moment(self.baseDate()).format("YYYY-MM-DD"),
                                        periodStartDate: periodStartDate,
                                        periodEndDate: periodEndDate,
                                        inService: self.inService(),
                                        leaveOfAbsence: self.leaveOfAbsence(),
                                        closed: self.closed(),
                                        retirement: self.retirement(),
                                        /** Quick search tab options */
                                        showAllReferableEmployee: self.isAllReferableEmployee(),
                                        showOnlyMe: self.isOnlyMe(),
                                        showSameWorkplace: self.isEmployeeOfWorkplace(),
                                        showSameWorkplaceAndChild: self.isEmployeeWorkplaceFollow(),
                                        /** Advanced search properties */
                                        showEmployment: self.showEmployment(),
                                        showWorkplace: self.showWorkplace(),
                                        showClassification: self.showClassification(),
                                        showJobTitle: self.showJobTitle(),
                                        showWorktype: self.showWorktype(),
                                        isMutipleCheck: self.isMutipleCheck(),
                                        /** Return data */
                                        returnDataFromCcg001: function (data) {
                                            self.selectedEmployee(data.listEmployee);
                                            self.applyKCP005ContentSearch(data.listEmployee).done(function () {
                                                setTimeout(function () {
                                                    $("#employeeSearch div[id *= 'scrollContainer']").scrollTop(0);
                                                }, 1000);
                                            });
                                            self.referenceDate(moment.utc(data.baseDate).format("YYYY/MM/DD"));
                                        }
                                    };
                                    //$('#ccgcomponent').ntsGroupComponent(self.ccgcomponent);
                                };
                                /**
                               * start page data
                               */
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    setTimeout(function () { dfd.resolve(self); }, 100);
                                    self.initScreenB();
                                    return dfd.promise();
                                };
                                /**
                                * apply ccg001 search data to kcp005
                                */
                                ScreenModel.prototype.applyKCP005ContentSearch = function (dataList) {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var employeeSearchs = [];
                                    for (var i = 0; i < dataList.length; i++) {
                                        var employeeSearch = dataList[i];
                                        var employee = {
                                            code: employeeSearch.employeeCode,
                                            name: employeeSearch.employeeName,
                                            affiliationName: employeeSearch.affiliationName,
                                            sid: employeeSearch.employeeId,
                                            scd: employeeSearch.employeeCode,
                                            businessname: employeeSearch.employeeName
                                        };
                                        employeeSearchs.push(employee);
                                        if (i == (dataList.length - 1)) {
                                            dfd.resolve();
                                        }
                                    }
                                    self.employeeList(employeeSearchs);
                                    self.lstPersonComponentOption.disableSelection = self.selectedTitleAtr() == 0 ? true : false;
                                    $('#employeeSearch').ntsListComponent(self.lstPersonComponentOption);
                                    return dfd.promise();
                                };
                                /**
                                 * convert string to date
                                 */
                                ScreenModel.prototype.toDate = function (strDate) {
                                    return moment(strDate, 'YYYY/MM/DD').toDate();
                                };
                                /**
                                 * function submit button
                                 */
                                ScreenModel.prototype.btnSubmitClick = function () {
                                    var self = this;
                                    // check selection employee 
                                    if (self.selectedEmployeeCode && self.selectedEmployee() && self.selectedEmployeeCode().length > 0) {
                                    }
                                    else {
                                        nts.uk.ui.dialog.error({ messageId: "Msg_498", messageParams: ["X", "Y"] });
                                    }
                                };
                                /**
                                 * get selected title name from screen B
                                 */
                                ScreenModel.prototype.getSelectedTitleName = function () {
                                    var self = this;
                                    return self.itemTitleAtr().filter(function (data) { return data.value === self.selectedTitleAtr(); }).pop().titleAtrName;
                                };
                                /**
                                 * function next wizard by on click button
                                 */
                                ScreenModel.prototype.next = function () {
                                    var self = this;
                                    if (self.selectedTitleAtr() === 1)
                                        $('#ex_accept_wizard').ntsWizard("next");
                                    else {
                                        self.initE();
                                        self.gotoscreenF();
                                    }
                                };
                                /**
                                 * function previous wizard by on click button
                                 */
                                ScreenModel.prototype.previous = function () {
                                    $('#ex_accept_wizard').ntsWizard("prev");
                                };
                                /**
                                * function previous wizard by on click button
                                */
                                ScreenModel.prototype.nextPageEmployee = function () {
                                    var self = this;
                                    // if (self.validateB()) {
                                    //   if (self.isCompressPass()) {
                                    //     if (self.password() == self.confirmPassword()) {
                                    //       if (self.categorys().length > 0) {
                                    self.next();
                                    $(".selectEmpType").focus();
                                    //       } else {
                                    //         alertError({ messageId: 'Msg_471' });
                                    //       }
                                    //     } else {
                                    //       alertError({ messageId: 'Msg_566' });
                                    //     }
                                    //   } else {
                                    //     if (self.categorys().length > 0) {
                                    //       self.next();
                                    //       $(".selectEmpType").focus();
                                    //     } else {
                                    //       alertError({ messageId: 'Msg_471' });
                                    //     }
                                    //   }
                                    // }
                                };
                                ScreenModel.prototype.setRangePickerRequire = function () {
                                    var self = this;
                                    self.dayRequired(false);
                                    self.monthRequired(false);
                                    self.yearRequired(false);
                                    for (var i = 0; i < self.categorys().length; i++) {
                                        if (self.categorys()[i].periodDivision == 1) {
                                            self.dayRequired(true);
                                        }
                                        else if (self.categorys()[i].periodDivision == 2) {
                                            self.monthRequired(true);
                                        }
                                        else if (self.categorys()[i].periodDivision == 3) {
                                            self.yearRequired(true);
                                        }
                                        else if (self.categorys()[i].periodDivision == 0) {
                                            $('.form-B .ntsDatepicker').ntsError('clear');
                                        }
                                    }
                                };
                                ScreenModel.prototype.initScreenB = function () {
                                    var self = this;
                                    block.grayout();
                                    b.service.screenDisplayProcess().done(function (res) {
                                        var arr = [];
                                        _.forEach(res.patterns, function (x) {
                                            var p = new Pattern();
                                            p.code = x.patternCode;
                                            p.patternName = x.patternName;
                                            p.patternClassification = x.patternClassification;
                                            p.displayCode = x.patternClassification + x.patternCode;
                                            arr.push(p);
                                        });
                                        self.patternList(arr);
                                        self.patternList(_.orderBy(self.patternList(), ['patternClassification', 'code'], ['desc', 'asc']));
                                        self.systemTypes(res.systemTypes);
                                        self.selectedPatternId(self.patternList()[0].displayCode);
                                        self.selectPattern(self.patternList()[0].displayCode);
                                    }).fail(function (err) {
                                        alertError({ messageId: 'Msg_1736' });
                                    }).always(function () {
                                        block.clear();
                                    });
                                };
                                ScreenModel.prototype.nextFromDToE = function () {
                                    var self = this;
                                    if (self.selectedTitleAtr() != 0 && self.selectedTitleAtr() != 1) {
                                        alertError({ messageId: 'Msg_463' });
                                    }
                                    else if (self.selectedTitleAtr() == 1 && self.selectedEmployeeCode().length == 0) {
                                        alertError({ messageId: 'Msg_498' });
                                    }
                                    else {
                                        // self.initE();
                                        // self.next();
                                        self.gotoscreenF();
                                        $("#E5_2").focus();
                                    }
                                };
                                ScreenModel.prototype.initE = function () {
                                    var self = this;
                                    self.setTargetEmployee();
                                    $("#E3_3").html(self.dataSaveSetName());
                                    $("#E3_5").html(self.explanation());
                                    $("#E3_37").html(self.selectedTitleAtr() == 1 ? self.referenceDate() : "");
                                };
                                ScreenModel.prototype.setTargetEmployee = function () {
                                    var self = this;
                                    var tempEmployee;
                                    if (self.selectedTitleAtr() == 0) {
                                        self.targetEmployee([]);
                                    }
                                    else {
                                        tempEmployee = _.filter(self.employeeList(), function (o) {
                                            return _.includes(self.selectedEmployeeCode(), o.code);
                                        });
                                        tempEmployee = _.sortBy(tempEmployee, ["code"]);
                                        self.targetEmployee(tempEmployee);
                                    }
                                };
                                ScreenModel.prototype.validateB = function () {
                                    $(".form-B").trigger("validate");
                                    $(".form-B .ntsDatepicker").trigger("validate");
                                    if (nts.uk.ui.errors.hasError()) {
                                        return false;
                                    }
                                    return true;
                                };
                                ;
                                ScreenModel.prototype.previousB = function () {
                                    var self = this;
                                    self.previous();
                                    $(".selectEmpType").focus();
                                };
                                ScreenModel.prototype.backToA = function () {
                                    var self = this;
                                    nts.uk.request.jump("/view/cmf/003/a/index.xhtml");
                                };
                                ScreenModel.prototype.selectCategory = function () {
                                    var self = this;
                                    setShared("CMF003_B_CATEGORIES", self.categorys());
                                    setShared("CMF003_B_SYSTEMTYPE", self.systemtypeFromC);
                                    nts.uk.ui.windows.sub.modal('../c/index.xhtml').onClosed(function () {
                                        var categoryFromC = JSON.parse(getShared('CMF003_C_CATEGORIES'));
                                        var systemtypeFromC = getShared('CMF003_C_SYSTEMTYPE');
                                        if (systemtypeFromC) {
                                            self.systemtypeFromC = systemtypeFromC;
                                            $("#B4_24").html(systemtypeFromC.name);
                                        }
                                        if (categoryFromC && (categoryFromC.length > 0)) {
                                            self.categorys(categoryFromC);
                                            self.setRangePickerRequire();
                                        }
                                        $("#B4_2").focus();
                                    });
                                };
                                ScreenModel.prototype.gotoscreenF = function () {
                                    var self = this;
                                    self.saveManualSetting();
                                };
                                ScreenModel.prototype.saveManualSetting = function () {
                                    var self = this;
                                    if (self.employeeList().length !== self.selectedEmployeeCode().length) {
                                        self.employeeList(_.filter(self.employeeList(), function (e) { return _.includes(self.selectedEmployeeCode(), e.code); }));
                                    }
                                    var manualSetting = new ManualSettingModal(Number(self.isCompressPass()), self.dataSaveSetName(), moment.utc(self.referenceDate(), 'YYYY/MM/DD').toISOString(), self.password(), moment.utc().toISOString(), moment.utc(self.dayValue().endDate, 'YYYY/MM/DD').toISOString(), moment.utc(self.dayValue().startDate, 'YYYY/MM/DD').toISOString(), moment.utc(self.monthValue().endDate, 'YYYY/MM/DD').toISOString(), moment.utc(self.monthValue().startDate, 'YYYY/MM/DD').toISOString(), self.explanation(), Number(self.yearValue().endDate), Number(self.yearValue().startDate), self.selectedTitleAtr(), self.employeeList(), self.categorys(), self.selectedPatternId().slice(1));
                                    b.service.addMalSet(manualSetting).done(function (res) {
                                        if ((res != null) && (res != "")) {
                                            var params = {
                                                storeProcessingId: res,
                                                dataSaveSetName: self.dataSaveSetName(),
                                                dayValue: self.dayValue(),
                                                monthValue: self.monthValue(),
                                                yearValue: self.yearValue()
                                            };
                                            setShared("CMF001_E_PARAMS", params);
                                            nts.uk.ui.windows.sub.modal("/view/cmf/003/f/index.xhtml").onClosed(function () {
                                                self.buton_E_enable(self.selectedTitleAtr() === 0);
                                                self.buton_E_enable.valueHasMutated();
                                                $(".goback").focus();
                                            });
                                        }
                                    }).fail(function (err) {
                                    });
                                };
                                ScreenModel.prototype.selectPattern = function (displayCode) {
                                    var self = this;
                                    block.grayout();
                                    var pattern = _.find(self.patternList(), { 'displayCode': displayCode });
                                    var param = {
                                        patternClassification: pattern.patternClassification,
                                        patternCode: pattern.code,
                                        systemType: self.systemTypes()
                                    };
                                    b.service.patternSettingSelect(param).then(function (res) {
                                        self.savedName(res.patternName);
                                        self.dataSaveSetName(res.patternName);
                                        self.isCompressPass(res.withoutPassword === 1);
                                        self.password(res.patternCompressionPwd);
                                        self.confirmPassword(res.patternCompressionPwd);
                                        self.explanation(res.patternSuppleExplanation);
                                        if (res.selectCategories && res.selectCategories.length > 0) {
                                            var textToFormat_1 = getText(res.selectCategories[0].holder.textToFormat);
                                            self.categorys(_.map(res.selectCategories, function (x) {
                                                var params = _.map(x.holder.params, function (text) { return getText(text); });
                                                var category = {
                                                    categoryId: x.categoryId,
                                                    categoryName: x.categoryName,
                                                    displayName: x.categoryName + nts.uk.text.format(textToFormat_1, params),
                                                    periodDivision: x.periodDivision,
                                                    separateCompClassification: x.separateCompClassification,
                                                    specifiedMethod: x.specifiedMethod,
                                                    storeRange: x.storeRange,
                                                    systemType: x.systemType,
                                                    id: nts.uk.util.randomId()
                                                };
                                                return category;
                                            }));
                                        }
                                        else {
                                            self.categorys([]);
                                        }
                                        nts.uk.ui.errors.clearAll();
                                    }).then(function () {
                                        return b.service.getClosurePeriod().then(function (result) {
                                            var startDate = moment.utc(result.startDate, "YYYY/MM/DD");
                                            var endDate = moment.utc(result.endDate, "YYYY/MM/DD");
                                            self.dayValue({
                                                startDate: startDate.format("YYYY/MM/DD"),
                                                endDate: endDate.format("YYYY/MM/DD")
                                            });
                                            self.monthValue({
                                                startDate: startDate.format("YYYY/MM"),
                                                endDate: endDate.format("YYYY/MM")
                                            });
                                            self.yearValue({
                                                startDate: startDate.format("YYYY"),
                                                endDate: endDate.format("YYYY")
                                            });
                                            self.setRangePickerRequire();
                                        });
                                    }).always(function () {
                                        block.clear();
                                    });
                                };
                                return ScreenModel;
                            }()); //end screemodule
                            viewmodel.ScreenModel = ScreenModel;
                            var ManualSettingModal = /** @class */ (function () {
                                function ManualSettingModal(passwordAvailability, saveSetName, referenceDate, compressedPassword, executionDateAndTime, daySaveEndDate, daySaveStartDate, monthSaveEndDate, monthSaveStartDate, suppleExplanation, endYear, startYear, presenceOfEmployee, employees, category, patternCode) {
                                    this.passwordAvailability = passwordAvailability;
                                    this.saveSetName = saveSetName;
                                    this.referenceDate = referenceDate;
                                    this.compressedPassword = compressedPassword;
                                    this.executionDateAndTime = executionDateAndTime;
                                    this.daySaveEndDate = daySaveEndDate ? daySaveEndDate : null;
                                    this.daySaveStartDate = daySaveStartDate ? daySaveStartDate : null;
                                    this.monthSaveEndDate = monthSaveEndDate ? monthSaveEndDate : null;
                                    this.monthSaveStartDate = monthSaveStartDate ? monthSaveStartDate : null;
                                    this.suppleExplanation = suppleExplanation;
                                    this.endYear = endYear ? endYear : null;
                                    this.startYear = startYear ? startYear : null;
                                    this.presenceOfEmployee = presenceOfEmployee;
                                    this.employees = employees;
                                    this.category = category;
                                    this.patternCode = patternCode;
                                }
                                return ManualSettingModal;
                            }());
                            viewmodel.ManualSettingModal = ManualSettingModal;
                            var Pattern = /** @class */ (function () {
                                function Pattern() {
                                }
                                return Pattern;
                            }());
                            viewmodel.Pattern = Pattern;
                            var Category = /** @class */ (function () {
                                function Category() {
                                }
                                return Category;
                            }());
                            viewmodel.Category = Category;
                            var CategoryModel = /** @class */ (function () {
                                function CategoryModel() {
                                }
                                return CategoryModel;
                            }());
                            viewmodel.CategoryModel = CategoryModel;
                            var ItemCombobox = /** @class */ (function () {
                                function ItemCombobox(code, name) {
                                    this.code = code;
                                    this.name = name;
                                }
                                return ItemCombobox;
                            }());
                            var ListType = /** @class */ (function () {
                                function ListType() {
                                }
                                ListType.EMPLOYMENT = 1;
                                ListType.Classification = 2;
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
                            function timeStore(value, row) {
                                if (value && value === '0') {
                                    return getText('Enum_TimeStore_FULL_TIME');
                                }
                                else if (value && value === '1') {
                                    return getText('Enum_TimeStore_DAILY');
                                }
                                else if (value && value === '2') {
                                    return getText('Enum_TimeStore_MONTHLY');
                                }
                                else if (value && value === '3') {
                                    return getText('Enum_TimeStore_ANNUAL');
                                }
                            }
                            function storageRangeSaved(value, row) {
                                if (value && value === '0') {
                                    return getText('Enum_StorageRangeSaved_EARCH_EMP');
                                }
                                else if (value && value === '1') {
                                    return getText('Enum_StorageRangeSaved_ALL_EMP');
                                }
                            }
                        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                    })(b = cmf003.b || (cmf003.b = {}));
                })(cmf003 = view.cmf003 || (view.cmf003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf003.b.vm.js.map