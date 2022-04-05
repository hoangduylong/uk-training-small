/// <reference path="../../reference.ts"/>
interface JQuery {
    ntsButtonTable(method: string, option?: any, option2?: any, option3?: any): any;
}

module nts.uk.ui.jqueryExtentions {
    import isNull = nts.uk.util.isNullOrUndefined;
    import isEmpty = nts.uk.util.isNullOrEmpty;
    module ntsButtonTable {

        $.fn.ntsButtonTable = function(method: string, option?: any, option2?: any, option3?: any): any {
            let $element = $(this);
            let builder: TableBuildingConstructor;
            switch (method) {
                case "init": {
                    builder = new TableBuildingConstructor($element, option);
                    builder.startBuildTable();
                    break;
                }
                case "dataSource": {
                    builder = $element.data("builder"); 
                    if (isNull(option) || !$.isArray(option)) {
                        return builder.getDataSource();
                    }

                    builder.setDataSource(option);
                    builder.drawTable();
                    break;
                }
                case "column": { 
                    builder = $element.data("builder");
                    if (isNull(option)) {
                        return builder.column;
                    }

                    if (option !== builder.column) {
                        builder.setColumn(option);
                        builder.startBuildTable();
                    }
                    break;
                }
                case "row": {
                    builder = $element.data("builder");
                    if (isNull(option)) {
                        return builder.row;
                    }

                    if (option !== builder.row) {
                        builder.setRow(option);
                        builder.drawTable();
                    }
                    break;
                }
                case "cellAt": {
                    builder = $element.data("builder");
                    let tbody: JQuery = builder.container.find("tbody");
                    let rowAt = tbody.find("tr:nth-child(" + (option + 1) + ")");
                    let cellAt = rowAt.find("td:nth-child(" + (option2 + 1) + ")");
                    return {
                        element: cellAt,
                        data: cellAt.data("cell-data"),
                        rowIdx: option,
                        columnIdx: option2,
                    };
                }
                case "setCellValue": {
                    builder = $element.data("builder");
                    let tbody: JQuery = builder.container.find("tbody");
                    let rowAt = tbody.find("tr:nth-child(" + (option + 1) + ")");
                    let cellAt = rowAt.find("td:nth-child(" + (option2 + 1) + ")");
                    builder.setCellValue(cellAt.find("button"), option3);
                    break;
                }
                case "getSelectedCells": {
                    builder = $element.data("builder");
                    let selectedButton = builder.container.find(".ntsButtonCellSelected");
                    return _.map(selectedButton, function(c) {
                        let button = $(c);
                        let cell = button.parent();
                        let rowIdx = parseInt(cell.attr("row-idx"));
                        let columnIdx = parseInt(cell.attr("column-idx"));
                        return {
                            element: cell,
                            data: cell.data("cell-data"),
                            rowIdx: rowIdx,
                            columnIdx: columnIdx,
                        };
                    });
                }
                case "setSelectedCell": {
                    builder = $element.data("builder");
                    let tbody: JQuery = builder.container.find("tbody");
                    let rowAt = tbody.find("tr:nth-child(" + (option + 1) + ")");
                    let cellAt = rowAt.find("td:nth-child(" + (option2 + 1) + ")");
                    cellAt.find("button").trigger("cellselecting");
                    break;
                }
                case "clearSelectedCellAt": {
                    builder = $element.data("builder");
                    let tbody: JQuery = builder.container.find("tbody");
                    let rowAt = tbody.find("tr:nth-child(" + (option + 1) + ")");
                    let cellAt = rowAt.find("td:nth-child(" + (option2 + 1) + ")");
                    cellAt.find("button").trigger("cellselecting");
                    break;
                }
                case "clearAllSelectedCells": {
                    builder = $element.data("builder");
                    this.container.find(".ntsButtonCellSelected").trigger("cellselecting");;
                    break;
                }
                case "getDataCells": {
                    builder = $element.data("builder");
                    let dataButton = builder.container.find(".ntsButtonCellData");
                    return _.map(dataButton, function(c) {
                        let button = $(c);
                        let cell = button.parent();
                        let rowIdx = parseInt(cell.attr("row-idx"));
                        let columnIdx = parseInt(cell.attr("column-idx"));
                        return {
                            element: cell,
                            data: cell.data("cell-data"),
                            rowIdx: rowIdx,
                            columnIdx: columnIdx,
                        };
                    });
                }
                default:
                    break;
            }

            $element.data("builder", builder);
            return;
        }


        class TableBuildingConstructor {
            container: JQuery;
            mode: string;
            contextMenu: any;
            disableMenuOnDataNotSet: Array<any>;
            clickOnAction: Function;
            row: number;
            column: number;
            id: string;
            source: any;
            originalSource: any;
            width: number;

