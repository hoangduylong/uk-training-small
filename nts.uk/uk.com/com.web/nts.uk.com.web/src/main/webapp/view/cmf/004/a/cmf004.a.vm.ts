module nts.uk.com.view.cmf004.a {
    export module viewmodel {
        export class ScreenModel {
            constructor() {
            }
            
            /**
             * request to create creation screen
             */
            save(): void {
                let self = this;
                nts.uk.request.jump("/view/cmf/004/b/index.xhtml");
            }
            
            /**
             * request to create creation screen
             */
            autoSave(): void {
                let self = this;
                nts.uk.request.jump("/view/cmf/004/j/index.xhtml");
            }
            
            /**
             * request to reference history screen
             */
            referenceHistoryScreen(): void {
                let self = this;
               nts.uk.request.jump("/view/cmf/002/4/index.xhtml");
            }
        }
    }
}