/// <reference path="../../reference.ts"/>

module nts.uk.ui {

    export module contextmenu {

        export class ContextMenu {
            guid: string;
            selector: string;
            items: Array<ContextMenuItem>;
            enable: boolean;
            private target: Element;

            /**
             * Create an instance of ContextMenu. Auto call init() method
             * 
             * @constructor
             * @param {selector} Jquery selector for elements need to show ContextMenu
             * @param {items} List ContextMenuItem for ContextMenu
             * @param {enable} (Optinal) Set enable/disable for ContextMenu
             */
            constructor(selector: string, items: Array<ContextMenuItem>, enable?: boolean) {
                this.selector = selector;
                this.items = items;
                this.enable = (enable !== undefined) ? enable : true;
                this.init();
            }

            /**
             * Create ContextMenu and bind event in DOM
             */
            init() {
                var self = this;
                // Remove ContextMenu with same 'selector' (In case Ajax call will re-create DOM elements)
                $('body .ntsContextMenu').each(function() {
                    if ($(this).data("selector") === self.selector) {
                        $("body").off("contextmenu", self.selector);
                        $(this).remove();
                    }
                });

                // Initial
                self.guid = nts.uk.util.randomId();
                var $contextMenu = $("<ul id='" + self.guid + "' class='ntsContextMenu'></ul>").data("selector", self.selector).hide();
                self.createMenuItems($contextMenu);
                $('body').append($contextMenu);

                // Binding contextmenu event
                $("html").on("contextmenu", self.selector, function(event) {
                    if (self.enable === true) {
                        event.preventDefault();
                        self.target = event.target;
                        $contextMenu.show().position({
                            my: "left+2 top+2",
                            of: event,
                            collision: "fit"
                        });
                    }
                });

                // Hiding when click outside
                $("html").on("mousedown", function(event) {
                    if (!$contextMenu.is(event.target) && $contextMenu.has(event.target).length === 0) {
                        $contextMenu.hide();
                    }
                });
            }

            /**
             * Remove and unbind ContextMenu event
             */
            destroy() {
                // Unbind contextmenu event
                $("html").off("contextmenu", this.selector);
                $("#" + this.guid).remove();
            }

            /**
             * Re-create ContextMenu. Useful when you change various things in ContextMenu.items
             */
            refresh() {
                this.destroy();
                this.init();
            }

            /**
             * Get a ContextMenuItem instance
             * 
             * @param {target} Can be string or number. String type will select item by "key", Number type will select item by index
             * @return {any} Return ContextMenuItem if found or undefiend
             */
            getItem(target: any) {
                if (typeof target === "number") {
                    return this.items[target];
                }
                else if (typeof target === "string") {
                    return _.find(this.items, ["key", target]);
                }
                else {
                    return undefined;
                }
            }

            /**
             * Add an ContextMenuItem instance to ContextMenu
             * 
             * @param {item} An ContextMenuItem instance
             */
            addItem(item: ContextMenuItem) {
                this.items.push(item);
                this.refresh();
            }

            /**
             * Remove item with given "key" or index
             * 
             * @param {target} Can be string or number. String type will select item by "key", Number type will select item by index
             */
            removeItem(target: any) {
                var item = this.getItem(target);
                if (item !== undefined) {
                    _.remove(this.items, item);
                    this.refresh();
                }
            }

            /**
             * Enable/Disable ContextMenu. If disable right-click will have default behavior
             * 
             * @param {enable} A boolean value set enable/disable
             */
            setEnable(enable: boolean) {
                this.enable = enable;
            }

            /**
             * Enable/Disable item with given "key" or index
             * 
             * @param {enable} A boolean value set enable/disable
             * @param {target} Can be string or number. String type will select item by "key", Number type will select item by index
             */
            setEnableItem(enable: boolean, target: any) {
                var item = this.getItem(target);
                item.enable = enable;
                this.refresh();
            }

            /**
             * Show/Hide item with given "key" or index
             * 
             * @param {enable} A boolean value set visible/hidden
             * @param {target} Can be string or number. String type will select item by "key", Number type will select item by index
             */
            setVisibleItem(visible: boolean, target: any) {
                var item = this.getItem(target);
                item.visible = visible;
                this.refresh();
            }

            private createMenuItems(container: JQuery) {
                var self = this;
                _.forEach(self.items, function(item) {
                    if (item.key !== "divider") {
                        let menuClasses = "menu-item ";
                        menuClasses += (item.enable === true) ? "" : "disabled ";
                        menuClasses += (item.visible === true) ? "" : "hidden ";
                        let menuItem = $("<li class='" + menuClasses + "'><span class='menu-icon " + item.icon + "'></span>" + item.text + "</li>")
                            .data("key", item.key)
                            .on("click", function() {
                                if (!$(this).hasClass("disabled")) {
                                    item.handler(self.target);
                                    container.hide();
                                }
                            }).appendTo(container);
                    }
                    else {
                        let menuItem = $("<li class='menu-item divider'></li>").appendTo(container);
                    }
                });
            }
        }

        export class ContextMenuItem {
            key: string;
            text: string;
            handler: (ui: any) => void;
            icon: string;
            visible: boolean;
            enable: boolean;

            constructor(key: string, text?: string, handler?: (ui: any) => void, icon?: string, visible?: boolean, enable?: boolean) {
                this.key = key;
                this.text = text;
                this.handler = (handler !== undefined) ? handler : $.noop;
                this.icon = (icon) ? icon : "";
                this.visible = (visible !== undefined) ? visible : true;
                this.enable = (enable !== undefined) ? enable : true;
            }
        }
    }
}