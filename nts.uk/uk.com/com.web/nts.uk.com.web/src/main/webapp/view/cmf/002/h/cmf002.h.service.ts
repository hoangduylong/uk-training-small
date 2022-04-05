module nts.uk.com.view.cmf002.h.service {
    import model = cmf002.share.model;
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;

    var paths = {
        getIdtSetting: "exio/exo/initial/idsetting"
    }

    export function getIdtSetting(): JQueryPromise<any> {
        return ajax("com", format(paths.getIdtSetting));
    }
}
