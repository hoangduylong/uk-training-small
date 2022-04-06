var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf002;
                (function (cmf002) {
                    var o;
                    (function (o_1) {
                        var viewmodel;
                        (function (viewmodel) {
                            var model = cmf002.share.model;
                            var alertError = nts.uk.ui.dialog.alertError;
                            var error = nts.uk.ui.errors;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var block = nts.uk.ui.block;
                            var isNullOrUndefined = nts.uk.util.isNullOrUndefined;
                            var textLink = nts.uk.resource.getText("CMF002_235");
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    //wizard
                                    this.stepList = [];
                                    this.stepSelected = ko.observable(null);
                                    this.activeStep = ko.observable(0);
                                    this.listCondition = ko.observableArray([]);
                                    this.selectedConditionCd = ko.observable('');
                                    this.selectedConditionName = ko.observable('');
                                    this.periodDateValue = ko.observable({
                                        startDate: moment.utc().format("YYYY/MM/DD"),
                                        endDate: moment.utc().format("YYYY/MM/DD")
                                    });
                                    this.listOutputItem = ko.observableArray([]);
                                    this.selectedOutputItemCode = ko.observable('');
                                    this.listOutputCondition = ko.observableArray([]);
                                    this.selectedOutputConditionItem = ko.observable('');
                                    // check screen
                                    this.isPNextToR = ko.observable(true);
                                    this.referenceDate = ko.observable(moment.utc().toISOString());
                                    // data return from ccg001
                                    this.dataCcg001 = [];
                                    this.startDate = ko.observable('');
                                    this.endDate = ko.observable('');
                                    //Q5_1
                                    this.conditionSettingName = ko.observable('');
                                    this.mode = ko.observable(MODE.NEW);
                                    this.isLoadScreenQ = false;
                                    this.exOutCtgDto = ko.observable('');
                                    this.closureId = ko.observable('');
                                    this.closureLists = ko.observableArray([]);
                                    this.show61DatePeriod = ko.observable(false);
                                    this.show61YmPeriod = ko.observable(false);
                                    this.show61Date = ko.observable(false);
                                    this.show81DatePeriod = ko.observable(false);
                                    this.show81YmPeriod = ko.observable(false);
                                    this.show81Date = ko.observable(false);
                                    this.date61 = ko.observable('');
                                    this.isNoData = ko.observable(true);
                                    var self = this;
                                    //起動する
                                    self.stepList = [
                                        // { content: '.step-1' },
                                        { content: '.step-2' },
                                        { content: '.step-3' },
                                        { content: '.step-4' }
                                    ];
                                    self.dataEmployeeId = [];
                                    self.valueItemFixedForm = ko.observable('');
                                    // set up date time P6_1
                                    self.stepSelected = ko.observable({ id: 'step-4', content: '.step-4' });
                                    self.alreadySettingPersonal = ko.observableArray([]);
                                    self.baseDate = ko.observable(new Date());
                                    self.selectedEmployee = ko.observableArray([]);
                                    self.roleAuthority = getShared("CMF002O_PARAMS");
                                    //set up kcp005
                                    self.selectedCode = ko.observable('1');
                                    self.multiSelectedCode = ko.observableArray(["1"]);
                                    self.isShowAlreadySet = ko.observable(false);
                                    self.alreadySettingList = ko.observableArray([
                                        { code: '1', isAlreadySetting: true },
                                        { code: '2', isAlreadySetting: true }
                                    ]);
                                    self.isDialog = ko.observable(false);
                                    self.isShowNoSelectRow = ko.observable(false);
                                    self.isMultiSelect = ko.observable(true);
                                    self.isShowWorkPlaceName = ko.observable(false);
                                    self.isShowSelectAllButton = ko.observable(false);
                                    this.employeeList = ko.observableArray([]);
                                    self.listComponentOption = {
                                        isShowAlreadySet: self.isShowAlreadySet(),
                                        isMultiSelect: self.isMultiSelect(),
                                        listType: ListType.EMPLOYEE,
                                        employeeInputList: self.employeeList,
                                        selectType: SelectType.SELECT_ALL,
                                        selectedCode: self.selectedCode,
                                        isDialog: self.isDialog(),
                                        isShowNoSelectRow: self.isShowNoSelectRow(),
                                        alreadySettingList: self.alreadySettingList,
                                        isShowWorkPlaceName: self.isShowWorkPlaceName(),
                                        isShowSelectAllButton: self.isShowSelectAllButton(),
                                        maxRows: 8
                                    };
                                    self.selectedConditionCd.subscribe(function (data) {
                                        if (!data) {
                                            self.selectedConditionCd('');
                                            self.selectedConditionName('');
                                        }
                                        else {
                                            var conditionName = _.find(self.listCondition(), { 'code': self.selectedConditionCd() }).name;
                                            self.selectedConditionName(conditionName);
                                            var catelogoryId = _.find(self.listCondition(), { 'code': self.selectedConditionCd() }).catelogoryId;
                                            block.invisible();
                                            o_1.service.getExOutCtgDto(catelogoryId).done(function (data) {
                                                if (data) {
                                                    self.isNoData(false);
                                                    var ex = data.exOutCtgDto;
                                                    var closureExports = data.closureExports;
                                                    self.closureLists(closureExports);
                                                    self.exOutCtgDto(ex);
                                                    self.periodDateValue({
                                                        startDate: moment.utc().format("YYYY/MM/DD"),
                                                        endDate: moment.utc().format("YYYY/MM/DD")
                                                    });
                                                    // show61DatePeriod
                                                    //外部出期間区分
                                                    var outingPeriodClassific = ex.outingPeriodClassific;
                                                    var classificationToUse = ex.classificationToUse;
                                                    if (outingPeriodClassific == OUTPUTCLASSS.DATE) {
                                                        if (classificationToUse === TOUSE.DO_NOT_USE) {
                                                            self.show61DatePeriod(true);
                                                            self.show61YmPeriod(false);
                                                            self.show61Date(false);
                                                            self.show81DatePeriod(false);
                                                            self.show81YmPeriod(false);
                                                            self.show81Date(false);
                                                        }
                                                        else {
                                                            self.show81DatePeriod(true);
                                                            self.show61DatePeriod(false);
                                                            self.show61YmPeriod(false);
                                                            self.show61Date(false);
                                                            self.show81YmPeriod(false);
                                                            self.show81Date(false);
                                                        }
                                                    }
                                                    if (outingPeriodClassific == OUTPUTCLASSS.YEAR_MONTH) {
                                                        if (classificationToUse === TOUSE.DO_NOT_USE) {
                                                            self.show61YmPeriod(true);
                                                            self.show61DatePeriod(false);
                                                            self.show61Date(false);
                                                            self.show81DatePeriod(false);
                                                            self.show81YmPeriod(false);
                                                            self.show81Date(false);
                                                        }
                                                        else {
                                                            self.show81YmPeriod(true);
                                                            self.show61DatePeriod(false);
                                                            self.show61YmPeriod(false);
                                                            self.show61Date(false);
                                                            self.show81DatePeriod(false);
                                                            self.show81Date(false);
                                                        }
                                                    }
                                                    if (outingPeriodClassific == OUTPUTCLASSS.REFERENCE_DATE) {
                                                        var date = moment.utc().format("YYYY/MM/DD");
                                                        self.date61(date);
                                                        self.show61Date(true);
                                                        self.show61DatePeriod(false);
                                                        self.show61YmPeriod(false);
                                                        self.show81DatePeriod(false);
                                                        self.show81YmPeriod(false);
                                                        self.show81Date(false);
                                                    }
                                                    if (outingPeriodClassific == OUTPUTCLASSS.NO_SETTING) {
                                                        self.show81Date(true);
                                                        self.show61DatePeriod(false);
                                                        self.show61YmPeriod(false);
                                                        self.show61Date(false);
                                                        self.show81DatePeriod(false);
                                                        self.show81YmPeriod(false);
                                                    }
                                                }
                                                else {
                                                }
                                            }).always(function () {
                                                block.clear();
                                            });
                                        }
                                    });
                                    self.date61.subscribe(function (data) {
                                        self.periodDateValue({
                                            startDate: data,
                                            endDate: data
                                        });
                                        self.referenceDate(data);
                                    });
                                    self.periodDateValue.subscribe(function (data) {
                                        var periodStartDate = moment.utc(self.periodDateValue().startDate, "YYYY/MM/DD").toISOString();
                                    });
                                    self.closureId.subscribe(function (closureId) {
                                        var cl = _.find(self.closureLists(), { 'closureId': closureId });
                                        var startDate = null;
                                        var endDate = null;
                                        if (!isNullOrUndefined(cl)) {
                                            startDate = cl.startDate;
                                            endDate = cl.endDate;
                                        }
                                        if (self.show81Date()) {
                                            self.periodDateValue({
                                                startDate: null,
                                                endDate: null
                                            });
                                        }
                                        if (self.show81DatePeriod()) {
                                            self.periodDateValue({
                                                startDate: startDate,
                                                endDate: endDate
                                            });
                                        }
                                        if (self.show81YmPeriod()) {
                                            self.periodDateValue({
                                                startDate: startDate,
                                                endDate: endDate
                                            });
                                        }
                                    });
                                }
                                /**
                                 * apply ccg001 search data to kcp005
                                 */
                                ScreenModel.prototype.applyKCP005ContentSearch = function (dataList) {
                                    var employeeSearchs = [];
                                    for (var _i = 0, dataList_1 = dataList; _i < dataList_1.length; _i++) {
                                        var employeeSearch = dataList_1[_i];
                                        var employee = {
                                            code: employeeSearch.employeeCode,
                                            name: employeeSearch.employeeName,
                                            affiliationName: employeeSearch.affiliationName,
                                            isAlreadySetting: false
                                        };
                                        employeeSearchs.push(employee);
                                    }
                                    this.employeeList(employeeSearchs);
                                };
                                ScreenModel.prototype.selectStandardMode = function () {
                                    block.invisible();
                                    var self = this;
                                    $('.content.clearfix .body').attr('style', '');
                                    o_1.service.getConditionSetting(new ParamToScreenP("", "", self.roleAuthority.empRole[0])).done(function (res) {
                                        {
                                            var dataCndSetCd = res;
                                            self.loadListCondition(dataCndSetCd);
                                            // $('#ex_output_wizard').ntsWizard("next");
                                            $("#grd_Condition_container").focus();
                                            block.clear();
                                        }
                                    }).fail(function (res) {
                                        self.mode(MODE.NO);
                                        // $('#ex_output_wizard').ntsWizard("next");
                                        alertError(res);
                                        block.clear();
                                    });
                                };
                                ScreenModel.prototype.next = function () {
                                    var self = this;
                                    //            if($('.body.current').attr('id') == 'ex_output_wizard-p-1' ){
                                    //                $('.content.clearfix .body').attr('style', '');
                                    //            }
                                    $('#ex_output_wizard').ntsWizard("next");
                                };
                                ScreenModel.prototype.previous = function () {
                                    $('#component-items-list').ntsError('clear');
                                    //            if($('.body.current').attr('id') == 'ex_output_wizard-p-1' ){
                                    //                $('.content.clearfix .body').attr('style', '');
                                    //            }
                                    $('#ex_output_wizard').ntsWizard("prev");
                                };
                                ScreenModel.prototype.todoScreenQ = function () {
                                    var self = this;
                                    $('.content.clearfix .body').attr('style', '');
                                    if (nts.uk.ui.errors.hasError()) {
                                        return;
                                    }
                                    error.clearAll();
                                    var data = self.exOutCtgDto();
                                    if (data.categorySet == model.CATEGORY_SETTING.DATA_TYPE) {
                                        $('#ex_output_wizard').ntsWizard("goto", 1);
                                        self.isPNextToR(false);
                                        self.loadScreenQ();
                                    }
                                    else {
                                        $('#ex_output_wizard').ntsWizard("goto", 2);
                                        self.isPNextToR(true);
                                        self.initScreenR();
                                    }
                                };
                                //find list id from list code
                                ScreenModel.prototype.findListId = function (dataListCode) {
                                    return _.filter(this.dataCcg001, function (o) {
                                        return _.includes(dataListCode, o.employeeCode);
                                    }).map(function (item) { return item.employeeId; });
                                };
                                ScreenModel.prototype.backFromR = function () {
                                    var self = this;
                                    if (self.isPNextToR()) {
                                        // back To P
                                        $('#ex_output_wizard').ntsWizard("goto", 0);
                                    }
                                    else {
                                        // back To Q
                                        $('#ex_output_wizard').ntsWizard("goto", 1);
                                    }
                                };
                                ScreenModel.prototype.nextToScreenR = function () {
                                    var self = this;
                                    $('#component-items-list').ntsError('clear');
                                    // get list to pass screen R
                                    // 外部出力実行社員選択チェック
                                    self.dataEmployeeId = self.findListId(self.selectedCode());
                                    if (self.dataEmployeeId.length == 0) {
                                        alertError({ messageId: 'Msg_657' });
                                        //$('#component-items-list').ntsError('set', {messageId:"Msg_657"});
                                    }
                                    else {
                                        self.next();
                                        self.initScreenR();
                                    }
                                };
                                ScreenModel.prototype.initScreenR = function () {
                                    var self = this;
                                    o_1.service.getExOutSummarySetting(self.selectedConditionCd()).done(function (res) {
                                        self.listOutputCondition(_.map(res.ctgItemDataCustomList, function (itemData) {
                                            itemData.conditions = self.formatData(itemData.conditions, itemData.dataType);
                                            return itemData;
                                        }));
                                        self.listOutputItem(res.ctdOutItemCustomList);
                                        $(".createExOutText").focus();
                                    }).fail(function (res) {
                                        console.log("getExOutSummarySetting fail");
                                    });
                                };
                                ScreenModel.prototype.formatData = function (data, typeData) {
                                    var self = this;
                                    if (_.isEmpty(data))
                                        return data;
                                    if (typeData == model.ITEM_TYPE.INS_TIME || typeData == model.ITEM_TYPE.TIME) {
                                        var typeFormat = typeData == model.ITEM_TYPE.INS_TIME ? "Clock_Short_HM" : "Time_Short_HM";
                                        if (data.indexOf(textLink) != -1) {
                                            return nts.uk.time.format.byId(typeFormat, Number(data.split(textLink)[0])) + textLink + nts.uk.time.format.byId(typeFormat, Number(data.split(textLink)[1]));
                                        }
                                        else {
                                            return nts.uk.time.format.byId(typeFormat, Number(data.split("|")[0])) + data.split("|")[1];
                                        }
                                    }
                                    else {
                                        return data;
                                    }
                                };
                                ScreenModel.prototype.createExOutText = function () {
                                    block.invisible();
                                    var self = this;
                                    var conditionSetCd = self.selectedConditionCd();
                                    var userId = "";
                                    var startDate = moment.utc(self.periodDateValue().startDate, "YYYY/MM/DD").toISOString();
                                    var lastDayOfMonth = "";
                                    var endDate = "";
                                    if (self.show61YmPeriod() || self.show81YmPeriod()) {
                                        endDate = moment.utc(moment(self.periodDateValue().endDate, "YYYY/MM/DD").endOf('month')).startOf('day').toISOString();
                                    }
                                    else {
                                        endDate = moment.utc(self.periodDateValue().endDate, "YYYY/MM/DD").toISOString();
                                    }
                                    var referenceDate = self.referenceDate();
                                    var standardType = true;
                                    var sidList = self.dataEmployeeId;
                                    var command = new CreateExOutTextCommand(conditionSetCd, userId, startDate, endDate, referenceDate, standardType, sidList);
                                    o_1.service.createExOutText(command).done(function (res) {
                                        block.clear();
                                        var params = {
                                            processingId: res,
                                            startDate: startDate,
                                            endDate: endDate,
                                            selectedConditionCd: conditionSetCd,
                                            selectedConditionName: self.selectedConditionName()
                                        };
                                        setShared("CMF002_R_PARAMS", params);
                                        nts.uk.ui.windows.sub.modal("/view/cmf/002/s/index.xhtml").onClosed(function () {
                                            $('#ex_output_wizard').ntsWizard("goto", 0);
                                        });
                                    }).fail(function (res) {
                                        block.clear();
                                        console.log("createExOutText fail");
                                    });
                                };
                                ScreenModel.prototype.loadListCondition = function (dataCndSetCd) {
                                    var self = this;
                                    var listItemModel = [];
                                    _.forEach(dataCndSetCd, function (item) {
                                        listItemModel.push(new DisplayTableName(item.categoryId, item.conditionSetCd, item.conditionSetName));
                                    });
                                    self.listCondition(listItemModel);
                                    self.selectedConditionCd(self.listCondition()[0].code);
                                    self.selectedConditionName(self.listCondition()[0].name);
                                };
                                ScreenModel.prototype.loadScreenQ = function () {
                                    var self = this;
                                    //          fix bug 102743
                                    //            if(self.isLoadScreenQ){
                                    //                return;
                                    //            }
                                    //            self.isLoadScreenQ = true;
                                    $("#component-items-list").focus();
                                    self.startDate(self.periodDateValue().startDate);
                                    self.endDate(self.periodDateValue().endDate);
                                    self.conditionSettingName(self.selectedConditionCd().toString() + ' ' + self.selectedConditionName().toString());
                                    self.ccgcomponent = {
                                        /** Common properties */
                                        systemType: 5,
                                        showEmployeeSelection: false,
                                        showQuickSearchTab: true,
                                        showAdvancedSearchTab: true,
                                        showBaseDate: true,
                                        showClosure: false,
                                        showAllClosure: false,
                                        showPeriod: false,
                                        periodFormatYM: false,
                                        /** Required parameter */
                                        baseDate: moment.utc().toISOString(),
                                        periodStartDate: moment.utc(self.periodDateValue().startDate, "YYYY/MM/DD").toISOString(),
                                        periodEndDate: moment.utc(self.periodDateValue().endDate, "YYYY/MM/DD").toISOString(),
                                        inService: true,
                                        leaveOfAbsence: true,
                                        closed: true,
                                        retirement: true,
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
                                        /** Return data */
                                        returnDataFromCcg001: function (data) {
                                            self.dataCcg001 = data.listEmployee;
                                            self.applyKCP005ContentSearch(data.listEmployee);
                                            self.referenceDate(data.baseDate);
                                            $('#component-items-list').ntsError('clear');
                                        }
                                    };
                                    $('#component-items-list').ntsListComponent(self.listComponentOption).done(function () {
                                        $('#component-items-list').focusComponent();
                                    });
                                    $('#com-ccg001').ntsGroupComponent(self.ccgcomponent);
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
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
                            var OutputCondition = /** @class */ (function () {
                                function OutputCondition(seriNum, itemName, condition, dataType, displayClassfication) {
                                    this.seriNum = seriNum;
                                    this.itemName = itemName;
                                    this.conditions = condition;
                                    this.dataType = dataType;
                                    this.displayClassfication = displayClassfication;
                                }
                                return OutputCondition;
                            }());
                            var ParamToScreenP = /** @class */ (function () {
                                function ParamToScreenP(modeScreen, cndSetCd, roleId) {
                                    this.modeScreen = modeScreen;
                                    this.cndSetCd = cndSetCd;
                                    this.roleId = roleId;
                                }
                                return ParamToScreenP;
                            }());
                            var CreateExOutTextCommand = /** @class */ (function () {
                                function CreateExOutTextCommand(conditionSetCd, userId, startDate, endDate, referenceDate, standardType, sidList) {
                                    this.conditionSetCd = conditionSetCd;
                                    this.userId = userId;
                                    this.startDate = moment.utc(startDate);
                                    this.endDate = moment.utc(endDate);
                                    this.referenceDate = moment.utc(referenceDate);
                                    this.standardType = standardType;
                                    this.sidList = sidList;
                                }
                                return CreateExOutTextCommand;
                            }());
                            var StdOutputCondSetDto = /** @class */ (function () {
                                function StdOutputCondSetDto(cid, conditionSetCode, categoryId, delimiter, itemOutputName, autoExecution, conditionSetName, conditionOutputName, stringFormat) {
                                    this.cid = cid;
                                    this.conditionSetCode = conditionSetCode;
                                    this.categoryId = categoryId;
                                    this.delimiter = delimiter;
                                    this.itemOutputName = itemOutputName;
                                    this.autoExecution = autoExecution;
                                    this.conditionSetName = conditionSetName;
                                    this.conditionOutputName = conditionOutputName;
                                    this.stringFormat = stringFormat;
                                }
                                return StdOutputCondSetDto;
                            }());
                            var ExOutCtgDto = /** @class */ (function () {
                                function ExOutCtgDto(categoryId, officeHelperSysAtr, categoryName, categorySet, personSysAtr, payrollSysAtr, functionNo, functionName, explanation, displayOrder, defaultValue, outingPeriodClassific, classificationToUse) {
                                    this.categoryId = categoryId;
                                    this.officeHelperSysAtr = officeHelperSysAtr;
                                    this.categoryName = categoryName;
                                    this.categorySet = categorySet;
                                    this.personSysAtr = personSysAtr;
                                    this.payrollSysAtr = payrollSysAtr;
                                    this.functionNo = functionNo;
                                    this.functionName = functionName;
                                    this.explanation = explanation;
                                    this.displayOrder = displayOrder;
                                    this.defaultValue = defaultValue;
                                    this.outingPeriodClassific = outingPeriodClassific;
                                    this.classificationToUse = classificationToUse;
                                }
                                return ExOutCtgDto;
                            }());
                            var DisplayTableName = /** @class */ (function () {
                                function DisplayTableName(catelogoryId, code, name) {
                                    this.catelogoryId = catelogoryId;
                                    this.code = code;
                                    this.name = name;
                                }
                                return DisplayTableName;
                            }());
                            viewmodel.DisplayTableName = DisplayTableName;
                            var MODE;
                            (function (MODE) {
                                MODE[MODE["NEW"] = 0] = "NEW";
                                MODE[MODE["UPDATE"] = 1] = "UPDATE";
                                MODE[MODE["NO"] = 2] = "NO";
                            })(MODE = viewmodel.MODE || (viewmodel.MODE = {}));
                            var OUTPUTCLASSS;
                            (function (OUTPUTCLASSS) {
                                /**
                                 * 基準日
                                 */
                                OUTPUTCLASSS[OUTPUTCLASSS["REFERENCE_DATE"] = 3] = "REFERENCE_DATE";
                                /**
                                 * 年月
                                 */
                                OUTPUTCLASSS[OUTPUTCLASSS["YEAR_MONTH"] = 2] = "YEAR_MONTH";
                                /**
                                 * 年月日
                                 */
                                OUTPUTCLASSS[OUTPUTCLASSS["DATE"] = 1] = "DATE";
                                /**
                                 * 設定なし
                                 */
                                OUTPUTCLASSS[OUTPUTCLASSS["NO_SETTING"] = 0] = "NO_SETTING";
                            })(OUTPUTCLASSS = viewmodel.OUTPUTCLASSS || (viewmodel.OUTPUTCLASSS = {}));
                            var TOUSE;
                            (function (TOUSE) {
                                /**
                                 * 使う
                                 */
                                TOUSE[TOUSE["USE"] = 1] = "USE";
                                /**
                                 * 年月
                                 */
                                TOUSE[TOUSE["DO_NOT_USE"] = 0] = "DO_NOT_USE";
                            })(TOUSE = viewmodel.TOUSE || (viewmodel.TOUSE = {}));
                        })(viewmodel = o_1.viewmodel || (o_1.viewmodel = {}));
                    })(o = cmf002.o || (cmf002.o = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.o.vm.js.map