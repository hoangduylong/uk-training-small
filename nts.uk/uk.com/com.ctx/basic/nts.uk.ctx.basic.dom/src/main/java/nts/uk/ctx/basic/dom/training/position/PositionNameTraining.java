package nts.uk.ctx.basic.dom.training.position;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(10)
public class PositionNameTraining extends StringPrimitiveValue<PositionNameTraining>{
	
	private static final long serialVersionUID = 1L;

	public PositionNameTraining(String rawValue) {
		super(rawValue);
	}
}