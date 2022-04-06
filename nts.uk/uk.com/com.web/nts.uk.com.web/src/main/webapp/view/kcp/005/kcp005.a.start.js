var kcp005;
(function (kcp005) {
    var a;
    (function (a) {
        __viewContext.ready(function () {
            var screenModel = new a.viewmodel.ScreenModel();
            __viewContext.bind(screenModel);
            // Load listComponent
            $('#component-items-list').ntsListComponent(screenModel.listComponentOption).done(function () {
                $('#component-items-list').focusComponent();
                screenModel.jsonData(JSON.stringify($('#component-items-list').getDataList(), undefined, 1));
            });
        });
    })(a = kcp005.a || (kcp005.a = {}));
})(kcp005 || (kcp005 = {}));
//# sourceMappingURL=kcp005.a.start.js.map