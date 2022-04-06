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
                    var g;
                    (function (g) {
                        var service;
                        (function (service) {
                            // Service paths.
                            var servicePath = {
                                submitSendMail: "ctx/sys/gateway/sendmail/submit2",
                                submitSendMailCCG007D: "ctx/sys/gateway/sendmail/submitCCG007D"
                            };
                            /**
                              * Function is used to check contract.
                              */
                            function submitSendMail(data) {
                                return nts.uk.request.ajax(servicePath.submitSendMail, data);
                            }
                            service.submitSendMail = submitSendMail;
                            /**
                              * Function is used to check contract.
                              */
                            function submitSendMailCCG007D(data) {
                                return nts.uk.request.ajax(servicePath.submitSendMailCCG007D, data);
                            }
                            service.submitSendMailCCG007D = submitSendMailCCG007D;
                            var SendMailInfoFormGCommand = /** @class */ (function () {
                                function SendMailInfoFormGCommand(companyCode, employeeCode, contractCode) {
                                    this.companyCode = companyCode;
                                    this.employeeCode = employeeCode;
                                    this.contractCode = contractCode;
                                }
                                return SendMailInfoFormGCommand;
                            }());
                            service.SendMailInfoFormGCommand = SendMailInfoFormGCommand;
                        })(service = g.service || (g.service = {}));
                    })(g = ccg007.g || (ccg007.g = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.g.service.js.map