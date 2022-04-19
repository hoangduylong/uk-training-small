package nts.uk.ctx.basic.dom.training.jobtitle;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(10)
public class JobTitleNameTraining extends StringPrimitiveValue<JobTitleNameTraining> {

	private static final long serialVersionUID = 1L;

	public JobTitleNameTraining(String rawValue) {
		super(rawValue);
	}

}