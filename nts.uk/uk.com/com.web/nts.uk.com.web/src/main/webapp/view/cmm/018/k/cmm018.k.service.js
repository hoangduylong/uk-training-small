var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm018;
                (function (cmm018) {
                    var k;
                    (function (k) {
                        var service;
                        (function (service) {
                            // Service paths.
                            var servicePath = {
                                searchModeEmployee: "screen/approvermanagement/workroot/getEmployeesInfo",
                                personInfor: "workflow/approvermanagement/workroot/getInforPerson",
                                jobGroup: "bs/employee/jobtitle/group/approver/getAll",
                                jobGroupName: "bs/employee/jobtitle/group/approver/findByCd",
                            };
                            /**
                             * search data mode employee
                             */
                            function searchModeEmployee(input) {
                                return nts.uk.request.ajax('com', servicePath.searchModeEmployee, input);
                            }
                            service.searchModeEmployee = searchModeEmployee;
                            function getPersonInfor(SID) {
                                return nts.uk.request.ajax('com', servicePath.personInfor, SID);
                            }
                            service.getPersonInfor = getPersonInfor;
                            function jobGroup() {
                                return nts.uk.request.ajax('com', servicePath.jobGroup);
                            }
                            service.jobGroup = jobGroup;
                            function jobGroupName() {
                                return nts.uk.request.ajax('com', servicePath.jobGroupName);
                            }
                            service.jobGroupName = jobGroupName;
                            var model;
                            (function (model) {
                                var EmployeeSearchInDto = /** @class */ (function () {
                                    function EmployeeSearchInDto() {
                                    }
                                    return EmployeeSearchInDto;
                                }());
                                model.EmployeeSearchInDto = EmployeeSearchInDto;
                                var EmployeeSearchDto = /** @class */ (function () {
                                    function EmployeeSearchDto() {
                                    }
                                    return EmployeeSearchDto;
                                }());
                                model.EmployeeSearchDto = EmployeeSearchDto;
                                var PersonInfor = /** @class */ (function () {
                                    function PersonInfor() {
                                    }
                                    return PersonInfor;
                                }());
                                model.PersonInfor = PersonInfor;
                                var JobtitleInfor = /** @class */ (function () {
                                    function JobtitleInfor() {
                                    }
                                    return JobtitleInfor;
                                }());
                                model.JobtitleInfor = JobtitleInfor;
                            })(model = service.model || (service.model = {}));
                        })(service = k.service || (k.service = {}));
                    })(k = cmm018.k || (cmm018.k = {}));
                })(cmm018 = view.cmm018 || (view.cmm018 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm018.k.service.js.map