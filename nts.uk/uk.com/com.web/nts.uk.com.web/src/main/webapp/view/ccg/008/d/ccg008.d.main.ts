module nts.uk.com.view.ccg008.d.alertmessage {
    var paths = {
        findPersonInfo: "myprofile/birthday"
    }

    export function findPersonInfo(): JQueryPromise<Array<any>> {
        return nts.uk.request.ajax("com", paths.findPersonInfo);
    }

    export class ScreenModel {
        message: KnockoutObservable<string>;

        constructor() {
            var self = this;

            self.message = ko.observable("");
        }

        start(): void {
            var self = this;

            findPersonInfo().done(function(res) {
                if (res.checkBirthday) {                    
                    // kiem tra lan sau co được phép hiển thị thông báo nữa không?
                    var key = "isBirthDay";
                    nts.uk.characteristics.restore(key).done(function(data) {
                        if(!data){
                            nts.uk.ui.windows.setShared("ALERT_MESSAGE", res.message);
                            //Display birthday dialog
                            nts.uk.ui.windows.sub.modeless("/view/ccg/008/d/index.xhtml");
                        }
                    });
                }
            });
        }

    }
}