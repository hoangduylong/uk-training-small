__viewContext.ready(function() {
    class ScreenModel {

        constructor() {
            var self = this;
        }
        
        info() {
            nts.uk.ui.dialog.info({ messageId: "Msg_15" });
        }
        
        caution() {
            nts.uk.ui.dialog.caution({ messageId: "Msg_983" }).then(() => {
                alert("OK");
            });
        }
        
        error() {
            nts.uk.ui.dialog.error({ messageId: "Msg_59", messageParams: ["X", "Y"] });
        }
        
        confirmDanger() {
            nts.uk.ui.dialog.confirmDanger({ messageId: "Msg_386", messageParams: ["ABC"] }).ifYes(() => {
                alert("YES!");
            });
        }
        
        confirmProceed() {
            nts.uk.ui.dialog.confirmProceed({ messageId: "Msg_749" }).ifYes(() => {
                alert("YES!");
            }).ifNo(() => {
                alert("NO!");
            });
        }
        
        confirmFull() {
            nts.uk.ui.dialog.confirm("Use all confirm handlers").ifYes(() => {
                alert("YES!");
            }).ifNo(() => {
                alert("NO!");
            }).then(() => {
                alert("You choiced anything");
            });
        }
    }

    this.bind(new ScreenModel());

});