module nts.uk.ui.tabpanel.viewmodel {

	@bean()
	export class ScreenModel extends ko.ViewModel {

		tabs: KnockoutObservableArray<NtsTabPanelModel>;
		selectedTab: KnockoutObservable<string>;
		tabs2: KnockoutObservableArray<NtsTabPanelModel>;
		selectedTab2: KnockoutObservable<string>;

		items: KnockoutObservableArray<ItemModel>;
		columns: KnockoutObservableArray<NtsGridListColumn>;
		currentCode: KnockoutObservable<any>;
		currentCodeList: KnockoutObservableArray<any>;

		commonAmount: KnockoutObservable<number>;

		direction: KnockoutObservable<string> = ko.observable('vertical');

		constructor() {
			super();

			var self = this;
			self.tabs = ko.observableArray([
				{ id: 'tab-1', title: 'Tab Title 1', content: '.tab-content-1', icon: 'LIST_PLUS', enable: ko.observable(true), visible: ko.observable(true) },
				{ id: 'tab-2', title: 'Tab Title 2', content: '.tab-content-2', icon: 'LIST_PLUS', enable: ko.observable(true), visible: ko.observable(true) },
				{ id: 'tab-3', title: 'Tab Title 3', content: '.tab-content-3', icon: 'LIST_PLUS', enable: ko.observable(true), visible: ko.observable(true) },
				{ id: 'tab-4', title: 'Tab Title 4', content: '.tab-content-4', icon: 'LIST_PLUS', enable: ko.observable(true), visible: ko.observable(true) }
			]);
			self.selectedTab = ko.observable('tab-1');
			self.tabs2 = ko.observableArray([
				{ id: 'x-tab-1', title: 'Tab Title 1', content: '.x-tab-content-1'  },
				{ id: 'x-tab-2', title: 'Tab Title 2', content: '.x-tab-content-2', enable: ko.observable(false)  },
				{ id: 'x-tab-3', title: 'Tab Title 3', content: '.x-tab-content-3', visible: ko.observable(true) },
				{ id: 'x-tab-4', title: 'Tab Title 4', content: '.x-tab-content-4', enable: ko.observable(true), visible: ko.observable(true) }
			]);
			self.selectedTab2 = ko.observable('x-tab-2');

			self.items = ko.observableArray([]);
			for (let i = 1; i < 5; i++) {
				self.items.push(new ItemModel('00' + i, '基本給', "description " + i, i % 3 === 0, "2010/1/1"));
			}
			self.columns = ko.observableArray([
				{ headerText: 'コード', key: 'code', width: 125 },
				{ headerText: '名称', key: 'name', width: 125 },
				{ headerText: '説明', key: 'description', width: 125 },
				{ headerText: '説明1', key: 'other1', width: 125 },
				{ headerText: '説明2', key: 'other2', width: 125, isDateColumn: true, format: 'YYYY/MM/DD' }
			]);
			self.currentCode = ko.observable("001");
			self.currentCodeList = ko.observableArray([]);

			$("#grid").igGrid({
				dataSource: self.items(),
				primaryKey: 'code',
				width: undefined,
				height: '350px',
				columns: self.columns(),
				virtualization: true,
				virtualizationMode: 'continuous',
				features: [
					{ name: 'Selection', multipleSelection: true },
					{ name: 'RowSelectors', enableCheckBoxes: true, enableRowNumbering: false }
				]
			});

			self.commonAmount = ko.observable(10);
		}

		created() {
			const vm = this;

			_.extend(window, { vm });
		}
	}

	class ItemModel {
		code: string;
		name: string;
		description: string;
		other1: string;
		other2: string;
		deletable: boolean;

		constructor(code: string, name: string, description: string, deletable: boolean, other1?: string, other2?: string) {
			this.code = code;
			this.name = name;
			this.description = description;
			this.other1 = other1;
			this.other2 = other2 || other1;
			this.deletable = deletable;
		}
	}
}