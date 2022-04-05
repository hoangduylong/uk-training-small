/// <reference path="../../reference.ts"/>

interface JQuery {
    ntsListBox(action: string, param?: any): any;
}

module nts.uk.ui.jqueryExtentions {

    module ntsListBox {
        $.fn.ntsListBox = function(action: string): any {

            var $grid = $(this);

            switch (action) {
                case 'deselectAll':
                    deselectAll($grid);
                    break;
                case 'selectAll':
                    selectAll($grid);
                default:
                    break;
            }
        };

        function selectAll($list: JQuery) {
            let $grid = $list.find(".ntsListBox");
            let options = $grid.igGrid("option", "dataSource");
            let primaryKey = $grid.igGrid("option", "primaryKey");
            _.forEach(options, function (option, idx){
                $grid.igGridSelection("selectRowById", option[primaryKey]);        
            });
            $grid.triggerHandler('selectionchanged');
        }

        function deselectAll($list: JQuery) {
            let $grid = $list.find(".ntsListBox");
            $grid.igGridSelection('clearSelection');
            $grid.triggerHandler('selectionchanged');
        }
    }
}