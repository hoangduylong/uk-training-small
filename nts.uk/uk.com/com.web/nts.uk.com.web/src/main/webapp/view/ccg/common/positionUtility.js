var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg;
                (function (ccg) {
                    var positionUtility;
                    (function (positionUtility) {
                        var ANIMATION_EASETYPE = "easeOutQuint";
                        /** Re-order all Placements when init */
                        function initReorderPlacements(listPlacements, checkingPlacements) {
                            if (listPlacements.length > 0) {
                                // Moving Placement
                                var movingPlacement = listPlacements[0];
                                shiftOverlapPart(movingPlacement, checkingPlacements);
                                checkingPlacements.push(listPlacements[0]);
                                _.pullAt(listPlacements, [0]);
                                initReorderPlacements(listPlacements, checkingPlacements);
                            }
                        }
                        positionUtility.initReorderPlacements = initReorderPlacements;
                        /** Recursive move overlap part */
                        function shiftOverlapPart(movingPlacement, checkingPlacements) {
                            var _this = this;
                            var newColumnPosition = [];
                            _.each(checkingPlacements, function (checkingPlacement) {
                                if (!_.isEqual(movingPlacement, checkingPlacement)) {
                                    if (checkIntersect(movingPlacement, checkingPlacement)) {
                                        movingPlacement.column = checkingPlacement.column + checkingPlacement.width;
                                        // Check if new position is overlap
                                        shiftOverlapPart.call(_this, movingPlacement, _.clone(checkingPlacements));
                                    }
                                }
                            });
                        }
                        positionUtility.shiftOverlapPart = shiftOverlapPart;
                        /** Check 2 placements is intersect */
                        function checkIntersect(placeA, placeB) {
                            var AX1 = placeA.column;
                            var AY1 = placeA.row;
                            var AX2 = placeA.column + placeA.width - 1;
                            var AY2 = placeA.row + placeA.height - 1;
                            var BX1 = placeB.column;
                            var BY1 = placeB.row;
                            var BX2 = placeB.column + placeB.width - 1;
                            var BY2 = placeB.row + placeB.height - 1;
                            if (AX1 <= BX2 && AX2 >= BX1 &&
                                AY1 <= BY2 && AY2 >= BY1) {
                                return true;
                            }
                            return false;
                        }
                        positionUtility.checkIntersect = checkIntersect;
                        /** Setup position and size for all Placements */
                        function setupPositionAndSizeAll(placements) {
                            _.forEach(placements, function (placement) {
                                setupPositionAndSize(placement);
                            });
                        }
                        positionUtility.setupPositionAndSizeAll = setupPositionAndSizeAll;
                        /**
                         * Setup position and size for a Placement
                         * @param placement placement need to setup
                         * @param duration milliseconds moving a placement
                         */
                        function setupPositionAndSize(placement, duration) {
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
                        positionUtility.setupPositionAndSize = setupPositionAndSize;
                    })(positionUtility = ccg.positionUtility || (ccg.positionUtility = {}));
                })(ccg = view.ccg || (view.ccg = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=positionUtility.js.map