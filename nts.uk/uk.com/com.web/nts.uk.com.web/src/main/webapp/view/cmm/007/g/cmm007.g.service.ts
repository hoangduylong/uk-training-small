module nts.uk.com.view.cmm007.g {
    export module service {
        /**
         * define path to service
         */
        var path: any = {
                findList: "at/shared/workdayoffframe/findAll",
                save: "at/shared/workdayoffframe/save",
            };
        
        /**
         * 
         */
        export function findListWorkdayoffFrame(): JQueryPromise<Array<model.WorkdayoffFrameDto>>{
            return nts.uk.request.ajax("at", path.findList);
        }
        
        /**
         * 
         */
        export function saveWorkdayoffFrame(data: model.WorkdayoffFrameSaveCommand): JQueryPromise<any> {
            return nts.uk.request.ajax("at", path.save, data);
        }
    }
    
    /**
     * Model define.
     */
    export module model {
       export class WorkdayoffFrameDto {
            workdayoffFrNo: number;
            workdayoffFrName: string;
            transferFrName: string;
            useAtr: number;
            
            constructor(no: number, name: string, transName:string, useAtr: number){
                this.workdayoffFrNo = no;
                this.workdayoffFrName = name;
                this.transferFrName = transName;
                this.useAtr = useAtr;
            }
        }
        
        export class WorkdayoffFrameSaveCommand {
            listData: Array<model.WorkdayoffFrameDto>;

            constructor(data: Array<model.WorkdayoffFrameDto>){
               this.listData = data;
            }
        }
    }
    
}