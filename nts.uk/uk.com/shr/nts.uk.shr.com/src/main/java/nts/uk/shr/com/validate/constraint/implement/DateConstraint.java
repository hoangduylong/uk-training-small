package nts.uk.shr.com.validate.constraint.implement;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Optional;
import java.util.regex.Pattern;

import lombok.Getter;
import nts.gul.util.value.ValueWithType;
import nts.uk.shr.com.validate.constraint.DataConstraint;
import nts.uk.shr.com.validate.constraint.ValidatorType;

@Getter
public class DateConstraint extends DataConstraint {

	private static final Pattern yearPattern = Pattern.compile("^\\d{4}$");

	private static final Pattern yearMonthPattern = Pattern.compile("^\\d{4}\\/(0?[1-9]|1[012])$");

	private static final Pattern datePattern = Pattern
			.compile("^\\d{4}\\/(0?[1-9]|1[012])\\/(0?[1-9]|[12][0-9]|3[01])$");

	private DateType dateType;

	public DateConstraint(int column, DateType dateType) {
		super(column, ValidatorType.DATE);
		this.dateType = dateType;
	}
	
	public Optional<String> validate(ValueWithType value) {
		switch (value.getType()) {
		case TEXT:
			return this.validateString(value.getText());
		case DATE:
			return Optional.empty();
		case NUMBER:
			String stringValue = value.getDecimal().toString();
			return this.validateString(stringValue);
		default:
			return Optional.of(getDefaultMessage());
		}
	}

	public Optional<String> validateString(String stringValue) {

		if (stringValue.isEmpty()) {
			return Optional.empty();
		}

		Pattern pattern;

		switch (this.dateType) {
		case YEAR:
			pattern = yearPattern;
			break;

		case YEARMONTH:
			pattern = yearMonthPattern;
			break;
		case DATE:
		default:
			pattern = datePattern;
			break;
		}

		if (!pattern.matcher(stringValue).matches()) {
			return Optional.of(getDefaultMessage());
		}

		if (this.dateType == DateType.DATE) {
			if (!validateDate(stringValue)) {
				return Optional.of(getDefaultMessage());
			}
		}

		return Optional.empty();

	}

	private boolean validateDate(String value) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
		dateFormat.setLenient(false);
		try {
			dateFormat.parse(value.trim());
		} catch (ParseException pe) {
			return false;
		}
		return true;
	}

	@Override
	protected String getDefaultMessage() {
		return "MsgB_54";
	}

}
