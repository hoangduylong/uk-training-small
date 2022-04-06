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
                                findJobHistoryList: "bs/employee/jobtitle/history/findByJobId",
                                findJobInfoByJobIdAndHistoryId: "bs/employee/jobtitle/info/findByJobIdAndHistoryId",
                                findJobInfoByJobCode: "bs/employee/jobtitle/info/findByJobCode",
                                saveJobTitle: "bs/employee/jobtitle/save",
                                removeJobTitleHistory: "bs/employee/jobtitle/history/remove",
                                findAllSequenceMaster: "bs/employee/jobtitle/sequence/findAll",
                            };
                            /**
                             * findJobHistoryList
                             */
                            function findJobHistoryList(jobTitleId) {
                                return nts.uk.request.ajax(servicePath.findJobHistoryList, { jobTitleId: jobTitleId });
                            }
                            service.findJobHistoryList = findJobHistoryList;
                            /**
                             * findJobInfoByJobIdAndHistoryId
                             */
                            function findJobInfoByJobIdAndHistoryId(jobTitleId, jobTitleHistoryId) {
                                return nts.uk.request.ajax(servicePath.findJobInfoByJobIdAndHistoryId, { jobTitleId: jobTitleId, jobTitleHistoryId: jobTitleHistoryId });
                            }
                            service.findJobInfoByJobIdAndHistoryId = findJobInfoByJobIdAndHistoryId;
                            /**
                             * findJobInfoByJobCode
                             */
                            function findJobInfoByJobCode(jobTitleCode) {
                                return nts.uk.request.ajax(servicePath.findJobInfoByJobCode, { jobTitleCode: jobTitleCode });
                            }
                            service.findJobInfoByJobCode = findJobInfoByJobCode;
                            /**
                             * saveJobTitle
                             */
                            function saveJobTitle(command) {
                                return nts.uk.request.ajax(servicePath.saveJobTitle, command);
                            }
                            service.saveJobTitle = saveJobTitle;
                            /**
                             * removeWorkplaceHistory
                             */
                            function removeJobTitleHistory(command) {
                                return nts.uk.request.ajax(servicePath.removeJobTitleHistory, command);
                            }
                            service.removeJobTitleHistory = removeJobTitleHistory;
                            /**
                             * findAllSequenceMaster
                             */
                            function findAllSequenceMaster() {
                                return nts.uk.request.ajax(servicePath.findAllSequenceMaster);
                            }
                            service.findAllSequenceMaster = findAllSequenceMaster;
                            function saveAsExcel(mode, baseDate) {
                                var program = nts.uk.ui._viewModel.kiban.programName().split(" ");
                                var domainType = "CMM013";
                                if (program.length > 1) {
                                    program.shift();
                                    domainType = domainType + program.join(" ");
                                }
                                return nts.uk.request.exportFile('/masterlist/report/print', {
                                    domainId: 'Sequence',
                                    domainType: domainType,
                                    languageId: 'ja', reportType: 0,
                                    baseDate: moment.utc(baseDate).format()
                                });
                            }
                            service.saveAsExcel = saveAsExcel;
                        })(service = a.service || (a.service = {}));
                    })(a = cmm013.a || (cmm013.a = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.a.service.js.map