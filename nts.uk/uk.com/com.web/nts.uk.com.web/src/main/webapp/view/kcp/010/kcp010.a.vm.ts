module kcp010.a.viewmodel {
    import ComponentOption = kcp010.viewmodel.ComponentOption;
    import WorkplaceModel = kcp010.viewmodel.WorkplaceModel;
    
    export class ScreenModel {
        listComponentOption: ComponentOption;

        targetBtnText: string;
        tabIndex: number;
        constructor() {
            let self = this;
            self.targetBtnText = nts.uk.resource.getText("KCP010_3");
            self.tabIndex = 1;
            
            // Initial listComponentOption
            self.listComponentOption = {
                targetBtnText: self.targetBtnText,
                tabIndex: self.tabIndex
            };
        }
    }
}
