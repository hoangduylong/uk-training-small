var ccg030;
(function (ccg030) {
    var b;
    (function (b) {
        var viewmodel;
        (function (viewmodel) {
            var model = nts.uk.com.view.ccg.model;
            var ScreenModel = /** @class */ (function () {
                function ScreenModel() {
                    this.flowmenu = ko.observable(null);
                }
                /** Start Page */
                ScreenModel.prototype.startPage = function () {
                    var self = this;
                    var flowmenuDTO = nts.uk.ui.windows.getShared("flowmenu");
                    var fileID = nts.uk.ui.windows.getShared("fileID");
                    if (flowmenuDTO !== undefined) {
                        var flowMenu = new model.FlowMenu(flowmenuDTO);
                        self.flowmenu(flowMenu);
                    }
                    _.defer(function () { self.setupPositionAndSize(self.flowmenu()); });
                };
                ScreenModel.prototype.closeDialog = function () {
                    nts.uk.ui.windows.close();
                };
                /** Setup position and size for a Placement */
                ScreenModel.prototype.setupPositionAndSize = function (flowmenu) {
                    $(".widget-panel").css({
                        width: (flowmenu.width() * 150) + ((flowmenu.width() - 1) * 10),
                        height: (flowmenu.height() * 150) + ((flowmenu.height() - 1) * 10)
                    });
                };
                return ScreenModel;
            }());
            viewmodel.ScreenModel = ScreenModel;
        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
    })(b = ccg030.b || (ccg030.b = {}));
})(ccg030 || (ccg030 = {}));
//# sourceMappingURL=ccg030.b.vm.js.map