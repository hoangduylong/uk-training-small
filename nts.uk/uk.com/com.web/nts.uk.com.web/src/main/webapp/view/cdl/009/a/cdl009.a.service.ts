module nts.uk.com.view.cdl009.a {
    export module service {
        /**
         *  Service paths
         */
        var paths = {
            searchEmpByWorkplaceList: 'screen/com/cdl009/searchByWorkplaceList',
        };

        export function findEmployees(query): JQueryPromise<Array<model.EmployeeResult>> {
            return nts.uk.request.ajax("com", paths.searchEmpByWorkplaceList, query);
        }
        
        /**
        * Model namespace.
        */
        export module model {
            
            /**
             * class EmployeeResult
             */
            export class EmployeeResult {
                employeeId: string;
                employeeCode: string;
                employeeName: string;
                workplaceCode: string;
                workplaceName: string;
                jobTitleName: string;
            }
            
            
        }
    }
}
