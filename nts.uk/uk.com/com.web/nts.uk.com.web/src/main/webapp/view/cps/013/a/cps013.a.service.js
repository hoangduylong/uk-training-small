var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps013;
                (function (cps013) {
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var paths = {
                                checkCategoryHasItem: "ctx/pereg/check/category/checkHasCtg",
                                getSystemDate: "ctx/pereg/check/category/getSystemDate"
                            };
                            function checkHasCtg(CheckDataFromUI) {
                                return ajax(paths.checkCategoryHasItem, CheckDataFromUI);
                            }
                            service.checkHasCtg = checkHasCtg;
                            // get systemDate for A1_004
                            function getSystemDate() {
                                return ajax('com', paths.getSystemDate);
                            }
                            service.getSystemDate = getSystemDate;
                            ;
                        })(service = a.service || (a.service = {}));
                    })(a = cps013.a || (cps013.a = {}));
                })(cps013 = view.cps013 || (view.cps013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps013.a.service.js.map