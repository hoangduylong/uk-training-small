module nts.uk.com.view.cmm007.c {
    export module service {
        /**
         * define path to service
         */
        var path: any = {
                getTempAbsenceFrameByCId: "bs/employee/temporaryabsence/frame/findTempAbsenceFrameByCId",
                getTempAbsenceFrameByCIdAndFrameNo: "bs/employee/temporaryabsence/frame/findTempAbsenceFrameByCIdAndFrameNo",
                updateTempAbsenceFrame: "bs/employee/temporaryabsence/frame/updateTempAbsenceFrameByCidAndFrameNo"
            };
        
        export function getTempAbsenceFrameByCId(): JQueryPromise<Array<model.TempAbsenceFrameDto>> {
            return nts.uk.request.ajax(path.getTempAbsenceFrameByCId);
        }
        
        export function getTempAbsenceFrameByCIdAndFrameNo(): JQueryPromise<any> {
            return nts.uk.request.ajax(path.getTempAbsenceFrameByCIdAndFrameNo);
        }
        
        export function updateTempAbsenceFrame(lstDto: Array<viewmodel.moduleDto>): JQueryPromise<any> {
            let dto: any = {};
            dto.dto = ko.toJS(lstDto);
            return nts.uk.request.ajax(path.updateTempAbsenceFrame, dto);
        }
    }
    
    /**
     * Model define.
     */
    export module model {
        export class TempAbsenceFrameDto{
            companyId: string;
            tempAbsenceFrNo: number; 
            useClassification: number; 
            tempAbsenceFrName: string;
            
            constructor(companyId: string, tempAbsenceFrNo: number, useClassification: number, tempAbsenceFrName: string){
                this.companyId = companyId;
                this.tempAbsenceFrNo = tempAbsenceFrNo;
                this.useClassification = useClassification;
                this.tempAbsenceFrName = tempAbsenceFrName;
            }
        }
    }
}