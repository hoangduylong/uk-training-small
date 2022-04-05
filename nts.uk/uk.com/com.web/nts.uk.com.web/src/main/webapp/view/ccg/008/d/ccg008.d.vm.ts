 module nts.uk.com.view.ccg008.d.viewmodel {  
    export class ScreenModel {
        checked: KnockoutObservable<boolean>;
        enable: KnockoutObservable<boolean>;
        message: KnockoutObservable<string>;
        
        constructor() {
            var self = this;
            self.checked = ko.observable(false);
            self.enable = ko.observable(false);
            self.message = ko.observable("");
            
            self.enable.subscribe(function(newValue) {
                var key = "isBirthDay";
                nts.uk.characteristics.save(key, newValue);
            });
        }
        
        start(): JQueryPromise<any> {
            var self = this;
            var dfd = $.Deferred();
            self.message(nts.uk.ui.windows.getShared("ALERT_MESSAGE"));
            dfd.resolve();
            return dfd.promise();
        }
        
        /**
         * Click on button d1_003
         * Close the popup
         */
        closeDialog() {
            nts.uk.ui.windows.close();
        }
    }
 }