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
                    var d;
                    (function (d) {
                        var ajax = nts.uk.request.ajax;
                        var format = nts.uk.text.format;
                        var service;
                        (function (service) {
                            var paths = {
                                getListCtgItems: "exio/exo/outcnddetail/getListCtgItems/{0}/{1}",
                                register: "exio/exo/outcnddetail/register"
                            };
                            function getListCtgItems(condSetCd, categoryId) {
                                var _path = format(paths.getListCtgItems, condSetCd, categoryId);
                                return ajax('com', _path);
                            }
                            service.getListCtgItems = getListCtgItems;
                            function register(outCndDetail) {
                                return ajax('com', paths.register, outCndDetail);
                            }
                            service.register = register;
                        })(service = d.service || (d.service = {}));
                    })(d = cmf002.d || (cmf002.d = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.d.service.js.map