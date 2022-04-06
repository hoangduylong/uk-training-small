var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg013;
                (function (ccg013) {
                    var e;
                    (function (e) {
                        var service;
                        (function (service) {
                            // Service paths.
                            var servicePath = {
                                copy: "sys/portal/webmenu/copy",
                            };
                            function copy(webMenu) {
                                return nts.uk.request.ajax("com", servicePath.copy, webMenu);
                            }
                            service.copy = copy;
                        })(service = e.service || (e.service = {}));
                    })(e = ccg013.e || (ccg013.e = {}));
                })(ccg013 = view.ccg013 || (view.ccg013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg013.e.service.js.map