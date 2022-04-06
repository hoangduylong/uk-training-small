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
                    var b;
                    (function (b_1) {
                        var viewmodel;
                        (function (viewmodel) {
                            var close = nts.uk.ui.windows.close;
                            var getShared = nts.uk.ui.windows.getShared;
                            var block = nts.uk.ui.block;
                            var dialog = nts.uk.ui.dialog;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.pastHistoryItems = ko.observableArray([]);
                                    this.selectedPastHistory = ko.observable('');
                                    this.startDate = ko.observable('');
                                    this.endDate = ko.observable('');
                                    this.codeB17 = ko.observable('');
                                    this.nameB18 = ko.observable('');
                                    this.codeB110 = ko.observable('');
                                    this.nameB111 = ko.observable('');
                                    this.codeB112 = ko.observable('');
                                    this.nameB113 = ko.observable('');
                                    var self = this;
                                    self.initScreen();
                                    self.selectedPastHistory.subscribe(function (selected) {
                                        if (selected) {
                                            var _pastHistory = _.find(self.pastHistoryItems(), function (x) { return x.startEndDate === selected; });
                                            if (_pastHistory) {
                                                self.startDate(_pastHistory.startDate());
                                                self.endDate(_pastHistory.endDate());
                                                self.codeB17(_pastHistory.codeB17());
                                                self.nameB18(_pastHistory.nameB18());
                                                self.codeB110(_pastHistory.codeB110());
                                                self.nameB111(_pastHistory.nameB111());
                                                self.codeB112(_pastHistory.codeB112());
                                                self.nameB113(_pastHistory.nameB113());
                                            }
                                        }
                                    });
                                    self.selectedPastHistory.subscribe(function (value) {
                                        $('#B1_1').focus();
                                    });
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                //起動する
                                ScreenModel.prototype.initScreen = function () {
                                    var self = this;
                                    self.employeeId = getShared("CMM053A_employeeId");
                                    block.invisible();
                                    b_1.service.getPastHistory(self.employeeId).done(function (result) {
                                        if (result && result.length > 0) {
                                            result.sort(function compare(a, b) {
                                                var dateA = new Date(a.startDate);
                                                var dateB = new Date(b.startDate);
                                                return dateB - dateA;
                                            });
                                            var _pastHistoryList = _.map(result, function (x) {
                                                return new PastHistory(x.startDate, x.endDate, x.codeB17, x.nameB18, x.codeB110, x.nameB111, x.codeB112, x.nameB113);
                                            });
                                            self.pastHistoryItems(_pastHistoryList);
                                            self.selectedPastHistory(_pastHistoryList[0].startEndDate);
                                        }
                                    }).fail(function (error) {
                                        dialog.alertError(error);
                                    }).always(function () {
                                        block.clear();
                                    });
                                };
                                //終了する
                                ScreenModel.prototype.closeDialog = function () {
                                    close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var PastHistory = /** @class */ (function () {
                                function PastHistory(startDate, endDate, codeB17, nameB18, codeB110, nameB111, codeB112, nameB113) {
                                    this.startEndDate = startDate + '～' + endDate;
                                    this.startDate = ko.observable(startDate);
                                    this.endDate = ko.observable(endDate);
                                    this.codeB17 = ko.observable(codeB17);
                                    this.nameB18 = ko.observable(nameB18);
                                    this.codeB110 = ko.observable(codeB110);
                                    this.nameB111 = ko.observable(nameB111);
                                    this.codeB112 = ko.observable(codeB112);
                                    this.nameB113 = ko.observable(nameB113);
                                }
                                return PastHistory;
                            }());
                            viewmodel.PastHistory = PastHistory;
                        })(viewmodel = b_1.viewmodel || (b_1.viewmodel = {}));
                    })(b = cmm053.b || (cmm053.b = {}));
                })(cmm053 = view.cmm053 || (view.cmm053 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm053.b.vm.js.map