module nts.uk.com.view.cmm020.a {
    export module service {
        /**
         * define path to service
         */
        var paths: any = {
            getAllEraNameItem: "at/shared/eraname/getAllEraName",
            saveEraName: "at/shared/eraname/save",
            deleteEraName: "at/shared/eraname/delete",
            getEraNameItem: "at/shared/eraname/getEraNameItem"
        };

        export function getAllEraNameItem(): JQueryPromise<Array<viewmodel.model.EraItem>> {
            return nts.uk.request.ajax("at", paths.getAllEraNameItem);
        }

        export function saveEraName(eraNameItem: viewmodel.model.EraItem): JQueryPromise<void> {
            return nts.uk.request.ajax("at", paths.saveEraName,eraNameItem);
        }

        export function deleteEraName(eraNameItem: viewmodel.model.EraItem): JQueryPromise<void> {
            return nts.uk.request.ajax("at", paths.deleteEraName,eraNameItem);
        }
        
        export function getEraNameItem(): JQueryPromise<viewmodel.model.EraItem> {
            return nts.uk.request.ajax("at", paths.getEraNameItem);
        }
    }

 
}