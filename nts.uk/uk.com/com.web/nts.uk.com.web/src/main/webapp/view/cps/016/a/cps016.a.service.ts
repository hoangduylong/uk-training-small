module nts.uk.com.view.cps016.a.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    var paths = {
        getAllSelectionItems: "ctx/pereg/person/info/setting/selection/findAll/false",
        getPerInfoSelectionItem: "ctx/pereg/person/info/setting/selection/findItem/{0}",
        saveDataSelectionItem: "ctx/pereg/person/info/setting/selection/addSelectionItem",
        updateDataSelectionItem: "ctx/pereg/person/info/setting/selection/updateSelectionItem",
        checkUseSelectionItem: "ctx/pereg/person/info/setting/selection/checkUseSelectionItem",
        removeDataSelectionItem: "ctx/pereg/person/info/setting/selection/removeSelectionItem",
        checkExistedSelectionItemId: "ctx/pereg/person/info/ctgItem/checkExistItem/{0}",
        saveAsExcel: "file/at/seletionitemreport/saveAsExcel"

    }

    export function getAllSelectionItems() {
        return ajax(paths.getAllSelectionItems);
    }

    export function getPerInfoSelectionItem(selectionItemId: string) {
        let _path = format(paths.getPerInfoSelectionItem, selectionItemId);
        return nts.uk.request.ajax("com", _path);
    }

    export function addDataSelectionItem(command) {
        return ajax(paths.saveDataSelectionItem, command);
    }

    export function updateDataSelectionItem(command) {
        return ajax(paths.updateDataSelectionItem, command);
    }

    export function checkUseSelectionItem(selectionItemId: string) {
        return ajax(paths.checkUseSelectionItem+'/' + selectionItemId);
    }
    
    export function removeDataSelectionItem(command) {
        return ajax(paths.removeDataSelectionItem, command);
    }
    export function checkExistedSelectionItemId(selectionItemId: string) {
        let _path = format(paths.checkExistedSelectionItemId, selectionItemId);
        return nts.uk.request.ajax("com", _path);
    }
    export function saveAsExcel(languageId: string): JQueryPromise<any> {
        let program = nts.uk.ui._viewModel.kiban.programName().split(" ");
        let domainType = "CPS016";
        if (program.length > 1){
            program.shift();
            domainType = domainType + program.join(" ");
        }
        let _params = {domainId: "SelectionItem", 
                        domainType:domainType,
                        languageId: languageId, 
                        reportType: 0};
        return nts.uk.request.exportFile('/masterlist/report/print', _params);
    }
}