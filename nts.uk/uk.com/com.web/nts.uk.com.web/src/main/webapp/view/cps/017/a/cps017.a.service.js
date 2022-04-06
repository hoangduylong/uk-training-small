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
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var exportFile = nts.uk.request.exportFile;
                            var paths = {
                                getAllSelectionItems: "ctx/pereg/person/info/setting/selection/findAll/true",
                                getPerInfoSelectionItem: "ctx/pereg/person/info/setting/selection/findItem/{0}",
                                getAllPerInfoHistorySelection: "ctx/pereg/person/info/setting/selection/findAllHistSelection/{0}",
                                getAllOrderItemSelection: "ctx/pereg/person/info/setting/selection/findAllSelection/{0}",
                                saveDataSelection: "ctx/pereg/person/info/setting/selection/addSelection",
                                updateDataSelection: "ctx/pereg/person/info/setting/selection/updateSelection",
                                removeDataSelection: "ctx/pereg/person/info/setting/selection/removeSelection",
                                removeHistory: "ctx/pereg/person/info/setting/selection/removeHistory",
                                reflUnrComp: "ctx/pereg/person/info/setting/selection/reflunrcomp"
                            };
                            function saveAsExcel(languageId, date) {
                                var program = nts.uk.ui._viewModel.kiban.programName().split(" ");
                                var domainType = "CPS017";
                                if (program.length > 1) {
                                    program.shift();
                                }
                                domainType = program.length > 1 ? domainType + program.join(" ") : domainType + __viewContext.program.programName;
                                var _params = { domainId: "PersonSelectionItem",
                                    domainType: domainType,
                                    languageId: languageId,
                                    reportType: 0, mode: 1, baseDate: date };
                                return exportFile('/masterlist/report/print', _params);
                            }
                            service.saveAsExcel = saveAsExcel;
                            function getAllSelectionItems() {
                                return ajax(paths.getAllSelectionItems);
                            }
                            service.getAllSelectionItems = getAllSelectionItems;
                            function getPerInfoSelectionItem(selectionItemId) {
                                var _path = format(paths.getPerInfoSelectionItem, selectionItemId);
                                return nts.uk.request.ajax("com", _path);
                            }
                            service.getPerInfoSelectionItem = getPerInfoSelectionItem;
                            function getAllPerInfoHistorySelection(selectedId) {
                                var _path = format(paths.getAllPerInfoHistorySelection, selectedId);
                                return nts.uk.request.ajax("com", _path);
                            }
                            service.getAllPerInfoHistorySelection = getAllPerInfoHistorySelection;
                            function getAllOrderItemSelection(histId) {
                                var _path = format(paths.getAllOrderItemSelection, histId);
                                return nts.uk.request.ajax("com", _path);
                            }
                            service.getAllOrderItemSelection = getAllOrderItemSelection;
                            //save data Selection:
                            function saveDataSelection(command) {
                                return ajax(paths.saveDataSelection, command);
                            }
                            service.saveDataSelection = saveDataSelection;
                            // update data Selection:
                            function updateDataSelection(command) {
                                return ajax(paths.updateDataSelection, command);
                            }
                            service.updateDataSelection = updateDataSelection;
                            // remove data selection:
                            function removeDataSelection(command) {
                                return ajax(paths.removeDataSelection, command);
                            }
                            service.removeDataSelection = removeDataSelection;
                            // remoe history:
                            function removeHistory(command) {
                                return ajax(paths.removeHistory, command);
                            }
                            service.removeHistory = removeHistory;
                            // Phan anh den cty:
                            function reflUnrComp(command) {
                                return ajax(paths.reflUnrComp, command);
                            }
                            service.reflUnrComp = reflUnrComp;
                        })(service = a.service || (a.service = {}));
                    })(a = cps017.a || (cps017.a = {}));
                })(cps017 = view.cps017 || (view.cps017 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps017.a.service.js.map