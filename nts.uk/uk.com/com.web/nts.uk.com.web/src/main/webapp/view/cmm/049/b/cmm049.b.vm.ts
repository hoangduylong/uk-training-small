module nts.uk.com.view.cmm049.b {

    import MailFunctionListDto = nts.uk.com.view.cmm049.b.service.MailFunctionListDto;
    import MailFunctionDto = nts.uk.com.view.cmm049.b.service.MailFunctionDto;
    export module viewmodel {

        export class ScreenModel {

            items: KnockoutObservableArray<ItemModel>;
            columns: KnockoutObservableArray<any>;
            currentCodeList: KnockoutObservableArray<any>;
            settingItem: number;
            listFunctionID: Array<number> = [];
            userInfoItemName: KnockoutObservable<string>;

            constructor() {
                let _self = this;
                _self.items = ko.observableArray([]);
                _self.userInfoItemName = ko.observable("");

                _self.columns = ko.observableArray([
                    { headerText: nts.uk.resource.getText(""), key: 'code', width: 250, hidden: true },
                    { headerText: nts.uk.resource.getText("CMM049_21"), key: 'name', width: 250 }
                ]);

                _self.currentCodeList = ko.observableArray([]);
            }

            /**
             * Start page
             */
            public startPage(): JQueryPromise<any> {
                let _self = this;
                let dfd = $.Deferred<any>();

                let dataObject: any = nts.uk.ui.windows.getShared("CMM049_DIALOG_B_INPUT_DATA");
                _self.settingItem = dataObject.userInfo;
                _self.bindingData(dataObject).done(() => {
                    dfd.resolve();
                });
                return dfd.promise();
            }

            /**
            * Binding data
            */
            private bindingData(dataObject: any): JQueryPromise<any> {
                let _self = this;
                let dfd = $.Deferred<any>();
                _self.userInfoItemName(dataObject.userInfoItemName);
                _self.loadListMailFunction(dataObject.listMailFunction);
                dfd.resolve();
                return dfd.promise();
            }
            
             /**
            * load data UI
            */
            private loadListMailFunction(list: MailFunctionListDto): void {
                let _self = this;
                if (list) {
                    let mapped = _.map(list.mailFunctionDto, item => new ItemModel(item.functionId, item.functionName));
                    _self.items(mapped);

                    //compare and check items in list
                    _self.checkAlgorthm(list);
                }
            }

            /**
             * Close
             */
            public close(): void {
                nts.uk.ui.windows.close();
            }


            /**
             * save
             */
            public save(): JQueryPromise<any> {
                let self = this;
                let dfd = $.Deferred<any>();
                let listOfSendMailFunction: Array<SendMailFunction> = [];
                self.listFunctionID.forEach((item) => {
                    if (self.currentCodeList().length <= 0) {
                        listOfSendMailFunction.push({
                            functionId: item,
                            sendSetting: SendSetting.CAN_NOT_EDIT
                        });
                    }
                    else {
                        let check = _.filter(self.currentCodeList(), function(o) { return o == item });
                        if (check.length > 0) {
                            listOfSendMailFunction.push({
                                functionId: item,
                                sendSetting: SendSetting.CAN_EDIT
                            });
                        }
                        else {
                            listOfSendMailFunction.push({
                                functionId: item,
                                sendSetting: SendSetting.CAN_NOT_EDIT
                            });
                        }
                    }
                });
                let data = {
                    mailDestinationFunctionDto: {
                        settingItem: self.settingItem,
                        sendByFunctionSetting: listOfSendMailFunction
                    }
                }
                service.saveMailDestinationFunction(data).done(() => {
                    nts.uk.ui.windows.close();
                    dfd.resolve();
                });
                return dfd.promise();
            }

            private checkAlgorthm(data: any) {
                let self = this;
                let listOfMailFunction: Array<any> = [];
                data.mailFunctionDto.forEach((item: any, index: any) => {
                    self.listFunctionID.push(item.functionId);
                });
                if (data.mailDestinationFunctionDto) {
                    data.mailFunctionDto.forEach((item: any, index: any) => {
                        listOfMailFunction.push(item.functionId);

                    });
                    data.mailDestinationFunctionDto.sendByFunctionSetting.forEach((item: any, index: any) => {
                        if (item.sendSetting == SendSetting.CAN_EDIT) {
                            let returnArray: Array<any> = _.find(listOfMailFunction, function(o) {
                                return o == item.functionId;
                            });
                            if (returnArray) {
                                self.currentCodeList.push(item.functionId);
                            }
                        }
                    });
                }
                else {
                    self.currentCodeList([]);
                }
            }

        }

        class ItemModel {
            code: number;
            name: string;

            constructor(code: number, name: string) {
                this.code = code;
                this.name = name;
            }
        }
        class SendMailFunction {
            functionId: number;
            sendSetting: number;

            constructor(functionId: number, sendSetting: number) {
                this.functionId = functionId;
                this.sendSetting = sendSetting;
            }
        }

        export enum SendSetting {
            CAN_NOT_EDIT,
            CAN_EDIT
        }

        export enum UserInfoItem {
            COMPANY_PC_MAIL,
            PERSONAL_PC_MAIL,
            COMPANY_MOBILE_MAIL,
            PERSONAL_MOBILE_MAIL,
            COMPANY_MOBILE_PHONE,
            PERSONAL_MOBILE_PHONE,
            PASSWORD
        }
    }
}