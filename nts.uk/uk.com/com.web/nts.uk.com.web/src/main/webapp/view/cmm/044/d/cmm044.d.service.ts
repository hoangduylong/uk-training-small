module cmm044.d.service {
    const paths: any = {
        findAgentByDate: "workflow/agent/findByDate",
        findEmployees: "basic/organization/employee/search"
    };

    export function findAgentByDate(startDate: string, endDate: string): JQueryPromise<Array<viewmodel.model.AgentDto>> {
        var option = {
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        }
        return nts.uk.request.ajax("com", paths.findAgentByDate, option);
    }

    export function findEmployees(option: any): JQueryPromise<Array<EmployeeResult>> {
        return nts.uk.request.ajax("com", paths.findEmployees, option);
    }

    export interface EmployeeResult {
        employeeId: string,
        employeeCode: string,
        employeeName: string,
        workplaceCode: string,
        workplaceName: string,
        jobTitleName: string
    }
}