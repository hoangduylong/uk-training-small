/// <reference path="../../reference.ts"/>

module nts.uk.ui.koExtentions {
    let PS: Window & { $: JQuery, nts: any } = window.parent as any;

    function getCurrentWindow() {
        var self = nts.uk.ui.windows.getSelf();

        var dfd = $.Deferred();

        if (!_.isNil(self)) {
            dfd.resolve(self);
        } else {
            if (nts.uk.util.isInFrame()) {
                dfd.resolve({ isFrame: true });
            }

            nts.uk.deferred.repeat(conf => conf
                .task(() => {
                    let def = $.Deferred();
                    self = nts.uk.ui.windows.getSelf();

                    if (!_.isNil(self)) {
                        dfd.resolve(self);
                    }

                    def.resolve(self);

                    return def.promise();
                })
                .while((c) => _.isNil(c))
                .pause(300));
        }

        return dfd.promise();
    }

    /**
     * Dialog binding handler
     */
    @handler({
        bindingName: 'ntsDialog',
        validatable: true,
        virtual: false
    })
    export class NtsDialogBindingHandler implements KnockoutBindingHandler {
        update(element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            // Get data.
            const data = valueAccessor();
            const option: any = ko.unwrap(data.option);
            const title: string = ko.unwrap(data.title);
            const message: string = ko.unwrap(data.message);
            const modal: boolean = ko.unwrap(option.modal);
            const show: boolean = ko.unwrap(option.show);
            const buttons: any = ko.unwrap(option.buttons);

            const $dialog = $("<div>");

            if (show == true) {
                $('body').append($dialog);
                // Create Buttons
                var dialogbuttons = [];

                for (let button of buttons) {
                    dialogbuttons.push({
                        text: ko.unwrap(button.text),
                        "class": ko.unwrap(button.class) + ko.unwrap(button.size) + " " + ko.unwrap(button.color),
                        click: function () { button.click(bindingContext.$data, $dialog) }
                    });
                }

                // Create dialog
                $dialog.dialog({
                    title: title,
                    modal: modal,
                    closeOnEscape: false,
                    buttons: dialogbuttons,
                    dialogClass: "no-close",
                    open: function () {
                        $(this).parent().find('.ui-dialog-buttonset > button.yes').focus();
                        $(this).parent().find('.ui-dialog-buttonset > button').removeClass('ui-button ui-corner-all ui-widget');
                        $('.ui-widget-overlay').last().css('z-index', 120000);
                    },
                    close: function (event: any) {
                        bindingContext.$data.option.show(false);
                    }
                }).text(message);
            }
            else {
                // Destroy dialog
                if ($('#ntsDialog').dialog("instance") != null) {
                    $('#ntsDialog').dialog("destroy");
                }

                $('#ntsDialog').remove();
            }
        }
    }

    @handler({
        bindingName: 'ntsErrorDialog',
        validatable: true,
        virtual: false
    })
    export class NtsErrorDialogBindingHandler implements KnockoutBindingHandler {

