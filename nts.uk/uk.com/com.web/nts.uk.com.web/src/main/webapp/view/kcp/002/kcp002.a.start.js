var kcp002;
(function (kcp002) {
    var a;
    (function (a) {
        __viewContext.ready(function () {
            var screenModel = new a.viewmodel.ScreenModel();
            __viewContext.bind(screenModel);
            //load Classification list
            $('#classification-list-setting').ntsListComponent(screenModel.listComponentOption).done(function () {
                $('#classification-list-setting').focusComponent();
                screenModel.classificationList($('#classification-list-setting').getDataList());
                screenModel.jsonData(JSON.stringify($('#classification-list-setting').getDataList(), undefined, 2));
            });
        });
    })(a = kcp002.a || (kcp002.a = {}));
})(kcp002 || (kcp002 = {}));
//# sourceMappingURL=kcp002.a.start.js.map