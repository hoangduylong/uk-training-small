module nts.uk.com.view.cmf002.i.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    let paths = {
        getNumberFormatSettingByCid: "exio/exo/numberformat/getNumberFormatSettingByCid",
        addNumberFormatSetting: "exio/exo/numberformat/addNumberFormatSetting"
    };

    //save date format setting
    export function addNumberFormatSetting(data): JQueryPromise<any> {
        return ajax(paths.addNumberFormatSetting, data);
    }

    //Get date format setting by company id
    export function getNumberFormatSetting(): JQueryPromise<any> {
        return ajax(paths.getNumberFormatSettingByCid);
    }
}
