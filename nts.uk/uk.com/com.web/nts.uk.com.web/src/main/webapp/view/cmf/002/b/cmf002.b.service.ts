module nts.uk.com.view.cmf002.b {
    export module service {
        /**
         * define path to service
         */
        var path: any = {
            getCndSet: "exio/exo/condset/getCndSet",
            deleteCnd: "exio/exo/condset/delete",
            register: "exio/exo/condset/register",
            copy: "exio/exo/condset/copy",
            getCategory: "exio/exo/exechist/getCategory",
            outSetContent: "exio/exo/condset/outSetContent/{0}/{1}",
            findOutputPeriodSetting: "exio/exo/condset/findOutputPeriodSetting",
        };

        export function getCndSet(data: any): JQueryPromise<any> {
            return nts.uk.request.ajax(path.getCndSet, data);
        }

        export function getOutItem(cndSetcd: any): JQueryPromise<any> {
            return nts.uk.request.ajax("com",path.getOutItem,cndSetcd);
        }

        export function deleteCnd(command: any): JQueryPromise<any> {
            return nts.uk.request.ajax(path.deleteCnd, command);
        }

        export function register(command: any): JQueryPromise<any> {
            return nts.uk.request.ajax(path.register, command);
        }

        export function copy(command: any): JQueryPromise<any> {
            return nts.uk.request.ajax(path.copy, command);
        }

        export function outSetContent(cndSetCd: string , standType: number): JQueryPromise<any> {
            let _path = nts.uk.text.format(path.outSetContent, cndSetCd, standType);
            return nts.uk.request.ajax("com", _path);
        }

        export function getCategory(command :any): JQueryPromise<any> {
            return nts.uk.request.ajax(path.getCategory, command);
        }

        export function findOutputPeriodSetting(conditionSetCode: string): JQueryPromise<OutputPeriodSetDto> {
          return nts.uk.request.ajax("com", `${path.findOutputPeriodSetting}/${conditionSetCode}`);
        }
    }

    export interface OutputPeriodSetDto {
        cid: string;
        conditionSetCode: string;
        periodSetting: number;
        closureDayAtr: number;
        baseDateClassification: number;
        baseDateSpecify: string;
        startDateClassification: number;
        startDateSpecify: string;
        startDateAdjustment: number;
        endDateClassification: number;
        endDateSpecify: string;
        endDateAdjustment: number;
    }
}