__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
        }
        ScreenModel.prototype.exportFile = function () {
            nts.uk.request.exportFile('/sample/report/generate', { value: 'abc' }).done(function () {
                console.log('DONE!!');
            });
        };
        return ScreenModel;
    }());
    this.transferred.ifPresent(function (data) {
        console.log(data);
    });
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map