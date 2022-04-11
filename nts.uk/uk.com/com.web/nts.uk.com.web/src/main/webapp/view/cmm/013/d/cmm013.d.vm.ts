module nts.uk.com.view.cmm013.d {

    export module viewmodel {
        import Constants = base.Constants;
		import listHistory = base.History;
        
        export class ScreenModel {
            
            startDate: KnockoutObservable<string>;
            endDate: KnockoutObservable<string>;
            
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
				let transferObj: any = {};
				transferObj.startDate =  _self.startDate;
				transferObj.endDate =  _self.endDate;
                nts.uk.ui.windows.setShared(Constants.SHARE_OUT_DIALOG_EDIT_HISTORY, transferObj);
                _self.close();
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
				let _self = this;
				if(_self.startDate() == "")
				{
					alert('開始日を入力してください。');
					return false;
				}
				
                let transferObj: any = nts.uk.ui.windows.getShared(Constants.SHARE_IN_DIALOG_EDIT_HISTORY);
				let listHistory: listHistory[] =  transferObj.listJobTitleHistory;
				let valid: boolean = listHistory.every(function (history)
				{
					return  new Date(_self.startDate()) > new Date (history.startDate);
				});
				//alert(_self.startDate());
				//let date = new Date("2022-04-07");
				//alert(date);
				//let valid = new Date(_self.startDate()) > date;
				//alert(valid);
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