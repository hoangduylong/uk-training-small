var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg031;
                (function (ccg031) {
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            var paths = {
                                active: "sys/portal/layout/active",
                                registry: "sys/portal/layout/registry",
                                findByID: "sys/portal/topagepart/findPlacementPartByID"
                            };
                            function active(layoutID) {
                                if (nts.uk.text.isNullOrEmpty(layoutID))
                                    return nts.uk.request.ajax("com", paths.active);
                                else
                                    return nts.uk.request.ajax("com", paths.active, layoutID);
                            }
                            service.active = active;
                            function registry(parentCode, layoutID, pgType, placements) {
                                var data = {
                                    portalLayoutCommand: {
                                        parentCode: parentCode,
                                        layoutID: layoutID,
                                        pgType: pgType
                                    },
                                    listPortalPlacementCommand: ko.mapping.toJS(placements)
                                };
                                return nts.uk.request.ajax("com", paths.registry, data, { dataType: 'text' });
                            }
                            service.registry = registry;
                            function findPlacementPart(topPagePartID) {
                                return nts.uk.request.ajax("com", paths.findByID + "/" + topPagePartID);
                            }
                            service.findPlacementPart = findPlacementPart;
                        })(service = a.service || (a.service = {}));
                    })(a = ccg031.a || (ccg031.a = {}));
                })(ccg031 = view.ccg031 || (view.ccg031 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg031.a.service.js.map