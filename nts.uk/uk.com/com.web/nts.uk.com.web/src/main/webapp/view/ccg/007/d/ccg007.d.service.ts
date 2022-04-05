module nts.uk.pr.view.ccg007.d {

    export module service {

        // Service paths.
        var servicePath = {
            checkContract: "ctx/sys/gateway/login/checkcontract",
            //submitLogin: "ctx/sys/gateway/login/submit/form3",
            getAllCompany: "ctx/sys/gateway/login/getcompany/",
            getEmployeeLoginSetting: "ctx/sys/gateway/login/emlogsettingform3",
            account: "ctx/sys/gateway/login/account",
            ver: "ctx/sys/gateway/login/build_info_time", 
            
            submitLogin: "ctx/sys/gateway/login/password",
            samlLogin: "ctx/sys/gateway/singlesignon/saml/authenticate"
        }

        /**
         * Function is used to copy new Top Page.
         */
        export function checkContract(data: any): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.checkContract, data);
        }

        export function getEmployeeLoginSetting(contractCode: string): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.getEmployeeLoginSetting + "/" + contractCode);
        }
        
        /**
          * Function is used to copy new Top Page.
          */
        export function submitLogin(data: any): JQueryPromise<string> {
            return nts.uk.request.ajax(servicePath.submitLogin + location.search, data);
        }

        export function samlLogin(data: any): JQueryPromise<AuthenticateInfo> {
            return nts.uk.request.ajax(servicePath.samlLogin, data);
        }

        
        export function account(): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.account);
        }
        
        export function ver(): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.ver);
        }

        /**
          * Function is used to copy new Top Page.
          */
        export function getAllCompany(contractCode : string): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.getAllCompany + contractCode);
        }

        export interface SystemConfigDto {
            installForm: number;
        }
        export interface ContractDto {
            password: string;
            contractCode: string;
            startDate: string;
            endDate: string;
        }
        
        export interface CheckChangePassDto{
            showChangePass: boolean;
            msgErrorId: string;
            showContract: boolean;
        }

        export interface AuthenticateInfo {
            useSamlSso: boolean;
            authenUrl: string;
        }
    
    }
}