var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var csa005;
                (function (csa005) {
                    var c;
                    (function (c) {
                        var service;
                        (function (service) {
                            var paths = {
                                getPerMissingMenu: "ctx/sys/auth/role/per/setting/menu",
                            };
                            /** Get PermissionSettingMenu */
                            function getPerMissingMenu() {
                                return nts.uk.request.ajax("com", paths.getPerMissingMenu + '/3');
                            }
                            service.getPerMissingMenu = getPerMissingMenu;
                        })(service = c.service || (c.service = {}));
                    })(c = csa005.c || (csa005.c = {}));
                })(csa005 = view.csa005 || (view.csa005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas005.c.service.js.map