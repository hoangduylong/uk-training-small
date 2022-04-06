var kcp009;
(function (kcp009) {
    var a;
    (function (a) {
        __viewContext.ready(function () {
            var screenModel = new a.viewmodel.ScreenModel();
            __viewContext.bind(screenModel);
            // Load listComponent
            $('#emp-component').ntsLoadListComponent(screenModel.listComponentOption);
            $('#emp-component1').ntsLoadListComponent(screenModel.listComponentOption1);
        });
    })(a = kcp009.a || (kcp009.a = {}));
})(kcp009 || (kcp009 = {}));
//# sourceMappingURL=kcp009.a.start.js.map