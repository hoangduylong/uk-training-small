__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            this.slowrequest = ko.observable(0);
            this.slowquery = ko.observable(0);
        }
        ScreenModel.prototype.load = function () {
            var _this = this;
            nts.uk.request.ajax("diagnosis/setting/get").done(function (res) {
                _this.slowrequest(res.performance.thresholdMillisSlowRequest);
                _this.slowquery(res.performance.thresholdMillisSlowQuery);
            });
        };
        ScreenModel.prototype.update = function () {
            nts.uk.request.ajax("diagnosis/setting/update", {
                performance: {
                    thresholdMillisSlowRequest: this.slowrequest(),
                    thresholdMillisSlowQuery: this.slowquery()
                }
            }).done(function (res) {
                nts.uk.ui.dialog.info("Done!");
            });
        };
        return ScreenModel;
    }());
    var sm = new ScreenModel();
    this.bind(sm);
    sm.load();
});
//# sourceMappingURL=start.js.map