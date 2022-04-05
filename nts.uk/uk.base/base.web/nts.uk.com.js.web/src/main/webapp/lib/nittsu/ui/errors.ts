/// <reference path="../reference.ts"/>


module nts.uk.ui.errors {
    export interface ErrorListItem {
        errorCode: string;
        /** OBSOLATE! using messageText instead */
        messageText?: string;
        message?: any;
        location?: string;
        tab?: string;
        $control?: JQuery;
        businessError?: boolean;
    }

    export interface ErrorMessage {
        message: string;
        messageId?: string;
        parameterIds?: string[];
    }

    export interface GridCellError {
        grid: JQuery;
        rowId: any;
        columnKey: string;
        message: string;
    }

    export class ErrorsViewModel {
        title: string = '';

        occurs!: KnockoutComputed<boolean>;
        displayErrors: KnockoutComputed<ErrorListItem[] | GridCellError[]>;

        errors: KnockoutObservableArray<ErrorListItem> = ko.observableArray([]).extend({ rateLimit: 100 });
        gridErrors: KnockoutObservableArray<GridCellError> = ko.observableArray([]).extend({ rateLimit: 100 });

        forGrid: KnockoutObservable<boolean> = ko.observable(false).extend({ rateLimit: 100 });
        option: KnockoutObservable<any> = ko.observable(ko.mapping.fromJS(new option.ErrorDialogOption())).extend({ rateLimit: 100 });

        allResolved: JQueryCallback = $.Callbacks();
        allCellsResolved: JQueryCallback = $.Callbacks();

        constructor(dialogOptions?: JQueryUI.DialogOptions & { forGrid?: boolean; }) {
            const vme = this;

            vme.title = toBeResource.errorList;

            vme.displayErrors = ko.computed({
                read: () => {
                    const forGrid = ko.unwrap<boolean>(vme.forGrid);

                    if (!forGrid) {
                        return ko.unwrap<ErrorListItem[]>(vme.errors);
                    }

                    return ko.unwrap<GridCellError[]>(vme.gridErrors);
                }
            });

            vme.initErrorModel(dialogOptions);

            vme.occurs = ko.computed({
                read: () => {
                    const errors = ko.unwrap<ErrorListItem[]>(vme.errors);
                    const gridErrors = ko.unwrap<GridCellError[]>(vme.gridErrors);

                    return (errors.length || gridErrors.length) !== 0;
                }
            });

            vme.option().show.extend({ notify: "always" });

            vme.errors
                .subscribe((errors) => {
                    if (errors.length === 0) {
                        vme.allResolved.fire();
                    }
                });

            // Grid
            vme.gridErrors
                .subscribe((gridErrors) => {
                    if (gridErrors.length === 0) {
                        vme.allCellsResolved.fire();
                    }
                });

            vme.allResolved.add(() => vme.hide());
            vme.allCellsResolved.add(() => vme.hide());
        }

        initErrorModel(dialogOptions?: JQueryUI.DialogOptions & { forGrid?: boolean; }) {
            const vme = this;

            vme.forGrid(_.get<boolean>(dialogOptions, 'forGrid', false));
            vme.option(ko.mapping.fromJS(new option.ErrorDialogOption(dialogOptions)));
        }

        closeButtonClicked() {
            const vme = this;

            vme.hide();
        }

        open() {
            const vme = this;
            const { show } = ko.unwrap(vme.option);

            show(true);
        }

        hide() {
            const vme = this;
            const { show } = ko.unwrap(vme.option);

            show(false);
        }

