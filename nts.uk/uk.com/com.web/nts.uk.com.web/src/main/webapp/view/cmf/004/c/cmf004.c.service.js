var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf004;
                (function (cmf004) {
                    var c;
                    (function (c) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var paths = {
                                checkPassword: "ctx/sys/assist/datarestoration/checkPassword",
                            };
                            function checkPassword(param) {
                                return ajax('com', paths.checkPassword, param);
                            }
                            service.checkPassword = checkPassword;
                        })(service = c.service || (c.service = {}));
                    })(c = cmf004.c || (cmf004.c = {}));
                })(cmf004 = view.cmf004 || (view.cmf004 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf004.c.service.js.map