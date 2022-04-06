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
                        var d;
                        (function (d) {
                            var service;
                            (function (service) {
                                var ajax = nts.uk.request.ajax;
                                var format = nts.uk.text.format;
                                var servicePath = {
                                    checkCode: "bs/employee/wkpdep/check-duplicate-wkpdepinfo/{0}/{1}/{2}",
                                    getWkpDepInforById: "bs/employee/wkpdep/get-wkpdepinfo/{0}/{1}/{2}",
                                    regWkpDepInfor: "bs/employee/wkpdep/reg-wkpdepinfo"
                                };
                                function checkCode(initMode, historyId, code) {
                                    var _path = format(servicePath.checkCode, initMode, historyId, code);
                                    return ajax("com", _path);
                                }
                                service.checkCode = checkCode;
                                function getWkpDepInforById(initMode, histId, id) {
                                    var _path = format(servicePath.getWkpDepInforById, initMode, histId, id);
                                    return ajax("com", _path);
                                }
                                service.getWkpDepInforById = getWkpDepInforById;
                                function registerWkpDepInfor(data) {
                                    return ajax("com", servicePath.regWkpDepInfor, data);
                                }
                                service.registerWkpDepInfor = registerWkpDepInfor;
                            })(service = d.service || (d.service = {}));
                        })(d = v2.d || (v2.d = {}));
                    })(v2 = cmm011.v2 || (cmm011.v2 = {}));
                })(cmm011 = view.cmm011 || (view.cmm011 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm011.v2.d.service.js.map