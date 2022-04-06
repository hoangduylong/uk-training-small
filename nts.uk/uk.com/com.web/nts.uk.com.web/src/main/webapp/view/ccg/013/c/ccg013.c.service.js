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
                    var c;
                    (function (c) {
                        var service;
                        (function (service) {
                            // Service paths.
                            var servicePath = {
                                findBySystem: "sys/portal/standardmenu/findAll",
                                getEditMenuBar: "sys/portal/webmenu/edit",
                            };
                            function findBySystem() {
                                return nts.uk.request.ajax(servicePath.findBySystem);
                            }
                            service.findBySystem = findBySystem;
                            function getEditMenuBar() {
                                return nts.uk.request.ajax("com", servicePath.getEditMenuBar);
                            }
                            service.getEditMenuBar = getEditMenuBar;
                        })(service = c.service || (c.service = {}));
                    })(c = ccg013.c || (ccg013.c = {}));
                })(ccg013 = view.ccg013 || (view.ccg013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg013.c.service.js.map