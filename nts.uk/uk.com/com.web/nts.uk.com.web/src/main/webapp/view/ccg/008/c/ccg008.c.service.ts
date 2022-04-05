module nts.uk.com.view.ccg008.c.service {

    var paths: any = {
        getSelectMyTopPage: "topageselfsetting/select",
        save: "topageselfsetting/save",
        getTopPageSelfSet: "topageselfsetting/finditemselected"
    }
    /**
     * get my top page
     */
    export function getSelectMyTopPage(): JQueryPromise<Array<any>> {
        return nts.uk.request.ajax("com",paths.getSelectMyTopPage);
    }
    /**
     * save top page is selected
     */
    export function save(data: any): JQueryPromise<Array<any>> {
        return nts.uk.request.ajax("com",paths.save, data);
    }
    /**
     * get top page self set
     */
    export function getTopPageSelfSet(): JQueryPromise<any>{
        return nts.uk.request.ajax("com",paths.getTopPageSelfSet);
    }
}