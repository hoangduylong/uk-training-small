module nts.uk.com.view.cdl028.a.service{

    import ajax = nts.uk.request.ajax;
        var paths = {
            getStartMonth: "at/shared/holidaysetting/companycommon/getFirstMonth"
        }

        //get start month
        export function getStartMonth(): JQueryPromise<any> {
            return ajax("at", paths.getStartMonth);
        };
}