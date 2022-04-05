module nts.uk.com.view.cmm007.i {
    export module service {
        /**
         * define path to service
         */
        const path: any = {
            findList: "screen/com/systemresource/findList",
            save: "screen/com/systemresource/save",
        };
        
        /**
        * 
        */
        export function findList(): JQueryPromise<SystemResourceDto[]> {
            return nts.uk.request.ajax(path.findList);
        }

        /**
        * 
        */
        export function save(data: SystemResourceSaveCommand): JQueryPromise<any> {
            return nts.uk.request.ajax(path.save, data);
        }
    } 
}