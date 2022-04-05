package nts.uk.ctx.sys.portal.dom.webmenu;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(4)
public class MenuCode extends StringPrimitiveValue<MenuCode> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public MenuCode(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
