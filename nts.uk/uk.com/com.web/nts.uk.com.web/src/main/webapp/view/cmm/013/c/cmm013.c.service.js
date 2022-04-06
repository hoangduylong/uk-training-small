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
                    var c;
                    (function (c) {
                        var service;
                        (function (service) {
                            /**
                             *  Service paths
                             */
                            var servicePath = {
                                findBySequenceCode: "bs/employee/jobtitle/sequence/find",
                            };
                            /**
                             * findBySequenceCode
                             */
                            function findBySequenceCode(sequenceCode) {
                                return nts.uk.request.ajax(servicePath.findBySequenceCode, { sequenceCode: sequenceCode });
                            }
                            service.findBySequenceCode = findBySequenceCode;
                        })(service = c.service || (c.service = {}));
                    })(c = cmm013.c || (cmm013.c = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.c.service.js.map