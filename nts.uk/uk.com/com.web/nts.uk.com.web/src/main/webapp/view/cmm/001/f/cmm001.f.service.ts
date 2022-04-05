module nts.uk.com.view.cmm001.f {
    export module service {
        /**
         * define path to service
         */
        var path: any = {
            executionMasterCopyData: "sys/assist/mastercopy/data/execute",
            exportFileError: "sys/assist/mastercopy/data/log/export"
            };
        
        /**
         * execution process copy
         */
        export function executionMasterCopyData(data: model.MasterCopyDataCommand): JQueryPromise<any>{
            return nts.uk.request.ajax(path.executionMasterCopyData, data);
        }
        
        /**
         *  export error to csv service
         */
        export function exportFileError(data: model.ErrorContentDto[]): JQueryPromise<any> {
            return nts.uk.request.exportFile(path.exportFileError, data);
        }
        
    }
    
    export module model {
        // error
        export interface ErrorContentDto {
            message: string;
            categoryName: string;
            order: number;
            systemType: string;
        }
        
        // copy data command
        export interface MasterCopyDataCommand {
            companyId: string;
            masterDataList: MasterCopyCategoryDto[];
        }
        
        // master category dto
        export interface MasterCopyCategoryDto {
            masterCopyId: string;
            categoryName: string;
            order: number;
            systemType: string;
            copyMethod: number;
        }
    } 
}