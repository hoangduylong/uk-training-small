module cmm042.e.viewmodel {
    import modal = nts.uk.ui.windows.sub.modal;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import showDialog = nts.uk.ui.dialog;
    import Text = nts.uk.resource.getText;
    import vl = nts.Setting.validate;
    import close = nts.uk.ui.windows.close;

    let __viewContext: any = window['__viewContext'] || {},
        block = window["nts"]["uk"]["ui"]["block"]["grayout"],
        unblock = window["nts"]["uk"]["ui"]["block"]["clear"],
        invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];


    export class ViewModel {
            portType: KnockoutObservable<string> = ko.observable('A');
        
            listCable: KnockoutObservable<Array<any>>;
            selectedCode_Cable: KnockoutObservable<number>;
            listSpeed: KnockoutObservable<Array<any>>;
            selectedCode_Speed: KnockoutObservable<number>;
        
            itemList: KnockoutObservable<Array<any>>;
            selectedId: KnockoutObservable<number>;
        
            enaBtnshowDialogF :KnockoutObservable<boolean> = ko.observable(true);
        
            resultFromF: KnockoutObservable<string> = ko.observable('NEC COMSTARZ MULTI 144');
            codeCommand: KnockoutObservable<string> = ko.observable('ATQ0V0E0&D2X0&S0%C1&W');
            id:KnockoutObservable<string> = ko.observable('1');
            dataShare = null;

            constructor() {
                let self = this;

                self.dataShare = getShared('CMM042E_PARAM');
                self.portType(self.dataShare.selectedCode_PortType);
                self.listCable = ko.observable([
                    { value: 1, text: 'RS-232C' },
                    { value: 2, text: 'RS-485' }
                ]);
                self.selectedCode_Cable = ko.observable(5);

                self.listSpeed = ko.observable([
                    { value: 1, text: '1200' },
                    { value: 2, text: '2400' },
                    { value: 3, text: '4800' },
                    { value: 4, text: '9600' },
                    { value: 5, text: '19200' },
                    { value: 6, text: '38400' },
                ]);
                self.selectedCode_Speed = ko.observable(5);

                self.itemList = ko.observable([
                    { id: 1, name: '一覧から選択' },
                    { id: 2, name: 'ATコマンド' }
                ]);
                self.selectedId = ko.observable(1);

                self.selectedId.subscribe(id => {
                    if (id == 2) {
                        self.enaBtnshowDialogF(false);
                    } else if (id == 1) {
                        self.enaBtnshowDialogF(true);
                    }
                });
                
                if(self.dataShare.code == ''){
                    self.resultFromF('');
                    self.codeCommand('');
                }
            }

        start(): JQueryPromise<any> {
            let self = this,
                dfd = $.Deferred();
                dfd.resolve();
            return dfd.promise();
        }
            
        showDialogF() {
            let self = this;
            setShared('CMM042F_PARAM', '');
            modal('../f/index.xhtml').onClosed(() => {
                let dto: any = getShared('CMM042F_VALUE');
                self.resultFromF(dto.resultFromF);
                self.codeCommand(dto.codeCommand);
            });
        }

        pushDataToAScreen() {
            let self = this;

            if (nts.uk.ui.errors.hasError()) {
                return;
            }
            
            setShared('CMM042E_VALUE', { });
            close();
        }

        close() {
            close();
        }
    }

}