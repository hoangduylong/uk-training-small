module nts.uk.com.view.cmf002.k.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    let paths = {
        getDateFormatSettingByCid: "exio/exo/dateformat/getDateFormatSettingByCid",
        addDateFormatSetting: "exio/exo/dateformat/addDateFormatSetting"
    };

    //save date format setting
    export function addDateFormatSetting(data): JQueryPromise<any> {
        return ajax(paths.addDateFormatSetting, data);
    }

    //Get date format setting by company id
    export function getDateFormatSetting(): JQueryPromise<any> {
        return ajax(paths.getDateFormatSettingByCid);
    }
}