module cps008.b.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;

    let paths = {
        getListCls: "ctx/pereg/person/maintenance/findOne/{0}",
        getData: "ctx/pereg/person/newlayout/get",
        saveData: "ctx/pereg/person/newlayout/save",
    };

    export function getData() {
        return ajax(paths.getData);
    }
    
    export function getListCls(lid) {
         return ajax(format(paths.getListCls, lid));
    }

    export function saveData(command) {
        return ajax(paths.saveData, command);
    }


}