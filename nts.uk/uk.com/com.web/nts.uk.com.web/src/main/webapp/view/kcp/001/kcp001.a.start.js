var kcp001;
(function (kcp001) {
    var a;
    (function (a) {
        __viewContext.ready(function () {
            var screenModel = new a.viewmodel.ScreenModel();
            __viewContext.bind(screenModel);
            // Load Component
            $('#empt-list-setting').ntsListComponent(screenModel.listComponentOption).done(function () {
                $('#empt-list-setting').focusComponent();
                // Employment List
                screenModel.employmentList($('#empt-list-setting').getDataList());
                screenModel.jsonData(JSON.stringify(screenModel.employmentList(), undefined, 1));
            });
        });
    })(a = kcp001.a || (kcp001.a = {}));
})(kcp001 || (kcp001 = {}));
//# sourceMappingURL=kcp001.a.start.js.map