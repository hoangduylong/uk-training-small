module nts.uk.com.view.cdl028.test.viewmodel {

    export class ScreenModel {

        constructor() {
            let self = this;

        }
        /**
         * startPage
         */
        public startPage(): JQueryPromise<any> {
            let self = this;
            let dfd = $.Deferred();

            dfd.resolve();
            return dfd.promise();
        }

        /**
         * closeDialog
         */
        public openDialog() {
            let params = {
                date: "2000/01/01",
                mode: 5
            };

            nts.uk.ui.windows.setShared("CDL028_INPUT", params);

            nts.uk.ui.windows.sub.modal("/view/cdl/028/a/index.xhtml").onClosed(function() {
                console.log(nts.uk.ui.windows.getShared("CDL028_A_PARAMS"));
            });

        }

    }
}