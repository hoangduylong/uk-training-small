var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf002;
                (function (cmf002) {
                    var a;
                    (function (a) {
                        var ajax = nts.uk.request.ajax;
                        var service;
                        (function (service) {
                            var paths = {
                                startMenu: "exio/exo/menu/startMenu"
                            };
                            function startMenu() {
                                return ajax('com', paths.startMenu);
                            }
                            service.startMenu = startMenu;
                            ;
                        })(service = a.service || (a.service = {}));
                    })(a = cmf002.a || (cmf002.a = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.a.service.js.map