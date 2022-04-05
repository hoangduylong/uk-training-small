module nts.uk.com.view.cmf002.i.viewmodel {
    import block = nts.uk.ui.block;
    import getText = nts.uk.resource.getText;
    import model = cmf002.share.model;
    import alertError = nts.uk.ui.dialog.alertError;
    import modal = nts.uk.ui.windows.sub.modal;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import dataformatSettingMode = cmf002.share.model.DATA_FORMAT_SETTING_SCREEN_MODE;
    import errors = nts.uk.ui.errors;
    import dialog = nts.uk.ui.dialog;

    export class ScreenModel {
        PLUS = cmf002.share.model.SYMBOL_OPRERATION.PLUS;
        MINUS = cmf002.share.model.SYMBOL_OPRERATION.MINUS;
        notUse = cmf002.share.model.NOT_USE_ATR.NOT_USE;
        use = cmf002.share.model.NOT_USE_ATR.USE;
        numberDataFormatSetting: KnockoutObservable<model.NumberDataFormatSetting> = ko.observable(
            new model.NumberDataFormatSetting({
                formatSelection: model.FORMAT_SELECTION.DECIMAL,
                decimalDigit: null,
                decimalPointClassification: model.DECIMAL_POINT_CLASSIFICATION.OUTPUT_DECIMAL_POINT,
                decimalFraction: model.ROUNDING_METHOD.TRUNCATION,
                outputMinusAsZero: this.notUse,
                fixedValueOperation: this.notUse,
                fixedValueOperationSymbol: this.PLUS,
                fixedCalculationValue: null,
                fixedLengthOutput: this.notUse,
                fixedLengthIntegerDigit: null,
                fixedLengthEditingMethod: model.FIXED_LENGTH_EDITING_METHOD.ZERO_BEFORE,
                nullValueReplace: this.notUse,
                valueOfNullValueReplace: null,
                fixedValue: this.notUse,
                valueOfFixedValue: null
            }));;
        formatSelectionItem: KnockoutObservableArray<model.ItemModel> = ko.observableArray(this.getFormatSelectionItems());
        fixedValueOperationItem: KnockoutObservableArray<model.ItemModel> = ko.observableArray(model.getNotUseAtr());
        fixedLengthOutputItem: KnockoutObservableArray<model.ItemModel> = ko.observableArray(model.getNotUseAtr());
        nullValueReplaceItem: KnockoutObservableArray<model.ItemModel> = ko.observableArray(model.getNotUseAtr());
        fixedValueItem: KnockoutObservableArray<model.ItemModel> = ko.observableArray(model.getNotUseAtr());
        decimalPointClassificationItem: KnockoutObservableArray<model.ItemModel> = ko.observableArray(this.getDecimalPointClassificationItems());
        decimalFractionItem: KnockoutObservableArray<model.ItemModel> = ko.observableArray(this.getDecimalFractionItem());
        fixedValueOperationSymbolItem: KnockoutObservableArray<model.ItemModel> = ko.observableArray(this.getFixedValueOperationSymbolItem());
        fixedLengthEditingMethodItem: KnockoutObservableArray<model.ItemModel> = ko.observableArray(this.getFixedLengthEditingMethodItem());;
        selectModeScreen: KnockoutObservable<number> = ko.observable(dataformatSettingMode.INIT);
        formatSetting: any;

        constructor() {
            let self = this;
            let parameter = getShared('CMF002_I_PARAMS');
            if (parameter) {
                self.formatSetting = parameter.formatSetting;
                self.selectModeScreen(parameter.screenMode)
            }
        }

        start(): JQueryPromise<any> {
            let self = this;
            let dfd = $.Deferred();

            if (self.selectModeScreen() == dataformatSettingMode.INDIVIDUAL && self.formatSetting) {
                self.numberDataFormatSetting(new model.NumberDataFormatSetting(self.formatSetting));
                dfd.resolve();
            } else{
                service.getNumberFormatSetting().done(function(data: any) {
                    if (data != null) {
                        self.numberDataFormatSetting(new model.NumberDataFormatSetting(data));
                    }
                    dfd.resolve();
                }).fail(function(error) {
                    alertError(error);
                    dfd.reject();
                });
            }
            return dfd.promise();
        }

        enableGlobal() {
            let self = this;
            if (self.numberDataFormatSetting().fixedValue() == self.notUse) {
                self.numberDataFormatSetting().valueOfFixedValue(null);
                return true;
            } else {
                self.numberDataFormatSetting().decimalDigit(null);
                self.numberDataFormatSetting().fixedCalculationValue(null);
                self.numberDataFormatSetting().fixedLengthIntegerDigit(null);
                self.numberDataFormatSetting().valueOfNullValueReplace(null);
                return false;
            }
        }
        enableFormatSelection() {
            let self = this;
            let enable = self.numberDataFormatSetting().formatSelection() == model.FORMAT_SELECTION.DECIMAL && self.enableGlobal();
            if (!enable) {
                $('#I2_2_2').ntsError('clear');
                self.numberDataFormatSetting().decimalDigit(null);
                // self.numberDataFormatSetting().decimalDigit(Math.floor(self.numberDataFormatSetting().decimalDigit()));
            }
            return enable;
        }
        enableRegister() {
            return errors.hasError();
        }
        enableDecimalFraction() {
            let self = this;
            return self.numberDataFormatSetting().formatSelection() == model.FORMAT_SELECTION.NO_DECIMAL && self.enableGlobal();
        }
        enableFixedValueOperation() {
            let self = this;
            let enable = self.numberDataFormatSetting().fixedValueOperation() == self.use && self.enableGlobal();
            if (!enable) {
                $('#I4_3').ntsError('clear');
                self.numberDataFormatSetting().fixedCalculationValue(null);
                // self.numberDataFormatSetting().fixedCalculationValue(Math.floor((self.numberDataFormatSetting().fixedCalculationValue()) * 100) / 100);
            }
            return enable;
        }
        enableFixedLengthOutput() {
            let self = this;
            let enable = self.numberDataFormatSetting().fixedLengthOutput() == self.use && self.enableGlobal();
            if (!enable) {
                $('#I5_2_2').ntsError('clear');
                self.numberDataFormatSetting().fixedLengthIntegerDigit(null);
                // self.numberDataFormatSetting().fixedLengthIntegerDigit(Math.floor(self.numberDataFormatSetting().fixedLengthIntegerDigit()));
            }
            return enable;
        }
        enableNullValueReplace() {
            let self = this;
            let enable = self.numberDataFormatSetting().nullValueReplace() == self.use && self.enableGlobal();
            if (!enable) {
                self.numberDataFormatSetting().valueOfNullValueReplace(null);
                $('#I6_2').ntsError('clear');
            }
            return enable;
        }
        enableFixedValueEditor() {
            let self = this;
            let enable = self.numberDataFormatSetting().fixedValue() == self.use;
            if (!enable) {
                $('#I7_2').ntsError('clear');
            }
            return enable;
        }

        selectNumberDataFormatSetting() {
            let self = this;
            errors.clearAll();
            $('#I2_2_2').ntsError(self.enableFormatSelection() ? 'check' : '');
            $('#I4_3').ntsError(self.enableFixedValueOperation() ? 'check' : '');
            $('#I5_2_2').ntsError(self.enableFixedLengthOutput() ? 'check' : '');
            $('#I6_2').ntsError(self.enableNullValueReplace() ? 'check' : '');
            $('#I7_2').ntsError(self.enableFixedValueEditor() ? 'check' : '');

            if (!errors.hasError()) {
                let outputMinusAsZero = self.numberDataFormatSetting().outputMinusAsZero();
                if(outputMinusAsZero == 1 || outputMinusAsZero == true){
                    self.numberDataFormatSetting().outputMinusAsZero(1);    
                }else{
                    self.numberDataFormatSetting().outputMinusAsZero(0); 
                }
                if (self.numberDataFormatSetting().fixedValue() == this.use) {
                    self.numberDataFormatSetting().formatSelection(model.FORMAT_SELECTION.DECIMAL);
                    self.numberDataFormatSetting().decimalDigit(null);
                    self.numberDataFormatSetting().decimalPointClassification(model.DECIMAL_POINT_CLASSIFICATION.OUTPUT_DECIMAL_POINT);
                    self.numberDataFormatSetting().outputMinusAsZero(this.notUse);
                    self.numberDataFormatSetting().fixedValueOperation(this.notUse);
                    self.numberDataFormatSetting().fixedLengthOutput(this.notUse);
                    self.numberDataFormatSetting().nullValueReplace(this.notUse);
                }

                if (self.numberDataFormatSetting().fixedValue() == this.notUse || self.numberDataFormatSetting().valueOfFixedValue() == '') {
                    self.numberDataFormatSetting().valueOfFixedValue = ko.observable(null);
                }

                if (self.numberDataFormatSetting().formatSelection() != model.FORMAT_SELECTION.DECIMAL) {
                    self.numberDataFormatSetting().decimalDigit(null);
                    self.numberDataFormatSetting().decimalPointClassification(model.DECIMAL_POINT_CLASSIFICATION.OUTPUT_DECIMAL_POINT);
                } else {
                    self.numberDataFormatSetting().decimalFraction(model.ROUNDING_METHOD.TRUNCATION);
                }

                if (self.numberDataFormatSetting().fixedValueOperation() == this.notUse) {
                    self.numberDataFormatSetting().fixedValueOperationSymbol(this.PLUS);
                    self.numberDataFormatSetting().fixedCalculationValue(null);
                }

                if (self.numberDataFormatSetting().fixedLengthOutput() == this.notUse) {
                    self.numberDataFormatSetting().fixedLengthIntegerDigit(null);
                    self.numberDataFormatSetting().fixedLengthEditingMethod(model.FIXED_LENGTH_EDITING_METHOD.ZERO_BEFORE);
                }

                if (self.numberDataFormatSetting().nullValueReplace() == this.notUse || self.numberDataFormatSetting().valueOfNullValueReplace() == '') {
                    self.numberDataFormatSetting().valueOfNullValueReplace = ko.observable(null);
                }

                // Case initial
                if (self.selectModeScreen() == dataformatSettingMode.INIT) {
                    service.addNumberFormatSetting(ko.toJS(self.numberDataFormatSetting())).done(result => {
                        dialog.info({ messageId: "Msg_15" }).then(() => {
                            nts.uk.ui.windows.close();
                        });
                    }).fail(function(error) {
                        alertError(error);
                    });
                    // Case individual
                } else {
                    setShared('CMF002_C_PARAMS', { formatSetting: ko.toJS(self.numberDataFormatSetting()) });
                    nts.uk.ui.windows.close();
                }
            }
        }
        cancelNumberDataFormatSetting() {
            nts.uk.ui.windows.close();
        }

        getFormatSelectionItems(): Array<model.ItemModel> {
            return [
                //小数あり
                new model.ItemModel(model.FORMAT_SELECTION.DECIMAL, getText('CMF002_139')),
                //小数なし
                new model.ItemModel(model.FORMAT_SELECTION.NO_DECIMAL, getText('CMF002_140'))
            ];
        }

        getDecimalPointClassificationItems(): Array<model.ItemModel> {
            return [
                //小数点を出力する
                new model.ItemModel(model.DECIMAL_POINT_CLASSIFICATION.OUTPUT_DECIMAL_POINT, getText('CMF002_382')),
                //小数点を出力しない
                new model.ItemModel(model.DECIMAL_POINT_CLASSIFICATION.NO_OUTPUT_DECIMAL_POINT, getText('CMF002_383'))
            ];
        }

        getDecimalFractionItem(): Array<model.ItemModel> {
            return [
                //切り捨て
                new model.ItemModel(model.ROUNDING_METHOD.TRUNCATION, getText('CMF002_384')),
                //切り上げ
                new model.ItemModel(model.ROUNDING_METHOD.ROUND_UP, getText('CMF002_385')),
                //四捨五入
                new model.ItemModel(model.ROUNDING_METHOD.DOWN_4_UP_5, getText('CMF002_386'))
            ];
        }

        getFixedValueOperationSymbolItem(): Array<model.ItemModel> {
            return [
                // +
                new model.ItemModel(this.PLUS, getText('CMF002_389')),
                // -
                new model.ItemModel(this.MINUS, getText('CMF002_390'))
            ];
        }

        getFixedLengthEditingMethodItem(): Array<model.ItemModel> {
            return [
                //前ゼロ
                new model.ItemModel(model.FIXED_LENGTH_EDITING_METHOD.ZERO_BEFORE, getText('CMF002_391')),
                //後ゼロ
                new model.ItemModel(model.FIXED_LENGTH_EDITING_METHOD.ZERO_AFTER, getText('CMF002_392')),
                //前スペース
                new model.ItemModel(model.FIXED_LENGTH_EDITING_METHOD.SPACE_BEFORE, getText('CMF002_393')),
                //後スペース
                new model.ItemModel(model.FIXED_LENGTH_EDITING_METHOD.SPACE_AFTER, getText('CMF002_394'))
            ];
        }
    }
}