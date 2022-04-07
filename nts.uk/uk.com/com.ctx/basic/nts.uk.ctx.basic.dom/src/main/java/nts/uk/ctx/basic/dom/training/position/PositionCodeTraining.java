package nts.uk.ctx.basic.dom.training.position;

import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.CodePrimitiveValue;

@StringMaxLength(2)
@StringCharType(CharType.ALPHA_NUMERIC)
public class PositionCodeTraining extends CodePrimitiveValue<PositionCodeTraining>{
	
	private static final long serialVersionUID = 1L;

	public PositionCodeTraining(String rawValue) {
		super(rawValue);
	}
}