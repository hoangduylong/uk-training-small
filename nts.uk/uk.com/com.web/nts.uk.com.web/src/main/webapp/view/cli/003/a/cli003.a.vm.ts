module nts.uk.com.view.cli003.a.viewmodel {

        export class ScreenModel {
            constructor() {
            }
            
            /**
             * request to  data screen b
             */
            func_Screen_b(): void {
                nts.uk.request.jump("/view/cli/003/b/index.xhtml");
            }
            
            func_Screen_g(): void {
                nts.uk.request.jump("/view/cli/003/g/index.xhtml");
            }
            
    }
}