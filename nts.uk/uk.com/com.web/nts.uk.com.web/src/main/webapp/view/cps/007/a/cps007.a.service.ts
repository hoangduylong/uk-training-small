module cps007.a.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;

    let paths: any = {
        'getData': 'ctx/pereg/person/newlayout/get',
        'saveData': 'ctx/pereg/person/newlayout/save'
    };

    export function getData() {
        return ajax(paths.getData);
    }

    export function saveData(command) {
        return ajax(paths.saveData, command);
    }
    
    //saveAsExcel
    export function saveAsExcel(languageId: string): JQueryPromise<any> {
        let program = nts.uk.ui._viewModel.kiban.programName().split(" ");
        let domainType = "CPS007";
            if (program.length > 1) {
                program.shift();
                domainType = domainType + program.join(" ");
            }
        return nts.uk.request.exportFile('/masterlist/report/print', {
            domainId: "NewLayout", domainType: domainType, languageId: languageId, reportType: 0
        });
    }
}