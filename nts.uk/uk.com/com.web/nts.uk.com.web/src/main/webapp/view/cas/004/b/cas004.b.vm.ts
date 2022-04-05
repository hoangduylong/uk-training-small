module nts.uk.com.view.cas004.b {
    import getText = nts.uk.resource.getText;
    import getShared = nts.uk.ui.windows.getShared;
    import setShared = nts.uk.ui.windows.setShared;
    import errors = nts.uk.ui.errors;
    import block = nts.uk.ui.block;

    export module viewmodel {
        export class ScreenModel {
            companyList: KnockoutObservableArray<model.Company>;
            selectedCode: KnockoutObservable<string>;

            employeeList: KnockoutObservableArray<model.Employee>;
            columns: KnockoutObservableArray<any>;
            currentCode: KnockoutObservable<any>;
            currentCodeList: KnockoutObservableArray<any>;

            constructor() {
                let self = this;

                self.companyList = ko.observableArray([]);

                self.selectedCode = ko.observable('');

                self.employeeList = ko.observableArray([]);

                self.columns = ko.observableArray([
                    { headerText: nts.uk.resource.getText('CAS004_24'), prop: 'employeeCode', width: 100 },
                    { headerText: nts.uk.resource.getText('CAS004_14'), prop: 'employeeName', width: 50 }
                ]);
                self.currentCode = ko.observable();
                self.currentCodeList = ko.observableArray([]);
                self.selectedCode.subscribe(function(codeChange) {
                    service.findEmployeesByCId(codeChange).done(function(listEmployeeByCId: Array<model.Employee>) {
                        if (listEmployeeByCId === undefined || listEmployeeByCId.length == 0) {
                            self.employeeList([]);
                        } else {
                            var listEmployeeByCId = _.orderBy(listEmployeeByCId, [function(item) { return item.employeeCode }], ['asc']);
                            self.employeeList(listEmployeeByCId);
                        }
                    });
                });
            }
            /**
             * functiton start page
             */
            startPage(): JQueryPromise<any> {
                let self = this;
                let dfd = $.Deferred();

                service.getCompanyList().done(function(listAllCompany: Array<model.Company>) {
                    if (listAllCompany === undefined || listAllCompany.length == 0) {
                        self.companyList();
                    } else {
                        self.companyList(listAllCompany);
                        self.selectedCode(_.first(listAllCompany).companyId);
                    }
                    dfd.resolve();
                });
                $('#combo-box').focus();
                block.clear();
                return dfd.promise();
            }//end start page


            /**
            * functiton closeDialog
            */
            closeDialog() {
                nts.uk.ui.windows.close();
            }// end closeDialog

            /**
            * functiton decision
            */
            decision() {
                let self = this;
                if (self.currentCode() != null) {
                    let employee = _.find(self.employeeList(), function(o) { return o.employeeCode == self.currentCode() })
                    setShared('EMPLOYEE', employee);
                    nts.uk.ui.windows.close();
                }
            }// end decision

        }//end screenModel
    }//end viewmodel

    //module model
    export module model {
        export class Company {
            companyCode: string;
            companyName: string;
            companyId: string;

            constructor(companyCode: string, companyName: string, companyId: string) {
                this.companyCode = companyCode;
                this.companyName = companyName;
                this.companyId = companyId;
            }
        }

        export class Employee {
            companyId: string;
            employeeCode: string;
            employeeId: string;
            employeeName: string;
            personId: string;

            constructor(companyId: string, employeeCode: string, employeeId: string, employeeName: string, personId: string) {
                this.companyId = companyId;
                this.employeeCode = employeeCode;
                this.employeeId = employeeId;
                this.employeeName = employeeName;
                this.personId = personId;
            }
        }
    }//end module model
}//end module