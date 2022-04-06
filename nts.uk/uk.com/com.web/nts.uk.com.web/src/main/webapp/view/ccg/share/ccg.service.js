var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg;
                (function (ccg_1) {
                    var share;
                    (function (share) {
                        var ccg;
                        (function (ccg) {
                            var service;
                            (function (service) {
                                // Service paths.
                                var servicePath = {
                                    searchEmployeeByLogin: "query/employee/find/currentlogin",
                                    searchWorkplaceOfEmployee: "basic/organization/employee/workplaceemp",
                                    searchAllWorkType: "at/record/businesstype/findAll",
                                    getEmploymentCodeByClosureId: "ctx/at/shared/workrule/closure/findEmpByClosureId",
                                    getRefRangeBySysType: "ctx/sys/auth/role/getrefrangebysystype",
                                    getClosuresByBaseDate: "ctx/at/shared/workrule/closure/getclosuresbybasedate",
                                    getClosureByCurrentEmployee: "ctx/at/shared/workrule/closure/getclosurebycurrentemployee",
                                    calculatePeriod: "ctx/at/shared/workrule/closure/calculateperiod",
                                    getClosureTiedByEmployment: "ctx/at/shared/workrule/closure/getclosuretiedbyemployment",
                                    getCurrentHistoryItem: "bs/employee/employment/history/getcurrenthistoryitem",
                                    getPersonalRoleFuturePermit: "ctx/sys/auth/grant/roleindividual/get/futurerefpermit",
                                    getEmploymentRoleFuturePermit: "at/auth/workplace/employmentrole/get/futurerefpermit",
                                    getListWorkplaceId: "ctx/sys/auth/role/getListWorkplaceId",
                                    findRegulationInfoEmployee: "query/employee/find",
                                    searchByName: "query/employee/find/name",
                                    searchByCode: "query/employee/find/code",
                                    searchByEntryDate: "query/employee/find/entrydate",
                                    searchByRetirementDate: "query/employee/find/retirementdate",
                                    getCanManageWpkForLoginUser: "at/auth/workplace/manager/find/loginnedUser",
                                };
                                /**
                                 * Find regulation info employee
                                 */
                                function findRegulationInfoEmployee(query) {
                                    return nts.uk.request.ajax('com', servicePath.findRegulationInfoEmployee, query);
                                }
                                service.findRegulationInfoEmployee = findRegulationInfoEmployee;
                                function getCanManageWpkForLoginUser() {
                                    return nts.uk.request.ajax('com', servicePath.getCanManageWpkForLoginUser);
                                }
                                service.getCanManageWpkForLoginUser = getCanManageWpkForLoginUser;
                                function searchByCode(query) {
                                    return nts.uk.request.ajax('com', servicePath.searchByCode, query);
                                }
                                service.searchByCode = searchByCode;
                                function searchByName(query) {
                                    return nts.uk.request.ajax('com', servicePath.searchByName, query);
                                }
                                service.searchByName = searchByName;
                                function searchByEntryDate(query) {
                                    return nts.uk.request.ajax('com', servicePath.searchByEntryDate, query);
                                }
                                service.searchByEntryDate = searchByEntryDate;
                                function searchByRetirementDate(query) {
                                    return nts.uk.request.ajax('com', servicePath.searchByRetirementDate, query);
                                }
                                service.searchByRetirementDate = searchByRetirementDate;
                                /**
                                 * Get personal role future permit
                                 */
                                function getPersonalRoleFuturePermit() {
                                    return nts.uk.request.ajax('com', servicePath.getPersonalRoleFuturePermit);
                                }
                                service.getPersonalRoleFuturePermit = getPersonalRoleFuturePermit;
                                /**
                                 * Get personal role future permit
                                 */
                                function getEmploymentRoleFuturePermit() {
                                    return nts.uk.request.ajax('at', servicePath.getEmploymentRoleFuturePermit);
                                }
                                service.getEmploymentRoleFuturePermit = getEmploymentRoleFuturePermit;
                                /**
                                 * Get current history item.
                                 */
                                function getCurrentHistoryItem() {
                                    return nts.uk.request.ajax('com', servicePath.getCurrentHistoryItem);
                                }
                                service.getCurrentHistoryItem = getCurrentHistoryItem;
                                /**
                                 * Get Reference Range By System Type
                                 */
                                function getRefRangeBySysType(sysType) {
                                    return nts.uk.request.ajax('com', servicePath.getRefRangeBySysType + '/' + sysType);
                                }
                                service.getRefRangeBySysType = getRefRangeBySysType;
                                /**
                                 * Get list closure by base date
                                 */
                                function getClosuresByBaseDate(baseDate) {
                                    return nts.uk.request.ajax('at', servicePath.getClosuresByBaseDate + '/' + baseDate);
                                }
                                service.getClosuresByBaseDate = getClosuresByBaseDate;
                                /**
                                 * Get closure id by current login employee
                                 */
                                function getClosureByCurrentEmployee(baseDate) {
                                    return nts.uk.request.ajax('at', servicePath.getClosureByCurrentEmployee + '/' + baseDate);
                                }
                                service.getClosureByCurrentEmployee = getClosureByCurrentEmployee;
                                /**
                                 * Get Employment Code By ClosureId
                                 */
                                function getEmploymentCodeByClosureId(closureId) {
                                    return nts.uk.request.ajax('at', servicePath.getEmploymentCodeByClosureId + '/' + closureId);
                                }
                                service.getEmploymentCodeByClosureId = getEmploymentCodeByClosureId;
                                /**
                                 * Get closure tied by employment
                                 */
                                function getClosureTiedByEmployment(employmentCd) {
                                    return nts.uk.request.ajax('at', servicePath.getClosureTiedByEmployment + '/' + employmentCd);
                                }
                                service.getClosureTiedByEmployment = getClosureTiedByEmployment;
                                /**
                                 * Get employee range selection
                                 */
                                function getEmployeeRangeSelection() {
                                    var key = __viewContext.user.employeeId + '' + __viewContext.user.companyId;
                                    return nts.uk.characteristics.restore(key);
                                }
                                service.getEmployeeRangeSelection = getEmployeeRangeSelection;
                                /**
                                 * Save employee range selection
                                 */
                                function saveEmployeeRangeSelection(data) {
                                    var key = data.userId + '' + data.companyId;
                                    return nts.uk.characteristics.save(key, data);
                                }
                                service.saveEmployeeRangeSelection = saveEmployeeRangeSelection;
                                /**
                                 * Calculate period
                                 */
                                function calculatePeriod(closureId, yearMonth) {
                                    var param = '/' + closureId + '/' + yearMonth;
                                    return nts.uk.request.ajax('at', servicePath.calculatePeriod + param);
                                }
                                service.calculatePeriod = calculatePeriod;
                                /**
                                * Calculate period
                                */
                                function calculatePeriod105458(closureId) {
                                    var param = '/' + closureId;
                                    return nts.uk.request.ajax('at', servicePath.calculatePeriod + param);
                                }
                                service.calculatePeriod105458 = calculatePeriod105458;
                                /**
                                 * call service get employee by login
                                 */
                                function searchEmployeeByLogin(query) {
                                    return nts.uk.request.ajax('com', servicePath.searchEmployeeByLogin, query);
                                }
                                service.searchEmployeeByLogin = searchEmployeeByLogin;
                                /**
                                 * search WorkPlace of Employee
                                 */
                                function searchWorkplaceOfEmployee(baseDate) {
                                    return nts.uk.request.ajax('com', servicePath.searchWorkplaceOfEmployee, baseDate);
                                }
                                service.searchWorkplaceOfEmployee = searchWorkplaceOfEmployee;
                                /**
                                 * search all worktype
                                 */
                                function searchAllWorkType() {
                                    return nts.uk.request.ajax('at', servicePath.searchAllWorkType);
                                }
                                service.searchAllWorkType = searchAllWorkType;
                                /**
                                 * get List WorkPlaceId
                                 */
                                function getListWorkplaceId(baseDate, referenceRange) {
                                    return nts.uk.request.ajax('com', servicePath.getListWorkplaceId, { baseDate: baseDate, referenceRange: referenceRange });
                                }
                                service.getListWorkplaceId = getListWorkplaceId;
                                var model;
                                (function (model) {
                                    var EmployeeSearchDto = /** @class */ (function () {
                                        function EmployeeSearchDto() {
                                        }
                                        return EmployeeSearchDto;
                                    }());
                                    model.EmployeeSearchDto = EmployeeSearchDto;
                                    var SelectedInformation = /** @class */ (function () {
                                        function SelectedInformation() {
                                            var self = this;
                                            self.sortOrder = null;
                                            self.selectedClosureId = null;
                                        }
                                        return SelectedInformation;
                                    }());
                                    model.SelectedInformation = SelectedInformation;
                                    var EmployeeRangeSelection = /** @class */ (function () {
                                        function EmployeeRangeSelection() {
                                            var self = this;
                                            self.userId = __viewContext.user.employeeId;
                                            self.companyId = __viewContext.user.companyId;
                                            self.humanResourceInfo = new SelectedInformation();
                                            self.personalInfo = new SelectedInformation();
                                            self.employmentInfo = new SelectedInformation();
                                            self.salaryInfo = new SelectedInformation();
                                        }
                                        return EmployeeRangeSelection;
                                    }());
                                    model.EmployeeRangeSelection = EmployeeRangeSelection;
                                    var EmployeeDto = /** @class */ (function () {
                                        function EmployeeDto() {
                                        }
                                        return EmployeeDto;
                                    }());
                                    model.EmployeeDto = EmployeeDto;
                                })(model = service.model || (service.model = {}));
                            })(service = ccg.service || (ccg.service = {}));
                        })(ccg = share.ccg || (share.ccg = {}));
                    })(share = ccg_1.share || (ccg_1.share = {}));
                })(ccg = view.ccg || (view.ccg = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg.service.js.map