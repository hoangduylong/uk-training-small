var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm020;
                (function (cmm020) {
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            /**
                             * define path to service
                             */
                            var paths = {
                                getAllEraNameItem: "at/shared/eraname/getAllEraName",
                                saveEraName: "at/shared/eraname/save",
                                deleteEraName: "at/shared/eraname/delete",
                                getEraNameItem: "at/shared/eraname/getEraNameItem"
                            };
                            function getAllEraNameItem() {
                                return nts.uk.request.ajax("at", paths.getAllEraNameItem);
                            }
                            service.getAllEraNameItem = getAllEraNameItem;
                            function saveEraName(eraNameItem) {
                                return nts.uk.request.ajax("at", paths.saveEraName, eraNameItem);
                            }
                            service.saveEraName = saveEraName;
                            function deleteEraName(eraNameItem) {
                                return nts.uk.request.ajax("at", paths.deleteEraName, eraNameItem);
                            }
                            service.deleteEraName = deleteEraName;
                            function getEraNameItem() {
                                return nts.uk.request.ajax("at", paths.getEraNameItem);
                            }
                            service.getEraNameItem = getEraNameItem;
                        })(service = a.service || (a.service = {}));
                    })(a = cmm020.a || (cmm020.a = {}));
                })(cmm020 = view.cmm020 || (view.cmm020 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm020.a.service.js.map