package nts.uk.ctx.bs.company.dom.company.primitive;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;
/**
 * 代表者名
 * @author yennth
 *
 */
@StringMaxLength(20)
public class RepName extends StringPrimitiveValue<RepName>{
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;
	/** 会社代表者名  */
	public RepName(String rawValue){
		super(rawValue);
	}
}
