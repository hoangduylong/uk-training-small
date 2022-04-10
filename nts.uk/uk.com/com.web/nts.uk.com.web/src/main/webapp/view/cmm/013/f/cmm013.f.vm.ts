module nts.uk.com.view.cmm013.f {

	export module viewmodel {
		import Position = base.Position;

		export class ScreenModel {

			isCreateNew: KnockoutObservable<boolean>;

			positionCode: KnockoutObservable<string>;
			positionName: KnockoutObservable<string>;

			selectedPositionCode: KnockoutObservable<string>;
			currentCode: KnockoutObservable<string>;
			index: number;
			order: KnockoutObservable<number>;

			positionList: KnockoutObservableArray<Position>;
			positionColumns: KnockoutObservableArray<any>;


			constructor() {
				let self = this;

				self.isCreateNew = ko.observable(null);

				self.positionList = ko.observableArray([]);
				self.positionCode = ko.observable("");
				self.positionName = ko.observable("");
				self.order = ko.observable(0);

				self.currentCode = ko.observable(null);
				self.currentCode.subscribe((newValue) => {
                    self.select(newValue);
                    if (!_.isEmpty(newValue)) {
                        nts.uk.ui.errors.clearAll();    
                    }
				});

				self.index = 0;

				self.positionColumns = ko.observableArray([
					{ headerText: 'コード', key: 'positionCode', width: 70 },
					{ headerText: '名称', key: 'positionName', width: 120 }
				]);

				// get data
				self.loadPositionList2();

			}
			
			
			public select(selectedValue: string): void {
				let self = this;   
				      
                if (selectedValue) {
					self.positionCode(selectedValue);
					
                    // Find sequence by sequence code
                    /*service.findByPositionCode(newValue)
                        .done((data: Position) => {                        
                            if (data) {                              
                                // Found sequence         
                                self.isCreateNew(false);                                                     
                                self.positionCode(data.positionCode);
                                self.positionName(data.positionName);    
                                self.order(data.order);                           
                            } else {                               
                                // Sequence not found
                                self.positionCode("");
                                self.positionName("");   
                            }
                            // Set focus
                            if (self.isCreateNew()) {
                                $('#position-code').focus();
                            } else {
                                $('#position-name').focus();
                            }
                        })
                        .fail((res: any) => {
                            self.showMessageError(res);
                        });*/                       
                } else {
                   // No position selected, switch to create new
                   self.isCreateNew(true); 
                }               
			}


			private loadPositionList2(): void {
				let self = this;

				for (var i = 0; i < 20; i++) {
					self.positionList.push(new Position("" + i, "基本給", 0));
					console.log("fake data success");
				}
			}


			startPage(): JQueryPromise<any> {
				let self = this;

				let dfd = $.Deferred<any>();
				//var dfd = $.Deferred<void>();

				/*self.loadPositionList2()
					.done((data: Position[]) => {
						// Update position mode
						self.createNew(false);
						self.positionList(data);
					})
					.fail((res: any) => {
						// Create new position mode
						self.createNew(true);
						self.positionList([]);
					})*/
				dfd.resolve();

				return dfd.promise();;
			}


			// load position list
			public loadPositionList(): JQueryPromise<any> {
				let dfd = $.Deferred<any>();

				service.findAllPosition()
					.done((data: Position[]) => {
						dfd.resolve(data);
					})
					.fail((res: any) => {
						dfd.reject(res);
					});
				return dfd.promise();
			}


			// create new position mode
			public createNewPositionMode(): void {
				let self = this;
				self.isCreateNew(true);
				self.positionCode("");
				self.positionName("");
			}


			public addPosition(newPosition: Position): void {
				let self = this;
				
				// add new position into list in UI
				self.positionList().push(newPosition);
				
				/*service.addPosition(newPosition)
					.done((data: any) => {
						self.positionList().push(newPosition);
						self.loadPositionList2()
							.done((data: Position[]) => {
								// Update position mode
								self.isCreateNew(false);
								self.positionList(data);
							})
							.fail((res: any) => {
								// Create new position mode
								self.isCreateNew(true);
								//self.positionList([]);
							})
					})
					.fail((res: any) => {
						self.showMessageError(res);
					})*/
			}


			// save position
			public save(): void {
				let self = this;

				// Validate
				/*if (!self.validate()) {
					return;
				}*/

				let newPosition: Position = new Position(self.positionCode(), self.positionName(), 0);

				if (self.isCreateNew()) {
					console.log(newPosition);										
					// self.loadPositionList();

					self.addPosition(newPosition);
					console.log(self.positionList());
				} else {
					console.log("huhu");
					service.updatePosition(newPosition);
				}

				self.updatePositionOrder()
					.done((data: any) => {

					})
					.fail((res: any) => {
						self.showMessageError(res);
					});
			}


			public changeToUpdateMode(): void {
				let self = this;
				self.isCreateNew(false);
			}


			// remove position
			public remove(): void {
				let self = this;

				if (self.positionCode() !== "") {
					let currentIndex: number = null;

					// get the index of removed position in list
					for (let item of self.positionList()) {
						if (item.positionCode === self.positionCode()) {
							currentIndex = self.positionList.indexOf(item);
						}
					}

					self.positionList.splice(currentIndex, 1);
					console.log(self.positionList());

					/*nts.uk.ui.dialog.confirm({ messageId: "Msg_18" })
						.ifYes(() => {
							service.removePosition(self.positionCode())
								.done((data: any) => {
									self.positionList.splice(currentIndex, 1);
									self.loadPositionList()
										.done((data: Position[]) => {
											// Update position mode
											self.createNew(false);
											self.positionList(data);
										})
										.fail((res: any) => {
											// Create new position mode
											self.createNew(true);
											self.positionList([]);
										})
								})
								.fail((res: any) => {
									self.showMessageError(res);
								})
						});*/
				} else {
					console.log("huhu");
				}

				self.updatePositionOrder()
					.done((data: any) => {

					})
					.fail((res: any) => {
						self.showMessageError(res);
					});
			}


			// close dialog
			public close(): void {
				nts.uk.ui.windows.close();
			}


			// validate
			private validate(): any {
				// clear error
				nts.uk.ui.errors.clearAll();
				
				 $('#position-code').ntsEditor('validate');
                $('#position-name').ntsEditor('validate');

				return !$('.nts-input').ntsError('hasError');
			}


			private updatePositionOrder(): JQueryPromise<any> {
				let self = this;
				let dfd = $.Deferred<any>();
				let positionList: any[] = self.positionList();
				let order = 1;

				/* update all position's order in list in UI side */
				for (let position of positionList) {
					position.order = order;
					order++;
				}

				console.log(self.positionList());

				/*service.updateOrder(positionList)
					.done((data: any) => {
						dfd.resolve(data);
					})
					.fail((res: any) => {
						dfd.reject(res);
					});*/

				return dfd.promise();
			}


			public showMessageError(res: any): void {
				
			}



			/*let index: any;*/
			/*public selectedRow(): void {
				let self = this;
				let masterTable = (<HTMLTableElement>document.getElementById("masterTable"));
				let code = (<HTMLInputElement>document.getElementById("code"));
				let name = (<HTMLInputElement>document.getElementById("name"));

				for (let i = 0; masterTable.rows.length; i++) {
					masterTable.rows[i].onclick = function() {
						if (typeof self.index !== "undefined") {
							masterTable.rows[self.index].classList.toggle("selected")
						}

						masterTable.classList.toggle("selected");
						code.value = masterTable.rows[i].cells[0].innerHTML;
						name.value = masterTable.rows[i].cells[1].innerHTML;
						self.index = masterTable.rows[i].rowIndex;
					}
				}
			}

			
			public moveRowUp(): void {
				let self = this;
				let masterTable = (<HTMLTableElement>document.getElementById("masterTable"));
				let row = masterTable.rows;
				let parent = row[self.index].parentNode;
	
	
				if (self.index > 0) {
					parent.insertBefore(row[self.index], row[self.index - 1]);
					// when the row go up the index will be equal to index - 1
					self.index--;
				}
			}

			public moveRowDown(): void {
				let self = this;
				let masterTable = (<HTMLTableElement>document.getElementById("masterTable"));
				let row = masterTable.rows;
				let parent = row[self.index].parentNode;
	
				if(self.index < row.length - 1) {
					parent.insertBefore(row[self.index + 1], row[self.index]);
					// when the row go down the index will be equal to index + 1
					self.index++;
				}
			}*/




		}
	}
}




