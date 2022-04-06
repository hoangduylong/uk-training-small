__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
        }
        ScreenModel.prototype.resize = function () {
            if ($("#tabs-complex").width() > 700)
                $("#tabs-complex").width(700);
            else
                $("#tabs-complex").width("auto");
        };
        return ScreenModel;
    }());
    $(".draggable").draggable({});
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map