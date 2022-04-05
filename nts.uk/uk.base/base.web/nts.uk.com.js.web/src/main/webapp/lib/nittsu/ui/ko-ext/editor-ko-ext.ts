/// <reference path="../../reference.ts"/>

module nts.uk.ui.koExtentions {
    import validation = nts.uk.ui.validation;
    
    module disable {
        
        let DATA_API_SET_VALUE = "api-set-value-for-disable";
        let DATA_DEFAULT_VALUE = "default-value-for-disable";
        
        export function saveApiSetValue($input: JQuery, value: any) {
            $input.data(DATA_API_SET_VALUE, value);
        }
        
        export function saveDefaultValue($input: JQuery, value: any) {
            $input.data(DATA_DEFAULT_VALUE, value);
        }
        
        export function on($input: JQuery) {
            $input.attr('disabled', 'disabled')/*.ntsError("clear");
            return $input.data(DATA_DEFAULT_VALUE) !== undefined
                ? $input.data(DATA_DEFAULT_VALUE)
                : $input.data(DATA_API_SET_VALUE)*/;
        }
        
        export function off($input: JQuery) {
            $input.removeAttr('disabled');
        }
    }
    
    module valueChanging {
        
        let DATA_CHANGED_BY_USER = "changed-by-user";
        let DATA_CURRENT_VALUE = "current-value";
        
        export function markUserChange($input: JQuery) {
            $input.data(DATA_CHANGED_BY_USER, true);
        }
        
        export function unmarkUserChange($input: JQuery) {
            $input.data(DATA_CHANGED_BY_USER, false);
        }
        
        export function setNewValue($input: JQuery, value: any) {
            $input.data(DATA_CURRENT_VALUE, value);
        }
        
        export function isChangingValueByApi($input: JQuery, newValue: any) {
            return !isUserChange($input) && isChangedValue($input, newValue);
        }
        
        function isUserChange($input: JQuery) {
            return $input.data(DATA_CHANGED_BY_USER) === true;
        }
        
        function isChangedValue($input: JQuery, newValue: any) {
            return $input.data(DATA_CURRENT_VALUE) !== newValue;
        }
    }
    

    /**
     * BaseEditor Processor
     */
    class EditorProcessor {
        editorOption: any;

        init($input: JQuery, data: any) {
            
            let DATA_CHANGE_EVENT_STATUS = "change-event-status";
            
            var self = this;
            var value: KnockoutObservable<any> = data.value;
            var constraintName = (data.constraint !== undefined) ? ko.unwrap(data.constraint) : "";
            var constraint = validation.getConstraint(constraintName);
            var immediate: boolean = false;
            var readonly: boolean = (data.readonly !== undefined) ? ko.unwrap(data.readonly) : false;
            var valueUpdate: string = (immediate === true) ? 'input' : 'change';
            var option: any = (data.option !== undefined) ? ko.mapping.toJS(data.option) : {};
            this.editorOption = $.extend(this.getDefaultOption(), option);
            var setValOnRequiredError: boolean = (data.setValOnRequiredError !== undefined) ? ko.unwrap(data.setValOnRequiredError) : false;
            $input.data("setValOnRequiredError", setValOnRequiredError);
            var characterWidth: number = 9;
            if (constraint && constraint.maxLength && !$input.is("textarea")) {
                let autoWidth = constraint.maxLength * characterWidth;
                $input.width(autoWidth);
            }
            $input.addClass('nts-editor nts-input');
            $input.wrap("<span class= 'nts-editor-wrapped ntsControl'/>");
            
            setEnterHandlerIfRequired($input, data);
            
            $input.on("keydown", e => {
                // prevent backspace in readonly editor
                if (ko.unwrap(data.readonly) && e.keyCode === 8) {
                    e.preventDefault();
                }
            });

            $input.on(valueUpdate, (e) => {
                
                if ($input.data(DATA_CHANGE_EVENT_STATUS) === "doing") {
                    return;
                }
                $input.data(DATA_CHANGE_EVENT_STATUS, "doing");
                _.defer(() => $input.data(DATA_CHANGE_EVENT_STATUS, "done"));
                
                var newText = $input.val();
                let validator = this.getValidator(data);
                var result = validator.validate(newText);
                if (result.isValid) {
                    $input.ntsError('clear');
                    
                    valueChanging.markUserChange($input);
                    value(result.parsedValue);
                    
                    // why is valueHasMutated needed?? (kitahira)
                    valueChanging.markUserChange($input);
                    value.valueHasMutated();
                } else {
                    let error = $input.ntsError('getError');
                    if (nts.uk.util.isNullOrEmpty(error) || error.messageText !== result.errorMessage) {
                        $input.ntsError('clear');
                        $input.ntsError('set', result.errorMessage, result.errorCode, false);
                    }
                    if($input.data("setValOnRequiredError") && nts.uk.util.isNullOrEmpty(newText)){
                        valueChanging.markUserChange($input);
                    }
                    value(newText);
                    
                    // valueChanging.markUserChange($input);
                    // value(newText);
                }
            });

            // Format on blur
            $input.blur(() => {
                if (!$input.attr('readonly')) {
                    var formatter = self.getFormatter(data);
                    var newText = $input.val();
                    let validator = self.getValidator(data);
                    var result = validator.validate(newText);
                    if (result.isValid) {
                        $input.ntsError('clearKibanError');
                        $input.val(formatter.format(result.parsedValue));
                        
                        /**
                         On window-8.1 with IE browser, the 'change' event is not called automatically.
                         So, we trigger it manually when the 'value' isn't equals the result.parsedValue.
                         See more information at 106538
                        */ 
                        if (value() != result.parsedValue) {
                            $input.trigger(valueUpdate);
                        }
                    }
                    else {
                        let error = $input.ntsError('getError');
                        if (nts.uk.util.isNullOrEmpty(error) || error.messageText !== result.errorMessage) {
                            $input.ntsError('clearKibanError');
                            $input.ntsError('set', result.errorMessage, result.errorCode, false);
                        }
                        
                        // valueChanging.markUserChange($input);
                        // value(newText);
                    }
                }
            });

            $input.on('validate', (function(e: Event) {
                var newText = $input.val();
                let validator = self.getValidator(data);
                var result = validator.validate(newText);
                $input.ntsError('clearKibanError');
                if (!result.isValid) {
                    $input.ntsError('set', result.errorMessage, result.errorCode, false);
                }
            }));
               
            let tabIndex = $input.attr("tabindex");
            $input.data("tabindex", tabIndex);
        }

