module nts.uk.com.view.cmf005.a.viewmodel {

        export class ScreenModel {
            constructor() {
            }
            
            /**
             * request to delete data screen
             */
            openDeleteDataScreen(): void {
                nts.uk.request.jump("/view/cmf/005/b/index.xhtml");
            }

            openSettingScreen(): void {
              nts.uk.request.jump("/view/cmf/005/c/index.xhtml");
            }
            
            openHistoryScreen(): void {
              nts.uk.request.jump("/view/cmf/005/i/index.xhtml");
            }
    }
}