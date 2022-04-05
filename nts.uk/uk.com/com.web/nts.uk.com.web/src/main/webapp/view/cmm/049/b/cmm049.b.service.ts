module nts.uk.com.view.cmm049.b {
    
    export module service {
         /**
            *  Service paths
            */
        var servicePath: any = {
            getPCMailCompany: "sys/env/userinfoset/pcmail/company",
            getPCMailPerson: "sys/env/userinfoset/pcmail/person",
            getMobileMailCompany: "sys/env/userinfoset/mobilemail/company",
            getMobileMailPerson: "sys/env/userinfoset/mobilemail/person",
            saveMailDestinationFunction: "sys/env/userinfoset/save/settingByMenu"
            
        }

        export function getPCMailCompany(): JQueryPromise<MailFunctionListDto> {
            return nts.uk.request.ajax(servicePath.getPCMailCompany);
        }
        
        export function getPCMailPerson(): JQueryPromise<MailFunctionListDto> {
            return nts.uk.request.ajax(servicePath.getPCMailPerson);
        }
        
        export function getMobileMailCompany(): JQueryPromise<MailFunctionListDto> {
            return nts.uk.request.ajax(servicePath.getMobileMailCompany);
        }
        
        export function getMobileMailPerson(): JQueryPromise<MailFunctionListDto> {
            return nts.uk.request.ajax(servicePath.getMobileMailPerson);
        }
        
        export function saveMailDestinationFunction(data: any): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.saveMailDestinationFunction, data);
        }
        
        export interface MailFunctionDto {
            functionId: number;
            functionName: string;
        }
        export interface MailFunctionListDto {
            mailFunctionDto: Array<MailFunctionDto>;
        } 

    }
}