            constructor(container: JQuery, option: any) {
                this.container = container;
                this.mode = option.mode;
                this.clickOnAction = option.click;
                this.row = option.row;
                this.column = option.column;
                this.originalSource = _.cloneDeep(option.source);
                this.source = this.changeSource(option.source);
                this.id = nts.uk.util.randomId();
                this.width = option.width;

                this.disableMenuOnDataNotSet = option.disableMenuOnDataNotSet;
                this.cloneContextMenu(option.contextMenu);
            }

            changeSource(origin: Array<any>): Array<Array<any>> {
                let result = [];
                for (let rI = 0; rI < this.row; rI++) {
                    result[rI] = [];
                    for (let cI = 0; cI < this.column; cI++) {
                        let cell = origin[(rI * this.column) + cI];
                        result[rI][cI] = !isNull(cell) ? _.cloneDeep(cell) : undefined;
                    }
                }
                return result;
            }

            setDataSource(source: Array<any>) {
                this.originalSource = _.cloneDeep(source);
                this.source = this.changeSource(source);
            }

            getDataSource(): Array<any> {
                return _.cloneDeep(this.originalSource);
            }

            setColumn(columnSize: number) {
                this.column = columnSize;
            }

            setRow(rowSize: number) {
                this.row = rowSize;
            }

            cloneContextMenu(contextMenu: Array<any>) {
                let self = this;
                let menu = _.map(contextMenu, function(m) {
                    let action = function() {
                        let element: JQuery = self.container.data("context-opening");
                        //                        m.action(element).done(function(result){
                        m.action(element, element.parent().data("cell-data")).done(function(result){
                            element.trigger("contextmenufinished", result);    
                        });
                    }
                    return new nts.uk.ui.contextmenu.ContextMenuItem(m.id, m.text, action, m.style);
                });
                this.contextMenu = new nts.uk.ui.contextmenu.ContextMenu(".menu" + this.id, menu);
            }

            startBuildTable() {
                let self = this;
                self.container.empty();
                let table = $("<table>", { "class": "ntsButtonTable ntsTable", id: this.id });
                let tbody = $("<tbody>", { "class": "data-area" });
                let colgroup = $("<colgroup>", { "class": "col-definition" });

                for (let i = 0; i < this.column; i++) {
                    let col = $("<col>", { width: isNull(self.width) ? 100 : (self.width / self.column) });
                    col.appendTo(colgroup);
                }

                colgroup.appendTo(table);
                tbody.appendTo(table);
                table.appendTo(this.container);
                this.drawTable();
            }

            drawTable() {
                let tbody = this.container.find("tbody");
                tbody.empty();
                for (let i = 0; i < this.row; i++) {
                    this.buildRow(tbody, i, this.id + "-row-" + i, this.source[i]);
                }
            }

            buildRow(container: JQuery, dataIdx: number, id: string, rowData: any) {
                let row = $("<tr>", { "class": "ntsRow ntsButtonTableRow", id: id, attr: { "data-idx": dataIdx, "data-id": id } });

                for (let i = 0; i < this.column; i++) {
                    let idx = dataIdx * this.column + i;
                    this.buildCell(row, dataIdx, idx, id + "-cell-" + idx, isNull(rowData) || isNull(rowData[i]) ? {} : rowData[i], i);
                }

                row.appendTo(container);
            }

