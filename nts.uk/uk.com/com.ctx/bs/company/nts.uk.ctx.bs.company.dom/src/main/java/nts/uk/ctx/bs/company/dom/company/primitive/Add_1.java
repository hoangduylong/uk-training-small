package nts.uk.ctx.bs.company.dom.company.primitive;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;
/**
 * @author yennth
 */
@StringMaxLength(120)
public class Add_1 extends StringPrimitiveValue<Add_1>{
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;
	/** 住所１  */
	public Add_1 (String rawValue){
		super(rawValue);
	}
}
