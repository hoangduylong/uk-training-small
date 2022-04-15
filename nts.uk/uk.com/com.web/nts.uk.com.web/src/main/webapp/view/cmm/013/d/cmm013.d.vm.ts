module nts.uk.com.view.cmm013.d {

    export module viewmodel {
		import History = base.History;
        
        export class ScreenModel {
            
            startDate: KnockoutObservable<string>;
            endDate: KnockoutObservable<string>;
			listHistory: KnockoutObservableArray<History> = ko.observableArray([]);
            
            constructor() {
                let _self = this;  
                _self.startDate = ko.observable("");
                _self.endDate = ko.observable("9999/12/31");
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
             * Execution
             */
            public execution(): void {
                let _self = this;
                if (!_self.validate()) {
                    return;
                }
				let data: any = {
					startDate:  _self.startDate(),
					endDate:  _self.endDate()
				};
                nts.uk.ui.windows.setShared('DialogDToMaster', data);
                _self.close();
			}
            
			   private validate(): boolean {
				let _self = this;
				let data: any = nts.uk.ui.windows.getShared('listMasterToD');
				_self.listHistory(data.historyList);
				console.log(_self.startDate());
				if(_self.startDate() == ""){
					nts.uk.ui.dialog.caution({ messageId: "MsgB_1" });
					return false;
				}
				if(new Date(_self.startDate()) < new Date(_self.listHistory()[0].startDate))
				{
					nts.uk.ui.dialog.caution({ messageId: "Msg_102" });
					return false;
				}
				
                return true;
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
