var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm018;
                (function (cmm018) {
                    var m;
                    (function (m) {
                        var service;
                        (function (service) {
                            // Service paths.
                            var servicePath = {
                                saveAsExcel: "approval/report/masterData",
                                getSetting: 'workflow/approvermanagement/workroot/appSetM'
                            };
                            function saveAsExcel(data) {
                                return uk.request.exportFile(servicePath.saveAsExcel, data);
                            }
                            service.saveAsExcel = saveAsExcel;
                            function getSetting(data) {
                                return nts.uk.request.ajax('com', servicePath.getSetting, data);
                            }
                            service.getSetting = getSetting;
                            var MasterApproverRootQuery = /** @class */ (function () {
                                function MasterApproverRootQuery(baseDate, chkCompany, chkWorkplace, chkPerson, sysAtr, lstAppName) {
                                    this.baseDate = baseDate;
                                    this.chkCompany = chkCompany;
                                    this.chkWorkplace = chkWorkplace;
                                    this.chkPerson = chkPerson;
                                    this.sysAtr = sysAtr;
                                    this.lstAppName = lstAppName;
                                }
                                return MasterApproverRootQuery;
                            }());
                            service.MasterApproverRootQuery = MasterApproverRootQuery;
                            var StartCommand = /** @class */ (function () {
                                function StartCommand() {
                                }
                                return StartCommand;
                            }());
                        })(service = m.service || (m.service = {}));
                    })(m = cmm018.m || (cmm018.m = {}));
                })(cmm018 = view.cmm018 || (view.cmm018 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm018.m.service.js.map