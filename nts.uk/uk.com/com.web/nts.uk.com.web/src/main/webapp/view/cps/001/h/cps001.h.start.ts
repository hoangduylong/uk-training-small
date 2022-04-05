module cps001.h {
    let __viewContext: any = window['__viewContext'] || {};
    __viewContext.ready(function() {
        __viewContext['viewModel'] = new vm.ViewModel();
        __viewContext['viewModel'].start().done(() => {
            __viewContext.bind(__viewContext['viewModel']);
        });

    });
}