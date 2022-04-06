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
                    var b;
                    (function (b) {
                        var service;
                        (function (service) {
                            var paths = {
                                getListMasterItem: "bs/employee/group_common_master/get-items-B-screen-start",
                                update: "bs/employee/group_common_master/update-items-B-screen",
                            };
                            function getListMasterItem(param) {
                                return nts.uk.request.ajax(paths.getListMasterItem, param);
                            }
                            service.getListMasterItem = getListMasterItem;
                            function update(param) {
                                return nts.uk.request.ajax(paths.update, param);
                            }
                            service.update = update;
                        })(service = b.service || (b.service = {}));
                    })(b = cmm022.b || (cmm022.b = {}));
                })(cmm022 = view.cmm022 || (view.cmm022 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm022.b.service.js.map