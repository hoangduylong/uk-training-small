/// <reference path="../../reference.ts"/>

module nts.uk.ui {

    /**
     * Utilities for IgniteUI
     */
    export module ig {

        export module grid {
            
            export function getScrollContainer($grid: JQuery): JQuery {
                let $scroll: any = $grid.igGrid("scrollContainer");
                if ($scroll.length === 1) return $scroll;
                return $("#" + $grid.attr("id") + "_scrollContainer");
            }

            export function getRowIdFrom($anyElementInRow: JQuery): any {
                return $anyElementInRow.closest('tr').attr('data-id');
            }

            export function getRowIndexFrom($anyElementInRow: JQuery): number {
                return parseInt($anyElementInRow.closest('tr').attr('data-row-idx'), 10);
            }
            
            export function expose(targetRow: any, $grid: JQuery) {
                let $scroll: any = getScrollContainer($grid);
                $scroll.exposeVertically(targetRow.element);
            }

            export module virtual {

                export function getDisplayContainer(gridId: String) {
                    return $('#' + gridId + '_displayContainer');
                }

                export function getVisibleRows(gridId: String) {
                    return $('#' + gridId + ' > tbody > tr:visible');
                }

                export function getFirstVisibleRow(gridId: String) {
                    let top = getDisplayContainer(gridId).scrollTop();
                    let visibleRows = getVisibleRows(gridId);
                    for (var i = 0; i < visibleRows.length; i++) {
                        let $row = $(visibleRows[i]);
                        if (visibleRows[i].offsetTop + $row.height() > top) {
                            return $row;
                        }
                    }
                }

                export function getLastVisibleRow(gridId: String) {
                    let $displayContainer = getDisplayContainer(gridId);
                    let bottom = $displayContainer.scrollTop() + $displayContainer.height();
                    return getVisibleRows(gridId).filter(function() {
                        return this.offsetTop < bottom;
                    }).last();
                }
                
                export function expose(targetRow: any, $grid: JQuery) {
                    
                    if (targetRow.index === undefined) {
                        $grid.igGrid("virtualScrollTo", dataSource.getIndexOfKey(targetRow.id, $grid) + 1);
                        return;
                    }
                    
                    let rowHeight = targetRow.element.outerHeight();
                    let targetTop = targetRow.index * rowHeight;
                    let targetBottom = targetTop + rowHeight;
                    
                    let $scroll = getScrollContainer($grid);
                    let viewHeight = $scroll.height();
                    let viewTop = $scroll.scrollTop();
                    let viewBottom = viewTop + viewHeight;
                    
                    if (viewTop <= targetTop && targetBottom <= viewBottom) {
                        return;
                    }
                    
                    // when specify 1, top row will be shown.
                    $grid.igGrid("virtualScrollTo", targetRow.index + 1);
                }
            }
            
            export module dataSource {
                
                export function getIndexOfKey(targetKey: any, $grid: JQuery) {
                    let option = $grid.igGrid("option");
                    return _.findIndex(
                        option.dataSource,
                        s => s[option.primaryKey].toString() === targetKey.toString());
                }
            }

            export module header {

                export function getCell(gridId: String, columnKey: String) {
                    let $headers: JQuery = <any>$('#' + gridId).igGrid("headersTable");
                    return $headers.find('#' + gridId + '_' + columnKey);
                }

                export function getLabel(gridId: String, columnKey: String) {
                    return getCell(gridId, columnKey).find('span');
                }
            }
        }
        
        export module tree {
            export module grid {
                export function expandTo(targetKey: any, $treeGrid: JQuery) {
                    let option = $treeGrid.igTreeGrid("option");
                    let ancestorKeys = dataSource.collectAncestorKeys(targetKey, option.dataSource, option.primaryKey, option.childDataKey);
                    if (ancestorKeys === null) {
                        return;
                    }
                    
                    let expand = (currentIndex) => {
                        if (currentIndex >= ancestorKeys.length) return;
                        $treeGrid.igTreeGrid("expandRow", ancestorKeys[currentIndex]);
                        setTimeout(() => { expand(currentIndex + 1); }, 0);
                    };
                    
                    expand(0);
                    
                    setTimeout(() => {
                        scrollTo(targetKey, $treeGrid);
                    }, 1);
                }
                
                export function scrollTo(targetKey: any, $treeGrid: JQuery) {
                    let $scroll: any = $treeGrid.igTreeGrid("scrollContainer");
                    let $targetNode = $treeGrid.find("tr[data-id='" + targetKey + "']").first();
                    if ($targetNode.length === 0) return;
                    
                    $scroll.exposeVertically($targetNode);
                }
            }
            
            export module dataSource {
                export function collectAncestorKeys(targetKey: any, dataSource: any[], primaryKey: string, childDataKey: string): any[] {
                    if (typeof dataSource === "undefined") {
                        return null;
                    }
                    
                    for (var i = 0, len = dataSource.length; i < len; i++) {
                        let currentData: any = dataSource[i];
                        if (currentData[primaryKey] === targetKey) {
                            return [targetKey];
                        }
                        
                        let children: any[] = currentData[childDataKey];
                        let results = collectAncestorKeys(targetKey, children, primaryKey, childDataKey);
                        if (results !== null) {
                            results.unshift(currentData[primaryKey]);
                            return results;
                        }
                    }
                    
                    return null;
                }
            }
        }
    }   
}