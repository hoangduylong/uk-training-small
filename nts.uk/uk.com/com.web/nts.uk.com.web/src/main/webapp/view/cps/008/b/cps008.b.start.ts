module cps008.b {
    let __viewContext: any = window['__viewContext'] || {};
    __viewContext.ready(function () {
        __viewContext['viewModel'] = new vm.ViewModel();
        __viewContext.bind(__viewContext['viewModel']);
        setTimeout(() => {
            __viewContext['viewModel'].start();
        }, 1);

        // Re-calculate size
        var currentDialog = nts.uk.ui.windows.getSelf();
        // get globalContext 
        var rgc;
        if (currentDialog.parent) {
            rgc = currentDialog.parent.globalContext
        } else {
            rgc = currentDialog.rgc();
        }

        if (rgc.innerHeight < currentDialog.$dialog.height()) {
            currentDialog.setHeight(rgc.innerHeight - 50);
        }

        if (rgc.innerWidth < currentDialog.$dialog.width()) {
            currentDialog.setWidth(rgc.innerWidth - 50);
        }

    });
}