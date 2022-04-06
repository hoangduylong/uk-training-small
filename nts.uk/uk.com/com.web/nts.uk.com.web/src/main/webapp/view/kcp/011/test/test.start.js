var test;
(function (test) {
    __viewContext.ready(function () {
        var screenModel = new test.viewmodel.ScreenModel();
        screenModel.startPage().done(function () {
            __viewContext.bind(screenModel);
        });
    });
})(test || (test = {}));
//# sourceMappingURL=test.start.js.map