module nts.uk.com.view.cmm013.c2 {

    export module viewmodel {
       	import Position = base.Position;
        
        export class ScreenModel {
            
            positionCode: KnockoutObservable<string>;
			positionName: KnockoutObservable<string>;

			selectedPositionCode: KnockoutObservable<string>;
			currentCode: KnockoutObservable<string>;
			
			positionList: KnockoutObservableArray<Position>;
			positionColumns: KnockoutObservableArray<any>;
            
            constructor() {
                let self = this;  
                
				self.positionList = ko.observableArray([]);
				self.positionCode = ko.observable("");
				self.positionName = ko.observable("");
				
				self.currentCode = ko.observable(null);
				
				self.positionColumns = ko.observableArray([
					{ headerText: 'コード', key: 'positionCode', width: 70 },
					{ headerText: '名称', key: 'positionName', width: 120 }
				]);
				self.loadPositionList2();
				//console.log(self.positionList())
            }

			private loadPositionList2(): void {
				let self = this;

				for (var i = 0; i < 20; i++) {
					self.positionList.push(new Position("" + i, "基本給" + i, 0));
				}
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
				if (!self.currentCode()) {
					nts.uk.ui.dialog.info("名称を選んでください");
                    return;
                }
				
				self.positionCode(self.currentCode());
				let selectedItem = self.positionList().filter(item => {
					return item.positionCode == self.positionCode()
				})
				/*console.log(selectedItem);
				console.log(typeof(self.positionList()))*/
				
				let transferObj: any = {
					positionCode: selectedItem[0].positionCode,
					positionName: selectedItem[0].positionName
				};
				
				
				/*console.log(self.currentCode());
				console.log(self.positionCode());
				console.log(self.positionName());
				console.log(self.selectedPositionCode());
				console.log(self.positionList());*/
				
                nts.uk.ui.windows.setShared("DialogCToMaster", transferObj);
				//console.log(transferObj)
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