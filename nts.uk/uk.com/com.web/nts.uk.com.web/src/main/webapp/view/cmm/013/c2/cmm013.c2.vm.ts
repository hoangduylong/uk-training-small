module nts.uk.com.view.cmm013.c2 {

    export module viewmodel {
        import Constants = base.Constants;
		import listHistory = base.History;
        
        export class ScreenModel {
            
            abrogatedDate: KnockoutObservable<string>;
            
            constructor() {
                let self = this;  
                self.abrogatedDate = ko.observable("9999/12/31");
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
                let self = this;
               /* if (!self.validate()) {
                    return;
                }*/
				let transferObj: any = {
					positionCode: "00011",
					positionName: "ABC"
				};
                nts.uk.ui.windows.setShared("DialogCToMaster", transferObj);
				console.log(transferObj)
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
				
				/*if(self.startDate() == "")
				{
					alert('開始日を入力してください。');
					return false;
				}*/
				
                let transferObj: any = nts.uk.ui.windows.getShared(Constants.SHARE_IN_DIALOG_EDIT_HISTORY);
				let listHistory: listHistory[] =  transferObj.listJobTitleHistory;
				
				let valid: boolean = listHistory.every(function (history)
				{
					//return  new Date(self.startDate()) > new Date(history.period.startDate)
				})
				if(!valid)
				{
					alert('最新の履歴開始日以前に履歴を追加することはできません。');
					return false;
				}
                return true;
            }
        }
    }    
}