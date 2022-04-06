var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg031;
                (function (ccg031) {
                    var c;
                    (function (c) {
                        var viewmodel;
                        (function (viewmodel) {
                            var model = nts.uk.com.view.ccg.model;
                            var windows = nts.uk.ui.windows;
                            var positionUtil = nts.uk.com.view.ccg.positionUtility;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.placements = [];
                                }
                                /** Start Page */
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var placementDTOs = windows.getShared("placements");
                                    if (placementDTOs !== undefined)
                                        self.placements = _.map(placementDTOs, function (placementDTO) {
                                            return new model.Placement(placementDTO);
                                        });
                                    _.defer(function () { positionUtil.setupPositionAndSizeAll(self.placements); });
                                };
                                /** Close Dialog */
                                ScreenModel.prototype.closeDialog = function () {
                                    windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = c.viewmodel || (c.viewmodel = {}));
                    })(c = ccg031.c || (ccg031.c = {}));
                })(ccg031 = view.ccg031 || (view.ccg031 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg031.c.vm.js.map