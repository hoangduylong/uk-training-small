/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />

module nts.uk.com.view.cmm024.d {
	import common = nts.uk.com.view.cmm024.a.common;
	import HistoryUpdate = common.HistoryUpdate;
	import ScheduleHistoryDto = common.ScheduleHistoryDto;
	import ScheduleHistoryModel = common.ScheduleHistoryModel;

	@bean()
	class ViewModel extends ko.ViewModel {

		registrationHistory: KnockoutObservableArray<any> = ko.observableArray([]);
		registrationHistoryType: KnockoutObservable<number> = ko.observable(0);
		allowStartDate: KnockoutObservable<Date> = ko.observable(moment(new Date()).toDate());
		newStartDate: KnockoutObservable<Date> = ko.observable(moment(new Date()).toDate());
		newEndDate: KnockoutObservable<Date> = ko.observable(moment(new Date()).toDate());
		//set & get Share
		newScheduleHistory: KnockoutObservable<ScheduleHistoryDto> = ko.observable(null);
		enableDatePicker: KnockoutObservable<boolean> = ko.observable(true);
		scheduleHistoryModel: KnockoutObservable<ScheduleHistoryModel> = ko.observable(null);

		constructor(params: any) {
			// start point of object
			super();

			let vm = this;
			vm.registrationHistory.push({ id: HistoryUpdate.HISTORY_DELETE, name: vm.$i18n('CMM024_33') });
			vm.registrationHistory.push({ id: HistoryUpdate.HISTORY_EDIT, name: vm.$i18n('CMM024_34') });
		}

		created(params: any) {
			// start point of object
			let vm = this;
		}

		mounted() {
			// raise event when view initial success full
			let vm = this;

			//get value from parent form
			vm.newEndDate(moment(common.END_DATE, 'YYYY/MM/DD').toDate());
			vm.registrationHistoryType(HistoryUpdate.HISTORY_EDIT);
			$('.ntsDatepicker').focus();

			vm.registrationHistoryType.subscribe((value) => {
				vm.enableDatePicker(value !== 0);
			})

			vm.$window.storage('CMM024_D_INPUT').then((data: ScheduleHistoryModel) => {
				if (data) {
					vm.scheduleHistoryModel(data); //getShared
					vm.newStartDate(moment(data.scheduleHistoryUpdate.startDate).toDate());

					let allowStartDate: Date = null;
					allowStartDate = moment(vm.scheduleHistoryModel().allowStartDate).toDate();
					//there is one item in the history period list
					if (_.isNil(vm.scheduleHistoryModel().allowStartDate)) {
						allowStartDate = moment(data.scheduleHistoryUpdate.startDate).toDate();
					}
					vm.allowStartDate(allowStartDate);
				}
			});
		}

		/**
		 * Process
		 * */
		proceed() {
			let vm = this;
			if (!nts.uk.ui.errors.hasError()) {
				let stDate: Date = vm.newStartDate(), //開始年月日テキストボックス -> A2_6, B2_6
					endDate: Date = vm.newEndDate(),
					allowDate: Date = vm.allowStartDate();

				let dataModel = vm.scheduleHistoryModel();
				let isBefore = moment(stDate).format('YYYYMMDD') <= moment(allowDate).format('YYYYMMDD');

				if (isBefore && vm.registrationHistoryType() === common.HistoryUpdate.HISTORY_EDIT) {
					let oldDate: string = moment(allowDate, 'YYYY/MM/DD').format('YYYY/MM/DD');
					vm.$dialog.error({ messageId: "Msg_156", messageParams: [oldDate] }).then(() => {
						$('.ntsDatepicker').focus();
					});					
					return;
				}


				let status = false,
					params: any = {
						companyId: dataModel.workPlaceCompanyId,
						workPlaceId: dataModel.workPlaceCompanyId,
						startDate: moment.utc(dataModel.scheduleHistoryUpdate.startDate, 'YYYY-MM-DD'),
						endDate: moment.utc(dataModel.scheduleHistoryUpdate.endDate, 'YYYY-MM-DD'),
						startDateBeforeChange: null,
						screen: dataModel.screen
					};

				if (vm.registrationHistoryType() == common.HistoryUpdate.HISTORY_DELETE) {
					vm.$dialog.confirm({ messageId: 'Msg_18' }).then((result: string) => {
						if (result === 'yes') {
							vm.deleteScheduleHistory(params);
							vm.$window.storage("CMM024_D_RESULT", {
								newScheduleHistory: null,
								RegistrationHistoryType: vm.registrationHistoryType(),
								status: true
							});
						}
					});
				} else {

					params.startDate = moment.utc(vm.newStartDate(), 'YYYY-MM-DD');
					params.endDate = moment.utc(vm.newEndDate(), 'YYYY-MM-DD');
					params.startDateBeforeChange = moment.utc(dataModel.scheduleHistoryUpdate.startDate, 'YYYY-MM-DD');

					status = vm.updateScheduleHistory(params);

					vm.$window.storage("CMM024_D_RESULT", {
						newScheduleHistory: {
							startDate: moment(vm.newStartDate()).format("YYYY/MM/DD"),
							newEndDate: moment(vm.newStartDate()).subtract(1, "days").format("YYYY/MM/DD")
						},
						RegistrationHistoryType: vm.registrationHistoryType(),
						status: status
					});
				}
				return false;
			}
		}

