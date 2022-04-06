var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps009;
                (function (cps009) {
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                getAll: "ctx/pereg/person/info/setting/init/findAll",
                                getAllCtg: "ctx/pereg/person/info/setting/init/ctg/find/{0}",
                                getAllItemByCtgId: "ctx/pereg/person/info/setting/init/item/find/{0}/{1}/{2}",
                                deleteInitVal: "ctx/pereg/person/info/setting/init/delete",
                                update: "ctx/pereg/person/info/setting/init/ctg/update",
                                filterHisSel: "ctx/pereg/person/info/setting/selection/findAllCombox",
                                checkItemWorkType: "ctx/pereg/person/common/checkStartEnd",
                                checkItemWorkTime: "ctx/pereg/person/common/checkAllMutilTime",
                                checkFunctionNo: "ctx/pereg/functions/auth/find-with-role-person-info"
                            };
                            /**
                             * Get all init value setting
                             */
                            function getAll() {
                                return ajax(paths.getAll);
                            }
                            service.getAll = getAll;
                            /**
                             * Get all init value setting
                             */
                            function getAllCtg(settingId) {
                                return ajax(format(paths.getAllCtg, settingId));
                            }
                            service.getAllCtg = getAllCtg;
                            /**
                           * Get all init value setting
                           */
                            function getAllItemByCtgId(settingId, perInfoCtgId, baseDate) {
                                return ajax(format(paths.getAllItemByCtgId, settingId, perInfoCtgId, baseDate));
                            }
                            service.getAllItemByCtgId = getAllItemByCtgId;
                            /**
                             * delete init value setting
                             */
                            function deleteInitVal(obj) {
                                return ajax(paths.deleteInitVal, obj);
                            }
                            service.deleteInitVal = deleteInitVal;
                            /**
                             *update init value setting
                             */
                            function update(obj) {
                                return ajax(paths.update, obj);
                            }
                            service.update = update;
                            /**
                            * Get all init value setting
                            */
                            function getAllSelByHistory(selectionItemId, baseDate) {
                                return ajax(format(paths.filterHisSel, selectionItemId, baseDate));
                            }
                            service.getAllSelByHistory = getAllSelByHistory;
                            function getAllComboxByHistory(query) {
                                return ajax(paths.filterHisSel, query);
                            }
                            service.getAllComboxByHistory = getAllComboxByHistory;
                            function checkStartEnd(params) {
                                return ajax(paths.checkItemWorkType, params);
                            }
                            service.checkStartEnd = checkStartEnd;
                            function checkMutiTime(params) {
                                return ajax(paths.checkItemWorkTime, params);
                            }
                            service.checkMutiTime = checkMutiTime;
                            /** 「今まで25.10,対応していません 」 */
                            function checkFunctionNo() {
                                return ajax(paths.checkFunctionNo);
                            }
                            service.checkFunctionNo = checkFunctionNo;
                            function saveAsExcel() {
                                var program = nts.uk.ui._viewModel.kiban.programName().split(" ");
                                var domainType = "CPS009";
                                if (program.length > 1) {
                                    program.shift();
                                    domainType = domainType + program.join(" ");
                                }
                                var _params = { domainId: "PerInfoInit",
                                    domainType: domainType,
                                    languageId: "ja", reportType: 0 };
                                return nts.uk.request.exportFile('/masterlist/report/print', _params);
                            }
                            service.saveAsExcel = saveAsExcel;
                        })(service = a.service || (a.service = {}));
                    })(a = cps009.a || (cps009.a = {}));
                })(cps009 = view.cps009 || (view.cps009 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps009.a.service.js.map