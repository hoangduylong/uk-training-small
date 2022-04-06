var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cas003;
                (function (cas003) {
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            var paths = {
                                getAccountLockPolicy: "ctx/sys/gateway/securitypolicy/getAccountLockPolicy",
                                getPasswordPolicy: "ctx/sys/gateway/securitypolicy/getPasswordPolicy",
                                updateAccountPolicy: "ctx/sys/gateway/securitypolicy/updateAccountPolicy"
                            };
                            function getAccountLockPolicy() {
                                return nts.uk.request.ajax(paths.getAccountLockPolicy);
                            }
                            service.getAccountLockPolicy = getAccountLockPolicy;
                            function getPasswordPolicy() {
                                return nts.uk.request.ajax(paths.getPasswordPolicy);
                            }
                            service.getPasswordPolicy = getPasswordPolicy;
                            function updateAccountPolicy(command) {
                                return nts.uk.request.ajax(paths.updateAccountPolicy, command);
                            }
                            service.updateAccountPolicy = updateAccountPolicy;
                            //Export common excel
                            function saveAsExcel() {
                                var program = nts.uk.ui._viewModel.kiban.programName().split(" ");
                                var domainType = "CAS003";
                                if (program.length > 1) {
                                    program.shift();
                                    domainType = domainType + program.join(" ");
                                }
                                var _params = { domainId: "SecuritySetting",
                                    domainType: domainType,
                                    languageId: "ja",
                                    reportType: 0 };
                                return nts.uk.request.exportFile('/masterlist/report/print', _params);
                            }
                            service.saveAsExcel = saveAsExcel;
                        })(service = a.service || (a.service = {}));
                    })(a = cas003.a || (cas003.a = {}));
                })(cas003 = view.cas003 || (view.cas003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas003.a.service.js.map