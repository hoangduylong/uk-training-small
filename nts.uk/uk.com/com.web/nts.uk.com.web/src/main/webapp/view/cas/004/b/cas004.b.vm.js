var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cas004;
                (function (cas004) {
                    var b;
                    (function (b) {
                        var setShared = nts.uk.ui.windows.setShared;
                        var block = nts.uk.ui.block;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.companyList = ko.observableArray([]);
                                    self.selectedCode = ko.observable('');
                                    self.employeeList = ko.observableArray([]);
                                    self.columns = ko.observableArray([
                                        { headerText: nts.uk.resource.getText('CAS004_24'), prop: 'employeeCode', width: 100 },
                                        { headerText: nts.uk.resource.getText('CAS004_14'), prop: 'employeeName', width: 50 }
                                    ]);
                                    self.currentCode = ko.observable();
                                    self.currentCodeList = ko.observableArray([]);
                                    self.selectedCode.subscribe(function (codeChange) {
                                        b.service.findEmployeesByCId(codeChange).done(function (listEmployeeByCId) {
                                            if (listEmployeeByCId === undefined || listEmployeeByCId.length == 0) {
                                                self.employeeList([]);
                                            }
                                            else {
                                                var listEmployeeByCId = _.orderBy(listEmployeeByCId, [function (item) { return item.employeeCode; }], ['asc']);
                                                self.employeeList(listEmployeeByCId);
                                            }
                                        });
                                    });
                                }
                                /**
                                 * functiton start page
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    b.service.getCompanyList().done(function (listAllCompany) {
                                        if (listAllCompany === undefined || listAllCompany.length == 0) {
                                            self.companyList();
                                        }
                                        else {
                                            self.companyList(listAllCompany);
                                            self.selectedCode(_.first(listAllCompany).companyId);
                                        }
                                        dfd.resolve();
                                    });
                                    $('#combo-box').focus();
                                    block.clear();
                                    return dfd.promise();
                                }; //end start page
                                /**
                                * functiton closeDialog
                                */
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                }; // end closeDialog
                                /**
                                * functiton decision
                                */
                                ScreenModel.prototype.decision = function () {
                                    var self = this;
                                    if (self.currentCode() != null) {
                                        var employee = _.find(self.employeeList(), function (o) { return o.employeeCode == self.currentCode(); });
                                        setShared('EMPLOYEE', employee);
                                        nts.uk.ui.windows.close();
                                    }
                                }; // end decision
                                return ScreenModel;
                            }()); //end screenModel
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = b.viewmodel || (b.viewmodel = {})); //end viewmodel
                        //module model
                        var model;
                        (function (model) {
                            var Company = /** @class */ (function () {
                                function Company(companyCode, companyName, companyId) {
                                    this.companyCode = companyCode;
                                    this.companyName = companyName;
                                    this.companyId = companyId;
                                }
                                return Company;
                            }());
                            model.Company = Company;
                            var Employee = /** @class */ (function () {
                                function Employee(companyId, employeeCode, employeeId, employeeName, personId) {
                                    this.companyId = companyId;
                                    this.employeeCode = employeeCode;
                                    this.employeeId = employeeId;
                                    this.employeeName = employeeName;
                                    this.personId = personId;
                                }
                                return Employee;
                            }());
                            model.Employee = Employee;
                        })(model = b.model || (b.model = {})); //end module model
                    })(b = cas004.b || (cas004.b = {}));
                })(cas004 = view.cas004 || (view.cas004 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {})); //end module
//# sourceMappingURL=cas004.b.vm.js.map