module cmf007.a.viewmodel {
     import block = nts.uk.ui.block;
    export class ScreenModel {
        multiDate: KnockoutObservable<boolean> = ko.observable(true);
        dateSingle: KnockoutObservable<any> = ko.observable(null);
        datePeriod: KnockoutObservable<any> = ko.observable({});
        dateValue: KnockoutObservable<any>;
        startDateString: KnockoutObservable<string>;
        endDateString: KnockoutObservable<string>;
        timeSingle: KnockoutObservable<any>;
        start:  KnockoutObservable<any>;
        end:   KnockoutObservable<any>;
         constructor() {
            var self = this;
             var today = new Date(); 
             var dd = today.getDate()
             self.dateSingle = ko.observable(new Date());
             self.dateValue = ko.observable({});
             self.startDateString = ko.observable("");
            self.endDateString = ko.observable("");
             self.timeSingle = ko.observable(moment(new Date()).format('YYYY/MM/DD HH:MM'));
             self.start =  ko.observable(moment(new Date()).format('YYYY/MM/DD HH:MM'));
             self.end =  ko.observable(moment(new Date()).format('YYYY/MM/DD HH:MM'));
         }
         startPage(): JQueryPromise<any> {
            var self = this;
            var dfd = $.Deferred();            
            self.multiDate.subscribe(value =>{
                nts.uk.ui.errors.clearAll();
                /*if(value){
                    //self.datePeriod({ startDate: self.dateSingle(), endDate: self.dateSingle() });
                    self.start(self.timeSingle());
                } else {
                    //self.dateSingle(self.datePeriod().startDate);
                    self.timeSingle(self.start());    
                }*/
            })
            dfd.resolve();
            return dfd.promise();
        } 
        
        download() {
           var self = this;
           var startDate = "";
           var endDate = "";
           if(self.multiDate()){
               //startDate = self.datePeriod().startDate;
               //endDate = self.datePeriod().endDate;
               startDate = self.start();
               endDate = self.end();
           } else {
               //startDate = self.dateSingle();
               //endDate = self.dateSingle();
               startDate = self.timeSingle();
               endDate = self.timeSingle()
                   
           }
            if(startDate != ''){
                 block.invisible();
                nts.uk.request.exportLog({start: moment(startDate).utc().format(), end: moment(endDate).utc().format()}).done(function(data) {
                    block.clear();    
                }).fail(function(data) {
                    block.clear();    
                });     
            }
           
        }
    }    
}