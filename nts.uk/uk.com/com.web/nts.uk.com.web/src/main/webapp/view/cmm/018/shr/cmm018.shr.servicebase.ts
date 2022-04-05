module nts.uk.com.view.cmm018.shr {
    export module servicebase {
        var paths: any = {
            updateHistory: "workflow/approvermanagement/workroot/updateHistory",
            getAllDataCom: "workflow/approvermanagement/workroot/getbycom",
            getAllDataPr: "workflow/approvermanagement/workroot/getbyprivate",
            getNameAppType: "workflow/approvermanagement/workroot/find/applicationType",
            updateRoot: "workflow/approvermanagement/workroot/updateRoot",
            getInfoEmployee: "workflow/approvermanagement/workroot/getInforPerson",
            getInfoEmLogin: "workflow/approvermanagement/workroot/getInforPsLogin",
            getNameConfirmType: "workflow/approvermanagement/workroot/find/confirmRootType",
            getWkpDepInfo: "workflow/approvermanagement/workroot/find/wkpDepInfo",
            getWpLogin: "workflow/approvermanagement/workroot/find/wkpInfo-login",
            getDepLogin: "workflow/approvermanagement/workroot/find/depInfo-login",
            settingCas005: "at/auth/workplace/employmentrole/getemproleSet",
            settingKaf022: "workflow/approvermanagement/workroot/appSet",
            setAppUseKaf022: "at/request/application/approval/app-useAtr",
            setDisHR: "hrdev/approvalSet/appRootSet",
            settingJnh011: "hr/notice/report/findByAbol",
            settingJmm018: "hrdeveventmenu/eventmenuoperation/findByApprUse"
        }
        
        export function updateHistory(data): JQueryPromise<any> {
            return nts.uk.request.ajax("com", paths.updateHistory, data);
        }
        export function getAllDataCom(param): JQueryPromise<any> {
            return nts.uk.request.ajax("com", paths.getAllDataCom, param);
        }
        export function getAllDataPr(param): JQueryPromise<any> {
            return nts.uk.request.ajax("com", paths.getAllDataPr, param);
        }
        export function getNameAppType(): JQueryPromise<any> {
            return nts.uk.request.ajax("com", paths.getNameAppType);
        }
        export function updateRoot(data): JQueryPromise<any> {
            return nts.uk.request.ajax("com", paths.updateRoot, data);
        }
        export function getInfoEmployee(employeeId: string): JQueryPromise<any> {
            return nts.uk.request.ajax("com", paths.getInfoEmployee, employeeId);
        }
        export function getInfoEmLogin(): JQueryPromise<any> {
            return nts.uk.request.ajax("com", paths.getInfoEmLogin);
        }
        export function getWkpDepInfo(param): JQueryPromise<any> {
            return nts.uk.request.ajax("com", paths.getWkpDepInfo, param);
        }
        //get wpName || depName
        export function getWpDepName(sysAtr: number): JQueryPromise<any> {
            if(sysAtr == 0){
                return nts.uk.request.ajax("com", paths.getWpLogin);
            }else{
                return nts.uk.request.ajax("com", paths.getDepLogin);    
            }
            
        }
        //EmploymentRoleDataWebService
        export function settingCas005(): JQueryPromise<any> {
            return nts.uk.request.ajax("at", paths.settingCas005);
        }
		// move webservice to com refactor5
        export function settingKaf022(): JQueryPromise<any> {
            return nts.uk.request.ajax("com", paths.settingKaf022);
        }
        //ApprovalInfoWebsevice
        export function setAppUseKaf022(param): JQueryPromise<any> {
            return nts.uk.request.ajax("at", paths.setAppUseKaf022, param);
        }
        //PersonalReportClassificationWebService
        export function settingJnh011(): JQueryPromise<any> {
            return nts.uk.request.ajax("hr", paths.settingJnh011);
        }
        //HrApprovalRooteSetWs
        export function setDisHR(): JQueryPromise<any> {
            return nts.uk.request.ajax("com", paths.setDisHR);
        }
        //EventManageWebservice
        export function settingJmm018(): JQueryPromise<any> {
            return nts.uk.request.ajax("hr", paths.settingJmm018);
        }
    } 
}