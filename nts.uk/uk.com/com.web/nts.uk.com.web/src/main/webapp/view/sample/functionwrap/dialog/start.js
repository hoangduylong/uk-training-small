__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
        }
        ScreenModel.prototype.info = function () {
            nts.uk.ui.dialog.info({ messageId: "Msg_15" });
        };
        ScreenModel.prototype.caution = function () {
            nts.uk.ui.dialog.caution({ messageId: "Msg_983" }).then(function () {
                alert("OK");
            });
        };
        ScreenModel.prototype.error = function () {
            nts.uk.ui.dialog.error({ messageId: "Msg_59", messageParams: ["X", "Y"] });
        };
        ScreenModel.prototype.confirmDanger = function () {
            nts.uk.ui.dialog.confirmDanger({ messageId: "Msg_386", messageParams: ["ABC"] }).ifYes(function () {
                alert("YES!");
            });
        };
        ScreenModel.prototype.confirmProceed = function () {
            nts.uk.ui.dialog.confirmProceed({ messageId: "Msg_749" }).ifYes(function () {
                alert("YES!");
            }).ifNo(function () {
                alert("NO!");
            });
        };
        ScreenModel.prototype.confirmFull = function () {
            nts.uk.ui.dialog.confirm("Use all confirm handlers").ifYes(function () {
                alert("YES!");
            }).ifNo(function () {
                alert("NO!");
            }).then(function () {
                alert("You choiced anything");
            });
        };
        return ScreenModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map