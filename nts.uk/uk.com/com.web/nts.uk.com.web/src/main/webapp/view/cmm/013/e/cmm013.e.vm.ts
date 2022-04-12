module nts.uk.com.view.cmm013.e {

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
                let _self = this;
                let dfd = $.Deferred<any>();
                
                // Load data from parent screen
                let data: any = nts.uk.ui.windows.getShared('listMasterToE');
                _self.startDate(data.startDate);
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
					startDate:  _self.startDate,
					endDate:  _self.endDate
				};
                nts.uk.ui.windows.setShared('DialogEToMaster', data);
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
				
				if(_self.checkDate(_self.startDate())){
					alert("開始日は 1900/01/01 ～ 9999/12/31 の日付を入力してください");
					return false;
				}
				
                let data: any = nts.uk.ui.windows.getShared('listMasterToE');
				_self.listHistory(data.historyList);
				if(new Date(_self.startDate()) < new Date (_self.listHistory()[0].startDate))
				{
					alert('最新の履歴開始日以前に履歴を追加することはできません。');
					return false;
				}
                return true;
				
            }
			private checkDate(strDate: string): boolean {
				let comp = strDate.split('/')
   				let d = parseInt(comp[0], 10)
    			let m = parseInt(comp[1], 10)
    			let y = parseInt(comp[2], 10)
    			let date = new Date(y,m-1,d);
    			if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
     				return true
    			}
    			return false
			}
        }
    }    
}