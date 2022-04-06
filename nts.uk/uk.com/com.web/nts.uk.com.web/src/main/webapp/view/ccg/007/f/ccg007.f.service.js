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
                    var f;
                    (function (f) {
                        var service;
                        (function (service) {
                            // Service paths.
                            var servicePath = {
                                submitSendMail: "ctx/sys/gateway/sendmail/submit"
                            };
                            /**
                              * Function is used to check contract.
                              */
                            function submitSendMail(data) {
                                return nts.uk.request.ajax(servicePath.submitSendMail, data);
                            }
                            service.submitSendMail = submitSendMail;
                        })(service = f.service || (f.service = {}));
                    })(f = ccg007.f || (ccg007.f = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.f.service.js.map