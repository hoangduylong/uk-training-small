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
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                getListMaster: "bs/employee/group_common_master/get_master",
                                update: "mandatoryRetirementRegulation/update",
                                startPage: "bs/employee/group_common_master/start-page-a",
                                saveItems: "bs/employee/group_common_master/save-items",
                                getItems: "bs/employee/group_common_master/get-items/{0}",
                                exportExcel: "file/com/report/groupcommonmaster/export"
                            };
                            function update(param) {
                                return ajax(paths.update, param);
                            }
                            service.update = update;
                            function startPage(param) {
                                return ajax(paths.startPage, param);
                            }
                            service.startPage = startPage;
                            function getItems(param) {
                                return ajax(format(paths.getItems, param));
                            }
                            service.getItems = getItems;
                            function saveItems(param) {
                                return ajax(paths.saveItems, param);
                            }
                            service.saveItems = saveItems;
                            function outPutFileExcel() {
                                return nts.uk.request.exportFile(paths.exportExcel);
                            }
                            service.outPutFileExcel = outPutFileExcel;
                        })(service = a.service || (a.service = {}));
                    })(a = cmm022.a || (cmm022.a = {}));
                })(cmm022 = view.cmm022 || (view.cmm022 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm022.a.service.js.map