module nts.uk.com.view.cmm013.f {

	export module viewmodel {
		import Position = base.Position;
		import AddPositionCommand = service.model.AddPositionCommand;
		import UpdatePositionCommand = service.model.UpdatePositionCommand;
		import RemovePositionCommand = service.model.RemovePositionCommand;

		export class ScreenModel {
			// check create new mode on/off
			isCreateNew: KnockoutObservable<boolean>;
			
			// binding position input in UI
			positionCode: KnockoutObservable<string>;
			positionName: KnockoutObservable<string>;
			positionOrder: KnockoutObservable<number>;
			
			currentCode: KnockoutObservable<string>;
			
			// binding position table in UI
			positionList: KnockoutObservableArray<Position>;
			positionColumns: KnockoutObservableArray<any>;
			
			// binding input and button in UI
			enable_input_positionCode: KnockoutObservable<boolean>;
			enable_remove_button: KnockoutObservable<boolean>;


			constructor() {
				let self = this;

				self.isCreateNew = ko.observable(false);
				self.positionList = ko.observableArray([]);
				self.positionCode = ko.observable("");
				self.positionName = ko.observable("");
				self.positionOrder = ko.observable(0);
				self.currentCode = ko.observable(null);

				self.enable_input_positionCode = ko.observable(null);
				self.enable_remove_button = ko.observable(null);
				
				// get selected position info when current code changes
				self.currentCode.subscribe((selectedCode) => {
					self.select(selectedCode);
					if (!_.isEmpty(selectedCode)) {
						nts.uk.ui.errors.clearAll();
					}
				});

				self.positionColumns = ko.observableArray([
					{ headerText: 'コード', key: 'positionCode', width: 70 },
					{ headerText: '名称', key: 'positionName', width: 120 }
				]);
			}
			

			// run after page loaded
			startPage(): JQueryPromise<any> {
				let self = this;
				let dfd = $.Deferred<void>();
				
				// load position list
				self.loadPositionList()
					.done((data: Position[]) => {
						self.positionList(data);
						self.currentCode(data[0].positionCode);
					})
					.fail((res: any) => {
						self.positionList([]);
					})

				dfd.resolve();
				return dfd.promise();
			}


			// get info of selected position
			public select(selectedCode: string): void {
				let self = this;

				if (selectedCode) {
					self.positionCode(selectedCode);
					self.isCreateNew(false);
					self.enable_input_positionCode(false);
					self.enable_remove_button(true);

					// find position by position's code
					service.findByPositionCode(selectedCode)
						.done((data: Position) => {
							if (data) {
								self.positionName(data.positionName);
								self.positionOrder(data.positionOrder);
								// set focus on position name input
								$('#position-name').focus();
							} else {
								// position not found
								self.positionCode("");
								self.positionName("");
							}
						})
						.fail((res: any) => {
							self.showMessageError(res);
						});
				}
			}


			// start create new position mode
			createNewPositionMode(): void {
				let self = this;
				
				self.isCreateNew(true);
				self.enable_input_positionCode(true);
				self.enable_remove_button(false);
				
				self.positionCode("");
				self.positionName("");
				self.currentCode("");
				// set focus on position code input
				$('#position-code').focus();
			}


			// load all positions to position list
			public loadPositionList(): JQueryPromise<any> {
				let dfd = $.Deferred<any>();
				
				// get all positions
				service.findAllPosition()
					.done((data: Position[]) => {
						dfd.resolve(data);
					})
					.fail((res: any) => {
						dfd.reject(res);
					});

				return dfd.promise();
			}


			// add new position
			public addPosition(newPosition: Position): void {
				let self = this;

				service.addPosition(newPosition)
					.done((data: any) => {
						// add new position into list
						self.positionList().push(newPosition);
						self.currentCode(self.positionCode());
						
						// update all positions' order
						self.updatePositionOrder()
							.done((data: any) => {

							})
							.fail((res: any) => {
								self.showMessageError(res);
							});
						
						// notify that position is added successfully
						nts.uk.ui.dialog.info("データが正常に登録されました");
					})
					.fail((res: any) => {
						self.showMessageError(res);
					})
			}


			// update position
			public updatePosition(updateCommand: UpdatePositionCommand): void {
				let self = this;
				let currentIndex: number;
				
				let updatedPosition = new Position(updateCommand.positionCode, 
													updateCommand.positionName, 
													updateCommand.positionOrder);

				// get index of position needs to be updated
				for (let item of self.positionList()) {
					if (item.positionCode === self.positionCode()) {
						currentIndex = self.positionList.indexOf(item);
					}
				}
				
				// update position in position list
				self.positionList().splice(currentIndex, 1, updatedPosition);
				
				// update all positions' order
				self.updatePositionOrder()
					.done((data: any) => {
						// notify that position added successfully
						nts.uk.ui.dialog.info("データが正常に登録されました!");
					})
					.fail((res: any) => {
						self.showMessageError(res);
					});
			}


			// save position
			public save(): void {
				let self = this;

				// validate
				if (!self.validate()) {
					return;
				}

				let addCommand = new AddPositionCommand(self.positionCode(), self.positionName(), 0);
				let updateCommand = new UpdatePositionCommand(self.positionCode(), self.positionName(), self.positionOrder());

				if (self.isCreateNew()) {
					self.addPosition(addCommand);
				} else {
					self.updatePosition(updateCommand);
				}
			}


			// remove position
			public remove(): void {
				let self = this;

				if (self.positionCode() !== "") {
					// confirm dialog
					nts.uk.ui.dialog.confirm("選択中のデータを削除しますか？")
						.ifYes(() => {
							let removeCommand = new RemovePositionCommand(self.positionCode());
							// remove position
							service.removePosition(removeCommand)
								.done((data: any) => {
									let currentIndex: number;
									// get index of position needs to be removed
									for (let item of self.positionList()) {
										if (item.positionCode === self.positionCode()) {
											currentIndex = self.positionList.indexOf(item);
										}
									}
									// remove position from list
									self.positionList.splice(currentIndex, 1);

									self.positionCode("");
									self.positionName("");
									self.currentCode("");
									
									// update all positions' order
									self.updatePositionOrder()
										.done((data: any) => {

										})
										.fail((res: any) => {
											self.showMessageError(res);
										});
										
									// notify position removed successfully
									nts.uk.ui.dialog.info("データが正常に登録されました!");
								})
								.fail((res: any) => {
									self.showMessageError(res);
								})
						});
				}
			}


			// update all positions's order
			private updatePositionOrder(): JQueryPromise<any> {
				let self = this;
				let dfd = $.Deferred<any>();
				let positionList: any[] = self.positionList();
				let order = 1;

				// update all position's order in list
				for (let position of positionList) {
					position.positionOrder = order;
					order++;
				}
				// update all position's order in database
				service.updateOrder(positionList)
					.done((data: any) => {
						self.loadPositionList()
							.done((data: Position[]) => {
								dfd.resolve(data);
								self.positionList(data);
							})
							.fail((res: any) => {
								self.positionList([]);
							})
					})
					.fail((res: any) => {
						self.showMessageError(res);
					})

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

			// show message error
			public showMessageError(res: any): void {

			}
		}
	}
}

