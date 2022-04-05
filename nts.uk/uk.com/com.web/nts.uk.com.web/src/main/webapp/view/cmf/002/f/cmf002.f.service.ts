module nts.uk.com.view.cmf002.f.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    
    var paths = {
        getOutputItem: "exio/exo/ctgoutputitem/getOutItems/{0}",
        getCtgData: "exio/exo/ctgoutputitem/getctgdata/{0}",
        addOutputItem: "exio/exo/registeroutputitem/add"
    }

    export function getOutputItem(condSetCd: String): JQueryPromise<any> {
        let _path = format(paths.getOutputItem, condSetCd);
        return ajax("com", _path);
    }
    
    export function getCtgData(categoryId: number): JQueryPromise<any> {
        let _path = format(paths.getCtgData, categoryId);
        return ajax("com", _path);
    }
    
    // add
    export function addOutputItem(command): JQueryPromise<any> {
        return ajax(paths.addOutputItem, command);
    }
}