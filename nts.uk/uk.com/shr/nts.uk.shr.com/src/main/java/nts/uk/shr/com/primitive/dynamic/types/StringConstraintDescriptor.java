package nts.uk.shr.com.primitive.dynamic.types;

import lombok.Value;

@Value
public class StringConstraintDescriptor {
	
	private final String itemCode;

	private final int maxLength;
	private final String charType;
	private final char paddingCharacter;
	private final boolean isPaddingLeft;
	private final boolean isPadding;
	private final String stringExpression;
	private final boolean required;
	
}
