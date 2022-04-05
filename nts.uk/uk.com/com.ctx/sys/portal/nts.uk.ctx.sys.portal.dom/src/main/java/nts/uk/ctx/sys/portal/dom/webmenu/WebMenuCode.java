package nts.uk.ctx.sys.portal.dom.webmenu;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * 
 * @author sonnh
 *
 */
@StringMaxLength(3)
@StringCharType(CharType.ALPHA_NUMERIC)
public class WebMenuCode extends StringPrimitiveValue<WebMenuCode> {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public WebMenuCode(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
