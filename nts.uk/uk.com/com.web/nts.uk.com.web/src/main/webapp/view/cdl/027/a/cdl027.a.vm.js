var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cdl027;
                (function (cdl027) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var block = nts.uk.ui.block;
                            var getText = nts.uk.resource.getText;
                            var alertError = nts.uk.ui.dialog.alertError;
                            var getShared = nts.uk.ui.windows.getShared;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.columnsByDate = [
                                        { headerText: getText('CDL027_7'), key: 'targetDate', dataType: 'string', width: '120px' },
                                        { headerText: getText('CDL027_4'), key: 'targetUser', dataType: 'string', width: '120px' },
                                        { headerText: getText('CDL027_8'), key: 'item', dataType: 'string', width: '120px' },
                                        { headerText: getText('CDL027_9'), key: 'valueBefore', dataType: 'string', width: '120px' },
                                        { headerText: getText('CDL027_10'), key: 'arrow', dataType: 'string', width: '20px' },
                                        { headerText: getText('CDL027_11'), key: 'valueAfter', dataType: 'string', width: '120px' },
                                        { headerText: getText('CDL027_12'), key: 'modifiedPerson', dataType: 'string', width: '120px' },
                                        { headerText: getText('CDL027_13'), key: 'modifiedDateTime', dataType: 'string', width: '170px' },
                                        { headerText: getText('CDL027_14'), key: 'correctionAttr', dataType: 'string', width: '70px' }
                                    ];
                                    this.columnsByIndividual = [
                                        { headerText: getText('CDL027_4'), key: 'targetUser', dataType: 'string', width: '120px' },
                                        { headerText: getText('CDL027_7'), key: 'targetDate', dataType: 'string', width: '120px' },
                                        { headerText: getText('CDL027_8'), key: 'item', dataType: 'string', width: '120px' },
                                        { headerText: getText('CDL027_9'), key: 'valueBefore', dataType: 'string', width: '120px' },
                                        { headerText: getText('CDL027_10'), key: 'arrow', dataType: 'string', width: '20px' },
                                        { headerText: getText('CDL027_11'), key: 'valueAfter', dataType: 'string', width: '120px' },
                                        { headerText: getText('CDL027_12'), key: 'modifiedPerson', dataType: 'string', width: '120px' },
                                        { headerText: getText('CDL027_13'), key: 'modifiedDateTime', dataType: 'string', width: '170px' },
                                        { headerText: getText('CDL027_14'), key: 'correctionAttr', dataType: 'string', width: '70px' }
                                    ];
                                    var self = this;
                                    self.items = ko.observableArray([]);
                                    self.params = getShared("CDL027Params");
                                    self.targetStart = self.formatTargetDate(self.params.functionId, self.params.period.startDate);
                                    self.targetEnd = self.params.functionId == FUNCTION_ID.Monthly ? null : self.formatTargetDate(self.params.functionId, self.params.period.endDate);
                                    // self.targetEnd = self.formatTargetDate(self.params.functionId, self.params.period.endDate);
                                    switch (self.params.functionId) {
                                        case FUNCTION_ID.Daily:
                                        case FUNCTION_ID.Monthly:
                                        case FUNCTION_ID.Salary:
                                        case FUNCTION_ID.Bonus:
                                        case FUNCTION_ID.Year_end_adjustment:
                                            break;
                                        default:
                                            self.columnsByDate.pop();
                                            self.columnsByIndividual.pop();
                                            break;
                                    }
                                }
                                ScreenModel.prototype.startPage = function () {
                                    var self = this, dfd = $.Deferred();
                                    block.grayout();
                                    a.service.getLogInfor(self.formatParams()).done(function (result) {
                                        if (result && result.length) {
                                            result = _.sortBy(result, [function (o) { return o.modifiedDateTime; }]).reverse();
                                            for (var i = 0; i < result.length; i++) {
                                                var r = result[i];
                                                self.items.push(new DataCorrectionLog(self.formatTargetDate(self.params.functionId, r.targetDate), r.targetUser, r.item, r.valueBefore, r.valueAfter, r.modifiedPerson, r.modifiedDateTime, r.correctionAttr));
                                            }
                                        }
                                    }).fail(function (error) {
                                        alertError(error);
                                    }).always(function () {
                                        self.initIGrid();
                                        dfd.resolve();
                                        block.clear();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.exportCsv = function () {
                                    var self = this, l = self.items().length;
                                    if (l > 0) {
                                        block.grayout();
                                        a.service.exportCsv(self.formatParams()).always(function () {
                                            block.clear();
                                        });
                                    }
                                    else {
                                        alertError({ messageId: "Msg_37" });
                                    }
                                };
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.formatParams = function () {
                                    var self = this;
                                    var _params = {
                                        pgid: self.params.pgid,
                                        functionId: self.params.functionId,
                                        listEmployeeId: self.params.listEmployeeId,
                                        displayFormat: self.params.displayFormat,
                                        startYmd: null, endYmd: null,
                                        startYm: null, endYm: null,
                                        startY: null, endY: null
                                    };
                                    //            if (self.params.functionId == null) {
                                    switch (self.params.functionId) {
                                        case FUNCTION_ID.Schedule:
                                        case FUNCTION_ID.Daily:
                                            _params.startYmd = moment.utc(self.params.period.startDate, "YYYY/MM/DD").toISOString();
                                            _params.endYmd = moment.utc(self.params.period.endDate, "YYYY/MM/DD").toISOString();
                                            return _params;
                                        case FUNCTION_ID.Any_period:
                                        case FUNCTION_ID.Salary:
                                        case FUNCTION_ID.Bonus:
                                        case FUNCTION_ID.Monthly_calculation:
                                        case FUNCTION_ID.Raising_rising_back:
                                            _params.startYm = parseInt(moment.utc(self.params.period.startDate, "YYYY/MM").format("YYYYMM"), 10);
                                            _params.endYm = parseInt(moment.utc(self.params.period.endDate, "YYYY/MM").format("YYYYMM"), 10);
                                            return _params;
                                        case FUNCTION_ID.Monthly:
                                            _params.endYmd = moment.utc(self.params.period.endDate, "YYYY/MM/DD").toISOString();
                                            _params.startYm = parseInt(moment.utc(self.params.period.startDate, "YYYY/MM").format("YYYYMM"), 10);
                                            return _params;
                                        default:
                                            _params.startY = parseInt(self.params.period.startDate, 10);
                                            _params.endY = parseInt(self.params.period.endDate, 10);
                                            return _params;
                                    }
                                    //            } else {
                                    //            }
                                };
                                ScreenModel.prototype.formatTargetDate = function (functionId, date) {
                                    switch (functionId) {
                                        case FUNCTION_ID.Schedule:
                                        case FUNCTION_ID.Daily:
                                            return date;
                                        case FUNCTION_ID.Monthly:
                                        case FUNCTION_ID.Any_period:
                                        case FUNCTION_ID.Salary:
                                        case FUNCTION_ID.Bonus:
                                        case FUNCTION_ID.Monthly_calculation:
                                        case FUNCTION_ID.Raising_rising_back:
                                            return moment.utc(date, "YYYY/MM/DD").format("YYYY/MM");
                                        default:
                                            return moment.utc(date, "YYYY/MM/DD").format("YYYY");
                                    }
                                };
                                ScreenModel.prototype.initIGrid = function () {
                                    var self = this;
                                    $("#list").igGrid({
                                        height: '375px',
                                        width: '1000px',
                                        dataSource: self.items(),
                                        columns: self.params.displayFormat == DISPLAY_FORMAT.BY_DATE ? self.columnsByDate : self.columnsByIndividual,
                                        features: [
                                            {
                                                name: 'Paging',
                                                type: "local",
                                                pageSize: 100,
                                                currentPageIndex: 0,
                                                showPageSizeDropDown: true,
                                                pageCountLimit: 20
                                            },
                                            {
                                                name: "Filtering",
                                                type: "local",
                                                mode: "simple",
                                                columnSettings: [
                                                    { columnKey: "arrow", allowFiltering: false },
                                                    { columnKey: "modifiedPerson", allowFiltering: false }
                                                ]
                                            },
                                            {
                                                name: 'Resizing',
                                                columnSettings: [
                                                    { columnKey: "arrow", allowResizing: false }
                                                ],
                                            },
                                            {
                                                name: "Tooltips"
                                            }
                                        ]
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var DataCorrectionLog = /** @class */ (function () {
                                function DataCorrectionLog(targetDate, targetUser, item, valueBefore, valueAfter, modifiedPerson, modifiedDateTime, correctionAttr) {
                                    this.arrow = getText('CDL027_10');
                                    this.targetDate = targetDate;
                                    this.targetUser = targetUser;
                                    this.item = item;
                                    this.valueBefore = valueBefore;
                                    this.valueAfter = valueAfter;
                                    this.modifiedPerson = modifiedPerson;
                                    this.modifiedDateTime = modifiedDateTime == null ? "" : moment.utc(modifiedDateTime).format("YYYY/MM/DD HH:mm:ss");
                                    switch (correctionAttr) {
                                        case CORRECTION_ATTR.EDIT:
                                            this.correctionAttr = getText("Enum_CorrectionAttr_EDIT");
                                            break;
                                        case CORRECTION_ATTR.CALCULATE:
                                            this.correctionAttr = getText("Enum_CorrectionAttr_CALCULATE");
                                            break;
                                        case CORRECTION_ATTR.REFLECT:
                                            this.correctionAttr = getText("Enum_CorrectionAttr_REFLECT");
                                            break;
                                        default:
                                            break;
                                    }
                                }
                                return DataCorrectionLog;
                            }());
                            var DISPLAY_FORMAT;
                            (function (DISPLAY_FORMAT) {
                                DISPLAY_FORMAT[DISPLAY_FORMAT["BY_DATE"] = 0] = "BY_DATE";
                                DISPLAY_FORMAT[DISPLAY_FORMAT["BY_INDIVIDUAL"] = 1] = "BY_INDIVIDUAL";
                            })(DISPLAY_FORMAT || (DISPLAY_FORMAT = {}));
                            var FUNCTION_ID;
                            (function (FUNCTION_ID) {
                                FUNCTION_ID[FUNCTION_ID["Schedule"] = 1] = "Schedule";
                                FUNCTION_ID[FUNCTION_ID["Daily"] = 2] = "Daily";
                                FUNCTION_ID[FUNCTION_ID["Monthly"] = 3] = "Monthly";
                                FUNCTION_ID[FUNCTION_ID["Any_period"] = 4] = "Any_period";
                                FUNCTION_ID[FUNCTION_ID["Salary"] = 5] = "Salary";
                                FUNCTION_ID[FUNCTION_ID["Bonus"] = 6] = "Bonus";
                                FUNCTION_ID[FUNCTION_ID["Year_end_adjustment"] = 7] = "Year_end_adjustment";
                                FUNCTION_ID[FUNCTION_ID["Monthly_calculation"] = 8] = "Monthly_calculation";
                                FUNCTION_ID[FUNCTION_ID["Raising_rising_back"] = 9] = "Raising_rising_back";
                            })(FUNCTION_ID || (FUNCTION_ID = {}));
                            var CORRECTION_ATTR;
                            (function (CORRECTION_ATTR) {
                                CORRECTION_ATTR[CORRECTION_ATTR["EDIT"] = 0] = "EDIT";
                                CORRECTION_ATTR[CORRECTION_ATTR["CALCULATE"] = 1] = "CALCULATE";
                                CORRECTION_ATTR[CORRECTION_ATTR["REFLECT"] = 2] = "REFLECT";
                            })(CORRECTION_ATTR || (CORRECTION_ATTR = {}));
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cdl027.a || (cdl027.a = {}));
                })(cdl027 = view.cdl027 || (view.cdl027 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl027.a.vm.js.map