        update($input: JQuery, data: any) {
            var value = ko.unwrap(data.value);
            var required: boolean = (data.required !== undefined) ? ko.unwrap(data.required) : false;
            var enable: boolean = (data.enable !== undefined) ? ko.unwrap(data.enable) : true;
            var readonly: boolean = (data.readonly !== undefined) ? ko.unwrap(data.readonly) : false;
            var option: any = (data.option !== undefined) ? ko.mapping.toJS(data.option) : {};
            this.editorOption = $.extend(this.getDefaultOption(), option);
            var placeholder: string = this.editorOption.placeholder;
            var textalign: string = this.editorOption.textalign;
            var width: string = this.editorOption.width;
            var setValOnRequiredError: boolean = (data.setValOnRequiredError !== undefined) ? ko.unwrap(data.setValOnRequiredError) : false;
            let constraint = !_.isNil(data.constraint) ? ko.unwrap(data.constraint) : undefined;
            $input.data("setValOnRequiredError", setValOnRequiredError);
            
            disable.saveDefaultValue($input, option.defaultValue);
            
            if (valueChanging.isChangingValueByApi($input, value)) {
                disable.saveApiSetValue($input, value);
            }
            valueChanging.setNewValue($input, value);
            valueChanging.unmarkUserChange($input);
            
            // Properties
            if (enable !== false) {
                disable.off($input);
            } else {
                disable.on($input);
                //data.value(value);
            }
            if (readonly === false) {
                $input.removeAttr('readonly'); 
                if ($input.data("tabindex") !== undefined){
                    $input.attr("tabindex", $input.data("tabindex"));        
                } else {
                    $input.removeAttr("tabindex");    
                }
            } else {
                $input.attr('readonly', 'readonly');
                $input.attr("tabindex", -1);
            }
            $input.attr('placeholder', placeholder);
            $input.css('text-align', textalign);
            if (width.trim() != "")
                $input.width(width);
            
            if (constraint !== "StampNumber" && constraint !== "EmployeeCode") {
                // Format value
                var formatted = $input.ntsError('hasError') ? value : this.getFormatter(data).format(value);
                $input.val(formatted);
            } else {
                $input.val(value);
            }
//            $input.trigger("validate");
        }

        getDefaultOption(): any {
            return {};
        }

        getFormatter(data: any): format.IFormatter {
            return new format.NoFormatter();
        }

        getValidator(data: any): validation.IValidator {
            return new validation.NoValidator();
        }
    }

    /**
     * TextEditor Processor
     */
    class TextEditorProcessor extends EditorProcessor {
        $input: JQuery;
        