        addError(error: ErrorListItem) {
            var duplicate = _.filter(this.errors(), (e: any) => e.$control.is(error.$control)
                && (typeof error.message === "string" ? e.messageText === error.message : e.messageText === error.messageText));

            if (duplicate.length == 0) {
                if (typeof error.message === "string") {
                    error.messageText = error.message;
                } else {
                    // Business Exception
                    if (error.message.message) {
                        error.messageText = error.message.message;
                        error.errorCode = error.message.messageId != null && error.message.messageId.length > 0 ? error.message.messageId : "";
                    } else {
                        if (error.$control.length > 0) {
                            let controlNameId = error.$control.eq(0).attr("data-name");
                            if (controlNameId) {
                                let params = _.concat(nts.uk.resource.getText(controlNameId), error.message.messageParams);
                                error.messageText = nts.uk.resource.getMessage(error.message.messageId, params);
                            } else {
                                error.messageText = nts.uk.resource.getMessage(error.message.messageId, error.message.messageParams);
                            }
                        } else {
                            error.messageText = nts.uk.resource.getMessage(error.message.messageId);

                        }
                        error.errorCode = error.message.messageId;
                    }

                }

                // if exist, push error to list
                if (document.body.contains(error.$control[0])) {
                    this.errors.push(error);
                }
            }

            // remove all error not match with any control
            setTimeout(() => {
                this.errors.remove(e => !document.body.contains(e.$control[0]));
            }, 100);
        }

        hasError() {
            const vme = this;
            const { errors } = vme;

            return ko.unwrap<any[]>(errors).length > 0;
        }

        clearError() {
            const vme = this;

            $(".error")
                .children()
                .each((__, element) => {
                    if ($(element).data("hasError")) {
                        $(element).data("hasError", false);
                    }
                });

            $(".error").removeClass('error');

            vme.errors([]);
        }

        removeErrorByElement($element: JQuery) {
            this.errors.remove((error) => {
                return error.$control.is($element);
            });
        }

        removeErrorByCode($element: JQuery, errorCode: string) {
            this.errors.remove((error) => {
                return error.$control.is($element) && error.errorCode === errorCode;
            });
        }

        removeKibanError($element: JQuery) {
            this.errors.remove((error) => {
                return error.$control.is($element) && error.businessError == false;
            });
        }

        getErrorByElement($element: JQuery): ErrorListItem[] {
            return _.filter(this.errors(), (e: any) => {
                return e.$control.is($element)
            });
        }

        // Grid errors
        addCellError(error: GridCellError) {
            let self = this;
            let exists = _.filter(this.gridErrors(), function (err: GridCellError) {
                return self.sameCells(error, err);
            });
            if (exists.length > 0) return;
            this.gridErrors.push(error);
        }

        removeCellError($grid: JQuery, rowId: any, columnKey: string) {
            this.gridErrors.remove(function (err: GridCellError) {
                return err.grid.is($grid) && err.rowId === rowId && err.columnKey === columnKey;
            });
        }

        gridHasError() {
            return this.gridErrors().length > 0;
        }

        clearGridErrors() {
            this.gridErrors.removeAll();
        }

        sameCells(one: GridCellError, other: GridCellError) {
            if (!one.grid.is(other.grid)) return false;
            if (one.rowId !== other.rowId) return false;
            if (one.columnKey !== other.columnKey) return false;
            return true;
        }

        stashMemento(): ErrorViewModelMemento {
            let memento = new ErrorViewModelMemento();

            memento.setErrors(ko.unwrap<ErrorListItem>(this.errors));
            memento.setGridErrors(ko.unwrap<GridCellError>(this.gridErrors));
            memento.option = ko.unwrap(this.option);
            memento.allResolved = this.allResolved;
            memento.allCellsResolved = this.allCellsResolved;

            memento.setErrorElements();

            this.clearError();

            return memento;
        }

        restoreFrom(memento: ErrorViewModelMemento) {
            this.errors(memento.errors);
            this.gridErrors(memento.gridErrors);
            this.option(memento.option);
            this.allResolved = memento.allResolved;
            this.allCellsResolved = memento.allCellsResolved;
            memento.restoreErrorElements();
        }
    }

    export class ErrorViewModelMemento {

        errors: ErrorListItem[];
        gridErrors: GridCellError[];
        option: any;
        allResolved: JQueryCallback;
        allCellsResolved: JQueryCallback;
        errorElements: JQuery;

