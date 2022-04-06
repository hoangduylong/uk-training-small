var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps016;
                (function (cps016) {
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                getAllSelectionItems: "ctx/pereg/person/info/setting/selection/findAll/false",
                                getPerInfoSelectionItem: "ctx/pereg/person/info/setting/selection/findItem/{0}",
                                saveDataSelectionItem: "ctx/pereg/person/info/setting/selection/addSelectionItem",
                                updateDataSelectionItem: "ctx/pereg/person/info/setting/selection/updateSelectionItem",
                                checkUseSelectionItem: "ctx/pereg/person/info/setting/selection/checkUseSelectionItem",
                                removeDataSelectionItem: "ctx/pereg/person/info/setting/selection/removeSelectionItem",
                                checkExistedSelectionItemId: "ctx/pereg/person/info/ctgItem/checkExistItem/{0}",
                                saveAsExcel: "file/at/seletionitemreport/saveAsExcel"
                            };
                            function getAllSelectionItems() {
                                return ajax(paths.getAllSelectionItems);
                            }
                            service.getAllSelectionItems = getAllSelectionItems;
                            function getPerInfoSelectionItem(selectionItemId) {
                                var _path = format(paths.getPerInfoSelectionItem, selectionItemId);
                                return nts.uk.request.ajax("com", _path);
                            }
                            service.getPerInfoSelectionItem = getPerInfoSelectionItem;
                            function addDataSelectionItem(command) {
                                return ajax(paths.saveDataSelectionItem, command);
                            }
                            service.addDataSelectionItem = addDataSelectionItem;
                            function updateDataSelectionItem(command) {
                                return ajax(paths.updateDataSelectionItem, command);
                            }
                            service.updateDataSelectionItem = updateDataSelectionItem;
                            function checkUseSelectionItem(selectionItemId) {
                                return ajax(paths.checkUseSelectionItem + '/' + selectionItemId);
                            }
                            service.checkUseSelectionItem = checkUseSelectionItem;
                            function removeDataSelectionItem(command) {
                                return ajax(paths.removeDataSelectionItem, command);
                            }
                            service.removeDataSelectionItem = removeDataSelectionItem;
                            function checkExistedSelectionItemId(selectionItemId) {
                                var _path = format(paths.checkExistedSelectionItemId, selectionItemId);
                                return nts.uk.request.ajax("com", _path);
                            }
                            service.checkExistedSelectionItemId = checkExistedSelectionItemId;
                            function saveAsExcel(languageId) {
                                var program = nts.uk.ui._viewModel.kiban.programName().split(" ");
                                var domainType = "CPS016";
                                if (program.length > 1) {
                                    program.shift();
                                    domainType = domainType + program.join(" ");
                                }
                                var _params = { domainId: "SelectionItem",
                                    domainType: domainType,
                                    languageId: languageId,
                                    reportType: 0 };
                                return nts.uk.request.exportFile('/masterlist/report/print', _params);
                            }
                            service.saveAsExcel = saveAsExcel;
                        })(service = a.service || (a.service = {}));
                    })(a = cps016.a || (cps016.a = {}));
                })(cps016 = view.cps016 || (view.cps016 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps016.a.service.js.map