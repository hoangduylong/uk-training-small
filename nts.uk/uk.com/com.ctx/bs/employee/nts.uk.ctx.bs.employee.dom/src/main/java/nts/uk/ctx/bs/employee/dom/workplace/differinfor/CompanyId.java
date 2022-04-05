package nts.uk.ctx.bs.employee.dom.workplace.differinfor;

import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.CodePrimitiveValue;

@StringMaxLength(17)
public class CompanyId extends CodePrimitiveValue<CompanyId>{
	/** serialVersionUID */
    private static final long serialVersionUID = 1L;
    
    public CompanyId(String rawValue) {
		super(rawValue);
	}
}
