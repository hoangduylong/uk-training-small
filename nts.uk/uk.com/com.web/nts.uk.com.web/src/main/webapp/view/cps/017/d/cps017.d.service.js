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
                    var d;
                    (function (d) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                getAllPerInfoHistorySelection: "ctx/pereg/person/info/setting/selection/findAllHistSelection/{0}",
                                editHistoryData: "ctx/pereg/person/info/setting/selection/editHistory"
                            };
                            //history datetime:
                            function getAllPerInfoHistorySelection(selectionItemId) {
                                var _path = format(paths.getAllPerInfoHistorySelection, selectionItemId);
                                return nts.uk.request.ajax("com", _path);
                            }
                            service.getAllPerInfoHistorySelection = getAllPerInfoHistorySelection;
                            // edit history data:
                            function editHistoryData(command) {
                                return ajax(paths.editHistoryData, command);
                            }
                            service.editHistoryData = editHistoryData;
                        })(service = d.service || (d.service = {}));
                    })(d = cps017.d || (cps017.d = {}));
                })(cps017 = view.cps017 || (view.cps017 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps017.d.service.js.map