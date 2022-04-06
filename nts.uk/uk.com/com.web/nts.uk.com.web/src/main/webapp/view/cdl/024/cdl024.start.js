var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var at;
        (function (at) {
            var view;
            (function (view) {
                var cdl024;
                (function (cdl024) {
                    __viewContext.ready(function () {
                        var screenModel = new cdl024.viewmodel.ScreenModel();
                        screenModel.startPage().done(function () {
                            $("#multi-list").ntsGridList({
                                height: 336,
                                dataSource: screenModel.items,
                                optionsValue: 'code',
                                columns: screenModel.columns,
                                multiple: screenModel.selectMultiple(),
                                value: [].slice.call(screenModel.currentCodeList)
                            });
                            __viewContext.bind(screenModel);
                        });
                    });
                })(cdl024 = view.cdl024 || (view.cdl024 = {}));
            })(view = at.view || (at.view = {}));
        })(at = uk.at || (uk.at = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl024.start.js.map