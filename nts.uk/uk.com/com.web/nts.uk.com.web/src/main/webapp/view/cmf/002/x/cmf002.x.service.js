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
                    var x;
                    (function (x) {
                        var ajax = nts.uk.request.ajax;
                        var format = nts.uk.text.format;
                        var service;
                        (function (service) {
                            var paths = {
                                getExecHist: "exio/exo/exechist/getExecHist",
                                useDeleteFile: "exio/exo/execlog/useDeleteFile/{0}",
                                getExOutExecHistSearch: "exio/exo/exechist/getExOutExecHistSearch",
                            };
                            function getExecHist(param) {
                                return ajax('com', paths.getExecHist, param);
                            }
                            service.getExecHist = getExecHist;
                            ;
                            function useDeleteFile(outProcessId) {
                                var path = format(paths.useDeleteFile, outProcessId);
                                return ajax('com', path);
                            }
                            service.useDeleteFile = useDeleteFile;
                            ;
                            function getExOutExecHistSearch(param) {
                                return ajax('com', paths.getExOutExecHistSearch, param);
                            }
                            service.getExOutExecHistSearch = getExOutExecHistSearch;
                            ;
                        })(service = x.service || (x.service = {}));
                    })(x = cmf002.x || (cmf002.x = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.x.service.js.map