        init($input: JQuery, data: any) {
            let self = this;
            var value: KnockoutObservable<string> = data.value;
            var constraintName = (data.constraint !== undefined) ? ko.unwrap(data.constraint) : "";
            var setWidthByConstraint: boolean = (data.setWidthByConstraint !== undefined) ? ko.unwrap(data.setWidthByConstraint) : false;
            var readonly: boolean = (data.readonly !== undefined) ? ko.unwrap(data.readonly) : false;
            var setValOnRequiredError: boolean = (data.setValOnRequiredError !== undefined) ? ko.unwrap(data.setValOnRequiredError) : false;
            let constraint = !_.isNil(data.constraint) ? ko.unwrap(data.constraint) : undefined;
            $input.data("setValOnRequiredError", setValOnRequiredError);
            
            self.setWidthByConstraint(constraintName, $input);
            
            $input.addClass('nts-editor nts-input');
            $input.wrap("<div class='nts-editor-wrapped ntsControl' />");

            setEnterHandlerIfRequired($input, data);
            
            $input.on("keydown", e => {
                // prevent backspace in readonly editor
                if (ko.unwrap(data.readonly) && e.keyCode === 8) {
                    e.preventDefault();
                }
            });
            
            $input.on("keyup", (e) => {
                if ($input.attr('readonly')) {
                    return;                
                }
                
                var code = e.keyCode || e.which;
                if (_.includes(KeyCodes.NotValueKeys, code)) {
                    return;
                }
                
                let validator = self.getValidator(data);
                var newText = $input.val();
                var result = validator.validate(newText, { isCheckExpression: true });
                $input.ntsError('clear');
                if (!result.isValid) {
                    $input.ntsError('set', result.errorMessage, result.errorCode, false);
                }
            });
            
            // Format on blur
            $input.blur(() => {
                if (!$input.attr('readonly')) {
                    let validator = self.getValidator(data);
                    var newText = $input.val();
                    var result = validator.validate(newText,{ isCheckExpression: true });
                    
                    if (!result.isValid) {
                        let oldError: nts.uk.ui.errors.ErrorListItem[] = $input.ntsError('getError');
                        if(nts.uk.util.isNullOrEmpty(oldError)){
                           $input.ntsError('set', result.errorMessage, result.errorCode, false);
                        } else {
                            let inListError = _.find(oldError, function (o){ return o.errorCode === result.errorCode; });
                            if(nts.uk.util.isNullOrUndefined(inListError)){
                                $input.ntsError('set', result.errorMessage, result.errorCode, false);
                            }
                        }
                    } else {
                        $input.ntsError('clearKibanError');
                        if (constraint === "StampNumber" || constraint === "EmployeeCode") {
                            let formatter = self.getFormatter(data);
                            let formatted = formatter.format(result.parsedValue);
                            //$input.val(formatted);
                            value(formatted);
                        }
                    }
                }
            });

            $input.on("change", (e) => {
                if (!$input.attr('readonly')) {
                    let validator = self.getValidator(data);
                    var newText = $input.val();
                    var result = validator.validate(newText, { isCheckExpression: true });
                    //$input.ntsError('clear');
                    if (result.isValid) {
                        $input.ntsError('clear')
                        if (value() === result.parsedValue) {
                            $input.val(result.parsedValue);
                        } else {
                            valueChanging.markUserChange($input);
                            value(result.parsedValue);
                        }
                    } else {
                        let oldError: nts.uk.ui.errors.ErrorListItem[] = $input.ntsError('getError');
                        if(nts.uk.util.isNullOrEmpty(oldError)){
                           $input.ntsError('set', result.errorMessage, result.errorCode, false);
                        } else {
                            let inListError = _.find(oldError, function (o){ return o.errorCode === result.errorCode; });
                            if(nts.uk.util.isNullOrUndefined(inListError)){
                                $input.ntsError('set', result.errorMessage, result.errorCode, false);
                            }
                        }
                        
                        if($input.data("setValOnRequiredError") && nts.uk.util.isNullOrEmpty(newText)){
                            valueChanging.markUserChange($input);
                        }
                        value(newText);
                        // valueChanging.markUserChange($input);
                        // value(newText);
                    } 
                }
            });

            $input.on('validate', (function(e: Event) {
                let validator = self.getValidator(data);
                var newText = $input.val();
                var result = validator.validate(newText);
                $input.ntsError('clearKibanError');
                if (!result.isValid) {
                    $input.ntsError('set', result.errorMessage, result.errorCode, false);
                }
            }));
                
            new nts.uk.util.value.DefaultValue().onReset($input, data.value);
            
            let tabIndex = $input.attr("tabindex");
            $input.data("tabindex", tabIndex);
            
            $input.tooltipWhenReadonly();
        }

        update($input: JQuery, data: any) {
            let self = this;
            self.$input = $input;
            super.update($input, data);
            var textmode: string = this.editorOption.textmode;
            $input.attr('type', textmode);
            
            var constraintName = (data.constraint !== undefined) ? ko.unwrap(data.constraint) : "";
            var setWidthByConstraint: boolean = (data.setWidthByConstraint !== undefined) ? ko.unwrap(data.setWidthByConstraint) : false;
            if(setWidthByConstraint){
                self.setWidthByConstraint(constraintName, $input);
            }
            
            // このif文は何のため？ ユーザが入力操作をしたときしかtrueにならないか？
            if (!$input.ntsError('hasError') && data.value() !== $input.val()) { 
                valueChanging.markUserChange($input);
                data.value($input.val());
            }
        }

        getDefaultOption(): any {
            return new nts.uk.ui.option.TextEditorOption();
        }

        getFormatter(data: any): format.IFormatter {
            var constraintName = (data.constraint !== undefined) ? ko.unwrap(data.constraint) : "";
            var constraint = validation.getConstraint(constraintName);
            this.editorOption = this.editorOption || {};
            if (constraint && constraint.formatOption) {
                $.extend(this.editorOption, constraint.formatOption);
            }
            this.editorOption.autofill = (constraint && constraint.isZeroPadded) ? constraint.isZeroPadded : this.editorOption.autofill;
            return new text.StringFormatter({ constraintName: constraintName, constraint: constraint, editorOption: this.editorOption });
        }

        getValidator(data: any): validation.IValidator {
            var name: string = data.name !== undefined ? ko.unwrap(data.name) : "";
            name = nts.uk.resource.getControlName(name);
            var required: boolean = (data.required !== undefined) ? ko.unwrap(data.required) : false;
            var constraintName = (data.constraint !== undefined) ? ko.unwrap(data.constraint) : "";
            if(data.constraint=="WorkplaceCode"){
                return new validation.WorkplaceCodeValidator(name, constraintName, { required: required });
            }
            if(data.constraint=="DepartmentCode"){
                return new validation.DepartmentCodeValidator(name, constraintName, { required: required });
            }
            if(data.constraint=="PostCode"){
                return new validation.PostCodeValidator(name, constraintName, { required: required });
            }
            if(data.constraint=="StampNumber"){
                return new validation.PunchCardNoValidator(name, constraintName, { required: required });
            }
            if (data.constraint === "EmployeeCode") {
                return new validation.EmployeeCodeValidator(name, { required: required });
            }

            return new validation.StringValidator(name, constraintName, { required: required });
        }
        
