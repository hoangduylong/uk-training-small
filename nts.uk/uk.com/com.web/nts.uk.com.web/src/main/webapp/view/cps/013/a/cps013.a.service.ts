module nts.uk.com.view.cps013.a.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;

    var paths: any = {
            checkCategoryHasItem: "ctx/pereg/check/category/checkHasCtg",
            getSystemDate: "ctx/pereg/check/category/getSystemDate"
    }

    export function checkHasCtg(CheckDataFromUI :any) {
        return ajax(paths.checkCategoryHasItem , CheckDataFromUI);
    }
    
    // get systemDate for A1_004
    export function getSystemDate(): JQueryPromise<any> {
            return ajax('com', paths.getSystemDate);
        };
}