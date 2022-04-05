module nts.uk.pr.view.ccg007.e {

    export module service {

        // Service paths.
        var servicePath = {
            submitChangePass: "ctx/sys/gateway/changepassword/submitchangepass",
            getUserNameByEmployeeCode: "ctx/sys/gateway/changepassword/getUserNameByEmployeeCode",
            getUserNameByLoginId: "ctx/sys/gateway/changepassword/getUserNameByLoginId"
        }

        /**
          * Function is used to check contract.
          */
        export function submitChangePass(data : ChangePasswordCommand): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.submitChangePass, data);
        }
        
        export function getUserNameByEmployeeCode(data: EmployeeInforDto): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.getUserNameByEmployeeCode, data);
        }
        
        export function getUserNameByLoginId(contractCode : string, loginId: string): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.getUserNameByLoginId + "/" + contractCode + "/" + loginId);
        }
        
        
        export interface CallerParameter {
            form1: boolean;
            loginId: string;
            employeeCode: string;
            contractCode: string;
            companyCode: string;
        }
        
        export class ChangePasswordCommand {
            oldPassword: string;
            newPassword: string;
            confirmNewPassword: string;
            
            constructor(oldPassword: string, newPassword: string, confirmNewPassword: string) {
                this.oldPassword = oldPassword;
                this.newPassword = newPassword;
                this.confirmNewPassword = confirmNewPassword;
            }
        }
        
        export class EmployeeInforDto {
            contractCode: string;
            employeeCode: string;
            companyCode: string;
            
            constructor(contractCode: string, employeeCode: string, companyCode: string) {
                this.contractCode = contractCode;
                this.employeeCode = employeeCode;
                this.companyCode = companyCode;
            }
        }
    }
}
