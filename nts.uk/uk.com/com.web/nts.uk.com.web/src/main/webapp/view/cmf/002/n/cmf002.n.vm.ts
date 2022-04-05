module nts.uk.com.view.cmf002.n.viewmodel {
    import model = nts.uk.com.view.cmf002.share.model;
    import block = nts.uk.ui.block;
    import getText = nts.uk.resource.getText;
    import confirm = nts.uk.ui.dialog.confirm;
    import alertError = nts.uk.ui.dialog.alertError;
    import info = nts.uk.ui.dialog.info;
    import modal = nts.uk.ui.windows.sub.modal;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import dialog = nts.uk.ui.dialog;
    import error = nts.uk.ui.errors;
    import hasError = nts.uk.ui.errors.hasError;

    export class ScreenModel {
        atWorkDataOutputItem: KnockoutObservable<model.AtWorkDataOutputItem> = ko.observable(new model.AtWorkDataOutputItem({
            closedOutput: null,
            absenceOutput: null,
            fixedValue: 0,
            valueOfFixedValue: null,
            atWorkOutput: null,
            retirementOutput: null
        }));
        isUse: KnockoutObservable<boolean>;
        items: KnockoutObservableArray<model.ItemModel> = ko.observableArray([
            new model.ItemModel(model.NOT_USE_ATR.USE, getText('CMF002_149')),
            new model.ItemModel(model.NOT_USE_ATR.NOT_USE, getText('CMF002_150'))
        ]);
        modeScreen: KnockoutObservable<number> = ko.observable(0);
        isEnable: KnockoutObservable<boolean> = ko.observable(false);

        constructor() {
            var self = this;
        }

        start(): JQueryPromise<any> {
            var self = this;
            var dfd = $.Deferred();
            let params = getShared('CMF002_N_PARAMS');
            self.modeScreen(params.screenMode);
            if (self.modeScreen() == model.DATA_FORMAT_SETTING_SCREEN_MODE.INDIVIDUAL && params.formatSetting) {
                // get data shared
                self.atWorkDataOutputItem(new model.AtWorkDataOutputItem(params.formatSetting));
                dfd.resolve();
            } else {
                service.getAWDataFormatSetting().done(result => {
                    if (result != null) {
                        self.atWorkDataOutputItem(new model.AtWorkDataOutputItem(result));
                    }
                    dfd.resolve();
                }).fail((err) => {
                    nts.uk.ui.dialog.alertError(error);
                    dfd.reject();
                });
            }
            return dfd.promise();
        }

        /**
            * Close dialog.
            */
        cancelSetting(): void {
            nts.uk.ui.windows.close();
        }
        //        self.fixedValue().subscribe(data => {
        //               if(data == 1) $('#N3_1').focus();    
        //               });
        enableCloseOutput() {
            var self = this;
            return (self.atWorkDataOutputItem().fixedValue() == model.NOT_USE_ATR.NOT_USE)
        }

        enableRegister() {
            return error.hasError();
        }

        retirementOutput() {
            var self = this;
            return (self.atWorkDataOutputItem().fixedValue() == model.NOT_USE_ATR.NOT_USE)
        }
        enableAbsenceOutput() {
            var self = this;
            return (self.atWorkDataOutputItem().fixedValue() == model.NOT_USE_ATR.NOT_USE)
        }
        enableAtWorkOutput() {
            var self = this;
            return (self.atWorkDataOutputItem().fixedValue() == model.NOT_USE_ATR.NOT_USE)
        }

        saveSetting() {
            let self = this;
            let command = ko.toJS(self.atWorkDataOutputItem());
            command.atWorkOutput = ("").equals(command.atWorkOutput) ? null : command.atWorkOutput;
            command.absenceOutput = ("").equals(command.absenceOutput) ? null : command.absenceOutput;
            command.closedOutput = ("").equals(command.closedOutput) ? null : command.closedOutput;
            command.retirementOutput = ("").equals(command.retirementOutput) ? null : command.retirementOutput;
            command.valueOfFixedValue = ("").equals(command.valueOfFixedValue) ? null : command.valueOfFixedValue;
            if (self.atWorkDataOutputItem().fixedValue() == model.NOT_USE_ATR.USE) {
                command.atWorkOutput = null;
                command.absenceOutput = null;
                command.closedOutput = null;
                command.retirementOutput = null;
            }
            if (self.atWorkDataOutputItem().fixedValue() == model.NOT_USE_ATR.NOT_USE) {
                command.valueOfFixedValue = null;
            }
            if (!hasError()) {
                if (self.modeScreen() != model.DATA_FORMAT_SETTING_SCREEN_MODE.INDIVIDUAL) {
                    // get data shared
                    service.setAWDataFormatSetting(command).done(function() {
                        dialog.info({ messageId: "Msg_15" }).then(() => {
                            nts.uk.ui.windows.close();
                        });
                    })
                } else {
                    setShared('CMF002_C_PARAMS', { formatSetting: command });
                    nts.uk.ui.windows.close();
                }
            }
        }
        enableFixedValue() {
            var self = this;
            if (self.atWorkDataOutputItem().fixedValue() == model.NOT_USE_ATR.USE) {
                $('#N2_1_2').ntsError('clear');
                $('#N2_2_2').ntsError('clear');
                $('#N2_3_2').ntsError('clear');
                $('#N2_4_2').ntsError('clear');
                self.atWorkDataOutputItem().atWorkOutput(null);
                self.atWorkDataOutputItem().absenceOutput(null);
                self.atWorkDataOutputItem().closedOutput(null);
                self.atWorkDataOutputItem().retirementOutput(null);
                return true;
            }
            if (self.atWorkDataOutputItem().fixedValue() != model.NOT_USE_ATR.USE) {
                $('#N3_2').ntsError('clear');
                self.atWorkDataOutputItem().valueOfFixedValue(null);
                return false;
            }
        }
    }
}