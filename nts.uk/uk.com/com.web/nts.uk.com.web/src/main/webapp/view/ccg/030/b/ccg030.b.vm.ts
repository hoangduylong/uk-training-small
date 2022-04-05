module ccg030.b.viewmodel {
    import model = nts.uk.com.view.ccg.model;

    export class ScreenModel {
        flowmenu: KnockoutObservable<model.FlowMenu>;

        constructor() {
            this.flowmenu = ko.observable(null);
        }

        /** Start Page */
        startPage(): void {
            var self = this;
            var flowmenuDTO: model.PlacementPartDto = nts.uk.ui.windows.getShared("flowmenu");
            var fileID: string = nts.uk.ui.windows.getShared("fileID");
            if (flowmenuDTO !== undefined) {
                let flowMenu = new model.FlowMenu(flowmenuDTO);
                self.flowmenu(flowMenu);
            }
            _.defer(() => { self.setupPositionAndSize(self.flowmenu()); });
        }


        closeDialog(): void {
            nts.uk.ui.windows.close();
        }

        /** Setup position and size for a Placement */
        private setupPositionAndSize(flowmenu: model.FlowMenu) {
            $(".widget-panel").css({
                width: (flowmenu.width() * 150) + ((flowmenu.width() - 1) * 10),
                height: (flowmenu.height() * 150) + ((flowmenu.height() - 1) * 10)
            });
        }
    }
}