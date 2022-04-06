var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg008;
                (function (ccg008) {
                    var c;
                    (function (c) {
                        var service;
                        (function (service) {
                            var paths = {
                                getSelectMyTopPage: "topageselfsetting/select",
                                save: "topageselfsetting/save",
                                getTopPageSelfSet: "topageselfsetting/finditemselected"
                            };
                            /**
                             * get my top page
                             */
                            function getSelectMyTopPage() {
                                return nts.uk.request.ajax("com", paths.getSelectMyTopPage);
                            }
                            service.getSelectMyTopPage = getSelectMyTopPage;
                            /**
                             * save top page is selected
                             */
                            function save(data) {
                                return nts.uk.request.ajax("com", paths.save, data);
                            }
                            service.save = save;
                            /**
                             * get top page self set
                             */
                            function getTopPageSelfSet() {
                                return nts.uk.request.ajax("com", paths.getTopPageSelfSet);
                            }
                            service.getTopPageSelfSet = getTopPageSelfSet;
                        })(service = c.service || (c.service = {}));
                    })(c = ccg008.c || (ccg008.c = {}));
                })(ccg008 = view.ccg008 || (view.ccg008 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg008.c.service.js.map