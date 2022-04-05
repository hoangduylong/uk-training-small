package nts.uk.ctx.bs.company.dom.company.primitive;

//import java.math.BigDecimal;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

@StringCharType(CharType.NUMERIC)
@StringMaxLength(13)
public class TaxNo extends StringPrimitiveValue<TaxNo>{
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;
	/** 法人マイナンバー */
	public TaxNo(String rawValue) {
		super(rawValue);
	}
}
  