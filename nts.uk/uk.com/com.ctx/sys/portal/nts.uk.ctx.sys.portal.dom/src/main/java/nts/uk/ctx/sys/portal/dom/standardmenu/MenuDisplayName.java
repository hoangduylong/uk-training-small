package nts.uk.ctx.sys.portal.dom.standardmenu;

import nts.arc.primitive.StringPrimitiveValue;

import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(40)
public class MenuDisplayName extends StringPrimitiveValue<MenuDisplayName> {

	private static final long serialVersionUID = 1L;

	public MenuDisplayName(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
