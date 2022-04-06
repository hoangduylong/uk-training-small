var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg026;
                (function (ccg026) {
                    var component;
                    (function (component) {
                        var ajax = nts.uk.request.ajax;
                        var format = nts.uk.text.format;
                        var service;
                        (function (service) {
                            var paths = {
                                getListOfWorkPlaceFunctions: "auth/wplmanagementauthority/workplacefunction/getlistworkplacefunction",
                                getListOfWorkPlaceauthorities: "auth/wplmanagementauthority/workplaceauthority/getallWorkplaceauthoritybyid/{0}"
                            };
                            /**
                             * get getListOfFunctionPermission by roleId
                             */
                            function getListOfDescriptionFunctionPermission(classification) {
                                switch (classification) {
                                    case 1: // workplace
                                        return ajax("com", paths.getListOfWorkPlaceFunctions);
                                    default:
                                        var dfd = $.Deferred();
                                        dfd.resolve([]);
                                        return dfd.promise();
                                }
                            }
                            service.getListOfDescriptionFunctionPermission = getListOfDescriptionFunctionPermission;
                            function getListOfAviabilityFunctionPermission(roleId, classification) {
                                switch (classification) {
                                    case 1: // workplace
                                        return ajax("com", format(paths.getListOfWorkPlaceauthorities, roleId));
                                    default:
                                        break;
                                }
                                return [];
                            }
                            service.getListOfAviabilityFunctionPermission = getListOfAviabilityFunctionPermission;
                        })(service = component.service || (component.service = {}));
                    })(component = ccg026.component || (ccg026.component = {}));
                })(ccg026 = view.ccg026 || (view.ccg026 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=component.service.js.map