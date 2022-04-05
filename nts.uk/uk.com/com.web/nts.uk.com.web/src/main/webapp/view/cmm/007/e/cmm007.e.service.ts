module nts.uk.com.view.cmm007.e {
    export module service {
        /**
         * define path to service
         */
        var path: any = {
                findList: "at/shared/overtimeworkframe/findAll",
                save: "at/shared/overtimeworkframe/save",
            };
        
        /**
         * 
         */
        export function findListOvertimeWorkFrame(): JQueryPromise<Array<model.OvertimeWorkFrameDto>>{
            return nts.uk.request.ajax("at", path.findList);
        }
        
        /**
         * 
         */
        export function saveOvertimeWorkFrame(data: model.OvertimeWorkFrameSaveCommand): JQueryPromise<any> {
            let listData:any = {};
            listData.listData = ko.toJS(data);
            return nts.uk.request.ajax("at", path.save, listData);
        }
    }
    
    /**
     * Model define.
     */
    export module model {
       export class OvertimeWorkFrameDto {
            overtimeWorkFrNo: KnockoutObservable<number>;
            overtimeWorkFrName: KnockoutObservable<string>;
            transferFrName: KnockoutObservable<string>;
            useAtr: KnockoutObservable<number>;
            
            constructor(no: number, name: string, transName:string, useAtr: number){
                let _self = this;
                _self.overtimeWorkFrNo = ko.observable(no);
                _self.overtimeWorkFrName = ko.observable(name);
                _self.transferFrName = ko.observable(transName);
                _self.useAtr = ko.observable(useAtr);
            }
        }
        
        export class OvertimeWorkFrameSaveCommand {
            listData: Array<model.OvertimeWorkFrameDto>;

            constructor(data: Array<model.OvertimeWorkFrameDto>){
               this.listData = data;
            }
        }
    }
    
}