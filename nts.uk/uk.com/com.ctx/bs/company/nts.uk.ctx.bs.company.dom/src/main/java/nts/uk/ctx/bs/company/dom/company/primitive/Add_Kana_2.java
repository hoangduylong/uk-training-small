package nts.uk.ctx.bs.company.dom.company.primitive;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * @author yennth
 */
@StringMaxLength(40)
public class Add_Kana_2 extends StringPrimitiveValue<Add_Kana_2>{
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;
	/** 住所  */
	public Add_Kana_2 (String rawValue){
		super(rawValue);
	}
}
