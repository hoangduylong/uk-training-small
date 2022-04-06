var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cas001;
                (function (cas001) {
                    var c;
                    (function (c) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var paths = {
                                getAllPersonRole: "ctx/pereg/roles/findAll",
                                update: "ctx/pereg/roles/auth/update"
                            };
                            /**
                             * Get All Person Role
                             */
                            function getAllPersonRole() {
                                return ajax(paths.getAllPersonRole);
                            }
                            service.getAllPersonRole = getAllPersonRole;
                            /**
                          *update Person Role
                          */
                            function update(object) {
                                return ajax(paths.update, object);
                            }
                            service.update = update;
                        })(service = c.service || (c.service = {}));
                    })(c = cas001.c || (cas001.c = {}));
                })(cas001 = view.cas001 || (view.cas001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas001.c.service.js.map