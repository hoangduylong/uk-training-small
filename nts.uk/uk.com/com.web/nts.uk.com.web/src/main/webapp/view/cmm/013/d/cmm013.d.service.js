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
                    var d;
                    (function (d) {
                        var service;
                        (function (service) {
                            /**
                             *  Service paths
                             */
                            var servicePath = {
                                saveJobTitleHistory: "bs/employee/jobtitle/history/save",
                            };
                            /**
                             * saveWorkplaceHistory
                             */
                            function saveJobTitleHistory(command) {
                                return nts.uk.request.ajax(servicePath.saveJobTitleHistory, command);
                            }
                            service.saveJobTitleHistory = saveJobTitleHistory;
                            /**
                            * Model namespace.
                            */
                            var model;
                            (function (model) {
                                /**
                                 * JobTitleHistory save command
                                 */
                                var SaveJobTitleHistoryCommand = /** @class */ (function () {
                                    function SaveJobTitleHistoryCommand(isCreateMode, jobTitleId, jobTitleHistory) {
                                        this.isCreateMode = isCreateMode;
                                        this.jobTitleId = jobTitleId;
                                        this.jobTitleHistory = jobTitleHistory;
                                    }
                                    return SaveJobTitleHistoryCommand;
                                }());
                                model.SaveJobTitleHistoryCommand = SaveJobTitleHistoryCommand;
                            })(model = service.model || (service.model = {}));
                        })(service = d.service || (d.service = {}));
                    })(d = cmm013.d || (cmm013.d = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.d.service.js.map