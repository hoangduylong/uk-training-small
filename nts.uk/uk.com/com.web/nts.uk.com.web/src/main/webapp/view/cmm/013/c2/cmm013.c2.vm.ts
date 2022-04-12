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
					{ headerText: 'コード', key: 'positionCode', width: 80 },
					{ headerText: '名称', key: 'positionName', width: 140 }
				]);
				// self.loadPositionList2();
			}

			private loadPositionList2(): void {
				let self = this;

				for (var i = 0; i < 20; i++) {
					self.positionList.push(new Position("" + i, "基本給" + i, 0));
				}
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

            /**
             * Start page
             */
			public startPage(): JQueryPromise<any> {
				let dfd = $.Deferred<any>();

				this.loadPositionList()
					.done((data: Position[]) => {
						// Update position mode
						// this.isCreateNew(false);
						this.positionList(data);
					})
					.fail((res: any) => {
						// Create new position mode
						console.log("fail");
						//self.isCreateNew(true);
						this.positionList([]);
					})

				dfd.resolve();
				return dfd.promise();
			}

            /**
             * Execution
             */
			public execution(): void {
				let self = this;
				if (!self.currentCode()) {
					nts.uk.ui.dialog.error("名称を選んでください");
					return;
				}

				self.positionCode(self.currentCode());
				let selectedItem = self.positionList().filter(item => {
					return item.positionCode == self.positionCode()
				})

				let transferObj: any = {
					positionCode: selectedItem[0].positionCode,
					positionName: selectedItem[0].positionName
				};

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