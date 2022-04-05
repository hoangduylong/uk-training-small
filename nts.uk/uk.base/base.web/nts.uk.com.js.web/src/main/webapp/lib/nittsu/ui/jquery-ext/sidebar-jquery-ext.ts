/// <reference path="../../reference.ts"/>

interface JQuery {
    ntsSideBar(action?: string, param?: any): any;
}

module nts.uk.ui.jqueryExtentions {
    
    var errorMementos: { [tabIndex: number]: ui.errors.ErrorViewModelMemento } = {};
    var currentTabIndex: number = undefined;

    module ntsSideBar {
        export interface SideBarSetting {
            active?: number;
            beforeActivate?: (event, ui) => void,
            activate?: (event, ui) => void,
        };
        export interface SideBarEventInfo {
            oldIndex: number,
            newIndex: number,
            oldTab: JQuery,
            newTab: JQuery
        }

        var defaultOption: SideBarSetting = {
            active: 0,
            beforeActivate: function(event, info) { },
            activate: function(event, info) { },
        };

        $.fn.ntsSideBar = function(action?: string, option?: any): any {
            var $control = $(this);
            if (nts.uk.util.isNullOrUndefined(action) || action === "init") {
                return init($control, option);
            }
            else if (action === "active") {
                return active($control, option);
            }
            else if (action === "reactive") {
                return reactive($control);
            }
            else if (action === "enable") {
                return enable($control, option);
            }
            else if (action === "disable") {
                return disable($control, option);
            }
            else if (action === "show") {
                return show($control, option);
            }
            else if (action === "hide") {
                return hide($control, option);
            }
            else if (action === "getCurrent") {
                return getCurrent($control);
            }
            else {
                return $control;
            };
        }

        function init(control: JQuery, option: any): JQuery {
            $("html").addClass("sidebar-html");
            control.find(".sidebar-content > div[role=tabpanel]").addClass("disappear");

            var settings: SideBarSetting = $.extend({}, defaultOption, option);

            control.off("click.sideBarClick", "#sidebar-area .navigator a");
            control.on("click.sideBarClick", "#sidebar-area .navigator a", function(event) {
                event.preventDefault();
                var info: SideBarEventInfo = {
                    oldIndex: getCurrent(control),
                    newIndex: $(this).closest("li").index(),
                    oldTab: control.find("#sidebar-area .navigator a.active").closest("li"),
                    newTab: $(this).closest("li")
                };
                if ($(this).attr("disabled") !== "true" && $(this).attr("disabled") !== "disabled") {
                    settings.beforeActivate.call(this, event, info);
                    if ($(this).attr("href") !== undefined)
                        active(control, $(this).closest("li").index());
                    settings.activate.call(this, event, info);
                }
            });
            
            return active(control, settings.active, true);
        }
        
        function reactive(control: JQuery): JQuery {
            return active(control, control.data("active"), false);
        }

        function active(control: JQuery, index: number, isInit = false): JQuery {
            control.data("active", index);
            control.find("#sidebar-area .navigator a").removeClass("active");
            control.find("#sidebar-area .navigator a").eq(index).addClass("active");
            control.find(".sidebar-content > div[role=tabpanel]").addClass("disappear");
            var $displayPanel = $(control.find("#sidebar-area .navigator a").eq(index).attr("href"));
            if ($displayPanel.length > 0) {
                
                if (!isInit) {
                    // keep error in old tab
                    if (currentTabIndex !== undefined) {
                        errorMementos[currentTabIndex] = ui.errors.errorsViewModel().stashMemento();
                    }
                    
                    // restore error in new tab
                    if (errorMementos[index] !== undefined) {
                        ui.errors.errorsViewModel().restoreFrom(errorMementos[index]);
                    }
                }
                
                currentTabIndex = index;
                
                $displayPanel.removeClass("disappear");
                setErrorPosition($displayPanel);
            }
            return control;
        }

        function setErrorPosition($displayPanel: JQuery) {
            setTimeout(function() {
                if ($displayPanel.find(".sidebar-content-header").length > 0) {
                    $('#func-notifier-errors').addClass("show-immediately");
                    $('#func-notifier-errors').position({ my: 'left+145 top+44', at: 'left top', of: $displayPanel.find(".sidebar-content-header") });
                    $('#func-notifier-errors').removeClass("show-immediately");
                } else {
                    setErrorPosition($(".sidebar-content"));
                }
            }, 10);
        }

        function enable(control: JQuery, index: number): JQuery {
            control.find("#sidebar-area .navigator a").eq(index).removeAttr("disabled");
            return control;
        }

        function disable(control: JQuery, index: number): JQuery {
            control.find("#sidebar-area .navigator a").eq(index).attr("disabled", "disabled");
            return control;
        }

        function show(control: JQuery, index: number): JQuery {
            control.find("#sidebar-area .navigator a").eq(index).show();
            return control;
        }

        function hide(control: JQuery, index: number): JQuery {
            var current = getCurrent(control);
            if (current === index) {
                active(control, 0);
            }
            control.find("#sidebar-area .navigator a").eq(index).hide();
            return control;
        }

        function getCurrent(control: JQuery): number {
            return control.find("#sidebar-area .navigator a.active").closest("li").index();
        }
    }
}