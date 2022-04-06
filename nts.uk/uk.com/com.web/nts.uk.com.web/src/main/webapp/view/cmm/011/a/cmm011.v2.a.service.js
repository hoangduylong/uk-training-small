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
                        var a;
                        (function (a) {
                            var service;
                            (function (service) {
                                var ajax = nts.uk.request.ajax;
                                var format = nts.uk.text.format;
                                var servicePath = {
                                    getConfiguration: "bs/employee/wkpdep/get-configuration/{0}",
                                    getOperationRule: "bs/employee/operationrule/get-operation-rule",
                                    getAllWkpDepInfor: "bs/employee/wkpdep/get-wkpdepinfo/{0}/{1}",
                                    getWkpDepInforById: "bs/employee/wkpdep/get-wkpdepinfo/{0}/{1}/{2}",
                                    getAllWkpDepInforTree: "bs/employee/wkpdep/get-wkpdepinfo-tree/{0}/{1}",
                                    checkTotalWkpDepInfor: "bs/employee/wkpdep/check-total-wkpdepinfo/{0}/{1}",
                                    checkCode: "bs/employee/wkpdep/check-duplicate-wkpdepinfo/{0}/{1}/{2}",
                                    deleteWkpDepInfor: "bs/employee/wkpdep/delete-wkpdepinfo",
                                    regWkpDepInfor: "bs/employee/wkpdep/reg-wkpdepinfo"
                                };
                                function getConfiguration(initMode) {
                                    var _path = format(servicePath.getConfiguration, initMode);
                                    return ajax("com", _path);
                                }
                                service.getConfiguration = getConfiguration;
                                function getOperationRule() {
                                    return ajax("com", servicePath.getOperationRule);
                                }
                                service.getOperationRule = getOperationRule;
                                function getAllWkpDepInfor(initMode, histId) {
                                    var _path = format(servicePath.getAllWkpDepInfor, initMode, histId);
                                    return ajax("com", _path);
                                }
                                service.getAllWkpDepInfor = getAllWkpDepInfor;
                                function getWkpDepInforById(initMode, histId, id) {
                                    var _path = format(servicePath.getWkpDepInforById, initMode, histId, id);
                                    return ajax("com", _path);
                                }
                                service.getWkpDepInforById = getWkpDepInforById;
                                function getAllWkpDepInforTree(initMode, histId) {
                                    var _path = format(servicePath.getAllWkpDepInforTree, initMode, histId);
                                    return ajax("com", _path);
                                }
                                service.getAllWkpDepInforTree = getAllWkpDepInforTree;
                                function checkTotalWkpDepInfor(initMode, histId) {
                                    var _path = format(servicePath.checkTotalWkpDepInfor, initMode, histId);
                                    return ajax("com", _path);
                                }
                                service.checkTotalWkpDepInfor = checkTotalWkpDepInfor;
                                function checkCode(initMode, historyId, code) {
                                    var _path = format(servicePath.checkCode, initMode, historyId, code);
                                    return ajax("com", _path);
                                }
                                service.checkCode = checkCode;
                                function deleteWkpDepInfor(data) {
                                    return ajax("com", servicePath.deleteWkpDepInfor, data);
                                }
                                service.deleteWkpDepInfor = deleteWkpDepInfor;
                                function registerWkpDepInfor(data) {
                                    return ajax("com", servicePath.regWkpDepInfor, data);
                                }
                                service.registerWkpDepInfor = registerWkpDepInfor;
                            })(service = a.service || (a.service = {}));
                        })(a = v2.a || (v2.a = {}));
                    })(v2 = cmm011.v2 || (cmm011.v2 = {}));
                })(cmm011 = view.cmm011 || (view.cmm011 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm011.v2.a.service.js.map