        /**
         * Init.
         */
        init(element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            // Get data.
            const data = valueAccessor();
            const option: any = ko.unwrap(data.option);
            const title: string = ko.unwrap(data.title);
            const headers: Array<any> = ko.unwrap(option.headers);
            const modal: boolean = ko.unwrap(option.modal);
            const show: boolean = ko.unwrap(option.show);
            const buttons: any = ko.unwrap(option.buttons);
            const displayrows: number = ko.unwrap(option.displayrows);

            getCurrentWindow().done(function (self: windows.ScreenWindow) {
                let idX = "";

                if (self.isFrame) {
                    idX = nts.uk.util.randomId();
                    self = PS.window.parent.nts.uk.ui.windows.getSelf();
                    PS = PS.window.parent;
                } else {
                    idX = self.id;
                }
                var id = 'ntsErrorDialog_' + idX;
                var $dialog = $("<div>", { "id": id, "class": "ntsErrorDialog" });

                // get top object (jQuery & document)
                const $$ = window.top.window.$;
                const $document = window.top.document;

                // move error dialog to top windows
                $$($document).find('body').append($dialog);

                // shit code
                /*if (self.isRoot) {
                    PS.$('body').append($dialog);
                } else {
                    let temp = self;
                    while (!nts.uk.util.isNullOrUndefined(temp)) {
                        if (temp.isRoot) {
                            $(temp.globalContext.document.getElementsByTagName("body")).append($dialog);
                            temp = null;
                        } else {
                            temp = temp.parent;
                        }
                    }
                }*/
                
                // Create Buttons
                var dialogbuttons = [];

                for (let button of buttons) {
                    dialogbuttons.push({
                        text: ko.unwrap(button.text),
                        "class": ko.unwrap(button.class) + ko.unwrap(button.size) + " " + ko.unwrap(button.color),
                        click: function () { button.click(bindingContext.$data, $dialog) }
                    });
                }
                $dialog.data("winid", idX);
                // Calculate width
                var dialogWidth: number = 40 + 35 + 17;

                headers
                    .forEach(function (header, index) {
                        if (ko.unwrap(header.visible)) {
                            if (typeof ko.unwrap(header.width) === "number") {
                                dialogWidth += ko.unwrap(header.width);
                            } else {
                                dialogWidth += 200;
                            }
                        }
                    });

                // Create dialog
                $dialog.dialog({
                    title: title,
                    modal: modal,
                    autoOpen: false,
                    closeOnEscape: false,
                    width: 'auto',
                    maxHeight: 500,
                    buttons: dialogbuttons,
                    resizable: false,
                    dialogClass: "no-close ui-dialog-error",
                    open: function () {

                        $(this).parent().find('.ui-dialog-buttonset>button.yes').focus();
                        $(this).parent().find('.ui-dialog-buttonset>button').removeClass('ui-button ui-corner-all ui-widget');

                        $('.ui-widget-overlay').last().css('z-index', nts.uk.ui.dialog.getMaxZIndex());

                        let offsetDraged = $dialog.data("stopdrop");
                        if (nts.uk.util.isNullOrUndefined(offsetDraged)) {
                            $dialog.ntsDialogEx("centerUp", self);
                        } else {
                            $dialog.closest(".ui-dialog").offset(offsetDraged);
                        }

                    },
                    close: () => {
                        bindingContext.$data.option().show(false);
                    }
                }).dialogPositionControl();

                $dialog.on("dialogopen", function () {
                    var maxrowsHeight = 0;
                    var index = 0;

                    $(this).find("table tbody tr").each(function () {
                        if (index < displayrows) {
                            index++;
                            maxrowsHeight += $(this).height();
                        }
                    });

                    maxrowsHeight = maxrowsHeight + 33 + 20 + 20 + 55 + 4 + $(this).find("table thead").height();

                    if (maxrowsHeight > $dialog.dialog("option", "maxHeight")) {
                        maxrowsHeight = $dialog.dialog("option", "maxHeight");
                    }

                    $dialog.dialog("option", "height", maxrowsHeight);
                });

                PS.$("body").data(self.id, $dialog);

                $(element).data("dialogX", $dialog);

                if (self.isRoot) {
                    $("body").bind("dialogclosed", function (evt, eData) {
                        //                            console.log(eData.dialogId);
                        let $cDialog = $("#ntsErrorDialog_" + eData.dialogId);

                        if (!nts.uk.util.isNullOrEmpty($cDialog)) {
                            $("body").data(eData.dialogId).dialog("destroy");
                            //                            $cDialog.dialog().dialog("destroy");
                            //                            console.log("destroyed");
                            $cDialog.remove();
                        }
                    });
                }
            });
        }

