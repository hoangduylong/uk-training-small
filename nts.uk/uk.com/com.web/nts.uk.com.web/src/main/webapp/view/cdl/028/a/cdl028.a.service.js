var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cdl028;
                (function (cdl028) {
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var paths = {
                                getStartMonth: "at/shared/holidaysetting/companycommon/getFirstMonth"
                            };
                            //get start month
                            function getStartMonth() {
                                return ajax("at", paths.getStartMonth);
                            }
                            service.getStartMonth = getStartMonth;
                            ;
                        })(service = a.service || (a.service = {}));
                    })(a = cdl028.a || (cdl028.a = {}));
                })(cdl028 = view.cdl028 || (view.cdl028 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl028.a.service.js.map