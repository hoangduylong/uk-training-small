var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cdl028;
                (function (cdl028) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var setShared = nts.uk.ui.windows.setShared;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.yearValue = ko.observable({ startDate: null, endDate: null });
                                    this.modeScreen = ko.observable(null);
                                    this.firstMonth = ko.observable(null);
                                    this.financialYear = ko.observable(null);
                                    this.standardDate = ko.observable(null);
                                    this.startDateFiscalYear = ko.observable(null);
                                    this.endDateFiscalYear = ko.observable(null);
                                    this.endDateDay = ko.observable(null);
                                    this.standardYearMonth = ko.observable(null);
                                    var self = this;
                                    var params = nts.uk.ui.windows.getShared("CDL028_INPUT");
                                    if (params == null || params === undefined) {
                                        return;
                                    }
                                    self.standardYearMonth(parseInt(moment(Date.now()).format("YYYYMM")));
                                    self.modeScreen(params.mode);
                                    self.standardDate(params.date == null ? parseInt(moment().utc().format("YYYYMMDD")) : nts.uk.time.parseYearMonthDate(moment(params.date).format("YYYYMMDD")).toValue());
                                }
                                /**
                                 * startPage
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var self = this, dfd = $.Deferred();
                                    var now = moment().utc();
                                    var newDate = now.format("YYYY/MM/DD");
                                    self.required = ko.observable(false);
                                    self.startDateString = ko.observable();
                                    self.endDateString = ko.observable("");
                                    self.standardDate() == null ? newDate : self.standardDate();
                                    var startDateTemp = self.convertYearToInt(self.standardDate());
                                    var startMonthDB;
                                    switch (self.modeScreen()) {
                                        case MODE_SCREEN.BASE_DATE:
                                            self.standardDate();
                                            break;
                                        case MODE_SCREEN.ALL:
                                            self.standardDate();
                                            a.service.getStartMonth().done(function (response) {
                                                if (response.startMonth != null) {
                                                    startMonthDB = response.startMonth;
                                                    if (startMonthDB > self.getMonthToInt(self.standardDate())) {
                                                        self.yearValue({ startDate: (startDateTemp - 1) + "", endDate: (startDateTemp - 1) + "" });
                                                    }
                                                    else {
                                                        self.yearValue({ startDate: moment.utc().format("YYYY"), endDate: moment.utc().format("YYYY") });
                                                    }
                                                    if ((startMonthDB) >= self.getMonthToInt(self.standardDate())) {
                                                        self.financialYear(startDateTemp + "" + startMonthDB + "01");
                                                    }
                                                    else {
                                                        self.financialYear((startDateTemp - 1) + "" + startMonthDB + "01");
                                                    }
                                                    self.firstMonth(startMonthDB);
                                                }
                                            }).fail(function () {
                                                setShared('CDL028_A_PARAMS', {
                                                    status: false
                                                });
                                                nts.uk.ui.windows.close();
                                            });
                                            break;
                                        case MODE_SCREEN.YEAR_PERIOD_FINANCE:
                                            a.service.getStartMonth().done(function (response) {
                                                if (response.startMonth != null) {
                                                    startMonthDB = response.startMonth;
                                                    if (startMonthDB > self.getMonthToInt(self.standardDate())) {
                                                        self.yearValue({ startDate: (startDateTemp - 1) + "", endDate: (startDateTemp - 1) + "" });
                                                    }
                                                    else {
                                                        self.yearValue({ startDate: moment.utc().format("YYYY"), endDate: moment.utc().format("YYYY") });
                                                    }
                                                    if ((startMonthDB) >= self.getMonthToInt(self.standardDate())) {
                                                        self.financialYear(startDateTemp + "" + startMonthDB + "01");
                                                    }
                                                    else {
                                                        self.financialYear((startDateTemp - 1) + "" + startMonthDB + "01");
                                                    }
                                                    self.firstMonth(startMonthDB);
                                                }
                                            }).fail(function () {
                                                setShared('CDL028_A_PARAMS', {
                                                    status: false
                                                });
                                                nts.uk.ui.windows.close();
                                            });
                                            break;
                                        case MODE_SCREEN.YEAR_PERIOD:
                                            self.standardDate(self.convertYearToInt(self.standardDate()) + "0101");
                                            self.yearValue({ startDate: moment.utc().format("YYYY"), endDate: moment.utc().format("YYYY") });
                                            break;
                                    }
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                /**
                                 * proceed
                                 */
                                ScreenModel.prototype.proceed = function () {
                                    var self = this, dfd = $.Deferred();
                                    switch (self.modeScreen()) {
                                        case MODE_SCREEN.BASE_DATE:
                                            self.standardDate();
                                            self.startDateFiscalYear(null);
                                            self.endDateFiscalYear(null);
                                            break;
                                        case MODE_SCREEN.ALL:
                                        case MODE_SCREEN.YEAR_PERIOD_FINANCE:
                                            self.standardDate();
                                            self.startDateFiscalYear(self.yearValue().startDate + "" + self.getFullMonth(self.firstMonth()) + "01");
                                            if (self.firstMonth() != 1) {
                                                self.endDateDay(moment((parseInt(self.yearValue().endDate) + 1) + "-" + self.getFullMonth(self.firstMonth() - 1), "YYYY-MM").daysInMonth());
                                                self.endDateFiscalYear(self.yearValue().endDate === "9999" ? "99991231" : (self.convertYearToInt(self.yearValue().endDate) + 1) + "" + self.getFullMonth(self.firstMonth() - 1) + "" + self.endDateDay());
                                            }
                                            else {
                                                self.endDateFiscalYear(self.convertYearToInt((self.yearValue().endDate)) + "1231");
                                            }
                                            break;
                                        case MODE_SCREEN.YEAR_PERIOD:
                                            self.standardDate();
                                            self.startDateFiscalYear(self.convertYearToInt(self.yearValue().startDate) + "0101");
                                            self.endDateFiscalYear(self.convertYearToInt(self.yearValue().endDate) + "1231");
                                            break;
                                    }
                                    /**
                                    * share param
                                    * status,standardDate,startDateFiscalYear,endDateFiscalYear
                                    */
                                    var paramsCdl = {
                                        status: true,
                                        mode: self.modeScreen() == MODE_SCREEN.YEAR_PERIOD ? MODE_SCREEN.YEAR_RANGE : self.modeScreen(),
                                        standardDate: ((self.modeScreen() == MODE_SCREEN.BASE_DATE) || (self.modeScreen() == MODE_SCREEN.ALL)) ? self.convertMonthYearToString(self.standardDate()) : null,
                                        startDateFiscalYear: (self.modeScreen() == MODE_SCREEN.BASE_DATE || self.modeScreen() == MODE_SCREEN.YEAR_MONTH) ? null : self.convertMonthYearToString(self.startDateFiscalYear()),
                                        endDateFiscalYear: (self.modeScreen() == MODE_SCREEN.BASE_DATE || self.modeScreen() == MODE_SCREEN.YEAR_MONTH) ? null : self.convertMonthYearToString(self.endDateFiscalYear()),
                                        standardYearMonth: self.standardYearMonth()
                                    };
                                    $("#A2_2 .ntsDatepicker").trigger("validate");
                                    if (!nts.uk.ui.errors.hasError()) {
                                        setShared('CDL028_A_PARAMS', paramsCdl);
                                        nts.uk.ui.windows.close();
                                        return false;
                                    }
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                ;
                                /**
                                 * cancel
                                 */
                                ScreenModel.prototype.cancel = function () {
                                    var status = false;
                                    setShared('CDL028_A_PARAMS', status);
                                    nts.uk.ui.windows.close();
                                };
                                ;
                                ScreenModel.prototype.convertYearToInt = function (standardDate) {
                                    var year;
                                    standardDate = standardDate + "";
                                    year = standardDate.slice(0, 4);
                                    return parseInt(year);
                                };
                                ScreenModel.prototype.getMonthToInt = function (standardDate) {
                                    var month;
                                    standardDate = standardDate + "";
                                    month = standardDate.slice(4, 6);
                                    return parseInt(month, 10);
                                };
                                ScreenModel.prototype.getFullMonth = function (month) {
                                    if (month < 10) {
                                        return "0" + month;
                                    }
                                    else {
                                        return "" + month;
                                    }
                                };
                                ScreenModel.prototype.convertMonthYearToString = function (yearMonth) {
                                    var self = this;
                                    var year, month, date;
                                    yearMonth = yearMonth.toString();
                                    year = yearMonth.slice(0, 4);
                                    month = yearMonth.slice(4, 6);
                                    date = yearMonth.slice(6, 8);
                                    return year + "/" + month + "/" + date;
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var MODE_SCREEN;
                            (function (MODE_SCREEN) {
                                //mode standard date
                                MODE_SCREEN[MODE_SCREEN["BASE_DATE"] = 1] = "BASE_DATE";
                                //YEAR PERIOD FINANCE
                                MODE_SCREEN[MODE_SCREEN["YEAR_PERIOD_FINANCE"] = 2] = "YEAR_PERIOD_FINANCE";
                                //All
                                MODE_SCREEN[MODE_SCREEN["ALL"] = 3] = "ALL";
                                //YEAR PERIOD
                                MODE_SCREEN[MODE_SCREEN["YEAR_PERIOD"] = 5] = "YEAR_PERIOD";
                                // YEAR PERIOD MAPPING WITH SERVER
                                MODE_SCREEN[MODE_SCREEN["YEAR_RANGE"] = 4] = "YEAR_RANGE";
                                //Mode YEARMONTH
                                MODE_SCREEN[MODE_SCREEN["YEAR_MONTH"] = 6] = "YEAR_MONTH";
                            })(MODE_SCREEN = viewmodel.MODE_SCREEN || (viewmodel.MODE_SCREEN = {}));
                            var PARAMS_CDL = /** @class */ (function () {
                                function PARAMS_CDL(paramsCdl) {
                                    this.status = paramsCdl.status;
                                    this.mode = paramsCdl.mode;
                                    this.standardDate = paramsCdl.standardDate;
                                    this.startDateFiscalYear = paramsCdl.startDateFiscalYear;
                                    this.endDateFiscalYear = paramsCdl.endDateFiscalYear;
                                    this.standardYearMonth = paramsCdl.standardYearMonth;
                                }
                                return PARAMS_CDL;
                            }());
                            var StartMonth = /** @class */ (function () {
                                function StartMonth(startMonth) {
                                    this.startMonth = startMonth.startMonth;
                                    this.companyId = startMonth.companyId;
                                }
                                return StartMonth;
                            }());
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cdl028.a || (cdl028.a = {}));
                })(cdl028 = view.cdl028 || (view.cdl028 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl028.a.vm.js.map