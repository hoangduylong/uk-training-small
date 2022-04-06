var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg031;
                (function (ccg031) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var model = nts.uk.com.view.ccg.model;
                            var util = nts.uk.util;
                            var windows = nts.uk.ui.windows;
                            var ntsNumber = nts.uk.ntsNumber;
                            var dialog = nts.uk.ui.dialog;
                            var block = nts.uk.ui.block;
                            var positionUtil = nts.uk.com.view.ccg.positionUtility;
                            var MINROW = 4;
                            var MINCOLUMN = 6;
                            var ANIMATION_DURATION = 500;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    // Layout Info
                                    self.parentCode = null;
                                    self.layoutID = null;
                                    self.pgType = null;
                                    // Layout Grid
                                    self.layoutGrid = ko.observable(new LayoutGrid(MINROW, MINCOLUMN));
                                    // Placement
                                    self.placements = ko.observableArray([]);
                                }
                                /** Start Page */
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    block.invisible();
                                    var layoutInfo = windows.getShared("layout");
                                    if (layoutInfo !== undefined) {
                                        self.parentCode = layoutInfo.parentCode;
                                        self.layoutID = layoutInfo.layoutID;
                                        self.pgType = layoutInfo.pgType;
                                    }
                                    a.service.active(self.layoutID).done(function (data) {
                                        if (data !== undefined) {
                                            var listPlacement = _.map(data.placements, function (item) {
                                                return new model.Placement(item);
                                            });
                                            listPlacement = _.orderBy(listPlacement, ['row', 'column'], ['asc', 'asc']);
                                            self.placements(listPlacement);
                                        }
                                        _.defer(function () {
                                            self.initDisplay();
                                            self.setHeight();
                                        });
                                        dfd.resolve();
                                    }).fail(function (res) {
                                        dfd.fail();
                                    }).always(function () {
                                        block.clear();
                                    });
                                    return dfd.promise();
                                };
                                /** Registry Layout */
                                ScreenModel.prototype.registryLayout = function () {
                                    var self = this;
                                    block.invisible();
                                    a.service.registry(self.parentCode, self.layoutID, self.pgType, self.placements())
                                        .done(function (data) {
                                        self.layoutID = data;
                                        dialog.info({ messageId: "Msg_15" });
                                    }).fail(function (res) {
                                        dialog.alertError({ messageId: res.messageId });
                                    }).always(function () {
                                        block.clear();
                                    });
                                };
                                /** Close Dialog */
                                ScreenModel.prototype.closeDialog = function () {
                                    var self = this;
                                    var layoutInfo = {
                                        parentCode: self.parentCode,
                                        layoutID: self.layoutID,
                                        pgType: self.pgType
                                    };
                                    windows.setShared("layout", layoutInfo, false);
                                    windows.close();
                                };
                                /** Add Column button click */
                                ScreenModel.prototype.addColumnButtonClick = function () {
                                    this.layoutGrid().addColumn(1);
                                    this.setupDroppable();
                                };
                                /** Add Row button click */
                                ScreenModel.prototype.addRowButtonClick = function () {
                                    this.layoutGrid().addRow(1);
                                    this.setupDroppable();
                                };
                                /** Open Add TopPage-Part Dialog */
                                ScreenModel.prototype.openAddDialog = function (row, column, element) {
                                    var self = this;
                                    block.invisible();
                                    $(element).addClass("hover");
                                    windows.setShared("pgtype", self.pgType, false);
                                    windows.setShared("size", { row: row, column: column }, false);
                                    windows.sub.modal("/view/ccg/031/b/index.xhtml").onClosed(function () {
                                        block.clear();
                                        var placementDto = windows.getShared("placement");
                                        if (!util.isNullOrUndefined(placementDto)) {
                                            if (placementDto.placementPartDto.type != 4) {
                                                a.service.findPlacementPart(placementDto.placementPartDto.topPagePartID).done(function (data) {
                                                    placementDto.placementPartDto = data;
                                                    self.addPlacementToList(new model.Placement(placementDto));
                                                });
                                            }
                                            else {
                                                self.addPlacementToList(new model.Placement(placementDto));
                                            }
                                        }
                                        ;
                                        $(element).removeClass("hover");
                                    });
                                };
                                ScreenModel.prototype.addPlacementToList = function (placement) {
                                    var self = this;
                                    self.placements.push(placement);
                                    positionUtil.setupPositionAndSize(placement);
                                    var movingPlacementIds = self.layoutGrid().markOccupied(placement);
                                    self.reorderPlacements(movingPlacementIds, [placement.placementID]);
                                    self.autoExpandLayout();
                                    self.markOccupiedAll();
                                    self.setupDragDrop();
                                };
                                /** Open Preview Dialog */
                                ScreenModel.prototype.openPreviewDialog = function () {
                                    block.invisible();
                                    var placementDtos = _.map(this.placements(), function (item) {
                                        return item.buildPlacementDto();
                                    });
                                    windows.setShared("placements", placementDtos, false);
                                    windows.sub.modal("/view/ccg/031/c/index.xhtml").onClosed(function () {
                                        block.clear();
                                    });
                                };
                                /** Open Preview Dialog */
                                ScreenModel.prototype.removeWidget = function (placementID) {
                                    var self = this;
                                    var placement = _.find(self.placements(), ['placementID', placementID]);
                                    self.layoutGrid().clearOccupied(placement);
                                    self.placements.remove(placement);
                                };
                                /** Init all Widget display & binding */
                                ScreenModel.prototype.initDisplay = function () {
                                    var self = this;
                                    positionUtil.initReorderPlacements(_.clone(self.placements()), []);
                                    self.autoExpandLayout();
                                    self.markOccupiedAll();
                                    positionUtil.setupPositionAndSizeAll(self.placements());
                                    self.setupDragDrop();
                                };
                                /** Setup Draggable & Droppable */
                                ScreenModel.prototype.setupDragDrop = function () {
                                    this.setupDragable();
                                    this.setupDroppable();
                                };
                                /** Setup Dragable */
                                ScreenModel.prototype.setupDragable = function () {
                                    $(".widget-panel").draggable({
                                        opacity: .8,
                                        distance: 25,
                                        scroll: true,
                                        containment: ".placement-container",
                                        cancel: ".panel-content,.remove-button",
                                        revert: "invalid",
                                        stack: ".widget-panel",
                                        iframeFix: true
                                    });
                                };
                                /** Setup Droppable */
                                ScreenModel.prototype.setupDroppable = function () {
                                    var self = this;
                                    $(".layout-cell").droppable({
                                        tolerance: "pointer",
                                        classes: { "ui-droppable-hover": "hover" },
                                        drop: function (event, ui) {
                                            // Update Placement position
                                            var $dropable = $(event.target);
                                            var $dragable = ui.draggable;
                                            var placement = _.find(self.placements(), ['placementID', $dragable.attr("id")]);
                                            self.layoutGrid().clearOccupied(placement);
                                            placement.row = ntsNumber.getDecimal($dropable.attr("id").split("-")[1], 0);
                                            placement.column = ntsNumber.getDecimal($dropable.attr("id").split("-")[2], 0);
                                            positionUtil.setupPositionAndSize(placement);
                                            var movingPlacementIds = self.layoutGrid().markOccupied(placement);
                                            self.reorderPlacements(movingPlacementIds, [placement.placementID]);
                                            self.autoExpandLayout();
                                            self.markOccupiedAll();
                                            self.setupDragDrop();
                                        }
                                    });
                                };
                                /**
                                 * Re-order list Placements with a list checking Placements
                                 * @param movingPlacementIds list placementID need to move
                                 * @param checkingPlacementIds list placementID need to check overlap
                                 */
                                ScreenModel.prototype.reorderPlacements = function (movingPlacementIds, checkingPlacementIds) {
                                    var self = this;
                                    var movingPlacements = _.filter(self.placements(), function (placement) {
                                        return _.includes(movingPlacementIds, placement.placementID);
                                    });
                                    movingPlacements = _.orderBy(movingPlacements, ['row', 'column'], ['asc', 'asc']);
                                    var listOverlapPlacement = [];
                                    _.each(movingPlacements, function (movingPlacement) {
                                        self.layoutGrid().clearOccupied(movingPlacement);
                                        var checkingPlacements = _.filter(self.placements(), function (placement) {
                                            return _.includes(checkingPlacementIds, placement.placementID);
                                        });
                                        positionUtil.shiftOverlapPart(movingPlacement, checkingPlacements);
                                        // Add that moving placement to checking so that Placement won't be move anymore
                                        checkingPlacementIds.push(movingPlacement.placementID);
                                        checkingPlacementIds = _.union(checkingPlacementIds);
                                        // List Placement need to moving because their parents were moved
                                        listOverlapPlacement = _.concat(listOverlapPlacement, self.layoutGrid().markOccupied(movingPlacement));
                                        self.autoExpandLayout();
                                        positionUtil.setupPositionAndSize(movingPlacement, ANIMATION_DURATION);
                                    });
                                    if (listOverlapPlacement.length > 0)
                                        self.reorderPlacements.call(self, listOverlapPlacement, checkingPlacementIds);
                                };
                                /** Expand layout */
                                ScreenModel.prototype.autoExpandLayout = function () {
                                    var self = this;
                                    _.forEach(self.placements(), function (placement) {
                                        // Expand Row
                                        var totalRow = self.layoutGrid().rows();
                                        var expandRow = (placement.row + placement.height - 1) - totalRow;
                                        if (expandRow > 0) {
                                            self.layoutGrid().addRow(expandRow);
                                            self.autoExpandLayout();
                                        }
                                        // Expand Column
                                        var totalColumn = self.layoutGrid().columns();
                                        var expandColumn = (placement.column + placement.width - 1) - totalColumn;
                                        if (expandColumn > 0) {
                                            self.layoutGrid().addColumn(expandColumn);
                                            self.autoExpandLayout();
                                        }
                                    });
                                };
                                /** Setup occupied for all Placements */
                                ScreenModel.prototype.markOccupiedAll = function () {
                                    var self = this;
                                    _.each(self.placements(), function (placement) {
                                        self.layoutGrid().markOccupied(placement);
                                    });
                                };
                                ScreenModel.prototype.setHeight = function () {
                                    var self = this;
                                    /*$(".placement-container").attr('style',
                                        'height:' + ($("#contents-area").height() - 57) + 'px; ');
                                    $(".btn-addcolumn").attr('style',
                                        'height:' + ($("#contents-area").height() - 57) + 'px; ');*/
                                    if ($("#contents-area").height() < 640) {
                                        $(".placement-container").height($("#contents-area").height() - 70);
                                        $(".btn-addcolumn").height($("#contents-area").height() - 80);
                                    }
                                    else {
                                        $(".placement-container").height(640);
                                        $(".btn-addcolumn").height(630);
                                    }
                                    if ($(".layout-container").height() > $(".placement-container").height()) {
                                        $(".placement-container").width($(".placement-container").width() + 17);
                                    }
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            /** The main layout grid information */
                            var LayoutGrid = /** @class */ (function () {
                                function LayoutGrid(rows, columns) {
                                    var self = this;
                                    self.columns = ko.observable(columns);
                                    self.layoutRows = ko.observableArray([]);
                                    for (var row = 1; row <= rows; row++) {
                                        self.layoutRows.push(new LayoutRow(row, columns));
                                    }
                                    ;
                                    self.rows = ko.computed(function () {
                                        return self.layoutRows().length;
                                    });
                                }
                                /** Add row(s) to LayoutGrid */
                                LayoutGrid.prototype.addRow = function (row) {
                                    var self = this;
                                    for (var i = 1; i <= row; i++) {
                                        self.layoutRows.push(new LayoutRow(self.rows() + i, self.columns()));
                                    }
                                    self.addOverflowClass();
                                };
                                /** Add column(s) to LayoutGrid */
                                LayoutGrid.prototype.addColumn = function (column) {
                                    var self = this;
                                    for (var i = 1; i <= column; i++) {
                                        _.each(self.layoutRows(), function (layoutRow) {
                                            layoutRow.layoutCells.push(new LayoutCell(layoutRow.rowIndex, self.columns() + i));
                                        });
                                    }
                                    self.columns(self.columns() + column);
                                    self.addOverflowClass();
                                };
                                /** Get all LayoutCell in LayoutGrid */
                                LayoutGrid.prototype.getAllCells = function () {
                                    var self = this;
                                    var layoutCells = [];
                                    _.each(self.layoutRows(), function (layoutRow) {
                                        layoutRow.layoutCells().forEach(function (v) { layoutCells.push(v); });
                                    });
                                    return layoutCells;
                                };
                                /** Clear all cell Placement occupied */
                                LayoutGrid.prototype.clearOccupied = function (placement) {
                                    var self = this;
                                    var occupiedCells = self.getOccupiedCells(placement);
                                    _.each(occupiedCells, function (cell) { cell.occupied = ""; });
                                };
                                /**
                                 * Mark LayoutCells occupied by placement
                                 * @param placement placement need to mark
                                 * @return Return all Placements Id occupied there
                                 */
                                LayoutGrid.prototype.markOccupied = function (placement) {
                                    var self = this;
                                    var occupiedCells = self.getOccupiedCells(placement);
                                    var occupiedPlacementIDs = [];
                                    _.each(occupiedCells, function (cell) {
                                        if (!nts.uk.util.isNullOrEmpty(cell.occupied) && cell.occupied !== placement.placementID)
                                            occupiedPlacementIDs.push(cell.occupied);
                                        cell.occupied = placement.placementID;
                                    });
                                    return _.union(occupiedPlacementIDs);
                                };
                                /**
                                 * Get LayoutCells occupied by placement
                                 * @param placement placement need to mark
                                 * @return Return all LayoutCells occupied
                                 */
                                LayoutGrid.prototype.getOccupiedCells = function (placement) {
                                    var self = this;
                                    var occupiedCellIDs = [];
                                    for (var y = placement.row; y <= placement.row + placement.height - 1; y++) {
                                        for (var x = placement.column; x <= placement.column + placement.width - 1; x++) {
                                            occupiedCellIDs.push("cell-" + y + "-" + x);
                                        }
                                    }
                                    var occupiedCells = _.filter(self.getAllCells(), function (cell) {
                                        return occupiedCellIDs.indexOf(cell.id) > -1;
                                    });
                                    return occupiedCells;
                                };
                                /** Add overflow class */
                                LayoutGrid.prototype.addOverflowClass = function () {
                                    //if (this.rows() > MINROW) $(".placement-container").addClass("overflow-y");
                                    //if (this.columns() > MINCOLUMN) $(".placement-container").addClass("overflow-x");
                                    if ($(".layout-container").height() > $(".placement-container").height()) {
                                        if ($(".placement-container").width() != 977) {
                                            $(".placement-container").width($(".placement-container").width() + 17);
                                        }
                                    }
                                };
                                return LayoutGrid;
                            }());
                            var LayoutRow = /** @class */ (function () {
                                function LayoutRow(row, columns) {
                                    this.rowIndex = row;
                                    this.layoutCells = ko.observableArray([]);
                                    for (var column = 1; column <= columns; column++) {
                                        this.layoutCells.push(new LayoutCell(this.rowIndex, column));
                                    }
                                }
                                return LayoutRow;
                            }());
                            var LayoutCell = /** @class */ (function () {
                                function LayoutCell(row, column) {
                                    this.row = row;
                                    this.column = column;
                                    this.id = "cell-" + row + "-" + column;
                                    this.occupied = "";
                                }
                                return LayoutCell;
                            }());
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = ccg031.a || (ccg031.a = {}));
                })(ccg031 = view.ccg031 || (view.ccg031 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg031.a.vm.js.map