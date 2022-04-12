module nts.uk.com.view.cmm013.f {

	export module viewmodel {
		import Position = base.Position;
		import UpdatePositionCommand = service.model.UpdatePositionCommand;
		import AddPositionCommand = service.model.AddPositionCommand;
		import RemovePositionCommand = service.model.RemovePositionCommand;

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
			
			enable_button_create: KnockoutObservable<boolean>;
			enable_input_positionCode: KnockoutObservable<boolean>;
			//enable_button_create: KnockoutObservable<boolean>;


			constructor() {
				let self = this;

				self.isCreateNew = ko.observable(false);

				self.positionList = ko.observableArray([]);
				self.positionCode = ko.observable("");
				self.positionName = ko.observable("");
				self.order = ko.observable(0);
				
				self.enable_button_create = ko.observable(null);
				self.enable_input_positionCode = ko.observable(null);

				self.currentCode = ko.observable(null);
				self.currentCode.subscribe((selectedCode) => {
					self.select(selectedCode);
					if (!_.isEmpty(selectedCode)) {
						nts.uk.ui.errors.clearAll();
					}
				});

				self.index = 0;

				self.positionColumns = ko.observableArray([
					{ headerText: 'コード', key: 'positionCode', width: 70 },
					{ headerText: '名称', key: 'positionName', width: 120 }
				]);

				// get data
				self.selectNext();
			}


			startPage(): JQueryPromise<any> {
				let self = this;
				let dfd = $.Deferred<void>();

				self.loadPositionList()
					.done((data: Position[]) => {
						// Update position mode
						self.isCreateNew(false);
						self.positionList(data);
						self.currentCode(data[0].positionCode);
					})
					.fail((res: any) => {
						// Create new position mode
						console.log("fail");
						self.positionList([]);
					})

				dfd.resolve();
				return dfd.promise();;
			}


			public select(selectedCode: string): void {
				let self = this;

				if (selectedCode) {
					self.positionCode(selectedCode);
					self.enable_input_positionCode(false);
					console.log(selectedCode);

					// Find position by position code
					service.findByPositionCode(selectedCode)
						.done((data: Position) => {
							if (data) {
								// position found
								console.log("position found")
								self.isCreateNew(false);
								self.positionName(data.positionName);
								self.order(data.positionOrder);
							} else {
								// position not found
								console.log("position not found")
                                /*self.positionCode("");
                                self.positionName("");*/
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
						});

				} else {
					// No position selected, switch to create new
					console.log("huhu");
					self.isCreateNew(true);
				}
			}


			public selectNext(): void {
				let self = this;
				//self.positionList()[0].positionCode;
			}


			// create new position mode
			public createNewPositionMode(): void {
				let self = this;
				self.isCreateNew(true);
				self.positionCode("");
				self.positionName("");
				self.enable_input_positionCode(true);
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


			public addPosition(addCommand: AddPositionCommand): void {
				let self = this;
				let newPosition = new Position(addCommand.positionCode,
												addCommand.positionName,
												addCommand.positionOrder);

				service.addPosition(addCommand)
					.done((data: any) => {
						// add new position into list in UI
						self.positionList().push(newPosition);
						nts.uk.ui.dialog.info("データが正常に登録されました");
						self.positionCode("");
						self.positionName("");
						
						self.loadPositionList()
							.done((data: Position[]) => {
								// Update position mode								
								self.isCreateNew(false);
								self.positionList(data);
							})
							.fail((res: any) => {
								// Create new position mode
								self.isCreateNew(true);
								self.positionList([]);
							})
					})
					.fail((res: any) => {
						nts.uk.ui.dialog.alert("登録に失敗しました \n データはすでに存在します");
						self.showMessageError(res);
					})
			}



			public updatePosition(updateCommand: UpdatePositionCommand): void {
				let self = this;
				console.log(updateCommand);

				service.updatePosition(updateCommand)
					.done((data: any) => {
						console.log("update success");
						self.loadPositionList()
							.done((data: Position[]) => {
								// Update position mode
								self.isCreateNew(false);
								self.positionList(data);
							})
							.fail((res: any) => {
								// Create new position mode
								self.isCreateNew(true);
								self.positionList([]);
							})
					})
					.fail((res: any) => {
						console.log("update fail");
						self.showMessageError(res);
					})
			}


			// save position
			public save(): void {
				let self = this;

				// Validate
				if (!self.validate()) {
					return;
				}

				let addCommand: AddPositionCommand = new AddPositionCommand(self.positionCode(),
					self.positionName(), 0);

				let updateCommand: UpdatePositionCommand = new UpdatePositionCommand(self.positionCode(), self.positionName(), 0);


				if (self.isCreateNew()) {
					self.addPosition(addCommand);
					
				} else {
					console.log("update");
					self.updatePosition(updateCommand)
					nts.uk.ui.dialog.info("データは正常に更新されました");
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

					let removeCommand = new RemovePositionCommand(self.positionCode());

					nts.uk.ui.dialog.confirm("選択中のデータを削除しますか？")
						.ifYes(() => {
							service.removePosition(removeCommand)
								.done((data: any) => {
									self.positionList.splice(currentIndex, 1);

									nts.uk.ui.dialog.info("データが正常に登録されました!");
									self.positionCode("");
									self.positionName("");

									self.loadPositionList()
										.done((data: Position[]) => {
											// Return to Update position mode
											self.isCreateNew(false);
											self.positionList(data);
										})
										.fail((res: any) => {
											self.positionList([]);
										})
								})
								.fail((res: any) => {
									self.showMessageError(res);
								})
						});
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


			private updatePositionOrder(): JQueryPromise<any> {
				let self = this;
				let dfd = $.Deferred<any>();
				let positionList: any[] = self.positionList();
				let order = 1;

				// update all position's order in list in UI side
				for (let position of positionList) {
					position.positionOrder = order;
					order++;
				}

				console.log(self.positionList());

				service.updateOrder(positionList)
					.done((data: any) => {
						dfd.resolve(data);
					})
					.fail((res: any) => {
						dfd.reject(res);
					});

				return dfd.promise();
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


			public showMessageError(res: any): void {

			}



			/*let index: any;
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




