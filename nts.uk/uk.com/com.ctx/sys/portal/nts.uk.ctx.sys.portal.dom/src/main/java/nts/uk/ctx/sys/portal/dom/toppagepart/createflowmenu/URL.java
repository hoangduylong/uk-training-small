package nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.Common.URL
 */
@StringMaxLength(2000)
public class URL extends StringPrimitiveValue<URL> {

	private static final long serialVersionUID = 1L;

	public URL(String rawValue) {
		super(rawValue);
	}
}