		/**
		 * Cancel and close window
		 * */
		cancel() {
			let vm = this;
			vm.$window.storage("CMM024_D_RESULT", null);
			vm.$window.close();
			return false;
		}

		initScheduleHistory() {
			let vm = this;
		}

		/**
		 *  Delete a schedule history of company / workplace
		 * params {
		 * @companyId / @workplaceId string : 会社ID / 職場ID
		 * @startDate date : 期間
		 * @endDate date : 期間	
		 * }
		 */
		deleteScheduleHistory(params: any) {
			let vm = this;

			switch (params.screen) {
				case 'A':
					vm.$blockui('show');					
					vm.$ajax('at', common.CMM024_API.screenD_DeleteScheduleHistoryByCompany, params)
						.done((response) => {
							vm.$dialog.info({ messageId: 'Msg_16' }).then(() => {
								vm.$window.close();
								vm.$blockui('hide');
							});
						})
						.fail((error) => {
							vm.$dialog.info({ messageId: error.messageId }).then(() => {
								vm.$blockui('hide');
							});
						})
						.always(() => vm.$blockui('hide'));
					break;

				case 'B':
					vm.$blockui('show');					
					vm.$ajax('at', common.CMM024_API.screenD_DeleteScheduleHistoryByWorkplace, params)
						.done((response) => {
							vm.$dialog.info({ messageId: 'Msg_16' }).then(() => {
								vm.$window.close();
								vm.$blockui('hide');
							});
						})
						.fail((error) => {
							vm.$dialog.info({ messageId: error.messageId }).then(() => {
								vm.$blockui('hide');
							});
						})
						.always(() => vm.$blockui('hide'));
					break;
			}
		}

		/**
		 * update a schedule history
		 * params {
		 * @companyId / @workplaceId string : 会社ID / 職場ID
		 * @startDate date : 期間
		 * @endDate date : 期間	
		 * @startDateBeforeChange : 期間
		 * }
		 */
		updateScheduleHistory(params: any) {
			let vm = this,
				status: boolean = false;

			vm.$blockui('show');
			switch (params.screen) {
				case 'A':					
					vm.$ajax('at', common.CMM024_API.screenD_UpdateScheduleHistoryByCompany, params)
						.done((response) => {
							vm.$dialog.info({ messageId: 'Msg_15' }).then(() => {
								status = true;
								vm.$blockui('hide');
								vm.$window.close();
							});
						})
						.fail(() => vm.$blockui('hide'))
						.always(() => vm.$blockui('hide'));
					break;

				case 'B':					
					vm.$ajax('at', common.CMM024_API.screenD_UpdateScheduleHistoryByWorkplace, params)
						.done((response) => {
							vm.$dialog.info({ messageId: 'Msg_15' }).then(() => {
								status = true;
								vm.$blockui('hide');
								vm.$window.close();
							});
						})
						.fail(() => vm.$blockui('hide'))
						.always(() => vm.$blockui('hide'));
					break;
			}

			return status;
		}
	}
}