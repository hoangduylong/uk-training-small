module nts.uk.com.view.cmm013.b {
    
    export module service {
        
        /**
         *  Service paths
         */
        var servicePath: any = {
            removeJobTitle: "bs/employee/jobtitle/remove",
        };
        
        /**
         * removeJobTitle
         */
        export function removeJobTitle(command: any): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.removeJobTitle, command);
        }
         
        /**
        * Model namespace.
        */
        export module model {
            
        }
    }
}
