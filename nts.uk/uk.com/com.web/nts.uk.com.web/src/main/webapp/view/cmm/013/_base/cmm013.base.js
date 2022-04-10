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
                            Constants.SHARE_IN_DIALOG_ABROGATE_JOB_TITLE = "SHARE_IN_DIALOG_ABROGATE_JOB_TITLE";
                            Constants.SHARE_OUT_DIALOG_ABROGATE_JOB_TITLE = "SHARE_OUT_DIALOG_ABROGATE_JOB_TITLE";
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
                        //export abstract class JobTitleHistoryAbstract {   
                        /**
                         * JobTitle
                         */
                        var JobTitle = /** @class */ (function () {
                            function JobTitle(jobTitleCode, jobTitleName, positionCode, positionName) {
                                this.jobTitleCode = jobTitleCode;
                                this.jobTitleName = jobTitleName;
                                this.position = new Position(positionCode, positionName);
                            }
                            return JobTitle;
                        }());
                        base.JobTitle = JobTitle;
                        /**
                         * History
                         */
                        var History = /** @class */ (function () {
                            function History(jobTitleId, jobTitleName, historyId, startDate, endDate) {
                                this.displayString = ko.observable("");
                                var self = this;
                                self.jobTitleId = jobTitleId;
                                self.jobTitleName = jobTitleName;
                                self.historyId = historyId;
                                self.startDate = startDate;
                                self.endDate = endDate ? endDate : "31/12/9999";
                                self.displayString("".concat(self.startDate, " ~ ").concat(self.endDate));
                            }
                            History.prototype.updateEndDate = function (endDate) {
                                this.endDate = endDate;
                                /*this.displayString = `${this.startDate} ~ ${this.endDate}`;*/
                                this.displayString("".concat(this.startDate, " ~ ").concat(this.endDate));
                            };
                            return History;
                        }());
                        base.History = History;
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