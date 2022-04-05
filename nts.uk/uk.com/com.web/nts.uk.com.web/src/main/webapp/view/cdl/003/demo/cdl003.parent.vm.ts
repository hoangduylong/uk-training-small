module nts.uk.com.view.cdl003.parent.viewmodel {
    
    export class ScreenModel {
        //codes from parent screen
        canSelectClassificationCodes: KnockoutObservable<string>;
        selectClassificationCodes: KnockoutObservable<string>;
        selectMode: KnockoutObservable<boolean>;
        showNoSelection: KnockoutObservable<boolean>;
        constructor() {
            var self = this;
            //construct codes 
            self.canSelectClassificationCodes = ko.observable('');
            self.selectMode = ko.observable(true);
            self.showNoSelection = ko.observable(false);
            self.selectClassificationCodes = ko.observable('');
        }

        /**
         * open dialog cdl003
         */
        public openDialogCDL003(): void {
            let self = this;
            let canSelected = self.canSelectClassificationCodes() ? self.canSelectClassificationCodes().split(',') : [];
            nts.uk.ui.windows.setShared('inputCDL003', {
                selectedCodes: self.selectMode() ? canSelected : canSelected[0],
                showNoSelection: self.showNoSelection(),
                isMultiple: self.selectMode()
            }, true);

            nts.uk.ui.windows.sub.modal('/view/cdl/003/a/index.xhtml').onClosed(function(): any {
                //view all code of selected item 
                var output = nts.uk.ui.windows.getShared('outputCDL003');
                if (output) {
                    self.selectClassificationCodes(output);
                }
            })
        }
    }
}
