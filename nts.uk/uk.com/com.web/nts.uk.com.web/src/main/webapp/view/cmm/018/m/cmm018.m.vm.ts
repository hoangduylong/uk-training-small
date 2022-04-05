module nts.uk.com.view.cmm018.m {
	import block = nts.uk.ui.block;
	import vmbase = cmm018.shr.vmbase;
	import servicebase = cmm018.shr.servicebase;
	import getText = nts.uk.resource.getText;
    export module viewmodel {
        export class ScreenModel {
            isCompany: KnockoutObservable<Boolean> = ko.observable(false);
            isWorkplace: KnockoutObservable<Boolean> = ko.observable(false);
            isPerson: KnockoutObservable<Boolean> = ko.observable(false);            
            date: KnockoutObservable<Date> = ko.observable(moment(new Date()).toDate());
            sysAtr: KnockoutObservable<number> = ko.observable(0);
			sv: SettingVisible = new SettingVisible();
			lstNameAppType: KnockoutObservableArray<vmbase.ApplicationType>;
            constructor(params: any) {
                let self = this; 
                let param = nts.uk.ui.windows.getShared('CMM018M_PARAM');
                self.sysAtr(param.sysAtr || 0);
                // self.lstAppName = param.lstName || [];
				self.start();
            }
			start() {
				const self = this;
				block.invisible();
				let companyId = __viewContext.user.companyId;
				let command = {
					systemAtr: ko.toJS(self.sysAtr),
					companyId
				}
				// Refactor5 ver10 CMM018
				service.getSetting(command)
					   .then((res: ApproverRegisterSetDto) => {
							self.sv.changeValue(res.companyUnit == 1, res.workplaceUnit == 1, res.employeeUnit == 1);
							self.setUnit(res);
							return self.getAppDis();
					   }).done((res: any) => {
							block.clear();
						})
					   .fail((res: any) => {
							nts.uk.ui.dialog.alert({ messageId: res.messageId || res.message});
							block.clear();
						});
			}
			findName(lstName: any, appType: any){
                return _.find(lstName, (name: any) =>{
                            return name.value == appType;
                        });
            }
			
			// Refactor5 利用している申請承認ルート
			// UKDesign.ドメインモデル."NittsuSystem.UniversalK".ワークフロー.承認設定.アルゴリズム.利用している申請承認ルート
            getAppDis(): JQueryPromise<any>{
                let dfd = $.Deferred();
                let self = this;
                let tab = 0;
                if(!(ko.toJS(self.isCompany) && !ko.toJS(self.isWorkplace))){
                    tab = 2;
                }else if(ko.toJS(self.isCompany)){
                    tab = 0;
                }else{
                    tab = 1;
                }
                let param = {tab: tab, workplaceID: '', employeeId: ''};
                if(self.sysAtr() == vmbase.SystemAtr.WORK){//就業
                    servicebase.setAppUseKaf022(param).done(function(lstUse: Array<any>){
                        self.lstNameAppType = ko.observableArray([]);
                        servicebase.getNameAppType().done(function(lstName){
                           _.each(lstUse, function(item){
							   // refactor5 remove 36 application
                               if(item.useAtr == 1){
                                   self.lstNameAppType.push(new vmbase.ApplicationType(item.appType, 
                                                self.findName(lstName, item.appType).localizedName, 1, null));
                               }
                            });
                            self.lstNameAppType.push(new vmbase.ApplicationType(0, getText('CMM018_107'), 2, null));
                            self.lstNameAppType.push(new vmbase.ApplicationType(1, getText('CMM018_108'), 2, null));
 
                            dfd.resolve(); 
                        });
                    });
                }else{//人事
                    servicebase.settingJnh011().done(function(lstNotice: Array<any>){
                        servicebase.settingJmm018().done(function(lstEvent: Array<any>){
						   self.lstNameAppType = ko.observableArray([]);
//                                /**届出*/
//                                NOTICE(4),
//                                /**各業務エベント*/
//                                BUS_EVENT(5);
                           _.each(lstNotice, function(notice){
                               self.lstNameAppType.push(new vmbase.ApplicationType(notice.reportClsId.toString(),
                                         notice.reportName, 4, notice.noRankOrder));
                            });
                            _.each(lstEvent, function(event){
                               self.lstNameAppType.push(new vmbase.ApplicationType(event.programId,
                                        event.programName, 5, event.noRankOrder == 1 ? true : false));
                            });
                            dfd.resolve(); 
                        });
                    });
                }
                return dfd.promise();
            }
			
			setUnit(param: ApproverRegisterSetDto) {
				const self = this;
				self.isCompany(param.companyUnit == 1);
				self.isWorkplace(param.workplaceUnit == 1);
				self.isPerson(param.employeeUnit == 1);
			}
            //閉じるボタン
            closeDialog(){
                nts.uk.ui.windows.close();
            }
            
            printExcel(){
                if (nts.uk.ui.errors.hasError()) { return; }
                let self = this;
                //会社別、職場別、個人別のチェック状態をチェックする(kiểm tra trạng thái check của 会社別、職場別、個人別)
                //１件もチェック入れていない場合(không check cái nào)
                if(!self.isCompany() && !self.isWorkplace() && !self.isPerson()){
                    nts.uk.ui.dialog.alert({ messageId: "Msg_199"});
                    return;    
                }
                let master = new service.MasterApproverRootQuery(self.date(), ko.toJS(self.isCompany), 
                        ko.toJS(self.isWorkplace), ko.toJS(self.isPerson), self.sysAtr(), ko.toJS(self.lstNameAppType));
                block.grayout();
                service.saveAsExcel(master).done(function(data: service.MasterApproverRootQuery){
                    block.clear();
                }).fail(function(res: any){
                    nts.uk.ui.dialog.alert({ messageId: res.messageId});  
                    block.clear();                      
                });
            }
        }
		class SettingVisible {
			isCompany: KnockoutObservable<Boolean> = ko.observable(false);
			isWorkplace: KnockoutObservable<Boolean> = ko.observable(false);
			isPerson: KnockoutObservable<Boolean> = ko.observable(false);
			changeValue(isCompany: Boolean, isWorkplace: Boolean, isPerson: Boolean) {
				this.isCompany(isCompany);
				this.isWorkplace(isWorkplace);
				this.isPerson(isPerson);
			}
		}
        interface ApproverRegisterSetDto {
			companyUnit: number;
			workplaceUnit: number;
			employeeUnit: number;
		}
        
    }
}
