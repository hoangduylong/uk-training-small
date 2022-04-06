__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            // Init UserGuide
            $("[data-toggle='userguide']").ntsUserGuide();
        }
        ScreenModel.prototype.showOverlayTop = function () {
            $(".userguide-top").ntsUserGuide("show");
        };
        ScreenModel.prototype.showOverlayBottom = function () {
            $(".userguide-bottom").ntsUserGuide("show");
        };
        return ScreenModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map