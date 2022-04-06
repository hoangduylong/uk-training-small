var kcp;
(function (kcp) {
    var viewmodel;
    (function (viewmodel) {
        var ListType = kcp.share.list.ListType;
        var SelectType = kcp.share.list.SelectType;
        var ClosureSelectionType = kcp.share.list.ClosureSelectionType;
        var ScreenModel = /** @class */ (function () {
            function ScreenModel() {
                var self = this;
                self.selectedCode = ko.observable("");
                self.autoAdjustHeight = ko.observable(false);
                self.listComponentOption = self.configListComponentOption();
                self.autoAdjustHeight.subscribe(function (newValue) {
                    self.listComponentOption.autoAdjustHeight = newValue;
                    self.reloadComponent();
                });
            }
            ScreenModel.prototype.configListComponentOption = function () {
                var self = this;
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
                };
            };
            // Reload component Method
            ScreenModel.prototype.reloadComponent = function () {
                var self = this;
                $('#list').ntsListComponent(self.listComponentOption).done(function () {
                    $('#list').focusComponent();
                });
            };
            return ScreenModel;
        }());
        viewmodel.ScreenModel = ScreenModel;
    })(viewmodel = kcp.viewmodel || (kcp.viewmodel = {}));
})(kcp || (kcp = {}));
//# sourceMappingURL=kcp.vm.js.map