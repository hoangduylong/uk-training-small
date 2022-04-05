package nts.uk.ctx.bs.company.dom.company;

import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.CodePrimitiveValue;
import nts.uk.shr.com.primitive.ZeroPaddedCode;
/**
 * 会社コード
 * Code of Company
 */
@StringCharType(CharType.NUMERIC)
@StringMaxLength(4)
@ZeroPaddedCode
public class CompanyCode extends CodePrimitiveValue<CompanyCode>{
	
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	public CompanyCode(String rawValue) {
		super(rawValue);
	}

}
