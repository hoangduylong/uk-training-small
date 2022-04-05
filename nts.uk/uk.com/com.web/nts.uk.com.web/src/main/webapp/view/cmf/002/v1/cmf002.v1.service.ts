module nts.uk.com.view.cmf002.v1.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    var paths = {
        getCategory: "exio/exo/exechist/getCategory",
    }
    export function getCategory(param): JQueryPromise<any> {
        return ajax('com', paths.getCategory, param);
    };
}