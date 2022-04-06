var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var csa005;
                (function (csa005) {
                    var b;
                    (function (b) {
                        var service;
                        (function (service) {
                            var paths = {
                                copyRoleCas005: "screen/sys/auth/cas005/copyrolecas005"
                            };
                            //
                            //copy role cas005
                            function copyRoleCas005(command) {
                                return nts.uk.request.ajax("com", paths.copyRoleCas005, command);
                            }
                            service.copyRoleCas005 = copyRoleCas005;
                        })(service = b.service || (b.service = {}));
                    })(b = csa005.b || (csa005.b = {}));
                })(csa005 = view.csa005 || (view.csa005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas005.b.service.js.map