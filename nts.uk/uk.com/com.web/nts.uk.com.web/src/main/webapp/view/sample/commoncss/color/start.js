__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            self.additionalColorInfo();
        }
        ScreenModel.prototype.additionalColorInfo = function () {
            var self = this;
            $(".color-info").each(function (index, element) {
                var hex = $(element).text();
                var $div = $("<div class='expand-color'></div>");
                $div.text(self.hexToRgb(hex).toString());
                $(element).append($div).css("background-color", hex);
            });
        };
        ScreenModel.prototype.hexToRgb = function (hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? new RGB(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) : null;
        };
        return ScreenModel;
    }());
    var RGB = /** @class */ (function () {
        function RGB(r, g, b) {
            this.r = r;
            this.g = g;
            this.b = b;
        }
        RGB.prototype.toString = function () {
            return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
        };
        return RGB;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map