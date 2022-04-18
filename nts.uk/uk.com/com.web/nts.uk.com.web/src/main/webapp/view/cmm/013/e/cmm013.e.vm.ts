module nts.uk.com.view.cmm013.e {

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
                let self = this;
                let dfd = $.Deferred<any>();
                
                // Load data from parent screen
                let data: any = nts.uk.ui.windows.getShared('listMasterToE');
                self.startDate(data.startDate);
                dfd.resolve();
                return dfd.promise();
            }
            
            /**
             * Execution
             */ 
            public execution(): void {
                let self = this;
                if (!self.validate()) {
                    return;
                }
                let dataIn: any = nts.uk.ui.windows.getShared('listMasterToE');
				
				self.listHistory(dataIn.historyList);
				self.listHistory().shift()
				let secondHistory = self.listHistory().shift();
				
				let preEndDate = new Date();
				let startDate = new Date(self.startDate())
				preEndDate.setFullYear(startDate.getFullYear(),startDate.getMonth(),startDate.getDate() - 1);
				let PreEndDate: string  = moment(preEndDate).format("YYYY-MM-DD");
				
				self.listHistory().unshift(new History(
					dataIn.jobCode,
					dataIn.jobjName,
					self.listHistory().length + 1 +'',
					secondHistory.startDate,
					PreEndDate
				));
				
				self.listHistory().unshift(new History(
					dataIn.jobCode,
					dataIn.jobjName,
					self.listHistory().length + 1 +'',
					moment(self.startDate()).format("YYYY-MM-DD"),
					self.endDate()
				));
					
				
					
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
            
            
            /**
             * Validate
             */
            private validate(): boolean {
                let self = this;
				let data: any = nts.uk.ui.windows.getShared('listMasterToE');
				self.listHistory(data.historyList);
				if(self.startDate() == ""){
					nts.uk.ui.dialog.caution({ messageId: "MsgB_1" });
					return false;
				}
				if(new Date(self.startDate()) < new Date(self.listHistory()[1].startDate))
				{ 
					nts.uk.ui.dialog.caution({ messageId: "Msg_102" });
					return false;
				}
                return true;
            }
        }
    }    
}