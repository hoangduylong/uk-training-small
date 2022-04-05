/// <reference path="../reference.ts"/>

module nts.uk.ui.option {
    import ErrorHeader = nts.uk.ui.errors.ErrorHeader;

    const defaultHeaders = () => {
        const { errorContent, errorCode } = toBeResource;

        return [
            new ErrorHeader("messageText", errorContent, "auto", true),
            new ErrorHeader("errorCode", errorCode, 150, true)
        ];
    };

    const dialogTabHeaders = () => {
        const { tab, errorPoint, errorDetail } = toBeResource;

        return [
            new ErrorHeader("tab", tab, 90, true),
            new ErrorHeader("location", errorPoint, 115, true),
            new ErrorHeader("message", errorDetail, 250, true)
        ];
    };

    export type ButtonSize = "x-large" | "large" | "medium" | "small";
    export type ButtonColor = "" | "danger" | "proceed";

    interface DialogButton {
        text: string;
        "class": string;
        size: ButtonSize;
        color: ButtonColor;
        click: (viewmodel: any, ui: any) => void;
    }

    abstract class DialogOption {
        modal: boolean = true;
        show: boolean = false;
        buttons: DialogButton[] = [];
    }

    // Normal Dialog
    export interface IDialogOption {
        modal?: boolean
    }

    // Error Dialog
    export interface IErrorDialogOption {
        headers?: ErrorHeader[],
        modal?: boolean,
        displayrows?: number,
        //maxrows?: number,
        autoclose?: boolean
    }

    export class ConfirmDialogOption extends DialogOption {
        constructor(option?: IDialogOption) {
            super();

            // Default value
            this.modal = _.get<boolean>(option, 'modal', true);

            // Add OK Button
            this.buttons.push({
                text: "OK",
                "class": "yes",
                size: "large",
                color: "proceed",
                click: function (viewmodel, ui): void {
                    viewmodel.okButtonClicked();
                    $(ui).dialog("close");
                }
            });
        }
    }

    export class DelDialogOption extends DialogOption {
        constructor(option?: IDialogOption) {
            super();

            const { yes, no } = toBeResource;

            // Default value
            this.modal = _.get<boolean>(option, 'modal', true);

            // Add OK Button
            this.buttons.push({
                text: yes,
                "class": "yes ",
                size: "large",
                color: "danger",
                click: function (viewmodel, ui) {
                    viewmodel.okButtonClicked();
                    ui.dialog("close");
                }
            });

            // Add Cancel Button
            this.buttons.push({
                text: no,
                "class": "no ",
                size: "large",
                color: "",
                click: function (viewmodel, ui) {
                    viewmodel.cancelButtonClicked();
                    ui.dialog("close");
                }
            });
        }
    }

    export class OKDialogOption extends DialogOption {
        constructor(option?: IDialogOption) {
            super();

            const { yes, no } = toBeResource;

            // Default value
            this.modal = _.get<boolean>(option, 'modal', true);

            // Add OK Button
            this.buttons.push({
                text: yes,
                "class": "yes ",
                size: "large",
                color: "proceed",
                click: function (viewmodel, ui) {
                    viewmodel.okButtonClicked();
                    ui.dialog("close");
                }
            });

            // Add Cancel Button
            this.buttons.push({
                text: no,
                "class": "no ",
                size: "large",
                color: "",
                click: function (viewmodel, ui) {
                    viewmodel.cancelButtonClicked();
                    ui.dialog("close");
                }
            });
        }
    }

    export class ErrorDialogOption extends DialogOption {
        headers: ErrorHeader[];
        displayrows: number;
        //maxrows: number;
        autoclose: boolean;

        constructor(option?: IErrorDialogOption) {
            super();

            const { close } = toBeResource;

            this.modal = _.get<boolean>(option, 'modal', false);

            // Default value
            this.headers = _.get<ErrorHeader[]>(option, 'headers', defaultHeaders());

            this.displayrows = _.get<number>(option, 'displayrows', 10);

            //this.maxrows = (option && option.maxrows) ? option.maxrows : 1000;
            this.autoclose = _.get<boolean>(option, 'autoclose', true);

            // Add Close Button
            this.buttons.push({
                text: close,
                "class": "yes ",
                size: "large",
                color: "",
                click: function (viewmodel, ui) {
                    viewmodel.closeButtonClicked();
                    ui.dialog("close");
                }
            });
        }
    }

    export class ErrorDialogWithTabOption extends ErrorDialogOption {
        constructor(option?: IErrorDialogOption) {
            super();

            const { close } = toBeResource;

            this.modal = _.get<boolean>(option, 'modal', false);

            // Default value
            this.headers = _.get<ErrorHeader[]>(option, 'headers', dialogTabHeaders());

            this.displayrows = _.get<number>(option, 'displayrows', 10);

            //this.maxrows = (option && option.maxrows) ? option.maxrows : 1000;
            this.autoclose = _.get<boolean>(option, 'autoclose', true);

            // Add Close Button
            this.buttons.push({
                text: close,
                "class": "yes ",
                size: "large",
                color: "",
                click: function (viewmodel, ui) {
                    viewmodel.closeButtonClicked();
                    ui.dialog("close");
                }
            });
        }
    }
}