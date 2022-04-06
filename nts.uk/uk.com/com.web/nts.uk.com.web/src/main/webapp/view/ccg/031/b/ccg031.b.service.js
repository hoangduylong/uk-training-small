var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg031;
                (function (ccg031) {
                    var b;
                    (function (b) {
                        var service;
                        (function (service) {
                            var paths = {
                                findAll: "sys/portal/topagepart/findAll"
                            };
                            function findAll(pgType) {
                                return nts.uk.request.ajax("com", paths.findAll, pgType.toString());
                            }
                            service.findAll = findAll;
                        })(service = b.service || (b.service = {}));
                    })(b = ccg031.b || (ccg031.b = {}));
                })(ccg031 = view.ccg031 || (view.ccg031 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg031.b.service.js.map