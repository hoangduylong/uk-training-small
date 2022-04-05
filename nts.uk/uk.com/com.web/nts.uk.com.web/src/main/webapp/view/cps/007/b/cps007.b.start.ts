module cps007.b {
    let __viewContext: any = window['__viewContext'] || {};
    __viewContext.ready(function() {
        __viewContext['viewModel'] = new vm.ViewModel();
        __viewContext.bind(__viewContext['viewModel']);
        
        // focus to first input textbox
        $('input:first').focus();
    });
}