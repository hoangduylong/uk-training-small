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
                    var i;
                    (function (i) {
                        var service;
                        (function (service) {
                            // Service paths.
                            var servicePath = {
                                getPasswordPolicy: "ctx/sys/gateway/securitypolicy/getPasswordPolicy"
                            };
                            /**
                              * Function is used to check contract.
                              */
                            function getPasswordPolicy() {
                                return nts.uk.request.ajax(servicePath.getPasswordPolicy);
                            }
                            service.getPasswordPolicy = getPasswordPolicy;
                        })(service = i.service || (i.service = {}));
                    })(i = ccg007.i || (ccg007.i = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.i.service.js.map