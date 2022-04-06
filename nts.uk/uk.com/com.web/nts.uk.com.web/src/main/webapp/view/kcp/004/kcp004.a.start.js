var kcp004;
(function (kcp004) {
    var a;
    (function (a) {
        __viewContext.ready(function () {
            var screenModel = new a.viewmodel.ScreenModel();
            __viewContext.bind(screenModel);
            $('#tree-grid').ntsTreeComponent(screenModel.treeGrid).done(function () {
                $('#tree-grid').focusTreeGridComponent();
                screenModel.jsonData(JSON.stringify($('#tree-grid').getDataList(), undefined, 10));
                screenModel.isBindingTreeGrid(true);
                screenModel.getSelectedData();
            });
        });
    })(a = kcp004.a || (kcp004.a = {}));
})(kcp004 || (kcp004 = {}));
//# sourceMappingURL=kcp004.a.start.js.map