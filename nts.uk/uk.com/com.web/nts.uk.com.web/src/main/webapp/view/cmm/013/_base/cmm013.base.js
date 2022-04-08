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
                        //export abstract class JobTitleHistoryAbstract {   
                        /**
                         * JobTitle
                         */
                        var JobTitle = /** @class */ (function () {
                            function JobTitle(jobTitleCode, jobTitleName) {
                                this.jobTitleCode = jobTitleCode;
                                this.jobTitleName = jobTitleName;
                            }
                            return JobTitle;
                        }());
                        base.JobTitle = JobTitle;
                        /**
                         * History
                         */
                        var History = /** @class */ (function () {
                            function History(jobTitleId, historyId, startDate, endDate) {
                                this.jobTitleId = jobTitleId;
                                this.historyId = historyId;
                                this.startDate = startDate;
                                this.endDate = endDate ? endDate : "31/12/9999";
                            }
                            return History;
                        }());
                        base.History = History;
                        /*
                            
                
                            listHistory: KnockoutObservableArray<History>;
                            selectedHistoryId: KnockoutObservable<string>;
                            
                            constructor() {
                                let self = this;
                                self.listHistory = ko.observableArray([]);
                                self.selectedHistoryId = ko.observable(null);
                                
                                self.listJobTitleHistory.subscribe((newListHistory) => {
                                    _self.fillTextDisplay();
                                });
                            }
                            
                            /**
                             * selectFirst
                             
                            public selectFirst() {
                                let _self = this;
                                if (_self.listJobTitleHistory()[0]){
                                    _self.selectedHistoryId(_self.listJobTitleHistory()[0].historyId);
                                }
                            }
                            
                            /**
                             * getSelectedHistoryByHistoryId
                             
                            public getSelectedHistoryByHistoryId(): History {
                                let _self = this;
                                return _self.listJobTitleHistory().filter(item => item.historyId == _self.selectedHistoryId())[0];
                            }
                            
                            /**
                             * fillTextDisplay
                             
                            private fillTextDisplay() {
                                let _self = this;
                                _.forEach(_self.listJobTitleHistory(), (item: History) => {
                                    item.textDisplay = item.period.startDate + " " + nts.uk.resource.getText("CMM013_30") + " " + item.period.endDate;
                                })
                            }
                            
                        }
                         */
                        /**
                         * Position
                         */
                        var Position = /** @class */ (function () {
                            function Position(positionCode, positionName) {
                                this.positionCode = positionCode;
                                this.positionName = positionName;
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