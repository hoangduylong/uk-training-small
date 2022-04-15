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
				this.jobCode(shared.jobTitleCode);
                this.jobName(shared.jobTitleName);
                this.endDateOfLastestHistory(shared.lastestHistory.startDate);
                
				dfd.resolve();
                return dfd.promise();
            }

            private isValidDate(d: Date): boolean {
                return d.getTime() === d.getTime();
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

                if (!self.isValidDate(abrogated)) {
                    nts.uk.ui.dialog.error("有効な日付を入力してください");
                    return;
                }
                
                let transferObj: any = {
					abrogatedDate: self.abrogatedDate().slice(0, 10)
				};
                
                setShared('DialogBToMaster', transferObj);
                self.close();
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