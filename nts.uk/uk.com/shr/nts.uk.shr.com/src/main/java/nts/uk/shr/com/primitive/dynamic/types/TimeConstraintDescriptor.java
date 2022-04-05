package nts.uk.shr.com.primitive.dynamic.types;

import lombok.Value;

@Value
public class TimeConstraintDescriptor {

	private final String itemCode;

	private final String min;
	private final String max;
	private final String valueType;
	private final boolean required;
}
