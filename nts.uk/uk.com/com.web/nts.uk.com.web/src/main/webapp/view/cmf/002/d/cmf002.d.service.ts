module nts.uk.com.view.cmf002.d {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    export module service {
        var paths = {
            getListCtgItems: "exio/exo/outcnddetail/getListCtgItems/{0}/{1}",
            register: "exio/exo/outcnddetail/register"
        };

        export function getListCtgItems(condSetCd: string, categoryId: string): JQueryPromise<any> {
            let _path = format(paths.getListCtgItems, condSetCd, categoryId);
            return ajax('com', _path);
        }
        export function register(outCndDetail): JQueryPromise<any> {
            return ajax('com', paths.register, outCndDetail);
        }

    }
}
