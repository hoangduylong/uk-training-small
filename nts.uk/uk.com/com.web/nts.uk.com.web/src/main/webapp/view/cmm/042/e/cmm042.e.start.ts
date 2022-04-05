module cmm042.e {
    let __viewContext: any = window['__viewContext'] || {};
    __viewContext.ready(function() {
        __viewContext['viewModel'] = new viewmodel.ViewModel();
        __viewContext.bind(__viewContext['viewModel']);
        $('#combo-box-Cab').focus();
    });
}