        /**
         * Update
         */
        update(element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            // Get data.
            var data = valueAccessor();
            var option: any = ko.unwrap(data.option);
            var title: string = ko.unwrap(data.title);
            var errors: Array<any> = ko.unwrap(data.errors);
            var headers: Array<any> = ko.unwrap(option.headers);
            var displayrows: number = ko.unwrap(option.displayrows);
            //var maxrows: number = ko.unwrap(option.maxrows);
            var autoclose: boolean = ko.unwrap(option.autoclose);
            var show: boolean = ko.unwrap(option.show);

            let isNotFunctionArea = _.isEmpty($('#functions-area')) && _.isEmpty($('#functions-area-bottom'));
            let isNotSideBar = _.isEmpty($('#sidebar'));
            let isFrame = nts.uk.util.isInFrame();
            if (isNotFunctionArea && isNotSideBar && isFrame) {
                if (!_.isEmpty(errors)) {
                    let mesArr = [], mesCodeArr = _.map(errors, (error) => error.errorCode);
                    _.forEach(errors, (error) => {
                        mesArr.push(error.messageText);
                        mesCodeArr.push(error.errorCode);
                    });
                    let totalMes = _.join(_.uniq(mesArr), '\n');
                    let totalMesCode = _.join(_.uniq(mesCodeArr), ', ');
                    let mainD = PS.window.parent.nts.uk.ui.windows.getSelf();
                    while (!mainD.isRoot) {
                        mainD = mainD.parent;
                    }
                    //nts.uk.ui.errors.clearAll();
                    mainD.globalContext.nts.uk.ui.dialog.error({ message: totalMes, messageId: totalMesCode }).then(() => {
                    });
                }
                return;
            }

            getCurrentWindow().done(function (self) {
                var $dialog = $(element).data("dialogX");

                if (show == true) {
                    // Create Error Table
                    var $errorboard = $("<div id='error-board'></div>");
                    var $errortable = $("<table></table>");
                    // Header
                    var $header = $("<thead></thead>");
                    let $headerRow = $("<tr></tr>");
                    $headerRow.append("<th style='display:none;'></th>");

                    headers.forEach(function (header, index) {
                        if (ko.unwrap(header.visible)) {
                            let $headerElement = $("<th>" + ko.unwrap(header.text) + "</th>").width(ko.unwrap(header.width));
                            $headerRow.append($headerElement);
                        }
                    });

                    $header.append($headerRow);
                    $errortable.append($header);

                    // Body
                    var $body = $("<tbody></tbody>");
                    errors.forEach(function (error, index) {
                        // Row
                        let $row = $("<tr></tr>");
                        $row.click(function () {
                            error.$control.eq(0).exposeOnTabPanel().focus();
                            let $dialogContainer = $dialog.closest("[role='dialog']");
                            let $self = nts.uk.ui.windows.getSelf();
                            let additonalTop = 0;
                            let additonalLeft = 0;
                            if (!$self.isRoot) {
                                let $currentDialog = $self.$dialog.closest("[role='dialog']");
                                let $currentHeadBar = $currentDialog.find(".ui-dialog-titlebar");
                                let currentDialogOffset = $currentDialog.offset();
                                additonalTop = currentDialogOffset.top + $currentHeadBar.height();
                                additonalLeft = currentDialogOffset.left;
                            }

                            let currentControlOffset = error.$control.offset();
                            //change for compatibility with IE
                            let doc = document.documentElement;
                            let scrollX = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
                            let scrollY = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
                            let top = additonalTop + currentControlOffset.top + error.$control.outerHeight() - scrollY;
                            //                    let top = additonalTop + currentControlOffset.top  + element.outerHeight() - window.scrollY;
                            let left = additonalLeft + currentControlOffset.left - scrollX;
                            //                    let left = additonalLeft + currentControlOffset.left - window.scrollX;
                            let $errorDialogOffset = $dialogContainer.offset();
                            let maxLeft = $errorDialogOffset.left + $dialogContainer.width();
                            let maxTop = $errorDialogOffset.top + $dialogContainer.height();
                            if ($errorDialogOffset.top < top && top < maxTop) {
                                $dialogContainer.css("top", top + 15);
                            }
                            if (($errorDialogOffset.left < left && left < maxLeft)) {
                                $dialogContainer.css("left", left);
                            }
                        });
                        $row.append("<td style='display:none;'>" + (index + 1) + "</td>");
                        headers.forEach(function (header) {
                            if (ko.unwrap(header.visible))
                                if (error.hasOwnProperty(ko.unwrap(header.name))) {
                                    // TD
                                    let $column = $("<td>" + error[ko.unwrap(header.name)] + "</td>");

                                    $row.append($column);
                                }
                        });
                        $body.append($row);
                    });
                    $errortable.append($body);
                    $errorboard.append($errortable);
                    // Errors over maxrows message
                    var $message = $("<div></div>");
                    $dialog.html("");
                    $dialog.append($errorboard).append($message);

                    const $container = $dialog.closest("[role='dialog']");

                    $container
                        .show()
                        // hide "x" button
                        .find(".ui-dialog-titlebar-close").hide();

                    //$dialog.dialog("open");

                    const $dialogs = (window.top as any).$('body>[role="dialog"]').toArray();
                    const zIndex: any = _.chain($dialogs)
                        .map((el: HTMLElement) => document.defaultView.getComputedStyle(el, null).getPropertyValue('z-index'))
                        .filter((index: string) => index.match(/^\d+$/))
                        .map((index: string) => parseInt(index))
                        .orderBy((index: number) => index)
                        .last();

                    // fixbug show error dialog after main modal
                    if (!$container.data('ziv')) {
                        const zIdx = zIndex.value() || 10000001;

                        $container.data('ziv', zIdx).css('z-index', zIdx);
                    }
                }
                else {
                    $dialog.closest("[role='dialog']").hide();
                    //$dialog.dialog("close"); 
                }
            });


        }
    }
}
