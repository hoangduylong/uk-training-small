module nts.uk.com.view.cmf002.m {
    export module service {
        var path: any = {
            sendPerformSettingByInTime: "exio/exo/dataformat/sendPerformSettingByInTime",
            findPerformSettingByInTime: "exio/exo/dataformat/findPerformSettingByInTime"
        };
        export function sendPerformSettingByInTime(data): JQueryPromise<any> {
            return nts.uk.request.ajax(path.sendPerformSettingByInTime, data);
 
        }

        export function findPerformSettingByInTime(): JQueryPromise<any> {
            return nts.uk.request.ajax(path.findPerformSettingByInTime);
        }
    }

}