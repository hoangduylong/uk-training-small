__viewContext.ready(function () {
    class ScreenModel {
        constructor() {
            var self = this;
        }
    }
    this.bind(new ScreenModel());
});

function OpenModalSubWindow(){
    nts.uk.ui.windows.sub.modal("/view/sample/functionwrap/subwindow/subwindow.xhtml");
}

function OpenModelessSubWindow(){
    nts.uk.ui.windows.sub.modeless("/view/sample/functionwrap/subwindow/subwindow.xhtml");
}

function openDialog() {
    nts.uk.ui.windows.sub.modeless("/view/sample/functionwrap/subwindow/dialog.xhtml");
}

function openDialogB() {
    nts.uk.ui.windows.sub.modeless("/view/sample/functionwrap/subwindow/dialogb.xhtml");
}
function openDialogC() {
    $("#switch-language").ntsSwitchMasterLanguage();
    
    $("#switch-language").on( "selectionChanged", function( event, arg1, arg2 ) {
        alert( event.detail.languageId ); // "bar"
    });
}