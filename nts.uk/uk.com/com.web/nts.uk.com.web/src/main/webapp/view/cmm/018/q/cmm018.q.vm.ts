module nts.uk.com.view.cmm018.q.viewmodel {
	@bean()
	export class Cmm018QViewModel extends ko.ViewModel{
		param: PARAM = new PARAM();
		model: CheckBoxModel = new CheckBoxModel();
		dataSource: SettingUseUnitDto;
	    created(params: any) {
	        // data transfer from parent view call modal
			const self = this;
			self.param = params;		
			self.dataFetch();
	    }
		mounted() {
			const self = this;
			$('#q2_1').focus();
		}
		closeModal() {
		    const self = this;
		    self.$window.close({
		        // data return to parent
		    });
	    }
		
		register() {
			console.log('register');
			const self = this;
			self.$blockui("show");
			let companyId = self.$user.companyId;;
			let checkCommand = {} as ApproverRegisterSetDto;
			checkCommand.companyUnit = ko.toJS(self.model.companyUnit);
			checkCommand.workplaceUnit = ko.toJS(self.model.workPlaceUnit);
			checkCommand.employeeUnit = ko.toJS(self.model.personUnit);
			checkCommand.companyId = companyId;
			
			self.$ajax(API.checkRegister, checkCommand)
				.then((res) => {
					let registerCommand = self.dataSource;
					if (self.param.systemAtr == SystemAtr.EMPLOYMENT) {
						let approverSet = self.dataSource.approvalSetting.approverSet;
						let approvalSetting = registerCommand.approvalSetting;
						approvalSetting.companyId = companyId;
						if (registerCommand.mode) {
							approvalSetting.prinFlg = 0;						
						}
						approverSet.companyId = companyId;
						approverSet.companyUnit = ko.toJS(self.model.companyUnit) ? 1 : 0;
						approverSet.workplaceUnit = ko.toJS(self.model.workPlaceUnit) ? 1 : 0;
						approverSet.employeeUnit = ko.toJS(self.model.personUnit) ? 1 : 0;
					} else {
						let hrApprovalRouteSetting = self.dataSource.hrApprovalRouteSetting;
						hrApprovalRouteSetting.cid = companyId;
						hrApprovalRouteSetting.comMode = ko.toJS(self.model.companyUnit);
						hrApprovalRouteSetting.devMode = ko.toJS(self.model.workPlaceUnit);
						hrApprovalRouteSetting.empMode = ko.toJS(self.model.personUnit);
					}
					return self.$ajax(API.register, registerCommand);
				}).done(res => {
					self.$dialog.info( { messageId: "Msg_15" } ).then(() => {
                    	self.closeModal();
                	}); 
				}).fail((res) => {
					self.showError(res);
				}).always(() => {
					self.$blockui("hide");
				});		
			
		}
		
		
		dataFetch() {
			const self = this;
			self.$blockui("show");
			let startQCommand = {} as StartQCommand;
			startQCommand.companyId = self.$user.companyId;
			startQCommand.systemAtr = self.param.systemAtr;
			self.$ajax(API.getSetting, startQCommand)
				.done(res => {
					self.dataSource = res as SettingUseUnitDto;
					if (self.param.systemAtr == SystemAtr.EMPLOYMENT) {
						if (!self.dataSource.mode) {
							let approverSet = self.dataSource.approvalSetting.approverSet;
							self.model.changeValue(approverSet.companyUnit == 1, approverSet.workplaceUnit == 1, approverSet.employeeUnit == 1);
						} else {
							self.dataSource.approvalSetting = {} as ApprovalSettingDto;
							self.dataSource.approvalSetting.approverSet = {} as ApproverRegisterSetDto;
						}
						
					} else {
						// HUMAN_RESOURCE
						if (!self.dataSource.mode) {
							let hrApprovalRouteSetting = self.dataSource.hrApprovalRouteSetting;
							self.model.changeValue(hrApprovalRouteSetting.comMode, hrApprovalRouteSetting.devMode, hrApprovalRouteSetting.empMode);
						} else {
							self.dataSource.hrApprovalRouteSetting = {} as HrApprovalRouteSettingWFDto;
						}
						
					}
				}).fail(res => {
					self.showError(res);
				}).always(() => {
					self.$blockui("hide");
				})
			
		}
		
		showError(res: any) {
	        const self = this;
	        if (res) {
	            let  param = {
	                     messageId: res.messageId,
	                     messageParams: res.parameterIds
	             }
	            self.$dialog.error(param);
	         }
    	}
	}
	
	class PARAM {
		public systemAtr: number = 0;
	}
	class SettingUseUnitDto {
		public mode: boolean;
		public approvalSetting: ApprovalSettingDto;
		public hrApprovalRouteSetting: HrApprovalRouteSettingWFDto;
	}
	class ApprovalSettingDto {
		public companyId: string;
		public prinFlg: number
		public approverSet: ApproverRegisterSetDto;
	}
	class ApproverRegisterSetDto {
		public companyId?: string;
		public companyUnit: number;
		public workplaceUnit: number;
		public employeeUnit: number;
	}
	class HrApprovalRouteSettingWFDto {
		public comMode: boolean;
		public cid: string;
		public empMode: boolean;
		public devMode: boolean;
	}
	class RegisterCommand {
		
	}
	class StartQCommand {
		
		public companyId: string;
		
		public systemAtr: number;
	}
	class CheckBoxModel {
		
		public companyUnit: KnockoutObservable<Boolean> = ko.observable(true);
		
		public workPlaceUnit: KnockoutObservable<Boolean> = ko.observable(false);
		
		public personUnit: KnockoutObservable<Boolean> = ko.observable(false);
		
		public changeValue(companyUnit: boolean, workPlaceUnit: boolean, personUnit: boolean) {
			this.companyUnit(companyUnit);
			this.workPlaceUnit(workPlaceUnit);
			this.personUnit(personUnit);
		}
	}
	const SystemAtr = {
		EMPLOYMENT: 0,
		HUMAN_RESOURSE: 1
	}
	const API = {
		getSetting: 'workflow/approvermanagement/workroot/appSetQ',
		checkRegister: 'workflow/approvermanagement/workroot/checkRegisterQ',
		register: 'workflow/approvermanagement/workroot/registerQ'
	}
	
}