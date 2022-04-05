package nts.uk.shr.com.validate.constraint.implement;

import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import lombok.Getter;
import nts.gul.util.value.ValueWithType;
import nts.gul.util.value.ValueWithType.Type;
import nts.uk.shr.com.validate.constraint.DataConstraint;
import nts.uk.shr.com.validate.constraint.ValidatorType;
import nts.uk.shr.com.validate.validator.ErrorIdFactory;

@Getter
public class StringConstraint extends DataConstraint {

	private static final Pattern alphabetPattern = Pattern.compile("[a-zA-Z]+$");
	private static final Pattern numericPattern = Pattern.compile("[0-9]+$");
	private static final Pattern alphabetNumericPattern = Pattern.compile("[a-zA-Z0-9]+$");
	private static final Pattern hiraganaPattern = Pattern.compile("^[\\u3040-\\u309Fー　]+$");
	private static final Pattern katakanaPattern = Pattern.compile("^[\\u30A0-\\u30FFー　]+$");
	private static final Pattern kanaPattern = Pattern.compile("^[\\u3040-\\u309F\\u30A0-\\u30FFー　\\uFF61-\\uFF9F]+$");
	private static final Pattern anyHalfWidthPattern = Pattern.compile("[\\u0020-\\u007F\\uff61-\\uFF9F]+$");

	private StringCharType charType;

	private int maxLenght;

	private boolean fixed;

	private String regExpression;

	public StringConstraint(int column, int maxLenght, String regExpression) {
		super(column, ValidatorType.STRING);
		this.charType = StringCharType.ANY;
		this.maxLenght = maxLenght;
		this.fixed = false;
		this.regExpression = regExpression;
	}

	public StringConstraint(int column, StringCharType charType, int maxLenght) {
		super(column, ValidatorType.STRING);
		this.charType = charType;
		this.maxLenght = maxLenght;
		this.fixed = false;
		this.regExpression = "";
	}
	
	public Optional<String> validate(ValueWithType value) {
		if (value.getType() == Type.TEXT) {
			return validateString(value.getText());
		} 
		return Optional.of(getDefaultMessage());
	}

	public Optional<String> validateString(String value) {

		if (!validateRegEx(this.regExpression, value)) {
			return Optional.of(ErrorIdFactory.RegExpErrorId);
		}

		if (!validateCharType(this.charType, value)) {
			return Optional.of(getDefaultMessage());
		}

		if (!validateMaxLength(this.maxLenght, value)) {
			return Optional.of(getDefaultMessage());
		}

		return Optional.empty();
	}

	private boolean validateCharType(StringCharType type, String value) {

		if (value.isEmpty()) {
			return true;
		}

		Pattern pattern;

		switch (type) {
		case ALPHABET:
			pattern = alphabetPattern;
			break;
		case NUMERIC:
			pattern = numericPattern;
			break;
		case ALPHA_NUMERIC:
			pattern = alphabetNumericPattern;
			break;
		case HIRAGANA:
			pattern = hiraganaPattern;
			break;
		case KATAKANA:
			pattern = katakanaPattern;
			break;
		case KANA:
			pattern = kanaPattern;
			break;
		case ANY_HALF_WIDTH:
			pattern = anyHalfWidthPattern;
			break;
		case ANY:
		default:
			return true;
		}

		return pattern.matcher(value).matches();
	}

	private boolean validateMaxLength(int maxLength, String value) {
		return value.length() <= maxLength;
	}

	private static boolean validateRegEx(String validatedStr, String value) {
		if (validatedStr == null || validatedStr.isEmpty()) {
			return true;
		}
		Pattern pattern = Pattern.compile(validatedStr);
		Matcher matcher = pattern.matcher(value);
		return matcher.matches();
	}

	@Override
	protected String getDefaultMessage () {
		switch (this.charType) {
		case NUMERIC:
			return "MsgB_5";
		case ALPHA_NUMERIC:
			return "MsgB_6";
		case KATAKANA:
		case KANA:
			return "MsgB_7";
		case ANY_HALF_WIDTH:
			return "MsgB_4";
		default:
			return "MsgB_3";
		}
	}
}
