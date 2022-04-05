package nts.uk.ctx.sys.portal.dom.generalsearch;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * The Class SearchContent.
 * 検索の内容
 */
@StringMaxLength(50)
public class SearchContent extends StringPrimitiveValue<SearchContent> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public SearchContent(String rawValue) {
		super(rawValue);
	}

}
