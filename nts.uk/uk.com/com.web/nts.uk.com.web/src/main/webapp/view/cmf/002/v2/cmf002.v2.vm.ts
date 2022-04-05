module nts.uk.com.view.cmf002.v2.viewmodel {
    import block = nts.uk.ui.block;
    import getText = nts.uk.resource.getText;
    import model = cmf002.share.model;
    import alertError = nts.uk.ui.dialog.alertError;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;

    export class ScreenModel {
        listOutputCodeConvert: KnockoutObservableArray<model.OutputCodeConvert>;
        selectedOutputCodeConvert: KnockoutObservable<string> = ko.observable("");
        constructor() {
            let self = this;
            let firstItem = new model.OutputCodeConvert("", getText('CMF002_502'), 0);
            self.listOutputCodeConvert = ko.observableArray([firstItem]);
            let parameter = getShared('CMF002_V2_PARAMS');
            if (parameter) {
                self.selectedOutputCodeConvert = ko.observable(parameter.formatSetting);
            }
            $('#V2_2_container').focus();
        }
        start(): JQueryPromise<any> {
            block.invisible();
            let self = this;
            let dfd = $.Deferred();
            dfd.resolve();
            service.getOutputCodeConvertByCompanyId().done(function(result: Array<any>) {
                if (result && result.length) {
                    let _outputCodeConverttResult: Array<any> = _.sortBy(result, ['convertCode']);
                    let _listOutputCodeConvert: Array<model.OutputCodeConvert> = _.map(_outputCodeConverttResult, x => {
                        return new model.OutputCodeConvert(x.convertCode, x.convertName, x.acceptWithoutSetting);
                    });
                    self.listOutputCodeConvert.push.apply(self.listOutputCodeConvert, _listOutputCodeConvert);
                }
                block.clear();
                dfd.resolve();
            }).fail(function(error) {
                alertError(error);
                block.clear();
                dfd.reject();
            });
            return dfd.promise();
        }

        selectConvertCode() {
            let self = this;
            let outputCodeConvert = _.find(ko.toJS(self.listOutputCodeConvert), (x: model.OutputCodeConvert) => x.dispConvertCode == self.selectedOutputCodeConvert());
            setShared("CMF002_J_PARAMS", { outputCodeConvert: outputCodeConvert });
            nts.uk.ui.windows.close();
        }

        cancelSelectConvertCode() {
            nts.uk.ui.windows.close();
        }
    }
}