var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm022;
                (function (cmm022) {
                    var c;
                    (function (c) {
                        var service;
                        (function (service) {
                            var paths = {
                                update: "bs/employee/group_common_master/update-common-C-screen",
                                getListMaster: "bs/employee/group_common_master/get_master",
                            };
                            function getListMaster() {
                                return nts.uk.request.ajax(paths.getListMaster);
                            }
                            service.getListMaster = getListMaster;
                            function update(param) {
                                return nts.uk.request.ajax(paths.update, param);
                            }
                            service.update = update;
                        })(service = c.service || (c.service = {}));
                    })(c = cmm022.c || (cmm022.c = {}));
                })(cmm022 = view.cmm022 || (view.cmm022 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm022.c.service.js.map