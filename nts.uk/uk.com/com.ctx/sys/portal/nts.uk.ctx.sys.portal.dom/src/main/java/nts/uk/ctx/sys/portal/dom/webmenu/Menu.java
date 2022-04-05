package nts.uk.ctx.sys.portal.dom.webmenu;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(4)
public class Menu extends StringPrimitiveValue<Menu> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public Menu(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
