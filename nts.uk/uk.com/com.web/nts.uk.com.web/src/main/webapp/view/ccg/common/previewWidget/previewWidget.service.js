var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg;
                (function (ccg) {
                    var common;
                    (function (common) {
                        var previewWidget;
                        (function (previewWidget) {
                            var service;
                            (function (service) {
                                var paths = {
                                    active: "sys/portal/layout/active",
                                };
                                function active(layoutID) {
                                    if (nts.uk.text.isNullOrEmpty(layoutID))
                                        return nts.uk.request.ajax("com", paths.active);
                                    else
                                        return nts.uk.request.ajax("com", paths.active, layoutID);
                                }
                                service.active = active;
                            })(service = previewWidget.service || (previewWidget.service = {}));
                        })(previewWidget = common.previewWidget || (common.previewWidget = {}));
                    })(common = ccg.common || (ccg.common = {}));
                })(ccg = view.ccg || (view.ccg = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=previewWidget.service.js.map