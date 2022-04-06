package nts.uk.ctx.basic.dom.training.position;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(10)
public class PositionName extends StringPrimitiveValue<PositionName>{
	
	private static final long serialVersionUID = 1L;

	public PositionName(String rawValue) {
		super(rawValue);
	}
}