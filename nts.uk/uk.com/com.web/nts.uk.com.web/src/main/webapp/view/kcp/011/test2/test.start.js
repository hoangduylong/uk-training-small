var test2;
(function (test2) {
    __viewContext.ready(function () {
        var screenModel = new test2.viewmodel.ScreenModel();
        screenModel.startPage().done(function () {
            __viewContext.bind(screenModel);
        });
    });
})(test2 || (test2 = {}));
//# sourceMappingURL=test.start.js.map