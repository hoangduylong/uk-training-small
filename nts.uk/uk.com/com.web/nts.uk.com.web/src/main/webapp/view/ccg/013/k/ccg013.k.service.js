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
                    var k;
                    (function (k) {
                        var service;
                        (function (service) {
                            var paths = {
                                getAllStandardMenu: "sys/portal/standardmenu/findAll",
                                updateStandardMenu: "sys/portal/standardmenu/update",
                                getEditMenuBar: "sys/portal/webmenu/edit",
                            };
                            function getAllStandardMenu() {
                                return nts.uk.request.ajax("com", paths.getAllStandardMenu);
                            }
                            service.getAllStandardMenu = getAllStandardMenu;
                            function updateStandardMenu(standardMenu) {
                                return nts.uk.request.ajax("com", paths.updateStandardMenu, standardMenu);
                            }
                            service.updateStandardMenu = updateStandardMenu;
                            function getEditMenuBar() {
                                return nts.uk.request.ajax("com", paths.getEditMenuBar);
                            }
                            service.getEditMenuBar = getEditMenuBar;
                        })(service = k.service || (k.service = {}));
                    })(k = ccg013.k || (ccg013.k = {}));
                })(ccg013 = view.ccg013 || (view.ccg013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg013.k.service.js.map