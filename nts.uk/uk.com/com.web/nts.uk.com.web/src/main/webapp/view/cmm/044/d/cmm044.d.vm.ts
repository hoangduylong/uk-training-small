module cmm044.d.viewmodel {
    export class ScreenModel {
        date: KnockoutObservable<string>;
        yearMonth: KnockoutObservable<number>;
        dateValue: KnockoutObservable<any>;
        histItems: KnockoutObservableArray<model.AgentDto>;
        personList: KnockoutObservableArray<AgentData>;
        dataPerson: any;
        tabs: KnockoutObservableArray<any>;

        constructor() {
            const self = this;
            self.date = ko.observable('20000101');
            self.yearMonth = ko.observable(200001);

            self.dateValue = ko.observable({ startDate: '', endDate: '' });
            self.histItems = ko.observableArray([]);

            self.personList = ko.observableArray([]);
            self.dataPerson = ko.observableArray([]);
            self.tabs = ko.observableArray(nts.uk.ui.windows.getShared("CMM044_TABS"));
            $("#fixed-table").ntsFixedTable({height: 356, width: 1050});
        }

        start() : JQueryPromise<any>  {
            var self = this,
                dfd = $.Deferred();
             
            self.personList.removeAll();
            dfd.resolve();

            return dfd.promise();
        }

        closeDialog(): void {
            nts.uk.ui.windows.close();
        }

        printData(): void {
            const self = this;
            if (self.personList().length == 0) {
                nts.uk.ui.dialog.alertError({messageId: "Msg_7"});
                return;
            }
            nts.uk.ui.block.invisible();
            nts.uk.request.exportFile("/workflow/agent/report/generate", ko.toJS(self.personList)).done(function() {
                // Process results after generating report.
            }).fail(error => {
                nts.uk.ui.dialog.alertError(error);
            }).always(() => {
                nts.uk.ui.block.clear();
            });
        }

        findEmployee(employeeIds: Array<string>): JQueryPromise<any> {
            const self = this,
                dfd = $.Deferred();
            const option = {
                baseDate: moment().toDate(),
                employeeIds: employeeIds
            };
            service.findEmployees(option).done(function(res: Array<service.EmployeeResult>) {
                self.dataPerson(res);
                dfd.resolve();
            }).fail(function(error) {
                dfd.reject(error);
            });
            return dfd.promise();
        }

        findAgentByDate(): JQueryPromise<any> {
            const self = this,
                employeeIds: Array<any> = [];
            const dfd = $.Deferred();
            self.personList.removeAll();
            nts.uk.ui.block.invisible();
            service.findAgentByDate(self.dateValue().startDate, self.dateValue().endDate).done(function(agent_arr: Array<model.AgentDto>) {
                if (agent_arr.length == 0) {
                    nts.uk.ui.dialog.alertError({messageId: "Msg_7"}).then(() => {
                        self.dateValue({ startDate: '', endDate: '' });
                    });
                    return;
                }
                _.each(agent_arr, x => {
                    employeeIds.push(x.employeeId);
                    if (!nts.uk.util.isNullOrEmpty(x.agentSid1)) {
                        employeeIds.push(x.agentSid1);
                    }
                    if (!nts.uk.util.isNullOrEmpty(x.agentSid2)) {
                        employeeIds.push(x.agentSid2);
                    }
                    if (!nts.uk.util.isNullOrEmpty(x.agentSid3)) {
                        employeeIds.push(x.agentSid3);
                    }
                    if (!nts.uk.util.isNullOrEmpty(x.agentSid4)) {
                        employeeIds.push(x.agentSid4);
                    }
                });

                const employeUniqIds = _.uniq(employeeIds);
                nts.uk.ui.block.invisible();
                self.findEmployee(employeUniqIds).done(function() {
                    _.forEach(agent_arr, function(agent: model.AgentDto) {
                        const employee = _.find(self.dataPerson(), function(e: service.EmployeeResult) {
                            return e.employeeId == agent.employeeId;
                        });
                        if (employee) {
                            self.personList.push(
                                new AgentData(
                                    employee.employeeCode,
                                    employee.employeeName,
                                    employee.workplaceCode,
                                    employee.workplaceName,
                                    employee.jobTitleName,
                                    agent.startDate,
                                    agent.endDate,
                                    self.tabs()[0].title,
                                    self.getAgentCode(agent.agentAppType1, agent.agentSid1),
                                    self.getAgentName(agent.agentAppType1, agent.agentSid1),
                                    self.getAgentWorkplaceCode(agent.agentAppType1, agent.agentSid1),
                                    self.getAgentWorkplaceName(agent.agentAppType1, agent.agentSid1),
                                    self.getAgentJobTitleName(agent.agentAppType1, agent.agentSid1),
                                    self.getColSpanAgentAppType(agent.agentAppType1)
                                )
                            );
                            // self.personList.push(new AgentData("", "", "", "", "", "", "", self.tabs()[1].title, self.getAgentCode(agent.agentAppType2, agent.agentSid2), self.getAgentName(agent.agentAppType2, agent.agentSid2), self.getColSpanAgentAppType(agent.agentAppType2)));
                            // self.personList.push(new AgentData("", "", "", "", "", "", "", self.tabs()[2].title, self.getAgentCode(agent.agentAppType3, agent.agentSid3), self.getAgentName(agent.agentAppType3, agent.agentSid3), self.getColSpanAgentAppType(agent.agentAppType3)));
                            // self.personList.push(new AgentData("", "", "", "", "", "", "", self.tabs()[3].title, self.getAgentCode(agent.agentAppType4, agent.agentSid4), self.getAgentName(agent.agentAppType4, agent.agentSid4), self.getColSpanAgentAppType(agent.agentAppType4)));
                        }
                    });
                    self.personList(_.sortBy(self.personList(), [(o: AgentData) => o.employeeCode(), (o: AgentData) => new Date(o.startDate())]));
                    let targetCode = "";
                    self.personList().forEach((data: AgentData) => {
                        if (targetCode != data.employeeCode()) {
                            targetCode = data.employeeCode();
                        } else {
                            data.employeeCode("");
                            data.employeeName("");
                            data.workPlaceCode("");
                            data.workPlaceName("");
                            data.position("");
                        }
                    });
                }).fail(function(error) {
                    nts.uk.ui.dialog.alertError(error);
                    dfd.reject(error);
                }).always(() => {
                    nts.uk.ui.block.clear();
                });
                dfd.resolve();
            }).fail(function(error) {
                nts.uk.ui.dialog.alertError(error);
                dfd.reject(error);
            }).always(() => {
                nts.uk.ui.block.clear();
            });
            return dfd.promise();
        }

        getAgentCode(agentAppType: number, agentSID: string): string {
            const self = this;
            let result = "";
            switch (agentAppType) {
                case model.AgentAppType.SUBSTITUTE_DESIGNATION:
                    const employee = _.find(self.dataPerson(), function(e: service.EmployeeResult) {
                        return e.employeeId == agentSID;
                    });
                    result = employee.employeeCode; //convert to employeeCode
                    break;
                case model.AgentAppType.PATH:
                    result = nts.uk.resource.getText("CMM044_17");
                    break;
                case model.AgentAppType.NO_SETTINGS:
                    result = nts.uk.resource.getText("CMM044_18");
                    break;
            }

            return result;
        }

        getAgentName(agentAppType: number, agentSID: string): string {
            const self = this;
            let result = "";
            switch (agentAppType) {
                case model.AgentAppType.SUBSTITUTE_DESIGNATION:
                    const employee = _.find(self.dataPerson(), function(e: service.EmployeeResult) {
                        return e.employeeId == agentSID;
                    });
                    result = employee.employeeName;
                    break;
                case model.AgentAppType.PATH:
                    result = "";
                    break;
                case model.AgentAppType.NO_SETTINGS:
                    result = "";
                    break;
            }

            return result;
        }

        getAgentWorkplaceCode(agentAppType: number, agentSID: string): string {
            const self = this;
            let result = "";
            switch (agentAppType) {
                case model.AgentAppType.SUBSTITUTE_DESIGNATION:
                    const employee = _.find(self.dataPerson(), function(e: service.EmployeeResult) {
                        return e.employeeId == agentSID;
                    });
                    result = employee.workplaceCode;
                    break;
                case model.AgentAppType.PATH:
                    result = "";
                    break;
                case model.AgentAppType.NO_SETTINGS:
                    result = "";
                    break;
            }

            return result;
        }

        getAgentWorkplaceName(agentAppType: number, agentSID: string): string {
            const self = this;
            let result = "";
            switch (agentAppType) {
                case model.AgentAppType.SUBSTITUTE_DESIGNATION:
                    const employee = _.find(self.dataPerson(), function(e: service.EmployeeResult) {
                        return e.employeeId == agentSID;
                    });
                    result = employee.workplaceName;
                    break;
                case model.AgentAppType.PATH:
                    result = "";
                    break;
                case model.AgentAppType.NO_SETTINGS:
                    result = "";
                    break;
            }

            return result;
        }

        getAgentJobTitleName(agentAppType: number, agentSID: string): string {
            const self = this;
            let result = "";
            switch (agentAppType) {
                case model.AgentAppType.SUBSTITUTE_DESIGNATION:
                    const employee = _.find(self.dataPerson(), function(e: service.EmployeeResult) {
                        return e.employeeId == agentSID;
                    });
                    result = employee.jobTitleName;
                    break;
                case model.AgentAppType.PATH:
                    result = "";
                    break;
                case model.AgentAppType.NO_SETTINGS:
                    result = "";
                    break;
            }

            return result;
        }

        getColSpanAgentAppType(agentAppType: number): boolean {
            let result = false;
            switch (agentAppType) {
                case model.AgentAppType.SUBSTITUTE_DESIGNATION:
                    result = false;
                    break;
                case model.AgentAppType.PATH:
                    result = false;
                    break;
                case model.AgentAppType.NO_SETTINGS:
                    result = true;
                    break;
            }

            return result;
        }
    }

    export module model {
        export class AgentDto {
            companyId: string;
            employeeId: string;
            requestId: string;
            startDate: string;
            endDate: string;
            agentAppType1: number;
            agentAppType2: number;
            agentAppType3: number;
            agentAppType4: number;
            agentSid1: string;
            agentSid2: string;
            agentSid3: string;
            agentSid4: string;

            constructor(companyId: string, employeeId: string, requestId: string, startDate: string, endDate: string) {
                this.companyId = companyId;
                this.employeeId = employeeId;
                this.requestId = requestId;
                this.startDate = startDate;
                this.endDate = endDate;
            }
        }

        export enum AgentAppType {
            SUBSTITUTE_DESIGNATION = 0,
            PATH = 1,
            NO_SETTINGS = 2
        }
    }

    export class AgentData {
        employeeCode: KnockoutObservable<string>;
        employeeName: KnockoutObservable<string>;
        workPlaceCode: KnockoutObservable<string>;
        workPlaceName: KnockoutObservable<string>;
        position: KnockoutObservable<string>;
        startDate: KnockoutObservable<string>;
        endDate: KnockoutObservable<string>;
        agentTarget: KnockoutObservable<string>;
        agentCode: KnockoutObservable<string>;
        agentName: KnockoutObservable<string>;
        agentWorkPlaceCode: KnockoutObservable<string>;
        agentWorkPlaceName: KnockoutObservable<string>;
        agentPosition: KnockoutObservable<string>;
        hasColSpan: KnockoutObservable<boolean>;
        constructor(employeeCode: string,
                    employeeName: string,
                    workPlaceCode: string,
                    workPlaceName: string,
                    position: string,
                    startDate: string,
                    endDate: string,
                    agentTarget: string,
                    agentCode: string,
                    agentName: string,
                    agentWorkPlaceCode: string,
                    agentWorkPlaceName: string,
                    agentPosition: string,
                    hasColSpan: boolean) {
            this.employeeCode = ko.observable(employeeCode);
            this.employeeName = ko.observable(employeeName);
            this.workPlaceCode = ko.observable(workPlaceCode);
            this.workPlaceName = ko.observable(workPlaceName);
            this.position = ko.observable(position);
            this.startDate = ko.observable(startDate);
            this.endDate = ko.observable(endDate);
            this.agentTarget = ko.observable(agentTarget);
            this.agentCode = ko.observable(agentCode);
            this.agentName = ko.observable(agentName);
            this.agentWorkPlaceCode = ko.observable(agentWorkPlaceCode);
            this.agentWorkPlaceName = ko.observable(agentWorkPlaceName);
            this.agentPosition = ko.observable(agentPosition);
            this.hasColSpan = ko.observable(hasColSpan);
        }
    }

}