module cps001.hParent.vm {
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import modal = nts.uk.ui.windows.sub.modal;

    export class ViewModel {
        constructor() {
            let self = this;
        }
        start() {
        }
        
        openHDialog(){
            modal('../h/index.xhtml').onClosed(() => {
            });
        }

    }

  
}