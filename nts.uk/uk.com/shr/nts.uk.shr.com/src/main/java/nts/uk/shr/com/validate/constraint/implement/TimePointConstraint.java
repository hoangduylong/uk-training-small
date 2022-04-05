package nts.uk.shr.com.validate.constraint.implement;

import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import lombok.Getter;
import nts.gul.util.value.ValueWithType;
import nts.gul.util.value.ValueWithType.Type;
import nts.uk.shr.com.enumcommon.DayAttr;
import nts.uk.shr.com.validate.constraint.DataConstraint;
import nts.uk.shr.com.validate.constraint.ValidatorType;
import nts.uk.shr.com.validate.validator.TimeMinMaxValidator;

@Getter
public class TimePointConstraint extends DataConstraint {

	private static final String TIME_FORMAT = "^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$";

	private static final String TIME_POINT_FORMAT = "^([0-9]*):[0-5][0-9]$";

	private int min;

	private int max;

	public TimePointConstraint(int column, int min, int max) {
		super(column, ValidatorType.TIMEPOINT);
		this.min = min;
		this.max = max;
	}

	public boolean validateTimeStyle(String value, String format) {
		
		Pattern pattern = Pattern.compile(format);
		Matcher matcher = pattern.matcher(value);
		return matcher.matches();
	}
	
	public Optional<String> validate(ValueWithType value) {
		if (value.getType() == Type.TEXT) { 
			if (value.getText() == null)
				return Optional.empty();
			
			return validateString(value.getText());
		}
		return Optional.of(getDefaultMessage());
	}

	public Optional<String> validateString(String value) {
		DayAttr dayAttr = checkDayAttr(value);
		if (dayAttr != null) {
			value = value.replace(dayAttr.description, "").trim();
			if (!validateTimeStyle(value, TIME_FORMAT)) {
				return Optional.of(getDefaultMessage());
			}
		} else {
			if (!validateTimeStyle(value, TIME_POINT_FORMAT)) {
				return Optional.of(getDefaultMessage());
			}
		}
		

		return TimeMinMaxValidator.validateMinMaxTimePoint(this.min, this.max, value, dayAttr).map(c -> getDefaultMessage());
	}

	@Override
	protected String getDefaultMessage() {
		return "MsgB_56";
	}
	
	private DayAttr checkDayAttr (String value) {
		for (DayAttr dt : DayAttr.values()) {
			if (value.contains(dt.description)) {
				return dt;
			}
		}
		
		return null;
	}

}
