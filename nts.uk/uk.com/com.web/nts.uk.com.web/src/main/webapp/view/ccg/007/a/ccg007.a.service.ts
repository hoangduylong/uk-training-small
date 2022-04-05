module nts.uk.pr.view.ccg007.a {

    export module service {

        // Service paths.
        var servicePath = {
            submitContract: "ctx/sys/gateway/login/submitcontract"
        }

        /**
          * Function is used to copy new Top Page.
          */
        export function submitForm(data: ContractDto): JQueryPromise<ContractDto> {
            return nts.uk.request.ajax(servicePath.submitContract, data);
        }
        
        export interface ContractDto {
            contractCode: string;
            password: string;
        }
    }
}