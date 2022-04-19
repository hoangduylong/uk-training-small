package nts.uk.ctx.basic.dom.training.jobtitle;

import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.CodePrimitiveValue;

@StringMaxLength(5)
@StringCharType(CharType.NUMERIC)
public class JobTitleCodeTraining extends CodePrimitiveValue<JobTitleCodeTraining> {
	
	private static final long serialVersionUID = 1L;

	public JobTitleCodeTraining(String rawValue) {
		super(rawValue);
	}

}