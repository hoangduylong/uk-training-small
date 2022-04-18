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
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            /**
                             *  Service paths
                             */
                            var servicePath = {
                                findJobTitleList: "basic/training/jobtitle/find/all",
                                updateJobTitle: "basic/training/jobtitle/update",
                                addJobTitle: "basic/training/jobtitle/add",
                                findHistoryList: "basic/training/jobtitle/find",
                            };
                            /**
                             * find history list (get all info of one job title)
                             */
                            function findHistoryList(jobTitleCode) {
                                return nts.uk.request.ajax(servicePath.findHistoryList, { jobTitleCode: jobTitleCode });
                            }
                            service.findHistoryList = findHistoryList;
                            /**
                             * find all job title
                             */
                            function findAllJobTitle() {
                                return nts.uk.request.ajax(servicePath.findJobTitleList);
                            }
                            service.findAllJobTitle = findAllJobTitle;
                            /**
                             * update job title
                             */
                            function updateJobTitle(command) {
                                return nts.uk.request.ajax(servicePath.updateJobTitle, command);
                            }
                            service.updateJobTitle = updateJobTitle;
                            /**
                             * add job title
                             */
                            function addJobTitle(command) {
                                return nts.uk.request.ajax(servicePath.addJobTitle, command);
                            }
                            service.addJobTitle = addJobTitle;
                            var model;
                            (function (model) {
                                var HistoryDto = /** @class */ (function () {
                                    function HistoryDto(historyId, jobTitleCode, jobTitleName, startDate, endDate) {
                                        this.jobTitleCode = jobTitleCode;
                                        this.jobTitleName = jobTitleName;
                                        this.historyId = historyId;
                                        this.startDate = startDate;
                                        this.endDate = endDate ? endDate : "9999/12/31";
                                        this.displayString = "".concat(this.startDate, " ~ ").concat(this.endDate);
                                    }
                                    return HistoryDto;
                                }());
                                model.HistoryDto = HistoryDto;
                            })(model = service.model || (service.model = {}));
                        })(service = a.service || (a.service = {}));
                    })(a = cmm013.a || (cmm013.a = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.a.service.js.map