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
                    var v1;
                    (function (v1) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var paths = {
                                getCategory: "exio/exo/exechist/getCategory",
                            };
                            function getCategory(param) {
                                return ajax('com', paths.getCategory, param);
                            }
                            service.getCategory = getCategory;
                            ;
                        })(service = v1.service || (v1.service = {}));
                    })(v1 = cmf002.v1 || (cmf002.v1 = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.v1.service.js.map