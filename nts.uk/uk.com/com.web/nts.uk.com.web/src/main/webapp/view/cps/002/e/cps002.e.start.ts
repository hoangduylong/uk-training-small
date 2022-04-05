
module cps002.e {
    let __viewContext: any = window['__viewContext'] || {};
    __viewContext.ready(() => {
        __viewContext['viewModel'] = new vm.ViewModel();
        __viewContext['viewModel'].start().done(() => {
            __viewContext.bind(__viewContext['viewModel']);
        });
    });
}