        setWidthByConstraint(constraintName: string, $input: JQuery){
            let self = this;
            var characterWidth: number = 9;
            let constraint = validation.getConstraint(constraintName);
            if (constraint && constraint.maxLength && !$input.is("textarea")) {
                let autoWidth = constraint.maxLength * characterWidth;
                $input.width(autoWidth);
            }
        }
    }

    /**
     * MultilineEditor Processor
     */
    class MultilineEditorProcessor extends EditorProcessor {

        init($input: JQuery, data: any) {
            super.init($input, data);
            let self = this, immediateValidate = !_.isNil(data.immediateValidate) ? ko.unwrap(data.immediateValidate) : false;
            if (immediateValidate) {
                $input.on("keyup", () => {
                    let formatter = self.getFormatter(data);
                    let text = $input.val();
                    let validator = self.getValidator(data);
                    let result = validator.validate(text);
                    if (result.isValid) {
                        $input.ntsError('clearKibanError');
                        $input.val(formatter.format(result.parsedValue));
                    } else {
                        let error = $input.ntsError('getError');
                        if (nts.uk.util.isNullOrEmpty(error) || error.messageText !== result.errorMessage) {
                            $input.ntsError('clearKibanError');
                            $input.ntsError('set', result.errorMessage, result.errorCode, false);
                        }
                    }
                });
            }
        }
        
        update($input: JQuery, data: any) {
            super.update($input, data);
            var resizeable: string = this.editorOption.resizeable;
            $input.css('resize', (resizeable) ? "both" : "none");
        }

        getDefaultOption(): any {
            return new option.MultilineEditorOption();
        }

        getFormatter(data: any): format.IFormatter {
            var constraintName = (data.constraint !== undefined) ? ko.unwrap(data.constraint) : "";
            var constraint = validation.getConstraint(constraintName);
            return new text.StringFormatter({ constraintName: constraintName, constraint: constraint, editorOption: this.editorOption });
        }

        getValidator(data: any): validation.IValidator {
            var name: string = data.name !== undefined ? ko.unwrap(data.name) : "";
            name = nts.uk.resource.getControlName(name);
            var required: boolean = (data.required !== undefined) ? ko.unwrap(data.required) : false;
            var constraintName = (data.constraint !== undefined) ? ko.unwrap(data.constraint) : "";
            return new validation.StringValidator(name, constraintName, { required: required });
        }
    }

    /**
     * NumberEditor Processor
     */
    class NumberEditorProcessor extends EditorProcessor {

