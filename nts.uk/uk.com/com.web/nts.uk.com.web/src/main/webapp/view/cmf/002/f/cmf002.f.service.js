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
                    var f;
                    (function (f) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                getOutputItem: "exio/exo/ctgoutputitem/getOutItems/{0}",
                                getCtgData: "exio/exo/ctgoutputitem/getctgdata/{0}",
                                addOutputItem: "exio/exo/registeroutputitem/add"
                            };
                            function getOutputItem(condSetCd) {
                                var _path = format(paths.getOutputItem, condSetCd);
                                return ajax("com", _path);
                            }
                            service.getOutputItem = getOutputItem;
                            function getCtgData(categoryId) {
                                var _path = format(paths.getCtgData, categoryId);
                                return ajax("com", _path);
                            }
                            service.getCtgData = getCtgData;
                            // add
                            function addOutputItem(command) {
                                return ajax(paths.addOutputItem, command);
                            }
                            service.addOutputItem = addOutputItem;
                        })(service = f.service || (f.service = {}));
                    })(f = cmf002.f || (cmf002.f = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.f.service.js.map