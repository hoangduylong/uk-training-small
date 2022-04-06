var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var sys;
        (function (sys) {
            var view;
            (function (view) {
                var ccg013;
                (function (ccg013) {
                    var b;
                    (function (b) {
                        var service;
                        (function (service) {
                            var paths = {
                                getEditMenuBar: "sys/portal/webmenu/edit",
                            };
                            function getEditMenuBar() {
                                return nts.uk.request.ajax("com", paths.getEditMenuBar);
                            }
                            service.getEditMenuBar = getEditMenuBar;
                        })(service = b.service || (b.service = {}));
                    })(b = ccg013.b || (ccg013.b = {}));
                })(ccg013 = view.ccg013 || (view.ccg013 = {}));
            })(view = sys.view || (sys.view = {}));
        })(sys = uk.sys || (uk.sys = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg013.b.service.js.map