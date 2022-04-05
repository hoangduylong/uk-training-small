module nts.uk.com.view.cmm007.b {
    export module service {
        /**
         * define path to service
         */
        var path: any = {
                findList: "screen/com/systemresource/findList",
                save: "screen/com/systemresource/save",
            };
        
        /**
         * 
         */
        export function findListSystemResource(): JQueryPromise<Array<model.SystemResourceDto>>{
            return nts.uk.request.ajax(path.findList);
        }
        
        /**
         * 
         */
        export function saveSysResourceSetting(data: model.SystemResourceSaveCommand): JQueryPromise<any> {
            return nts.uk.request.ajax(path.save, data);
        }
    }
    
    /**
     * Model define.
     */
    export module model {
        export class SystemResourceDto {
            resourceId: string;
            resourceContent: string;
            
            constructor(id: string, content: string){
                this.resourceId = id;
                this.resourceContent = content;
            }
        }
        
        export class SystemResourceSaveCommand {
            listData: Array<model.SystemResourceDto>;

            constructor(data: Array<model.SystemResourceDto>){
               this.listData = data;
            }
        }
    }
    
}