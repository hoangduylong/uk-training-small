var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps006;
                (function (cps006) {
                    var a;
                    (function (a) {
                        __viewContext.ready(function () {
                            __viewContext["viewModel"] = new a.viewmodel.ScreenModel();
                            __viewContext.bind(__viewContext["viewModel"]);
                        });
                    })(a = cps006.a || (cps006.a = {}));
                })(cps006 = view.cps006 || (view.cps006 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//$(function() {
//
//    $(document).on('click', '.search-btn', function(evt) {
//        let dataSoureFilter: Array<any> = $("#category_grid").igGrid("option", "dataSource"),
//            vm: any = __viewContext["viewModel"];
//
//        if (dataSoureFilter.length > 0) {
//            vm.id(dataSoureFilter[0].id);
//        }
//
//        vm.isFiltered = true;
//        vm.ctgLstFilter = dataSoureFilter;
//    });
//
//    $(document).on('click', '.clear-btn', function(evt) {
//        let vm: any = __viewContext["viewModel"];
//
//        vm.isFiltered = false;
//        vm.categoryList.removeAll();
//
//        nts.uk.com.view.cps006.a.service.getAllCategory().done(function(data: Array<any>) {
//            if (data.length > 0) {
//                if (vm.isAbolished()) {
//                    vm.categoryList(_.map(data, x => new nts.uk.com.view.cps006.a.viewmodel.CategoryInfo({
//                        id: x.id,
//                        categoryCode: x.categoryCode,
//                        categoryName: x.categoryName,
//                        categoryType: x.categoryType,
//                        isAbolition: x.isAbolition
//                    })));
//                } else {
//                    vm.categoryList(_.map(_.filter(data, x => { return x.isAbolition == 0 }), x => new nts.uk.com.view.cps006.a.viewmodel.CategoryInfo({
//                        id: x.id,
//                        categoryCode: x.categoryCode,
//                        categoryName: x.categoryName,
//                        categoryType: x.categoryType,
//                        isAbolition: x.isAbolition
//                    })));
//
//                }
//            }
//        });
//        $("#category_grid").igGrid("option", "dataSource", vm.categoryList());
//    });
//
//    $(document).on('keydown', 'input.ntsSearchBox.nts-editor.ntsSearchBox_Component', function(e) {
//        if (e.keyCode == 13) {
//            let dataSoureFilter: Array<any> = $("#category_grid").igGrid("option", "dataSource"),
//                vm: any = __viewContext["viewModel"];
//
//            if (dataSoureFilter.length > 0) {
//                vm.id(dataSoureFilter[0].id);
//                setTimeout(function() {
//                    $("#ctgName").focus();
//                }, 100);
//            }
//            vm.isFiltered = true;
//            vm.ctgLstFilter = dataSoureFilter;
//        }
//    })
//
//})
//# sourceMappingURL=cps006.a.start.js.map