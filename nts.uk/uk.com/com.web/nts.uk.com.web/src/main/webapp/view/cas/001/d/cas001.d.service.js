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
                    var d;
                    (function (d) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                getAllCategory: "ctx/pereg/roles/auth/category/findAllCategory/{0}",
                                getAllCategoryAuth: "ctx/pereg/roles/auth/category/find/categoryAuth/{0}",
                                update: "ctx/pereg/roles/auth/category/update"
                            };
                            /**
                             * Get all category
                             */
                            function getAllCategory(roleId) {
                                return ajax(format(paths.getAllCategory, roleId));
                            }
                            service.getAllCategory = getAllCategory;
                            /**
                             * Get all category auth
                             */
                            function getAllCategoryAuth(roleId) {
                                return ajax(format(paths.getAllCategoryAuth, roleId));
                            }
                            service.getAllCategoryAuth = getAllCategoryAuth;
                            /**
                             * update category
                             */
                            function updateCategory(command) {
                                return ajax(paths.update, command);
                            }
                            service.updateCategory = updateCategory;
                        })(service = d.service || (d.service = {}));
                    })(d = cas001.d || (cas001.d = {}));
                })(cas001 = view.cas001 || (view.cas001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas001.d.service.js.map