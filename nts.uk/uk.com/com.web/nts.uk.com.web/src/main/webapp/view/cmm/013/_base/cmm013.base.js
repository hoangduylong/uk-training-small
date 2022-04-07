var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm013;
                (function (cmm013) {
                    var base;
                    (function (base) {
                        /**
                         * Constants
                         */
                        var Constants = /** @class */ (function () {
                            function Constants() {
                            }
                            Constants.IS_ACCEPT_DIALOG_SELECT_SEQUENCE = "IS_ACCEPT_DIALOG_SELECT_SEQUENCE";
                            Constants.SHARE_IN_DIALOG_REMOVE_JOB = "SHARE_IN_DIALOG_REMOVE_JOB";
                            Constants.SHARE_OUT_DIALOG_REMOVE_JOB = "SHARE_OUT_DIALOG_REMOVE_JOB";
                            Constants.SHARE_IN_DIALOG_SELECT_SEQUENCE = "SHARE_IN_DIALOG_SELECT_SEQUENCE";
                            Constants.SHARE_OUT_DIALOG_SELECT_SEQUENCE = "SHARE_OUT_DIALOG_SELECT_SEQUENCE";
                            Constants.SHARE_IN_DIALOG_ADD_HISTORY = "SHARE_IN_DIALOG_ADD_HISTORY";
                            Constants.SHARE_OUT_DIALOG_ADD_HISTORY = "SHARE_OUT_DIALOG_ADD_HISTORY";
                            Constants.SHARE_IN_DIALOG_EDIT_HISTORY = "SHARE_IN_DIALOG_EDIT_HISTORY";
                            Constants.SHARE_OUT_DIALOG_EDIT_HISTORY = "SHARE_OUT_DIALOG_EDIT_HISTORY";
                            return Constants;
                        }());
                        base.Constants = Constants;
                        /**
                         * JobTitleHistoryAbstract
                         */
                        var JobTitleHistoryAbstract = /** @class */ (function () {
                            function JobTitleHistoryAbstract() {
                                var _self = this;
                                _self.listJobTitleHistory = ko.observableArray([]);
                                _self.selectedHistoryId = ko.observable(null);
                                _self.listJobTitleHistory.subscribe(function (newListHistory) {
                                    _self.fillTextDisplay();
                                });
                            }
                            /**
                             * selectFirst
                             */
                            JobTitleHistoryAbstract.prototype.selectFirst = function () {
                                var _self = this;
                                if (_self.listJobTitleHistory()[0]) {
                                    _self.selectedHistoryId(_self.listJobTitleHistory()[0].historyId);
                                }
                            };
                            /**
                             * getSelectedHistoryByHistoryId
                             */
                            JobTitleHistoryAbstract.prototype.getSelectedHistoryByHistoryId = function () {
                                var _self = this;
                                return _self.listJobTitleHistory().filter(function (item) { return item.historyId == _self.selectedHistoryId(); })[0];
                            };
                            /**
                             * fillTextDisplay
                             */
                            JobTitleHistoryAbstract.prototype.fillTextDisplay = function () {
                                var _self = this;
                                _.forEach(_self.listJobTitleHistory(), function (item) {
                                    item.textDisplay = item.period.startDate + " " + nts.uk.resource.getText("CMM013_30") + " " + item.period.endDate;
                                });
                            };
                            /**
                             * isSelectedLatestHistory
                             */
                            JobTitleHistoryAbstract.prototype.isSelectedLatestHistory = function () {
                                var _self = this;
                                if (_self.listJobTitleHistory().length > 0) {
                                    return _self.selectedHistoryId() == _self.listJobTitleHistory()[0].historyId;
                                }
                                return false;
                            };
                            return JobTitleHistoryAbstract;
                        }());
                        base.JobTitleHistoryAbstract = JobTitleHistoryAbstract;
                        /**
                         * JobTitle
                         */
                        var JobTitle = /** @class */ (function () {
                            function JobTitle(companyId, jobTitleId) {
                                this.companyId = companyId;
                                this.jobTitleId = jobTitleId;
                            }
                            return JobTitle;
                        }());
                        base.JobTitle = JobTitle;
                        /**
                         * History
                         */
                        var History = /** @class */ (function () {
                            function History(jobTitleId, historyId, period, textDisplay) {
                                this.jobTitleId = jobTitleId;
                                this.historyId = historyId;
                                this.period = period;
                                this.textDisplay = textDisplay;
                            }
                            return History;
                        }());
                        base.History = History;
                        /**
                         * History (for save command)
                         */
                        var SaveHistory = /** @class */ (function () {
                            function SaveHistory(historyId, period) {
                                this.historyId = historyId;
                                this.period = period;
                            }
                            return SaveHistory;
                        }());
                        base.SaveHistory = SaveHistory;
                        /**
                         * Period
                         */
                        var Period = /** @class */ (function () {
                            function Period(startDate, endDate) {
                                this.startDate = startDate;
                                this.endDate = endDate;
                            }
                            return Period;
                        }());
                        base.Period = Period;
                        /**
                         * Period (for save command)
                         */
                        var SavePeriod = /** @class */ (function () {
                            function SavePeriod(startDate, endDate) {
                                this.startDate = startDate;
                                this.endDate = endDate;
                            }
                            return SavePeriod;
                        }());
                        base.SavePeriod = SavePeriod;
                        /**
                         * SequenceMaster
                         */
                        var SequenceMaster = /** @class */ (function () {
                            function SequenceMaster(sequenceCode, sequenceName, order) {
                                this.sequenceCode = sequenceCode;
                                this.sequenceName = sequenceName;
                                this.order = order;
                            }
                            return SequenceMaster;
                        }());
                        base.SequenceMaster = SequenceMaster;
                        /**
                         * Position
                         */
                        var Position = /** @class */ (function () {
                            function Position(positionCode, positionName, order) {
                                this.positionCode = positionCode;
                                this.positionName = positionName;
                                this.order = order;
                            }
                            return Position;
                        }());
                        base.Position = Position;
                    })(base = cmm013.base || (cmm013.base = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.base.js.map