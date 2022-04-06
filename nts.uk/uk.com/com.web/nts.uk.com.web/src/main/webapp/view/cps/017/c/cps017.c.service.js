var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps017;
                (function (cps017) {
                    var c;
                    (function (c) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                getAllPerInfoHistorySelection: "ctx/pereg/person/info/setting/selection/findAllHistSelection/{0}",
                                addHistoryData: "ctx/pereg/person/info/setting/selection/addHistoryData"
                            };
                            //history datetime:
                            function getAllPerInfoHistorySelection(selectionItemId) {
                                var _path = format(paths.getAllPerInfoHistorySelection, selectionItemId);
                                return nts.uk.request.ajax("com", _path);
                            }
                            service.getAllPerInfoHistorySelection = getAllPerInfoHistorySelection;
                            // add history data:
                            function addHistoryData(command) {
                                return ajax(paths.addHistoryData, command);
                            }
                            service.addHistoryData = addHistoryData;
                        })(service = c.service || (c.service = {}));
                    })(c = cps017.c || (cps017.c = {}));
                })(cps017 = view.cps017 || (view.cps017 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps017.c.service.js.map