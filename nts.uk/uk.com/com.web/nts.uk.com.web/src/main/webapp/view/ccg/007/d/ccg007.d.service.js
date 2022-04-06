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
                    var d;
                    (function (d) {
                        var service;
                        (function (service) {
                            // Service paths.
                            var servicePath = {
                                checkContract: "ctx/sys/gateway/login/checkcontract",
                                //submitLogin: "ctx/sys/gateway/login/submit/form3",
                                getAllCompany: "ctx/sys/gateway/login/getcompany/",
                                getEmployeeLoginSetting: "ctx/sys/gateway/login/emlogsettingform3",
                                account: "ctx/sys/gateway/login/account",
                                ver: "ctx/sys/gateway/login/build_info_time",
                                submitLogin: "ctx/sys/gateway/login/password",
                                samlLogin: "ctx/sys/gateway/singlesignon/saml/authenticate"
                            };
                            /**
                             * Function is used to copy new Top Page.
                             */
                            function checkContract(data) {
                                return nts.uk.request.ajax(servicePath.checkContract, data);
                            }
                            service.checkContract = checkContract;
                            function getEmployeeLoginSetting(contractCode) {
                                return nts.uk.request.ajax(servicePath.getEmployeeLoginSetting + "/" + contractCode);
                            }
                            service.getEmployeeLoginSetting = getEmployeeLoginSetting;
                            /**
                              * Function is used to copy new Top Page.
                              */
                            function submitLogin(data) {
                                return nts.uk.request.ajax(servicePath.submitLogin + location.search, data);
                            }
                            service.submitLogin = submitLogin;
                            function samlLogin(data) {
                                return nts.uk.request.ajax(servicePath.samlLogin, data);
                            }
                            service.samlLogin = samlLogin;
                            function account() {
                                return nts.uk.request.ajax(servicePath.account);
                            }
                            service.account = account;
                            function ver() {
                                return nts.uk.request.ajax(servicePath.ver);
                            }
                            service.ver = ver;
                            /**
                              * Function is used to copy new Top Page.
                              */
                            function getAllCompany(contractCode) {
                                return nts.uk.request.ajax(servicePath.getAllCompany + contractCode);
                            }
                            service.getAllCompany = getAllCompany;
                        })(service = d.service || (d.service = {}));
                    })(d = ccg007.d || (ccg007.d = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.d.service.js.map