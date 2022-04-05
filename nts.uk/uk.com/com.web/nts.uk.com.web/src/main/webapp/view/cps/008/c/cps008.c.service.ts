module cps008.c.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;

    let paths = {
        getDetails: "ctx/pereg/person/maintenance/findOne/{0}",
        saveData: "ctx/pereg/person/maintenance/saveLayout"
    };

    export function getDetails(lid) {
        return ajax(format(paths.getDetails, lid));
    }

    /**
   * add  Maintenance Layout
   */
    export function saveData(data: any) {
        return ajax(paths.saveData, data);
    }
}