package nts.uk.shr.com.validate.constraint.implement;

import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import lombok.Getter;
import nts.gul.util.value.ValueWithType;
import nts.gul.util.value.ValueWithType.Type;
import nts.uk.shr.com.validate.constraint.DataConstraint;
import nts.uk.shr.com.validate.constraint.ValidatorType;
import nts.uk.shr.com.validate.validator.TimeMinMaxValidator;

@Getter
public class TimeConstraint extends DataConstraint {

	private static final String TIME_FORMAT = "^[0-9]+:[0-5][0-9]$";

	private int min;

	private int max;

	public TimeConstraint(int column, int min, int max) {
		super(column, ValidatorType.TIME);
		this.min = min;
		this.max = max;
	}

	public boolean validateTimeStyle(String value) {
		Pattern pattern = Pattern.compile(TIME_FORMAT);
		Matcher matcher = pattern.matcher(value);
		return matcher.matches();
	}

	public Optional<String> validate(ValueWithType value) {
		if (value.getType() == Type.TEXT) 
			return validateString(value.getText());
		
		return Optional.of(getDefaultMessage());
	}

	public Optional<String> validateString(String value) {

		// validate style
		if (!validateTimeStyle(value)) {
			return Optional.of(getDefaultMessage());
		}

		return TimeMinMaxValidator.validateMinMax(this.min, this.max, value).map(c -> getDefaultMessage());
	}

	@Override
	protected String getDefaultMessage() {
		return "MsgB_55";
	}

}
