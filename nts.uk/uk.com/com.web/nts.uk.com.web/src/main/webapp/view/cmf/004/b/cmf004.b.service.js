var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf004;
                (function (cmf004) {
                    var b;
                    (function (b) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                findPerformDataRecover: "ctx/sys/assist/datarestoration/findPerformDataRecover",
                                findTableList: "ctx/sys/assist/datarestoration/findTableList/{0}",
                                findDataRecoverySelection: "ctx/sys/assist/datarestoration/findDataRecoverySelection",
                                obtainRecovery: "ctx/sys/assist/datarestoration/obtainRecovery",
                                setScreenItem: "ctx/sys/assist/datarestoration/setScreenItem/{0}",
                                addMalSet: "ctx/sys/assist/app/addMalSet"
                            };
                            /**
                             * get SSPMT_PERFORM_DAT_RECOVER
                            */
                            function findPerformDataRecover(param) {
                                return ajax('com', paths.findPerformDataRecover, param);
                            }
                            service.findPerformDataRecover = findPerformDataRecover;
                            /**
                             * get SSPMT_TABLE_LIST
                            */
                            function findTableList(dataRecoveryProcessId) {
                                var _path = format(paths.findTableList, dataRecoveryProcessId);
                                return ajax('com', _path);
                            }
                            service.findTableList = findTableList;
                            /**
                             * get for screen B
                            */
                            function findDataRecoverySelection(paramSearch) {
                                return ajax('com', paths.findDataRecoverySelection, paramSearch);
                            }
                            service.findDataRecoverySelection = findDataRecoverySelection;
                            /**
                             * get for screen E
                             */
                            function setScreenItem(dataStorageProcessId) {
                                var _path = format(paths.setScreenItem, dataStorageProcessId);
                                return ajax('com', _path);
                            }
                            service.setScreenItem = setScreenItem;
                            /**
                             * send for screen E
                            */
                            function obtainRecovery(paramObtainRecovery) {
                                return nts.uk.request.ajax('com', paths.obtainRecovery, paramObtainRecovery);
                            }
                            service.obtainRecovery = obtainRecovery;
                            ;
                            /**
                             * send for screen H
                             */
                            function addMalSet(param) {
                                return nts.uk.request.ajax('com', paths.addMalSet, param);
                            }
                            service.addMalSet = addMalSet;
                        })(service = b.service || (b.service = {}));
                    })(b = cmf004.b || (cmf004.b = {}));
                })(cmf004 = view.cmf004 || (view.cmf004 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf004.b.service.js.map