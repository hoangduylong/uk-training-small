module nts.uk.com.view.cps017.d.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    var paths = {
        getAllPerInfoHistorySelection: "ctx/pereg/person/info/setting/selection/findAllHistSelection/{0}",
        editHistoryData: "ctx/pereg/person/info/setting/selection/editHistory"
    }

    //history datetime:
    export function getAllPerInfoHistorySelection(selectionItemId: string) {
        let _path = format(paths.getAllPerInfoHistorySelection, selectionItemId);
        return nts.uk.request.ajax("com", _path);
    }

    // edit history data:
    export function editHistoryData(command) {
        return ajax(paths.editHistoryData, command);
    }
}