        setErrors(errors: ErrorListItem[]) {
            if (!_.isArray(errors)) {
                return;
            }

            this.errors = [];
            errors.forEach(e => {
                this.errors.push(e);
            });
        }

        setGridErrors(gridErrors: GridCellError[]) {
            if (!_.isArray(gridErrors)) {
                return;
            }

            this.gridErrors = [];
            gridErrors.forEach(e => {
                this.gridErrors.push(e);
            });
        }

        setErrorElements() {
            this.errorElements = $(".error").removeClass("error");
        }

        restoreErrorElements() {
            this.errorElements.addClass("error");
        }
    }

    export class ErrorHeader {
        name: string;
        text: string;
        width: any;
        visible: boolean;

        constructor(name: string, text: string, width: any, visible: boolean) {
            this.name = name;
            this.text = text;
            this.width = width;
            this.visible = visible;
        }
    }

    /** 
     *  Public API
    **/
    export function errorsViewModel(): ErrorsViewModel {
        let errorDialogViewModel: ErrorsViewModel = _.get<ErrorsViewModel>(nts.uk.ui._viewModel, 'kiban.errorDialogViewModel');
		return !_.isNil(errorDialogViewModel) ? errorDialogViewModel : new ErrorsViewModel();
    }

    export function show(): void {
        errorsViewModel().open();
    }

    export function hide(): void {
        errorsViewModel().hide();
    }

    export function add(error: ErrorListItem): void {
        errorsViewModel().addError(error);

        error.$control.data(nts.uk.ui.DATA_HAS_ERROR, true);

        (error.$control.data(nts.uk.ui.DATA_SET_ERROR_STYLE) || function () { error.$control.parent().addClass('error'); })();
    }

    export function hasError(): boolean {
        return errorsViewModel().hasError();
    }

    export function clearAll(): void {
        if (nts.uk.ui._viewModel !== undefined) {
            errorsViewModel().clearError();
        }
    }

    export function removeByElement($control: JQuery): void {
        errorsViewModel().removeErrorByElement($control);

        $control.data(nts.uk.ui.DATA_HAS_ERROR, false);
        ($control.data(nts.uk.ui.DATA_CLEAR_ERROR_STYLE) || function () { $control.parent().removeClass('error'); })();
    }

    export function removeByCode($control: JQuery, errorCode: string): void {
        errorsViewModel().removeErrorByCode($control, errorCode);

        let remainErrors = getErrorByElement($control);

        if (nts.uk.util.isNullOrEmpty(remainErrors)) {
            $control.data(nts.uk.ui.DATA_HAS_ERROR, false);
            ($control.data(nts.uk.ui.DATA_CLEAR_ERROR_STYLE) || function () { $control.parent().removeClass('error'); })();
        }
    }

    export function removeCommonError($control: JQuery): void {
        errorsViewModel().removeKibanError($control);
        let remainErrors = getErrorByElement($control);

        if (nts.uk.util.isNullOrEmpty(remainErrors)) {
            $control.data(nts.uk.ui.DATA_HAS_ERROR, false);
            ($control.data(nts.uk.ui.DATA_CLEAR_ERROR_STYLE) || function () { $control.parent().removeClass('error'); })();
        }
    }

    export function getErrorByElement($element: JQuery): ErrorListItem[] {
        return errorsViewModel().getErrorByElement($element);
    }

    // Grid errors
    export function addCell(error: GridCellError): void {
        errorsViewModel().addCellError(error);
    }

    export function removeCell($grid: JQuery, rowId: any, columnKey: string): void {
        errorsViewModel().removeCellError($grid, rowId, columnKey);
    }

    export function gridHasError(): boolean {
        return errorsViewModel().gridHasError();
    }

    export function clearAllGridErrors() {
        if (nts.uk.ui._viewModel !== undefined)
            errorsViewModel().clearGridErrors();
    }

    export function getErrorList() {
        return errorsViewModel().displayErrors();
    }
}
