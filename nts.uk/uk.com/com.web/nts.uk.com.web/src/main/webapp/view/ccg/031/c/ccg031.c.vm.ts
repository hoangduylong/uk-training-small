module nts.uk.com.view.ccg031.c.viewmodel {
    import model = nts.uk.com.view.ccg.model;
    import windows = nts.uk.ui.windows;
    import positionUtil = nts.uk.com.view.ccg.positionUtility;

    export class ScreenModel {
        placements: Array<model.Placement>;

        constructor() {
            this.placements = [];
        }

        /** Start Page */
        startPage(): void {
            var self = this;
            var placementDTOs: Array<model.PlacementDto> = windows.getShared("placements");
            if (placementDTOs !== undefined)
                self.placements = _.map(placementDTOs, (placementDTO) => {
                    return new model.Placement(placementDTO);
                });
            _.defer(() => { positionUtil.setupPositionAndSizeAll(self.placements); });
        }

        /** Close Dialog */
        closeDialog(): void {
            windows.close();
        }
    }
}