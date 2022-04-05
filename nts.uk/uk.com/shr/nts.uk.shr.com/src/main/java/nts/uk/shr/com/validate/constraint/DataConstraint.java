package nts.uk.shr.com.validate.constraint;

import java.math.BigDecimal;

import lombok.Getter;
import nts.uk.shr.com.validate.constraint.implement.DateConstraint;
import nts.uk.shr.com.validate.constraint.implement.DateType;
import nts.uk.shr.com.validate.constraint.implement.NumericConstraint;
import nts.uk.shr.com.validate.constraint.implement.StringCharType;
import nts.uk.shr.com.validate.constraint.implement.StringConstraint;
import nts.uk.shr.com.validate.constraint.implement.TimeConstraint;
import nts.uk.shr.com.validate.constraint.implement.TimePointConstraint;

@Getter
public abstract class DataConstraint {

	protected int column;

	protected ValidatorType constraintType;

	public DataConstraint(int column, ValidatorType constraintType) {
		super();
		this.column = column;
		this.constraintType = constraintType;
	}

	public static StringConstraint createStringConstraintWithType(int column, StringCharType charType, int maxLenght) {
		return new StringConstraint(column, charType, maxLenght);
	}

	public static StringConstraint createStringConstraintWithRegExp(int column, int maxLenght, String regExp) {
		return new StringConstraint(column, maxLenght, regExp);
	}

	public static NumericConstraint createNumericConstraint(int column, boolean minusAvailable, BigDecimal min,
			BigDecimal max, int integerPart, int decimalPart) {
		return new NumericConstraint(column, minusAvailable, min, max, integerPart, decimalPart);
	}

	public static DateConstraint createDateConstraint(int column, DateType dateType) {
		return new DateConstraint(column, dateType);
	}
	
	public static TimeConstraint createTimeConstraint(int column, int min, int max) {
		return new TimeConstraint(column, min, max);
	}
	
	public static TimePointConstraint createTimePointConstraint(int column, int min, int max) {
		return new TimePointConstraint(column, min, max);
	}
	
	protected abstract String getDefaultMessage();

}
