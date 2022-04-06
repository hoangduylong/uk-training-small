var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf005;
                (function (cmf005) {
                    var c;
                    (function (c) {
                        var ajax = nts.uk.request.ajax;
                        var service;
                        (function (service) {
                            var paths = {
                                initDisplay: "ctx/sys/assist/autosetting/deletionPattern/initialDisplay",
                                selectPattern: "ctx/sys/assist/autosetting/deletionPattern/select",
                                addPattern: "ctx/sys/assist/autosetting/deletionPattern/add",
                                deletePattern: "ctx/sys/assist/autosetting/deletionPattern/delete",
                            };
                            function initDisplay() {
                                return ajax('com', paths.initDisplay);
                            }
                            service.initDisplay = initDisplay;
                            function selectPattern(param) {
                                return ajax('com', paths.selectPattern, param);
                            }
                            service.selectPattern = selectPattern;
                            function addPattern(param) {
                                return ajax('com', paths.addPattern, param);
                            }
                            service.addPattern = addPattern;
                            function deletePattern(param) {
                                return ajax('com', paths.deletePattern, param);
                            }
                            service.deletePattern = deletePattern;
                        })(service = c.service || (c.service = {}));
                    })(c = cmf005.c || (cmf005.c = {}));
                })(cmf005 = view.cmf005 || (view.cmf005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf005.c.service.js.map