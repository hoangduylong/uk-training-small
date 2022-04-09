module nts.uk.com.view.cmm013.f {

	export module viewmodel {

		import Position = base.Position;
		export class ScreenModel {

			createNew: KnockoutObservable<boolean>;

			positionList: KnockoutObservableArray<Position>;
			selectedPositionCode: KnockoutObservable<string> = ko.observable("");;
			positionCode: KnockoutObservable<string> = ko.observable("");
			positionName: KnockoutObservable<string> = ko.observable("");
			order: KnockoutObservable<number>;
			index: number;

			constructor() {
				let self = this;

				self.createNew = ko.observable(null);

				self.positionList = ko.observableArray([]);
				self.positionCode = ko.observable("");
				self.positionName = ko.observable("");
				self.order = ko.observable(0);

				self.index = 0;
			}


			startPage(): JQueryPromise<any> {
				let self = this;
				
				self.selectedRow();

				let dfd = $.Deferred<any>();
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

				return dfd.promise();;
			}


			/* load position list */
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


			/* create new position */
			public createNewPositionMode(): void {
				let self = this;
				self.createNew(true);
				self.positionCode("");
				self.positionName("");
			}


			/* save position */
			public save(): void {
				let self = this;

				// Validate
				if (!self.validate()) {
					return;
				}

				/*let newPosition: Position = new Position(self.positionCode(), self.positionName(), self.order());

				if (self.createNew()) {
					service.addPosition(newPosition)
						.done((data: any) => {
							self.positionList().push(newPosition);
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
						});

				} else {
					service.updatePosition(newPosition);
				}

				self.updatePositionOrder()
					.done((data: any) => {

					})
					.fail((res: any) => {
						self.showMessageError(res);
					});*/
			}


			/* remove position */
			public remove(): void {
				let self = this;

				if (self.positionCode() !== "") {
					let currentIndex: number = null;
					for (let item of self.positionList()) {
						if (item.positionCode === self.positionCode()) {
							currentIndex = self.positionList.indexOf(item);
						}
					}

					nts.uk.ui.dialog.confirm({ messageId: "Msg_18" })
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
						});
				}
			}


			/* close dialog */
			public close(): void {
				nts.uk.ui.windows.close();
			}


			/* validate */
			private validate(): any {
				// clear error
				nts.uk.ui.errors.clearAll();
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
				// check error business exception
				if (!res.businessException) {
					return;
				}

				// show error message
				if (Array.isArray(res.errors)) {
					// nts.uk.ui.dialog.bundledErrors(res);
				} else {
					// nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds });
				}
			}



			/*let index: any;*/
			public selectedRow(): void {
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
			}




		}
	}
}