var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var pr;
        (function (pr) {
            var view;
            (function (view) {
                var ccg007;
                (function (ccg007) {
                    var c;
                    (function (c) {
                        var service;
                        (function (service) {
                            // Service paths.
                            var servicePath = {
                                checkContract: "ctx/sys/gateway/login/checkcontract",
                                submitLogin: "ctx/sys/gateway/login/submit/form2",
                                getEmployeeLoginSetting: "ctx/sys/gateway/login/emlogsettingform2",
                                getCompanyInfo: "ctx/sys/gateway/login/getcompanybycode",
                                account: "ctx/sys/gateway/login/account",
                                ver: "ctx/sys/gateway/login/build_info_time"
                            };
                            /**
                              * Function is used to valid contract .
                              */
                            function checkContract(data) {
                                return nts.uk.request.ajax(servicePath.checkContract, data);
                            }
                            service.checkContract = checkContract;
                            /**
                              * Function is used to get employee login setting
                              */
                            function getEmployeeLoginSetting(contractCode) {
                                return nts.uk.request.ajax(servicePath.getEmployeeLoginSetting + "/" + contractCode);
                            }
                            service.getEmployeeLoginSetting = getEmployeeLoginSetting;
                            function getCompanyInfo(companyId) {
                                return nts.uk.request.ajax(servicePath.getCompanyInfo + "/" + companyId);
                            }
                            service.getCompanyInfo = getCompanyInfo;
                            function account() {
                                return nts.uk.request.ajax(servicePath.account);
                            }
                            service.account = account;
                            /**
                              * Function is used to submit login.
                              */
                            function submitLogin(data) {
                                return nts.uk.request.ajax(servicePath.submitLogin + location.search, data);
                            }
                            service.submitLogin = submitLogin;
                            function ver() {
                                return nts.uk.request.ajax(servicePath.ver);
                            }
                            service.ver = ver;
                        })(service = c.service || (c.service = {}));
                    })(c = ccg007.c || (ccg007.c = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.c.service.js.map