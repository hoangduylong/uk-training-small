module nts.uk.com.view.cmm013.c {
    
    export module service {
        
        /**
         *  Service paths
         */
        var servicePath: any = {
            findBySequenceCode: "bs/employee/jobtitle/sequence/find",
        };     
        
        /**
         * findBySequenceCode
         */
        export function findBySequenceCode(sequenceCode: string): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.findBySequenceCode, {sequenceCode: sequenceCode});
        }
        
        /**
        * Model namespace.
        */
        export module model {
            
        }
    }
}
