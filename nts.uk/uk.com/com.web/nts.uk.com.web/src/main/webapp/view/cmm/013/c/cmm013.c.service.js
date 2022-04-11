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
                        var service;
                        (function (service) {
                            /**
                             * Service path
                             */
                            var servicePath = {
                                findAllPosition: "basic/training/position/find/all",
                            };
                            /**
                             * getListPosition
                             */
                            function findAllPosition() {
                                return nts.uk.request.ajax(servicePath.findAllPosition);
                            }
                            service.findAllPosition = findAllPosition;
                        })(service = b.service || (b.service = {}));
                    })(b = cmm013.b || (cmm013.b = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.c.service.js.map