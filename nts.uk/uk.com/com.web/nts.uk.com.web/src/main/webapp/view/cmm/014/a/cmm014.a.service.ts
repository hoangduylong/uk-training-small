module nts.uk.com.view.cmm014.a.service {

    /**
     *  Service paths
     */
    var servicePath: any = {
        findClassification: "bs/employee/classification/find",
        saveClassification: "bs/employee/classification/save",
        removeClassification: "bs/employee/classification/remove"
    }

    /**
     * Get list classification
     */
    export function findClassification(classificationCode: any): JQueryPromise<Array<model.ClassificationFindDto>> {
        return nts.uk.request.ajax(servicePath.findClassification + "/" + classificationCode);
    }

    /**
     * save Classification
     */
    export function saveClassification(classification: any): JQueryPromise<any> {
        return nts.uk.request.ajax(servicePath.saveClassification, classification);
    }

    //saveAsExcel

    export function saveAsExcel(languageId: String): JQueryPromise<any> {
        let program = nts.uk.ui._viewModel.kiban.programName().split(" ");
        let domainType = "CMM014";
            if (program.length > 1) {
                program.shift();
                domainType = domainType + program.join(" ");
            }
        return nts.uk.request.exportFile('/masterlist/report/print', {
            domainId: "Classification", domainType: domainType, languageId: languageId, reportType: 0
        });
    }

    /**
    * remove Classification
    */
    export function removeClassification(params: any): JQueryPromise<any> {
        return nts.uk.request.ajax(servicePath.removeClassification, params);
    }

    export module model {

        export class ClassificationFindDto {
            code: string;
            name: string;
            memo: string;

            constructor(code?: string, name?: string, memo?: string) {
                this.code = code;
                this.name = name;
                this.memo = memo;
            }
        }
    }
}
