module nts.uk.com.view.cmm013.d {

    export module viewmodel {
		import History = base.History;
        
        export class ScreenModel {
            
            startDate: KnockoutObservable<string>;
            endDate: KnockoutObservable<string>;
			listHistory: KnockoutObservableArray<History> = ko.observableArray([]);
            
            constructor() {
                let self = this;  
                self.startDate = ko.observable("");
                self.endDate = ko.observable("9999/12/31");
            }
            
            /**
             * Start page
             */
            public startPage(): JQueryPromise<any> {
                let dfd = $.Deferred<any>();
                dfd.resolve();
                return dfd.promise();
            }
            
            /**
             * Execution on submit, update lastest History and add new History from UI to list to send A screen
             */
            public execution(): void {
                let self = this;
				
				/** validate value from UI */
                if (!self.validate()) {
                    return null;
                }

				/** get data from A screen */
				let dataIn: any = nts.uk.ui.windows.getShared('listMasterToD');
				
				/** set endDate of lastest history = the previous date of new start date */
				let preEndDate = moment( 
					new Date().setFullYear(
						new Date(self.startDate()).getFullYear(),
						new Date(self.startDate()).getMonth(),
						new Date(self.startDate()).getDate() - 1))
					.format("YYYY/MM/DD");
				self.listHistory()[0].endDate = preEndDate;
				self.listHistory()[0].displayString = `${self.listHistory()[0].startDate} ~ ${self.listHistory()[0].endDate}`;
				
				/** add new start date */
				self.listHistory().unshift(new History(
					dataIn.jobTitleCode,
					dataIn.jobTitleName,
					util.randomId(),
					moment(new Date(self.startDate())).format("YYYY/MM/DD"),
					self.endDate()));
				
				/** send data to A screen */
				let dataOut: any = {
					listHistory: self.listHistory()
				};
                nts.uk.ui.windows.setShared('DialogDToMaster', dataOut);
                self.close();
			}
            
			/** validate value */
			private validate(): boolean {
				let self = this;
				let data: any = nts.uk.ui.windows.getShared('listMasterToD');
				self.listHistory(data.historyList);
				
				if(self.startDate() == ""){
					nts.uk.ui.dialog.caution({ messageId: "MsgB_1", messageParams: ["開始日"]});
					return false;
				}
				
				nts.uk.ui.errors.clearAll()
                $('#start-date').ntsEditor('validate'); 
				
				if(self.listHistory().length == 0)
				{
					return !$('.nts-input').ntsError('hasError');
				}
				else if(new Date(self.startDate()) < new Date(self.listHistory()[0].startDate))
				{
					nts.uk.ui.dialog.caution({ messageId: "Msg_102" });
					return false;
				}
				         
                return !$('.nts-input').ntsError('hasError');
            }

            /**
             * Close
             */
            public close(): void {
                nts.uk.ui.windows.close();
            }
        }
    }    
}
