module nts.uk.com.view.cmm018.x.viewmodel {
	@bean()
	export class Cmm018XViewModel extends ko.ViewModel {
		systemAtr: KnockoutObservable<number> = ko.observable(SystemAtr.EMPLOYMENT);
		created() {
			const self = this;
			let url = $(location).attr('search');
            let urlParam: number = url.split("=")[1];
			self.systemAtr(urlParam || SystemAtr.EMPLOYMENT);
		}
		mounted() {
			$('#btnM').focus();
		}

		openDialogQ() {
			console.log('openDialogQ');
			const self = this;
			let param = {
				systemAtr: ko.toJS(self.systemAtr)
			}
			self.$window
				.modal('com', '/view/cmm/018/q/index.xhtml', param)
				.then((result: any) => {
					// bussiness logic after modal closed
					// location.reload();
				});
		}
		jumpToA() {
			const self = this;
			self.$jump('com', '/view/cmm/018/a/index.xhtml', ko.toJS(self.systemAtr));

		}
		jumpToCmm013H() {	
			const self = this;
			self.$window
				.modal('com', '/view/cmm/013/h/index.xhtml', {})
				.then((result: any) => {
					// bussiness logic after modal closed
					// location.reload();
				});
		}
		openDialogM() {
			const self = this;
			let param = {
				sysAtr: ko.toJS(self.systemAtr)
			}
			
			self.$window.storage('CMM018M_PARAM', param)
			.then(() => self.$window.modal('com', '/view/cmm/018/m/index.xhtml'))
			.then((result: any) => {
				// bussiness logic after modal closed
			});
		}
		
	}
	export const SystemAtr = {
		EMPLOYMENT: 0,
		HUMAN_RESOURSE: 1
	}
	export const MODE_SYSTEM = 'SYSTEM_MODE';

}