module nts.uk.com.view.cmf001.d {
	import ajax = nts.uk.request.ajax;
	import close = nts.uk.ui.windows.close;
	import setShared = nts.uk.ui.windows.setShared;
	import getShared = nts.uk.ui.windows.getShared;
	import alert = nts.uk.ui.dialog.alert;
	
	export module viewmodel {
		@bean()
		export class ScreenModel {

			// リストに表示する選択可能な項目
			selectablItemList: KnockoutObservableArray<SelectableItem> = ko.observableArray([]);

			// リストで選択中の項目
			selectingItems: KnockoutObservableArray<number> = ko.observableArray([]);

			// 既に選択済みの項目（親画面から渡される）
			selectedItems: KnockoutObservableArray<number> = ko.observableArray([]);


			listColumns: KnockoutObservableArray<any> = ko.observableArray([
				{ headerText: "NO", 				key: "itemNo",		 		width: 50, hidden: true	},
				{ headerText: "名称", 			key: "itemName", 			width: 200 	},
				{ headerText: "項目型", 		key: "itemType", 			width: 75 	},
				{ headerText: "必須", 			key: "required", 			width: 25, hidden: true	},
			]);

			constructor() {
				let self = this;
				var params = getShared('CMF001DParams');
				self.selectablItemList = ko.observableArray<SelectableItem>([]);
				self.getSelectableItem(params.domainId);
				self.selectedItems(params.selectedItems.map(n => Number(n)));
			}	

			getSelectableItem(domainId: string){
				let self = this;
				let dfd = $.Deferred<any>();
				ajax('com', "screen/com/cmf/cmf001/b/get/importableitem/" + domainId)
					.done((lstData: Array<viewmodel.SelectableItem>) => {
						let selecteds: any[] = self.selectedItems();
						let selectables = _(lstData)
							.filter(e => selecteds.indexOf(e.itemNo) === -1)  // selectedsに存在しない項目のみ
							.orderBy(['itemNo'], ['asc'])
							.value();
						self.selectablItemList(selectables);
					});
				return dfd.promise();
			}

			decide(): void {
				let self = this;
				if(self.selectingItems().length == 0) {
					alert({ messageId: "項目が選択されていません。" });
					return;
				}
				setShared('CMF001DOutput', self.selectingItems());
				close();
			}

			cancel(): void {
				setShared('CMF001DCancel', true);
				close();
			}
		}

		export class SelectableItem {
			itemNo: number;
			itemName: string;
			required: boolean;
			itemType: string;

			constructor(itemNo: number, itemName: string, itemType: string, required: boolean) {
					this.itemNo = itemNo;
					this.itemName = itemName;
					this.required = required;
					this.itemType = itemType;
			}
		}
	}
}