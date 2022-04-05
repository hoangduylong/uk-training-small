module nts.uk.com.view.cmf002.x {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    export module service {
        var paths = {
            getExecHist: "exio/exo/exechist/getExecHist",
            useDeleteFile: "exio/exo/execlog/useDeleteFile/{0}",
            getExOutExecHistSearch: "exio/exo/exechist/getExOutExecHistSearch",
        }

        export function getExecHist(param): JQueryPromise<any> {
            return ajax('com', paths.getExecHist, param);
        };

        export function useDeleteFile(outProcessId): JQueryPromise<any> {
            let path = format(paths.useDeleteFile, outProcessId);
            return ajax('com', path);
        };

        export function getExOutExecHistSearch(param: any): JQueryPromise<any> {
            return ajax('com', paths.getExOutExecHistSearch, param);
        };
    }
}