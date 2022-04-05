module cmm042.a.viewmodel {
    import modal = nts.uk.ui.windows.sub.modal;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import showDialog = nts.uk.ui.dialog;
    import Text = nts.uk.resource.getText;
    import vl = nts.Setting.validate;

    let __viewContext: any = window['__viewContext'] || {},
        block = window["nts"]["uk"]["ui"]["block"]["grayout"],
        unblock = window["nts"]["uk"]["ui"]["block"]["clear"],
        invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];


    export class ViewModel {
        settings: KnockoutObservableArray<ISetting> = ko.observableArray([]);
        setting: KnockoutObservable<Setting> = ko.observable(new Setting({id: '',code: null,name: null}));
        enaBtnSave: KnockoutObservable<boolean> = ko.observable(true);
        enaBtnCoppy: KnockoutObservable<boolean> = ko.observable(true);
        enaBtnDel: KnockoutObservable<boolean> = ko.observable(true);
        itemSelected = null;

        constructor() {
            let self = this,
                setting = self.setting(),
                settings = self.settings();

            setting.id.subscribe(id => {
                if (id) {
                    // Gọi service tải dữ liệu ra Setting
                    block();
                    self.enaBtnDel(true);
                    let obj = _.find(settings, function(o) { return o.id == id; });
                    self.itemSelected = obj;
                    
                    if(obj == null || obj == undefined){
                        return;    
                    }
                    
                    if (obj) {
                        setting.code(obj.code);
                        setting.name(obj.name);
                        setting.selectedCode_Teminal(obj.selectedCode_Teminal );
                        setting.selectedCode_rom(obj.selectedCode_rom );
                        setting.checked_CardNo(obj.checked_CardNo );
                        setting.checked_ExtendeRrese(obj.checked_ExtendeRrese );
                        setting.checked_Rese40item(obj.checked_Rese40item );
                        setting.checked_RemoteAllItem(obj.checked_RemoteAllItem );
                        setting.checked_WorkType(obj.checked_WorkType );
                        setting.checked_TCPIP(obj.checked_TCPIP );
                        setting.tcpip_phone_value(obj.tcpip_phone_value );
                        setting.macAddress_value(obj.macAddress_value );
                        setting.terminalAddress_value(obj.terminalAddress_value );
                        setting.location_code(obj.location_code );
                        setting.location_name(obj.location_name );
                        setting.selectedCode_PortType(obj.selectedCode_PortType );
                        setting.selectedCode_AlwaysCollect(obj.selectedCode_AlwaysCollect );
                        setting.selectedCode_InoutType(obj.selectedCode_InoutType );
                        setting.checked_INOUT(obj.checked_INOUT );
                        setting.checked_EntryExit(obj.checked_EntryExit );
                        setting.checked_Unlock(obj.checked_Unlock );
                        setting.selectedCode_Unlock(obj.selectedCode_Unlock );
                        
                        $("#A_INP_NAME").focus();
                        nts.uk.ui.errors.clearAll();
                        unblock();
                    }
                } else {                 
                    self.enaBtnDel(false);
                    self.createNewMode();
                    unblock();
                }
            });
            
            setting.selectedCode_Teminal.subscribe(id => {
                let obj = self.itemSelected;
                if (obj == null || obj == undefined) {
                    return;
                }
                
                if (id == 0) {
                    setting.selectedCode_rom(0);
                    setting.checked_CardNo(false);
                    setting.checked_ExtendeRrese(false);
                    setting.checked_Rese40item(false);
                    setting.checked_RemoteAllItem(false);
                    setting.checked_WorkType(false);
                    setting.enableComBoRom(false);
                    setting.enable_CardNo(false);
                    setting.enable_ExtendeRrese(false);
                    setting.enable_Rese40item(false);
                    setting.enable_RemoteAllItem(false);
                    setting.enable_WorkType(false);
                    setting.listRom([]);
                } else if (id != 0) {
                    setting.selectedCode_rom(1);
                    setting.checked_CardNo(obj.checked_CardNo);
                    setting.checked_ExtendeRrese(obj.checked_ExtendeRrese);
                    setting.checked_Rese40item(obj.checked_Rese40item);
                    setting.checked_RemoteAllItem(obj.checked_RemoteAllItem);
                    setting.checked_WorkType(obj.checked_WorkType);
                    setting.enableComBoRom(obj.enableComBoRom);
                    setting.enable_CardNo(obj.enable_CardNo);
                    setting.enable_ExtendeRrese(obj.enable_ExtendeRrese);
                    setting.enable_Rese40item(obj.enable_Rese40item);
                    setting.enable_RemoteAllItem(obj.enable_RemoteAllItem);
                    setting.enable_WorkType(obj.enable_WorkType);
                    setting.listRom(obj.listRom);
                }
                
                if(id == 0 || id == 3){
                    setting.checked_INOUT(true);
                    setting.enable_INOUT(true);
                }else if (id == 1 || id == 2){
                    setting.checked_INOUT(false);
                    setting.enable_INOUT(false);
                }
            });
            
            setting.checked_TCPIP.subscribe(id => {
                let obj = self.itemSelected;
                if(obj == null || obj == undefined){
                        return;    
                }
                
                if (id == true) {
                   setting.tcpip_phone_label('IPアドレス');
                   setting.tcpip_phone_value('192.168.50.6');
                   setting.enablelistPortType(false);
                   setting.enaBtnshowDialogE(false); 
                } else if (id == false) {
                   setting.tcpip_phone_label('電話番号');
                   setting.tcpip_phone_value('0968666888');
                   setting.enablelistPortType(true);
                   setting.enaBtnshowDialogE(true);   
                }
            });
            
            setting.checked_INOUT.subscribe(id => {
                let obj = self.itemSelected;
                if(obj == null || obj == undefined){
                        return;    
                }
                
                if (id == false) {
                    setting.enable_listInoutType(true);
                } else if (id == true) {
                    setting.enable_listInoutType(false);
                }
            });
            
            setting.checked_Unlock.subscribe(id => {
                let obj = self.itemSelected;
                if(obj == null || obj == undefined){
                        return;    
                }
                
                if (id == false) {
                    setting.enable_listUnlock(false);
                } else if (id == true) {
                    setting.enable_listUnlock(true);
                }
            });
            
            setting.selectedCode_PortType.subscribe(id => {
                let obj = self.itemSelected;
                if (obj == null || obj == undefined) {
                    return;
                }
                
                if (id) {
                    setting.selectedCode_PortType(id);
                    //self.itemSelected = ko.toJSON(setting);
                } 
            });
            
            self.start();
        }

        createNewMode() {
            let self = this,
                setting = self.setting(),
                settings = self.settings;
            setting.id(null);
            setting.code('');
            setting.name('');
            setting.selectedCode_Teminal(0);
            setting.checked_TCPIP(true);
            setting.tcpip_phone_value('');
            setting.macAddress_value('');
            setting.terminalAddress_value('');
            setting.location_code('');
            setting.location_name('');
            setting.selectedCode_PortType(1);
            setting.selectedCode_AlwaysCollect(0);
            setting.selectedCode_InoutType(5);
            setting.checked_INOUT(false);
            setting.checked_EntryExit(false);
            setting.checked_Unlock(false);
            setting.selectedCode_Unlock(1);
            self.enaBtnDel(false);
            $("#A_INP_CODE").focus();


        }

        
        
        register() {}
        removeSetting() {}

        showDialogB() {
            let self = this;
            setShared('CMM042B_PARAM', '000001');
            modal('../b/index.xhtml').onClosed(() => {
                let dto: any = getShared('CMM042B_VALUE');
            });
        }
        
        showDialogD() {
            let self = this,
                setting = self.setting(),
                settings = self.settings;
            setShared('CMM042D_PARAM', ko.toJS(self.setting()));
            modal('../d/index.xhtml').onClosed(() => {
                let dto: any = getShared('CMM042D_VALUE');
                //setting.location_code(dto.code);
                //setting.location_name(dto.name);
            });
        }
        
        showDialogE() {
            let self = this,
                setting = self.setting(),
                settings = self.settings;
            
            setShared('CMM042E_PARAM', ko.toJS(self.setting()));
            modal('../e/index.xhtml').onClosed(() => {
                let dto: any = getShared('CMM042E_VALUE');
            });
        }
        
         start(): JQueryPromise<any> {
            let self = this,
                dfd = $.Deferred(),
                setting = self.setting(),
                settings = self.settings;

            // get all Setting
            settings.removeAll();
            let _data: Array<ISetting> = [];

            let obj1 = {
                id: nts.uk.util.randomId(),
                name: '名称 ' + 1,
                code: '端末 ' + 1,
                selectedCode_Teminal: 1,
                selectedCode_rom: 1,
                checked_CardNo: false,
                checked_ExtendeRrese: true,
                checked_Rese40item: false,
                checked_RemoteAllItem: true,
                checked_WorkType: false,
                checked_TCPIP: true,
                tcpip_phone_value: '192.168.100.129',
                macAddress_value: '192.168.100.129',
                terminalAddress_value: '00000001',
                location_code: '000001',
                location_name: 'location 1',
                selectedCode_PortType: 2,
                selectedCode_AlwaysCollect: 1,
                selectedCode_InoutType: 1,
                checked_INOUT: false,
                checked_EntryExit: true,
                checked_Unlock: true,
                selectedCode_Unlock: 1,
                enableComBoRom : true,
                enable_CardNo : true,
                enable_ExtendeRrese : true,
                enable_Rese40item : true,
                enable_RemoteAllItem : true,
                enable_WorkType : true,
                enable_INOUT: false,
                listRom : [{ value: 1, text: 'ROM Ver1.0' }]
            }
            _data.push(obj1);

            let obj3 = {
                id: nts.uk.util.randomId(),
                name: '名称 ' + 2,
                code: '端末 ' + 2,
                selectedCode_Teminal: 3,
                selectedCode_rom: 1,
                checked_CardNo: true,
                checked_ExtendeRrese: true,
                checked_Rese40item: false,
                checked_RemoteAllItem: true,
                checked_WorkType: true,
                checked_TCPIP: true,
                tcpip_phone_value: '192.168.100.156',
                macAddress_value: '192.168.100.156',
                terminalAddress_value: '00000002',
                location_code: '000002',
                location_name: 'location 2',
                selectedCode_PortType: 1,
                selectedCode_AlwaysCollect: 0,
                selectedCode_InoutType: 3,
                checked_INOUT: true,
                checked_EntryExit: true,
                checked_Unlock: true,
                selectedCode_Unlock: 2,
                enableComBoRom : true,
                enable_CardNo : true,
                enable_ExtendeRrese : true,
                enable_Rese40item : true,
                enable_RemoteAllItem : true,
                enable_WorkType : true,
                enable_INOUT: true,
                listRom : [{ value: 1, text: 'ROM Ver1.0' }]
            }
            _data.push(obj3);
             
            _.each(_data, d => settings.push(d));
            setting.id(_data[0].id);
            setting.id.valueHasMutated();

            // teminal


            dfd.resolve();
            return dfd.promise();
        }
    }

    interface ISetting {
        id: string;
        code: string;
        name: string;
        selectedCode_Teminal: number;
        selectedCode_rom: number;
        checked_CardNo: boolean;
        checked_ExtendeRrese: boolean;
        checked_Rese40item: boolean;
        checked_RemoteAllItem: boolean;
        checked_WorkType: boolean;
        checked_TCPIP: boolean;
        tcpip_phone_value: string;
        macAddress_value: string;
        terminalAddress_value: string;
        location_code: string;
        location_name: string;
        selectedCode_PortType: number;
        selectedCode_AlwaysCollect: number;
        selectedCode_InoutType: number;
        checked_INOUT: boolean;
        checked_EntryExit: boolean;
        checked_Unlock: boolean;
        selectedCode_Unlock: number;
        enableComBoRom : boolean;
        enable_CardNo: boolean;
        enable_ExtendeRrese: boolean;
        enable_Rese40item: boolean;
        enable_RemoteAllItem: boolean;
        enable_WorkType: boolean;
        enable_INOUT: boolean;
        listRom: any;
        tcpip_phone_label:string;
        tcpip_phone_value:string;
        enable_listInoutType: boolean;
        
    }

    class Setting {
        id: KnockoutObservable<string> = ko.observable('');
        code: KnockoutObservable<string> = ko.observable('');
        name: KnockoutObservable<string> = ko.observable('');
        enableCode: KnockoutObservable<boolean> = ko.observable(false);
        
        // list terminal
        listTeminal: KnockoutObservable<Array<any>> = ko.observable([]) ;
        selectedCode_Teminal: KnockoutObservable<number> = ko.observable(0);

        // list Rom
        listRom: KnockoutObservable<Array<any>> = ko.observable([]);
        selectedCode_rom: KnockoutObservable<number> = ko.observable(0);
        enableComBoRom: KnockoutObservable<boolean> = ko.observable(false);

        // checkbox
        checked_CardNo: KnockoutObservable<boolean> = ko.observable(false);
        enable_CardNo: KnockoutObservable<boolean> = ko.observable(false);
        checked_ExtendeRrese: KnockoutObservable<boolean> = ko.observable(false);
        enable_ExtendeRrese: KnockoutObservable<boolean> = ko.observable(false);
        checked_Rese40item: KnockoutObservable<boolean> = ko.observable(false);
        enable_Rese40item: KnockoutObservable<boolean> = ko.observable(false);

        checked_RemoteAllItem: KnockoutObservable<boolean> = ko.observable(false);
        enable_RemoteAllItem: KnockoutObservable<boolean> = ko.observable(false);

        checked_WorkType: KnockoutObservable<boolean> = ko.observable(false);
        enable_WorkType: KnockoutObservable<boolean> = ko.observable(false);

        checked_TCPIP: KnockoutObservable<boolean> = ko.observable(false);
        enable_TCPIP: KnockoutObservable<boolean> = ko.observable(false);

        tcpip_phone_label: KnockoutObservable<string> = ko.observable('');
        tcpip_phone_value: KnockoutObservable<string> = ko.observable('');

        macAddress_value: KnockoutObservable<string> = ko.observable('');

        terminalAddress_value: KnockoutObservable<string> = ko.observable('');
        location_code: KnockoutObservable<string> = ko.observable('');
        location_name: KnockoutObservable<string> = ko.observable('');
        
        //
        listPortType: KnockoutObservable<Array<any>> = ko.observable([]);
        selectedCode_PortType: KnockoutObservable<number> = ko.observable(0);
        enablelistPortType: KnockoutObservable<boolean> = ko.observable(true);
        enaBtnshowDialogE: KnockoutObservable<boolean> = ko.observable(true);
        
        //
        listAlwaysCollect: KnockoutObservable<Array<any>> = ko.observable([]);
        selectedCode_AlwaysCollect: KnockoutObservable<number> = ko.observable(0);
        
        listInoutType: KnockoutObservable<Array<any>> = ko.observable([]);
        selectedCode_InoutType: KnockoutObservable<number> = ko.observable(0);
        enable_listInoutType: KnockoutObservable<boolean> = ko.observable(true);
        
        checked_INOUT: KnockoutObservable<boolean> = ko.observable(false);
        enable_INOUT: KnockoutObservable<boolean> = ko.observable(false);
        
        checked_EntryExit: KnockoutObservable<boolean> = ko.observable(false);
        enable_EntryExit: KnockoutObservable<boolean> = ko.observable(false);
        
        checked_Unlock: KnockoutObservable<boolean> = ko.observable(false);
        enable_Unlock: KnockoutObservable<boolean> = ko.observable(false);
        listUnlock: KnockoutObservable<Array<any>> = ko.observable([]);
        selectedCode_Unlock: KnockoutObservable<number> = ko.observable(0);
        enable_listUnlock: KnockoutObservable<boolean> = ko.observable(true);

        constructor(param: ISetting) {
            let self = this;

            if (param) {
                self.id(param.id || '');
                self.code(param.code || '');
                self.name(param.name || '');
                self.enableCode(param.enableCode || false);
                self.listTeminal = ko.observable([
                    { value: 0, text: 'NRX-M' },
                    { value: 1, text: 'NRL-1' },
                    { value: 2, text: 'NRL-2' },
                    { value: 3, text: 'NRL-M' }
                ]);
                self.selectedCode_Teminal(param.selectedCode_Teminal || 0);

                self.listRom = ko.observable([
                    { value: 0, text: '' },
                    { value: 1, text: 'ROM Ver1.0' }
                ]);
                self.selectedCode_rom(param.selectedCode_rom || 0);
                self.enableComBoRom = ko.observable(true);

                // checkbox
                self.checked_CardNo(param.checked_CardNo || 'false');
                self.enable_CardNo = ko.observable(true);
                self.checked_ExtendeRrese(param.checked_ExtendeRrese || 'false');
                self.enable_ExtendeRrese = ko.observable(true);
                self.checked_Rese40item(param.checked_Rese40item || 'false');
                self.enable_Rese40item = ko.observable(true);

                self.checked_RemoteAllItem(param.checked_RemoteAllItem || 'false');
                self.enable_RemoteAllItem = ko.observable(true);

                self.checked_WorkType(param.checked_WorkType || 'false');
                self.enable_WorkType = ko.observable(true);

                //
                self.checked_TCPIP(param.checked_TCPIP || 'false');
                self.enable_TCPIP = ko.observable(true);
                self.tcpip_phone_label = ko.observable('電話番号');
                self.tcpip_phone_value(param.tcpip_phone_value || '');

                self.macAddress_value(param.macAddress_value || '');

                self.terminalAddress_value(param.name || '');
                self.location_code(param.location_code || '');
                self.location_name(param.location_name || '');
                
                self.listPortType = ko.observable([
                    { value: 1, text: '1' },
                    { value: 2, text: '2' },
                    { value: 3, text: '3' },
                    { value: 4, text: '4' }
                ]);
                self.selectedCode_PortType(param.selectedCode_PortType || '');
                
                self.listAlwaysCollect = ko.observable([
                    { value: 0, text: 'する' },
                    { value: 1, text: 'しない' }
                ]);
                self.selectedCode_AlwaysCollect(param.selectedCode_AlwaysCollect || '');
                
                
                self.listInoutType = ko.observable([
                    { value: 1, text: '私用' },
                    { value: 2, text: '公用' },
                    { value: 3, text: '有償' },
                    { value: 4, text: '組合' },
                    { value: 5, text: '置換なし' },
                ]);
                self.selectedCode_InoutType(param.selectedCode_InoutType || 5);
                self.checked_INOUT(param.checked_INOUT || 'false');
                self.enable_INOUT = ko.observable(true);
                
                self.checked_EntryExit(param.checked_EntryExit || 'false');
                self.enable_EntryExit = ko.observable(true);
                
                self.checked_Unlock(param.checked_Unlock || 'false');
                self.enable_Unlock = ko.observable(true);
                self.listUnlock = ko.observable([
                    { value: 1, text: '出勤' },
                    { value: 2, text: '退勤' },
                    { value: 3, text: '入門' },
                    { value: 4, text: '退門' }
                ]);
                self.selectedCode_Unlock(param.selectedCode_Unlock || 1);                  
            }
        }
    }

}