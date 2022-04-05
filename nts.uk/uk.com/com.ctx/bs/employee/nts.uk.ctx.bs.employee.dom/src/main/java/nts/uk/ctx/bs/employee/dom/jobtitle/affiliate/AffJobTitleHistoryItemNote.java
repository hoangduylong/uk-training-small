package nts.uk.ctx.bs.employee.dom.jobtitle.affiliate;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(100)
public class AffJobTitleHistoryItemNote extends StringPrimitiveValue<AffJobTitleHistoryItemNote> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public AffJobTitleHistoryItemNote(String rawValue) {
		super(rawValue);
	}

}
