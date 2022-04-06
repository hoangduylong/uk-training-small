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
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                getCategoryRoleList: "/ctx/pereg/roles/auth/category/findAllCategory/{0}",
                                getCategoryAuth: "/ctx/pereg/roles/auth/category/find/{0}/{1}",
                                getPersonRoleItemList: "/ctx/pereg/roles/auth/item/findAllItem/{0}/{1}",
                                savePersonRole: "/ctx/pereg/roles/auth/save",
                                getAllItemIdRequired: "ctx/pereg/person/info/ctgItem/layout/findAll/required",
                                saveAsExcel: "file/at/personrole/saveAsExcel"
                            };
                            function getCategoryRoleList(roleID) {
                                return ajax(format(paths.getCategoryRoleList, roleID));
                            }
                            service.getCategoryRoleList = getCategoryRoleList;
                            function getCategoryAuth(roleId, personInfoCategoryAuthId) {
                                return ajax(format(paths.getCategoryAuth, roleId, personInfoCategoryAuthId));
                            }
                            service.getCategoryAuth = getCategoryAuth;
                            function getPersonRoleItemList(roleId, personInfoCategoryAuthId) {
                                return ajax(format(paths.getPersonRoleItemList, roleId, personInfoCategoryAuthId));
                            }
                            service.getPersonRoleItemList = getPersonRoleItemList;
                            function savePersonRole(command) {
                                ;
                                return ajax(paths.savePersonRole, command);
                            }
                            service.savePersonRole = savePersonRole;
                            function getAllItemIdRequired() {
                                return ajax(paths.getAllItemIdRequired);
                            }
                            service.getAllItemIdRequired = getAllItemIdRequired;
                            function saveAsExcel(languageId) {
                                var program = nts.uk.ui._viewModel.kiban.programName().split(" ");
                                var domainType = "CAS001";
                                if (program.length > 1) {
                                    program.shift();
                                    domainType = domainType + program.join(" ");
                                }
                                var _params = { domainId: "PersonRole",
                                    domainType: domainType,
                                    languageId: languageId, reportType: 0 };
                                return nts.uk.request.exportFile('/masterlist/report/print', _params);
                            }
                            service.saveAsExcel = saveAsExcel;
                        })(service = a.service || (a.service = {}));
                    })(a = cas001.a || (cas001.a = {}));
                })(cas001 = view.cas001 || (view.cas001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas001.a.service.js.map