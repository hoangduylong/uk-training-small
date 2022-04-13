module nts.uk.com.view.cmm013.f {

	export module viewmodel {
		import Position = base.Position;
		import RemovePositionCommand = service.model.RemovePositionCommand;

		export class ScreenModel {

			isCreateNew: KnockoutObservable<boolean>;

			positionCode: KnockoutObservable<string>;
			positionName: KnockoutObservable<string>;
			currentCode: KnockoutObservable<string>;

			positionList: KnockoutObservableArray<Position>;
			positionColumns: KnockoutObservableArray<any>;

			enable_input_positionCode: KnockoutObservable<boolean>;


			constructor() {
				let self = this;

				self.isCreateNew = ko.observable(false);

				self.positionList = ko.observableArray([]);
				self.positionCode = ko.observable("");
				self.positionName = ko.observable("");

				self.enable_input_positionCode = ko.observable(null);
				self.currentCode = ko.observable(null);

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


			startPage(): JQueryPromise<any> {
				let self = this;
				let dfd = $.Deferred<void>();

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


			public select(selectedCode: string): void {
				let self = this;

				if (selectedCode) {
					self.positionCode(selectedCode);
					self.isCreateNew(false);
					self.enable_input_positionCode(false);

					// Find position by position code
					service.findByPositionCode(selectedCode)
						.done((data: Position) => {
							if (data) {
								self.positionName(data.positionName);
								// Set focus on position name input
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
				} else {
					// No position selected, switch to create new
					self.isCreateNew(true);
				}
			}


			// create new position mode
			public createNewPositionMode(): void {
				let self = this;
				self.isCreateNew(true);
				self.enable_input_positionCode(true);
				self.positionCode("");
				self.positionName("");
				$('#position-code').focus();
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


			// add new position
			public addPosition(newPosition: Position): void {
				let self = this;

				service.addPosition(newPosition)
					.done((data: any) => {
						// add new position into list in UI
						self.positionList().push(newPosition);
						nts.uk.ui.dialog.info("データが正常に登録されました");
						self.positionCode("");
						self.positionName("");
					})
					.fail((res: any) => {
						nts.uk.ui.dialog.alert("登録に失敗しました! データはすでに存在します");
						self.showMessageError(res);
					})
			}


			// update position
			// public updatePosition(updateCommand: UpdatePositionCommand): JQueryPromise<any> {
			public updatePosition(position: Position): JQueryPromise<any> {
				let self = this;
				let dfd = $.Deferred<any>();

				service.updatePosition(position)
					.done((data: any) => {
						self.loadPositionList()
							.done((data: Position[]) => {
								self.positionList(data);
								nts.uk.ui.dialog.info("データは正常に更新されました");
							})
							.fail((res: any) => {
								self.positionList([]);
							})
					})
					.fail((res: any) => {
						self.showMessageError(res);
					})

				dfd.resolve();
				return dfd.promise();
			}


			// save position
			public save(): void {
				let self = this;

				// Validate
				if (!self.validate()) {
					return;
				}
				
				let position = new Position(self.positionCode(), self.positionName(), 0);
				
				if (self.isCreateNew()) {
					self.addPosition(position);
				} else {
					self.updatePosition(position);
				}

				self.updatePositionOrder()
					.done((data: any) => {

					})
					.fail((res: any) => {
						self.showMessageError(res);
					});
			}


			// remove position
			public remove(): void {
				let self = this;

				if (self.positionCode() !== "") {
					let currentIndex: number;

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
								})
								.fail((res: any) => {
									self.showMessageError(res);
								})
						});
				}

				self.updatePositionOrder()
					.done((data: any) => {

					})
					.fail((res: any) => {
						self.showMessageError(res);
					});
			}

			
			// update position order
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

				service.updateOrder(positionList)
					.done((data: any) => {
						self.loadPositionList()
							.done((data: Position[]) => {
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


			public showMessageError(res: any): void {
				
			}

		}
	}
}

