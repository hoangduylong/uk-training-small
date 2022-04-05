module nts.uk.com.view.ccg031.a.viewmodel {
    import model = nts.uk.com.view.ccg.model;
    import util = nts.uk.util;
    import windows = nts.uk.ui.windows;
    import ntsNumber = nts.uk.ntsNumber;
    import dialog = nts.uk.ui.dialog;
    import resource = nts.uk.resource;
    import block = nts.uk.ui.block;
    import positionUtil = nts.uk.com.view.ccg.positionUtility;
    const MINROW: number = 4;
    const MINCOLUMN: number = 6;
    const ANIMATION_DURATION: number = 500;

    export class ScreenModel {
        // Layout Info
        parentCode: string;
        layoutID: string;
        pgType: number;
        // Column & Row
        layoutGrid: KnockoutObservable<LayoutGrid>;
        // Placement
        placements: KnockoutObservableArray<model.Placement>;

        constructor() {
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
        startPage(): JQueryPromise<any> {
            var self = this;
            var dfd = $.Deferred();
            block.invisible();
            var layoutInfo: model.TransferLayoutInfo = windows.getShared("layout");
            if (layoutInfo !== undefined) {
                self.parentCode = layoutInfo.parentCode;
                self.layoutID = layoutInfo.layoutID;
                self.pgType = layoutInfo.pgType;
            }
            service.active(self.layoutID).done((data: model.LayoutDto) => {
                if (data !== undefined) {
                    let listPlacement: Array<model.Placement> = _.map(data.placements, (item) => {
                        return new model.Placement(item);
                    });
                    listPlacement = _.orderBy(listPlacement, ['row', 'column'], ['asc', 'asc']);
                    self.placements(listPlacement);
                }
                _.defer(() => { 
                	self.initDisplay(); 
                	self.setHeight();
                });
                
                dfd.resolve();
            }).fail((res: any) => {
                dfd.fail();
            }).always(() => {
                block.clear();
            });
            return dfd.promise();
        }

        /** Registry Layout */
        registryLayout(): void {
            var self = this;
            block.invisible();
            service.registry(self.parentCode, self.layoutID, self.pgType, self.placements())
                .done((data) => {
                    self.layoutID = data;
                    dialog.info({ messageId: "Msg_15" });
                }).fail((res) => {
                    dialog.alertError({ messageId: res.messageId });
                }).always(() => {
                    block.clear();
                });
        }

        /** Close Dialog */
        closeDialog(): void {
            var self = this;
            var layoutInfo: model.TransferLayoutInfo = {
                parentCode: self.parentCode,
                layoutID: self.layoutID,
                pgType: self.pgType
            };
            windows.setShared("layout", layoutInfo, false);
            windows.close();
        }

        /** Add Column button click */
        addColumnButtonClick(): void {
            this.layoutGrid().addColumn(1);
            this.setupDroppable();
        }

        /** Add Row button click */
        addRowButtonClick(): void {
            this.layoutGrid().addRow(1);
            this.setupDroppable();
        }

        /** Open Add TopPage-Part Dialog */
        openAddDialog(row: number, column: number, element: HTMLElement): void {
            var self = this;
            block.invisible();
            $(element).addClass("hover");
            windows.setShared("pgtype", self.pgType, false);
            windows.setShared("size", { row: row, column: column }, false);
            windows.sub.modal("/view/ccg/031/b/index.xhtml").onClosed(() => {
                block.clear();
                let placementDto: model.PlacementDto = windows.getShared("placement");
                if (!util.isNullOrUndefined(placementDto)) {
                    if (placementDto.placementPartDto.type != 4) {
                        service.findPlacementPart(placementDto.placementPartDto.topPagePartID).done((data) => {
                            placementDto.placementPartDto = data;
                            self.addPlacementToList(new model.Placement(placementDto));
                        });
                    } else {
                        self.addPlacementToList(new model.Placement(placementDto));
                    }
                };
                $(element).removeClass("hover");
            });
        }
        
        private addPlacementToList(placement: model.Placement): void {
            var self = this;
            self.placements.push(placement);
            positionUtil.setupPositionAndSize(placement);
            var movingPlacementIds = self.layoutGrid().markOccupied(placement);
            self.reorderPlacements(movingPlacementIds, [placement.placementID]);
            self.autoExpandLayout();
            self.markOccupiedAll();
            self.setupDragDrop();
        }

        /** Open Preview Dialog */
        openPreviewDialog(): void {
            block.invisible();
            var placementDtos = _.map(this.placements(), (item) => {
                return item.buildPlacementDto();
            });
            windows.setShared("placements", placementDtos, false);
            windows.sub.modal("/view/ccg/031/c/index.xhtml").onClosed(() => {
                block.clear();
            });
        }

        /** Open Preview Dialog */
        removeWidget(placementID: string): void {
            var self = this;
            var placement = _.find(self.placements(), ['placementID', placementID]);
            self.layoutGrid().clearOccupied(placement);
            self.placements.remove(placement);
        }

        /** Init all Widget display & binding */
        private initDisplay(): void {
            var self = this;
            positionUtil.initReorderPlacements(_.clone(self.placements()), []);
            self.autoExpandLayout();
            self.markOccupiedAll();
            positionUtil.setupPositionAndSizeAll(self.placements());
            self.setupDragDrop();
        }

        /** Setup Draggable & Droppable */
        private setupDragDrop(): void {
            this.setupDragable();
            this.setupDroppable();
        }

        /** Setup Dragable */
        private setupDragable(): void {
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
        }

        /** Setup Droppable */
        private setupDroppable(): void {
            var self = this;
            $(".layout-cell").droppable({
                tolerance: "pointer",
                classes: { "ui-droppable-hover": "hover" },
                drop: function(event, ui) {
                    // Update Placement position
                    let $dropable = $(event.target);
                    let $dragable = ui.draggable;
                    let placement = _.find(self.placements(), ['placementID', $dragable.attr("id")]);
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
        }

        /**
         * Re-order list Placements with a list checking Placements
         * @param movingPlacementIds list placementID need to move
         * @param checkingPlacementIds list placementID need to check overlap
         */
        private reorderPlacements(movingPlacementIds: Array<string>, checkingPlacementIds: Array<string>): any {
            var self = this;
            var movingPlacements = _.filter(self.placements(), (placement) => {
                return _.includes(movingPlacementIds, placement.placementID);
            });
            movingPlacements = _.orderBy(movingPlacements, ['row', 'column'], ['asc', 'asc']);
            var listOverlapPlacement: Array<string> = [];
            _.each(movingPlacements, (movingPlacement) => {
                self.layoutGrid().clearOccupied(movingPlacement);
                var checkingPlacements = _.filter(self.placements(), (placement) => {
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
        }

        /** Expand layout */
        private autoExpandLayout(): void {
            var self = this;
            _.forEach(self.placements(), (placement) => {
                // Expand Row
                let totalRow: number = self.layoutGrid().rows();
                let expandRow: number = (placement.row + placement.height - 1) - totalRow;
                if (expandRow > 0) {
                    self.layoutGrid().addRow(expandRow);
                    self.autoExpandLayout();
                }
                // Expand Column
                let totalColumn: number = self.layoutGrid().columns();
                let expandColumn: number = (placement.column + placement.width - 1) - totalColumn;
                if (expandColumn > 0) {
                    self.layoutGrid().addColumn(expandColumn);
                    self.autoExpandLayout();
                }
            });
        }

        /** Setup occupied for all Placements */
        private markOccupiedAll(): void {
            var self = this;
            _.each(self.placements(), (placement) => {
                self.layoutGrid().markOccupied(placement);
            });
        }
        
        private setHeight(): void {
            var self = this;
            /*$(".placement-container").attr('style', 
            	'height:' + ($("#contents-area").height() - 57) + 'px; ');
            $(".btn-addcolumn").attr('style', 
                'height:' + ($("#contents-area").height() - 57) + 'px; ');*/
            if ($("#contents-area").height() < 640) {
            	$(".placement-container").height($("#contents-area").height() - 70);
                $(".btn-addcolumn").height($("#contents-area").height() - 80);
            } else {
            	$(".placement-container").height(640);
                $(".btn-addcolumn").height(630);
            }            
            if ($(".layout-container").height() > $(".placement-container").height()) {
            	$(".placement-container").width($(".placement-container").width() + 17);
            }
        }

    }

    /** The main layout grid information */
    class LayoutGrid {
        rows: KnockoutComputed<number>;
        columns: KnockoutObservable<number>;
        layoutRows: KnockoutObservableArray<LayoutRow>;
        constructor(rows: number, columns: number) {
            var self = this;
            self.columns = ko.observable(columns);
            self.layoutRows = ko.observableArray([]);
            for (var row = 1; row <= rows; row++) {
                self.layoutRows.push(new LayoutRow(row, columns));
            };
            self.rows = ko.computed(() => {
                return self.layoutRows().length;
            });
        }

        /** Add row(s) to LayoutGrid */
        addRow(row: number) {
            var self = this;
            for (var i = 1; i <= row; i++) {
                self.layoutRows.push(new LayoutRow(self.rows() + i, self.columns()));
            }
            self.addOverflowClass();
        }

        /** Add column(s) to LayoutGrid */
        addColumn(column: number) {
            var self = this;
            for (var i = 1; i <= column; i++) {
                _.each(self.layoutRows(), (layoutRow) => {
                    layoutRow.layoutCells.push(new LayoutCell(layoutRow.rowIndex, self.columns() + i));
                });
            }
            self.columns(self.columns() + column);
            self.addOverflowClass();
        }

        /** Get all LayoutCell in LayoutGrid */
        getAllCells(): Array<LayoutCell> {
            var self = this;
            var layoutCells: Array<LayoutCell> = [];
            _.each(self.layoutRows(), (layoutRow) => {
                layoutRow.layoutCells().forEach((v) => { layoutCells.push(v) });
            });
            return layoutCells;
        }

        /** Clear all cell Placement occupied */
        clearOccupied(placement: model.Placement) {
            var self = this;
            var occupiedCells = self.getOccupiedCells(placement);
            _.each(occupiedCells, (cell) => { cell.occupied = ""; });
        }

        /**
         * Mark LayoutCells occupied by placement
         * @param placement placement need to mark
         * @return Return all Placements Id occupied there
         */
        markOccupied(placement: model.Placement): Array<string> {
            var self = this;
            var occupiedCells = self.getOccupiedCells(placement);
            var occupiedPlacementIDs: Array<string> = [];
            _.each(occupiedCells, (cell) => {
                if (!nts.uk.util.isNullOrEmpty(cell.occupied) && cell.occupied !== placement.placementID)
                    occupiedPlacementIDs.push(cell.occupied);
                cell.occupied = placement.placementID;
            });
            return _.union(occupiedPlacementIDs);
        }

        /**
         * Get LayoutCells occupied by placement
         * @param placement placement need to mark
         * @return Return all LayoutCells occupied
         */
        private getOccupiedCells(placement: model.Placement): Array<LayoutCell> {
            var self = this;
            var occupiedCellIDs = [];
            for (var y = placement.row; y <= placement.row + placement.height - 1; y++) {
                for (var x = placement.column; x <= placement.column + placement.width - 1; x++) {
                    occupiedCellIDs.push("cell-" + y + "-" + x);
                }
            }
            var occupiedCells = _.filter(self.getAllCells(), (cell) => {
                return occupiedCellIDs.indexOf(cell.id) > -1;
            });
            return occupiedCells;
        }

        /** Add overflow class */
        private addOverflowClass(): void {
            //if (this.rows() > MINROW) $(".placement-container").addClass("overflow-y");
            //if (this.columns() > MINCOLUMN) $(".placement-container").addClass("overflow-x");
        	if ($(".layout-container").height() > $(".placement-container").height()) {
            	if ($(".placement-container").width() != 977) {
            		$(".placement-container").width($(".placement-container").width() + 17);
            	}          	
            }
        }
        
    }

    class LayoutRow {
        rowIndex: number;
        layoutCells: KnockoutObservableArray<LayoutCell>;
        constructor(row: number, columns: number) {
            this.rowIndex = row;
            this.layoutCells = ko.observableArray([]);
            for (var column = 1; column <= columns; column++) {
                this.layoutCells.push(new LayoutCell(this.rowIndex, column));
            }
        }
    }

    class LayoutCell {
        id: string;
        column: number;
        row: number;
        occupied: string;
        constructor(row: number, column: number) {
            this.row = row;
            this.column = column;
            this.id = "cell-" + row + "-" + column;
            this.occupied = "";
        }
    }
}