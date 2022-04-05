module nts.uk.com.view.cmm007.d {
    export module service {
        /**
         * define path to service
         */
        var path: any = {
                findList: "at/schedule/planyearhdframe/findAll",
                save: "at/schedule/planyearhdframe/save",
            };
        
        /**
         * 
         */
        export function findListPlanYearHdFrame(): JQueryPromise<Array<model.PlanYearHdFrameDto>>{
            return nts.uk.request.ajax("at", path.findList);
        }
        
        /**
         * 
         */
        export function savePlanYearHdFrame(data: model.PlanYearHdFrameSaveCommand): JQueryPromise<any> {
            return nts.uk.request.ajax("at", path.save, data);
        }
    }
    
    /**
     * Model define.
     */
    export module model {
       export class PlanYearHdFrameDto {
            planYearHdFrameNo: number;
            planYearHdFrameName: string;
            useAtr: number;
            
            constructor(no: number, name: string, useAtr: number){
                this.planYearHdFrameNo = no;
                this.planYearHdFrameName = name;
                this.useAtr = useAtr;
            }
        }
        
        export class PlanYearHdFrameSaveCommand {
            listData: Array<model.PlanYearHdFrameDto>;

            constructor(data: Array<model.PlanYearHdFrameDto>){
               this.listData = data;
            }
        }
    }
    
}