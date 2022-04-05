package nts.uk.ctx.sys.portal.dom.webmenu;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * 
 * @author sonnh
 *
 */
@StringMaxLength(30)
public class MenuBarName extends StringPrimitiveValue<MenuBarName>{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public MenuBarName(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
