/**
 * Validate
 */
function validateNameInput($input, nameId, value, constraintName) {
    var self = this;
    var data = {
        name: nameId,
        value: value,
        required: true,
        constraint: constraintName
    };
    var validator = getValidator(data);
    var result = validator.validate(data.value);
    if (result.isValid) {
        $input.ntsError('clear');
        $input.removeAttr("style");
    }
    else {
        var error = $input.ntsError('getError');
        if (nts.uk.util.isNullOrEmpty(error) || error.messageText !== result.errorMessage) {
            $input.ntsError('clear');
            $input.ntsError('set', result.errorMessage, result.errorCode);
        }
    }
    new nts.uk.util.value.DefaultValue().onReset($input, data.value);
}
function getValidator(data) {
    var name = data.name !== undefined ? ko.unwrap(data.name) : "";
    name = nts.uk.resource.getControlName(name);
    var required = (data.required !== undefined) ? ko.unwrap(data.required) : false;
    var constraintName = (data.constraint !== undefined) ? ko.unwrap(data.constraint) : "";
    return new nts.uk.ui.validation.StringValidator(name, constraintName, { required: required });
}
//# sourceMappingURL=base.js.map