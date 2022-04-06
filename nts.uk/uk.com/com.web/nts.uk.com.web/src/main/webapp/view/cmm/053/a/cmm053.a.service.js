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
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                getSettingManager: "screen/com/cmm053/find/settingOfManager/{0}",
                                getInfoEmLogin: "workflow/approvermanagement/workroot/getInforPsLogin",
                                getWpName: "workflow/approvermanagement/workroot/find/wkpInfo-login",
                                getEmployeeByCode: "workflow/approvermanagement/workroot/find/getEmployeeByCode",
                                getPastHistory: "workflow/approvermanagement/workroot/find/settingOfManager/getPastHistory/{0}",
                                insertHistoryByManagerSetting: "workflow/approvermanagement/workroot/managersetting/insert",
                                updateHistoryByManagerSetting: "workflow/approvermanagement/workroot/managersetting/update",
                                deleteHistoryByManagerSetting: "workflow/approvermanagement/workroot/managersetting/delete",
                                checkApprovalSetting: "screen/com/cmm053/check-approval-setting",
                                checkBfReg: "workflow/approvermanagement/workroot/checkBfRegCMM053"
                            };
                            function getSettingManager(employeeId) {
                                return ajax(format(paths.getSettingManager, employeeId));
                            }
                            service.getSettingManager = getSettingManager;
                            function getInfoEmLogin() {
                                return ajax(paths.getInfoEmLogin);
                            }
                            service.getInfoEmLogin = getInfoEmLogin;
                            function getWpName() {
                                return nts.uk.request.ajax("com", paths.getWpName);
                            }
                            service.getWpName = getWpName;
                            function getEmployeeByCode(employeeParamFind) {
                                return ajax(paths.getEmployeeByCode, employeeParamFind);
                            }
                            service.getEmployeeByCode = getEmployeeByCode;
                            function getPastHistory(employeeId) {
                                return ajax(format(paths.getPastHistory, employeeId));
                            }
                            service.getPastHistory = getPastHistory;
                            function updateHistoryByManagerSetting(command) {
                                return ajax(paths.updateHistoryByManagerSetting, command);
                            }
                            service.updateHistoryByManagerSetting = updateHistoryByManagerSetting;
                            function insertHistoryByManagerSetting(command) {
                                return ajax(paths.insertHistoryByManagerSetting, command);
                            }
                            service.insertHistoryByManagerSetting = insertHistoryByManagerSetting;
                            function deleteHistoryByManagerSetting(command) {
                                return ajax(paths.deleteHistoryByManagerSetting, command);
                            }
                            service.deleteHistoryByManagerSetting = deleteHistoryByManagerSetting;
                            function checkApprovalSetting(command) {
                                return ajax(paths.checkApprovalSetting, command);
                            }
                            service.checkApprovalSetting = checkApprovalSetting;
                            function checkBfReg(command) {
                                return ajax(paths.checkBfReg, command);
                            }
                            service.checkBfReg = checkBfReg;
                        })(service = a.service || (a.service = {}));
                    })(a = cmm053.a || (cmm053.a = {}));
                })(cmm053 = view.cmm053 || (view.cmm053 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm053.a.service.js.map