module nts.uk.com.view.cmm002.a {
	import block = nts.uk.ui.block;
	import getText = nts.uk.resource.getText;
  import getMessage = nts.uk.resource.getMessage;
    import dialog = nts.uk.ui.dialog;
	import errors = nts.uk.ui.errors;

    export class ViewModel {
        accessLimitUseAtr =  ko.observable(0);
		accessLimitUseAtrList = _.orderBy(__viewContext.enums.NotUseAtr,['value'], ['desc'])
		ipInputTypeList = _.orderBy(__viewContext.enums.IPAddressRegistrationFormat,['value'], ['asc']);
		allowedIPAddressList = ko.observableArray([]);
        allowedIPAddress =  new AllowedIPAddress();
        selectedAllowedIPAddress = ko.observable('');
		columns = ko.observableArray([
                { headerText: getText('CMM002_5'), key: 'id', width: 150 }
		]);
    currentIpText: KnockoutObservable<string> = ko.observable();
    currentIpAddress: AllowedIPAddress = null;;

        constructor() {
            let self = this;
			self.selectedAllowedIPAddress.subscribe(value =>{
				if(value != ""){
					self.allowedIPAddress.update(_.find(self.allowedIPAddressList(), ['id', value]));
					$('input').ntsError('check');
				}else{
					self.allowedIPAddress.update(ko.toJS(new AllowedIPAddress()));
				}
			});
        }

        /** start page */
        public start(): JQueryPromise<void> {
			let self = this;            
            let dfd = $.Deferred<any>();
            self.getData().done(() => {
				if(self.allowedIPAddressList().length != 0){
					self.selectedAllowedIPAddress(self.allowedIPAddressList()[0].id);					
				}
                dfd.resolve();
            }).fail(() => {
                dfd.reject();
            });
            return dfd.promise();
        }

        /** Get Data */
        public getData(): JQueryPromise<void> {
			let self = this;            
            let dfd = $.Deferred<any>();
			block.invisible();
            service.getData().done((data: AccessRestrictions) => {
                self.accessLimitUseAtr(data.accessLimitUseAtr);
				let tg = [];
				_.forEach(data.whiteList, (item) => {
					tg.push(new AllowedIPAddressDto(item));
				});
				self.allowedIPAddressList(_.orderBy(tg, ['startAddress.net1','startAddress.net2','startAddress.host1','startAddress.host2','endAddress.net1','endAddress.net2','endAddress.host1','endAddress.host2'], ['asc','asc','asc','asc','asc','asc','asc','asc']));
        self.currentIpText(nts.uk.text.format(getText("CMM002_13"), data.userIpAddress));
        const ipParts = data.userIpAddress.split('.');
        self.currentIpAddress = new AllowedIPAddress({
          ipInputType: 0,
          startAddress: new IPAddressSetting(ipParts),
          endAddress: undefined,
          comment: undefined
        });
                dfd.resolve();
            }).fail(function(error: any) {
                dfd.reject();
                dialog.alertError({ messageId: error.messageId });
            }).always(() => {
                block.clear();
            });
            return dfd.promise();
        }

		public newIp():void{
			let self = this;
			self.selectedAllowedIPAddress('');
			self.selectedAllowedIPAddress.valueHasMutated();
			errors.clearAll();
		}
		
		public save():void{
			let self = this;
			$('input').ntsError('check');
			if(!errors.hasError()) {
				if(self.selectedAllowedIPAddress() == ''){
					block.invisible();
					let param = {
						accessLimitUseAtr: self.accessLimitUseAtr(),
						allowedIPAddress: ko.toJS(self.allowedIPAddress),
            ipAddressToCheck: ko.toJS(self.currentIpAddress)
					};
		            service.add(param).done(() => {
		            	self.getData().done(()=>{
							self.selectedAllowedIPAddress(new AllowedIPAddressDto(ko.toJS(self.allowedIPAddress)).id);
						});
						dialog.info({ messageId: "Msg_15" });
					}).fail(function(error: any) {
		                dialog.alertError({ messageId: error.messageId });
						block.clear();
		            });
				} else {
					block.invisible();
					let param = {
						accessLimitUseAtr: self.accessLimitUseAtr(),
						allowedIPAddressNew: ko.toJS(self.allowedIPAddress),
						allowedIPAddressOld: _.find(self.allowedIPAddressList(), ['id', self.selectedAllowedIPAddress()]),
            ipAddressToCheck: ko.toJS(self.currentIpAddress)
					};
		            service.update(param).done(() => {
		            	self.getData().done(()=>{
							self.selectedAllowedIPAddress(new AllowedIPAddressDto(ko.toJS(self.allowedIPAddress)).id);
						});
						dialog.info({ messageId: "Msg_15" });
					}).fail(function(error: any) {
		                dialog.alertError({ messageId: error.messageId });
						block.clear();
		            });
				}
			}
		}
		