        init($input: JQuery, data: any) {
            super.init($input, data);

            $input.on('focus', () => {
                if (!$input.attr('readonly')) {
                    $input.val(data.value());
                    // If focusing is caused by Tab key, select text
                    // this code is needed because removing separator deselects.
                    if (keyboardStream.wasKeyDown(KeyCodes.Tab, 500)) {
                        $input.select();
                    }
                }
            });

            let _rg = '__rg__',
                _kc = '__kcode_',
                _val = '__value_';

            $input.attr('type', 'text');
            $input.attr('autocomplete', 'off');

            $input.on('keydown', (evt: KeyboardEvent) => {
                let target = evt.target as HTMLInputElement,
                    start = target.selectionStart,
                    end = target.selectionEnd;

                // if (!$input.data(_kc)) {
                    $input.data(_kc, evt);
                    $input.data(_rg, { start, end });
                    $input.data(_val, target.value);
                // }
            });

            $input.on('paste', (evt: any) => {
                let rd = ko.toJS(data),
                    constraint = rd.constraint,
                    str = evt.originalEvent.clipboardData.getData('text');
                $input.select();
                setTimeout(() => {
                    if (str.match(/^(-?)(\d+\.\d+|\d+)$/)) {
                        if (constraint) {
                            let numb = Number(str),
                                primitive = __viewContext.primitiveValueConstraints[constraint];

                            if (primitive) {
                                let min = primitive.min,
                                    max = primitive.max,
                                    dlen = primitive.mantissaMaxLength || 0;

                                if (numb >= min && numb <= max) {
                                    let m = str.match(/\.\d*$/);

                                    if (!m) {
                                        $input.val(str);
                                    } else {
                                        if (m[0] === '.5' && primitive.valueType === 'HalfInt') {
                                            $input.val(str);
                                        } else if (m[0].length <= dlen + 1) {
                                            $input.val(str);
                                        }
                                    }
                                }
                            }
                        } else {
                            let dl = (rd.option || {}).decimallength;

                            if (dl) {
                                let m = str.match(/\.\d*$/);

                                if (m && m[0].length <= dl + 1) {
                                    $input.val(str);
                                }
                            } else {
                                if (!str.match(/\.\d*$/)) {
                                    $input.val(str);
                                }
                            }
                        }
                    }
                }, 100);

                evt.preventDefault();
            });

            $input.on('input', (evt: any) => {
                let rd = ko.toJS(data),
                    constraint = rd.constraint,
                    orgi: any = evt.originalEvent,
                    targ: HTMLInputElement = evt.target,
                    srg: { start: number; end: number; } = $input.data(_rg),
                    devt: any = $input.data(_kc),
                    dorgi: any = ((devt || {}).originalEvent || {}),
                    ival: string = evt.target.value,
                    dval: string = $input.data(_val);

                //Japanese input always return keyCode 229 -> skip constraining input, and validate after input is committed to editor's value
                if (dorgi == null || dorgi == undefined || dorgi.keyCode == 229) {
                    return;
                }
                
                // ival = ival
                //     .replace(/。/, '.')
                //     .replace(/ー/, '-')
                //     .replace(/０/, '0')
                //     .replace(/１/, '1')
                //     .replace(/２/, '2')
                //     .replace(/３/, '3')
                //     .replace(/４/, '4')
                //     .replace(/５/, '5')
                //     .replace(/６/, '6')
                //     .replace(/７/, '7')
                //     .replace(/８/, '8')
                //     .replace(/９/, '9')
                //     .replace(/./g, k => {
                //         if (['.', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(k) == -1) {
                //             return '';
                //         }

                //         return k;
                //     });

                const numberKeyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]; //['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
                const numberNumpadKeyCodes = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105]; //['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] numpad
                const backspaceKeyCode = [8];
                const delKeyCode = [46];
                const dotWithNumpadKeyCodes = [110, 190]; //'.'
                const minusWithNumpadKeyCodes = [109, 189]; //'-'

                const allowedKeyCodes = [...numberKeyCodes, ...numberNumpadKeyCodes, ...backspaceKeyCode, ...delKeyCode, ...dotWithNumpadKeyCodes, ...minusWithNumpadKeyCodes];

                if (allowedKeyCodes.indexOf(dorgi.keyCode) == -1) {
                    $input.val(dval);
                    $input.data(_kc, null);
                    return;
                }

                if (ival.match(/^0+$/)) {
                    ival = '0';
                }

                // prevent multi . character
                if (ival.indexOf('.') != ival.lastIndexOf('.')) {
                    let first = true;
                    ival = ival.replace(/\./g, k => {
                        if (!first) {
                            return '';
                        }

                        first = false;

                        return k;
                    });
                }

                // prevent multi - character
                if (ival.indexOf('-') != ival.lastIndexOf('-') || ival.indexOf('-') > 0) {
                    ival = ival.replace(/\-/g, (k, i) => {
                        if (!!i) {
                            return '';
                        }

                        return k;
                    });
                }

                // clear value of input
                $input.val('');

                if (ival) {
                    if (ival.match(/^\.+$/)) {
                        ival = '0.';
                    }

                    if (dval) {
                        if (ival.match(/^\-+$/)) {
                            ival = '-';
                        } else if (ival.match(/^\.+$/)) {
                            ival = '0.';
                        } else if (ival.match(/^\-+(0*)\.+$/)) {
                            ival = '-0.';
                        }
                    }

                    if (constraint) {
                        let primitive = __viewContext.primitiveValueConstraints[constraint];

                        if (primitive) { // if primitive is avaiable
                            let min = primitive.min,
                                max = primitive.max,
                                maxL = primitive.maxLength,
                                dlen = primitive.mantissaMaxLength || 0;

                            switch (primitive.valueType) {
                                case 'String': // check length
                                    if (maxL && ival.length > maxL) {
                                        ival = dval;
                                    }

                                    if (ival.match(/^0\d+$/)) {
                                        ival = ival.replace(/^0+/, '0');
                                        ival = Number(ival).toString();
                                    }

                                    ival = ival.replace(/./g, k => {
                                        if (k == '.' || k == '-') {
                                            return '';
                                        }

                                        return k;
                                    });

                                    $input.val(ival);
                                    break;
                                default:
                                case 'Decimal':
                                    let dcval = Number(ival),
                                        dmatch = ival.match(/\.+\d*$/);

                                    if ((min >= 0 ? true : min <= dcval) && dcval <= max && (dmatch ? dmatch[0].length <= dlen + 1 : true)) {
                                        if (ival.match(/\.$/)) {
                                            if (dcval == max || dlen == 0) {
                                                ival = ival.replace(/\./g, '');
                                            }
                                        }

                                        if (ival.match(/^0\d+$/)) {
                                            ival = ival.replace(/^0+/, '0');
                                            ival = Number(ival).toString();
                                        }

                                        if (min >= 0) {
                                            ival = ival.replace(/\-/g, '');

                                            if (min >= 1) {
                                                ival = ival
                                                    .replace(/^0+/, '')
                                                    .replace(/^\.+/, '');
                                            }
                                        } else if (min == dval) {
                                            ival = ival.replace(/\.+$/, '');
                                        }

                                        $input.val(ival);
                                    } else if (min < 0 && ival == '-') {
                                        $input.val(ival);
                                    } else {
                                        if ([8, 46].indexOf(dorgi.keyCode) == -1) {
                                            ival = dval;

                                            $input.val(dval);
                                        } else { // delete event
                                            if (ival.match(/^0\d+$/)) {
                                                ival = ival.replace(/^0+/, '0');
                                                ival = Number(ival).toString();
                                            }
                                            $input.val(ival);
                                        }
                                    }
                                    break;
                                case 'HalfInt':
                                    let hival = Number(ival),
                                        himatch = ival.match(/\.+\d*$/);

                                    if ((min >= 0 ? true : min <= hival) && hival <= max && (himatch ? (himatch[0] === '.5' || himatch[0] === '.') : true)) {
                                        if (himatch && himatch[0] == '.') {
                                            if (hival == max) {
                                                ival = ival.replace(/\./g, '');
                                            }
                                        }

                                        if (ival.match(/^0\d+$/)) {
                                            ival = ival.replace(/^0+/, '0');
                                            ival = Number(ival).toString();
                                        }

                                        if (min >= 0) {
                                            ival = ival.replace(/\-/g, '');

                                            if (min >= 1) {
                                                ival = ival
                                                    .replace(/^0+/, '')
                                                    .replace(/^\.+/, '');
                                            }
                                        } else if (min == hival) {
                                            ival = ival.replace(/\.+$/, '');
                                        }

                                        $input.val(ival);
                                    } else if (min < 0 && ival == '-') {
                                        $input.val(ival);
                                    } else {
                                        if ([8, 46].indexOf(dorgi.keyCode) == -1) {
                                            ival = dval;

                                            $input.val(dval);
                                        } else { // delete event
                                            if (ival.match(/^0\d+$/)) {
                                                ival = ival.replace(/^0+/, '0');
                                                ival = Number(ival).toString();
                                            }
                                            $input.val(ival);
                                        }
                                    }
                                    break;
                                case 'Integer':
                                    let value = Number(ival);

                                    if ((min >= 0 ? true : min <= value) && value <= max && !ival.match(/\.+\d*$/)) {
                                        if (ival.match(/^0\d+$/)) {
                                            ival = ival.replace(/^0+/, '0');
                                            ival = Number(ival).toString();
                                        }

                                        if (min >= 0) {
                                            ival = ival.replace(/\-/g, '');

                                            if (min > 0) {
                                                ival = ival.replace(/^0+/, '');
                                            }
                                        }

                                        $input.val(ival);
                                    } else if (min < 0 && ival == '-') {
                                        $input.val(ival);
                                    } else {
                                        if ([8, 46].indexOf(dorgi.keyCode) == -1) {
                                            ival = dval;

                                            $input.val(dval);
                                        } else { // delete event
                                            if (ival.match(/^0\d+$/)) {
                                                ival = ival.replace(/^0+/, '0');
                                                ival = Number(ival).toString();
                                            }
                                            $input.val(ival);
                                        }
                                    }
                                    break;
                            }
                        } else {
                            if (ival.match(/^0\d+$/)) {
                                ival = ival.replace(/^0+/, '0');
                                ival = Number(ival).toString();
                            }

                            $input.val(ival);
                        }
                    } else {
                        if (rd.option) {
                            // check length & decimal length
                            let dlen = rd.option.decimallength;

                            if (dlen) {
                                let match = ival.match(/\.\d+$/);

                                if (match && match[0].length > dlen + 1) {
                                    ival = dval;
                                }
                            }
                        }

                        if (ival.match(/^0\d+$/)) {
                            ival = ival.replace(/^0+/, '0');
                            ival = Number(ival).toString();
                        }

                        $input.val(ival);
                    }

                    // set carret position
                    setTimeout(() => {
                        if (dval === ival) {
                            if (ival.length == 1) {
                                targ.selectionStart = 1;
                                targ.selectionEnd = 1;
                            } else {
                                targ.selectionStart = srg.start;
                                targ.selectionEnd = srg.end;
                            }
                        } else if (ival.length - dval.length === 1) {
                            targ.selectionStart = srg.start + 1;
                            targ.selectionEnd = srg.end + 1;
                        } else if (dval.length - ival.length === 1) {
                            if (dorgi.keyCode === 46) {
                                targ.selectionStart = srg.start;
                                targ.selectionEnd = srg.end;
                            } else if (dorgi.keyCode == 8) {
                                targ.selectionStart = srg.start - 1;
                                targ.selectionEnd = srg.end - 1;
                            }
                        }
                    }, 0);
                }

                $input.data(_kc, null);
                $input.data(_rg, null);
                $input.data(_val, null);
            });