            buildCell(container: JQuery, rowIdx: number, dataIdx: number, id: string, data: any, columnIdx) {
                let self = this;
                let cell = $("<td>", { "class": "ntsCell ntsButtonTableCell", id: id, attr: { "row-idx": rowIdx, "data-idx": dataIdx, "data-id": id, "column-idx": columnIdx } });
                let contextClass = "menu" + this.id;
                let button = $("<button>", { "class": "ntsButtonCell ntsButtonTableButton " + contextClass, attr: { "data-idx": dataIdx, "data-id": id } });
                button.text(isEmpty(data.text) ? "+" : data.text);
                button.width(isNull(self.width) ? 90 : (self.width / self.column - 10));
                if (!isEmpty(data.text)) {
                    button.addClass("ntsButtonCellData");
                    button.attr("title", data.tooltip);
                    button.data("empty-cell", false);
                    cell.data("cell-data", _.cloneDeep(data));
                } else {
                    button.data("empty-cell", true);
                }
                button.click(function(evt, ui) {
                    let c = $(this);
                    if (self.mode === "master") {
                        if (_.isFunction(self.clickOnAction)) {
                            self.clickOnAction(evt, c.parent().data("cell-data")).done(function(result) {
                                self.setCellValue(c, result);
                            });
                        }
                    } else {
                        c.trigger("cellselecting");
                    }
                });

                button.bind("cellselecting", function(evt, data) {
                    let c = $(this);
                    if(!c.data("empty-cell")){
                        if(c.hasClass("ntsButtonCellSelected")){
                            c.removeClass("ntsButtonCellSelected");     
                            self.container.trigger("cellselectedchanging", {column: -1, row: -1, data: c.parent().data("cell-data")});
                        } else {
                            self.container.find(".ntsButtonCellSelected").removeClass("ntsButtonCellSelected");
                            c.addClass("ntsButtonCellSelected");
                            let oCell = c.parent();
                            //                            self.container.trigger("cellselectedchanging", { column: parseInt(oCell.attr("column-idx")), row: parseInt(oCell.attr("row-idx")) });
                            self.container.trigger("cellselectedchanging", { column: parseInt(oCell.attr("column-idx")), row: parseInt(oCell.attr("row-idx")), data: oCell.data("cell-data") });

                        } 
                    } else {
                        let oldSelected = self.container.find(".ntsButtonCellSelected");
                        if (!nts.uk.util.isNullOrEmpty(oldSelected)) {
                            let oCell = oldSelected.parent();
                            self.container.trigger("cellselectedchanging", {column: parseInt(oCell.attr("column-idx")), row: parseInt(oCell.attr("row-idx")), data: oCell.data("cell-data")});    
                        } else {
                            self.container.trigger("cellselectedchanging", {column: -1, row: -1, data: null });
                        }
                    }
                });

                button.contextmenu(function() { 
                    let c = $(this);
                    let enable: boolean = c.data("empty-cell");
                    if (self.mode === "master") {
                        self.contextMenu.setEnable(!enable);
                        if (enable) {
                            return false;
                        }
                    } else {
                        if (!isEmpty(self.disableMenuOnDataNotSet)) {
                            _.forEach(self.disableMenuOnDataNotSet, function(target) {
                                self.contextMenu.setEnableItem(!enable, target);
                            })
                        }
                    }
                    self.container.data("context-opening", button);

                });
                button.bind("contextmenufinished", function(evt, result?: any) {
                    let c = $(this);
                    self.setCellValue(c, result);
                });

                button.appendTo(cell);
                cell.appendTo(container);
            }

            setCellValue(button: JQuery, data: any) {
                let cell = button.parent();
                if (!isNull(data) && !isEmpty(data.text)) {
                    cell.data("cell-data", _.cloneDeep(data));
                    button.text(data.text);
                    button.attr("title", data.tooltip);
                    button.addClass("ntsButtonCellData");
                    button.data("empty-cell", false);
                } else {
                    cell.data("cell-data", null);
                    button.text("+");
                    button.removeAttr("title");
                    button.removeClass("ntsButtonCellData");
                    button.data("empty-cell", true);
                    data = {};
                }
                let rowIdx = parseInt(cell.attr("row-idx"));
                let columnIdx = parseInt(cell.attr("column-idx"));
                if (nts.uk.util.isNullOrUndefined(this.source[rowIdx])) {
                    this.source[rowIdx] = [];
                }
                this.source[rowIdx][columnIdx] = data;
                this.updateOriginalSource();
            }

            updateOriginalSource() {
                this.originalSource = this.toFlatSource();
                this.container.trigger("sourcechanging", { source: this.cloneSource() });
            }

            toFlatSource() {
                let result = [];
                _.forEach(this.source, function(row) {
                    _.forEach(row, function(cell) {
                        result.push(_.cloneDeep(cell));
                    });
                });
                return result;
            }

            cloneSource() {
                return this.getDataSource();
            }
        }

        export class TableButtonEntity {
            rowId: number;
            columnId: number;
            viewText: string;
            tooltipText: string;

            constructor(rowId?: number, columnId?: number, viewText?: string, tooltipText?: string) {
                this.rowId = rowId;
                this.columnId = columnId;
                this.viewText = viewText;
                this.tooltipText = tooltipText;
            }

            setRowId(rowId: number): void {
                this.rowId = rowId;
            }

            setColumnId(columnId: number): void {
                this.columnId = columnId;
            }

            setViewText(viewText: string): void {
                this.viewText = viewText;
            }

            setTooltipText(tooltipText: string): void {
                this.tooltipText = tooltipText;
            }

            getRowId(): number {
                return this.rowId;
            }

            getColumnId(): number {
                return this.columnId;
            }

            getViewText(rowId: number): string {
                return this.viewText;
            }

            getTooltipText(): string {
                return this.tooltipText;
            }
        }
    }
}
