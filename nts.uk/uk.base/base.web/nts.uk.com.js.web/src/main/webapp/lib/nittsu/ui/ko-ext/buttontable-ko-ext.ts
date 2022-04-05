/// <reference path="../../reference.ts"/>

module nts.uk.ui.koExtentions {

    /**
	 * Accordion binding handler
	 */
    class NtsTableButtonBindingHandler implements KnockoutBindingHandler {

        /**
		 * Init.
		 */
        init(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            var data = valueAccessor();

            let source: any = ko.unwrap(data.source);
            let mode: any = (data.mode !== undefined) ? ko.unwrap(data.mode) : "normal";
            let row: any = (data.row !== undefined) ? ko.unwrap(data.row) : 1;
            let column: any = (data.column !== undefined) ? ko.unwrap(data.column) : 1;
            let contextMenu = (data.contextMenu !== undefined) ? ko.unwrap(data.contextMenu) : [];
            let disableMenuOnDataNotSet = (data.disableMenuOnDataNotSet !== undefined) ? ko.unwrap(data.disableMenuOnDataNotSet) : [];
            let selectedCell = ko.unwrap(data.selectedCell);
            let width: any = (data.width !== undefined) ? ko.unwrap(data.width) : 400;
            let clickAction = data.click;
            let selectedCells = ko.unwrap(data.selectedCells);

            $(element).ntsButtonTable("init", {
                mode: mode,
                click: clickAction,
                row: row,
                column: column,
                source: source,
                width: width,
                disableMenuOnDataNotSet: disableMenuOnDataNotSet,
                contextMenu: contextMenu
            });

            
            $(element).bind("cellselectedchanging", function(evt, value){
                if(!nts.uk.util.isNullOrUndefined(data.selectedCell)){
                    $(element).data("o-selected", _.cloneDeep(value));
                    data.selectedCell(value);
                }
            });
            $(element).bind("sourcechanging", function(evt, value) {
                if (!nts.uk.util.isNullOrUndefined(data.source)) {
                    data.source(value.source);
                }
            });
        }

        /**
		 * Update
		 */
        update(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            var data = valueAccessor();

            let source: any = ko.unwrap(data.source);
            let row: any = (data.row !== undefined) ? ko.unwrap(data.row) : 1;
            let column: any = (data.column !== undefined) ? ko.unwrap(data.column) : 1;
            let selectedCell = ko.unwrap(data.selectedCell);

            let container = $(element);
            let oldSource = container.ntsButtonTable("dataSource");
            if (!_.isEqual(oldSource, source)) {
                container.ntsButtonTable("dataSource", source);
            }

            container.ntsButtonTable("row", row);
            container.ntsButtonTable("column", column);
            // insert on develop "&& !_.isEqual(container.data("o-selected"), selectedCell)"

            if (!nts.uk.util.isNullOrUndefined(selectedCell) && !nts.uk.util.isNullOrUndefined(selectedCell.column)
                && !nts.uk.util.isNullOrUndefined(selectedCell.row) && !_.isEqual(container.data("o-selected"), selectedCell)) {
                container.ntsButtonTable("setSelectedCell", selectedCell.row, selectedCell.column);
            }
            container.data("o-selected", _.cloneDeep(selectedCell));
        }
    }

    ko.bindingHandlers['ntsTableButton'] = new NtsTableButtonBindingHandler();
}
