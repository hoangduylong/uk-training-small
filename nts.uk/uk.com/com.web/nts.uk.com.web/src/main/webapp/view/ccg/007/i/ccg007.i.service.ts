module nts.uk.pr.view.ccg007.i {

    export module service {

        // Service paths.
        var servicePath = {
            getPasswordPolicy: "ctx/sys/gateway/securitypolicy/getPasswordPolicy"
        }

        /**
          * Function is used to check contract.
          */
        export function getPasswordPolicy(): JQueryPromise<PassWordPolicyDto> {
            return nts.uk.request.ajax(servicePath.getPasswordPolicy);
        }
        
        export interface PassWordPolicyDto {
            notificationPasswordChange: number;
            loginCheck: boolean;
            initialPasswordChange: boolean;
            isUse: boolean;
            historyCount: number;
            lowestDigits: number;
            validityPeriod: number;
            numberOfDigits: number;
            symbolCharacters: number;
            alphabetDigit: number;    
        }
    }
}