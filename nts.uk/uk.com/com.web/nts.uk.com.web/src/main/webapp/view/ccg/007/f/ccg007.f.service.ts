module nts.uk.pr.view.ccg007.f {

    export module service {

        // Service paths.
        var servicePath = {
            submitSendMail: "ctx/sys/gateway/sendmail/submit"
        }

        /**
          * Function is used to check contract.
          */
        export function submitSendMail(data : CallerParameter): JQueryPromise<SendMailReturnDto> {
            return nts.uk.request.ajax(servicePath.submitSendMail, data);
        }
        
        export interface CallerParameter {
            loginId: string;
            contractCode: string;
            contractPassword: string;
        }
        
        export interface SendMailReturnDto {
            url: string;
        }
    }
}