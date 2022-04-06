var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm023;
                (function (cmm023) {
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var paths = {
                                getMaster: "bs/employee/group_common_master/get_master",
                                getItems: "bs/employee/group_common_master/get_items",
                                saveMaster: "bs/employee/group_common_master/save_master"
                            };
                            function getMaster() {
                                return ajax(paths.getMaster);
                            }
                            service.getMaster = getMaster;
                            function getItems(param) {
                                return ajax(paths.getItems, param);
                            }
                            service.getItems = getItems;
                            function saveMaster(param) {
                                return ajax(paths.saveMaster, param);
                            }
                            service.saveMaster = saveMaster;
                        })(service = a.service || (a.service = {}));
                    })(a = cmm023.a || (cmm023.a = {}));
                })(cmm023 = view.cmm023 || (view.cmm023 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm023.a.service.js.map