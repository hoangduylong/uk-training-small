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
                    var shr;
                    (function (shr) {
                        var servicebase;
                        (function (servicebase) {
                            var paths = {
                                updateHistory: "workflow/approvermanagement/workroot/updateHistory",
                                getAllDataCom: "workflow/approvermanagement/workroot/getbycom",
                                getAllDataPr: "workflow/approvermanagement/workroot/getbyprivate",
                                getNameAppType: "workflow/approvermanagement/workroot/find/applicationType",
                                updateRoot: "workflow/approvermanagement/workroot/updateRoot",
                                getInfoEmployee: "workflow/approvermanagement/workroot/getInforPerson",
                                getInfoEmLogin: "workflow/approvermanagement/workroot/getInforPsLogin",
                                getNameConfirmType: "workflow/approvermanagement/workroot/find/confirmRootType",
                                getWkpDepInfo: "workflow/approvermanagement/workroot/find/wkpDepInfo",
                                getWpLogin: "workflow/approvermanagement/workroot/find/wkpInfo-login",
                                getDepLogin: "workflow/approvermanagement/workroot/find/depInfo-login",
                                settingCas005: "at/auth/workplace/employmentrole/getemproleSet",
                                settingKaf022: "workflow/approvermanagement/workroot/appSet",
                                setAppUseKaf022: "at/request/application/approval/app-useAtr",
                                setDisHR: "hrdev/approvalSet/appRootSet",
                                settingJnh011: "hr/notice/report/findByAbol",
                                settingJmm018: "hrdeveventmenu/eventmenuoperation/findByApprUse"
                            };
                            function updateHistory(data) {
                                return nts.uk.request.ajax("com", paths.updateHistory, data);
                            }
                            servicebase.updateHistory = updateHistory;
                            function getAllDataCom(param) {
                                return nts.uk.request.ajax("com", paths.getAllDataCom, param);
                            }
                            servicebase.getAllDataCom = getAllDataCom;
                            function getAllDataPr(param) {
                                return nts.uk.request.ajax("com", paths.getAllDataPr, param);
                            }
                            servicebase.getAllDataPr = getAllDataPr;
                            function getNameAppType() {
                                return nts.uk.request.ajax("com", paths.getNameAppType);
                            }
                            servicebase.getNameAppType = getNameAppType;
                            function updateRoot(data) {
                                return nts.uk.request.ajax("com", paths.updateRoot, data);
                            }
                            servicebase.updateRoot = updateRoot;
                            function getInfoEmployee(employeeId) {
                                return nts.uk.request.ajax("com", paths.getInfoEmployee, employeeId);
                            }
                            servicebase.getInfoEmployee = getInfoEmployee;
                            function getInfoEmLogin() {
                                return nts.uk.request.ajax("com", paths.getInfoEmLogin);
                            }
                            servicebase.getInfoEmLogin = getInfoEmLogin;
                            function getWkpDepInfo(param) {
                                return nts.uk.request.ajax("com", paths.getWkpDepInfo, param);
                            }
                            servicebase.getWkpDepInfo = getWkpDepInfo;
                            //get wpName || depName
                            function getWpDepName(sysAtr) {
                                if (sysAtr == 0) {
                                    return nts.uk.request.ajax("com", paths.getWpLogin);
                                }
                                else {
                                    return nts.uk.request.ajax("com", paths.getDepLogin);
                                }
                            }
                            servicebase.getWpDepName = getWpDepName;
                            //EmploymentRoleDataWebService
                            function settingCas005() {
                                return nts.uk.request.ajax("at", paths.settingCas005);
                            }
                            servicebase.settingCas005 = settingCas005;
                            // move webservice to com refactor5
                            function settingKaf022() {
                                return nts.uk.request.ajax("com", paths.settingKaf022);
                            }
                            servicebase.settingKaf022 = settingKaf022;
                            //ApprovalInfoWebsevice
                            function setAppUseKaf022(param) {
                                return nts.uk.request.ajax("at", paths.setAppUseKaf022, param);
                            }
                            servicebase.setAppUseKaf022 = setAppUseKaf022;
                            //PersonalReportClassificationWebService
                            function settingJnh011() {
                                return nts.uk.request.ajax("hr", paths.settingJnh011);
                            }
                            servicebase.settingJnh011 = settingJnh011;
                            //HrApprovalRooteSetWs
                            function setDisHR() {
                                return nts.uk.request.ajax("com", paths.setDisHR);
                            }
                            servicebase.setDisHR = setDisHR;
                            //EventManageWebservice
                            function settingJmm018() {
                                return nts.uk.request.ajax("hr", paths.settingJmm018);
                            }
                            servicebase.settingJmm018 = settingJmm018;
                        })(servicebase = shr.servicebase || (shr.servicebase = {}));
                    })(shr = cmm018.shr || (cmm018.shr = {}));
                })(cmm018 = view.cmm018 || (view.cmm018 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm018.shr.servicebase.js.map