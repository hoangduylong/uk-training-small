module nts.uk.com.view.cmm013.b2 {

    export module viewmodel {
        import Constants = base.Constants;
		import listHistory = base.History;
        import setShared = nts.uk.ui.windows.setShared;
    	import getShared = nts.uk.ui.windows.getShared;
		
        export class ScreenModel {
            
            abrogatedDate: KnockoutObservable<string>;
			jobCode: KnockoutObservable<string> = ko.observable('');
            jobName: KnockoutObservable<string> = ko.observable('');
            endDateOfLastestHistory: KnockoutObservable<string> = ko.observable('');
            
            constructor() {
                let self = this;  
                self.abrogatedDate = ko.observable("9999/12/31");
            }
            
            /**
             * Start page
             */
            public startPage(): JQueryPromise<any> {
                let dfd = $.Deferred<any>();
                
                let shared = getShared('listMasterToB');
                // console.log(shared)
				this.jobCode(shared.jobTitleCode);
                this.jobName(shared.jobTitleName);
                this.endDateOfLastestHistory(shared.lastestHistory.startDate);
                console.log(this.endDateOfLastestHistory());
				//console.log(shared)
				dfd.resolve();
                return dfd.promise();
            }
            
            /**
             * Execution
             */
            public execution(): void {
                let self = this;

                let start = new Date(self.endDateOfLastestHistory());
                let abrogated = new Date(self.abrogatedDate());
                
                if(abrogated <= start){
                    nts.uk.ui.dialog.error(self.endDateOfLastestHistory() + "以降の日を選んでください");
                    return;
                }
                
                let transferObj: any = {
					abrogatedDate: self.abrogatedDate().slice(0, 10)
				};
				
				/*self.abrogatedDate("2022/12/12");*/
				/*transferObj.abrogatedDate =  self.abrogatedDate;*/
                setShared('DialogBToMaster', transferObj);
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