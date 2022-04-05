/// <reference path="../../reference.ts"/>

interface JQuery {
    ntsError(action: string, param?: any, errorCode?: string, businessError?: boolean): any;
}

module nts.uk.ui {
    export const DATA_SET_ERROR_STYLE = "set-error-style";
    export const DATA_CLEAR_ERROR_STYLE = "clear-error-style";
    export const DATA_HAS_ERROR = 'hasError';
    export const DATA_GET_ERROR = 'getError';
    
    export module bindErrorStyle {
        export function setError($element: JQuery, callback: () => void) {
            $element.data(DATA_SET_ERROR_STYLE, callback);
        }
        
        export function clearError($element: JQuery, callback: () => void) {
            $element.data(DATA_CLEAR_ERROR_STYLE, callback);
        }
        
        export function useDefaultErrorClass($element: JQuery) {
            setError($element, function () { $element.addClass("error"); });
            clearError($element, function () { $element.removeClass("error"); });
        } 
    }
}

module nts.uk.ui.jqueryExtentions {

    module ntsError {

        $.fn.ntsError = function(action: string, message: any, errorCode?: string, businessError?: boolean): any {
            var $control = $(this);
            if (action === DATA_HAS_ERROR) {
                return _.some($control, c => hasError($(c))) || _.some($control.find("*"), c => hasError($(c)));
            } else if (action === DATA_GET_ERROR) {
                return getErrorByElement($control.first());        
            } else {
                $control.each(function(index) {
                    var $item = $(this);
                    $item = processErrorOnItem($item, message, action, errorCode, businessError);
                });
                return $control;
            }

        }

        function processErrorOnItem($control: JQuery, message: any, action: string, errorCode: string, businessError: boolean) {
            switch (action) {
                case 'check':
                    return $control.trigger("validate");
                case 'set':
                    return setError($control, message, errorCode, businessError);
                case 'clear':
                    return clearErrors($control);
                case 'clearByCode':
                    return clearErrorByCode($control, message);
                case 'clearKibanError':
                    return clearKibanError($control);
            }
        }
        
        function getErrorByElement($control: JQuery) {
            return ui.errors.getErrorByElement($control);
        }

        function setError($control: JQuery, message: any, errorCode: string, businessError?: boolean) {
            ui.errors.add({
                location: $control.data('name') || "",
                message: message,
                errorCode: errorCode,
                $control: $control,
                businessError: businessError
            });
            
            return $control;
        }

        function clearErrors($control: JQuery) {
            ui.errors.removeByElement($control);
            
            return $control;
        }

        function clearErrorByCode($control: JQuery, errorCode: string) {
            ui.errors.removeByCode($control, errorCode);
            return $control;
        }
        
        function clearKibanError($control: JQuery) {
            ui.errors.removeCommonError($control);
            return $control;
        }

        function hasError($control: JQuery) {
            return $control.data(DATA_HAS_ERROR) === true;
        }
    }
}
