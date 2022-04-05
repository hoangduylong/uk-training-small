package nts.uk.ctx.bs.company.dom.company.primitive;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;
/**
 * 
 * @author yennth
 *
 */
@StringMaxLength(20)
public class ABName extends StringPrimitiveValue<ABName>{
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;
	/** 会社略名 **/
	public ABName(String rawValue){
		super(rawValue);
	}
}
