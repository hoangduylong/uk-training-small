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
                    var n;
                    (function (n) {
                        var service;
                        (function (service) {
                            var servicePath = {
                                getRightList: 'workflow/approvermanagement/workroot/find/applicationType',
                                saveAsExcel: "approval/report/employee",
                                getConfirm: 'workflow/approvermanagement/workroot/find/confirmRootType'
                            };
                            function getRightList() {
                                return nts.uk.request.ajax('com', servicePath.getRightList);
                            }
                            service.getRightList = getRightList;
                            function getInforRoot(data) {
                                return nts.uk.request.ajax('com', servicePath.getInforRoot, data);
                            }
                            service.getInforRoot = getInforRoot;
                            function saveAsExcel(data) {
                                return uk.request.exportFile(servicePath.saveAsExcel, data);
                            }
                            service.saveAsExcel = saveAsExcel;
                            function getConfirmName() {
                                return nts.uk.request.ajax('com', servicePath.getConfirm);
                            }
                            service.getConfirmName = getConfirmName;
                            var model;
                            (function (model) {
                                var appInfor = /** @class */ (function () {
                                    function appInfor(baseDate, lstEmpIds, lstApps, sysAtr) {
                                        this.baseDate = baseDate;
                                        this.lstEmpIds = lstEmpIds;
                                        this.lstApps = lstApps;
                                        this.sysAtr = sysAtr;
                                    }
                                    return appInfor;
                                }());
                                model.appInfor = appInfor;
                            })(model = service.model || (service.model = {}));
                        })(service = n.service || (n.service = {}));
                    })(n = cmm018.n || (cmm018.n = {}));
                })(cmm018 = view.cmm018 || (view.cmm018 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm018.n.service.js.map