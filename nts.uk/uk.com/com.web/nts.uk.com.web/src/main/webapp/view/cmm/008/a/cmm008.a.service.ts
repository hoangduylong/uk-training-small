module nts.uk.com.view.cmm008.a {
    export module service {
        /**
         *  Service paths
         */
        var paths = {
            findGroupCommonMaster: 'bs/employee/employment/findGroupCommonMaster',
            findEmployment: 'bs/employee/employment/findByCode',
            saveEmployment: 'bs/employee/employment/save',
            removeEmployment: 'bs/employee/employment/remove',
  
        };

        /**
         * Find Employment
         */
        export function findEmployment(employmentCode: string): JQueryPromise<model.EmploymentDto> {
            return nts.uk.request.ajax(paths.findEmployment + "/" + employmentCode);
        }
        
        export function findGroupCommonMaster() {
            return nts.uk.request.ajax(paths.findGroupCommonMaster);
        }

        /**
         * Save Employment
         */
        export function saveEmployment(command: any): JQueryPromise<any> {
            return nts.uk.request.ajax(paths.saveEmployment, command);
        }
        
        /**
         * Remove Employment
         */
        export function removeEmployment(command: any): JQueryPromise<any> {
            return nts.uk.request.ajax(paths.removeEmployment, command);
        }
        
        
        //saveAsExcel
        
        export function saveAsExcel(languageId: String): JQueryPromise<any> {
            let program = nts.uk.ui._viewModel.kiban.programName().split(" ");
            let domainType = "CMM008";
            if (program.length > 1) {
                program.shift();
                domainType = domainType + program.join(" ");
            }
            return nts.uk.request.exportFile('/masterlist/report/print', {
                domainId: "Employment",
                domainType: domainType, languageId: languageId, reportType: 0
            });
        }
        
        /**
        * Model namespace.
        */
        export module model {
            
            /**
             * class EmploymentDto
             */
            export class EmploymentDto{
                code: string;
                name: string;
                empExternalCode: string;
                memo: string;
                commonMasterName: string;
                commonMasterItemID:string;
            }
            
            
        }
    }
}
