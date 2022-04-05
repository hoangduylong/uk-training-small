module nts.uk.com.view.ccg022.a.start {
    __viewContext.ready(function() {

        let vm = __viewContext['viewModel'] = new a.screenModel.ViewModel();

        $("#sidebar").ntsSideBar("init", {
            activate: (event, info) => {
            }
        });
        vm.startPage().done((x) => {
            __viewContext.bind(vm);
        });
    });
}