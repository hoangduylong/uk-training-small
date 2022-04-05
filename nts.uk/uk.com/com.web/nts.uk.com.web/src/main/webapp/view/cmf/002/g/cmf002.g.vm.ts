module nts.uk.com.view.cmf002.g.viewmodel {
    import close = nts.uk.ui.windows.close;
    import getText = nts.uk.resource.getText;
    import dialog = nts.uk.ui.dialog;
    import model = cmf002.share.model;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import block = nts.uk.ui.block;
    import modal = nts.uk.ui.windows.sub.modal;

    export class ScreenModel {
        listOutputCodeConvert: KnockoutObservableArray<OutputCodeConvert> = ko.observableArray([]);
        selectedCodeConvert: KnockoutObservable<string> = ko.observable('');
        selectedConvertDetail: KnockoutObservable<number> = ko.observable(0);
        enableBtn: KnockoutObservable<boolean> = ko.observable(true);
        screenMode: KnockoutObservable<number>;

        codeConvertCurrent: KnockoutObservable<OutputCodeConvert> = ko.observable(new OutputCodeConvert('', '', 0, []));

        acceptWithoutSettingItems: KnockoutObservableArray<model.ItemModel>;
        
        //true -> left, false-> right;
        selectedFocus: boolean;

        constructor() {
            let self = this;
            self.screenMode = ko.observable(model.SCREEN_MODE.UPDATE);
            $("#fixed-table").ntsFixedTable({ height: 184 });

            self.acceptWithoutSettingItems = ko.observableArray([
                new model.ItemModel(model.NOT_USE_ATR.NOT_USE, getText('CMF002_131')),
                new model.ItemModel(model.NOT_USE_ATR.USE, getText('CMF002_132')),
            ]);

            self.selectedCodeConvert.subscribe(function(convertCode: string) {
                if (convertCode) {
                    block.invisible();
                    self.enableBtn(true);
                    nts.uk.ui.errors.clearAll();
                    service.getOutputCodeConvertByConvertCode(convertCode).done(function(data) {
                        if (data) {
                            self.codeConvertCurrent().listCdConvertDetail.removeAll();

                            self.codeConvertCurrent().convertCode(data.convertCode);
                            self.codeConvertCurrent().convertName(data.convertName);
                            self.codeConvertCurrent().acceptWithoutSetting(data.acceptWithoutSetting);

                            let detail: Array<any> = _.sortBy(data.listCdConvertDetail, ['lineNumber']);
                            let converDetail: Array<CdConvertDetail> = [];
                            for (let i = 0; i < detail.length; i++) {
                                converDetail.push(new CdConvertDetail(detail[i].convertCode, detail[i].lineNumber, detail[i].outputItem, detail[i].systemCode));
                            }
                            self.codeConvertCurrent().listCdConvertDetail(converDetail);
                            self.screenMode(model.SCREEN_MODE.UPDATE);
                        }
                    }).fail(function(error) {
                        dialog.alertError(error);
                    }).always(function() {     
                        block.clear();                   
                    });
                    _.defer(() => {
                        nts.uk.ui.errors.clearAll();
                    })
                } else {
                    self.btnCreateCodeConvert();
                }
                
            });
        } // END constructor

        start(): JQueryPromise<any> {
            let self = this;
            let dfd = $.Deferred();

            self.initialScreen();

            dfd.resolve();
            return dfd.promise();
        }

        initialScreen(convertCodeParam?: string) {
            let self = this;
            block.invisible();
            nts.uk.ui.errors.clearAll();

            service.getOutputCodeConvertByCompanyId().done(function(dataOutputCodeConvertJson: Array<any>) {
                if (dataOutputCodeConvertJson.length > 0) {
                    let _codeConvertResult: Array<any> = _.sortBy(dataOutputCodeConvertJson, ['convertCode']);
                    let _listOutputCodeConvert: Array<OutputCodeConvert> = _.map(_codeConvertResult, x => {
                        return new OutputCodeConvert(x.convertCode, x.convertName, x.acceptWithoutSetting, x.listCdConvertDetail);
                    });

                    let _codeConvert: string;
                    if (convertCodeParam) {
                        _codeConvert = convertCodeParam;
                    } else {
                        _codeConvert = _listOutputCodeConvert[0].convertCode();
                    }
                    self.selectedCodeConvert(_codeConvert);

                    self.listOutputCodeConvert(_listOutputCodeConvert);

                    self.screenMode(model.SCREEN_MODE.UPDATE);
                    self.setFocusG2_3();
                } else {
                    self.enableBtn(false);
                    self.settingCreateMode();
                    self.setFocusG3_1();
                }
            }).fail(function(error) {
                dialog.alertError(error);
            }).always(function() {
                block.clear();
            });
        } // END initialScreen

        btnAddCdConvertDetails() {
            let self = this;
            self.addCdConvertDetails();
            let indexFocus: number = self.codeConvertCurrent().listCdConvertDetail().length;
            //self.setFocusItem(FOCUS_TYPE.ADD_ROW_PRESS, model.SCREEN_MODE.UPDATE, indexFocus);
            self.setFocusG4_3();
        }
        
        addCdConvertDetails() {
            let self = this;
            block.invisible();
            self.codeConvertCurrent().listCdConvertDetail.push(new CdConvertDetail('', self.codeConvertCurrent().listCdConvertDetail().length + 1, '', ''));
            self.selectedConvertDetail(self.codeConvertCurrent().listCdConvertDetail().length);
            $("#fixed-table tr")[self.codeConvertCurrent().listCdConvertDetail().length - 1].scrollIntoView(false);
            block.clear();
        }

        btnRemoveCdConvertDetails() {
            let self = this;
            let indexFocus: number = 0;
            block.invisible();

            self.codeConvertCurrent().listCdConvertDetail.remove(function(item)
            { return item.lineNumber() == (self.selectedConvertDetail()); })

            for (var i = 0; i < self.codeConvertCurrent().listCdConvertDetail().length; i++) {
                self.codeConvertCurrent().listCdConvertDetail()[i].lineNumber(i + 1);
            }

            if (self.selectedConvertDetail() >= self.codeConvertCurrent().listCdConvertDetail().length) {
                self.selectedConvertDetail(self.codeConvertCurrent().listCdConvertDetail().length);
                indexFocus = self.codeConvertCurrent().listCdConvertDetail().length;
            } else {
                indexFocus = self.selectedConvertDetail();
            }
            
            self.selectedConvertDetail.valueHasMutated();
            if (self.codeConvertCurrent().listCdConvertDetail().length == 0) {
                self.addCdConvertDetails();
                self.selectedConvertDetail(0);
                indexFocus= 0;
            }
            block.clear();
            if(indexFocus == 0){
                 $('#fixed-table').focus();
            }else{
                if (self.selectedFocus) {
                    $('input[data-focus-input= ' + indexFocus + ']').focus();
                }else{
                    $('input[data-focus-system= ' + indexFocus + ']').focus();
                }
            }
        } // END Remove table>tbody>tr

        btnCreateCodeConvert() {
            let self = this;
            self.enableBtn(false);
            block.invisible();
            self.settingCreateMode();
            self.setFocusG3_1();
            block.clear();
        }

        btnRegOutputCodeConvert() {
            let self = this;
            nts.uk.ui.errors.clearAll();
            block.invisible();
            $('.nts-input').trigger("validate");
            if (nts.uk.ui.errors.hasError()) {
                block.clear();
                self.setFocusG2_3();
                return;
            }
            for (var i = 0; i < self.codeConvertCurrent().listCdConvertDetail().length; i++) {
                self.codeConvertCurrent().listCdConvertDetail()[i].convertCode(self.codeConvertCurrent().convertCode());
            }

            let currentOutputCodeConvert = self.codeConvertCurrent;

            if (model.SCREEN_MODE.NEW == self.screenMode()) {
                if (_.isEmpty(currentOutputCodeConvert().convertCode())) {
                    dialog.alertError({ messageId: "Msg_660" });
                    block.clear();
                    return;
                } else {
                    let existCode = self.listOutputCodeConvert().filter(x => x.convertCode() === currentOutputCodeConvert().convertCode());
                    if (existCode.length > 0) {
                        dialog.alertError({ messageId: "Msg_3" });
                        block.clear();
                        return;
                    }
                }
            }

            let _outputItemDuplicate: Array<any> = [];
            for (let detail of currentOutputCodeConvert().listCdConvertDetail()) {
                if (!_.isEmpty(detail.systemCode())) {
                    // check duplicate OutputItem detail
                    let data = currentOutputCodeConvert().listCdConvertDetail().filter(x => x.systemCode() === detail.systemCode());
                    if (data.length >= 2) {
                        _outputItemDuplicate.push(detail);
                    }
                }
            }

            // check duplicate OutputItem detail
            if (!_.isEmpty(_outputItemDuplicate)) {
                let _errorOutputItemDuplicate: Array<any> = _.uniqBy(ko.toJS(_outputItemDuplicate), 'outputItem');
                for (let i = 0; i < _errorOutputItemDuplicate.length; i++) {
                    $('tr[data-id=' + _errorOutputItemDuplicate[i].lineNumber + ']').find("input").eq(1).ntsError('set', { messageId: 'Msg_661', messageParams: [_errorOutputItemDuplicate[i].systemCode] });
                }
                //dialog.alertError({ messageId: "Msg_661" });
            }
            if (nts.uk.ui.errors.hasError()) {
                block.clear();
                self.setFocusG2_3();
                return;
            } 

            if (model.SCREEN_MODE.NEW == self.screenMode()) {
                service.addOutputCodeConvert(ko.toJS(self.codeConvertCurrent())).done((outputConvertCode) => {
                    dialog.info({ messageId: "Msg_15" }).then(() => {
                        self.initialScreen(self.codeConvertCurrent().convertCode());
                    });
                }).fail(function(error) {
                    dialog.alertError(error);
                }).always(function() {
                    block.clear();
                    self.setFocusG2_3();
                });
            } else {
                service.updateOutputCodeConvert(ko.toJS(self.codeConvertCurrent())).done((outputConvertCode) => {
                    dialog.info({ messageId: "Msg_15" }).then(() => {
                        self.initialScreen(self.selectedCodeConvert());
                    });
                }).fail(function(error) {
                    dialog.alertError(error);
                }).always(function() {
                    block.clear();
                    self.setFocusG2_3();
                });
            }
            self.enableBtn(true);
        }


        btnDeleteOutputCodeConvert() {
            let self = this
            let _listOutputCodeConvert = self.listOutputCodeConvert;
            let _codeConvertCurrent = self.codeConvertCurrent;
            block.invisible();
            $('#G2_3_container').ntsError('clear');
            service.checkBeforeRemove(self.selectedCodeConvert()).done(() => {
                dialog.confirm({ messageId: "Msg_18" }).ifYes(() => {
                    service.removeOutputCodeConvert(ko.toJS(_codeConvertCurrent)).done(function() {

                        let index: number = _.findIndex(_listOutputCodeConvert(), function(x)
                        { return x.convertCode() == _codeConvertCurrent().convertCode() });

                        if (index >= 0) {
                            self.listOutputCodeConvert.splice(index, 1);
                            if (index >= _listOutputCodeConvert().length) {
                                index = _listOutputCodeConvert().length - 1;
                            }
                        }

                        dialog.info({ messageId: "Msg_16" }).then(() => {
                            if (_listOutputCodeConvert().length > 0) {
                                self.initialScreen(_listOutputCodeConvert()[index].convertCode());
                                self.screenMode(model.SCREEN_MODE.UPDATE);
                            } else {
                                self.settingCreateMode();
                            }
                        });
                    }).fail(function(error) {
                        dialog.alertError(error);
                    }).always(function() {
                        block.clear();
                        self.setFocusG2_3();
                    });
                }).then(() => {
                    block.clear();
                    self.setFocusG2_3();
                });
            }).fail(error => {
                if (error.messageId == "Msg_659") {
                    dialog.alertError({ messageId: "Msg_659" });
                } else {
                    $('#G2_3_container').ntsError('set', error);
                }
                block.clear();
                self.setFocusG2_3();
            });
        }

        btnCloseDialog() {
            close();
        }

        settingCreateMode() {
            let self = this;
            nts.uk.ui.errors.clearAll();

            self.selectedCodeConvert('');

            self.codeConvertCurrent().convertCode('');
            self.codeConvertCurrent().convertName('');
            self.codeConvertCurrent().acceptWithoutSetting(0);

            self.codeConvertCurrent().listCdConvertDetail.removeAll();
            self.selectedConvertDetail(0);
            self.addCdConvertDetails();

            self.screenMode(model.SCREEN_MODE.NEW);
        }
        
        setFocusG3_1() {
            _.defer(() => { $('#G3_1').focus(); });
        }

        setFocusG2_3() {
            _.defer(() => { $('#G2_3_container').focus(); });
        }
        
        setFocusG4_3() {
            _.defer(() => { $('#fixed-table').focus(); });
        }

        setFocusItem(focus: number, screenMode: number, index?: number) {
            let self = this;
            if (focus == FOCUS_TYPE.ADD_ROW_PRESS || focus == FOCUS_TYPE.DEL_ROW_PRESS) {
                $('tr[data-id=' + index + ']').find("input").first().focus();
            }
            _.defer(() => { nts.uk.ui.errors.clearAll() });
        }


    } //end screenModel


    export enum FOCUS_TYPE {
        INIT = 0,
        ADD_PRESS = 1,
        REG_PRESS = 2,
        DEL_PRESS = 3,
        ROW_PRESS = 4,
        ADD_ROW_PRESS = 5,
        DEL_ROW_PRESS = 6
    }

    export class OutputCodeConvert {
        convertCode: KnockoutObservable<string>;
        dispConvertCode: string;

        convertName: KnockoutObservable<string>;
        dispConvertName: string;

        acceptWithoutSetting: KnockoutObservable<number>;

        listCdConvertDetail: KnockoutObservableArray<CdConvertDetail>;

        constructor(code: string, name: string, acceptWithoutSetting: number, listCdConvertDetail: Array<any>) {
            this.convertCode = ko.observable(code);
            this.dispConvertCode = code;
            this.convertName = ko.observable(name);
            this.dispConvertName = name;
            this.acceptWithoutSetting = ko.observable(acceptWithoutSetting);
            this.listCdConvertDetail = ko.observableArray(listCdConvertDetail);
        }
    }

    export class CdConvertDetail {
        convertCode: KnockoutObservable<string>;
        lineNumber: KnockoutObservable<number>;
        outputItem: KnockoutObservable<string>;
        systemCode: KnockoutObservable<string>;

        constructor(convertCode: string, lineNumber: number, outputItem: string, systemCode: string) {
            this.convertCode = ko.observable(convertCode);
            this.lineNumber = ko.observable(lineNumber);
            this.outputItem = ko.observable(outputItem);
            this.systemCode = ko.observable(systemCode);
        }
    }

}

$(function() {
    $('#fixed-table tbody').on('click', 'tr', function() {
        var index = $(this).attr('data-id');
        //alert( 'Row index: '+ index );
        nts.uk.ui.errors.clearAll();
        nts.uk.ui._viewModel.content.selectedConvertDetail(index);
        nts.uk.ui._viewModel.content.selectedFocus = true;
    });
    
    //tab , shif+tab    
    $("#fixed-table tbody").on("focus", "input", function() {
        var index = $(this).data('focus-input');
         nts.uk.ui._viewModel.content.selectedFocus = true;
         if (index == undefined) {
             index = $(this).data('focus-system');
             nts.uk.ui._viewModel.content.selectedFocus = false;
         }
        nts.uk.ui.errors.clearAll();
        nts.uk.ui._viewModel.content.selectedConvertDetail(""+index);
    });
})




