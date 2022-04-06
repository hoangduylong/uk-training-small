var cps008;
(function (cps008) {
    var b;
    (function (b) {
        var __viewContext = window['__viewContext'] || {};
        __viewContext.ready(function () {
            __viewContext['viewModel'] = new b.vm.ViewModel();
            __viewContext.bind(__viewContext['viewModel']);
            setTimeout(function () {
                __viewContext['viewModel'].start();
            }, 1);
            // Re-calculate size
            var currentDialog = nts.uk.ui.windows.getSelf();
            // get globalContext 
            var rgc;
            if (currentDialog.parent) {
                rgc = currentDialog.parent.globalContext;
            }
            else {
                rgc = currentDialog.rgc();
            }
            if (rgc.innerHeight < currentDialog.$dialog.height()) {
                currentDialog.setHeight(rgc.innerHeight - 50);
            }
            if (rgc.innerWidth < currentDialog.$dialog.width()) {
                currentDialog.setWidth(rgc.innerWidth - 50);
            }
        });
    })(b = cps008.b || (cps008.b = {}));
})(cps008 || (cps008 = {}));
//# sourceMappingURL=cps008.b.start.js.map