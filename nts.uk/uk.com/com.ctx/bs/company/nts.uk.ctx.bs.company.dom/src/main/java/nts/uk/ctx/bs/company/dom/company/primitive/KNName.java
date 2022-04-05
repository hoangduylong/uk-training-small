package nts.uk.ctx.bs.company.dom.company.primitive;

import nts.arc.primitive.KanaPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;
/**
 * 
 * @author yennth
 *
 */
@StringMaxLength(60)
public class KNName extends KanaPrimitiveValue<KNName>{
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;
	/** 会社名カナ  **/
	public KNName(String rawValue){
		super(rawValue);
	}
}
