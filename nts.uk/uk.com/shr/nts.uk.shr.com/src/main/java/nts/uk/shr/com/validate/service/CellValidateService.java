package nts.uk.shr.com.validate.service;

import java.util.Optional;

import nts.gul.util.value.ValueWithType;
import nts.uk.shr.com.validate.constraint.DataConstraint;
import nts.uk.shr.com.validate.constraint.implement.DateConstraint;
import nts.uk.shr.com.validate.constraint.implement.NumericConstraint;
import nts.uk.shr.com.validate.constraint.implement.StringConstraint;
import nts.uk.shr.com.validate.constraint.implement.TimeConstraint;
import nts.uk.shr.com.validate.constraint.implement.TimePointConstraint;

public class CellValidateService {

	public static Optional<String> validateValue(DataConstraint constraint, ValueWithType value) {

		switch (constraint.getConstraintType()) {
		case STRING:
			return ((StringConstraint) constraint).validate(value);
		case NUMERIC:
			return ((NumericConstraint) constraint).validate(value);
		case DATE:
			return ((DateConstraint) constraint).validate(value);
		case TIME:
			return ((TimeConstraint) constraint).validate(value);
		case TIMEPOINT:
			return ((TimePointConstraint) constraint).validate(value);
		}
		return Optional.empty();
	}

}
