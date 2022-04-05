module nts.uk.com.view.cps001.g {
     let __viewContext: any = window['__viewContext'] || {};
    __viewContext.ready(function() {
        __viewContext['viewModel'] = new vm.ScreenModel();
        __viewContext.bind(__viewContext['viewModel']);
        __viewContext['viewModel'].startPage();
    });
}