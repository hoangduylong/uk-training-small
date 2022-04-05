__viewContext.ready(function () {
    class ScreenModel {
        
        slowrequest: KnockoutObservable<number>;
        slowquery: KnockoutObservable<number>;

        constructor() {
            this.slowrequest = ko.observable(0);
            this.slowquery = ko.observable(0);
        }
    
        load() {
            nts.uk.request.ajax("diagnosis/setting/get").done(res => {
                this.slowrequest(res.performance.thresholdMillisSlowRequest);
                this.slowquery(res.performance.thresholdMillisSlowQuery);
            });
        }
        
        update() {
            nts.uk.request.ajax("diagnosis/setting/update", {
                performance: {
                    thresholdMillisSlowRequest: this.slowrequest(),
                    thresholdMillisSlowQuery: this.slowquery()
                }
            }).done(res => {
                nts.uk.ui.dialog.info("Done!");
            });
        }
        
    }
    
    var sm = new ScreenModel();
    this.bind(sm);
    
        sm.load();
    
});