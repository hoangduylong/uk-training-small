module nts.uk.pr.view.ccg007.h {

    export module service {

        // Service paths.
        var servicePath = {
            submitForgotPass: "ctx/sys/gateway/changepassword/submitforgotpass",
            getUserNameByURL: "ctx/sys/gateway/changepassword/getUserNameByURL",
            submitLogin: "ctx/sys/gateway/login/submit/form1"
        }

        /**
          * Function is used to check contract.
          */
        export function submitForgotPass(command : ForgotPasswordCommand): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.submitForgotPass, command);
        }
        
        export function getUserNameByURL(embeddedId: string): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.getUserNameByURL + "/" + embeddedId);
        }
        
        export function submitLogin(data: SubmitData): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.submitLogin + location.search, data);
        }
        
        export interface CallerParameter {
            loginId: string;
            contractCode: string;
            url: string;
        }
        
        export class ForgotPasswordCommand {
            embeddedId: string;
            userId: string;
            newPassword: string;
            confirmNewPassword: string;
            
            constructor(embeddedId: string, userId: string, newPassword: string, confirmNewPassword: string) {
                this.embeddedId = embeddedId;
                this.userId = userId;
                this.newPassword = newPassword;
                this.confirmNewPassword = confirmNewPassword;
            }
        }
        
        export interface SubmitData {
            loginId: string;
            password: string;
            contractCode: string;
            contractPassword: string;
        }
    }
}