module cps008.a.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;

    let paths = {
        getAll: "ctx/pereg/person/maintenance/findAll",
        getDetails: "ctx/pereg/person/maintenance/findOne/{0}",
        saveData: "ctx/pereg/person/maintenance/saveLayout"
    };

    /**
    * Get list Maintenance Layout
    */
    export function getAll() {
        return ajax(paths.getAll);
    }

    export function getDetails(lid) {
        return ajax(format(paths.getDetails, lid));
    }

   /**
    * add  Maintenance Layout
    */
    export function saveData(data: any) {
        return ajax(paths.saveData, data);
    }

    

    export function saveAsExcel(languageId: String): JQueryPromise<any> {
        let program = nts.uk.ui._viewModel.kiban.programName().split(" ");
        let domainType = "CPS008";
            if (program.length > 1) {
                program.shift();
                domainType = domainType + program.join(" ");
            }
        return nts.uk.request.exportFile('/masterlist/report/print', {
            domainId: "Maintenance", domainType:domainType, languageId: languageId, reportType: 0
        });
    }

}