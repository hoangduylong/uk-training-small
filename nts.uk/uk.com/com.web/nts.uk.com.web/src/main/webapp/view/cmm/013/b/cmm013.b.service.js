var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm013;
                (function (cmm013) {
                    var b;
                    (function (b) {
                        var ajax = nts.uk.request.ajax;
                        // import format = nts.uk.text.format;
                        var service;
                        (function (service) {
                            /**
                             * Service path
                             */
                            var servicePath = {
                                abrogateJobTItle: "",
                            };
                            function abrogateJobTItle(jobTitleCode, endDate) {
                                return ajax(servicePath.abrogateJobTItle, { jobTitleCode: jobTitleCode, endDate: endDate });
                            }
                            service.abrogateJobTItle = abrogateJobTItle;
                        })(service = b.service || (b.service = {}));
                    })(b = cmm013.b || (cmm013.b = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.b.service.js.map