var kcp010;
(function (kcp010) {
    var a;
    (function (a) {
        __viewContext.ready(function () {
            var screenModel = new a.viewmodel.ScreenModel();
            __viewContext.bind(screenModel);
            // Load listComponent
            $('#wkp-component').ntsLoadListComponent(screenModel.listComponentOption);
        });
    })(a = kcp010.a || (kcp010.a = {}));
})(kcp010 || (kcp010 = {}));
//# sourceMappingURL=kcp010.a.start.js.map