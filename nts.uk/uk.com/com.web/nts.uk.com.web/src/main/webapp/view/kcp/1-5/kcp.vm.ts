module kcp.viewmodel {
    import ComponentOption = kcp.share.list.ComponentOption;
    import ListType = kcp.share.list.ListType;
    import SelectType = kcp.share.list.SelectType;
    import UnitModel = kcp.share.list.UnitModel;
    import ClosureSelectionType = kcp.share.list.ClosureSelectionType;
    
    export class ScreenModel {
        selectedCode: KnockoutObservable<string>;
        listComponentOption: ComponentOption;
        alreadySettingList: KnockoutObservableArray<UnitAlreadySettingModel>;
        autoAdjustHeight: KnockoutObservable<Boolean>;
        constructor() {
            let self = this;
            self.selectedCode = ko.observable("");
            self.autoAdjustHeight = ko.observable(false);
            self.listComponentOption = self.configListComponentOption();
            
            self.autoAdjustHeight.subscribe((newValue) => {
                self.listComponentOption.autoAdjustHeight = newValue;
                self.reloadComponent();
            })
        }
        
        private configListComponentOption() : ComponentOption{
            let self = this;
            return {
                isShowAlreadySet: false,
                isMultiSelect: true,
                listType: ListType.EMPLOYMENT,
                selectType: SelectType.SELECT_FIRST_ITEM,
                selectedCode: self.selectedCode,
                isDialog: false,
                isShowNoSelectRow: false,
                maxRows: 12,
                autoAdjustHeight: self.autoAdjustHeight(),
                isDisplayClosureSelection: false,
                isDisplayFullClosureOption: false,
                closureSelectionType: ClosureSelectionType.SELECT_BY_SELECTED_CODE
            }
        }
        
        // Reload component Method
        private reloadComponent() {
            let self = this;
            
            $('#list').ntsListComponent(self.listComponentOption).done(function () {
                $('#list').focusComponent();
            });
            
        }
    }
}