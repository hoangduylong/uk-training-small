var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm014;
                (function (cmm014) {
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            /**
                             *  Service paths
                             */
                            var servicePath = {
                                findClassification: "bs/employee/classification/find",
                                saveClassification: "bs/employee/classification/save",
                                removeClassification: "bs/employee/classification/remove"
                            };
                            /**
                             * Get list classification
                             */
                            function findClassification(classificationCode) {
                                return nts.uk.request.ajax(servicePath.findClassification + "/" + classificationCode);
                            }
                            service.findClassification = findClassification;
                            /**
                             * save Classification
                             */
                            function saveClassification(classification) {
                                return nts.uk.request.ajax(servicePath.saveClassification, classification);
                            }
                            service.saveClassification = saveClassification;
                            //saveAsExcel
                            function saveAsExcel(languageId) {
                                var program = nts.uk.ui._viewModel.kiban.programName().split(" ");
                                var domainType = "CMM014";
                                if (program.length > 1) {
                                    program.shift();
                                    domainType = domainType + program.join(" ");
                                }
                                return nts.uk.request.exportFile('/masterlist/report/print', {
                                    domainId: "Classification", domainType: domainType, languageId: languageId, reportType: 0
                                });
                            }
                            service.saveAsExcel = saveAsExcel;
                            /**
                            * remove Classification
                            */
                            function removeClassification(params) {
                                return nts.uk.request.ajax(servicePath.removeClassification, params);
                            }
                            service.removeClassification = removeClassification;
                            var model;
                            (function (model) {
                                var ClassificationFindDto = /** @class */ (function () {
                                    function ClassificationFindDto(code, name, memo) {
                                        this.code = code;
                                        this.name = name;
                                        this.memo = memo;
                                    }
                                    return ClassificationFindDto;
                                }());
                                model.ClassificationFindDto = ClassificationFindDto;
                            })(model = service.model || (service.model = {}));
                        })(service = a.service || (a.service = {}));
                    })(a = cmm014.a || (cmm014.a = {}));
                })(cmm014 = view.cmm014 || (view.cmm014 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm014.a.service.js.map