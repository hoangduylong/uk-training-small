module nts.uk.com.view.cmm013.b {

	export module viewmodel {

		import Position = base.Position;
		export class ScreenModel {

			createNew: KnockoutObservable<boolean>;

			positionList: KnockoutObservableArray<Position>;
			positionCode: KnockoutObservable<string>;
			positionName: KnockoutObservable<string>;
			order: KnockoutObservable<number>;


			constructor() {
				let self = this;

				self.createNew = ko.observable(null);

				self.positionList = ko.observableArray([]);
				self.positionCode = ko.observable("");
				self.positionName = ko.observable("");
				self.order = ko.observable(0);

				/*// Khi thay đổi code
				self.positionCode.subscribe((value) => {

				})*/
			}


			startPage(): JQueryPromise<any> {
				let self = this;

				let dfd = $.Deferred<any>();
				self.loadPositionList()
					.done((data: Position[]) => {
						// Update position mode
						self.createNew(false);
						self.positionList(data);
					})
					.fail((res: any) => {
						// Create new position mode
						dfd.reject(res);
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


			// /* create new position */
			// public createNewPosition(): void {
			// 	let self = this;
			// 	self.createNew(true);
			// 	self.positionCode("");
			// 	self.positionName("");
			// }

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

					self.positionList.splice(currentIndex, 1);

					nts.uk.ui.dialog.confirm({ messageId: "Msg_18" })
						.ifYes(() => {
							
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


			private execution(): JQueryPromise<any> {
				let self = this;
				let dfd = $.Deferred<any>();
				let positionList: any[] = self.positionList();

				// service.updateOrder(positionList)
				// 	.done((data: any) => {
				// 		dfd.resolve(data);
				// 	})
				// 	.fail((res: any) => {
				// 		dfd.reject(res);
				// 	});

				return dfd.promise();
			}




		}
	}
}