var kcp010;
(function (kcp010) {
    var a;
    (function (a) {
        var viewmodel;
        (function (viewmodel) {
            var ScreenModel = /** @class */ (function () {
                function ScreenModel() {
                    var self = this;
                    self.targetBtnText = nts.uk.resource.getText("KCP010_3");
                    self.tabIndex = 1;
                    // Initial listComponentOption
                    self.listComponentOption = {
                        targetBtnText: self.targetBtnText,
                        tabIndex: self.tabIndex
                    };
                }
                return ScreenModel;
            }());
            viewmodel.ScreenModel = ScreenModel;
        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
    })(a = kcp010.a || (kcp010.a = {}));
})(kcp010 || (kcp010 = {}));
//# sourceMappingURL=kcp010.a.vm.js.map