            $input.on('blur', (evt) => {
                let value = $input.val();

                if (value.match(/\.$/)) {
                    value = value.replace(/\.$/, '');

                    // fix value if input en with [.]
                    $input
                        .val(value)
                        .trigger('blur');
                }
            });
        }

        update($input: JQuery, data: any) {
            super.update($input, data);
            var $parent = $input.parent();
            var width: string = this.editorOption.width;
            var parentTag = $parent.parent().prop("tagName").toLowerCase();
            if (parentTag === "td" || parentTag === "th" || parentTag === "a" || width === "100%") {
                $parent.css({ 'width': '100%' });
            }
            
            if (this.editorOption.currencyformat !== undefined && this.editorOption.currencyformat !== null) {
                $parent.addClass("symbol").addClass(this.editorOption.currencyposition === 'left' ? 'symbol-left' : 'symbol-right');
                var format = this.editorOption.currencyformat === "JPY" ? "\u00A5" : '$';
                $parent.attr("data-content", format);
            } else {
                if (!nts.uk.util.isNullOrEmpty(this.editorOption.unitID)) {
                    let unit = text.getNumberUnit(this.editorOption.unitID);
                    this.editorOption.symbolChar = unit.unitText;
                    this.editorOption.symbolPosition = unit.position;
                    this.setupUnit($input, width);
                } else if (!nts.uk.util.isNullOrEmpty(this.editorOption.symbolChar) && !nts.uk.util.isNullOrEmpty(this.editorOption.symbolPosition)) {
                    this.setupUnit($input, width);
                }

                // remove currency symbol if number mode
//                $parent.removeClass('symbol').removeClass('symbol-left').removeClass('symbol-right');
            }
            
            if(!nts.uk.util.isNullOrEmpty(this.editorOption.defaultValue) 
                && nts.uk.util.isNullOrEmpty(data.value())){
                data.value(this.editorOption.defaultValue);        
            }
        }
        
        setupUnit ($input: JQuery, width: string) {
            let $parent = $input.parent();
            let padding = nts.uk.text.countHalf(this.editorOption.symbolChar) * 8;
            if (padding < 20 ){
                padding = 20;        
            }
            
            $parent.addClass("symbol").addClass(this.editorOption.symbolPosition === 'right' ? 'symbol-right' : 'symbol-left');
            $parent.attr("data-content", this.editorOption.symbolChar);
            
            let css = this.editorOption.symbolPosition === 'right' ? {"padding-right": padding + "px"} : {"padding-left": padding + "px"};
            $input.css(css);        
            
            if (width.trim() != "") {
                $input.innerWidth(parseInt(width) - 2);//　-　$input.innerWidth() + $input.width()) - ($input.outerWidth() - $input.innerWidth());
            }
        }

        getDefaultOption(): any {
            return new nts.uk.ui.option.NumberEditorOption();
        }

        getFormatter(data: any): format.IFormatter {
            let option: any = !nts.uk.util.isNullOrUndefined(data.option) ? ko.toJS(data.option) : {};
            if (option.numberGroup == true) {
                this.editorOption.grouplength = 3;    
            } else if (option.numberGroup == false) {
                this.editorOption.grouplength = 0;
            }
            return new text.NumberFormatter({ option: this.editorOption });
        }

        getValidator(data: any): validation.IValidator {
            let option: any = !nts.uk.util.isNullOrUndefined(data.option) ? ko.toJS(data.option) : {},
                eOption = $.extend(this.getDefaultOption(), option),
                required = (data.required !== undefined) ? ko.unwrap(data.required) : false,
                constraintName = (data.constraint !== undefined) ? ko.unwrap(data.constraint) : "",
                name = nts.uk.resource.getControlName(data.name !== undefined ? ko.unwrap(data.name) : "");
            if (option.numberGroup == true) {
                option.grouplength = 3;    
            } else if (option.numberGroup == false) {
                option.grouplength = 0;
            }   
            // update editor option
            $.extend(this.editorOption, {
                required: required,
                decimallength: Number(eOption.decimallength),
                grouplength: Number(eOption.grouplength),
                decimalseperator: eOption.decimalseperator
            });
            
            return new validation.NumberValidator(name, constraintName, this.editorOption);
        }
    }

    /**
     * TimeEditor Processor
     */
    class TimeEditorProcessor extends EditorProcessor {

        update($input: JQuery, data: any) {
            super.update($input, data);
            var option: nts.uk.ui.option.ITimeEditorOption = (data.option !== undefined) ? ko.mapping.toJS(data.option) : this.getDefaultOption();
            var width: string = option.width;
            var $parent = $input.parent();
            var parentTag = $parent.parent().prop("tagName").toLowerCase();
            if (parentTag === "td" || parentTag === "th" || parentTag === "a" || width === "100%") {
                $parent.css({ 'width': '100%' });
            }
            
            if (!nts.uk.util.isNullOrEmpty(data.mode) && (data.mode === "year" || data.mode === "fiscal")) {
                let symbolText = data.mode === "year" ? nts.uk.text.getNumberUnit("YEARS") : nts.uk.text.getNumberUnit("FIS_YEAR"); 
                $parent.addClass("symbol").addClass('symbol-right');
                $parent.attr("data-content", symbolText.unitText); 
                
                let css = data.mode === "year" ? {"padding-right": "20px"} : {"padding-right": "35px"};
                $input.css(css);
            }
            
            if(!nts.uk.util.isNullOrEmpty(option.defaultValue) 
                && nts.uk.util.isNullOrEmpty(data.value())){
                data.value(option.defaultValue);        
            }
        }

        getDefaultOption(): any {
            return new nts.uk.ui.option.TimeEditorOption();
        }

        getFormatter(data: any): format.IFormatter {
            var option = (data.option !== undefined) ? ko.mapping.toJS(data.option) : this.getDefaultOption();
            var inputFormat: string = (data.inputFormat !== undefined) ? ko.unwrap(data.inputFormat) : option.inputFormat;
            var mode: string = (data.mode !== undefined) ? ko.unwrap(data.mode) : ""
            return new text.TimeFormatter({ inputFormat: inputFormat, mode: mode });
        }

        getValidator(data: any): validation.IValidator {
            var name = data.name !== undefined ? ko.unwrap(data.name) : "";
            name = nts.uk.resource.getControlName(name);
            var constraintName = (data.constraint !== undefined) ? ko.unwrap(data.constraint) : "";
            var option = (data.option !== undefined) ? ko.mapping.toJS(data.option) : this.getDefaultOption();
            var required: boolean = (data.required !== undefined) ? ko.unwrap(data.required) : false;
            var inputFormat: string = (data.inputFormat !== undefined) ? ko.unwrap(data.inputFormat) : option.inputFormat;
            var mode: string = (data.mode !== undefined) ? ko.unwrap(data.mode) : "";
           
            let validateOption = $.extend({ required: required, outputFormat: inputFormat, mode: mode }, option);
            return new validation.TimeValidator(name, constraintName, validateOption);
        }
    }
    
    /**
     * TimeWithDayAttrEditor Processor
     */
    class TimeWithDayAttrEditorProcessor extends EditorProcessor {
        
        init($input: JQuery, data: any) {
            super.init($input, data);
            $input.focus(() => {
                if ($input.attr('readonly')) {
                    return;
                }
                if ($input.ntsError('hasError')) {
                    return;
                }
                
                if(!nts.uk.util.isNullOrEmpty(data.value())){
                    let timeWithDayAttr = time.minutesBased.clock.dayattr.create(data.value());
                    $input.val(timeWithDayAttr.shortText);
                } else {
                    $input.val("");
                }

                // If focusing is caused by Tab key, select text
                // this code is needed because removing separator deselects.
                if (keyboardStream.wasKeyDown(KeyCodes.Tab, 500)) {
                    $input.select();
                }
                
            });
        }
        
        update($input: JQuery, data: any) {
            super.update($input, data);
            let value = ko.unwrap(data.value);
            if ($input.ntsError("hasError") && typeof(value) === "number") {
                $input.ntsError("clearKibanError");
                $input.val(this.getFormatter(data).format(value));
            }
        }
        
        getDefaultOption(): any {
            return new nts.uk.ui.option.TimeWithDayAttrEditorOption();
        }

        getFormatter(data: any): format.IFormatter {
            var option = (data.option !== undefined) ? ko.mapping.toJS(data.option) : this.getDefaultOption();
            return new text.TimeWithDayFormatter(option);
        }

        getValidator(data: any): validation.IValidator {
            //TODO: 
            var name = data.name !== undefined ? ko.unwrap(data.name) : "";
            name = nts.uk.resource.getControlName(name);
            var constraintName = (data.constraint !== undefined) ? ko.unwrap(data.constraint) : "";
            var required: boolean = (data.required !== undefined) ? ko.unwrap(data.required) : false;
            return new validation.TimeWithDayValidator(name, constraintName, { required: required });
        }
    }
    
    /**
     * Base Editor
     */
    class NtsEditorBindingHandler implements KnockoutBindingHandler {

        /**
         * Init.
         */
        init(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            new EditorProcessor().init($(element), valueAccessor());
        }

        /**
         * Update
         */
        update(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            new EditorProcessor().update($(element), valueAccessor());
        }
    }

    /**
     * TextEditor
     */
    class NtsTextEditorBindingHandler extends NtsEditorBindingHandler {

        /**
         * Init.
         */
        init(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            new TextEditorProcessor().init($(element), valueAccessor());
        }

        /**
         * Update
         */
        update(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            new TextEditorProcessor().update($(element), valueAccessor());
        }
    }

    /**
     * NumberEditor
     */
    class NtsNumberEditorBindingHandler implements KnockoutBindingHandler {

        /**
         * Init.
         */
        init(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            new NumberEditorProcessor().init($(element), valueAccessor());
        }

        /**
         * Update
         */
        update(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            new NumberEditorProcessor().update($(element), valueAccessor());
        }
    }

    /**
     * TimeEditor
     */
    class NtsTimeEditorBindingHandler implements KnockoutBindingHandler {

        /**
         * Init.
         */
        init(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            new TimeEditorProcessor().init($(element), valueAccessor());
        }

        /**
         * Update
         */
        update(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            // Get data
            new TimeEditorProcessor().update($(element), valueAccessor());
        }
    }

    /**
     * MultilineEditor
     */
    class NtsMultilineEditorBindingHandler extends NtsEditorBindingHandler {

        /**
         * Init.
         */
        init(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            new MultilineEditorProcessor().init($(element), valueAccessor());
        }

        /**
         * Update
         */
        update(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            new MultilineEditorProcessor().update($(element), valueAccessor());
        }
    }
    
    /**
     * TimeWithDayAttr
     */
    class NtsTimeWithDayAttrEditorBindingHandler extends NtsEditorBindingHandler {

        /**
         * Init.
         */
        init(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            new TimeWithDayAttrEditorProcessor().init($(element), valueAccessor());
        }

        /**
         * Update
         */
        update(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            new TimeWithDayAttrEditorProcessor().update($(element), valueAccessor());
        }
    }
    
    function setEnterHandlerIfRequired($input: JQuery, data: any) {
    
        var handlesEnterKey = (typeof data.enterkey === "function");
        var onEnterKey = handlesEnterKey ? data.enterkey : $.noop;
        
        if (handlesEnterKey) {
            $input.addClass("enterkey")
                .onkey("down", uk.KeyCodes.Enter, e => {
                
                    if($(".blockUI").length > 0){
                        return; 
                    }
                
                    $input.change();
                    onEnterKey.call(ko.dataFor(e.target), e);
                    
                });
        }
    }

    ko.bindingHandlers['ntsTextEditor'] = new NtsTextEditorBindingHandler();
    ko.bindingHandlers['ntsNumberEditor'] = new NtsNumberEditorBindingHandler();
    ko.bindingHandlers['ntsTimeEditor'] = new NtsTimeEditorBindingHandler();
    ko.bindingHandlers['ntsMultilineEditor'] = new NtsMultilineEditorBindingHandler();
    ko.bindingHandlers['ntsTimeWithDayEditor'] = new NtsTimeWithDayAttrEditorBindingHandler();
}