		public del():void{
			let self = this;
			if(self.selectedAllowedIPAddress() != ''){
				dialog.confirm({ messageId: 'Msg_18' }).ifYes(function() {
                    block.invisible();
                    const param = {
                      accessLimitUseAtr: self.accessLimitUseAtr(),
                      ipAddress: _.find(self.allowedIPAddressList(), ['id', self.selectedAllowedIPAddress()]),
                      ipAddressToCheck: ko.toJS(self.currentIpAddress)
                    };
					let index = _.findIndex(self.allowedIPAddressList(), ['id', self.selectedAllowedIPAddress()]);
		            service.del(param).done(() => {
						self.getData().done(()=>{
							if(self.allowedIPAddressList().length == 0){
								self.selectedAllowedIPAddress('');
							}else{
								if(index < 1){
									self.selectedAllowedIPAddress(self.allowedIPAddressList()[0].id);
								}else{
									self.selectedAllowedIPAddress(self.allowedIPAddressList()[index - 1].id);
								}
							}
						});
						dialog.info({ messageId: "Msg_16" });
					}).fail(function(error: any) {
		                dialog.alertError({ messageId: error.messageId });
		            }).always(() => {
						block.clear();
					});
                });
			}
		}
    }

	interface AccessRestrictions{
		/** アクセス制限機能管理区分  */
		accessLimitUseAtr: number;
		/** 許可IPアドレス  */
		whiteList: Array<AllowedIPAddressDto>;
    /** 利用PCのIPアドレス */
    userIpAddress: string;
	}

	class AllowedIPAddressDto {
		/** 開始アドレス */        
		startAddress: any;
		/** IPアドレスの登録形式 */
		ipInputType: number;
		/** 終了アドレス */
		endAddress: any;
		/** 備考 */
		comment: string;
		id: string;
        constructor(param : any) {
			let self = this;
			self.startAddress = param.startAddress;
			self.ipInputType = param.ipInputType;
			self.endAddress = param.endAddress;
			self.comment = param.comment;
			self.id = 	param.startAddress.net1 + '.' +  
					  	param.startAddress.net2 + '.' + 
					  	param.startAddress.host1 + '.' + 
					  	param.startAddress.host2
			if(param.ipInputType === 1){
				self.id += '～' +
						param.endAddress.net1 + '.' +  
						param.endAddress.net2 + '.' + 
						param.endAddress.host1 + '.' + 
						param.endAddress.host2
			}
        }
    }

    class AllowedIPAddress {
		/** IPアドレスの登録形式 */
		ipInputType = ko.observable(0);      
		/** 開始アドレス */     
		startAddress = new IPAddressSetting();	
		/** 終了アドレス */
		endAddress = new IPAddressSetting();
		/** 備考 */
		comment = ko.observable('');
        constructor(param?: any) {
			let self = this;
      if (param) {
        self.ipInputType = ko.observable(param.ipInputType);
        self.startAddress = param.startAddress;
        self.endAddress = param.endAddress;
        self.comment = param.comment;
      }
			self.ipInputType.subscribe(item =>{
				if(item == 0){
                    $('.endIP input').ntsError('clear'); 
				}
			});
		}
		update(data? : any) :void {
			let self = this;
			if(data){
				self.ipInputType(data.ipInputType);
				self.startAddress.update(data.startAddress);
				self.endAddress.update(data.endAddress);
				self.comment(data.comment);
			}
        }
    }

    class IPAddressSetting {
		/** IPアドレス1 */
        net1 = ko.observable('');
		/** IPアドレス2 */        
		net2 = ko.observable('');
		/** IPアドレス3 */
		host1 = ko.observable('');
		/** IPアドレス4 */
		host2 = ko.observable('');
		
    	constructor(param?: string[]) {
        const self = this;
        if (!!param) {
          self.net1 = ko.observable(param[0]);
          self.net2 = ko.observable(param[1]);
          self.host1 = ko.observable(param[2]);
          self.host2 = ko.observable(param[3]);
        }
      }
		update(data? : any) :void {
			let self = this;
			self.net1(data?data.net1:'');
            self.net2(data?data.net2:'');
			self.host1(data?data.host1:'');
			self.host2(data?data.host2:'');	
        }
    }

}
