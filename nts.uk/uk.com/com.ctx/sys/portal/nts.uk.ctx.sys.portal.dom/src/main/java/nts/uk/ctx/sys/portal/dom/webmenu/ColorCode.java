package nts.uk.ctx.sys.portal.dom.webmenu;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * 
 * @author sonnh
 *
 */
@StringMaxLength(7)
public class ColorCode extends StringPrimitiveValue<ColorCode>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ColorCode(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
