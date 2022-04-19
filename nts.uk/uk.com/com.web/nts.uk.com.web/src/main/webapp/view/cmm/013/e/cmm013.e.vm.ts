module nts.uk.com.view.cmm013.e {

    export module viewmodel {
        
		import History = base.History;
        
        export class ScreenModel {
            startDate: KnockoutObservable<string>;
            endDate: KnockoutObservable<string>;
			listHistory: KnockoutObservableArray<History> = ko.observableArray([]);
            test: any;

            constructor() {
                let self = this;
                self.startDate = ko.observable("");
                self.endDate = ko.observable("9999/12/31");
            }
            
            /**
             * Start page
             */
            public startPage(): JQueryPromise<any> {
                let self = this;
                let dfd = $.Deferred<any>();
                
				/** get old start date from A screen */
                let data: any = nts.uk.ui.windows.getShared('listMasterToE');
                self.startDate(data.startDate);
                dfd.resolve();
                return dfd.promise();
            }
            
            /**
             * Execution on submit, update next to last History and lastest History from UI to list to send A screen
             */ 
            public execution(): void {
                let self = this;
				
				/** validate value from UI */
                if (!self.validate()) {
                    return;
                }

				/** get data from A screen */
                let dataIn: any = nts.uk.ui.windows.getShared('listMasterToE');
				self.listHistory(dataIn.historyList);
				
				/** set endDate of next to last history = the previous date of lastes start date */
				let preEndDate  = moment( 
					new Date().setFullYear(
						new Date(self.startDate()).getFullYear(),
						new Date(self.startDate()).getMonth(),
						new Date(self.startDate()).getDate() - 1))
					.format("YYYY/MM/DD");
				
				self.listHistory()[1].endDate = preEndDate;
				self.listHistory()[1].displayString = `${self.listHistory()[1].startDate} ~ ${self.listHistory()[1].endDate}`;
				
				/** update lastest history from UI */
				self.listHistory()[0].startDate = moment(self.startDate()).format("YYYY/MM/DD");
				self.listHistory()[0].displayString = `${self.listHistory()[0].startDate} ~ ${self.listHistory()[0].endDate}`;
				
				/** send data to A screen */
				let dataOut: any = {
					listHistory: self.listHistory()
				};
                nts.uk.ui.windows.setShared('DialogEToMaster', dataOut);
                self.close();
            }
            
            /**
             * Close
             */
            public close(): void {
                nts.uk.ui.windows.close();
            }
            
            
            
			/** validate value */
            private validate(): boolean {
                let self = this;
				let data: any = nts.uk.ui.windows.getShared('listMasterToE');

				self.listHistory(data.historyList);
				
				if(self.startDate() == ""){
					nts.uk.ui.dialog.caution({ messageId: "MsgB_1" });
					return false;
				}
				
				nts.uk.ui.errors.clearAll()
                $('#start-date').ntsEditor('validate'); 
				
				if(self.listHistory().length == 1)
				{
					return !$('.nts-input').ntsError('hasError');
				}
				else if(new Date(self.startDate()) < new Date(self.listHistory()[1].startDate))
				{
					nts.uk.ui.dialog.caution({ messageId: "Msg_102" });
					return false;
				}
				
                return !$('.nts-input').ntsError('hasError');
            }
        }
    }    
}