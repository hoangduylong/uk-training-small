package nts.uk.ctx.bs.company.dom.company.primitive;
import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
/**
 * 
 * @author yennth
 *
 */
@StringMaxLength(20)
@StringCharType(CharType.ANY_HALF_WIDTH)
public class PhoneNum extends StringPrimitiveValue<PhoneNum>{
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;
	/** 電話番号  */
	public PhoneNum (String rawValue){
		super(rawValue);
	}
}
