var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm001;
                (function (cmm001) {
                    var e;
                    (function (e) {
                        var service;
                        (function (service) {
                            var paths = {
                                getAllMasterCopyCategory: "sys/assist/mastercopy/category/getAllMasterCopyCategory",
                            };
                            function getAllMasterCopyCategory() {
                                return nts.uk.request.ajax(paths.getAllMasterCopyCategory);
                            }
                            service.getAllMasterCopyCategory = getAllMasterCopyCategory;
                        })(service = e.service || (e.service = {}));
                    })(e = cmm001.e || (cmm001.e = {}));
                })(cmm001 = view.cmm001 || (view.cmm001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm001.e.service.js.map