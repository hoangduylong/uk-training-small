var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf005;
                (function (cmf005) {
                    var b;
                    (function (b) {
                        var viewmodel;
                        (function (viewmodel) {
                            var block = nts.uk.ui.block;
                            var getText = nts.uk.resource.getText;
                            var model = cmf005.share.model;
                            var alertError = nts.uk.ui.dialog.alertError;
                            var modal = nts.uk.ui.windows.sub.modal;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var ListType = kcp.share.list.ListType;
                            var SelectType = kcp.share.list.SelectType;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    //wizard
                                    this.stepList = [];
                                    this.isSaveBeforeDeleteFlg = ko.observable(0);
                                    //B8_1
                                    this.isExistCompressPasswordFlg = ko.observable(false);
                                    //Screen B ver20
                                    this.patternList = ko.observableArray([]);
                                    this.patternColumns = ko.observableArray([
                                        { headerText: getText('CMF003_23'), key: 'displayCode', width: 75 },
                                        { headerText: getText('CMF003_632'), key: 'patternName', width: 215 }
                                    ]);
                                    this.systemTypes = ko.observableArray([]);
                                    this.selectedPatternId = ko.observable('');
                                    this.savedName = ko.observable('');
                                    this.nextButtonText = ko.observable('');
                                    this.buttonEnable = ko.observable(true);
                                    var self = this;
                                    console.log("constructor");
                                    self.initComponents();
                                    self.setDefault();
                                }
                                ScreenModel.prototype.initComponents = function () {
                                    var self = this;
                                    //View menu step
                                    self.stepList = [
                                        { content: '.step-1' },
                                        { content: '.step-2' },
                                        { content: '.step-3' }
                                    ];
                                    self.activeStep = ko.observable(0);
                                    self.stepSelected = ko.observable({ id: 'step-1', content: '.step-1' });
                                    console.log("initComponents");
                                    //Radio button
                                    self.optionCategory = ko.observable({ value: 1, text: getText("CMF005_15") });
                                    self.optionDeleteSet = ko.observable({ value: 2, text: getText("CMF005_16") });
                                    self.deleteSetName = ko.observable('');
                                    //B5_3
                                    self.listDataCategory = ko.observableArray([]);
                                    self.currentCode = ko.observable();
                                    self.currentCategory = ko.observableArray([]);
                                    self.listColumnHeader = ko.observableArray([
                                        { headerText: '', key: 'id', hidden: true },
                                        { headerText: getText('CMF005_24'), key: 'displayName', width: 220 },
                                        { headerText: getText('CMF005_25'), key: 'timeStore', width: 75, formatter: timeStore },
                                        { headerText: getText('CMF005_229'), key: 'timeStop', width: 75 },
                                        { headerText: getText('CMF005_26'), key: 'storageRangeSaved', width: 75, formatter: storageRangeSaved }
                                    ]);
                                    //DatePcicker B6_1
                                    self.enableDate = ko.observable(true);
                                    self.enableMonth = ko.observable(true);
                                    self.enableYear = ko.observable(true);
                                    self.requiredDate = ko.observable(false);
                                    self.requiredMonth = ko.observable(false);
                                    self.requiredYear = ko.observable(false);
                                    self.startDateDailyString = ko.observable("");
                                    self.endDateDailyString = ko.observable("");
                                    self.startDateMothlyString = ko.observable("");
                                    self.endDateMothlyString = ko.observable("");
                                    self.startDateYearlyString = ko.observable("");
                                    self.endDateYearlyString = ko.observable("");
                                    self.dateValue = ko.observable({
                                        startDate: moment.utc().subtract(1, "M").add(1, "d").format("YYYY/MM/DD"),
                                        endDate: moment.utc().format("YYYY/MM/DD")
                                    });
                                    self.monthValue = ko.observable({
                                        startDate: moment.utc().subtract(1, "M").add(1, "d").format("YYYY/MM"),
                                        endDate: moment.utc().subtract(1, "M").add(1, "d").format("YYYY/MM")
                                    });
                                    self.yearValue = ko.observable({
                                        startDate: moment.utc().subtract(1, "M").add(1, "d").format("YYYY"),
                                        endDate: moment.utc().subtract(1, "M").add(1, "d").format("YYYY")
                                    });
                                    //B7_1
                                    self.saveBeforDeleteOption = ko.observableArray([
                                        new model.ItemModel(model.SAVE_BEFOR_DELETE_ATR.YES, getText('CMF005_35')),
                                        new model.ItemModel(model.SAVE_BEFOR_DELETE_ATR.NO, getText('CMF005_36'))
                                    ]);
                                    //B8_1
                                    self.passwordForCompressFile = ko.observable("");
                                    self.confirmPasswordForCompressFile = ko.observable("");
                                    //B9_2
                                    self.supplementExplanation = ko.observable("");
                                    //D
                                    //referenceDate init toDay
                                    self.referenceDate = moment.utc().format("YYYY/MM/DD");
                                    self.systemType = ko.observable(1);
                                    self.initEmployeeList = ko.observableArray([]);
                                    self.employeeList = ko.observableArray([]);
                                    self.employeeDeletionList = ko.observableArray([]);
                                    self.categoryDeletionList = ko.observableArray([]);
                                    self.selectedEmployeeCode = ko.observableArray([]);
                                    self.alreadySettingPersonal = ko.observableArray([]);
                                    self.itemTitleAtr = ko.observableArray([
                                        { value: 0, titleAtrName: uk.resource.getText('CMF005_51') },
                                        { value: 1, titleAtrName: uk.resource.getText('CMF005_52') }
                                    ]);
                                    self.selectedTitleAtr = ko.observable();
                                    self.selectedTitleAtr.subscribe(function (value) {
                                        if (value == 1) {
                                            self.applyKCP005ContentSearch(self.initEmployeeList());
                                            self.nextButtonText(getText('CMF005_54'));
                                        }
                                        else {
                                            self.applyKCP005ContentSearch([]);
                                            self.nextButtonText(getText('CMF005_59'));
                                        }
                                    });
                                    self.selectedTitleAtr(0);
                                    self.initComponentCCG001();
                                    self.initComponnentKCP005();
                                    self.selectedPatternId.subscribe(function (value) { return self.selectPattern(value); });
                                    //E   
                                    this.columnEmployees = ko.observableArray([
                                        { headerText: getText('CMF005_56'), key: 'code', width: 150 },
                                        { headerText: getText('CMF005_57'), key: 'name', width: 250 }
                                    ]);
                                    self.delId = ko.observable("");
                                };
                                /**
                                * start page data
                                */
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    dfd.resolve(self);
                                    self.initB();
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.initB = function () {
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
                                ScreenModel.prototype.selectPattern = function (displayCode) {
                                    var self = this;
                                    block.grayout();
                                    var pattern = _.find(self.patternList(), { 'displayCode': displayCode });
                                    var param = {
                                        patternClassification: pattern.patternClassification,
                                        patternCode: pattern.code,
                                        systemType: self.systemTypes()
                                    };
                                    b.service.patternSettingSelect(param).done(function (res) {
                                        self.savedName(res.patternName);
                                        self.deleteSetName(res.patternName);
                                        self.isExistCompressPasswordFlg(res.withoutPassword === 1);
                                        self.passwordForCompressFile(res.patternCompressionPwd);
                                        self.confirmPasswordForCompressFile(res.patternCompressionPwd);
                                        self.supplementExplanation(res.patternSuppleExplanation);
                                        if (res.selectCategories && res.selectCategories.length > 0) {
                                            var textToFormat_1 = getText(res.selectCategories[0].holder.textToFormat);
                                            self.listDataCategory(_.map(res.selectCategories, function (x) {
                                                var params = _.map(x.holder.params, function (text) { return getText(text); });
                                                var category = {
                                                    categoryId: x.categoryId,
                                                    categoryName: x.categoryName,
                                                    displayName: x.categoryName + nts.uk.text.format(textToFormat_1, params),
                                                    timeStore: x.periodDivision,
                                                    separateCompClassification: x.separateCompClassification,
                                                    specifiedMethod: x.specifiedMethod,
                                                    storeRange: x.storeRange,
                                                    systemType: x.systemType,
                                                    timeStop: x.timeStop,
                                                    id: nts.uk.util.randomId()
                                                };
                                                return category;
                                            }));
                                        }
                                        else {
                                            self.listDataCategory([]);
                                        }
                                        nts.uk.ui.errors.clearAll();
                                    }).then(function () {
                                        return b.service.getClosurePeriod().then(function (result) {
                                            var startDate = moment.utc(result.startDate, "YYYY/MM/DD");
                                            var endDate = moment.utc(result.endDate, "YYYY/MM/DD");
                                            self.dateValue({
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
                                            self.setDateRangePickerRequired();
                                        });
                                    }).always(function () {
                                        block.clear();
                                    });
                                };
                                /**
                                 * Setting value default  screen B
                                 */
                                ScreenModel.prototype.setDefault = function (dateToday) {
                                    var self = this;
                                    //set B3_1 "ON"
                                    self.rdSelected = ko.observable(1);
                                    console.log("setDefault");
                                    b.service.getSystemDate().done(function (dateToday) {
                                        var date = dateToday.referenceDate;
                                        //B6_2_2
                                        self.dateValue({
                                            startDate: moment.utc(date).subtract(1, "M").add(1, "d").format("YYYY/MM/DD"),
                                            endDate: moment.utc(date).format("YYYY/MM/DD")
                                        });
                                        self.monthValue({
                                            startDate: moment.utc(date).format("YYYY/MM"),
                                            endDate: moment.utc(date).format("YYYY/MM")
                                        });
                                        self.yearValue({
                                            startDate: moment.utc(date).format("YYYY"),
                                            endDate: moment.utc(date).format("YYYY")
                                        });
                                    });
                                    //B6_2_2
                                    //            self.dateValue({
                                    //                startDate: moment.utc().subtract(1, "M").add(1, "d").format("YYYY/MM/DD"),
                                    //                endDate: moment.utc().format("YYYY/MM/DD")
                                    //            });
                                    //            self.monthValue = ko.observable({ startDate: moment.utc().subtract(1, "M").add(1, "d").format("YYYY/MM"), endDate: moment.utc().subtract(1, "M").add(1, "d").format("YYYY/MM") });
                                    //            self.yearValue = ko.observable({ startDate: moment.utc().subtract(1, "M").add(1, "d").format("YYYY"), endDate: moment.utc().subtract(1, "M").add(1, "d").format("YYYY") });
                                    //B7_2_1
                                    self.isSaveBeforeDeleteFlg = ko.observable(model.SAVE_BEFOR_DELETE_ATR.YES);
                                    //B8_2_1
                                    self.isExistCompressPasswordFlg = ko.observable(true);
                                    self.passwordConstraint = ko.observable("");
                                    self.isDelete = ko.observable(self.isSaveBeforeDeleteFlg() && self.isExistCompressPasswordFlg());
                                    /**
                                    * Clear validate
                                     */
                                    self.isExistCompressPasswordFlg.subscribe(function (value) {
                                        if (value) {
                                            self.passwordConstraint("PasswordCompressFile");
                                            $(".passwordInput").trigger("validate");
                                        }
                                        else {
                                            nts.uk.util.value.reset($("#B8_2_2"), $("#B8_2_2").val());
                                            nts.uk.util.value.reset($("#B8_3_2"), $("#B8_3_2").val());
                                            self.passwordConstraint("");
                                            $('.passwordInput').ntsError('clear');
                                        }
                                    });
                                    self.dateValue.subscribe(function (value) {
                                        nts.uk.ui.errors.clearAll();
                                        $(".validate_form .ntsDatepicker").trigger("validate");
                                    });
                                    self.monthValue.subscribe(function (value) {
                                        nts.uk.ui.errors.clearAll();
                                        $(".validate_form .ntsDatepicker").trigger("validate");
                                    });
                                    self.yearValue.subscribe(function (value) {
                                        nts.uk.ui.errors.clearAll();
                                        $(".validate_form .ntsDatepicker").trigger("validate");
                                    });
                                    self.isSaveBeforeDeleteFlg.subscribe(function (value) {
                                        if (value == 0) {
                                            $("#B8_3_2").ntsError('clear');
                                            $('#B8_2_2').ntsError('clear');
                                        }
                                        self.isDelete((value == 1 ? true : false) && self.isExistCompressPasswordFlg());
                                    });
                                    self.isExistCompressPasswordFlg.subscribe(function (value) {
                                        if (value == false) {
                                            $("#B8_3_2").ntsError('clear');
                                            $('#B8_2_2').ntsError('clear');
                                        }
                                        self.isDelete(value && self.isSaveBeforeDeleteFlg());
                                    });
                                };
                                /**
                                 *Get status display button select category
                                 */
                                ScreenModel.prototype.isEnableBtnOpenC = function () {
                                    var self = this;
                                    if (self.rdSelected() == 1) {
                                        return true;
                                    }
                                    else {
                                        return false;
                                    }
                                };
                                /**
                                 *Open screen C
                                 */
                                ScreenModel.prototype.openScreenC = function () {
                                    var self = this;
                                    setShared("CMF005CParams_ListCategory", self.listDataCategory());
                                    setShared("CMF005CParams_SystemType", self.systemTypeCbb);
                                    nts.uk.ui.errors.clearAll();
                                    modal("/view/cmf/005/c/index.xhtml").onClosed(function () {
                                        var categoryC = getShared('CMF005COutput_ListCategoryChose');
                                        var systemTypeC = getShared('CMF005COutput_SystemTypeChose');
                                        if (systemTypeC) {
                                            self.systemTypeCbb = systemTypeC;
                                            self.systemType(systemTypeC.code);
                                            $("#B5_2_2").html(systemTypeC.name);
                                        }
                                        if (categoryC && (categoryC.length > 0)) {
                                            self.listDataCategory.removeAll();
                                            self.setDateRangePickerRequired();
                                        }
                                        $("#B4_2").focus();
                                    });
                                };
                                ScreenModel.prototype.setDateRangePickerRequired = function () {
                                    var self = this;
                                    self.requiredDate(false);
                                    self.requiredMonth(false);
                                    self.requiredYear(false);
                                    for (var i_1 = 0; i_1 < self.listDataCategory().length; i_1++) {
                                        // self.listDataCategory.push(self.listDataCategory()[i]);
                                        if (!self.requiredMonth() && self.listDataCategory()[i_1].timeStore == model.TIME_STORE.MONTHLY) {
                                            self.requiredMonth(true);
                                        }
                                        if (!self.requiredYear() && self.listDataCategory()[i_1].timeStore == model.TIME_STORE.ANNUAL) {
                                            self.requiredYear(true);
                                        }
                                        if (!self.requiredDate() && self.listDataCategory()[i_1].timeStore == model.TIME_STORE.DAILY) {
                                            self.requiredDate(true);
                                        }
                                        if (self.listDataCategory()[i_1].timeStore == 0) {
                                            $('.form-B .ntsDatepicker').ntsError('clear');
                                        }
                                    }
                                };
                                /**
                                 *Open screen D
                                 */
                                ScreenModel.prototype.nextScreenD = function () {
                                    var self = this;
                                    if (self.validateForm()) {
                                        if (self.isExistCompressPasswordFlg()) {
                                            if (self.passwordForCompressFile() == self.confirmPasswordForCompressFile()) {
                                                if (self.listDataCategory().length > 0) {
                                                    self.nextFromBToD();
                                                }
                                                else {
                                                    alertError({ messageId: 'Msg_471' });
                                                }
                                            }
                                            else {
                                                alertError({ messageId: 'Msg_566' });
                                            }
                                        }
                                        else {
                                            if (self.listDataCategory().length > 0) {
                                                self.nextFromBToD();
                                            }
                                            else {
                                                alertError({ messageId: 'Msg_471' });
                                            }
                                        }
                                    }
                                };
                                /**
                                 *Check validate client
                                 */
                                ScreenModel.prototype.validateForm = function () {
                                    $(".validate_form").trigger("validate");
                                    $(".validate_form .ntsDatepicker").trigger("validate");
                                    if (nts.uk.ui.errors.hasError()) {
                                        return false;
                                    }
                                    return true;
                                };
                                ;
                                /**
                                 * function next wizard by on click button
                                 */
                                ScreenModel.prototype.nextFromBToD = function () {
                                    var self = this;
                                    if (self.selectedTitleAtr() === 0) {
                                        self.gotoscreenF();
                                    }
                                    else {
                                        self.next();
                                        $('#D4_2').focus();
                                        self.scrollBottomToLeft();
                                    }
                                };
                                /**
                                * function next wizard by on click button
                                */
                                ScreenModel.prototype.next = function () {
                                    $('#ex_accept_wizard').ntsWizard("next");
                                };
                                /**
                                 * function previous wizard by on click button
                                 */
                                ScreenModel.prototype.previous = function () {
                                    $('#ex_accept_wizard').ntsWizard("prev");
                                };
                                /**
                                * Validate  DatePicker
                                * return : boolean (true: Valid ,false: Invalid)
                                */
                                ScreenModel.prototype.validateDatePicker = function () {
                                    var self = this;
                                    if (self.requiredDate()) {
                                        if (self.dateValue().startDate && self.dateValue().endDate) {
                                            if (self.dateValue().startDate > self.dateValue().endDate) {
                                                alertError({ messageId: 'Msg_465' });
                                                return false;
                                            }
                                        }
                                        else {
                                            alertError({ messageId: 'Msg_463' });
                                            return false;
                                        }
                                    }
                                    if (self.requiredMonth()) {
                                        if (self.monthValue().startDate && self.monthValue().endDate) {
                                            if (self.monthValue().startDate > self.monthValue().endDate) {
                                                alertError({ messageId: 'Msg_465' });
                                                return false;
                                            }
                                        }
                                        else {
                                            alertError({ messageId: 'Msg_463' });
                                            return false;
                                        }
                                    }
                                    if (self.requiredYear()) {
                                        if (self.yearValue().startDate && self.yearValue().endDate) {
                                            if (self.yearValue().startDate > self.yearValue().endDate) {
                                                alertError({ messageId: 'Msg_465' });
                                                return false;
                                            }
                                        }
                                        else {
                                            alertError({ messageId: 'Msg_463' });
                                            return false;
                                        }
                                    }
                                    return true;
                                };
                                /**
                                * Validate Compress Password
                                * return : boolean (true: Valid ,false: Invalid)
                                */
                                ScreenModel.prototype.checkPass = function () {
                                    var self = this;
                                    //check pass on
                                    if (self.isExistCompressPasswordFlg()) {
                                        // check pass empty
                                        if (self.passwordForCompressFile() && self.confirmPasswordForCompressFile()) {
                                            // compare pass
                                            if (self.passwordForCompressFile() == self.confirmPasswordForCompressFile()) {
                                                return true;
                                            }
                                            else {
                                                alertError({ messageId: 'Msg_566' });
                                                return false;
                                            }
                                        }
                                        else {
                                            alertError({ messageId: 'Msg_463' });
                                            return false;
                                        }
                                    }
                                    else {
                                        return true;
                                    }
                                };
                                /**
                                 * Open screen A
                                 */
                                ScreenModel.prototype.backScreenA = function () {
                                    nts.uk.request.jump("/view/cmf/005/a/index.xhtml");
                                };
                                //load D screen
                                ScreenModel.prototype.initComponentCCG001 = function () {
                                    var self = this;
                                    // Set component option
                                    self.ccg001ComponentOption = {
                                        /** Common properties */
                                        showEmployeeSelection: false,
                                        systemType: self.systemType(),
                                        showQuickSearchTab: true,
                                        showAdvancedSearchTab: true,
                                        showBaseDate: true,
                                        showClosure: false,
                                        showAllClosure: false,
                                        showPeriod: false,
                                        periodFormatYM: false,
                                        /** Quick search tab options */
                                        showAllReferableEmployee: true,
                                        showOnlyMe: true,
                                        showSameWorkplace: true,
                                        showSameWorkplaceAndChild: true,
                                        /** Advanced search properties */
                                        showEmployment: true,
                                        showWorkplace: true,
                                        showClassification: true,
                                        showJobTitle: true,
                                        showWorktype: true,
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
                                        * Self-defined function: Return data from CCG001
                                        * @param: data: the data return from CCG001
                                        */
                                        returnDataFromCcg001: function (data) {
                                            self.selectedTitleAtr(1);
                                            self.initEmployeeList(data.listEmployee);
                                            self.applyKCP005ContentSearch(data.listEmployee);
                                        }
                                    };
                                };
                                ScreenModel.prototype.applyKCP005ContentSearch = function (dataEmployee) {
                                    var self = this;
                                    var employeeSearchs = [];
                                    _.forEach(dataEmployee, function (item) {
                                        employeeSearchs.push(new UnitModel(item.employeeId, item.employeeCode, item.employeeName, item.affiliationName));
                                    });
                                    self.employeeList(employeeSearchs);
                                    self.employeeDeletionList(_.map(self.employeeList(), function (e) { return new EmployeeDeletion(e.code, e.name, e.id, e.code, e.name); }));
                                };
                                ScreenModel.prototype.initComponnentKCP005 = function () {
                                    //KCP005
                                    var self = this;
                                    self.listComponentOption = {
                                        isShowAlreadySet: false,
                                        isMultiSelect: true,
                                        listType: ListType.EMPLOYEE,
                                        employeeInputList: self.employeeList,
                                        selectType: SelectType.SELECT_ALL,
                                        selectedCode: self.selectedEmployeeCode,
                                        isDialog: true,
                                        isShowNoSelectRow: false,
                                        alreadySettingList: self.alreadySettingPersonal,
                                        isShowWorkPlaceName: true,
                                        isShowSelectAllButton: true,
                                        maxWidth: 550,
                                        maxRows: 15,
                                        isSelectAllAfterReload: true
                                    };
                                };
                                /**
                                * back to B
                                */
                                ScreenModel.prototype.previousB = function () {
                                    var self = this;
                                    self.previous();
                                    if (self.rdSelected() == 1) {
                                        $("#B3_5").focus();
                                    }
                                };
                                /**
                                 * back to D
                                 */
                                ScreenModel.prototype.previousD = function () {
                                    var self = this;
                                    self.previous();
                                    $('#D4_2').focus();
                                };
                                /**
                                * validation D form
                                */
                                ScreenModel.prototype.validateD = function () {
                                    var self = this;
                                    if ((self.selectedTitleAtr() == 1 && self.selectedEmployeeCode() && self.selectedEmployeeCode().length > 0)
                                        || (self.selectedTitleAtr() == 0)) {
                                        return true;
                                    }
                                    else {
                                        nts.uk.ui.dialog.error({ messageId: "Msg_498" });
                                        return false;
                                    }
                                };
                                /**
                                 * update the list of selected employees
                                 */
                                ScreenModel.prototype.setEmployeeDeletionList = function () {
                                    var self = this;
                                    self.employeeDeletionList.removeAll();
                                    if (self.selectedTitleAtr() == 1) {
                                        var empCodeLength = self.selectedEmployeeCode().length;
                                        var empListLength = self.employeeList().length;
                                        for (var i = 0; i < empCodeLength; i++) {
                                            for (var j = 0; j < empListLength; j++) {
                                                var employee = self.employeeList()[j];
                                                if (employee.code == self.selectedEmployeeCode()[i]) {
                                                    self.employeeDeletionList.push(new EmployeeDeletion(employee.code, employee.name, employee.id, employee.code, employee.name));
                                                }
                                            }
                                        }
                                        self.employeeDeletionList(_.orderBy(self.employeeDeletionList(), ['code'], ['asc']));
                                    }
                                };
                                /**
                                 * update the list of selected categories
                                 */
                                ScreenModel.prototype.setCategoryDeletionList = function () {
                                    var self = this;
                                    self.categoryDeletionList.removeAll();
                                    for (var i = 0; i < self.listDataCategory().length; i++) {
                                        var category = self.listDataCategory()[i];
                                        self.categoryDeletionList.push(new CategoryDeletion(category.categoryId));
                                    }
                                };
                                /**
                                 * next to E screen
                                 */
                                ScreenModel.prototype.nextFromDToE = function () {
                                    var self = this;
                                    if (self.validateD()) {
                                        self.setEmployeeDeletionList();
                                        self.setCategoryDeletionList();
                                        self.initE();
                                        self.next();
                                        $("#E20_2").focus();
                                    }
                                };
                                /**
                                 * initial E screen
                                 */
                                ScreenModel.prototype.initE = function () {
                                    var self = this;
                                    $("#E4_2").html(self.deleteSetName());
                                    $("#E5_2").html(self.supplementExplanation());
                                    $("#E6_2_2").html(self.systemTypeCbb.name);
                                };
                                ScreenModel.prototype.gotoscreenF = function () {
                                    var self = this;
                                    var params = {};
                                    if (!self.validateD()) {
                                        return;
                                    }
                                    params.delId = self.delId();
                                    params.deleteSetName = self.deleteSetName();
                                    params.dateValue = self.dateValue();
                                    params.monthValue = self.monthValue();
                                    params.yearValue = self.yearValue();
                                    params.saveBeforDelete = self.isSaveBeforeDeleteFlg();
                                    params.modal = self.saveManualSetting();
                                    if (!self.isExistCompressPasswordFlg()) {
                                        self.passwordForCompressFile('');
                                        self.confirmPasswordForCompressFile('');
                                    }
                                    if (Number(self.isSaveBeforeDeleteFlg()) === 1) {
                                        b.service.addMalSet(self.createManualSettings()).then(function (res) {
                                            if (res && res != "") {
                                                setShared("CMF005KParams", {
                                                    storeProcessingId: res,
                                                    dataSaveSetName: self.savedName(),
                                                    dayValue: self.dateValue(),
                                                    monthValue: self.monthValue(),
                                                    yearValue: self.yearValue()
                                                });
                                                nts.uk.ui.windows.sub.modal("/view/cmf/005/k/index.xhtml").onClosed(function () {
                                                    var param = getShared("CMF004KParams");
                                                    if (param.isSuccess) {
                                                        setShared("CMF005_E_PARAMS", params);
                                                        self.saveManualSetting();
                                                        nts.uk.ui.windows.sub.modal("/view/cmf/005/f/index.xhtml").onClosed(function () {
                                                            self.buttonEnable(false);
                                                        });
                                                    }
                                                });
                                            }
                                        }).fail(function (err) { return alertError({ messageId: err.messageId }); });
                                    }
                                    else {
                                        setShared("CMF005_E_PARAMS", params);
                                        nts.uk.ui.windows.sub.modal("/view/cmf/005/f/index.xhtml").onClosed(function () {
                                            self.buttonEnable(false);
                                        });
                                    }
                                };
                                ScreenModel.prototype.createManualSettings = function () {
                                    var self = this;
                                    if (self.employeeDeletionList().length !== self.selectedEmployeeCode().length) {
                                        self.employeeDeletionList(_.filter(self.employeeDeletionList(), function (e) { return _.includes(self.selectedEmployeeCode(), e.code); }));
                                    }
                                    return new ManualSettingModal(self.isExistCompressPasswordFlg() ? 1 : 0, self.deleteSetName(), moment.utc().toISOString(), self.passwordForCompressFile(), moment.utc().toISOString(), moment.utc(self.dateValue().endDate, 'YYYY/MM/DD').toISOString(), moment.utc(self.dateValue().startDate, 'YYYY/MM/DD').toISOString(), moment.utc(self.monthValue().endDate, 'YYYY/MM').toISOString(), moment.utc(self.monthValue().startDate, 'YYYY/MM').toISOString(), self.supplementExplanation(), Number(self.yearValue().endDate), Number(self.yearValue().startDate), self.selectedTitleAtr(), self.employeeDeletionList(), self.listDataCategory(), self.selectedPatternId().substring(1));
                                };
                                ScreenModel.prototype.saveManualSetting = function () {
                                    var self = this;
                                    if (self.employeeDeletionList().length !== self.selectedEmployeeCode().length) {
                                        self.employeeDeletionList(_.filter(self.employeeDeletionList(), function (e) { return _.includes(self.selectedEmployeeCode(), e.code); }));
                                    }
                                    return new DelManualSettingModal(self.deleteSetName(), self.supplementExplanation(), self.systemType(), moment.utc(self.referenceDate, 'YYYY/MM/DD').toISOString(), moment.utc().toISOString(), moment.utc(self.dateValue().startDate, 'YYYY/MM/DD').toISOString(), moment.utc(self.dateValue().endDate, 'YYYY/MM/DD').toISOString(), moment.utc(self.monthValue().startDate, 'YYYY/MM').toISOString(), moment.utc(self.monthValue().endDate, 'YYYY/MM').toISOString(), self.yearValue().startDate, self.yearValue().endDate, Number(self.isSaveBeforeDeleteFlg()), Number(self.isExistCompressPasswordFlg()), self.passwordForCompressFile(), Number(self.selectedTitleAtr()), self.selectedPatternId().substring(1), self.employeeDeletionList(), self.listDataCategory());
                                };
                                /**
                                 *
                                 */
                                ScreenModel.prototype.scrollBottomToLeft = function () {
                                    $("#contents-area").scrollLeft(0);
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            function timeStore(value, row) {
                                if (value == model.TIME_STORE.MONTHLY) {
                                    return getText('Enum_TimeStore_MONTHLY');
                                }
                                else if (value == model.TIME_STORE.ANNUAL) {
                                    return getText('Enum_TimeStore_ANNUAL');
                                }
                                else if (value == model.TIME_STORE.FULL_TIME) {
                                    return getText('Enum_TimeStore_FULL_TIME');
                                }
                                else if (value == model.TIME_STORE.DAILY) {
                                    return getText('Enum_TimeStore_DAILY');
                                }
                            }
                            function storageRangeSaved(value, row) {
                                if (value == model.STORAGE_RANGE_SAVE.EARCH_EMP) {
                                    return getText('Enum_StorageRangeSaved_EARCH_EMP');
                                }
                                else if (value == model.STORAGE_RANGE_SAVE.ALL_EMP) {
                                    return getText('Enum_StorageRangeSaved_ALL_EMP');
                                }
                            }
                            var UnitModel = /** @class */ (function () {
                                function UnitModel(id, code, name, affiliationName) {
                                    this.id = id;
                                    this.code = code;
                                    this.name = name;
                                    this.affiliationName = affiliationName;
                                }
                                return UnitModel;
                            }());
                            viewmodel.UnitModel = UnitModel;
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
                            var EmployeeDeletion = /** @class */ (function () {
                                function EmployeeDeletion(code, name, employeeId, employeeCode, businessName) {
                                    this.code = code;
                                    this.name = name;
                                    this.employeeId = employeeId;
                                    this.employeeCode = employeeCode;
                                    this.businessName = businessName;
                                }
                                return EmployeeDeletion;
                            }());
                            viewmodel.EmployeeDeletion = EmployeeDeletion;
                            var DelManualSettingModal = /** @class */ (function () {
                                function DelManualSettingModal(delName, suppleExplanation, systemType, referenceDate, executionDateAndTime, dayStartDate, dayEndDate, monthStartDate, monthEndDate, startYear, endYear, isSaveBeforeDeleteFlg, isExistCompressPasswordFlg, passwordForCompressFile, haveEmployeeSpecifiedFlg, delPattern, employees, categories) {
                                    this.delName = delName;
                                    this.suppleExplanation = suppleExplanation;
                                    this.systemType = systemType;
                                    this.referenceDate = referenceDate;
                                    this.executionDateAndTime = executionDateAndTime;
                                    this.dayStartDate = dayStartDate;
                                    this.dayEndDate = dayEndDate;
                                    this.monthStartDate = monthStartDate;
                                    this.monthEndDate = monthEndDate;
                                    this.startYear = startYear;
                                    this.endYear = endYear;
                                    this.isSaveBeforeDeleteFlg = isSaveBeforeDeleteFlg;
                                    this.isExistCompressPasswordFlg = isExistCompressPasswordFlg;
                                    this.passwordForCompressFile = passwordForCompressFile;
                                    this.haveEmployeeSpecifiedFlg = haveEmployeeSpecifiedFlg;
                                    this.employees = employees;
                                    this.delPattern = delPattern;
                                    this.categories = categories;
                                }
                                return DelManualSettingModal;
                            }());
                            viewmodel.DelManualSettingModal = DelManualSettingModal;
                            var ManualSettingModal = /** @class */ (function () {
                                function ManualSettingModal(passwordAvailability, saveSetName, referenceDate, compressedPassword, executionDateAndTime, daySaveEndDate, daySaveStartDate, monthSaveEndDate, monthSaveStartDate, suppleExplanation, endYear, startYear, presenceOfEmployee, employees, category, patternCode) {
                                    this.passwordAvailability = passwordAvailability;
                                    this.saveSetName = saveSetName;
                                    this.referenceDate = referenceDate;
                                    this.compressedPassword = compressedPassword ? compressedPassword : null;
                                    this.executionDateAndTime = executionDateAndTime;
                                    this.daySaveEndDate = daySaveEndDate ? daySaveEndDate : null;
                                    this.daySaveStartDate = daySaveStartDate ? daySaveStartDate : null;
                                    this.monthSaveEndDate = monthSaveEndDate ? monthSaveEndDate : null;
                                    this.monthSaveStartDate = monthSaveStartDate ? monthSaveStartDate : null;
                                    this.suppleExplanation = suppleExplanation ? suppleExplanation : null;
                                    this.endYear = endYear ? endYear : null;
                                    this.startYear = startYear ? startYear : null;
                                    this.presenceOfEmployee = presenceOfEmployee;
                                    this.employees = _.map(employees, function (e) { return new Employee(e.employeeId, e.employeeCode, e.businessName); });
                                    this.category = category;
                                    this.patternCode = patternCode;
                                }
                                return ManualSettingModal;
                            }());
                            viewmodel.ManualSettingModal = ManualSettingModal;
                            var CategoryDeletion = /** @class */ (function () {
                                function CategoryDeletion(categoryId) {
                                    this.categoryId = categoryId;
                                    this.periodDeletion = null;
                                }
                                return CategoryDeletion;
                            }());
                            viewmodel.CategoryDeletion = CategoryDeletion;
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
                            var Employee = /** @class */ (function () {
                                function Employee(sid, scd, businessname) {
                                    this.sid = sid;
                                    this.scd = scd;
                                    this.businessname = businessname;
                                }
                                return Employee;
                            }());
                            viewmodel.Employee = Employee;
                        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                    })(b = cmf005.b || (cmf005.b = {}));
                })(cmf005 = view.cmf005 || (view.cmf005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf005.b.vm.js.map