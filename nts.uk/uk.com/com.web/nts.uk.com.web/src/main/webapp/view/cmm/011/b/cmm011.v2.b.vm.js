var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm011;
                (function (cmm011) {
                    var v2;
                    (function (v2) {
                        var b;
                        (function (b) {
                            var viewmodel;
                            (function (viewmodel) {
                                var block = nts.uk.ui.block;
                                var getText = nts.uk.resource.getText;
                                var confirm = nts.uk.ui.dialog.confirm;
                                var alertError = nts.uk.ui.dialog.alertError;
                                var setShared = nts.uk.ui.windows.setShared;
                                var getShared = nts.uk.ui.windows.getShared;
                                var DEFAULT_END = "9999/12/31";
                                var ScreenModel = /** @class */ (function () {
                                    function ScreenModel() {
                                        this.initMode = ko.observable(INIT_MODE.WORKPLACE);
                                        this.screenMode = ko.observable(SCREEN_MODE.NEW);
                                        var self = this, params = getShared("CMM011AParams");
                                        self.lstWpkHistory = ko.observableArray([]);
                                        self.selectedHistoryId = ko.observable(null);
                                        self.selectedStartDateInput = ko.observable(null);
                                        self.selectedStartDateText = ko.observable(null);
                                        self.selectedEndDate = ko.observable(DEFAULT_END);
                                        self.copyPreviousConfig = ko.observable(false);
                                        if (params) {
                                            self.initMode(params.initMode);
                                            self.selectedHistoryId(params.historyId);
                                            self.bkHistoryId = params.historyId;
                                        }
                                        if (self.initMode() == INIT_MODE.DEPARTMENT) {
                                            var currentScreen = nts.uk.ui.windows.getSelf();
                                            currentScreen.setTitle(getText("CMM011_302"));
                                        }
                                        self.selectedHistoryId.subscribe(function (value) {
                                            if (value) {
                                                var history_1 = _.find(self.lstWpkHistory(), function (i) { return i.historyId == value; });
                                                if (history_1) {
                                                    self.selectedStartDateInput(history_1.startDate);
                                                    self.selectedStartDateText(history_1.startDate);
                                                    self.selectedEndDate(history_1.endDate);
                                                }
                                                self.screenMode(SCREEN_MODE.SELECT);
                                            }
                                            else {
                                                //                    if (self.screenMode() == SCREEN_MODE.NEW || self.screenMode() == SCREEN_MODE.ADD)
                                                //                        self.selectedEndDate(DEFAULT_END);
                                            }
                                        });
                                        self.isLatestHistory = ko.computed(function () {
                                            return !_.isEmpty(self.lstWpkHistory()) && self.selectedHistoryId() == self.lstWpkHistory()[0].historyId;
                                        }, this);
                                    }
                                    ScreenModel.prototype.startPage = function () {
                                        var self = this, dfd = $.Deferred();
                                        block.invisible();
                                        b.service.getAllConfiguration(self.initMode()).done(function (data) {
                                            if (data) {
                                                self.lstWpkHistory(_.map(data, function (i) { return new HistoryItem(i); }));
                                                var selectedHist = _.find(data, function (h) { return h.historyId == self.bkHistoryId; });
                                                if (selectedHist && self.bkStartDate == null && self.bkEndDate == null) {
                                                    self.bkStartDate = selectedHist.startDate;
                                                    self.bkEndDate = selectedHist.endDate;
                                                }
                                                if (self.selectedHistoryId() != null)
                                                    self.selectedHistoryId.valueHasMutated();
                                                else
                                                    self.selectedHistoryId(self.lstWpkHistory()[0].historyId);
                                            }
                                            dfd.resolve();
                                        }).fail(function (error) {
                                            dfd.reject();
                                            alertError(error);
                                        }).always(function () {
                                            block.clear();
                                        });
                                        return dfd.promise();
                                    };
                                    ScreenModel.prototype.addHistory = function () {
                                        var self = this;
                                        self.selectedHistoryId(self.lstWpkHistory()[0].historyId);
                                        self.screenMode(SCREEN_MODE.ADD);
                                        self.selectedStartDateInput(null);
                                        self.selectedEndDate(DEFAULT_END);
                                    };
                                    ScreenModel.prototype.updateHistory = function () {
                                        var self = this;
                                        self.screenMode(SCREEN_MODE.UPDATE);
                                    };
                                    ScreenModel.prototype.deleteHistory = function () {
                                        var self = this;
                                        confirm({ messageId: "Msg_18" }).ifYes(function () {
                                            block.invisible();
                                            var data = { historyId: self.selectedHistoryId(), initMode: self.initMode() };
                                            b.service.deleteConfiguration(data).done(function () {
                                                self.startPage().done(function () {
                                                    self.selectedHistoryId(self.lstWpkHistory()[0].historyId);
                                                });
                                            }).fail(function (error) {
                                                alertError(error);
                                            }).always(function () {
                                                block.clear();
                                            });
                                        }).ifNo(function () {
                                        });
                                    };
                                    ScreenModel.prototype.registerConfig = function () {
                                        var self = this, data = null;
                                        $(".nts-input").trigger("validate");
                                        if (nts.uk.ui.errors.hasError())
                                            return;
                                        block.invisible();
                                        var startDate = moment.utc(self.selectedStartDateInput(), "YYYY/MM/DD"), endDate = moment.utc(self.selectedEndDate(), "YYYY/MM/DD");
                                        switch (self.screenMode()) {
                                            case SCREEN_MODE.NEW:
                                                data = {
                                                    initMode: self.initMode(),
                                                    newHistoryId: null,
                                                    prevHistoryId: null,
                                                    startDate: startDate.toISOString(),
                                                    endDate: endDate.toISOString(),
                                                    copyPreviousConfig: false
                                                };
                                                b.service.addConfiguration(data).done(function (historyId) {
                                                    self.startPage().done(function () {
                                                        self.selectedHistoryId(historyId);
                                                        self.sendDataToParentScreen();
                                                    });
                                                }).fail(function (error) {
                                                    alertError(error);
                                                }).always(function () {
                                                    block.clear();
                                                });
                                                break;
                                            case SCREEN_MODE.ADD:
                                                data = {
                                                    initMode: self.initMode(),
                                                    newHistoryId: null,
                                                    prevHistoryId: self.lstWpkHistory()[0].historyId,
                                                    startDate: startDate.toISOString(),
                                                    endDate: endDate.toISOString(),
                                                    copyPreviousConfig: self.copyPreviousConfig()
                                                };
                                                b.service.addConfiguration(data).done(function (historyId) {
                                                    self.startPage().done(function () {
                                                        self.selectedHistoryId(historyId);
                                                        self.sendDataToParentScreen();
                                                    });
                                                }).fail(function (error) {
                                                    alertError(error);
                                                }).always(function () {
                                                    block.clear();
                                                });
                                                break;
                                            case SCREEN_MODE.UPDATE:
                                                data = {
                                                    initMode: self.initMode(),
                                                    historyId: self.selectedHistoryId(),
                                                    startDate: startDate.toISOString(),
                                                    endDate: endDate.toISOString()
                                                };
                                                b.service.updateConfiguration(data).done(function () {
                                                    self.startPage().done(function () {
                                                        self.selectedHistoryId.valueHasMutated();
                                                        self.sendDataToParentScreen();
                                                    });
                                                }).fail(function (error) {
                                                    alertError(error);
                                                }).always(function () {
                                                    block.clear();
                                                });
                                                break;
                                            default:
                                                block.clear();
                                                if (self.selectedHistoryId())
                                                    self.sendDataToParentScreen();
                                                break;
                                        }
                                    };
                                    ScreenModel.prototype.sendDataToParentScreen = function () {
                                        var self = this;
                                        var params = {
                                            historyId: self.selectedHistoryId(),
                                            startDate: self.selectedStartDateText(),
                                            endDate: self.selectedEndDate()
                                        };
                                        setShared("CMM011BParams", params);
                                        nts.uk.ui.windows.close();
                                    };
                                    ScreenModel.prototype.cancel = function () {
                                        var self = this;
                                        var preSelectHist = _.find(self.lstWpkHistory(), function (h) { return h.historyId == self.bkHistoryId; });
                                        if (preSelectHist && (preSelectHist.startDate != self.bkStartDate || preSelectHist.endDate != self.bkEndDate)) {
                                            setShared("CMM011BParams", {
                                                historyId: preSelectHist.historyId,
                                                startDate: preSelectHist.startDate,
                                                endDate: preSelectHist.endDate
                                            });
                                        }
                                        else if (preSelectHist == null) {
                                            setShared("CMM011BParams", {
                                                historyId: self.lstWpkHistory()[0].historyId,
                                                startDate: self.lstWpkHistory()[0].startDate,
                                                endDate: self.lstWpkHistory()[0].endDate
                                            });
                                        }
                                        nts.uk.ui.windows.close();
                                    };
                                    return ScreenModel;
                                }());
                                viewmodel.ScreenModel = ScreenModel;
                                var INIT_MODE;
                                (function (INIT_MODE) {
                                    INIT_MODE[INIT_MODE["WORKPLACE"] = 0] = "WORKPLACE";
                                    INIT_MODE[INIT_MODE["DEPARTMENT"] = 1] = "DEPARTMENT";
                                })(INIT_MODE || (INIT_MODE = {}));
                                var SCREEN_MODE;
                                (function (SCREEN_MODE) {
                                    SCREEN_MODE[SCREEN_MODE["SELECT"] = 0] = "SELECT";
                                    SCREEN_MODE[SCREEN_MODE["NEW"] = 1] = "NEW";
                                    SCREEN_MODE[SCREEN_MODE["ADD"] = 2] = "ADD";
                                    SCREEN_MODE[SCREEN_MODE["UPDATE"] = 3] = "UPDATE";
                                })(SCREEN_MODE || (SCREEN_MODE = {}));
                                var HistoryItem = /** @class */ (function () {
                                    function HistoryItem(params) {
                                        if (params) {
                                            this.historyId = params.historyId;
                                            this.startDate = params.startDate;
                                            this.endDate = params.endDate;
                                            this.displayText = params.startDate + " " + getText("CMM011_125") + " " + params.endDate;
                                        }
                                    }
                                    return HistoryItem;
                                }());
                            })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                        })(b = v2.b || (v2.b = {}));
                    })(v2 = cmm011.v2 || (cmm011.v2 = {}));
                })(cmm011 = view.cmm011 || (view.cmm011 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm011.v2.b.vm.js.map