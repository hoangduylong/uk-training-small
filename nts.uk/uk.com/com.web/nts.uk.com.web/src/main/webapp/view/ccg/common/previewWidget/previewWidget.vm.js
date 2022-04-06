var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg;
                (function (ccg) {
                    var common;
                    (function (common) {
                        var previewWidget;
                        (function (previewWidget) {
                            var viewmodel;
                            (function (viewmodel) {
                                var model = nts.uk.com.view.ccg.model;
                                var windows = nts.uk.ui.windows;
                                var location = nts.uk.request.location;
                                var positionUtil = nts.uk.com.view.ccg.positionUtility;
                                var ScreenModel = /** @class */ (function () {
                                    function ScreenModel() {
                                        var self = this;
                                        self.layoutID = null;
                                        self.placements = ko.observableArray([]);
                                        self.placements.subscribe(function (changes) {
                                            if (changes.length > 0)
                                                self.isEmpty(false);
                                            else
                                                self.isEmpty(true);
                                        });
                                        self.isEmpty = ko.observable(true);
                                    }
                                    /** Start Page */
                                    ScreenModel.prototype.startPage = function () {
                                        var self = this;
                                        var dfd = $.Deferred();
                                        self.layoutID = location.current.queryString.items['layoutid'];
                                        previewWidget.service.active(self.layoutID).done(function (data) {
                                            if (data !== undefined) {
                                                var listPlacement = _.map(data.placements, function (item) {
                                                    return new model.Placement(item);
                                                });
                                                listPlacement = _.orderBy(listPlacement, ['row', 'column'], ['asc', 'asc']);
                                                self.placements(listPlacement);
                                            }
                                            _.defer(function () { self.initDisplay(); });
                                            dfd.resolve();
                                        }).fail(function (res) {
                                            dfd.fail();
                                        });
                                        return dfd.promise();
                                    };
                                    /** Close Dialog */
                                    ScreenModel.prototype.closeDialog = function () {
                                        windows.close();
                                    };
                                    /** Init all Widget display & binding */
                                    ScreenModel.prototype.initDisplay = function () {
                                        var self = this;
                                        positionUtil.initReorderPlacements(_.clone(self.placements()), []);
                                        positionUtil.setupPositionAndSizeAll(self.placements());
                                    };
                                    return ScreenModel;
                                }());
                                viewmodel.ScreenModel = ScreenModel;
                            })(viewmodel = previewWidget.viewmodel || (previewWidget.viewmodel = {}));
                        })(previewWidget = common.previewWidget || (common.previewWidget = {}));
                    })(common = ccg.common || (ccg.common = {}));
                })(ccg = view.ccg || (view.ccg = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=previewWidget.vm.js.map