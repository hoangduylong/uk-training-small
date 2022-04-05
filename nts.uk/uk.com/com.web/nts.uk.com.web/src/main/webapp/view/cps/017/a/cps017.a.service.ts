module nts.uk.com.view.cps017.a.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    import exportFile = nts.uk.request.exportFile;
    var paths = {
        getAllSelectionItems: "ctx/pereg/person/info/setting/selection/findAll/true",
        getPerInfoSelectionItem: "ctx/pereg/person/info/setting/selection/findItem/{0}",
        getAllPerInfoHistorySelection: "ctx/pereg/person/info/setting/selection/findAllHistSelection/{0}",
        getAllOrderItemSelection: "ctx/pereg/person/info/setting/selection/findAllSelection/{0}",
        saveDataSelection: "ctx/pereg/person/info/setting/selection/addSelection",
        updateDataSelection: "ctx/pereg/person/info/setting/selection/updateSelection",
        removeDataSelection: "ctx/pereg/person/info/setting/selection/removeSelection",
        removeHistory: "ctx/pereg/person/info/setting/selection/removeHistory",
        reflUnrComp: "ctx/pereg/person/info/setting/selection/reflunrcomp"
    }
    
    export function saveAsExcel(languageId: string, date: string): JQueryPromise<any> {
        let program = nts.uk.ui._viewModel.kiban.programName().split(" ");
        let domainType = "CPS017";
        if (program.length > 1){
            program.shift();
        }
        domainType = program.length > 1 ? domainType + program.join(" ") : domainType  + __viewContext.program.programName;
        let _params = { domainId: "PersonSelectionItem",
                        domainType:domainType,
                        languageId: languageId, 
                        reportType: 0, mode: 1, baseDate : date };
        return exportFile('/masterlist/report/print', _params);
    }

    export function getAllSelectionItems() {
        return ajax(paths.getAllSelectionItems);
    }

    export function getPerInfoSelectionItem(selectionItemId: string) {
        let _path = format(paths.getPerInfoSelectionItem, selectionItemId);
        return nts.uk.request.ajax("com", _path);
    }

    export function getAllPerInfoHistorySelection(selectedId: string) {
        let _path = format(paths.getAllPerInfoHistorySelection, selectedId);
        return nts.uk.request.ajax("com", _path);
    }

    export function getAllOrderItemSelection(histId: string) {
        let _path = format(paths.getAllOrderItemSelection, histId);
        return nts.uk.request.ajax("com", _path);
    }

    //save data Selection:
    export function saveDataSelection(command) {
        return ajax(paths.saveDataSelection, command);
    }

    // update data Selection:
    export function updateDataSelection(command) {
        return ajax(paths.updateDataSelection, command);
    }

    // remove data selection:
    export function removeDataSelection(command) {
        return ajax(paths.removeDataSelection, command);
    }

    // remoe history:
    export function removeHistory(command) {
        return ajax(paths.removeHistory, command);
    }

    // Phan anh den cty:
    export function reflUnrComp(command) {
        return ajax(paths.reflUnrComp, command);
    }

}

