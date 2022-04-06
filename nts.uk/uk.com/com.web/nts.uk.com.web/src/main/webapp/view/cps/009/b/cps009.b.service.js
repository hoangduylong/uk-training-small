var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps009;
                (function (cps009) {
                    var b;
                    (function (b) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                getAllItemByCtgId: "ctx/pereg/person/info/setting/init/item/findRequired/{0}/{1}"
                            };
                            /**
                           * Get all init value setting
                           */
                            function getAllItemByCtgId(settingId, perInfoCtgId) {
                                return ajax(format(paths.getAllItemByCtgId, settingId, perInfoCtgId));
                            }
                            service.getAllItemByCtgId = getAllItemByCtgId;
                        })(service = b.service || (b.service = {}));
                    })(b = cps009.b || (cps009.b = {}));
                })(cps009 = view.cps009 || (view.cps009 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps009.b.service.js.map