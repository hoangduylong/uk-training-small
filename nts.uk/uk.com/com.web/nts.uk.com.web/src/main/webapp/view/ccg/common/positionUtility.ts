module nts.uk.com.view.ccg.positionUtility {
    const ANIMATION_EASETYPE: string = "easeOutQuint";

    /** Re-order all Placements when init */
    export function initReorderPlacements(listPlacements: Array<model.Placement>, checkingPlacements: Array<model.Placement>): void {
        if (listPlacements.length > 0) {
            // Moving Placement
            var movingPlacement = listPlacements[0];
            shiftOverlapPart(movingPlacement, checkingPlacements);

            checkingPlacements.push(listPlacements[0]);
            _.pullAt(listPlacements, [0]);
            initReorderPlacements(listPlacements, checkingPlacements);
        }
    }

    /** Recursive move overlap part */
    export function shiftOverlapPart(movingPlacement: model.Placement, checkingPlacements: Array<model.Placement>): void {
        var newColumnPosition: Array<number> = [];
        _.each(checkingPlacements, (checkingPlacement) => {
            if (!_.isEqual(movingPlacement, checkingPlacement)) {
                if (checkIntersect(movingPlacement, checkingPlacement)) {
                    movingPlacement.column = checkingPlacement.column + checkingPlacement.width;
                    // Check if new position is overlap
                    shiftOverlapPart.call(this, movingPlacement, _.clone(checkingPlacements));
                }
            }
        });
    }

    /** Check 2 placements is intersect */
    export function checkIntersect(placeA: model.Placement, placeB: model.Placement): boolean {
        var AX1: number = placeA.column;
        var AY1: number = placeA.row;
        var AX2: number = placeA.column + placeA.width - 1;
        var AY2: number = placeA.row + placeA.height - 1;
        var BX1: number = placeB.column;
        var BY1: number = placeB.row;
        var BX2: number = placeB.column + placeB.width - 1;
        var BY2: number = placeB.row + placeB.height - 1;
        if (AX1 <= BX2 && AX2 >= BX1 &&
            AY1 <= BY2 && AY2 >= BY1) {
            return true;
        }
        return false;
    }
    
    /** Setup position and size for all Placements */
    export function setupPositionAndSizeAll(placements: Array<model.Placement>): void {
        _.forEach(placements, (placement) => {
            setupPositionAndSize(placement);
        });
    }

    /**
     * Setup position and size for a Placement
     * @param placement placement need to setup
     * @param duration milliseconds moving a placement
     */
    export function setupPositionAndSize(placement: model.Placement, duration?: number): void {
        var $placement = $("#" + placement.placementID);
        duration = duration || 0;
        $placement.css({
            width: (placement.width * 150) + ((placement.width - 1) * 10),
            height: (placement.height * 150) + ((placement.height - 1) * 10)
        });
        if (duration === 0) {
            $placement.css({
                top: ((placement.row - 1) * 150) + ((placement.row - 1) * 10),
                left: ((placement.column - 1) * 150) + ((placement.column - 1) * 10)
            });
        }
        else {
            $placement.animate({
                top: ((placement.row - 1) * 150) + ((placement.row - 1) * 10),
                left: ((placement.column - 1) * 150) + ((placement.column - 1) * 10),
            }, duration, ANIMATION_EASETYPE);
        }
    }

}