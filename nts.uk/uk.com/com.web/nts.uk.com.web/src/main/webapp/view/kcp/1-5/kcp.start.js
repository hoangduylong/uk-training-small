var kcp;
(function (kcp) {
    __viewContext.ready(function () {
        var screenModel = new kcp.viewmodel.ScreenModel();
        __viewContext.bind(screenModel);
        // Load Component
        $('#list').ntsListComponent(screenModel.listComponentOption)
            .done(function () {
            $('#list').focusComponent();
        });
    });
})(kcp || (kcp = {}));
//# sourceMappingURL=kcp.start.js.map