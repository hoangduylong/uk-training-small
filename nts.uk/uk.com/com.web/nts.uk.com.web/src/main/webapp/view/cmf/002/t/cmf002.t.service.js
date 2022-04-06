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
                    var t;
                    (function (t) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                checkExistCode: "exio/exi/condset/checkExistCode/{0}",
                                excuteCopy: "exio/exo/condset/excuteCopy"
                            };
                            function checkExistCode(conditionSetCd) {
                                var _path = format(paths.checkExistCode, conditionSetCd);
                                return ajax('com', _path);
                            }
                            service.checkExistCode = checkExistCode;
                            ;
                            function excuteCopy(command) {
                                return ajax("com", paths.excuteCopy, command);
                            }
                            service.excuteCopy = excuteCopy;
                            ;
                        })(service = t.service || (t.service = {}));
                    })(t = cmf002.t || (cmf002.t = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.t.service.js.map