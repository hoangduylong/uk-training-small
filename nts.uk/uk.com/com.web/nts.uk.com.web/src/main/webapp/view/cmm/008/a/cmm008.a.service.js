var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm008;
                (function (cmm008) {
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            /**
                             *  Service paths
                             */
                            var paths = {
                                findGroupCommonMaster: 'bs/employee/employment/findGroupCommonMaster',
                                findEmployment: 'bs/employee/employment/findByCode',
                                saveEmployment: 'bs/employee/employment/save',
                                removeEmployment: 'bs/employee/employment/remove',
                            };
                            /**
                             * Find Employment
                             */
                            function findEmployment(employmentCode) {
                                return nts.uk.request.ajax(paths.findEmployment + "/" + employmentCode);
                            }
                            service.findEmployment = findEmployment;
                            function findGroupCommonMaster() {
                                return nts.uk.request.ajax(paths.findGroupCommonMaster);
                            }
                            service.findGroupCommonMaster = findGroupCommonMaster;
                            /**
                             * Save Employment
                             */
                            function saveEmployment(command) {
                                return nts.uk.request.ajax(paths.saveEmployment, command);
                            }
                            service.saveEmployment = saveEmployment;
                            /**
                             * Remove Employment
                             */
                            function removeEmployment(command) {
                                return nts.uk.request.ajax(paths.removeEmployment, command);
                            }
                            service.removeEmployment = removeEmployment;
                            //saveAsExcel
                            function saveAsExcel(languageId) {
                                var program = nts.uk.ui._viewModel.kiban.programName().split(" ");
                                var domainType = "CMM008";
                                if (program.length > 1) {
                                    program.shift();
                                    domainType = domainType + program.join(" ");
                                }
                                return nts.uk.request.exportFile('/masterlist/report/print', {
                                    domainId: "Employment",
                                    domainType: domainType, languageId: languageId, reportType: 0
                                });
                            }
                            service.saveAsExcel = saveAsExcel;
                            /**
                            * Model namespace.
                            */
                            var model;
                            (function (model) {
                                /**
                                 * class EmploymentDto
                                 */
                                var EmploymentDto = /** @class */ (function () {
                                    function EmploymentDto() {
                                    }
                                    return EmploymentDto;
                                }());
                                model.EmploymentDto = EmploymentDto;
                            })(model = service.model || (service.model = {}));
                        })(service = a.service || (a.service = {}));
                    })(a = cmm008.a || (cmm008.a = {}));
                })(cmm008 = view.cmm008 || (view.cmm008 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm008.a.service.js.map