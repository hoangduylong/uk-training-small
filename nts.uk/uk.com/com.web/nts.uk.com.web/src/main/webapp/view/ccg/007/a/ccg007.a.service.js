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
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            // Service paths.
                            var servicePath = {
                                submitContract: "ctx/sys/gateway/login/submitcontract"
                            };
                            /**
                              * Function is used to copy new Top Page.
                              */
                            function submitForm(data) {
                                return nts.uk.request.ajax(servicePath.submitContract, data);
                            }
                            service.submitForm = submitForm;
                        })(service = a.service || (a.service = {}));
                    })(a = ccg007.a || (ccg007.a = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.a.service.js.map