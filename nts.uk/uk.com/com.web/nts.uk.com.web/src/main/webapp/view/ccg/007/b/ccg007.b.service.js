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
                    var b;
                    (function (b) {
                        var service;
                        (function (service) {
                            // Service paths.
                            var servicePath = {
                                getContractAuth: "ctx/sys/gateway/login/checkcontract",
                                submitLogin: "ctx/sys/gateway/login/submit/form1",
                                account: "ctx/sys/gateway/login/account",
                                ver: "ctx/sys/gateway/login/build_info_time"
                            };
                            /**
                              * Function is used to check contract.
                              */
                            function checkContract(data) {
                                return nts.uk.request.ajax(servicePath.getContractAuth, data);
                            }
                            service.checkContract = checkContract;
                            function account() {
                                return nts.uk.request.ajax(servicePath.account);
                            }
                            service.account = account;
                            /**
                              * Function is used to copy new Top Page.
                              */
                            function submitLogin(data) {
                                return nts.uk.request.ajax(servicePath.submitLogin + location.search, data);
                            }
                            service.submitLogin = submitLogin;
                            function ver() {
                                return nts.uk.request.ajax(servicePath.ver);
                            }
                            service.ver = ver;
                        })(service = b.service || (b.service = {}));
                    })(b = ccg007.b || (ccg007.b = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.b.service.js.map