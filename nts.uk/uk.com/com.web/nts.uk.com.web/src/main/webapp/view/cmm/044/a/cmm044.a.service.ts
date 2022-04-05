module cmm044.a.service {
    const paths: any = {
        findAgent: "workflow/agent/find",
        findAllAgent: "workflow/agent/find/",
        findEmployeeName: "workflow/agent/findEmpInfo",
        deleteAgent: "workflow/agent/delete",
        addAgent: "workflow/agent/add",
        updateAgent: "workflow/agent/update",
        searchEmployeeByLogin: "basic/organization/employee/onlyemployee",

    };

    export function findAgent(parameter: any): JQueryPromise<viewmodel.IAgentDto> {
        return nts.uk.request.ajax("com", paths.findAgent, parameter);
    }

    export function findAllAgent(employeeId: string): JQueryPromise<Array<viewmodel.IAgentDto>> {
        return nts.uk.request.ajax("com", paths.findAllAgent + employeeId);
    }

    export function deleteAgent(agent: any) {
        return nts.uk.request.ajax("com", paths.deleteAgent, agent)
    }

    export function addAgent(agent: any) {
        return nts.uk.request.ajax("com", paths.addAgent, agent);
    }

    export function updateAgent(agent: any) {
        return nts.uk.request.ajax("com", paths.updateAgent, agent);
    }

    export function searchEmployeeByLogin(baseDate: Date): JQueryPromise<any> {
        return nts.uk.request.ajax('com', paths.searchEmployeeByLogin, baseDate);
    }
    
     export function findEmployeeName(sId: String): JQueryPromise<any> {
        return nts.uk.request.ajax('com', paths.findEmployeeName, sId);
    }

    export function exportExcel(listEmployee: any): JQueryPromise<any> {
        return nts.uk.request.exportFile('/masterlist/report/print', {domainId: "SubscribeRegis", domainType: 'CMM044代行者の登録', languageId: 'ja', reportType: 0,data: listEmployee});
    }
}