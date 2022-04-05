/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />

module nts.uk.com.view.cmm024.f {

	import common = nts.uk.com.view.cmm024.a.common;
	import EmployeeDto = common.EmployeeDto;
	import TreeComponentOption = kcp.share.tree.TreeComponentOption;
	import StartMode = kcp.share.tree.StartMode;
	import SelectType = kcp.share.tree.SelectionType;
	import UnitAlreadySettingModel = kcp.share.tree.UnitAlreadySettingModel;
	import SystemType = kcp.share.tree.SystemType;

	@bean()
	class ViewModel extends ko.ViewModel {

		itemsSwap: KnockoutObservableArray<EmployeeDto> = ko.observableArray([]);
		columns: KnockoutObservableArray<nts.uk.ui.NtsGridListColumn>;
		multiSelectedId: KnockoutObservable<any>;
		baseDate: KnockoutObservable<Date>;
		alreadySettingList: KnockoutObservableArray<UnitAlreadySettingModel>;
		treeGrid: TreeComponentOption;
		enableSubmitButton: KnockoutObservable<boolean> = ko.observable(false);
		//getShare & setShare
		workplaceId: KnockoutObservable<string> = ko.observable(null);
		currentCodeListSwap: KnockoutObservableArray<EmployeeDto> = ko.observableArray([]);
		oldCodeListSwap: KnockoutObservableArray<EmployeeDto> = ko.observableArray([]);

		constructor(params: any) {
			// start point of object
			super();
			let vm = this;

			vm.columns = ko.observableArray([
				{ headerText: vm.$i18n('CMM024_50'), key: 'employeeCode', width: 90, formatter: _.escape },
				{ headerText: vm.$i18n('CMM024_51'), key: 'employeeName', width: 150, formatter: _.escape },
				{ headerText: '', key: 'employeeId', hidden: true, formatter: _.escape },
			]);

			vm.baseDate = ko.observable(new Date());
			vm.multiSelectedId = ko.observableArray([]);
			vm.alreadySettingList = ko.observableArray([]);
			vm.treeGrid = {
				isShowAlreadySet: false,
				isMultipleUse: false,
				isMultiSelect: false,
				startMode: StartMode.WORKPLACE,
				selectedId: vm.multiSelectedId,
				baseDate: vm.baseDate,
				selectType: SelectType.SELECT_FIRST_ITEM, //3
				isShowSelectButton: true,
				isDialog: true,
				alreadySettingList: vm.alreadySettingList,
				maxRows: 10,
				tabindex: 1,
				systemType: SystemType.EMPLOYMENT, //2
			};
		}

		created(params: any) {
			// start point of object
			let vm = this;

			vm.enableSubmitButton(false);
		}

		mounted() {
			// raise event when view initial success full
			let vm = this,
				selectType: number = 0;

			vm.$blockui('hide');

			$('#tree-grid').ntsTreeComponent(vm.treeGrid);
			
			//get share
			vm.$window.storage('workPlaceCodeList').then((data) => {

				let codeList: Array<any> = [];
				//remove if employeeCode is null / empty
				data.codeList && data.codeList.map((item: any) => {
					if (!nts.uk.util.isNullOrEmpty(item.employeeCode)
						&& item.employeeCode != '-1') {
						codeList.push(item);
					}
				});

				vm.currentCodeListSwap(codeList);
				vm.oldCodeListSwap(codeList);
			});

			vm.multiSelectedId.subscribe((workplaceId) => {
				if (!nts.uk.util.isNullOrUndefined(workplaceId)) {
					vm.getEmployeesFromCompanyWorkplace(workplaceId);
				}
			});

			vm.currentCodeListSwap.subscribe((value) => {
				vm.enableSubmitButton(value.length > 0);
			})

			$('#single-tree-grid-tree-grid_container').attr('tabindex', 1);
			$('#swap-list-gridArea1').attr('tabindex', 2);
			$('#swap-list-gridArea2').attr('tabindex', 3);
		}


		getEmployeesFromCompanyWorkplace(wpId: string) {

			let vm = this,
				employees: Array<EmployeeDto> = [],
				params = {
					workplaceId: wpId, //職場ID
					baseDate: vm.baseDate //基準日期間
				};

			if (!nts.uk.util.isNullOrEmpty(wpId)) {

				vm.$blockui('show');
				vm.$ajax('at', common.CMM024_API.screenF_GetEmployeesList, ko.toJS(params))
					.done((response) => {
						if (!nts.uk.util.isNullOrEmpty(response)) {
							response.forEach((element) => {
								employees.push(new EmployeeDto(
									element.empCd, element.empName,
									element.empId, element.empId
								)); //'基本給　給本給本'
							});
						}

						//clear emplyees list
						vm.itemsSwap([]);
						let newEmployees = _.orderBy(employees, 'employeeCode', 'asc');
						vm.itemsSwap(newEmployees);
						vm.$blockui('hide');

					})
					.fail(() => vm.$blockui('hide'))
					.always(() => vm.$blockui('hide'));
			}
		}


		/**
		 * Process
		 * */
		proceed() {
			let vm = this;

			if (vm.currentCodeListSwap().length > 5) {
				vm.$dialog.error({ messageId: 'Msg_887' });
				return;
			}

			if (!nts.uk.ui.errors.hasError()) {
				if (vm.multiSelectedId().length > 0) {
					vm.$window.storage('newWorkPlaceCodeList', {
						workplaceId: vm.multiSelectedId()[0],
						codeList: vm.currentCodeListSwap()
					});
				} else
					vm.$window.storage('newWorkPlaceCodeList', null);
				vm.$window.close();
				return false;
			}
		}

		/**
		 * Cancel and close window
		 * */
		cancel() {
			let vm = this;
			vm.$window.storage('newWorkPlaceCodeList', null);
			vm.$window.close();
			return false;
		}
	}
}