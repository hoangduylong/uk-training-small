var kcp003;
(function (kcp003) {
    var a;
    (function (a) {
        __viewContext.ready(function () {
            var screenModel = new a.viewmodel.ScreenModel();
            __viewContext.bind(screenModel);
            // Load listComponent and initial Job Title List
            $('#component-items-list').ntsListComponent(screenModel.listComponentOption).done(function () {
                $('#component-items-list').focusComponent();
                // Job Title List
                screenModel.jobTitleList($('#component-items-list').getDataList());
                screenModel.jsonData(JSON.stringify(screenModel.jobTitleList(), undefined, 1));
            });
        });
    })(a = kcp003.a || (kcp003.a = {}));
})(kcp003 || (kcp003 = {}));
//# sourceMappingURL=kcp003.a.start.js.map