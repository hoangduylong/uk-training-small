var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm011;
                (function (cmm011) {
                    var v2;
                    (function (v2) {
                        var b;
                        (function (b) {
                            var service;
                            (function (service) {
                                var ajax = nts.uk.request.ajax;
                                var format = nts.uk.text.format;
                                var servicePath = {
                                    getAllConfiguration: "bs/employee/wkpdep/get-all-configuration/{0}",
                                    addConfiguration: "bs/employee/wkpdep/add-configuration",
                                    updateConfiguration: "bs/employee/wkpdep/update-configuration",
                                    deleteConfiguration: "bs/employee/wkpdep/delete-configuration"
                                };
                                function getAllConfiguration(initMode) {
                                    var _path = format(servicePath.getAllConfiguration, initMode);
                                    return ajax("com", _path);
                                }
                                service.getAllConfiguration = getAllConfiguration;
                                function addConfiguration(data) {
                                    return ajax("com", servicePath.addConfiguration, data);
                                }
                                service.addConfiguration = addConfiguration;
                                function updateConfiguration(data) {
                                    return ajax("com", servicePath.updateConfiguration, data);
                                }
                                service.updateConfiguration = updateConfiguration;
                                function deleteConfiguration(data) {
                                    return ajax("com", servicePath.deleteConfiguration, data);
                                }
                                service.deleteConfiguration = deleteConfiguration;
                            })(service = b.service || (b.service = {}));
                        })(b = v2.b || (v2.b = {}));
                    })(v2 = cmm011.v2 || (cmm011.v2 = {}));
                })(cmm011 = view.cmm011 || (view.cmm011 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm011.v2.b.service.js.map